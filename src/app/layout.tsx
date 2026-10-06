import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '@/data/siteConfig';
import { AccessProvider } from '@/context/AccessContext';
import { AdminDataProvider } from '@/context/AdminDataContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PDFPreviewModal } from '@/components/modals/PDFPreviewModal';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brandName} — Technical Notes & Interview Prep`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  keywords: [
    'Handwritten Notes',
    'Technical Notes',
    'Interview Prep',
    'DSA Algorithms',
    'System Design HLD',
    'Spring Boot Microservices',
    'Java Core Notes',
    'SDET Testing',
    'DevOps Kubernetes',
  ],
  authors: [{ name: siteConfig.brandName }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased flex flex-col min-h-screen">
        <AdminDataProvider>
          <AccessProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <PDFPreviewModal />
          </AccessProvider>
        </AdminDataProvider>
      </body>
    </html>
  );
}

