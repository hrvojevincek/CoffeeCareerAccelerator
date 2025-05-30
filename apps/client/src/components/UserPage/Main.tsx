import { useParams } from 'react-router';

import { useUserById } from '../../hooks/useUser';

function Main() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useUserById(id ? parseInt(id, 10) : 0);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-lg">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-red-400 text-lg">Error loading profile</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-lg">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-cover bg-center bg-[url('https://www.vecernji.hr/media/img/c2/4d/d79db1ab8d3a5aa10138.jpeg')] relative">
      {/* Dark overlay */}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          {/* Profile Header */}
          <div className="bg-black bg-opacity-95 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-gray-700 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Avatar and Basic Info */}
              <div className="flex-shrink-0 text-center lg:text-left">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mx-auto lg:mx-0 mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-white">
                    {data.name?.[0]?.toUpperCase()}
                    {data.surname?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div className="lg:hidden">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {data.name} {data.surname}
                  </h1>
                  <p className="text-gray-300 text-lg">
                    {data.category === 'user' ? 'Job Seeker' : 'Employer'}
                  </p>
                </div>
              </div>

              {/* Main Info */}
              <div className="flex-1">
                <div className="hidden lg:block mb-6">
                  <h1 className="text-4xl font-bold text-white mb-3">
                    {data.name} {data.surname}
                  </h1>
                  <p className="text-gray-300 text-xl">
                    {data.category === 'user' ? 'Job Seeker' : 'Employer'}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="font-medium">{data.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="font-medium">{data.email}</p>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {data.bio && (
                  <div className="bg-gray-900 bg-opacity-60 rounded-xl p-4 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">About</h3>
                    <p className="text-gray-300 leading-relaxed">{data.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Experience Section */}
            <div className="bg-black bg-opacity-95 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Experience</h2>
              </div>

              {data.experience && data.experience.length > 0 ? (
                <div className="space-y-6">
                  {data.experience.map((item, i) => (
                    <div
                      key={i}
                      className="bg-gray-900 bg-opacity-60 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-xl font-semibold text-white mb-2">{item.jobtitle}</h3>
                      <p className="text-gray-300 font-medium mb-1">{item.company}</p>
                      <p className="text-gray-400 text-sm mb-4">{item.dates}</p>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 italic">No experience added yet</p>
                </div>
              )}
            </div>

            {/* Applications Section */}
            <div className="bg-black bg-opacity-95 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Applications</h2>
              </div>

              {data.applications && data.applications.length > 0 ? (
                <div className="space-y-4">
                  {data.applications.map((item, i) => (
                    <div
                      key={i}
                      className="bg-gray-900 bg-opacity-60 rounded-xl p-6 border border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold text-lg">Job Application</p>
                          <p className="text-gray-400 text-sm">Job ID: {item.jobId}</p>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            item.hired
                              ? 'bg-green-900 text-green-300 border border-green-600'
                              : 'bg-yellow-900 text-yellow-300 border border-yellow-600'
                          }`}>
                          {item.hired ? '✓ Hired' : '⏳ Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 italic">No applications submitted yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pb-8">
            <p className="text-gray-500 text-sm">
              Member since {new Date().getFullYear()} • Coffee Career Accelerator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
