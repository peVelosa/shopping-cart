import {
  Card as CardShadcn,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Rating from './Rating/Rating';
import Image from 'next/image';

import type { TProducts } from '@/types/api';
import type { FC } from 'react';
import Link from 'next/link';
import { numberFormater } from '@/lib/utils';

type CardProps = TProducts;

const Card: FC<CardProps> = ({
  id,
  thumbnail,
  title,
  price,
  rating,
  description,
}) => {
  return (
    <>
      <CardShadcn className='mx-auto w-full overflow-hidden shadow-md hover:scale-[102%]'>
        <Link
          className='grid h-full grid-rows-[250px,2fr,auto,auto] shadow-md'
          href={`/product/${id}`}
        >
          <div className='relative overflow-hidden'>
            <Image
              alt='product image'
              src={thumbnail}
              width={200}
              height={200}
              className='absolute inset-0 h-full max-h-full w-full max-w-full object-cover object-top'
            />
          </div>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p className='text-lg font-semibold'>{numberFormater(price)}</p>
            </div>
          </CardContent>
          <CardFooter className='block'>
            <Rating rating={rating} />
            <p>{rating}/5</p>
          </CardFooter>
        </Link>
      </CardShadcn>
    </>
  );
};

export default Card;
