import { SiteConfig } from '@/types';

// Central All-Access Price (Can be overridden via NEXT_PUBLIC_ALL_ACCESS_PRICE or changed here)
const currentPrice = Number(process.env.NEXT_PUBLIC_ALL_ACCESS_PRICE) || 199;

export const siteConfig: SiteConfig = {
  brandName: 'Prep Library',
  tagline: 'Learn. Revise. Grow.',
  description: 'Explore 200+ handwritten technical PDF notes and 1500+ interview questions, plus QA/SDET preparation and automation resources.',
  supportEmail: 'learnalways93@gmail.com',
  allAccessPrice: currentPrice,
  allAccessOriginalPrice: Math.round(currentPrice * 3.5),
  socialLinks: {
    instagram: 'https://www.instagram.com/handbook_library',
  },
  stats: {
    totalNotes: 200,
    totalQuestions: 1500,
    totalSubjects: 50,
    updatedLabel: 'Regularly Updated',
  },
};



