import { createClient } from '@supabase/supabase-js';
import { Product, Inquiry, Quotation } from '../types';
import { INITIAL_PRODUCTS, INITIAL_INQUIRIES } from '../data/initialProducts';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') &&
  supabaseUrl.startsWith('https://')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ============================================================
// LOCAL STORAGE KEYS (FOR OFFLINE / LOCAL MOCK FALLBACK)
// ============================================================
const STORAGE_PRODUCTS_KEY = 'boemi_products_local_v1';
const STORAGE_INQUIRIES_KEY = 'boemi_inquiries_local_v1';
const STORAGE_QUOTATIONS_KEY = 'boemi_quotations_local_v1';

export const getStoredProducts = (): Product[] => {
  try {
    const raw = localStorage.getItem(STORAGE_PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PRODUCTS;
  }
};

export const saveStoredProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(products));
};

export const getStoredInquiries = (): Inquiry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_INQUIRIES_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_INQUIRIES_KEY, JSON.stringify(INITIAL_INQUIRIES));
      return INITIAL_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_INQUIRIES;
  }
};

export const saveStoredInquiries = (inquiries: Inquiry[]) => {
  localStorage.setItem(STORAGE_INQUIRIES_KEY, JSON.stringify(inquiries));
};

export const getStoredQuotations = (): Quotation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_QUOTATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveStoredQuotations = (quotations: Quotation[]) => {
  localStorage.setItem(STORAGE_QUOTATIONS_KEY, JSON.stringify(quotations));
};
