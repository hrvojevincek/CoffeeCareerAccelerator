import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useMe } from '../hooks/useAuth';

import type { JobData, User } from '../types/types.d';
import { LocationIcon } from './ui/Icon';

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
    <div className="pt-32">
      <div className="max-w-6xl mx-auto px-5">
        <div className="bg-white/90 rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500">Posted {moment(data.createdAt).fromNow()}</p>
              <p className="text-lg font-semibold leading-7 text-slate-900">
                {data.employer?.name || 'Company'}
              </p>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900">
                {data.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-slate-600">
                <div className="flex items-center gap-1">
                  <LocationIcon className="h-4 w-4" />
                  <span>{data.location}</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  {data.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white/90 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Job Description</h2>
              <div className="prose max-w-none text-slate-700 whitespace-pre-line">
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span>Posted {moment(data.createdAt).format('ll')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7h18M3 12h18M3 17h18"
                    />
                  </svg>
                  <span>Category: {data.category}</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Employer: {data.employer?.name || 'Company'}</span>
                </li>
              </ul>
              <button
                onClick={() =>
                  id !== undefined && isValidUser(userData) && applyForJob(parseInt(id), userData)
                }
                type="button"
                className="mt-6 w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-4 py-2">
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
