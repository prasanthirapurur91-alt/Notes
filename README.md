# Prep Library — Technical PDF Notes & Interview Marketplace

**Prep Library** is a modern, responsive web application designed for engineering students, software developers, and QA professionals to access 200+ handwritten PDF technical notes and 1,500+ interview Q&As across 26 technical categories.

---

## 🌟 Key Features

* **White & Black Aesthetic**: Clean, high-contrast white background with solid black action buttons (`bg-black text-white hover:bg-neutral-800`).
* **26 Technical Categories**: Java & Spring, Python, JavaScript/TypeScript, DSA, Web Dev, Databases, System Design, Operating Systems, Computer Networks, Cybersecurity, QA/Testing, DevOps, GenAI, and more.
* **109 Handcrafted PDF Items**: Complete categorized PDF notes ready for learning and quick revision.
* **Locked Resource Preview**: Displays key topics, pages count, and sample content points with a 3-page limit.
* **Razorpay Payment Integration**: Streamlined checkout for the ₹199 Complete All-Access Pass (Original M.R.P. ₹699).
* **Automated Delivery & Supabase Sync**: Real-time order recording into Supabase database and direct Google Drive folder access link delivery upon payment confirmation.
* **Fully Responsive**: Optimized for mobile, tablet, and desktop screens.

---

## 🚀 Tech Stack

* **Framework**: Next.js 16 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Database**: Supabase (PostgreSQL)
* **Payment Gateway**: Razorpay Integration
* **Icons**: Lucide React

---

## 📂 Folder Structure

```
note-craft-marketplace/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── payment/verify/route.ts  # Server-side payment verification & Supabase sync
│   │   │   └── pdf/download/route.ts    # Secure PDF stream handler
│   │   ├── notes/                      # Notes catalogue & detail views
│   │   ├── payment/                    # Checkout page (₹199 offer)
│   │   ├── globals.css                 # Global CSS rules & variables
│   │   ├── layout.tsx                  # Base layout wrapper
│   │   └── page.tsx                    # Store Home page
│   ├── components/
│   │   ├── cards/                      # Note cards & UI components
│   │   ├── common/                     # Search bar, badges, section headers
│   │   ├── home/                       # Hero section & store catalogue
│   │   ├── layout/                     # Sticky Navbar & Footer (@handbook_library)
│   │   ├── modals/                     # PDF preview modal
│   │   └── notes/                      # Notes Catalogue list view
│   ├── context/                        # Access & Admin Data Contexts
│   ├── data/                           # 26 Categories, 109 Notes, siteConfig
│   ├── lib/                            # Supabase client initialization
│   └── types/                          # TypeScript definitions
├── public/                             # Static assets
├── supabase/
│   └── schema.sql                      # SQL DDL script for Supabase orders table
├── .env.local                          # Environment variables
├── next.config.ts                      # Next.js configuration
├── package.json                        # Project dependencies
└── README.md                           # Documentation
```

---

## ⚙️ Environment Variables Setup (`.env.local`)

Create a `.env.local` file in the root directory and add your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ttmkugpqtjuarthoeaiw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_srX0yYrtln5m1lIFyw-rwA_JbTWFeJT
SUPABASE_SERVICE_ROLE_KEY=sb_publishable_srX0yYrtln5m1lIFyw-rwA_JbTWFeJT

# Google Drive Access Folder Link
GOOGLE_DRIVE_NOTES_LINK=https://drive.google.com/drive/folders/1ohYqODYiQmYbZSJ1j9fNx-_1sqA5xDlJ?usp=drive_link

# Support Contact
NEXT_PUBLIC_SUPPORT_EMAIL=prasanthirapuru.r91@gmail.com

# Razorpay Payment Gateway Credentials
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

---

## 🗄️ Database Setup (Supabase)

Run the following DDL script in your **Supabase SQL Editor**:

```sql
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    product_id TEXT,
    product_type TEXT,
    product_name TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    payment_provider TEXT DEFAULT 'razorpay',
    transaction_id TEXT UNIQUE NOT NULL,
    payment_status TEXT DEFAULT 'paid',
    delivery_status TEXT DEFAULT 'sent',
    google_drive_link TEXT DEFAULT 'https://drive.google.com/drive/folders/1ohYqODYiQmYbZSJ1j9fNx-_1sqA5xDlJ?usp=drive_link',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow server insertion" ON public.orders
    FOR ALL
    USING (true)
    WITH CHECK (true);
```

---

## 🛠️ Local Development & Build Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Start production server locally
npm run start
```

---

## 🌐 Deploying to Vercel & Pushing to GitHub

### **1. Push Code to GitHub**
Run the following commands in your terminal to push your repository to GitHub:

```bash
git add .
git commit -m "Complete Prep Library Website"
git remote add origin https://github.com/your-username/your-repo-name.git
git branch -M main
git push -u origin main
```

### **2. Deploy to Vercel**
1. Sign in to [Vercel](https://vercel.com) using GitHub.
2. Select your repository `note-craft-marketplace`.
3. Add your environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_DRIVE_NOTES_LINK`).
4. Click **Deploy**. Vercel will generate your live production URL (e.g., `https://prep-library.vercel.app`).

### **3. Connect Live URL to Razorpay**
1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Navigate to **Account & Settings -> Website & App Details**.
3. Paste your live Vercel URL (`https://prep-library.vercel.app`).
4. Generate your **Live Key ID** & **Key Secret** and add them to your Vercel Environment Variables.

---

## 📧 Support Contact

* **Instagram**: [@handbook_library](https://www.instagram.com/handbook_library)
* **Email**: `prasanthirapuru.r91@gmail.com`
