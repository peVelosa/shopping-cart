import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

import { useState, useEffect, type FC } from 'react';
import Image from 'next/image';

type SliderProps = {
  images: string[];
};

const Slider: FC<SliderProps> = ({ images }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel
        setApi={setApi}
        className='w-full'
      >
        <CarouselContent>
          {images?.map((image, i) => (
            <CarouselItem key={i}>
              <Card>
                <CardContent className='aspect-square p-2'>
                  <Image
                    key={i}
                    alt={`product image ${i}`}
                    src={image}
                    width={250}
                    height={250}
                    className='aspect-square h-full w-full rounded-lg object-cover outline'
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className='py-2 text-center text-sm text-muted-foreground'>
        Slide {current} of {count}
      </div>
    </>
  );
};

export default Slider;
