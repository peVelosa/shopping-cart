import StarComponent from './StarComponent';
import type { FC } from 'react';

type RatingProps = {
  rating: number;
};

const Rating: FC<RatingProps> = ({ rating }) => {
  return (
    <>
      <div>
        <div className='flex'>
          {new Array(5).fill(null).map((_, index) => (
            <StarComponent
              key={index}
              val={rating - index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Rating;
