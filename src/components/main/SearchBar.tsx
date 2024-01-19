'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchBar = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const router = useRouter();
  const [input, setInput] = useState<string>('');

  function goTo(e: React.FormEvent) {
    e.preventDefault();
    router.push(url);
  }

  useEffect(() => {
    setInput('');
  }, [selectedCategory]);

  const url = selectedCategory
    ? `/?category=${selectedCategory}&search=${input}`
    : `/?search=${input}`;

  return (
    <form
      onSubmit={goTo}
      className='flex w-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sky-400'
    >
      <Input
        type='text'
        placeholder='Search...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className='rounded-br-none rounded-tr-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
        name='search'
        id='search'
      />
      <label htmlFor='search'>
        <Button
          type='submit'
          onClick={goTo}
          className='rounded-bl-none rounded-tl-none'
        >
          <Search />
        </Button>
      </label>
    </form>
  );
};

export default SearchBar;
