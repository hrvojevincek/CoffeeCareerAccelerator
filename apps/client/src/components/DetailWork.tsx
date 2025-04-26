import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../contexts/UserContext';
import { JobData, User } from '../types/types';

type FeaturedJobsProps = {
  data: JobData[];
};

const DetailWork: React.FC<FeaturedJobsProps> = ({ data }) => {
  const navigate = useNavigate();
  const notify = () => toast('Wow so easy!');

  const { user } = useUserContext();
  const { id } = useParams<{ id: string }>();

  const applyForJob = async (id: number, user: User) => {
    if (user === undefined) {
      toast.error('No registered user found. Please Register or Login!');
      alert('Please Log in or Registrate!');
      navigate('/login');
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

  const dummyJob: JobData = {
    id: 1,
    title: 'Barista',
    description:
      'Join our team of passionate baristas. We are looking for skilled individuals who can create exceptional coffee experiences for our customers. As a Barista, you will be responsible for brewing and serving coffee, providing excellent customer service, and maintaining a clean and welcoming environment. Join us and be part of a team that values quality, craftsmanship, and the art of coffee.',
    location: 'Berlin, Germany',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    employerId: 1,
    posted: true,
    employer: {
      name: 'La Marzocco',
    },
    category: '',
  };

  const jobData = data.length ? data : [dummyJob];

  return (
    <div className="">
      {jobData.map(data => {
        return (
          <>
            <div
              key={data.id}
              className="flex p-5 mt-36 sm:w-fit mx-auto bg-slate-100 rounded-xl md:max-w-4xl lg:max-w-6xl gap-10"
            >
              <div>
                <p className="text-xs text-slate-500">{moment(data.createdAt).format('ll')}</p>
                <p className=" text-xl font-semibold leading-7 text-slate-900">
                  {data.employer.name}
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {data.title}
                </h1>
                <p className="text-base font-semibold leading-7 text-slate-500">{data.location}</p>
                <p className="text-base font-semibold leading-7 text-slate-500">30,000 € Annual</p>

                <button
                  onClick={() => id !== undefined && user && applyForJob(parseInt(id), user)}
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
