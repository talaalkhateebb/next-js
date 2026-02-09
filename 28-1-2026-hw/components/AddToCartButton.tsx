
'use client';

import { Rental } from '@/lib/types';

interface AddToCartButtonProps {
  rental: Rental;
  onAddToCart: (item: Rental) => void;
}

export default function AddToCartButton({ rental, onAddToCart }: AddToCartButtonProps) {
  return (
    <button
      onClick={() => onAddToCart(rental)}
      className="w-full bg-secondary text-white px-6 py-3 rounded-full text-base font-semibold
                 transition-all duration-300 
                 hover:bg-primary hover:-translate-y-1 hover:shadow-xl
                 active:translate-y-0 active:shadow-lg
                 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={`Add ${rental.name} to cart`}
    >
      Add to Cart
    </button>
  );
}