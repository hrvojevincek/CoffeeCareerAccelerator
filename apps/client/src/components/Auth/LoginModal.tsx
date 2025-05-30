import { type AxiosError } from 'axios';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { useNotifications } from '../../contexts/NotificationContext';
import { useLogin } from '../../hooks/useAuth';

interface LoginForm {
  username: string;
  password: string;
}

interface LoginModalProps {
  onSuccess: () => void;
  onSwitchToSignup: () => void;
}

export const LoginModal = ({ onSuccess, onSwitchToSignup }: LoginModalProps) => {
  const login = useLogin();
  const notifications = useNotifications();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async data => {
    try {
      await login.mutateAsync({
        username: data.username,
        password: data.password,
      });
      notifications.showSuccess('🎉 Welcome back! You have successfully logged in.');
      onSuccess();
    } catch (err) {
      const error = err as AxiosError<{ error?: string }>;
      const errorMessage =
        error.response?.data?.error || 'Login failed. Please check your credentials.';
      console.error('Login failed:', error);
      notifications.showError(errorMessage);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Username
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          placeholder="Enter your username"
          {...register('username', { required: 'Username is required' })}
        />
        {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          placeholder="Enter your password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <button
            type="button"
            className="font-medium text-blue-600 hover:text-blue-500 underline"
            onClick={() => {
              // TODO: Implement forgot password functionality
              console.log('Forgot password clicked');
            }}>
            Forgot your password?
          </button>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="font-medium text-blue-600 hover:text-blue-500">
            Sign up here
          </button>
        </p>
      </div>
    </form>
  );
};
