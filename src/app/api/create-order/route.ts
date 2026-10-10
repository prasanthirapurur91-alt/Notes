import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { amount = 199, email, fullName, productId, productType } = body;

    let amountInPaise = Math.round(Number(amount));
    if (amountInPaise < 100) {
      amountInPaise = Math.round(amountInPaise * 100);
    }

    if (amountInPaise < 100) {
      return NextResponse.json(
        { success: false, error: 'Amount must be at least 100 paise (₹1).' },
        { status: 400 }
      );
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      const fallbackOrderId = `order_demo_${Date.now()}`;
      return NextResponse.json({
        success: true,
        isDemoMode: true,
        order_id: fallbackOrderId,
        orderId: fallbackOrderId,
        amount: amountInPaise,
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
        amount: amountInPaise,
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
        order_id: order.id,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: keyId,
      });
    } catch (authErr: any) {
      console.warn('[Razorpay API Notice]: Fallback to test order mode:', authErr?.message);
      const fallbackOrderId = `order_demo_${Date.now()}`;
      return NextResponse.json({
        success: true,
        isDemoMode: true,
        order_id: fallbackOrderId,
        orderId: fallbackOrderId,
        amount: amountInPaise,
        currency: 'INR',
        keyId: keyId,
      });
    }
  } catch (error: any) {
    console.error('[Razorpay Create Order Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create Razorpay payment order.',
      },
      { status: 500 }
    );
  }
}
