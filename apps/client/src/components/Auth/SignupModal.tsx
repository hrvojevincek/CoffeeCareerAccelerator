import { useState } from 'react';

import { type SubmitHandler, useForm } from 'react-hook-form';

import { SignupAction, type SignupActionResult } from '../../actions/auth/signup.action';
import { useNotifications } from '../../contexts/NotificationContext';
import { useSignupAction } from '../../hooks/useSignupAction';
import { type Inputs } from '../../types/types';

interface SignupModalProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export const SignupModal = ({ onSuccess, onSwitchToLogin }: SignupModalProps) => {
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
        onSuccess();
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
    <div className="max-h-96 overflow-y-auto">
      {/* API Error Display */}
      {apiError && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900 dark:text-red-300">
          <h3 className="text-sm font-medium">{apiError}</h3>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 z-10">
        {/* Username and Category */}
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <div className="relative flex items-center">
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
                  message: 'Username can only contain letters, numbers, underscores, and hyphens',
                },
              })}
              type="text"
              name="username"
              id="username"
              placeholder="johndoe123"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 focus:z-10 focus:relative block w-full px-3 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                errors.username || fieldErrors.username ? 'border-red-500' : ''
              }`}
            />
            <select
              {...register('category', {
                required: 'Please select a category',
                validate: value =>
                  value !== 'Choose a category' || 'Please select a valid category',
              })}
              onChange={e => setValue('category', e.target.value, { shouldValidate: true })}
              name="category"
              className={`flex-shrink-0 z-10 -ml-px appearance-none py-2.5 pl-4 pr-10 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-r-lg hover:bg-gray-200 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600 ${
                errors.category || fieldErrors.category ? 'border-red-500' : ''
              }`}>
              <option value="">Choose a category</option>
              <option value="user">Jobseeker</option>
              <option value="employer">Employer</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 z-20 flex items-center text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
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

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
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
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 focus:z-10 focus:relative block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
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

        {/* Password */}
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
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 focus:z-10 focus:relative block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
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

        {/* Terms and Conditions */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              className="w-4 h-4 border border-gray-400 rounded bg-gray-50 focus:ring-3 focus:ring-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-500 dark:ring-offset-gray-800"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
              I accept the{' '}
              <button
                type="button"
                className="font-medium underline underline-offset-2 text-gray-700 hover:text-gray-900 decoration-gray-400 transition-colors dark:text-gray-300 dark:hover:text-gray-200 dark:decoration-gray-500"
                onClick={() => undefined}>
                Terms and Conditions
              </button>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-4 focus:outline-none ${
            signupMutation.isPending
              ? 'bg-gray-500 cursor-not-allowed'
              : allRequirementsMet
                ? 'bg-gray-800 hover:bg-gray-700 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-500'
                : 'bg-gray-500 cursor-not-allowed'
          }`}
          disabled={signupMutation.isPending || !allRequirementsMet}>
          {signupMutation.isPending ? 'Creating account...' : 'Create an account'}
        </button>

        {/* Switch to Login */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-medium underline underline-offset-2 text-gray-700 hover:text-gray-900 decoration-gray-400 transition-colors dark:text-gray-300 dark:hover:text-gray-200 dark:decoration-gray-500">
              Login here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};
