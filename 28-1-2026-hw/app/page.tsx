

import { getRentals } from '@/lib/data';
import ServicesPageClient from './ServicesPageClient';


export default async function ServicesPage() {

  const rentals = await getRentals();

  return (
    <main className="min-h-screen bg-gray-50">

      <ServicesPageClient rentals={rentals} />
    </main>
  );
}


export const metadata = {
  title: 'Rentals & Packages - VIVA Events',
  description: 'Browse our premium event rentals and custom packages for weddings, parties, and corporate events.',
};