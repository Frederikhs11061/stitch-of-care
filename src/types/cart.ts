export interface CartItem {
  id: string;
  name: string;
  price: number;     // DKK
  priceEur: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}
