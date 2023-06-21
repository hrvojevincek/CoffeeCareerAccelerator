import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <>
      <header>
        <nav className="px-4 lg:px-6 py-2.5 dark:bg-gray-8900">
          <div className="max-w-4xl flex flex-wrap items-center justify-between mx-auto p-1">
            <Link to={`/`} className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Coffee Career
              </span>
            </Link>
            <div className="flex md:order-2">
              {/* HAHAH[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[A */}

              <Link
                to="/signup"
                type="button"
                className="mr-10 inline-flex justify-center hover:text-gray-900 items-center py-3 px-4 text-base font-medium text-center text-gray-50 border-b-2 border-white hover:bg-gray-100 hover:rounded-lg focus:ring-4 focus:ring-gray-400"
              >
                Get Started
              </Link>

              {/*? HA==============================================================HAH */}
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    to="/jobs"
                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Companies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
