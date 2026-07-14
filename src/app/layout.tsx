import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeModeScript } from 'flowbite-react';
import './globals.css';
import NavbarPage from '../components/NavbarPage/NavbarPage';
import FooterPage from '../components/FooterPage/FooterPage';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://israelramosm.github.io'),
  title: 'Next.js + Flowbite Template',
  description:
    'A Next.js 16, Tailwind CSS, and Flowbite React template deployed to GitHub Pages with Bun.',
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
        className={`${inter.className} flex min-h-dvh flex-col antialiased`}
      >
        <NavbarPage />
        <main className="relative flex-1">{children}</main>
        <FooterPage />
      </body>
    </html>
  );
}
