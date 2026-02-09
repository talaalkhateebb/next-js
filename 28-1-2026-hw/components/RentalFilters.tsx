
'use client';

import { useState } from 'react';

interface RentalFiltersProps {
  onFilterChange: (color: string, minSeats: number) => void;
}

export default function RentalFilters({ onFilterChange }: RentalFiltersProps) {
  const [selectedColor, setSelectedColor] = useState('');
  const [minSeats, setMinSeats] = useState('');

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onFilterChange(color, parseInt(minSeats) || 0);
  };

  const handleSeatsChange = (seats: string) => {
    setMinSeats(seats);
    onFilterChange(selectedColor, parseInt(seats) || 0);
  };

  return (
    <div className="flex gap-4 justify-center mb-12 flex-wrap max-w-2xl mx-auto">

      <select
        value={selectedColor}
        onChange={(e) => handleColorChange(e.target.value)}
        className="px-5 py-3 text-base bg-white border-2 border-gray-200 rounded-xl 
                   outline-none transition-all duration-300 
                   hover:border-primary focus:border-primary focus:shadow-lg
                   cursor-pointer min-w-[200px] flex-1"
      >
        <option value="">All Colors</option>
        <option value="cream">Cream</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="colorful">Colorful</option>
        <option value="black">Black</option>
        <option value="coral">Coral</option>
        <option value="blues">Blues</option>
        <option value="orange">Orange</option>
        <option value="candle">Candle</option>
        <option value="christmas">Christmas</option>
        <option value="pink">Pink</option>
        <option value="purple">Purple</option>
        <option value="white">White</option>
        <option value="gold">Gold</option>
        <option value="silver">Silver</option>
      </select>

      <input
        type="number"
        placeholder="Minimum Seats"
        value={minSeats}
        onChange={(e) => handleSeatsChange(e.target.value)}
        min="1"
        className="px-5 py-3 text-base bg-white border-2 border-gray-200 rounded-xl 
                   outline-none transition-all duration-300 
                   hover:border-primary focus:border-primary focus:shadow-lg
                   min-w-[200px] flex-1"
      />
    </div>
  );
}