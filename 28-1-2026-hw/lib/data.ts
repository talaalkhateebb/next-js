

import { Rental } from './types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getRentals(): Promise<Rental[]> {

  await delay(100);
  
  const rentals: Rental[] = [
    { id: 1, name: "Cream Cocktail Set", color: "cream", seats: 6, price: 90, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80" },
    { id: 2, name: "Blues Cocktail Set", color: "blues", seats: 6, price: 90, image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&q=80" },
    { id: 3, name: "Blue Cocktail Set", color: "blue", seats: 6, price: 180, image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=500&q=80" },
    { id: 4, name: "Yellow Cocktail Set", color: "yellow", seats: 6, price: 180, image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=80" },
    { id: 5, name: "Green Cocktail Set", color: "green", seats: 6, price: 90, image: "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=500&q=80" },
    { id: 6, name: "Colorful Cocktail Set", color: "colorful", seats: 6, price: 90, image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=500&q=80" },
    { id: 7, name: "Blue & Orange Theme", color: "blue orange", seats: 8, price: 350, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80" },
    { id: 8, name: "Candle Theme", color: "candle", seats: 8, price: 280, image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=500&q=80" },
    { id: 9, name: "Christmas Theme", color: "christmas", seats: 8, price: 300, image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=500&q=80" },
    { id: 10, name: "Black Christmas Theme", color: "black", seats: 8, price: 300, image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=500&q=80" },
    { id: 11, name: "Coral Blue Theme", color: "coral", seats: 8, price: 350, image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&q=80" },
    { id: 12, name: "Colorful Theme", color: "colorful", seats: 8, price: 350, image: "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=500&q=80" },
    { id: 13, name: "Pink Elegance Set", color: "pink", seats: 10, price: 420, image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80" },
    { id: 14, name: "Purple Royal Set", color: "purple", seats: 10, price: 450, image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&q=80" },
    { id: 15, name: "White Wedding Set", color: "white", seats: 12, price: 500, image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500&q=80" },
    { id: 16, name: "Gold Luxury Set", color: "gold", seats: 12, price: 650, image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=500&q=80" },
    { id: 17, name: "Silver Classic Set", color: "silver", seats: 10, price: 580, image: "https://images.unsplash.com/photo-1519167758481-83f29da8c2c0?w=500&q=80" },
    { id: 18, name: "Rustic Wood Set", color: "cream", seats: 8, price: 320, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80" },
    { id: 19, name: "Garden Party Set", color: "green", seats: 15, price: 480, image: "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=500&q=80" },
    { id: 20, name: "Beach Theme Set", color: "blue", seats: 12, price: 400, image: "https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?w=500&q=80" },
    { id: 21, name: "Vintage Rose Set", color: "pink", seats: 8, price: 380, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80" },
    { id: 22, name: "Modern Minimalist", color: "white black", seats: 10, price: 420, image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&q=80" },
    { id: 23, name: "Tropical Paradise", color: "colorful", seats: 15, price: 520, image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=500&q=80" },
    { id: 24, name: "Winter Wonderland", color: "white silver", seats: 12, price: 580, image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=500&q=80" }
  ];
  
  return rentals;
}

export async function getRentalById(id: number): Promise<Rental | null> {
  const rentals = await getRentals();
  return rentals.find(r => r.id === id) || null;
}