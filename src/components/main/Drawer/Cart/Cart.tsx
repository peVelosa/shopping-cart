'use client';

import { useState } from 'react';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import useCart from '@/hooks/useCart';
import CartItem from './CartItem';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { cart } = useCart();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

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
          <div className='mt-4 grid h-full grid-rows-[1fr_auto] gap-2'>
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
            <div>buy</div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
