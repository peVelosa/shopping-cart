import { useState, type FC } from 'react';
import Image from 'next/image';

type ImageSelectorProps = {
  images: string[];
};

const ImageSelector: FC<ImageSelectorProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  return (
    <div className='grid grid-cols-[auto_1fr] gap-4'>
      <div className='flex flex-col items-start gap-8'>
        {images?.map((image, i) => (
          <Image
            key={i}
            alt={`product image ${i}`}
            src={image}
            width={75}
            height={75}
            className={`aspect-square rounded-lg object-cover outline hover:outline-red-400 ${selectedImage === i ? 'outline-red-400' : ''}`}
            onMouseEnter={() => setSelectedImage(i)}
          />
        ))}
      </div>
      <Image
        alt='product image selected'
        src={images[selectedImage]}
        width={400}
        height={400}
        className={'h-full w-full object-fill'}
      />
    </div>
  );
};

export default ImageSelector;
