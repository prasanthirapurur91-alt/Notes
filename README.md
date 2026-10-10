# Prep Library — Technical PDF Notes Marketplace

**Prep Library** is a production-ready Next.js application designed for engineering students, software developers, and QA professionals to purchase and access 200+ handwritten technical PDF study notes and 1,500+ interview Q&As across 26 technical categories.

---

## 📑 Table of Contents
1. [Core Features & Architecture](#-core-features--architecture)
2. [Tech Stack](#-tech-stack)
3. [How to Switch to Razorpay Live Mode](#-how-to-switch-to-razorpay-live-mode)
4. [How to Change the Price in the Future (e.g. ₹199 to ₹500)](#-how-to-change-the-price-in-the-future)
5. [How to Change or Update Google Drive Notes Link](#-how-to-change-or-update-google-drive-notes-link)
6. [Complete Post-Payment Automated Flow](#-complete-post-payment-automated-flow)
7. [Environment Variables Reference](#-environment-variables-reference)
8. [Supabase Database Schema](#-supabase-database-schema)
9. [Local Development & Deployment](#-local-development--deployment)

---

## 🌟 Core Features & Architecture

* **Streamlined Instant Checkout**: Focused single All-Access checkout with Razorpay Standard Web Gateway.
* **Automated Order Logging**: Securely verifies payments via HMAC-SHA256 and records them into Supabase `orders` table.
* **Automated Email Dispatch**: Dispatches transactional confirmation emails containing the Google Drive access link directly to the buyer's inbox.
* **Centralized Price & Links**: Single-source-of-truth configuration for pricing and Drive delivery URLs.
* **Mobile-First Responsive Design**: Includes desktop navigation, mobile hamburger drawer, and sticky bottom purchase bar.

---

## 🚀 Tech Stack

* **Frontend**: Next.js 16 (App Router), React 19, TypeScript
* **Styling**: Tailwind CSS
* **Payment Gateway**: Razorpay Web Checkout SDK
* **Database**: Supabase (PostgreSQL)
* **Email Service**: Nodemailer (Gmail SMTP)
* **Hosting**: Vercel

---

## 💳 How to Switch to Razorpay Live Mode

When you are ready to accept real customer payments in Indian Rupees (INR):

### Step 1: Activate Live Mode in Razorpay Dashboard
1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Look at the top-right toggle switch and switch from **Test Mode** to **Live Mode**.
   *(Note: Ensure your Razorpay account activation/KYC is approved).*
3. In the left navigation, go to **Account & Settings** → **API Keys** (or **Developer Controls**).
4. Click **Generate Live Key** (or **Regenerate Live Key**).
5. You will receive:
   - **Live Key ID**: starts with `rzp_live_...`
   - **Live Key Secret**: a 24-character secret string.

### Step 2: Update Environment Variables in Vercel
1. Go to your **[Vercel Dashboard](https://vercel.com/dashboard)** → Select the project (`Notes`).
2. Navigate to **Settings** → **Environment Variables**.
3. Edit or add the Razorpay keys:
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` = `rzp_live_YOUR_LIVE_KEY_ID`
   - `RAZORPAY_KEY_ID` = `rzp_live_YOUR_LIVE_KEY_ID`
   - `RAZORPAY_KEY_SECRET` = `YOUR_LIVE_KEY_SECRET`
4. Make sure to apply them to **Production**, **Preview**, and **Development**.
5. Save changes.

### Step 3: Redeploy on Vercel
1. Go to the **Deployments** tab on Vercel.
2. Click the three dots (`...`) on your latest deployment and select **Redeploy**.
3. Once the build finishes, your live website will process real payments via Razorpay!

### Step 4: Update `.env.local` for Local Testing (Optional)
If running `npm run dev` locally with Live Keys, update `.env.local`:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
```

---

## 💰 How to Change the Price in the Future

The application uses **Centralized Price Architecture**. When you change the price, every button, badge, checkout order, Razorpay charge, database entry, and email receipt automatically updates.

### Method 1: Change via Environment Variable (Recommended — No Code Edits Required)
1. In your [`.env.local`](.env.local) file (and in **Vercel Project Settings → Environment Variables**), add or update:
   ```env
   NEXT_PUBLIC_ALL_ACCESS_PRICE=500
   ```
2. Redeploy on Vercel (or restart `npm run dev`).
3. That's it!
   - All buttons across the website will display **Pay ₹500**.
   - Razorpay will create orders for ₹500 (50,000 paise).
   - Customers **must pay ₹500** to receive payment verification and email delivery.

### Method 2: Change Directly in Code
If you prefer editing the code:
1. Open [`src/data/siteConfig.ts`](src/data/siteConfig.ts).
2. Change the default price:
   ```typescript
   // Change from 199 to 500:
   const currentPrice = Number(process.env.NEXT_PUBLIC_ALL_ACCESS_PRICE) || 500;
   ```
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update All-Access Pass price to 500"
   git push origin main
   ```

---

## 📁 How to Change or Update Google Drive Notes Link

If you update your notes folder, organize new PDF files, or want to change the delivery link:

### Where to Change:
1. **In `.env.local` and Vercel**:
   Update `GOOGLE_DRIVE_NOTES_LINK` with your new Google Drive folder URL:
   ```env
   GOOGLE_DRIVE_NOTES_LINK=https://drive.google.com/drive/folders/YOUR_NEW_FOLDER_ID?usp=drive_link
   ```
2. **In Vercel Dashboard**:
   - Go to **Project Settings** → **Environment Variables**.
   - Edit `GOOGLE_DRIVE_NOTES_LINK` and save.
   - Click **Redeploy**.
3. **In Code Default Fallback** (optional backup):
   Open [`src/app/payment/page.tsx`](src/app/payment/page.tsx) and update `defaultDriveLink`:
   ```typescript
   const defaultDriveLink = 'https://drive.google.com/drive/folders/YOUR_NEW_FOLDER_ID?usp=drive_link';
   ```

> **What happens immediately:**  
> Every new purchase from that moment onward will automatically log the new Drive link in Supabase and send the new link in the confirmation email!

---

## 🔄 Complete Post-Payment Automated Flow

Here is the exact lifecycle of every customer purchase:

```
[1. Learner visits /payment]
         │
         ▼
[2. Fills Name & Email → Clicks "Pay ₹199"]
         │
         ▼
[3. Server calls POST /api/payment/create-order]
   • Creates official Razorpay order with strict price enforcement
         │
         ▼
[4. Razorpay Standard Checkout Modal Opens]
   • Learner completes payment via UPI (GPay, PhonePe, Paytm), Card, or Netbanking
         │
         ▼
[5. Client sends signature to POST /api/payment/verify]
   • Verifies HMAC-SHA256 signature using RAZORPAY_KEY_SECRET
   • If signature is invalid, access is immediately rejected
         │
         ▼
[6. Database Synchronization in Supabase]
   • Inserts verified record into public.orders table:
     - customer_name, email, amount, payment_status ('paid')
     - google_drive_link, transaction_id, created_at
         │
         ▼
[7. Automated Email Access Dispatch]
   • Nodemailer sends transactional receipt from "Prep Library"
   • Email contains order receipt & "Open Google Drive Folder" access button
         │
         ▼
[8. On-Screen Success Confirmation]
   • User sees "Payment Successful! Please check your email for Google Drive link"
```

---

## 🔐 Environment Variables Reference

Here are all environment variables required for full production functionality:

```env
# ===================================================
# SUPABASE CONFIGURATION
# ===================================================
NEXT_PUBLIC_SUPABASE_URL=https://ttmkugpqtjuarthoeaiw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_srX0yYrtln5m1lIFyw-rwA_JbTWFeJT
SUPABASE_SERVICE_ROLE_KEY=sb_publishable_srX0yYrtln5m1lIFyw-rwA_JbTWFeJT

# ===================================================
# RAZORPAY GATEWAY (TEST OR LIVE)
# ===================================================
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_HERE
RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_HERE
RAZORPAY_KEY_SECRET=YOUR_SECRET_HERE

# ===================================================
# GOOGLE DRIVE NOTES DELIVERY LINK
# ===================================================
GOOGLE_DRIVE_NOTES_LINK=https://drive.google.com/drive/folders/1ohYqODYiQmYbZSJ1j9fNx-_1sqA5xDlJ?usp=drive_link

# ===================================================
# OPTIONAL CENTRAL PRICE OVERRIDE
# ===================================================
NEXT_PUBLIC_ALL_ACCESS_PRICE=199

# ===================================================
# GMAIL SMTP EMAIL DISPATCH
# ===================================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=learnalways93@gmail.com
SMTP_PASS=gigz jhrh imzd tmsu
EMAIL_FROM_ADDRESS="Prep Library" <learnalways93@gmail.com>
```

---

## 🗄️ Supabase Database Schema

The marketplace requires only one primary table in Supabase. Run this SQL in your **Supabase Dashboard → SQL Editor**:

```sql
-- 1. Clean up unused legacy tables
DROP TABLE IF EXISTS public.notes, public.categories, public.products CASCADE;

-- 2. Create the primary orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    product_id TEXT DEFAULT 'prod-all-notes',
    product_type TEXT DEFAULT 'all_notes',
    product_name TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    payment_provider TEXT DEFAULT 'razorpay',
    transaction_id TEXT UNIQUE NOT NULL,
    payment_status TEXT DEFAULT 'paid',
    delivery_status TEXT DEFAULT 'sent',
    google_drive_link TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Security: Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 4. Access Policy: Allow authenticated / server insertion
CREATE POLICY "Allow server insertion" ON public.orders
    FOR ALL
    USING (true)
    WITH CHECK (true);
```

---

## 🛠️ Local Development & Deployment

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build & verify production bundle
npm run build

# 4. Push updates to GitHub (triggers automatic Vercel deployment)
git add .
git commit -m "Update project features"
git push origin main
```

---

## ⚡ Quick Reference Guide: Operations & Maintenance

### 1. How to Enable Razorpay Live Mode (Accept Real Payments)
Follow these exact steps when you are ready to accept real customer payments:

1. **Switch to Live Mode**:
   - Log in to your **[Razorpay Dashboard](https://dashboard.razorpay.com)**.
   - In the top-right corner, toggle the switch from **Test Mode** to **Live Mode**.
2. **Generate Live API Keys**:
   - Go to **Account & Settings** → **API Keys** (under *Developer controls*).
   - Click **Generate Key** (or **Regenerate Key**).
   - You will receive a **Live Key ID** (starts with `rzp_live_...`) and a **Live Key Secret**.
3. **Update Vercel Environment Variables**:
   - Open **[Vercel Dashboard](https://vercel.com/dashboard)** → Select your **Notes** project.
   - Go to **Settings** → **Environment Variables**.
   - Update these 3 variables with your Live credentials:
     - `NEXT_PUBLIC_RAZORPAY_KEY_ID` = `rzp_live_YOUR_LIVE_KEY_ID`
     - `RAZORPAY_KEY_ID` = `rzp_live_YOUR_LIVE_KEY_ID`
     - `RAZORPAY_KEY_SECRET` = `YOUR_LIVE_KEY_SECRET`
   - Select **Production**, **Preview**, and **Development** targets, then click **Save**.
4. **Redeploy on Vercel**:
   - Go to the **Deployments** tab, click the three dots (`...`) on your latest deployment, and select **Redeploy**.

---

### 2. How to Change the Price in the Future (e.g. ₹199 to ₹500)
We have implemented a **Centralized Price Architecture**. When you change the price, **every single button, badge, checkout order, Razorpay charge, database entry, and email receipt automatically updates**!

The backend enforces this price on Razorpay’s servers — **a customer MUST pay the new price (e.g. ₹500) to receive verified access and the email.**

#### Choose either method:
* **Method A (No code changes needed — via Vercel)**:
  In **Vercel Settings → Environment Variables** (and `.env.local`), add or update:
  ```env
  NEXT_PUBLIC_ALL_ACCESS_PRICE=500
  ```
  Then click **Redeploy** on Vercel.

* **Method B (Directly in Code)**:
  In `src/data/siteConfig.ts`, change line 4:
  ```typescript
  const currentPrice = Number(process.env.NEXT_PUBLIC_ALL_ACCESS_PRICE) || 500;
  ```
  Commit and push to GitHub (`git push origin main`).

---

### 3. How to Change or Update the Google Drive Link
To point to a new Google Drive folder:

1. **In Vercel / `.env.local`**:
   Update the variable `GOOGLE_DRIVE_NOTES_LINK`:
   ```env
   GOOGLE_DRIVE_NOTES_LINK=https://drive.google.com/drive/folders/YOUR_NEW_FOLDER_ID?usp=drive_link
   ```
2. **In Code Fallback (Optional)**:
   In `src/app/payment/page.tsx`, update line 38 (`defaultDriveLink`).
3. Click **Redeploy** on Vercel.  
   *All subsequent purchases will automatically send the new Google Drive link in their confirmation email!*

---

### 4. Code Cleanup Performed
* **Removed Duplicate API Folders**: Deleted obsolete redundant folders `src/app/api/create-order` and `src/app/api/verify-payment`. The active endpoints are `/api/payment/create-order` and `/api/payment/verify`.
* **Email Sender**: Set strictly to `"Prep Library" <learnalways93@gmail.com>`.
* **Dynamic Receipt**: The email receipt automatically displays the exact paid price (e.g. ₹500).

---

## 📬 Support & Inquiries

* **Brand Name**: Prep Library
* **Support Email**: `learnalways93@gmail.com`
* **Instagram**: [@handbook_library](https://www.instagram.com/handbook_library)

