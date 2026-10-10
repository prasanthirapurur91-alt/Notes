import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { siteConfig } from '@/data/siteConfig';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, email, fullName, productId, productType } = body;
    const effectiveAmount = Number(amount) > 0 ? Number(amount) : (siteConfig.allAccessPrice || 199);

    const keyId = (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || '').trim();
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || '').trim();

    // Check if keys are omitted or set to generic placeholders for demo mode
    if (!keyId || !keySecret || keyId === 'rzp_test_placeholder' || keyId.includes('YOUR_KEY')) {
      console.warn('[Razorpay Notice]: No valid Razorpay API keys found. Operating in simulation demo mode.');
      const fallbackOrderId = `order_demo_${Date.now()}`;
      return NextResponse.json({
        success: true,
        isDemoMode: true,
        orderId: fallbackOrderId,
        order_id: fallbackOrderId,
        amount: Math.round(effectiveAmount * 100),
        currency: 'INR',
        keyId: null,
      });
    }

    try {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const options = {
        amount: Math.round(effectiveAmount * 100),
        currency: 'INR',
        receipt: `rcpt_${Date.now().toString().slice(-10)}`,
        notes: {
          email: email || '',
          fullName: fullName || '',
          productId: productId || 'prod-all-notes',
          productType: productType || 'all_notes',
        },
      };

      const order = await razorpay.orders.create(options);

      return NextResponse.json({
        success: true,
        isDemoMode: false,
        orderId: order.id,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: keyId,
      });
    } catch (authError: any) {
      console.error('[Razorpay Order Creation Error]:', authError?.error?.description || authError?.message || authError);
      return NextResponse.json(
        {
          success: false,
          error: `Razorpay Key Authentication Failed (${authError?.error?.description || authError?.message || 'Invalid Key ID / Secret'}). Please update your Test Key ID and Key Secret from Razorpay Dashboard in .env.local`,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('[Razorpay Order Creation Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create Razorpay payment order.',
      },
      { status: 500 }
    );
  }
}

