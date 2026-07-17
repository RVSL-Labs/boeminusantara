// Kategori toko = jurusan SMK sesuai katalog (Excel LISTING PRODUK). Admin bisa tambah nanti.
export type Category = {
  slug: string;
  name: string;
};

export const CATEGORIES: Category[] = [
  { slug: "tkro", name: "Teknik Kendaraan Ringan (TKRO)" },
  { slug: "titl", name: "Teknik Instalasi Tenaga Listrik (TITL)" },
  { slug: "toi", name: "Teknik Otomasi Industri (TOI)" },
  { slug: "tav", name: "Teknik Audio Video (TAV)" },
];

export function categoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}
