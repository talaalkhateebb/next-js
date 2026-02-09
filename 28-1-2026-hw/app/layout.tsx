

import type { Metadata } from 'next';
import { Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '600'],
});

export const metadata: Metadata = {
  title: 'VIVA Events - Premium Event Services',
  description: 'Create unforgettable moments with VIVA Events premium rentals and packages',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${cormorant.variable} antialiased`}>
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-40 py-4 px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="font-playfair text-3xl text-primary font-bold">VIVA Events</h1>
            <nav className="flex gap-8 text-lg">
              <a href="/" className="text-gray-700 hover:text-primary transition-colors">
                Home
              </a>
              <a href="/" className="text-gray-700 hover:text-primary transition-colors">
                Services
              </a>
              <a href="/" className="text-gray-700 hover:text-primary transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="bg-gray-900 text-white py-12 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="font-playfair text-2xl mb-4">Contact Us</h2>
              <p className="mb-2">
                <strong>For your next wedding, party, or corporate event</strong>
              </p>
              <p>
                <strong>VIVA Events</strong>
              </p>
              <p>T: +962 790055163</p>
              <p>info@vivaevents.jo</p>
            </div>

            <div>
              <p>P.O. Box 123456</p>
              <p>Amman 11196, Jordan</p>
              <p className="mt-4">© 2025 VIVA Events</p>
            </div>

            <div>
              <h2 className="font-playfair text-2xl mb-4">Social</h2>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}