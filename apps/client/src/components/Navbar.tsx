import { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';

import { useMe } from '../hooks/useAuth';
import { type User } from '../types/types';

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isSuccess } = useMe();
  const typedUser = user as User;
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastYRef.current && y > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastYRef.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-transparent py-3 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="max-w-5xl flex flex-wrap items-center justify-around mx-auto">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">
              Coffee Career
            </span>
          </Link>
          <div className="flex md:order-2">
            {isSuccess &&
            typedUser &&
            (typedUser.category === 'user' || typedUser.category === 'employer') ? (
              <Link
                to={`/${typedUser.category}/${typedUser.id ? String(typedUser.id) : ''}`}
                type="button"
                className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white rounded-full border border-white/80 bg-transparent hover:text-white/90 hover:border-white focus:outline-none focus:ring-2 focus:ring-white/30">
                My Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/auth"
                  type="button"
                  className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white rounded-full border border-white/80 bg-transparent hover:text-white/90 hover:border-white focus:outline-none focus:ring-2 focus:ring-white/30">
                  Get Started
                </Link>
              </>
            )}
            <Link
              to="https://github.com/hrvojevincek/CoffeeCareerAccelerator"
              className="flex items-center hover:text-gray-950 text-right">
              <span className="self-center ml-4 text-sm font-semibold whitespace-nowrap dark:text-white hover:text-gray-500">
                GITHUB
              </span>
            </Link>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col md:p-0 mt-4 font-medium text-white rounded-lg md:flex-row md:space-x-8 md:mt-0">
              <li>
                <Link
                  to="/jobs"
                  className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="block py-2 pl-3 pr-4 md:p-0">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/blog" className="block py-2 pl-3 pr-4 md:p-0">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
};

export default Navbar;
