export type AccessStatus = 'NOT_PURCHASED' | 'PURCHASED' | 'BUNDLE_PURCHASED' | 'ALL_ACCESS' | 'LOCKED';

export type NoteTagStatus = 'NEW' | 'UPDATED' | 'POPULAR' | 'NONE';

export interface Note {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  subject?: string;
  description?: string;
  fullDescription?: string;
  pagesCount: number;
  questionsCount?: number;
  topics: string[];
  thumbnail?: string;
  price?: number;
  originalPrice?: number;
  isDemo?: boolean;
  isFeatured?: boolean;
  downloadable?: boolean;
  available?: boolean;
  fileUrl?: string;
  status?: NoteTagStatus;
  tags?: string[];
  updatedDate?: string;
  previewPages?: {
    pageNumber?: number;
    title: string;
    content: string[];
    diagramType?: 'flowchart' | 'code' | 'architecture' | 'bullets';
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  resourceCount: number;
  price: number;
  driveLink?: string;
  previewPdfUrl?: string;
}

export interface Bundle {
  id: string;
  name: string;
  slug: string;
  description: string;
  includedNoteIds: string[];
  includedCategoryIds: string[];
  includedResourcesCount: number;
  includedPdfCount: number;
  price: number;
  originalPrice: number;
  savings: string;
  badge?: string;
  whoItsFor: string[];
  benefits: string[];
  isDemo: boolean;
  status: 'BESTSELLER' | 'POPULAR' | 'NEW';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  companyOrCollege: string;
  content: string;
  rating: number;
  purchasedItem: string;
  isDemo: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Payments' | 'Access' | 'Notes' | 'Bundles';
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  description: string;
  supportEmail: string;
  allAccessPrice: number;
  allAccessOriginalPrice: number;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    github?: string;
  };
  stats: {
    totalNotes: number;
    totalQuestions: number;
    totalSubjects: number;
    updatedLabel: string;
  };
}

export type ProductType = 'all_notes' | 'bundle' | 'individual_subject';

export interface ProductCatalogItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  productType: ProductType;
  price: number;
  originalPrice?: number;
  currency: string;
  driveLink: string;
  active: boolean;
  sortOrder: number;
  includedNoteIds?: string[];
}

