import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';
import { defaultProductsCatalogue } from '@/data/productsCatalogue';
import { sendAccessEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      fullName,
      transactionId,
      productId,
      productType,
    } = body;

    const paymentId = razorpay_payment_id || transactionId;
    const orderId = razorpay_order_id;
    const signature = razorpay_signature;

    // Validate required parameters
    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { success: false, error: 'Missing required Razorpay verification fields: razorpay_order_id, razorpay_payment_id, or razorpay_signature.' },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { success: false, error: 'Server authentication configuration missing (RAZORPAY_KEY_SECRET).' },
        { status: 500 }
      );
    }

    // Generate HMAC-SHA256 signature
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.error('[Razorpay Signature Error]: Verification failed. Signature mismatch.');
      return NextResponse.json(
        { success: false, error: 'Invalid Razorpay payment signature. Verification failed.' },
        { status: 400 }
      );
    }

    // Product lookup and Supabase record + email dispatch
    const targetProductId = productId || (productType === 'sdet-bundle' ? 'prod-sdet-bundle' : 'prod-all-notes');
    let matchedProduct = defaultProductsCatalogue.find((p) => p.id === targetProductId) || defaultProductsCatalogue[0];

    const targetDriveLink =
      matchedProduct.driveLink || process.env.GOOGLE_DRIVE_NOTES_LINK || 'https://drive.google.com/drive/folders/1ohYqODYiQmYbZSJ1j9fNx-_1sqA5xDlJ?usp=drive_link';

    // Save order in Supabase
    if (email) {
      const cleanEmail = email.trim().toLowerCase();
      try {
        await supabaseAdmin.from('orders').insert({
          id: `ord-${Date.now()}`,
          customer_name: fullName || 'Customer',
          email: cleanEmail,
          product_id: matchedProduct.id,
          product_type: matchedProduct.productType,
          product_name: matchedProduct.name,
          amount: matchedProduct.price,
          currency: 'INR',
          payment_provider: 'razorpay',
          transaction_id: paymentId,
          payment_status: 'paid',
          delivery_status: 'sent',
          google_drive_link: targetDriveLink,
        });
      } catch (dbErr: any) {
        console.warn('[Supabase Insert Notice]:', dbErr?.message);
      }

      // Trigger Email Delivery
      try {
        await sendAccessEmail({
          toEmail: cleanEmail,
          customerName: fullName || 'Learner',
          productName: matchedProduct.name,
          driveLink: targetDriveLink,
        });
      } catch (emailErr: any) {
        console.warn('[Email Notice]:', emailErr?.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment signature successfully verified!',
      paymentId: paymentId,
      googleDriveLink: targetDriveLink,
    });
  } catch (error: any) {
    console.error('Verify Payment endpoint error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error during payment verification.' },
      { status: 500 }
    );
  }
}
