import { numberFormater } from '@/lib/utils';
import { TCart } from '@/providers/CartProvider';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Trash } from 'lucide-react';

import type { FC } from 'react';
import useCart from '@/hooks/useCart';
import Link from 'next/link';

type CartItemProps = TCart;

const CartItem: FC<CartItemProps> = ({
  id,
  thumbnail,
  title,
  quantity,
  price,
}) => {
  const { addOne, removeOne, removeFromCart } = useCart();

  return (
    <Card className='mb-4 mr-4 rounded-sm p-2'>
      <CardContent className='relative grid grid-cols-[1fr_2fr_auto] gap-4 p-0'>
        <div>
          <Link href={`/product/${id}`}>
            <Image
              alt={`${title} thumbnail`}
              src={thumbnail}
              width={100}
              height={100}
              className='h-full rounded-sm object-contain hover:scale-105'
            />
          </Link>
        </div>
        <div>
          <p className='font-bold'>{title}</p>
          <div className='mt-4 flex w-32 items-center justify-between gap-4'>
            <Button
              className='h-8 w-8 p-2 hover:bg-green-300'
              variant={'outline'}
              onClick={() => addOne({ pid: id })}
            >
              <Plus />
            </Button>
            <p>{String(quantity).padStart(2, '0')}</p>
            <Button
              className='h-8 w-8 p-2 hover:bg-red-300'
              variant={'outline'}
              onClick={() => removeOne({ pid: id })}
            >
              <Minus />
            </Button>
          </div>
          <p className='mt-2 font-semibold'>{numberFormater(price)}</p>
        </div>
        <Button
          variant={'destructive'}
          className='h-8 w-8 rounded-full p-2'
          onClick={() => removeFromCart({ pid: id })}
        >
          <Trash />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartItem;
