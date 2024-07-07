import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import NavbarPage from "../components/NavbarPage/NavbarPage";
import FooterPage from "../components/FooterPage/FooterPage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={`${inter.className} antialiased mx-auto max-w-screen-xl`}
        style={{ border: "2px solid"}}
      >
        <NavbarPage />
        <main className="min-h-screen">
          {children}
        </main>
        <FooterPage />
      </body>
    </html>
  );
}
