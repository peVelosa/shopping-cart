import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { useState, type FC } from 'react';
import useCart from '@/hooks/useCart';

type AddToCartProps = {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  max: number;
};

const AddToCart: FC<AddToCartProps> = ({
  id,
  price,
  thumbnail,
  title,
  max,
}) => {
  const { addToCart, removeQuantityFromCart } = useCart();

  const [quantity, setQuantity] = useState<number>(1);

  function handleAddToCart() {
    addToCart({ id, thumbnail, quantity, price, title, stock: max });
    toast(`${title} added to cart!`, {
      description: `Quantity: ${quantity}`,
      action: {
        label: 'Remove',
        onClick: () => removeQuantityFromCart({ pid: id, quantity: quantity }),
      },
    });
  }

  return (
    <>
      <div className='flex items-center gap-4'>
        <span>Quantity: </span>
        <Select onValueChange={(e) => setQuantity(Number(e) ?? 0)}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder={String(quantity)} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Quantity</SelectLabel>
              {new Array(max).fill(null).map((_, index) => (
                <SelectItem
                  key={index}
                  value={String(index + 1)}
                >
                  {index + 1}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button
        className='mt-4'
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </>
  );
};

export default AddToCart;
