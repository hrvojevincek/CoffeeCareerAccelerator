import moment from 'moment';

type JobData = {
  id: number;
  title: string;
  description: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  employerId: number;
  posted: boolean;
  employer: {
    name: string;
  };
};

type FeaturedJobsProps = {
  data: JobData[];
};

const DetailWork: React.FC<FeaturedJobsProps> = ({ data }) => {
  return (
    <div className="">
      {data.map((data) => {
        return (
          <>
            <div
              key={data.id}
              className="flex p-5 mt-10 mx-auto bg-slate-100 rounded-xl md:max-w-4xl lg:max-w-6xl gap-10"
            >
              <div>
                <p className="text-xs text-slate-500">
                  {moment(data.createdAt).format('ll')}
                </p>
                <p className=" text-xl font-semibold leading-7 text-slate-900">
                  {data.employer.name}
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {data.title}
                </h1>
                <p className="text-base font-semibold leading-7 text-slate-500">
                  {data.location}
                </p>
                <p className="text-base font-semibold leading-7 text-slate-500">
                  30,000 € Annual
                </p>

                <button
                  type="button"
                  className="mt-10 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-20 py-1.5 text-center mr-2 mb-2"
                >
                  Apply
                </button>
              </div>
              <div className=" lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8">
                <div className="">
                  <div className="text-base leading-7 text-gray-700">
                    <p>{data.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default DetailWork;
