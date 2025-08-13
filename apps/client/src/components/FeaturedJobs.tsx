import { default as moment } from 'moment';
import { Link } from 'react-router-dom';

import { type JobData } from '../types/types';

// Configure moment with English locale
moment.locale('en-US');

interface FeaturedJobsProps {
  jobs: JobData[];
}

function getEmployerInitial(name?: string): string {
  const firstChar = name?.trim().charAt(0);
  return (firstChar ?? 'C').toUpperCase();
}

export default function FeaturedJobs({ jobs }: FeaturedJobsProps) {
  return (
    <div className="p-0">
      <div className="flex flex-col gap-6">
        {jobs.map(job => {
          const postedFromNow = moment(job.createdAt).fromNow();
          const isNew = moment().diff(moment(job.createdAt), 'hours') < 48;
          const employerName = job.employer?.name || 'Company';
          const descriptionSnippet = job.description
            ? `${job.description.slice(0, 100)}${job.description.length > 100 ? '…' : ''}`
            : '';
          return (
            <div
              key={job.id}
              className="w-full p-6 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 rounded-xl">
              <div className="flex w-full items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-bold text-white leading-snug tracking-tight truncate">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white text-sm">
                        {isNew && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-300 text-black">
                            New
                          </span>
                        )}
                        <span>Posted {postedFromNow}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 text-white flex items-center justify-center text-sm font-semibold">
                        {getEmployerInitial(employerName)}
                      </div>
                      <div className="text-lg font-medium text-white truncate">{employerName}</div>
                      <span className="ms-2 px-2.5 py-0.5 rounded-full text-xs bg-amber-100 text-white">
                        {job.category}
                      </span>
                    </div>
                    {descriptionSnippet && (
                      <p className="font-normal text-gray-700 dark:text-gray-400 leading-relaxed">
                        {descriptionSnippet}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 flex flex-col items-end justify-between gap-4 w-48">
                  <div className="flex items-center justify-end text-white text-sm">
                    <div className="flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="truncate">{job.location}</span>
                    </div>
                  </div>
                  <Link
                    to={`/jobs/${job.id}`}
                    aria-label={`Apply to ${job.title}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Apply Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
