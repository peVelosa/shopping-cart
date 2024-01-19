'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { AlignJustify, CircleUserRound, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

import { api } from '@/lib/api';
import SidebarLink from './SidebarLink';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: categories } = useQuery({
    queryKey: ['category'],
    queryFn: () => api.getCategories(),
    enabled: isOpen,
  });

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

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
            <AlignJustify />
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'}>
          <div className='mt-4 grid h-full gap-2'>
            <Button
              variant={'ghost'}
              className='flex w-full items-center justify-start gap-2 text-left'
            >
              <CircleUserRound />
              <p>Hello, sign in</p>
            </Button>
            <Separator />
            <ScrollArea>
              {categories?.map((category) => (
                <SidebarLink
                  isSelected={selectedCategory === category}
                  category={category}
                  handleClose={handleClose}
                  key={category}
                />
              ))}
            </ScrollArea>
            <Separator />
            <Button
              variant={'ghost'}
              className='flex w-full items-center justify-start gap-2 text-left'
            >
              <Settings />
              <p>Settings</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
