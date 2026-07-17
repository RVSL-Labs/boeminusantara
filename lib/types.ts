export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string; // category slug (jurusan SMK)
  description: string;
  /** Harga dasar dalam Rupiah, EXCLUDE PPN. */
  price: number;
  stock: number;
  image: string | null;
  active: boolean;
};
