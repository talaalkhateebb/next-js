

export interface Rental {
  id: number;
  name: string;
  color: string;
  seats: number;
  price: number;
  image: string;
}

export interface CartItem extends Rental {
  quantity: number;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface PackageCalculatorInputs {
  eventType: string;
  guests: number;
  style: string;
}