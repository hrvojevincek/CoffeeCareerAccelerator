import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black py-3 w-screen lg:max-w-8xl">
      <div className="max-w-5xl flex  flex-wrap items-center justify-between mx-auto">
        <Link to={`/`} className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Coffee Career
          </span>
        </Link>
        <div className="flex md:order-2">
          {/* <Link
            to="/signup"
            type="button"
            className="inline-flex justify-center hover:text-gray-400 items-center  text-lg font-medium text-center text-gray-50 border-b-2 border-white"
          >
            My Dashboard
          </Link>
           */}
          <Link
            to="/signup"
            type="button"
            className="inline-flex justify-center hover:text-gray-400 items-center  text-lg font-medium text-center text-gray-50 border-b-2 border-white  "
          >
            Get Started
          </Link>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col md:p-0 mt-4 font-medium text-white rounded-lg md:flex-row md:space-x-8 md:mt-0">
            <li>
              <Link
                to="/jobs"
                className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent  md:p-0"
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/company" className="block py-2 pl-3 pr-4 md:p-0">
                Companies
              </Link>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 md:p-0">
                Blog
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
