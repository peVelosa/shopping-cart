import { api } from '@/lib/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

function getQKey(category: string | null, product: string | null): string[] {
  if (category) {
    return ['products', 'category', category];
  }
  if (product) {
    return ['products', 'search', product];
  }
  return ['products'];
}

const useProducts = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  const { data: products, ...rest } = useInfiniteQuery({
    queryKey: getQKey(selectedCategory, searchQuery),
    queryFn: ({ pageParam }) =>
      api.getProducts({ pageParam, selectedCategory, searchQuery }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.skip >= lastPage.total ? undefined : lastPage.skip + 20,
  });

  const filteredProducts = products?.pages?.map((page) => {
    if (selectedCategory) {
      return page?.products.filter((p) =>
        p.title
          .toLocaleLowerCase()
          .includes(searchQuery?.toLocaleLowerCase() ?? ''),
      );
    }
    return page?.products;
  });

  const noProductsToShow =
    filteredProducts?.length === 1 && filteredProducts[0].length === 0;

  console.log(products);

  return {
    filteredProducts,
    noProductsToShow,
    selectedCategory,
    searchQuery,
    ...rest,
  };
};

export default useProducts;
