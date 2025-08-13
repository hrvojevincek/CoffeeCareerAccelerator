import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { LoginModal } from '../../components/Auth/LoginModal';
import { SignupModal } from '../../components/Auth/SignupModal';

type AuthMode = 'login' | 'signup';

const AuthPage = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  const handleAuthSuccess = () => {
    navigate('/');
  };

  const switchToLogin = () => {
    setAuthMode('login');
  };

  const switchToSignup = () => {
    setAuthMode('signup');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center bg-[url('https://europeancoffeetrip.com/wp-content/uploads/2018/12/Elbgold-Coffee-Lab-2.jpg')]">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="bg-white dark:bg-black/80 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 bg-black text-white text-center">
            <h1 className="text-2xl font-bold">Coffee Career Accelerator</h1>
            <p className="text-blue-100 mt-1 text-sm">
              {authMode === 'login' ? 'Welcome back!' : 'Join our community'}
            </p>
          </div>

          {/* Form Container with Sliding Animation */}
          <div className="relative h-auto">
            <div
              className={`flex transition-transform duration-700 ease-in-out ${
                authMode === 'signup' ? '-translate-x-1/2' : 'translate-x-0'
              }`}
              style={{ width: '200%' }}>
              {/* Login Form */}
              <div className="w-1/2 p-8 flex-shrink-0">
                <h2 className="text-xl font-semibold text-black dark:text-white mb-6 text-center">
                  Sign In
                </h2>
                <LoginModal onSuccess={handleAuthSuccess} onSwitchToSignup={switchToSignup} />
              </div>

              {/* Signup Form */}
              <div className="w-1/2 p-6 flex-shrink-0">
                <h2 className="text-xl font-semibold text-black dark:text-white mb-6 text-center">
                  Create Account
                </h2>
                <div className="max-h-96 overflow-y-auto px-2">
                  <SignupModal onSuccess={handleAuthSuccess} onSwitchToLogin={switchToLogin} />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 dark:bg-black text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
