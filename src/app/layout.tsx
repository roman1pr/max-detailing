import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { BookingModal } from "@/components/booking-modal";
import { CookieBanner } from "@/components/cookie-banner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { UIProvider } from "@/components/ui-provider";
import { site } from "@/data/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.legalName} в Академке`,
    template: `%s | ${site.legalName}`,
  },
  description: site.description,
  metadataBase: new URL("https://maxdetailing.ru"),
  icons: {
    icon: [{ url: "/media/brand/favicon-32.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/media/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${unbounded.variable} h-full bg-ink antialiased`}
    >
      <body className="min-h-full bg-ink text-foam">
        <UIProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BookingModal />
          <CookieBanner />
        </UIProvider>
      </body>
    </html>
  );
}
