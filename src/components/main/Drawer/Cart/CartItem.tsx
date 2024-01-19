import { numberFormater } from '@/lib/utils';
import { TCart } from '@/providers/CartProvider';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

import type { FC } from 'react';
import useCart from '@/hooks/useCart';

type CartItemProps = TCart;

const CartItem: FC<CartItemProps> = ({
  id,
  thumbnail,
  title,
  quantity,
  price,
}) => {
  const { addOne, removeOne } = useCart();

  return (
    <Card>
      <CardContent className='flex gap-4 p-2'>
        <div>
          <Image
            alt={`${title} thumbnail`}
            src={thumbnail}
            width={100}
            height={100}
            className='h-full rounded-sm'
          />
        </div>
        <div>
          <p className='font-bold'>{title}</p>
          <div className='mt-4 flex items-center gap-4'>
            <Button
              className='h-8 w-8 p-2 hover:bg-green-300'
              variant={'outline'}
              onClick={() => addOne({ pid: id })}
            >
              <Plus />
            </Button>
            <p>{quantity}</p>
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
      </CardContent>
    </Card>
  );
};

export default CartItem;
