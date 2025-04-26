import { AxiosError } from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../contexts/UserContext';
import { useLogin } from '../../../hooks/useAuth';

type Inputs = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      // Use the login mutation
      const result = await login.mutateAsync({
        username: data.username,
        password: data.password,
      });

      // Set user context with the returned data
      setUser(result);

      // Show success toast
      toast.success('Login successful!');

      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);

      // Show error message to user
      toast.error(
        (error as AxiosError<{ error?: string; message?: string }>)?.response?.data?.error ||
          (error as AxiosError<{ error?: string; message?: string }>)?.response?.data?.message ||
          'An error occurred during login'
      );
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center sm:bg-cover md:bg-cover bg-cover bg-[url('https://europeancoffeetrip.com/wp-content/uploads/2018/12/Elbgold-Coffee-Lab-2.jpg')]">
        <div className="w-full rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-900">
          <div className="px-6 py-6 lg:px-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your username
                </label>
                <input
                  {...register('username', {
                    required: true,
                  })}
                  type="username"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your password
                </label>
                <input
                  {...register('password', {
                    required: true,
                    minLength: 8,
                    maxLength: 15,
                  })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {errors.password && (
                  <span className="block pl-3 mt-1 text-xs text-red-200">
                    Minimum length 8 characters
                  </span>
                )}
                {errors.password && errors.password.type === 'maxLength' && (
                  <span className="block pl-3 mt-1 text-xs text-red-200">Max length exceeded</span>
                )}
              </div>
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">
                  Lost Password?
                </a>
              </div>
              <button
                type="submit"
                disabled={login.isPending}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {login.isPending ? 'Logging in...' : 'Login to your account'}
              </button>
              <div className="pl-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{' '}
                <Link
                  to="/signup"
                  className="pl-4 text-blue-700 hover:underline dark:text-blue-500">
                  Create account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
