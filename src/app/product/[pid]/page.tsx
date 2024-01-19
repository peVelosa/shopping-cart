import ClientProductPage from '@/app/pages/ClientProductPage';
import { api } from '@/lib/api';
import { QueryClient } from '@tanstack/react-query';

type ProductPageProps = {
  params: { pid: string };
};

const ProductPage = async ({ params: { pid } }: ProductPageProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', pid],
    queryFn: () => api.getProduct({ pid }),
  });

  const initialData = await api.getProduct({ pid });

  return (
    <>
      <ClientProductPage
        pid={pid}
        initialData={initialData}
      />
    </>
  );
};

export default ProductPage;
