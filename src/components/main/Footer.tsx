import Link from 'next/link';
import { Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='bg-slate-400'>
      <div className='mx-auto px-4 py-6 text-center text-xl'>
        <h6>
          Coded by <span className='font-semibold'>Pedro Velosa</span>
        </h6>
        <div className='mt-4 flex items-center justify-center gap-4'>
          <Link href={'https://github.com/pevelosa'}>
            <Linkedin
              className='fill-sky-500'
              size={32}
            />
          </Link>
          <Link href={'https://www.linkedin.com/in/pedrovelosa/'}>
            <Github size={32} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
