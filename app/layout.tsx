import type { Metadata } from "next";
import "./globals.css";


import { Navbar } from "@/components/Navbar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Ruzagar.af",
    template: "%s | Ruzagar.af",
  },
  description: "Afghanistan job, training, and tender portal built with Next.js 16.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
