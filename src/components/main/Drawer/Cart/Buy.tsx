import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/useCart';
import { numberFormater } from '@/lib/utils';
import type { FC } from 'react';

type BuyProps = {
  handleClose: () => void;
};

const Buy: FC<BuyProps> = ({ handleClose }) => {
  const { buy, totalAmount } = useCart();

  return (
    <>
      <p>
        <span className='font-semibold'>Total amount:</span>{' '}
        {numberFormater(totalAmount)}
      </p>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={totalAmount === 0}>Buy</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do you want to confirm the buy?</AlertDialogTitle>
            <AlertDialogDescription>
              Your <span className='font-bold'>fake credit card</span> you be
              charged in: {numberFormater(totalAmount)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='bg-red-500 text-white hover:bg-red-400 hover:text-white'>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className='border border-input bg-background text-black hover:bg-accent hover:text-accent-foreground'
              onClick={() => buy(handleClose)}
            >
              Buy
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Buy;
