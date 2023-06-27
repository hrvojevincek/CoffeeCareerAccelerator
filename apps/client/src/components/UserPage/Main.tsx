import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function Main() {
  const [data, setData] = useState<UserData | null>(null);

  const { id } = useParams<{ id: string }>();

  const fetchData = async () => {
    const url = `http://localhost:8080/user/${id}/`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className=" lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center px-2 py-2 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className=" mb-4 text-xl font-bold text-gray-900 sm:text-3xl md:text-2xl">
              Your Profile
            </h1>

            {data && (
              <div>
                <h1 className="mt-2 text-xl font-bold text-gray-900">
                  User Details
                </h1>
                <p>
                  Name / Surname:
                  {data.name} {data.surname}
                </p>
                <p>City: {data.city}</p>
                <p>E-mail: {data.email}</p>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 ">
                  Experience
                </h1>
                {data.experience.map((item, i) => (
                  <div key={i} className="mt-2 border-b-2">
                    <p>Job Title: {item.jobtitle}</p>
                    <p>Company: {item.company}</p>
                    <p>When: {item.dates}</p>
                    <p>Job Description: {item.description}</p>
                  </div>
                ))}

                <h1 className="mt-2 text-2xl font-bold text-gray-900">
                  Applications
                </h1>
                {data.applications.map((item, i) => (
                  <div key={i}>
                    <p>{item.jobId}</p>
                    <p>{item.hired.toString()}</p>
                    {/* Add other properties here */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default Main;
