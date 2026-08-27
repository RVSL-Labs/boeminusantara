import * as XLSX from 'xlsx';
import { Product, JurusanKey } from '../types';

export interface ParseExcelResult {
  products: Product[];
  errors: string[];
  totalRowsProcessed: number;
  fileName: string;
}

const DEFAULT_IMAGES: Record<string, string> = {
  'pemesinan-las': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80',
  'tkr-otomotif': 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
  'listrik-mekatronika': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
  'multimedia-dkv': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
  'tata-boga-hotel': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80',
  'default': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80'
};

export const parseProductExcel = async (file: File): Promise<ParseExcelResult> => {
  const errors: string[] = [];
  const products: Product[] = [];
  let totalRowsProcessed = 0;

  try {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];
      const rawRows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (!rawRows || rawRows.length === 0) continue;

      // Detect Jurusan from sheetName or sheet top metadata
      const detectedCategory = detectCategory(sheetName, rawRows);

      // Find Header Row Index
      let headerRowIdx = -1;
      let colMap: Record<string, number> = {};

      for (let i = 0; i < Math.min(rawRows.length, 15); i++) {
        const row = rawRows[i];
        if (!row || !Array.isArray(row)) continue;

        const rowStrs = row.map(cell => String(cell || '').trim().toLowerCase());
        
        const hasNama = rowStrs.some(s => s.includes('nama barang') || s.includes('part number') || s.includes('produk'));
        const hasSpek = rowStrs.some(s => s.includes('spesifikasi') || s.includes('dimensi') || s.includes('type'));
        
        if (hasNama || hasSpek) {
          headerRowIdx = i;
          rowStrs.forEach((colName, colIdx) => {
            if (colName.includes('part number') || colName.includes('sku') || colName.includes('part_num')) {
              colMap['part_number'] = colIdx;
            }
            if (colName.includes('nama barang') || colName.includes('nama_barang') || colName.includes('nama produk')) {
              colMap['name'] = colIdx;
            }
            if (colName.includes('type') || colName.includes('tipe')) {
              colMap['type'] = colIdx;
            }
            if (colName.includes('spesifikasi yang ditawarkan') || colName.includes('spesifikasi ditawarkan')) {
              colMap['specification'] = colIdx;
            } else if (colName.includes('spesifikasi') && colMap['specification'] === undefined) {
              colMap['specification'] = colIdx;
            }
            if (colName.includes('dimensi')) {
              colMap['dimensi'] = colIdx;
            }
            if (colName.includes('merk') || colName.includes('brand')) {
              colMap['brand'] = colIdx;
            }
            if (colName.includes('rrp') || colName.includes('harga') || colName.includes('price')) {
              colMap['price'] = colIdx;
            }
            if (colName.includes('foto') || colName.includes('gambar') || colName.includes('image')) {
              colMap['image'] = colIdx;
            }
          });
          break;
        }
      }

      if (headerRowIdx === -1) {
        // Fallback default column positions if header row not found explicitly
        colMap = { part_number: 1, name: 2, type: 3, specification: 4, price: 6 };
        headerRowIdx = 4;
      }

      // Process Data Rows
      for (let r = headerRowIdx + 1; r < rawRows.length; r++) {
        const row = rawRows[r];
        if (!row || !Array.isArray(row) || row.every(c => c === null || c === undefined || String(c).trim() === '')) {
          continue;
        }

        totalRowsProcessed++;

        const partNumber = colMap['part_number'] !== undefined ? String(row[colMap['part_number']] || '').trim() : '';
        let name = colMap['name'] !== undefined ? String(row[colMap['name']] || '').trim() : '';
        const typeStr = colMap['type'] !== undefined ? String(row[colMap['type']] || '').trim() : '';
        const specRaw = colMap['specification'] !== undefined ? String(row[colMap['specification']] || '').trim() : '';
        const dimensiRaw = colMap['dimensi'] !== undefined ? String(row[colMap['dimensi']] || '').trim() : '';
        const brandRaw = colMap['brand'] !== undefined ? String(row[colMap['brand']] || '').trim() : '';
        const priceRaw = colMap['price'] !== undefined ? row[colMap['price']] : 0;
        const imageRaw = colMap['image'] !== undefined ? String(row[colMap['image']] || '').trim() : '';

        // Clean & Format Name
        if (!name && partNumber) {
          name = partNumber;
        } else if (name && partNumber && partNumber !== 'Zero' && !name.toLowerCase().includes(partNumber.toLowerCase())) {
          name = `${name} ${partNumber}`;
        }

        if (!name) continue; // Skip rows without name

        // Clean Price
        let price = 0;
        if (typeof priceRaw === 'number') {
          price = priceRaw;
        } else if (typeof priceRaw === 'string') {
          const digits = priceRaw.replace(/[^0-9]/g, '');
          price = digits ? parseInt(digits, 10) : 0;
        }

        // Clean Specifications & Key-Values
        const specObj: Record<string, string> = {};
        if (typeStr && typeStr !== name) specObj['Type / Varian'] = typeStr;
        if (brandRaw) specObj['Merk / Brand'] = brandRaw;
        if (dimensiRaw) specObj['Dimensi & Berat'] = dimensiRaw;

        if (specRaw) {
          specRaw.split('\n').forEach(line => {
            const trimmed = line.trim().replace(/^[-•*]\s*/, '');
            if (!trimmed) return;
            if (trimmed.includes(':')) {
              const [k, ...v] = trimmed.split(':');
              if (k && v.length > 0) {
                specObj[k.trim()] = v.join(':').trim();
              }
            } else {
              if (!specObj['Fitur Utama']) {
                specObj['Fitur Utama'] = trimmed;
              } else {
                specObj['Fitur Utama'] += `; ${trimmed}`;
              }
            }
          });
        }

        const sku = partNumber && partNumber !== 'Zero' 
          ? `BN-${detectedCategory.slug.toUpperCase()}-${partNumber.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()}`
          : `BN-${detectedCategory.slug.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const product: Product = {
          id: `imported-${Date.now()}-${r}-${Math.random().toString(36).substr(2, 4)}`,
          sku: sku,
          name: name,
          category_id: `cat-${detectedCategory.slug}`,
          jurusan: detectedCategory.name,
          category_slug: detectedCategory.slug,
          description: specRaw || `${name} terstandar industri pengadaan vokasi SMK.`,
          specification: specObj,
          standards: ['Kurikulum Merdeka SMK', 'Standar Industri APM', 'Sertifikasi Vokasi RI'],
          price_estimate: price,
          unit: 'Unit',
          image_url: isValidUrl(imageRaw) ? imageRaw : DEFAULT_IMAGES[detectedCategory.slug] || DEFAULT_IMAGES['default'],
          is_featured: false,
          is_active: true
        };

        products.push(product);
      }
    }
  } catch (err: any) {
    errors.push(`Gagal membaca file Excel: ${err.message || String(err)}`);
  }

  return {
    products,
    errors,
    totalRowsProcessed,
    fileName: file.name
  };
};

function detectCategory(sheetName: string, rawRows: any[][]): { slug: JurusanKey; name: string } {
  const combinedText = (sheetName + ' ' + rawRows.slice(0, 5).map(r => (r || []).join(' ')).join(' ')).toLowerCase();

  if (combinedText.includes('audio video') || combinedText.includes('tav') || combinedText.includes('multimedia')) {
    return { slug: 'multimedia-dkv', name: 'Teknik Audio Video & Multimedia' };
  }
  if (combinedText.includes('instalasi tenaga listrik') || combinedText.includes('titl') || combinedText.includes('listrik')) {
    return { slug: 'listrik-mekatronika', name: 'Teknik Instalasi Tenaga Listrik (TITL)' };
  }
  if (combinedText.includes('otowasi industri') || combinedText.includes('toi') || combinedText.includes('otomasi')) {
    return { slug: 'listrik-mekatronika', name: 'Teknik Otomasi Industri (TOI)' };
  }
  if (combinedText.includes('sepeda motor') || combinedText.includes('tsm') || combinedText.includes('tkro') || combinedText.includes('otomotif')) {
    return { slug: 'tkr-otomotif', name: 'Teknik Kendaraan Ringan & Sepeda Motor' };
  }
  if (combinedText.includes('pemesinan') || combinedText.includes('daiden') || combinedText.includes('welding') || combinedText.includes('las')) {
    return { slug: 'pemesinan-las', name: 'Teknik Pemesinan & Pengelasan' };
  }

  return { slug: 'pemesinan-las', name: 'Teknik Pemesinan & Pengelasan' };
}

function isValidUrl(urlStr: string): boolean {
  if (!urlStr || typeof urlStr !== 'string') return false;
  return urlStr.startsWith('http://') || urlStr.startsWith('https://');
}
