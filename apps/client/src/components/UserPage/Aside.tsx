import { Link, useNavigate } from 'react-router-dom';

import { useMe, useLogout } from '../../hooks/useAuth';
import { type User } from '../../types/types.d';

function Aside() {
  const { data: user } = useMe();
  const typedUser = user as User;
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  return (
    <aside className="top-0 w-64 h-screen bg-cover bg-center bg-[url('https://www.vecernji.hr/media/img/c2/4d/d79db1ab8d3a5aa10138.jpeg')] relative">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-85"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
              <span className="text-lg font-semibold text-white">
                {typedUser?.username?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <h2 className="text-white text-sm font-semibold">
              HELLO {typedUser?.username?.toUpperCase() || 'USER'}!
            </h2>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 overflow-y-auto">
          <nav className="space-y-2">
            <Link
              to={`/user/${typedUser?.id || ''}`}
              className="flex items-center p-2 rounded-lg bg-black bg-opacity-60 backdrop-blur-sm border border-transparent text-white hover:bg-opacity-80 hover:border-gray-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-700 transition-colors">
                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm">Profile</span>
            </Link>

            <div className="flex items-center p-2 rounded-lg bg-black bg-opacity-30 backdrop-blur-sm border border-transparent text-gray-500 cursor-not-allowed opacity-50">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3 opacity-50">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div className="flex-1 flex items-center justify-between">
                <span className="text-sm">Messages</span>
                <span className="text-xs text-gray-600">Unavailable</span>
              </div>
            </div>

            <Link
              to="cvpage"
              className="flex items-center p-2 rounded-lg bg-black bg-opacity-60 backdrop-blur-sm border border-transparent text-white hover:bg-opacity-80 hover:border-gray-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-700 transition-colors">
                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm">Edit Your CV</span>
            </Link>
          </nav>

          {/* Secondary Navigation */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <nav className="space-y-2">
              <Link
                to="edit"
                className="flex items-center p-2 rounded-lg bg-black bg-opacity-60 backdrop-blur-sm border border-transparent text-white hover:bg-opacity-80 hover:border-gray-600 transition-all duration-200 group">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                <span className="text-sm">Edit Profile</span>
              </Link>

              <div className="flex items-center p-2 rounded-lg bg-black bg-opacity-30 backdrop-blur-sm border border-transparent text-gray-500 cursor-not-allowed opacity-50">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3 opacity-50">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm">Help</span>
                  <span className="text-xs text-gray-600">Unavailable</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center w-full p-2 rounded-lg bg-black bg-opacity-60 backdrop-blur-sm border border-transparent text-white hover:bg-opacity-80 hover:border-gray-600 transition-all duration-200 group">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <span className="text-sm">{logout.isPending ? 'Logging out...' : 'Logout'}</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700">
          <Link
            to="/"
            className="flex items-center p-2 rounded-lg bg-black bg-opacity-40 backdrop-blur-sm border border-transparent text-gray-300 hover:text-white hover:bg-opacity-60 hover:border-gray-600 transition-all duration-200 group">
            <div className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center mr-2 group-hover:bg-gray-700 transition-colors">
              <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0L3 9.414a1 1 0 010-1.414L8.293 2.707a1 1 0 011.414 0l5.293 5.293a1 1 0 010 1.414l-5.293 5.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-xs">Back to Homepage</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
