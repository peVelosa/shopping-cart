'use client';

import { useState } from 'react';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import useCart from '@/hooks/useCart';
import CartItem from './CartItem';
import { Separator } from '@/components/ui/separator';
import { numberFormater } from '@/lib/utils';

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { cart, totalAmount } = useCart();

  const handleOpen = () => setIsOpen(true);

  return (
    <>
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SheetTrigger asChild>
          <Button
            variant='ghost'
            onClick={handleOpen}
          >
            <ShoppingCart />
          </Button>
        </SheetTrigger>
        <SheetContent side={'right'}>
          <div className='mt-4 grid h-full grid-rows-[1fr_auto_auto] gap-2 pb-4'>
            <ScrollArea>
              {cart.length === 0 ? (
                <p>Your cart is empty...</p>
              ) : (
                cart?.map((item) => (
                  <CartItem
                    {...item}
                    key={item.id}
                  />
                ))
              )}
            </ScrollArea>
            <Separator />
            <p>
              <span className='font-semibold'>Total amount:</span>{' '}
              {numberFormater(totalAmount)}
            </p>
            <Button>Buy</Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartDrawer;
