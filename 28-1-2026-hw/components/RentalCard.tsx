

import Image from 'next/image';
import { Rental } from '@/lib/types';
import AddToCartButton from './AddToCartButton';

interface RentalCardProps {
  rental: Rental;
  onAddToCart: (item: Rental) => void;
}

export default function RentalCard({ rental, onAddToCart }: RentalCardProps) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full"
      data-color={rental.color}
      data-seats={rental.seats}
    >

      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={rental.image}
          alt={rental.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-playfair text-2xl text-primary mb-2 font-semibold">
          {rental.name}
        </h3>
        
        <p className="text-gray-600 mb-3 uppercase tracking-wide text-sm font-medium">
          SEATS {rental.seats} GUESTS
        </p>
        
        <div className="mt-auto">
          <strong className="text-3xl text-secondary font-bold block mb-4">
            {rental.price} JD
          </strong>
          
          <AddToCartButton rental={rental} onAddToCart={onAddToCart} />
        </div>
      </div>
    </div>
  );
}