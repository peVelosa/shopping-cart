import { api } from '@/lib/api';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import ClientHomePage from './pages/ClientHomePage';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam }) => api.getProducts({ pageParam }),
    initialPageParam: 0,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientHomePage />
      </HydrationBoundary>
    </>
  );
}
