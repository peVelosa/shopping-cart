import { Button } from '@/components/ui/button';

import Link from 'next/link';
import Sidebar from '@/components/main/Drawer/Sidebar/Sidebar';
import SearchBar from './SearchBar';
import Cart from '@/components/main/Drawer/Cart/Cart';

const Navbar = () => {
  return (
    <header className='sticky top-0 z-50 bg-sky-400 p-2'>
      <nav className='mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-y-2 p-2 sm:gap-x-2 '>
        <div>
          <Sidebar />
        </div>
        <div>
          <Button
            asChild
            variant={'link'}
            className='text-2xl uppercase'
          >
            <Link href='/'>pedrozon</Link>
          </Button>
        </div>
        <div className='order-3 flex-grow basis-full sm:order-none sm:basis-0'>
          <SearchBar />
        </div>
        <div>
          <Cart />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
