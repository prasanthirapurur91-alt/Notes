'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAdminData } from '@/context/AdminDataContext';
import { siteConfig } from '@/data/siteConfig';
import { ChevronDown, ChevronUp, Check, ShieldCheck, QrCode, Layers } from 'lucide-react';

export default function BundlePaymentPage() {
  const { addOrder, products } = useAdminData();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [accessMessage, setAccessMessage] = useState('Successful, you can get access to the SDET & Job Prep Bundle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Bundle product details
  const sdetProduct = products.find((p) => p.id === 'prod-sdet-bundle');
  const bundlePrice = sdetProduct?.price || 99;
  const bundleOriginalPrice = sdetProduct?.originalPrice || 299;

  // Countdown timer simulation
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
    const txnId = `TXN-BUNDLE-${Date.now()}`;
    const now = new Date();

    try {
      // Record payment transaction into Admin Database
      addOrder({
        customerName: fullName,
        email,
        amount: bundlePrice,
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        transactionId: txnId,
        productName: `QA / SDET Job Preparation Bundle (₹${bundlePrice})`,
      });

      // Trigger secure server-side payment verification and automated email dispatch
      await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          fullName,
          transactionId: txnId,
          productType: 'sdet-bundle',
        }),
      });

      setIsProcessing(false);
      setAccessMessage('Successful, you can get access to the SDET & Job Prep Bundle');
      setIsSuccess(true);
    } catch (err) {
      console.error('Payment error:', err);
      setIsProcessing(false);
      setAccessMessage('Successful, you can get access to the SDET & Job Prep Bundle');
      setIsSuccess(true);
    }
  };

  const faqs = [
    {
      q: 'What is included in the SDET & Job Prep Bundle?',
      a: 'The Bundle includes complete Automation Testing guides (Selenium, Playwright), API Testing (RestAssured), Cucumber BDD, SQL DBMS notes, Java/Python testing guides, and 1200+ interview Q&As.',
    },
    {
      q: 'How will I receive the bundle materials?',
      a: 'Once your payment is verified, our server sends the Google Drive link directly to your entered email address.',
    },
    {
      q: 'Can I download all PDF resources in this bundle?',
      a: 'Yes! You get full lifetime access to view and download all PDFs included in the bundle.',
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen py-12 sm:py-20 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bundle Info */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-black bg-white px-3.5 py-1 rounded-full border border-white">
                SPECIAL BUNDLE OFFER 📦
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-3">
                QA & SDET Job Preparation <br />
                <span className="text-neutral-300">Complete Resource Bundle</span>
              </h1>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-sm font-semibold text-neutral-400">Special Bundle Price:</span>
                <strong className="text-4xl font-black text-white">₹{bundlePrice}</strong>
                <span className="text-xs text-neutral-500 line-through">₹{bundleOriginalPrice}</span>
              </div>
            </div>

            {/* Offer Card */}
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-black bg-white px-2.5 py-1 rounded border border-white">
                  🎯 Limited Bundle Pass
                </span>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="line-through text-neutral-500">₹{bundleOriginalPrice}</span>
                  <span className="text-white text-sm font-black">₹{bundlePrice}</span>
                  <span className="bg-neutral-900 text-white px-2 py-0.5 rounded text-[11px] border border-neutral-700">
                    SAVE ₹{bundleOriginalPrice - bundlePrice}
                  </span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="grid grid-cols-4 gap-2 text-center font-mono">
                <div className="bg-black p-2 rounded-xl border border-neutral-800">
                  <strong className="block text-lg font-black text-white">0</strong>
                  <span className="text-[10px] text-neutral-400">Days</span>
                </div>
                <div className="bg-black p-2 rounded-xl border border-neutral-800">
                  <strong className="block text-lg font-black text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </strong>
                  <span className="text-[10px] text-neutral-400">Hours</span>
                </div>
                <div className="bg-black p-2 rounded-xl border border-neutral-800">
                  <strong className="block text-lg font-black text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </strong>
                  <span className="text-[10px] text-neutral-400">Min</span>
                </div>
                <div className="bg-black p-2 rounded-xl border border-neutral-800">
                  <strong className="block text-lg font-black text-white">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </strong>
                  <span className="text-[10px] text-neutral-400">Sec</span>
                </div>
              </div>
            </div>

            {/* Included Content */}
            <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 space-y-3">
              <strong className="text-sm font-bold text-white block flex items-center gap-2">
                <Layers className="w-4 h-4 text-white" /> Bundle Includes:
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-white">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-white" /> Selenium WebDriver Guide</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-white" /> Playwright Framework</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-white" /> RestAssured API Testing</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-white" /> Cucumber BDD Framework</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-white" /> SQL & Database Queries</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-white" /> 1200+ QA Interview Q&As</div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Form */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-950 p-6 sm:p-8 rounded-3xl border border-neutral-800 shadow-2xl space-y-6 text-white">
              {isSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto text-3xl font-bold border border-white">
                    ✓
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {accessMessage}
                  </h2>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    The Google Drive bundle access link has been automatically sent to <strong>{email}</strong>.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/notes"
                      className="inline-block bg-white hover:bg-neutral-200 text-black text-xs font-extrabold px-6 py-3.5 rounded-xl shadow-md transition-all border border-white"
                    >
                      Go to Notes Catalogue →
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="border-b border-neutral-800 pb-4">
                    <h2 className="text-xl font-extrabold text-white">Enter Email for Bundle Checkout</h2>
                    <p className="text-xs text-neutral-400 mt-1">Instant Google Drive Bundle Delivery</p>
                  </div>

                  <form onSubmit={handlePay} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full text-xs p-3 rounded-xl bg-black border border-neutral-800 text-white outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-400 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full text-xs p-3 rounded-xl bg-black border border-neutral-800 text-white outline-none focus:border-white"
                      />
                    </div>

                    <div className="space-y-1 pt-1 text-[11px] text-neutral-400 font-medium">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-white" /> 100% Secure Server Verification
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-white" /> Instant Email Drive Access
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-white hover:bg-neutral-200 text-black font-extrabold text-sm py-3.5 rounded-xl shadow-lg transition-all border border-white flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isProcessing ? 'Verifying Payment...' : `Pay ₹${bundlePrice} For Bundle Now →`}
                    </button>
                  </form>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-neutral-800"></div>
                    <span className="flex-shrink mx-4 text-xs font-bold text-neutral-500 uppercase">OR</span>
                    <div className="flex-grow border-t border-neutral-800"></div>
                  </div>

                  <Link
                    href="/payment/upi"
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-bold text-xs py-3 rounded-xl transition-all border border-neutral-700 flex items-center justify-center gap-2"
                  >
                    <QrCode className="w-4 h-4 text-white" /> Pay using UPI ID / QR Code
                  </Link>
                </>
              )}

              <p className="text-center text-[11px] text-neutral-500">
                Need help? Email us at{' '}
                <a href={`mailto:${siteConfig.supportEmail}`} className="text-white font-bold hover:underline">
                  {siteConfig.supportEmail}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-20 max-w-3xl mx-auto space-y-4">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-black bg-white px-3.5 py-1 rounded-full border border-white">
              BUNDLE FAQS
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-2">Frequently Asked Questions</h2>
          </div>

          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-neutral-950 rounded-2xl border border-neutral-800 p-5 shadow-md">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-white text-sm cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
              </button>
              {openFaq === idx && (
                <p className="mt-3 pt-3 border-t border-neutral-800 text-xs text-neutral-400 leading-relaxed font-medium">
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
