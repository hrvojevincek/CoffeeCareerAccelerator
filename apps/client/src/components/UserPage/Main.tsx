import { useParams } from 'react-router';

import { useUserById } from '../../hooks/useUser';

function Main() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useUserById(id ? parseInt(id, 10) : 0);

  if (isLoading) {
    return <div className="text-center p-8">Loading user data...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error loading user data</div>;
  }

  if (!data) {
    return <div className="text-center p-8">User not found</div>;
  }

  return (
    <>
      <div className=" lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center px-2 py-2 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className=" mb-4 text-xl font-bold text-gray-900 sm:text-3xl md:text-2xl">
              Your Profile
            </h1>
            <div>
              <h1 className="mt-2 text-xl font-bold text-gray-900">User Details</h1>
              <p>
                Name / Surname:
                {data.name} {data.surname}
              </p>
              <p>City: {data.city}</p>
              <p>E-mail: {data.email}</p>
              <p>Bio: {data.bio}</p>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 ">Experience</h1>
              {data.experience.map((item, i) => (
                <div key={i} className="mt-2 border-b-2">
                  <p>Job Title: {item.jobtitle}</p>
                  <p>Company: {item.company}</p>
                  <p>When: {item.dates}</p>
                  <p>Job Description: {item.description}</p>
                </div>
              ))}

              <h1 className="mt-2 text-2xl font-bold text-gray-900">Applications</h1>
              {data.applications.map((item, i) => (
                <div key={i}>
                  <p>Applied for job: {item.jobId}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Main;
