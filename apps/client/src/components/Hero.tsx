import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="h-screen  flex items-center justify-center bg-no-repeat sm:bg-cover md:bg-bottom bg-fixed bg-[url('https://media.timeout.com/images/105871441/image.jpg')] bg-gray-300 bg-blend-multiply">
      <div className="px-4 mx-auto max-w-screen-xl text-center">
        <h1 className="mb-10 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Coffee Career Accelerator
        </h1>
        <p className="mb-10 text-lg font-normal text-white lg:text-xl sm:px-16 lg:px-48">
          Land your dream barista job quickly and effortlessly through our platform
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
            to="/jobs"
            className="inline-flex bg-opacity-75 justify-center text-slate-900 items-center py-3 px-5 font-bold text-center rounded-lg border bg-gray-200 hover:border-white focus:ring-4 focus:ring-gray-400 hover:text-gray-500"
          >
            Jobseeker
          </Link>
          <Link
            to="/employer"
            className="inline-flex text-slate-900 bg-opacity-75 justify-center items-center py-3 px-5 font-bold text-center hover:text-gray-500 rounded-lg border border-white bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            Employer
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
