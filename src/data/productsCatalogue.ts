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

export const defaultProductsCatalogue: ProductCatalogItem[] = [
  {
    id: 'prod-all-notes',
    name: 'Complete PDF Notes Collection Access',
    slug: 'all-notes-collection',
    description: 'Complete access to 200+ handwritten technical PDF notes and 1,500+ interview Q&As across all categories.',
    productType: 'all_notes',
    price: 199,
    originalPrice: 699,
    currency: 'INR',
    driveLink: process.env.GOOGLE_DRIVE_NOTES_LINK || 'https://drive.google.com/drive/folders/1ohYqODYiQmYbZSJ1j9fNx-_1sqA5xDlJ?usp=drive_link',
    active: true,
    sortOrder: 1,
  },
  {
    id: 'prod-sdet-bundle',
    name: 'QA / SDET Job Preparation Bundle',
    slug: 'sdet-job-prep-bundle',
    description: 'Comprehensive QA automation package covering Selenium, Playwright, RestAssured API testing, BDD Cucumber & Core CS fundamentals.',
    productType: 'bundle',
    price: 199,
    originalPrice: 699,
    currency: 'INR',
    driveLink: process.env.GOOGLE_DRIVE_SDET_BUNDLE_LINK || 'https://drive.google.com/drive/folders/1ohYqODYiQmYbZSJ1j9fNx-_1sqA5xDlJ?usp=drive_link',
    active: true,
    sortOrder: 2,
    includedNoteIds: ['note-sdet-testing-handbook', 'note-cs-fundamentals-os-cn', 'note-python-advanced'],
  },
];
