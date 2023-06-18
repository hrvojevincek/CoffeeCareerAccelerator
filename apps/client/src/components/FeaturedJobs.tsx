type JobData = {
  id: number;
  title: string;
  description: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  employerId: number;
  posted: boolean;
};

type FeaturedJobsProps = {
  data: JobData[];
};

const FeaturedJobs: React.FC<FeaturedJobsProps> = ({ data }) => {
  return (
    <div className="m-10 grid grid-cols-4 dark:border-gray-700 shadow-sm">
      {data.map((data) => {
        return (
          <div
            key={data.id}
            className="m-10 max-w-sm p-6 bg-white border border-gray-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data.title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {data.description}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {data.location}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {data.employerId}
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              See more
              <svg
                aria-hidden="true"
                className="w-4 h-4 ml-2 -mr-1"
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
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedJobs;
