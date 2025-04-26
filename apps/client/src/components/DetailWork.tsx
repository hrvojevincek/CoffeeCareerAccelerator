import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useMe } from '../hooks/useAuth';

import type { JobData, User } from '../types/types.d';

type DetailWorkProps = {
  data: JobData;
};

const DetailWork: React.FC<DetailWorkProps> = ({ data }) => {
  const navigate = useNavigate();
  const notify = () => toast('Wow so easy!');

  const { data: userData } = useMe();
  const { id } = useParams<{ id: string }>();

  const applyForJob = async (id: number, user: User) => {
    if (!user) {
      toast.error('No registered user found. Please Register or Login!');
      alert('Please Log in or Register!');
      navigate('/login');
      return;
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

  // Check if userData is a valid User object
  const isValidUser = (user: unknown): user is User => {
    return Boolean(
      user &&
        typeof user === 'object' &&
        user !== null &&
        'username' in user &&
        'category' in user &&
        'id' in user
    );
  };

  return (
    <div className="">
      <div className="flex p-5 mt-36 sm:w-fit mx-auto bg-slate-100 rounded-xl md:max-w-4xl lg:max-w-6xl gap-10">
        <div>
          <p className="text-xs text-slate-500">{moment(data.createdAt).format('ll')}</p>
          <p className="text-xl font-semibold leading-7 text-slate-900">
            {data.employer?.name || 'Company'}
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {data.title}
          </h1>
          <p className="text-base font-semibold leading-7 text-slate-500">{data.location}</p>
          <p className="text-base font-semibold leading-7 text-slate-500">30,000 € Annual</p>

          <button
            onClick={() =>
              id !== undefined && isValidUser(userData) && applyForJob(parseInt(id), userData)
            }
            type="button"
            className="mt-10 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-20 py-1.5 text-center mr-2 mb-2">
            Apply
          </button>
        </div>
        <div className="lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8">
          <div className="">
            <div className="text-base leading-7 text-gray-700">
              <p>{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailWork;
