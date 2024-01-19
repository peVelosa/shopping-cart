'use client';

import ImageSelector from '@/components/main/Image-Selector/ImageSelector';
import Rating from '@/components/main/Rating/Rating';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { api } from '@/lib/api';
import { numberFormater } from '@/lib/utils';
import { TProduct } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { redirect, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import AddToCart from '@/components/main/AddToCart';
import Slider from '@/components/main/Image-Selector/Slider';
import Link from 'next/link';

type ClientProductPageProps = {
  pid: string;
  initialData: TProduct | { message: string };
};

const ClientProductPage = ({ pid, initialData }: ClientProductPageProps) => {
  const { data: product, isFetched } = useQuery({
    queryKey: ['products', pid],
    queryFn: () => api.getProduct({ pid }),
    initialData: initialData,
  });

  const router = useRouter();

  if ((product && 'message' in product) || !product) return redirect('/');

  const { brand, category, description, images, price, rating, stock, title } =
    product;

  return (
    <>
      <Button
        variant={'ghost'}
        className='mb-4 h-fit rounded-full p-2'
        onClick={() => router.back()}
      >
        <ArrowLeft size={24} />
      </Button>
      <div className='grid gap-12 md:grid-cols-2'>
        <div className='hidden md:block'>
          <ImageSelector images={images} />
        </div>
        <div>
          <h1 className='text-xl font-bold'>{title}</h1>
          <h3 className='text-base'>By {brand}</h3>
          <div className='mt-2 flex gap-2'>
            <span>{rating}/5</span>
            <Rating rating={rating} />
          </div>
          <Separator className='my-2' />
          <div className='flex flex-col gap-4'>
            <div className='mt-4 block md:hidden'>
              <ImageSelector images={images} />
            </div>
            <h2 className='order-1 text-lg font-semibold'>
              {numberFormater(price)}
            </h2>
            <div className='order-3 md:order-2'>
              <p className='text-lg font-semibold'>About this item</p>
              <p>{description}</p>
            </div>
            <div className='order-2 md:order-3'>
              <h4 className='mb-2'>Stock: {stock}</h4>
              <AddToCart
                id={product.id}
                price={price}
                thumbnail={product.thumbnail}
                title={title}
                max={stock}
              />
            </div>
          </div>
        </div>
      </div>
      <h3 className='mt-8'>
        See other producst on:{' '}
        <Button
          variant={'secondary'}
          asChild
        >
          <Link href={`/?category=${category}`}>{category}</Link>
        </Button>
      </h3>
    </>
  );
};

export default ClientProductPage;
