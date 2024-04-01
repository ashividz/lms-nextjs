export interface CartItem {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string | null;
  price: number;
  quantity: number;
}
