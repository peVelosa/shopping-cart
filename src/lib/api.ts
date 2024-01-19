import { TProduct, TProducts } from '@/types/api';

type getProductsProps = {
  pageParam: number;
  selectedCategory?: string | null;
  searchQuery?: string | null;
};

type getProductsRes = {
  limit: number;
  products: TProducts[];
  skip: number;
  total: number;
};

class API {
  constructor() {}

  async getCategories(): Promise<string[]> {
    return await fetch('https://dummyjson.com/products/categories').then(
      (res) => res.json(),
    );
  }

  async getProducts({
    pageParam,
    selectedCategory,
    searchQuery,
  }: getProductsProps): Promise<getProductsRes> {
    const selectedData = 'id,thumbnail,description,rating,title,price' as const;

    if (selectedCategory) {
      return await fetch(
        `https://dummyjson.com/products/category/${selectedCategory}?skip=${pageParam}&limit=20&select=${selectedData}`,
      ).then((res) => res.json());
    }

    if (searchQuery) {
      return await fetch(
        `https://dummyjson.com/products/search?q=${searchQuery}&skip=${pageParam}&limit=20&select=${selectedData}`,
      ).then(async (res) => res.json());
    }

    return await fetch(
      `https://dummyjson.com/products?skip=${pageParam}&limit=20&select=${selectedData}`,
    ).then((res) => res.json());
  }

  async getProduct({
    pid,
  }: {
    pid: string;
  }): Promise<TProduct | { message: string }> {
    return await fetch(`https://dummyjson.com/products/${pid}`).then((res) =>
      res.json(),
    );
  }
}

const api = new API();

export { api };
