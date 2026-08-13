-- ============================================================
-- SKEMA DATABASE SUPABASE — PT BOEMI NUSANTARA KAYA BERKAH
-- ============================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABEL KATEGORI JURUSAN SMK
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL PRODUK ALAT PRAKTIK SMK
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    jurusan TEXT NOT NULL,
    description TEXT NOT NULL,
    specification JSONB DEFAULT '{}'::jsonb,
    standards TEXT[] DEFAULT ARRAY['Standar Industri', 'Kurikulum Merdeka', 'BNSP'],
    price_estimate NUMERIC(15, 2) DEFAULT 0,
    unit TEXT DEFAULT 'Unit',
    image_url TEXT,
    brochure_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL PERMINTAAN KONSULTASI & PENAWARAN (INQUIRIES)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    role_title TEXT DEFAULT 'Kepala Program / Guru Kejuruan',
    email TEXT,
    phone_number TEXT NOT NULL,
    city_province TEXT,
    jurusan_target TEXT[],
    message TEXT NOT NULL,
    budget_range TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'negotiation', 'closed_won', 'closed_lost')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABEL SIMULASI RAB & DRAFT PENAWARAN (QUOTATIONS)
CREATE TABLE IF NOT EXISTS public.quotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_number TEXT UNIQUE NOT NULL,
    school_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    contact_email TEXT,
    total_estimated_amount NUMERIC(15, 2) DEFAULT 0,
    include_ppn BOOLEAN DEFAULT true,
    ppn_amount NUMERIC(15, 2) DEFAULT 0,
    grand_total NUMERIC(15, 2) DEFAULT 0,
    items JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;

-- 7. RLS POLICIES
-- Categories & Products: Siapa saja (publik) bisa baca
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (is_active = true);

-- Inquiries & Quotations: Publik bisa insert (ajukan penawaran/konsultasi)
CREATE POLICY "Public Create Inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Create Quotations" ON public.quotations FOR INSERT WITH CHECK (true);

-- Authenticated Users (Admin): Bisa baca & kelola semua
CREATE POLICY "Admin Full Access Categories" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Inquiries" ON public.inquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Quotations" ON public.quotations FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 8. INITIAL SEED DATA
INSERT INTO public.categories (slug, name, description, icon) VALUES
('tkr-otomotif', 'Teknik Otomotif & TKR/TSM', 'Alat praktik engine trainer, EFI scanner, tyre changer, balancing, & tools box mekanik', 'Car'),
('listrik-mekatronika', 'Teknik Listrik & Mekatronika', 'Trainer PLC, instalasi motor listrik, panel distribusi, osiloskop, & automasi industri', 'Zap'),
('multimedia-dkv', 'Broadcasting & Multimedia DKV', 'Kamera studio profesional, lighting kit, audio mixer, PC workstation rendering & video edit', 'Camera'),
('tata-boga-hotel', 'Tata Boga & Kuliner Perhotelan', 'Commercial kitchen equipment, baking oven deck, food preparation & kitchen hygiene lab', 'Utensils'),
('pemesinan-las', 'Teknik Pemesinan & Pengelasan', 'Mesin bubut konvensional/CNC, mesin frais, mesin las MIG/TIG/SMAW, & safety lab PPE', 'Wrench')
ON CONFLICT (slug) DO NOTHING;
