import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClientLayout } from "@/components/layout/ClientLayout";
import "./globals.css";

const montserrat = localFont({
  src: [
    {
      path: "../../public/fonts/Montserrat/Montserrat-VariableFont_wght.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../../public/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aura.com"),
  title: {
    default: "Aura",
    template: "%s | Aura",
  },
  description: "AI-Powered Intelligent Sensory Technology Redefines Intimacy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans`}>
        <ClientLayout>
          <Header />
          {children}
          <Footer />
        </ClientLayout>
        <noscript>
          <div className="bg-brand-pink p-4 text-center text-white">
            Please enable JavaScript to use this website.
          </div>
        </noscript>
      </body>
    </html>
  );
}
