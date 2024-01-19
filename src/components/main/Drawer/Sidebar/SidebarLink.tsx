import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { FC } from 'react';

type SidebarLinkProps = {
  isSelected: boolean;
  category: string;
  handleClose: () => void;
};

const SidebarLink: FC<SidebarLinkProps> = ({
  isSelected,
  category,
  handleClose,
}) => {
  return (
    <>
      <div className='my-2'>
        <Button
          variant={'ghost'}
          className={`w-full justify-start capitalize ${
            isSelected ? 'bg-accent text-accent-foreground' : ''
          }`}
          onClick={handleClose}
          asChild
        >
          <Link href={isSelected ? '/' : `/?category=${category}`}>
            {category}
          </Link>
        </Button>
      </div>
    </>
  );
};

export default SidebarLink;
