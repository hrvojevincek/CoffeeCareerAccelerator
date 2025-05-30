import { useState } from 'react';

import { type SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { SignupAction, type SignupActionResult } from '../../../actions/auth/signup.action';
import { useNotifications } from '../../../contexts/NotificationContext';
import { useSignupAction } from '../../../hooks/useSignupAction';
import { type Inputs } from '../../../types/types';

const SignupPage = () => {
  const navigate = useNavigate();
  const signupMutation = useSignupAction();
  const { showSuccess, showError } = useNotifications();
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const password = watch('password', '');

  // Use action's password validation
  const passwordRequirements = SignupAction.getPasswordRequirements(password);
  const allRequirementsMet = SignupAction.isPasswordValid(password);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    // Clear previous errors
    setApiError(null);
    setFieldErrors({});

    try {
      const result = await signupMutation.mutateAsync(data);

      if (result.success) {
        showSuccess('🎉 Account created successfully! Welcome to Coffee Career Accelerator!');
        navigate('/');
      } else {
        // Handle business logic errors
        const errorMessage = result.error || 'Signup failed';
        setApiError(errorMessage);
        showError(errorMessage);
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
      }
    } catch (error) {
      // Handle unexpected errors
      const typedError = error as SignupActionResult;
      const errorMessage = typedError.error || 'An unexpected error occurred';
      setApiError(errorMessage);
      showError(errorMessage);
      if (typedError.fieldErrors) {
        setFieldErrors(typedError.fieldErrors);
      }
    }
  };

  return (
    <>
      <section className=" h-screen flex justify-center items-center sm:bg-cover md:bg-cover bg-cover bg-[url('https://europeancoffeetrip.com/wp-content/uploads/2018/12/Elbgold-Coffee-Lab-2.jpg')]">
        <div className=" w-full rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-900">
          <div className="space-y-4 md:space-y-6 sm:p-8">
            <h1 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Create an account
            </h1>

            {/* API Error Display */}
            {apiError && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">{apiError}</h3>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <div className="flex">
                  <input
                    {...register('username', {
                      required: 'Username is required',
                      minLength: {
                        value: 3,
                        message: 'Username must be at least 3 characters',
                      },
                      maxLength: {
                        value: 30,
                        message: 'Username cannot exceed 30 characters',
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_-]+$/,
                        message:
                          'Username can only contain letters, numbers, underscores, and hyphens',
                      },
                    })}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="johndoe123"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.username || fieldErrors.username ? 'border-red-500' : ''
                    }`}
                  />
                  <select
                    {...register('category', {
                      required: 'Please select a category',
                      validate: value =>
                        value !== 'Choose a category' || 'Please select a valid category',
                    })}
                    onChange={e =>
                      setValue('category', e.target.value, {
                        shouldValidate: true,
                      })
                    }
                    name="category"
                    className={`flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-r-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 ${
                      errors.category || fieldErrors.category ? 'border-red-500' : ''
                    }`}>
                    <option value="">Choose a category</option>
                    <option value="user">Jobseeker</option>
                    <option value="employer">Employer</option>
                  </select>
                </div>
                {(errors.username || fieldErrors.username) && (
                  <span className="block pl-3 mt-1 text-xs text-red-400">
                    {errors.username?.message || fieldErrors.username}
                  </span>
                )}
                {(errors.category || fieldErrors.category) && (
                  <span className="block pl-3 mt-1 text-xs text-red-400">
                    {errors.category?.message || fieldErrors.category}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  type="email"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.email || fieldErrors.email ? 'border-red-500' : ''
                  }`}
                  placeholder="name@company.com"
                />
                {(errors.email || fieldErrors.email) && (
                  <span className="block pl-3 mt-1 text-xs text-red-400">
                    {errors.email?.message || fieldErrors.email}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message: 'Password must meet all requirements below',
                    },
                  })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.password || fieldErrors.password ? 'border-red-500' : ''
                  }`}
                />

                {/* Password Requirements */}
                {password && (
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                      Password requirements:
                    </p>
                    <ul className="text-xs space-y-1">
                      <li
                        className={`flex items-center ${passwordRequirements.length ? 'text-green-600' : 'text-gray-400'}`}>
                        <span className="mr-2">{passwordRequirements.length ? '✓' : '○'}</span>
                        At least 8 characters
                      </li>
                      <li
                        className={`flex items-center ${passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                        <span className="mr-2">{passwordRequirements.uppercase ? '✓' : '○'}</span>
                        One uppercase letter
                      </li>
                      <li
                        className={`flex items-center ${passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                        <span className="mr-2">{passwordRequirements.lowercase ? '✓' : '○'}</span>
                        One lowercase letter
                      </li>
                      <li
                        className={`flex items-center ${passwordRequirements.number ? 'text-green-600' : 'text-gray-400'}`}>
                        <span className="mr-2">{passwordRequirements.number ? '✓' : '○'}</span>
                        One number
                      </li>
                      <li
                        className={`flex items-center ${passwordRequirements.special ? 'text-green-600' : 'text-gray-400'}`}>
                        <span className="mr-2">{passwordRequirements.special ? '✓' : '○'}</span>
                        One special character (@$!%*?&)
                      </li>
                    </ul>
                  </div>
                )}

                {(errors.password || fieldErrors.password) && (
                  <span className="block pl-3 mt-1 text-xs text-red-400">
                    {errors.password?.message || fieldErrors.password}
                  </span>
                )}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                    I accept the{' '}
                    <Link
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      to="/terms">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-4 focus:outline-none ${
                  signupMutation.isPending
                    ? 'bg-gray-400 cursor-not-allowed'
                    : allRequirementsMet
                      ? 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                      : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={signupMutation.isPending || !allRequirementsMet}>
                {signupMutation.isPending ? 'Creating account...' : 'Create an account'}
              </button>

              <p className=" font-medium text-sm text-gray-500 dark:text-gray-400">
                Already have an account?
                <Link to="/login" className="pl-4 text-blue-700 hover:underline dark:text-blue-500">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
