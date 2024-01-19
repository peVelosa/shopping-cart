'use client';

import Card from '@/components/main/Card';
import { Button } from '@/components/ui/button';
import useProducts from '@/hooks/useProducts';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function ClientHomePage() {
  const { ref, inView } = useInView();

  const {
    filteredProducts,
    noProductsToShow,
    selectedCategory,
    searchQuery,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
  } = useProducts();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <>
      {noProductsToShow ? (
        <div className='grid place-content-center gap-4'>
          <h2 className='text-xl'>
            Ooops... we didn&apos;t find any product with 😢:
          </h2>
          <div className='text-lg'>
            {selectedCategory && (
              <div className='flex gap-4'>
                <h3>Category: </h3>
                <p className='font-bold capitalize'>{selectedCategory}</p>
              </div>
            )}
            {searchQuery && (
              <div className='flex gap-4'>
                <h3>Name: </h3>
                <p className='font-bold'>{searchQuery}</p>
              </div>
            )}
          </div>
          <p className='text-lg'>
            Click{' '}
            <Link
              href={'/'}
              className='text-blue-500 visited:text-blue-700 visited:underline hover:underline'
            >
              here
            </Link>{' '}
            to go to our main page!
          </p>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-[repeat(auto-fill,minmax(min(calc(100%-2rem),350px),1fr))] gap-x-4 gap-y-8'>
            {filteredProducts?.map((page) =>
              page.map((product) => (
                <Card
                  {...product}
                  key={product.id}
                />
              )),
            )}
          </div>
          <div className='mt-8'>
            <Button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className='empty:hidden'
            >
              {!isFetching
                ? isFetchingNextPage
                  ? 'Loading more...'
                  : hasNextPage
                    ? 'Load Newer'
                    : 'Nothing more to load'
                : null}
            </Button>
          </div>
          <div className='mx-auto my-8 h-[60px] w-[60px]'>
            {isFetching || isFetchingNextPage ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='60'
                height='60'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className={'animate-spin'}
              >
                <path d='M21 12a9 9 0 1 1-6.219-8.56' />
              </svg>
            ) : null}
          </div>
        </>
      )}
    </>
  );
}
