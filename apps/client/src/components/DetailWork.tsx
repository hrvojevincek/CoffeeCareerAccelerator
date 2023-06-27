import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userContext } from '../App';
import { useContext } from 'react';

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
  // const navigate = useNavigate();

  const notify = () => toast('Wow so easy!');

  const [user, setUser] = useContext(userContext);
  const { id } = useParams<{ id: string }>();

  console.log('DETAILWORK:', user, id);

  const applyForJob = async (id: number, user: User) => {
    if (!user) {
      console.error(
        'DETAILWORK:',
        'No registered user found. Register or Login'
      );
      alert('Please go Log in or Registrate!');
      // navigate('/login');
    }

    const url = 'http://localhost:8080/user/application/';

    const applicationData = {
      jobId: id,
      userId: user.id,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });

    if (response.ok) {
      notify();
      toast.success('Application sent!');
    } else {
      toast.error('Failed to send application. Please try again.');
    }
  };

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
                  onClick={() =>
                    id !== undefined && user && applyForJob(parseInt(id), user)
                  }
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
