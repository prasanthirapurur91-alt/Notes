import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';
import { defaultProductsCatalogue } from '@/data/productsCatalogue';
import { siteConfig } from '@/data/siteConfig';
import { sendAccessEmail } from '@/lib/email';

// In-memory set to prevent duplicate email dispatches during runtime burst requests
const processedTransactions = new Set<string>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      fullName,
      transactionId,
      productId,
      productType,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    // 1. Strict Server-Side Payload Validation
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid customer email address is required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanTxnId =
      razorpay_payment_id ||
      (transactionId && typeof transactionId === 'string' ? transactionId.trim() : `TXN-${Date.now()}`);
    const targetProductId = productId || (productType === 'sdet-bundle' ? 'prod-sdet-bundle' : 'prod-all-notes');

    // 2. Razorpay Signature Verification (if live signature provided)
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (razorpay_signature && razorpay_order_id && razorpay_payment_id) {
      if (keySecret) {
        const expectedSignature = crypto
          .createHmac('sha256', keySecret)
          .update(`${razorpay_order_id}|${razorpay_payment_id}`)
          .digest('hex');

        if (expectedSignature !== razorpay_signature) {
          console.error('[Razorpay Signature Error]: Signature mismatch');
          return NextResponse.json(
            { success: false, error: 'Payment signature verification failed.' },
            { status: 400 }
          );
        }
      }
    }

    // 3. Authoritative Server-Side Product Lookup
    let matchedProduct: {
      id: string;
      name: string;
      productType: string;
      price: number;
      driveLink: string;
    } | null = null;

    try {
      const { data: dbProd } = await supabaseAdmin
        .from('products')
        .select('id, name, product_type, price, drive_link')
        .eq('id', targetProductId)
        .single();

      if (dbProd) {
        matchedProduct = {
          id: dbProd.id,
          name: dbProd.name,
          productType: dbProd.product_type,
          price: Number(dbProd.price) || siteConfig.allAccessPrice || 199,
          driveLink: dbProd.drive_link || '',
        };
      }
    } catch {
      // Fallback if DB table is initializing
    }

    if (!matchedProduct) {
      const fallbackProd =
        defaultProductsCatalogue.find((p) => p.id === targetProductId) || defaultProductsCatalogue[0];
      matchedProduct = {
        id: fallbackProd.id,
        name: fallbackProd.name,
        productType: fallbackProd.productType,
        price: fallbackProd.price || siteConfig.allAccessPrice || 199,
        driveLink: fallbackProd.driveLink,
      };
    }

    const targetDriveLink =
      matchedProduct.driveLink ||
      (matchedProduct.productType === 'bundle'
        ? process.env.GOOGLE_DRIVE_SDET_BUNDLE_LINK || 'https://drive.google.com/drive/folders/1ohYqODYiQmYbZSJ1j9fNx-_1sqA5xDlJ?usp=drive_link'
        : process.env.GOOGLE_DRIVE_NOTES_LINK || 'https://drive.google.com/drive/folders/1ohYqODYiQmYbZSJ1j9fNx-_1sqA5xDlJ?usp=drive_link');

    // 4. Database Idempotency Check: Avoid duplicate delivery
    const { data: existingOrder } = await supabaseAdmin
      .from('orders')
      .select('id, transaction_id, delivery_status')
      .eq('transaction_id', cleanTxnId)
      .maybeSingle();

    if (existingOrder || processedTransactions.has(cleanTxnId)) {
      return NextResponse.json({
        success: true,
        message: 'Successful, you can get access to your purchased PDFs',
        customerEmail: cleanEmail,
        productId: matchedProduct.id,
        productName: matchedProduct.name,
        googleDriveLink: targetDriveLink,
        note: 'Order already verified and logged in database.',
      });
    }

    // Mark transaction as processed in-memory
    processedTransactions.add(cleanTxnId);

    // 5. Record Order in Supabase Database
    const orderId = `ord-${Date.now()}`;
    const { error: dbError } = await supabaseAdmin.from('orders').insert({
      id: orderId,
      customer_name: fullName || 'Customer',
      email: cleanEmail,
      product_id: matchedProduct.id,
      product_type: matchedProduct.productType,
      product_name: matchedProduct.name,
      amount: matchedProduct.price,
      currency: 'INR',
      payment_provider: 'razorpay',
      transaction_id: cleanTxnId,
      payment_status: 'paid',
      delivery_status: 'sent',
      google_drive_link: targetDriveLink,
    });

    if (dbError) {
      console.warn('[Supabase Order Insert Warning]:', dbError.message);
    } else {
      console.log(
        `[Supabase Order Success] Recorded order ${orderId} for ${cleanEmail} (Amount: ₹${matchedProduct.price}, Product: ${matchedProduct.name})`
      );
    }

    // 6. Trigger Secure Automated Email Delivery
    const emailResult = await sendAccessEmail({
      toEmail: cleanEmail,
      customerName: fullName || 'Learner',
      productName: matchedProduct.name,
      driveLink: targetDriveLink,
      price: matchedProduct.price,
    });

    return NextResponse.json({
      success: true,
      message: 'Successful, you can get access to your purchased PDFs',
      customerEmail: cleanEmail,
      productId: matchedProduct.id,
      productName: matchedProduct.name,
      productType: matchedProduct.productType,
      amount: matchedProduct.price,
      driveLinkSent: emailResult.success,
      googleDriveLink: targetDriveLink,
    });
  } catch (error: any) {
    console.error('Payment verification route error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error during verification.' },
      { status: 500 }
    );
  }
}
