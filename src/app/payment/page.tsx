'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAdminData } from '@/context/AdminDataContext';
import { siteConfig } from '@/data/siteConfig';
import { ChevronDown, ChevronUp, Check, ExternalLink, Shield, Sparkles as SparkleIcon, Mail, Lock } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const { addOrder, products, categories } = useAdminData();

  const paymentType = searchParams.get('type') || 'all_notes';
  const categoryId = searchParams.get('catId') || '';
  const categoryNameParam = searchParams.get('catName') || '';

  const matchedCategory = categories.find((c) => c.id === categoryId);
  const matchedCatProduct = products.find((p) => p.targetId === categoryId);

  const itemTitle = 'Complete All-Access PDF Notes Pass';
  const itemPrice = 199;
  const itemOriginalPrice = 699;

  const defaultDriveLink = 'https://drive.google.com/drive/folders/1ohYqODYiQmYbZSJ1j9fNx-_1sqA5xDlJ?usp=drive_link';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [accessMessage, setAccessMessage] = useState('');
  const [emailDispatched, setEmailDispatched] = useState(false);
  const [receivedDriveLink, setReceivedDriveLink] = useState(defaultDriveLink);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsProcessing(true);
    setErrorMessage('');

    try {
      // 1. Load Razorpay Checkout SDK Script
      const resScript = await loadRazorpayScript();
      if (!resScript) {
        setErrorMessage('Failed to load Razorpay payment gateway SDK. Please check your internet connection.');
        setIsProcessing(false);
        return;
      }

      // 2. Create Razorpay order on server side
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: itemPrice,
          email,
          fullName,
          productId: 'prod-all-notes',
          productType: 'all_notes',
        }),
      });

      const orderData = await orderRes.json();

      if (!orderData.success) {
        setErrorMessage(orderData.error || 'Failed to initialize payment order.');
        setIsProcessing(false);
        return;
      }

      // Function to process payment verification after Razorpay modal callback or test mode
      const verifyPayment = async (paymentDetails: {
        razorpay_order_id?: string;
        razorpay_payment_id?: string;
        razorpay_signature?: string;
        transactionId?: string;
      }) => {
        const txnId = paymentDetails.razorpay_payment_id || paymentDetails.transactionId || `TXN-${Date.now()}`;
        const now = new Date();

        // Log order in local context / admin data
        addOrder({
          customerName: fullName,
          email,
          amount: itemPrice,
          date: now.toISOString().split('T')[0],
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          transactionId: txnId,
          productName: `Complete All-Access PDF Notes Collection (₹${itemPrice})`,
        });

        // Verify with server endpoint, log to Supabase & dispatch mail
        const verifyRes = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            fullName,
            transactionId: txnId,
            productId: 'prod-all-notes',
            productType: 'all_notes',
            price: itemPrice,
            razorpay_order_id: paymentDetails.razorpay_order_id,
            razorpay_payment_id: paymentDetails.razorpay_payment_id,
            razorpay_signature: paymentDetails.razorpay_signature,
          }),
        });

        const verifyData = await verifyRes.json();
        setIsProcessing(false);

        if (verifyData.success) {
          setAccessMessage('Payment Successful! Lifetime Access Granted.');
          if (verifyData.googleDriveLink) {
            setReceivedDriveLink(verifyData.googleDriveLink);
          }
          if (verifyData.driveLinkSent) {
            setEmailDispatched(true);
          }
          setIsSuccess(true);
        } else {
          setErrorMessage(verifyData.error || 'Payment verification failed.');
        }
      };

      // 3. Open Razorpay modal checkout if key is active, or handle demo fallback
      if (orderData.keyId && orderData.keyId !== 'rzp_test_placeholder' && window.Razorpay) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency || 'INR',
          name: siteConfig.brandName || 'Prep Library',
          description: 'Complete All-Access PDF Notes Pass (₹199)',
          order_id: orderData.orderId,
          prefill: {
            name: fullName,
            email: email,
          },
          theme: {
            color: '#000000',
          },
          handler: async function (response: any) {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          console.error('[Razorpay Payment Failed]:', response.error);
          setErrorMessage(response.error.description || 'Payment failed. Please try again.');
          setIsProcessing(false);
        });
        rzp.open();
      } else {
        // Test mode / demo flow when live keys are pending in .env.local
        console.log('[Razorpay Demo Mode] Simulating payment verification...');
        await verifyPayment({
          transactionId: `TXN-DEMO-${Date.now()}`,
        });
      }
    } catch (err: any) {
      console.error('Payment flow error:', err);
      setIsProcessing(false);
      setErrorMessage(err.message || 'An unexpected error occurred during payment initiation.');
    }
  };

  const faqs = [
    {
      q: 'How will I receive the Google Drive link?',
      a: 'Immediately upon completing payment via Razorpay, your direct Google Drive access link will be displayed on screen and sent automatically to your email address.',
    },
    {
      q: 'What is included in the ₹199 Complete All-Access Pass?',
      a: 'The ₹199 All-Access Pass gives you lifetime access to all 200+ handwritten PDF notes and 1,500+ interview questions across all categories on the website.',
    },
    {
      q: 'Can I download the PDFs to my phone or computer?',
      a: 'Yes, once purchased, you get access to view online and download the notes for offline study.',
    },
    {
      q: 'Which email address should I enter?',
      a: 'Enter your active Google / Personal Email address where you wish to receive the Drive access link.',
    },
  ];

  return (
    <div className="bg-white text-black min-h-screen py-12 sm:py-20 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-neutral-500">
          <Link href="/" className="hover:text-black transition-colors">
            Notes Store
          </Link>
          <span>/</span>
          <span className="text-black font-bold">Overall All-Access Pass</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Offer Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-white bg-black px-3.5 py-1.5 rounded-full border border-black inline-flex items-center gap-1.5 shadow-xs">
                <SparkleIcon className="w-3.5 h-3.5 text-white" />
                ALL-ACCESS COMPLETE PASS
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight mt-3">
                {itemTitle}
              </h1>

              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-sm font-semibold text-neutral-600">Special Offer</span>
                <strong className="text-4xl sm:text-5xl font-black text-black">₹{itemPrice}</strong>
                <span className="text-sm line-through text-neutral-400">₹{itemOriginalPrice}</span>
                <span className="bg-neutral-100 text-black px-2.5 py-1 rounded-md text-xs font-extrabold border border-neutral-300">
                  SAVE ₹{itemOriginalPrice - itemPrice} (71% OFF)
                </span>
              </div>
            </div>

            {/* Offer Timer Card */}
            <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-white bg-black px-3 py-1 rounded-lg">
                  🎯 INSTANT GOOGLE DRIVE ACCESS
                </span>
                <span className="text-xs font-bold text-neutral-600">100% Verified Notes</span>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                Get lifetime access to the complete 200+ PDF Notes Collection across all technical categories.
              </p>

              {/* Countdown Grid */}
              <div className="grid grid-cols-4 gap-2 text-center font-mono">
                <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                  <strong className="block text-xl font-black text-black">0</strong>
                  <span className="text-[10px] text-neutral-500 font-semibold">Days</span>
                </div>
                <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                  <strong className="block text-xl font-black text-black">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </strong>
                  <span className="text-[10px] text-neutral-500 font-semibold">Hours</span>
                </div>
                <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                  <strong className="block text-xl font-black text-black">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </strong>
                  <span className="text-[10px] text-neutral-500 font-semibold">Min</span>
                </div>
                <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                  <strong className="block text-xl font-black text-black">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </strong>
                  <span className="text-[10px] text-neutral-500 font-semibold">Sec</span>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-2 text-xs font-semibold text-neutral-800">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-black" /> Direct Google Drive Link Delivery
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-black" /> Handwritten, Interview-Focused Study Sheets
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-black" /> One-Time Payment of ₹199 • Lifetime Access
              </div>
              <div className="flex items-center gap-2 text-black font-extrabold">
                <Check className="w-4 h-4 text-black" /> Free Access to all future updated notes
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-lg space-y-6 text-black">
              {isSuccess ? (
                <div className="text-center py-6 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-3xl font-black shadow-md">
                    ✓
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-black tracking-tight">Payment Successful!</h2>
                    <p className="text-xs text-emerald-700 font-bold mt-1">
                      Payment of ₹199 Verified & Recorded.
                    </p>
                  </div>

                  {/* Check Email Notice Box */}
                  <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3 text-left shadow-xs">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-black block">
                      📧 CHECK YOUR EMAIL FOR GOOGLE DRIVE ACCESS LINK
                    </span>
                    <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                      The Google Drive folder link has been sent to your email address:
                    </p>
                    <div className="p-3 bg-white rounded-xl border border-neutral-300 text-xs text-black font-extrabold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-600" />
                      <span>{email}</span>
                      <span className="ml-auto text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Link Sent ✓
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 italic">
                      Please check your email inbox (and spam/promotions folder) to access your PDF notes.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/"
                      className="inline-block bg-black hover:bg-neutral-800 text-white text-xs font-extrabold px-6 py-3.5 rounded-xl shadow-md transition-all border border-black"
                    >
                      ← Return to Notes Store
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="border-b border-neutral-200 pb-4">
                    <h2 className="text-xl font-extrabold text-black">Razorpay Checkout</h2>
                    <p className="text-xs text-neutral-600 mt-1">
                      {itemTitle} — <strong>₹199</strong>
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                      ⚠️ {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handlePay} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full text-xs p-3 rounded-xl bg-neutral-50 border border-neutral-300 text-black focus:border-black outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Email Address (Google Drive Delivery)
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full text-xs p-3 rounded-xl bg-neutral-50 border border-neutral-300 text-black focus:border-black outline-none font-medium"
                      />
                    </div>

                    <div className="space-y-1.5 pt-1 text-[11px] text-neutral-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-black" /> Official 256-Bit Razorpay Gateway Security
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-black" /> Instant Email & On-Screen Google Drive Link
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-black hover:bg-neutral-800 text-white font-extrabold text-sm py-4 rounded-xl shadow-md transition-all border border-black flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-white" />
                      {isProcessing ? 'Opening Razorpay Gateway...' : `Pay ₹199 via Razorpay`}
                    </button>
                  </form>
                </>
              )}

              <p className="text-center text-[11px] text-neutral-500 font-medium">
                Support Email:{' '}
                <a href={`mailto:${siteConfig.supportEmail}`} className="text-black font-extrabold hover:underline">
                  {siteConfig.supportEmail}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16 max-w-3xl mx-auto space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-black">Frequently Asked Questions</h2>
          </div>

          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-black text-sm cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-black" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                )}
              </button>
              {openFaq === idx && (
                <p className="mt-3 pt-3 border-t border-neutral-200 text-xs text-neutral-600 leading-relaxed font-medium">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-white">Loading payment screen...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
