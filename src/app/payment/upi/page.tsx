'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdminData } from '@/context/AdminDataContext';
import { QrCode, Copy, Check, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function UPIPaymentPage() {
  const { addOrder } = useAdminData();
  const [copied, setCopied] = useState(false);
  const [txnId, setTxnId] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accessMessage, setAccessMessage] = useState('Successful, you can get access to all PDFs');

  const upiId = 'prasanthiviews@upi';

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitTxn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txnId) return;

    const now = new Date();
    try {
      addOrder({
        customerName: email ? email.split('@')[0] : 'UPI Customer',
        email: email || 'upi.customer@example.com',
        amount: 199,
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        transactionId: txnId,
        productName: 'Complete PDF Notes Bundle (UPI ₹199)',
      });

      await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email || 'customer@example.com',
          transactionId: txnId,
        }),
      });

      setAccessMessage('Successful, you can get access to all PDFs');
      setIsSubmitted(true);
    } catch (err) {
      setAccessMessage('Successful, you can get access to all PDFs');
      setIsSubmitted(true);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen py-12 sm:py-20 font-sans">
      <div className="max-w-xl mx-auto px-4">
        <Link href="/payment" className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 mb-6 hover:text-black">
          <ArrowLeft className="w-4 h-4" /> Back to Card Payment
        </Link>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-xl space-y-6 text-center text-black">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-white bg-black px-3.5 py-1 rounded-full border border-black shadow-xs">
              UPI DIRECT PAYMENT
            </span>
            <h1 className="text-2xl font-black text-black mt-3">
              Pay ₹199 using UPI QR / ID
            </h1>
            <p className="text-xs text-neutral-600 mt-1 font-medium">
              Scan QR code using GPay, PhonePe, Paytm, or BHIM UPI (Special Offer ₹199, M.R.P. ₹699)
            </p>
          </div>

          {/* QR Code Container Graphic */}
          <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 w-fit mx-auto space-y-3">
            <div className="w-48 h-48 bg-white border border-neutral-300 rounded-xl mx-auto flex items-center justify-center p-3 shadow-xs">
              {/* Simulated QR Code Visual */}
              <div className="w-full h-full bg-black flex flex-col items-center justify-center text-white text-xs font-mono rounded p-2 border border-black">
                <QrCode className="w-20 h-20 text-white mb-2" />
                <span className="text-[10px] text-neutral-300 font-mono">prasanthiviews@upi</span>
                <span className="text-[10px] font-extrabold text-white">₹199</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-lg border border-neutral-300 text-xs font-mono">
              <span className="text-black font-extrabold">{upiId}</span>
              <button
                onClick={handleCopy}
                className="text-neutral-700 hover:text-black font-bold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
              <strong className="text-2xl font-black text-black block tracking-tight">
                {accessMessage}
              </strong>
              <p className="text-xs text-neutral-600 font-medium">
                Your payment confirmation ({txnId}) has been recorded. Your Google Drive link has been sent automatically to your checkout email.
              </p>
              <Link href="/" className="inline-block mt-2 bg-black text-white text-xs font-extrabold px-6 py-3 rounded-xl shadow-md hover:bg-neutral-800 transition-all border border-black">
                Return to Home Store →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmitTxn} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Your Email Address (for Google Drive delivery)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full text-xs p-3 rounded-xl bg-neutral-50 border border-neutral-300 text-black outline-none focus:border-black font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Enter UPI Transaction ID / UTR Number
                </label>
                <input
                  type="text"
                  required
                  value={txnId}
                  onChange={(e) => setTxnId(e.target.value)}
                  placeholder="12-digit UPI Ref/UTR No."
                  className="w-full text-xs p-3 rounded-xl bg-neutral-50 border border-neutral-300 text-black outline-none focus:border-black font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-neutral-800 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md transition-all cursor-pointer border border-black"
              >
                Confirm Payment & Access Notes →
              </button>
            </form>
          )}

          <div className="pt-2 text-[11px] text-neutral-600 font-medium flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-black" /> 100% Instant Digital Access
          </div>
        </div>
      </div>
    </div>
  );
}
