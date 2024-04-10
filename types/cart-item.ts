export interface CartItem {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string | null;
  price: number;
  int_price: number;
  quantity: number;
  type?: string | null;
}
