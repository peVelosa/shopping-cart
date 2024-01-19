'use client';

import CartProvider from '@/providers/CartProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          {children}
          {/* <ReactQueryDevtools /> */}
        </CartProvider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;
