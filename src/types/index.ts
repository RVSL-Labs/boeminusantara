export type JurusanKey = 
  | 'all'
  | 'tkr-otomotif'
  | 'listrik-mekatronika'
  | 'multimedia-dkv'
  | 'tata-boga-hotel'
  | 'pemesinan-las';

export interface Category {
  id: string;
  slug: JurusanKey;
  name: string;
  description: string;
  icon: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category_id: string;
  jurusan: string;
  category_slug: JurusanKey;
  description: string;
  specification: Record<string, string>;
  standards: string[];
  price_estimate: number;
  unit: string;
  image_url: string;
  is_featured: boolean;
  is_active: boolean;
}

export interface RABItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface Inquiry {
  id: string;
  school_name: string;
  contact_person: string;
  role_title?: string;
  email?: string;
  phone_number: string;
  city_province?: string;
  jurusan_target: string[];
  message: string;
  budget_range?: string;
  status: 'new' | 'contacted' | 'quoted' | 'negotiation' | 'closed_won' | 'closed_lost';
  created_at: string;
}

export interface Quotation {
  id: string;
  quote_number: string;
  school_name: string;
  contact_name: string;
  contact_phone: string;
  contact_email?: string;
  total_estimated_amount: number;
  include_ppn: boolean;
  ppn_amount: number;
  grand_total: number;
  items: Array<{
    sku: string;
    name: string;
    qty: number;
    price: number;
    subtotal: number;
    unit: string;
  }>;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  created_at: string;
}
