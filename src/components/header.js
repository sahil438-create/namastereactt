import { Link, HashRouter } from 'react-router-dom';
import { useState } from 'react';
import { CartContext } from './CartContext'; // Import CartContext
import { Logo_url } from './utils/url';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useClerk,
} from '@clerk/clerk-react';
import { useContext } from 'react';

const Header = () => {
  const { cartTotal } = useContext(CartContext);
  const { signOut, signIn } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className='bg-pink-50 shadow-lg mb-2 mt-2 px-4'>
      <div className='flex justify-between items-center relative'>
        {/* Logo Section */}
        <div className='flex'>
          <Link to='/home'>
            <img className='w-40 h-32' src={Logo_url} alt='Logo' />
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className='md:hidden flex items-center'>
          <button onClick={toggleMenu}>
            <svg
              className='w-8 h-8 text-gray-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className='hidden md:flex items-center'>
          <ul className='flex items-center space-x-4'>
            <li>
              <Link to='/home' className='hover:text-pink-700'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/Grocery' className='hover:text-pink-700'>
                Grocery
              </Link>
            </li>
            <li>
              <Link to='/about' className='hover:text-pink-700'>
                About
              </Link>
            </li>
            <li>
              <Link to='/Contact' className='hover:text-pink-700'>
                Contact
              </Link>
            </li>
            <li>
              <Link to='/Cart' className='hover:text-pink-700'>
                Cart ({cartTotal})
              </Link>
            </li>
            <li>
              <SignedOut>
                <Link to='/sign-in'>Sign In</Link>
              </SignedOut>
            </li>
            <li>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </li>
          </ul>
        </div>

        {/* Authentication and User Options */}
        <div className='absolute top-0 right-0 flex items-center space-x-4 mt-4 mr-4'></div>
      </div>

      {/* Mobile Navigation */}

      <div
        className={`${
          menuOpen ? 'block' : 'hidden'
        } md:hidden bg-pink-50 w-full flex justify-center`}
      >
        <ul className='flex flex-col items-center p-2 space-y-2'>
          <li>
            <Link
              to='/home'
              className='hover:text-pink-700'
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/Grocery'
              className='hover:text-pink-700'
              onClick={toggleMenu}
            >
              Grocery
            </Link>
          </li>
          <li>
            <Link
              to='/about'
              className='hover:text-pink-700'
              onClick={toggleMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to='/Contact'
              className='hover:text-pink-700'
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to='/Cart'
              className='hover:text-pink-700'
              onClick={toggleMenu}
            >
              Cart ({cartTotal})
            </Link>
          </li>
          <li>
            <SignedOut>
              <Link to='/sign-in'>Sign In</Link>
            </SignedOut>
          </li>
          <li>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
