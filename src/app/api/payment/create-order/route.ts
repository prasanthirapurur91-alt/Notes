import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount = 199, email, fullName, productId, productType } = body;

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.warn('[Razorpay Notice]: Missing keys, using sandbox order.');
      const fallbackOrderId = `order_demo_${Date.now()}`;
      return NextResponse.json({
        success: true,
        isDemoMode: true,
        orderId: fallbackOrderId,
        order_id: fallbackOrderId,
        amount: Math.round(amount * 100),
        currency: 'INR',
        keyId: keyId || 'rzp_test_placeholder',
      });
    }

    try {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const options = {
        amount: Math.round(amount * 100),
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
        orderId: order.id,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: keyId,
      });
    } catch (authError: any) {
      console.warn('[Razorpay API Warning]: Authentication failed with current keys, using demo order for testing:', authError?.error?.description || authError?.message);
      const fallbackOrderId = `order_demo_${Date.now()}`;
      return NextResponse.json({
        success: true,
        isDemoMode: true,
        orderId: fallbackOrderId,
        order_id: fallbackOrderId,
        amount: Math.round(amount * 100),
        currency: 'INR',
        keyId: keyId,
      });
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
