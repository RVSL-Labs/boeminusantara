import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QuoteProvider } from "@/components/QuoteProvider";

// Layout storefront: chrome toko (Header + Footer).
// Route group "(shop)" tidak mengubah URL — hanya memisahkan chrome dari /admin.
// QuoteProvider menyediakan "keranjang penawaran" (RFQ) ke seluruh storefront.
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuoteProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </QuoteProvider>
  );
}
