export type TProduct = {
  id: string;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

export type TProducts = {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  rating: number;
};
