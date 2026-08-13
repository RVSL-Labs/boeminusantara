import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Inquiry, Quotation, RABItem, JurusanKey } from '../types';
import { 
  getStoredProducts, 
  saveStoredProducts, 
  getStoredInquiries, 
  saveStoredInquiries, 
  getStoredQuotations, 
  saveStoredQuotations,
  isSupabaseConfigured,
  supabase
} from '../lib/supabase';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  products: Product[];
  inquiries: Inquiry[];
  quotations: Quotation[];
  rabItems: RABItem[];
  selectedJurusan: JurusanKey;
  searchQuery: string;
  activeProductModal: Product | null;
  isRABModalOpen: boolean;
  isInquiryModalOpen: boolean;
  isAdminModalOpen: boolean;
  isAdminLoggedIn: boolean;
  isConfigured: boolean;
  toasts: Toast[];
  
  // Actions
  setSelectedJurusan: (jurusan: JurusanKey) => void;
  setSearchQuery: (query: string) => void;
  setActiveProductModal: (product: Product | null) => void;
  setIsRABModalOpen: (open: boolean) => void;
  setIsInquiryModalOpen: (open: boolean) => void;
  setIsAdminModalOpen: (open: boolean) => void;
  setIsAdminLoggedIn: (logged: boolean) => void;
  
  // RAB Cart
  addToRAB: (product: Product, quantity?: number) => void;
  updateRABQuantity: (productId: string, quantity: number) => void;
  removeFromRAB: (productId: string) => void;
  clearRAB: () => void;
  
  // Inquiries & Quotes
  submitInquiry: (data: Omit<Inquiry, 'id' | 'created_at' | 'status'>) => Promise<boolean>;
  submitQuotation: (schoolInfo: { name: string; contact: string; phone: string; email: string }) => Promise<Quotation | null>;
  updateInquiryStatus: (inquiryId: string, status: Inquiry['status']) => void;
  
  // Product Management (Admin)
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  
  // Notifications
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [rabItems, setRabItems] = useState<RABItem[]>([]);
  const [selectedJurusan, setSelectedJurusan] = useState<JurusanKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isRABModalOpen, setIsRABModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load Initial Data
  useEffect(() => {
    const loadedProducts = getStoredProducts();
    const loadedInquiries = getStoredInquiries();
    const loadedQuotations = getStoredQuotations();
    
    setProducts(loadedProducts);
    setInquiries(loadedInquiries);
    setQuotations(loadedQuotations);

    // Try fetching from Supabase if configured
    if (isSupabaseConfigured && supabase) {
      supabase.from('products').select('*').then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setProducts(data);
          saveStoredProducts(data);
        }
      });
      supabase.from('inquiries').select('*').order('created_at', { ascending: false }).then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setInquiries(data);
          saveStoredInquiries(data);
        }
      });
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // RAB Management
  const addToRAB = (product: Product, quantity = 1) => {
    setRabItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.name}" ditambahkan ke Simulasi RAB`, 'success');
  };

  const updateRABQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromRAB(productId);
      return;
    }
    setRabItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromRAB = (productId: string) => {
    setRabItems(prev => prev.filter(item => item.product.id !== productId));
    showToast('Alat dihapus dari Simulasi RAB', 'info');
  };

  const clearRAB = () => {
    setRabItems([]);
  };

  // Submit Inquiry Form
  const submitInquiry = async (data: Omit<Inquiry, 'id' | 'created_at' | 'status'>): Promise<boolean> => {
    const newInquiry: Inquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: 'new'
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    saveStoredInquiries(updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('inquiries').insert([{
          school_name: data.school_name,
          contact_person: data.contact_person,
          role_title: data.role_title,
          email: data.email,
          phone_number: data.phone_number,
          city_province: data.city_province,
          jurusan_target: data.jurusan_target,
          message: data.message,
          budget_range: data.budget_range,
          status: 'new'
        }]);
      } catch (err) {
        console.warn('Supabase sync error:', err);
      }
    }

    showToast('Permintaan konsultasi berhasil dikirim! Tim Boemi Nusantara akan segera menghubungi Anda.', 'success');
    return true;
  };

  // Submit Quotation / RAB
  const submitQuotation = async (schoolInfo: { name: string; contact: string; phone: string; email: string }): Promise<Quotation | null> => {
    if (rabItems.length === 0) {
      showToast('Simulasi RAB masih kosong', 'error');
      return null;
    }

    const items = rabItems.map(item => ({
      sku: item.product.sku,
      name: item.product.name,
      qty: item.quantity,
      price: item.product.price_estimate,
      subtotal: item.product.price_estimate * item.quantity,
      unit: item.product.unit
    }));

    const totalEstimated = items.reduce((sum, it) => sum + it.subtotal, 0);
    const ppn = totalEstimated * 0.11;
    const grandTotal = totalEstimated + ppn;
    const quoteNumber = `BNKB-RAB-${Math.floor(100000 + Math.random() * 900000)}`;

    const newQuotation: Quotation = {
      id: `quote-${Date.now()}`,
      quote_number: quoteNumber,
      school_name: schoolInfo.name,
      contact_name: schoolInfo.contact,
      contact_phone: schoolInfo.phone,
      contact_email: schoolInfo.email,
      total_estimated_amount: totalEstimated,
      include_ppn: true,
      ppn_amount: ppn,
      grand_total: grandTotal,
      items,
      status: 'draft',
      created_at: new Date().toISOString()
    };

    const updated = [newQuotation, ...quotations];
    setQuotations(updated);
    saveStoredQuotations(updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('quotations').insert([newQuotation]);
      } catch (err) {
        console.warn('Supabase quotation sync error:', err);
      }
    }

    showToast(`Dokumen Estimasi RAB #${quoteNumber} berhasil diterbitkan!`, 'success');
    return newQuotation;
  };

  const updateInquiryStatus = (inquiryId: string, status: Inquiry['status']) => {
    const updated = inquiries.map(inq => inq.id === inquiryId ? { ...inq, status } : inq);
    setInquiries(updated);
    saveStoredInquiries(updated);
    showToast('Status inquiry berhasil diperbarui', 'info');
  };

  // Product CRUD (Admin)
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`
    };
    const updated = [newProd, ...products];
    setProducts(updated);
    saveStoredProducts(updated);
    showToast('Alat praktik baru berhasil ditambahkan ke katalog', 'success');
  };

  const updateProduct = (prod: Product) => {
    const updated = products.map(p => p.id === prod.id ? prod : p);
    setProducts(updated);
    saveStoredProducts(updated);
    showToast('Data produk berhasil diperbarui', 'success');
  };

  const deleteProduct = (productId: string) => {
    const updated = products.filter(p => p.id !== productId);
    setProducts(updated);
    saveStoredProducts(updated);
    showToast('Produk dihapus dari katalog', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        inquiries,
        quotations,
        rabItems,
        selectedJurusan,
        searchQuery,
        activeProductModal,
        isRABModalOpen,
        isInquiryModalOpen,
        isAdminModalOpen,
        isAdminLoggedIn,
        isConfigured: isSupabaseConfigured,
        toasts,
        setSelectedJurusan,
        setSearchQuery,
        setActiveProductModal,
        setIsRABModalOpen,
        setIsInquiryModalOpen,
        setIsAdminModalOpen,
        setIsAdminLoggedIn,
        addToRAB,
        updateRABQuantity,
        removeFromRAB,
        clearRAB,
        submitInquiry,
        submitQuotation,
        updateInquiryStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
