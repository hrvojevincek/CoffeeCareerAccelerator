import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useMe } from '../hooks/useAuth';

import type { JobData, User } from '../types/types';
import { LocationIcon, ClockIcon, MenuIcon, UserCircleIcon, DollarSignIcon } from './ui/Icon';

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

  const isLoggedIn = isValidUser(userData);

  return (
    <div className="pt-32">
      <div className="max-w-6xl mx-auto px-5">
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white/90 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Job Description</h2>
              <div className="prose max-w-none  text-slate-700 whitespace-pre-line">
                {data.description}
              </div>
            </div>
          </div>
          <aside className="lg:col-span-1">
            <div className="bg-white/90 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Job Overview</h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <LocationIcon className="h-4 w-4" />
                  <span>{data.location}</span>
                </li>
                <li className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  <span>Posted {moment(data.createdAt).format('ll')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <MenuIcon className="h-4 w-4" />
                  <span>Category: {data.category}</span>
                </li>
                <li className="flex items-center gap-2">
                  <UserCircleIcon className="h-4 w-4" />
                  <span>Employer: {data.employer?.name || 'Company'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <DollarSignIcon className="h-4 w-4" />
                  <span>Money: {data.money || 'Not specified'}</span>
                </li>
              </ul>
              <button
                onClick={() =>
                  id !== undefined && isLoggedIn && applyForJob(parseInt(id), userData as User)
                }
                type="button"
                disabled={!isLoggedIn}
                title={isLoggedIn ? undefined : 'Log in to apply'}
                className={`mt-6 w-full text-white font-medium rounded-lg text-sm px-4 py-2 ${
                  isLoggedIn
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800'
                    : 'bg-gray-500 cursor-not-allowed opacity-50'
                }`}>
                Apply Now
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DetailWork;
