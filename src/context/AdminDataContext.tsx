'use client';

import React, { createContext, useContext, useState } from 'react';
import { Note, Category } from '@/types';
import { notes as initialNotes } from '@/data/notes';
import { categories as initialCategories } from '@/data/categories';

export interface ProductPrice {
  id: string;
  name: string;
  type: 'category' | 'bundle' | 'all-access';
  price: number;
  originalPrice?: number;
  targetId?: string;
  driveLink?: string;
  enabled: boolean;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  email: string;
  amount: number;
  date: string;
  time: string;
  transactionId: string;
  productName: string;
}

interface AdminDataContextType {
  categories: Category[];
  notes: Note[];
  subjectsMap: Record<string, string[]>;
  products: ProductPrice[];
  orders: CustomerOrder[];
  adminEmail: string;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addSubject: (categoryId: string, subjectName: string) => void;
  deleteSubject: (categoryId: string, subjectName: string) => void;
  addNote: (note: Omit<Note, 'id'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  toggleNoteDownloadable: (id: string, downloadable: boolean) => void;
  toggleNoteAvailability: (id: string, available: boolean) => void;
  updateProductPrice: (id: string, price: number) => void;
  updateDriveLink: (productId: string, link: string) => void;
  addCategoryPrice: (categoryId: string, price: number) => void;
  deleteCategoryPrice: (categoryId: string) => void;
  addOrder: (order: Omit<CustomerOrder, 'id'>) => void;
}

const initialSubjects: Record<string, string[]> = {
  'cat-programming': ['C', 'C++', 'Java', 'Python', 'JavaScript', 'Go'],
  'cat-backend': ['Spring Boot', 'Node.js', 'Express', 'Microservices', 'REST APIs'],
  'cat-dsa': ['Data Structures', 'Algorithms', 'Trees & Graphs', 'Dynamic Programming', 'LeetCode Patterns'],
  'cat-system-design': ['System Design Handbook', 'HLD Architecture', 'Low-Level Design (LLD)', 'SOLID Principles', 'Design Patterns'],
  'cat-testing': ['Selenium WebDriver', 'Playwright', 'RestAssured API', 'Cucumber BDD'],
  'cat-devops': ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
  'cat-database': ['SQL & DBMS', 'PostgreSQL Internals', 'MongoDB', 'Redis Caching'],
  'cat-cs': ['Operating Systems', 'Computer Networks', 'DBMS Theory'],
  'cat-ai': ['Transformers', 'RAG Pipelines', 'Vector DBs', 'Machine Learning Math'],
  'cat-handbooks': ['10-Min Revision', 'Complexity Matrix', 'Interview Gotchas'],
  'cat-aptitude': ['Speed Math', 'Probability & P&C', 'Time & Work', 'Puzzles'],
};

const initialProductsList: ProductPrice[] = [
  {
    id: 'prod-all-access',
    name: 'Complete PDF Notes Collection Access',
    type: 'all-access',
    price: 99,
    originalPrice: 399,
    driveLink: process.env.GOOGLE_DRIVE_NOTES_LINK || '',
    enabled: true,
  },
  {
    id: 'prod-sdet-bundle',
    name: 'QA / SDET Job Preparation Bundle',
    type: 'bundle',
    price: 99,
    originalPrice: 299,
    driveLink: process.env.GOOGLE_DRIVE_SDET_BUNDLE_LINK || '',
    enabled: true,
  },
];

const initialOrdersList: CustomerOrder[] = [];

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [subjectsMap, setSubjectsMap] = useState<Record<string, string[]>>(initialSubjects);
  const [products, setProducts] = useState<ProductPrice[]>(initialProductsList);

  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    if (typeof window === 'undefined') return initialOrdersList;
    try {
      const stored = localStorage.getItem('pv_admin_orders');
      return stored ? JSON.parse(stored) : initialOrdersList;
    } catch {
      return initialOrdersList;
    }
  });

  const adminEmail = 'learnalways93@gmail.com';

  // Save changes to localStorage helper
  const saveState = (
    newCats?: Category[],
    newNotes?: Note[],
    newSubjs?: Record<string, string[]>,
    newProds?: ProductPrice[],
    newOrders?: CustomerOrder[]
  ) => {
    try {
      if (newCats) {
        setCategories(newCats);
        localStorage.setItem('pv_admin_categories', JSON.stringify(newCats));
      }
      if (newNotes) {
        setNotes(newNotes);
        localStorage.setItem('pv_admin_notes', JSON.stringify(newNotes));
      }
      if (newSubjs) {
        setSubjectsMap(newSubjs);
        localStorage.setItem('pv_admin_subjects', JSON.stringify(newSubjs));
      }
      if (newProds) {
        setProducts(newProds);
        localStorage.setItem('pv_admin_products', JSON.stringify(newProds));
      }
      if (newOrders) {
        setOrders(newOrders);
        localStorage.setItem('pv_admin_orders', JSON.stringify(newOrders));
      }
    } catch (e) {
      console.error('Failed to save admin state:', e);
    }
  };

  const addCategory = (catInput: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...catInput,
      id: `cat-${Date.now()}`,
    };
    const updated = [...categories, newCat];
    saveState(updated);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    const updated = categories.map((c) => (c.id === id ? { ...c, ...updates } : c));
    saveState(updated);
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    saveState(updated);
  };

  const addSubject = (categoryId: string, subjectName: string) => {
    const current = subjectsMap[categoryId] || [];
    if (!current.includes(subjectName)) {
      const updated = { ...subjectsMap, [categoryId]: [...current, subjectName] };
      saveState(undefined, undefined, updated);
    }
  };

  const deleteSubject = (categoryId: string, subjectName: string) => {
    const current = subjectsMap[categoryId] || [];
    const updated = { ...subjectsMap, [categoryId]: current.filter((s) => s !== subjectName) };
    saveState(undefined, undefined, updated);
  };

  const addNote = (noteInput: Omit<Note, 'id'>) => {
    const newNote: Note = {
      ...noteInput,
      id: `note-${Date.now()}`,
      downloadable: noteInput.downloadable !== undefined ? noteInput.downloadable : true,
    };
    const updated = [newNote, ...notes];
    saveState(undefined, updated);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    const updated = notes.map((n) => (n.id === id ? { ...n, ...updates } : n));
    saveState(undefined, updated);
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    saveState(undefined, updated);
  };

  const toggleNoteDownloadable = (id: string, downloadable: boolean) => {
    updateNote(id, { downloadable });
  };

  const toggleNoteAvailability = (id: string, available: boolean) => {
    updateNote(id, { isDemo: available });
  };

  const updateProductPrice = (id: string, price: number) => {
    const updated = products.map((p) => (p.id === id ? { ...p, price } : p));
    saveState(undefined, undefined, undefined, updated);
  };

  const updateDriveLink = (productId: string, link: string) => {
    const updated = products.map((p) => (p.id === productId ? { ...p, driveLink: link } : p));
    saveState(undefined, undefined, undefined, updated);
  };

  const addCategoryPrice = (categoryId: string, price: number) => {
    const catObj = categories.find((c) => c.id === categoryId);
    const existing = products.find((p) => p.targetId === categoryId);
    if (existing) {
      updateProductPrice(existing.id, price);
    } else {
      const newProd: ProductPrice = {
        id: `prod-${Date.now()}`,
        name: `${catObj ? catObj.name : 'Category'} Pass`,
        type: 'category',
        targetId: categoryId,
        price,
        originalPrice: price * 2,
        enabled: true,
      };
      const updated = [...products, newProd];
      saveState(undefined, undefined, undefined, updated);
    }
  };

  const deleteCategoryPrice = (categoryId: string) => {
    const updated = products.filter((p) => p.targetId !== categoryId);
    saveState(undefined, undefined, undefined, updated);
  };

  const addOrder = (orderInput: Omit<CustomerOrder, 'id'>) => {
    const newOrder: CustomerOrder = {
      ...orderInput,
      id: `ord-${Date.now()}`,
    };
    const updated = [newOrder, ...orders];
    saveState(undefined, undefined, undefined, undefined, updated);
  };

  return (
    <AdminDataContext.Provider
      value={{
        categories,
        notes,
        subjectsMap,
        products,
        orders,
        adminEmail,
        addCategory,
        updateCategory,
        deleteCategory,
        addSubject,
        deleteSubject,
        addNote,
        updateNote,
        deleteNote,
        toggleNoteDownloadable,
        toggleNoteAvailability,
        updateProductPrice,
        updateDriveLink,
        addCategoryPrice,
        deleteCategoryPrice,
        addOrder,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};

