import { AxiosError } from 'axios';

import { authApi } from '../../services/api';

import type { Inputs, User } from '../../types/types';

export interface SignupActionResult {
  success: boolean;
  data?: User;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export interface SignupActionParams {
  userData: Inputs;
  onSuccess?: (user: User) => void;
  onError?: (error: SignupActionResult) => void;
}

/**
 * Business logic for user signup
 * Handles validation, API calls, and error processing
 */
export class SignupAction {
  /**
   * Execute signup process
   */
  static async execute(params: SignupActionParams): Promise<SignupActionResult> {
    const { userData, onSuccess, onError } = params;

    try {
      // Pre-validation (business rules)
      const validationResult = this.validateSignupData(userData);
      if (!validationResult.isValid) {
        const result: SignupActionResult = {
          success: false,
          error: 'Please fix the validation errors',
          fieldErrors: validationResult.errors,
        };
        onError?.(result);
        return result;
      }

      // Call API
      const user = await authApi.signup(userData);

      const result: SignupActionResult = {
        success: true,
        data: user,
      };

      onSuccess?.(user);
      return result;
    } catch (error) {
      console.error('Signup action error:', error);

      const result = this.handleSignupError(error);
      onError?.(result);
      return result;
    }
  }

  /**
   * Validate signup data according to business rules
   */
  private static validateSignupData(userData: Inputs): {
    isValid: boolean;
    errors: Record<string, string>;
  } {
    const errors: Record<string, string> = {};

    // Username validation
    if (!userData.username) {
      errors.username = 'Username is required';
    } else if (userData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else if (userData.username.length > 30) {
      errors.username = 'Username cannot exceed 30 characters';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(userData.username)) {
      errors.username = 'Username can only contain letters, numbers, underscores, and hyphens';
    }

    // Email validation
    if (!userData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!userData.password) {
      errors.password = 'Password is required';
    } else {
      const passwordErrors = this.validatePassword(userData.password);
      if (passwordErrors.length > 0) {
        errors.password = passwordErrors.join('. ');
      }
    }

    // Category validation
    if (!userData.category) {
      errors.category = 'Please select a category';
    } else if (!['user', 'employer'].includes(userData.category)) {
      errors.category = 'Please select a valid category';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Validate password strength
   */
  private static validatePassword(password: string): string[] {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[@$!%*?&]/.test(password)) {
      errors.push('Password must contain at least one special character (@$!%*?&)');
    }

    return errors;
  }

  /**
   * Handle and format signup errors
   */
  private static handleSignupError(error: unknown): SignupActionResult {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as {
        error?: string;
        details?: Array<{
          field: string;
          message: string;
          code: string;
        }>;
        message?: string;
      };

      if (apiError?.details && Array.isArray(apiError.details)) {
        // Handle field-specific validation errors from API
        const fieldErrors: Record<string, string> = {};
        apiError.details.forEach(detail => {
          const field = detail.field?.replace('body.', '') || 'general';
          fieldErrors[field] = detail.message || 'Invalid value';
        });

        return {
          success: false,
          error: 'Please fix the errors below',
          fieldErrors,
        };
      }

      // Handle general API errors
      if (apiError?.error) {
        return {
          success: false,
          error: apiError.error,
        };
      }

      // Handle HTTP status errors
      if (error.response?.status === 400) {
        return {
          success: false,
          error: 'Invalid signup data. Please check your information.',
        };
      }

      if (error.response?.status === 409) {
        return {
          success: false,
          error: 'Username or email already exists. Please try different values.',
        };
      }

      if (error.response && error.response.status >= 500) {
        return {
          success: false,
          error: 'Server error. Please try again later.',
        };
      }
    }

    // Handle network errors
    if (error instanceof Error && error.message.includes('Network Error')) {
      return {
        success: false,
        error: 'Network error. Please check your connection and try again.',
      };
    }

    // Fallback for unknown errors
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }

  /**
   * Get password strength requirements status
   */
  static getPasswordRequirements(password: string) {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
    };
  }

  /**
   * Check if all password requirements are met
   */
  static isPasswordValid(password: string): boolean {
    const requirements = this.getPasswordRequirements(password);
    return Object.values(requirements).every(Boolean);
  }
}
