
'use client';

import { useState } from 'react';

interface PackageResult {
  name: string;
  price: number;
  style: string;
  guests: number;
}

export default function PackageCalculator({ onAddToCart }: { onAddToCart: (item: any) => void }) {
  const [eventType, setEventType] = useState('');
  const [guests, setGuests] = useState('');
  const [style, setStyle] = useState('');
  const [result, setResult] = useState<PackageResult | null>(null);

  const calculatePackage = () => {
    if (!eventType || !guests || !style) {
      alert('Please complete all fields');
      return;
    }

    let price = 0;
    let packageName = '';

    switch (eventType) {
      case 'wedding':
        price = 3000;
        packageName = 'Viva Wedding Bliss';
        break;
      case 'birthday':
        price = 800;
        packageName = 'Viva Birthday Fun';
        break;
      case 'engagement':
        price = 1500;
        packageName = 'Viva Engagement Sparkle';
        break;
      case 'party':
        price = 1000;
        packageName = 'Viva Party Night';
        break;
    }

    const guestCount = parseInt(guests);
    if (guestCount > 100) price += 1000;
    else if (guestCount > 50) price += 500;

    if (style === 'luxury') price += 2000;
    else if (style === 'modern') price += 800;

    setResult({
      name: packageName,
      price,
      style: style.charAt(0).toUpperCase() + style.slice(1),
      guests: guestCount,
    });
  };

  const handleAddToCart = () => {
    if (result) {
      const packageItem = {
        id: 'package-' + Date.now(),
        name: result.name,
        price: result.price,
        description: `${result.style} style, ${result.guests} guests`,
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80',
      };
      onAddToCart(packageItem);
    }
  };

  return (
    <section className="max-w-5xl mx-auto my-20 px-6 sm:px-10">
      <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12">

        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl sm:text-5xl text-primary mb-4 font-bold">
            Create Your Perfect Package
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Customize your event package based on your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="px-5 py-4 text-base bg-gray-50 border-2 border-gray-200 rounded-xl 
                       outline-none transition-all duration-300 
                       hover:border-primary focus:border-primary focus:bg-white focus:shadow-lg
                       cursor-pointer w-full"
          >
            <option value="">Select Event Type</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday Party</option>
            <option value="engagement">Engagement</option>
            <option value="party">Party</option>
          </select>

          <input
            type="number"
            placeholder="Number of Guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
            className="px-5 py-4 text-base bg-gray-50 border-2 border-gray-200 rounded-xl 
                       outline-none transition-all duration-300 
                       hover:border-primary focus:border-primary focus:bg-white focus:shadow-lg
                       w-full"
          />

          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="px-5 py-4 text-base bg-gray-50 border-2 border-gray-200 rounded-xl 
                       outline-none transition-all duration-300 
                       hover:border-primary focus:border-primary focus:bg-white focus:shadow-lg
                       cursor-pointer w-full"
          >
            <option value="">Select Style</option>
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="luxury">Luxury</option>
          </select>

          <button
            onClick={calculatePackage}
            className="px-8 py-4 bg-primary text-white rounded-full text-base font-bold
                       uppercase tracking-wider transition-all duration-300 
                       hover:bg-secondary hover:-translate-y-1 hover:shadow-xl
                       active:translate-y-0 active:shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                       w-full"
          >
            Calculate
          </button>
        </div>

        {result && (
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center animate-fadeInScale border-2 border-primary/10">
            <h3 className="font-playfair text-3xl sm:text-4xl text-primary mb-6 font-bold">
              {result.name}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Style</p>
                <p className="text-xl font-semibold text-gray-800">{result.style}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Guests</p>
                <p className="text-xl font-semibold text-gray-800">{result.guests}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <p className="text-5xl sm:text-6xl text-primary font-bold">
                {result.price} <span className="text-3xl">JD</span>
              </p>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="px-10 py-4 bg-secondary text-white rounded-full text-lg font-semibold
                         transition-all duration-300 
                         hover:bg-primary hover:-translate-y-1 hover:shadow-xl
                         active:translate-y-0 active:shadow-lg
                         focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              Add Package to Cart
            </button>
          </div>
        )}
      </div>
    </section>
  );
}