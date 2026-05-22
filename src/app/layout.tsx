import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ras Al Assad Electromechanical Works L.L.C | DEWA Certified Solar EPC & MEP Dubai",
  description: "Ras Al Assad Electromechanical Works (RAAEW) is a premier Dubai-based DEWA-certified Solar PV EPC contractor and electromechanical engineering specialist.",
  icons: {
    icon: "/assets/Logos/Website_Favicon-01.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body className="antialiased text-ras-charcoal bg-ras-light">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
