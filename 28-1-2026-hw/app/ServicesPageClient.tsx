
'use client';

import { useState, useEffect } from 'react';
import { Rental } from '@/lib/types';
import PackageCalculator from '@/components/PackageCalculator';
import RentalsList from '@/components/RentalsList';

interface CartItem extends Rental {
  quantity: number;
}

export default function ServicesPageClient({ rentals }: { rentals: Rental[] }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('vivaCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('vivaCart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('vivaCart');
    }
  }, [cart]);

  const addToCart = (item: any) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        showToastMessage(`Updated ${item.name} quantity in cart`);
        return newCart;
      } else {
        showToastMessage(`${item.name} added to cart!`);
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>

      <div className="bg-gradient-to-br from-primary to-secondary pt-32 pb-20 text-center text-white mt-16 px-6">
        <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl mb-6 font-bold">
          Rentals & Packages
        </h1>
        <p className="text-xl sm:text-2xl opacity-95 max-w-3xl mx-auto">
          Create unforgettable moments with our premium event services
        </p>
      </div>

      {totalItems > 0 && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 
                        bg-secondary text-white px-4 sm:px-6 py-2 sm:py-3 
                        rounded-full shadow-2xl font-bold text-base sm:text-lg
                        transition-all duration-300 hover:bg-primary hover:scale-105">
          🛒 {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </div>
      )}

      <PackageCalculator onAddToCart={addToCart} />

      <section className="max-w-7xl mx-auto my-20 px-6 sm:px-10">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl sm:text-5xl text-primary mb-4 font-bold inline-block relative">
            Browse Our Premium Rentals
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-secondary 
                           -mb-4 rounded-full"></span>
          </h2>
        </div>

        <RentalsList rentals={rentals} onAddToCart={addToCart} />

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 mt-16 border-2 border-gray-100">
          <h3 className="font-playfair text-2xl sm:text-3xl text-primary mb-6 text-center font-semibold">
            Important Notes
          </h3>
          <ul className="space-y-3 text-gray-700 max-w-2xl mx-auto text-base sm:text-lg">
            <li className="flex items-start">
              <span className="text-secondary mr-3 text-xl">✓</span>
              <span>Prices are in Jordanian Dinar</span>
            </li>
            <li className="flex items-start">
              <span className="text-secondary mr-3 text-xl">✓</span>
              <span>Delivery charges will be calculated based on location</span>
            </li>
            <li className="flex items-start">
              <span className="text-secondary mr-3 text-xl">✓</span>
              <span>Flowers will be delivered fresh in containers</span>
            </li>
            <li className="flex items-start">
              <span className="text-secondary mr-3 text-xl">✓</span>
              <span>Orders must be placed at least 3 days prior to the event</span>
            </li>
            <li className="flex items-start">
              <span className="text-secondary mr-3 text-xl">✓</span>
              <span>Rental charges do not cover lost or damaged items</span>
            </li>
          </ul>
        </div>
      </section>
      {showToast && (
        <div className="fixed bottom-8 right-8 
                        bg-green-500 text-white 
                        px-6 sm:px-8 py-3 sm:py-4 
                        rounded-lg shadow-2xl 
                        animate-fadeInScale z-50
                        max-w-sm">
          <div className="flex items-center">
            <span className="text-2xl mr-3">✓</span>
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}