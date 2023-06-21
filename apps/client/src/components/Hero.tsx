import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="h-screen flex items-center justify-center bg-no-repeat sm:bg-cover md:bg-cover bg-fixed bg-[url('https://media.timeout.com/images/105871441/image.jpg')] bg-gray-300 bg-blend-multiply">
      <div className="px-4 mx-auto max-w-screen-xl text-center ">
        <h1 className="mb-10 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Coffee Career Accelerator
        </h1>
        <p className="mb-10 text-lg font-normal text-white lg:text-xl sm:px-16 lg:px-48">
          Land your dream barista job quickly and effortlessly through our
          platform
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
            to="/jobs"
            className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            Jobseeker
            <svg
              aria-hidden="true"
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
          <Link
            to="/company"
            className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            Employer
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
