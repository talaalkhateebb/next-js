
'use client';

import { useState, useMemo } from 'react';
import { Rental } from '@/lib/types';
import RentalCard from './RentalCard';
import RentalFilters from './RentalFilters';

interface RentalsListProps {
  rentals: Rental[];
  onAddToCart: (item: Rental) => void;
}

export default function RentalsList({ rentals, onAddToCart }: RentalsListProps) {
  const [colorFilter, setColorFilter] = useState('');
  const [seatsFilter, setSeatsFilter] = useState(0);

  const handleFilterChange = (color: string, minSeats: number) => {
    setColorFilter(color);
    setSeatsFilter(minSeats);
  };

  const filteredRentals = useMemo(() => {
    return rentals.filter((rental) => {
      const colorMatch = !colorFilter || rental.color.toLowerCase().includes(colorFilter.toLowerCase());
      const seatsMatch = rental.seats >= seatsFilter;
      return colorMatch && seatsMatch;
    });
  }, [rentals, colorFilter, seatsFilter]);

  return (
    <>
      <RentalFilters onFilterChange={handleFilterChange} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredRentals.map((rental) => (
          <RentalCard key={rental.id} rental={rental} onAddToCart={onAddToCart} />
        ))}
      </div>

      {filteredRentals.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">No rentals match your filters</p>
        </div>
      )}
    </>
  );
}