import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './Providers';
import Navbar from '@/components/main/Navbar/Navbar';
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/main/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shopping Cart',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} grid min-h-svh`}>
        <Providers>
          <Navbar />
          <main className='container mx-auto py-5 sm:py-10 md:py-20'>
            {children}
          </main>
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
