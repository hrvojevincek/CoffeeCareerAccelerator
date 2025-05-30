import { AxiosError } from 'axios';

import { authApi } from '../../services/api';

import type { User } from '../../types/types';

export interface LoginActionResult {
  success: boolean;
  data?: User;
  error?: string;
}

export interface LoginActionParams {
  credentials: {
    username: string;
    password: string;
  };
  onSuccess?: (user: User) => void;
  onError?: (error: LoginActionResult) => void;
}

/**
 * Business logic for user login
 */
export class LoginAction {
  /**
   * Execute login process
   */
  static async execute(params: LoginActionParams): Promise<LoginActionResult> {
    const { credentials, onSuccess, onError } = params;

    try {
      // Pre-validation
      const validationResult = this.validateCredentials(credentials);
      if (!validationResult.isValid) {
        const result: LoginActionResult = {
          success: false,
          error: validationResult.error,
        };
        onError?.(result);
        return result;
      }

      // Call API
      const user = await authApi.login(credentials);

      const result: LoginActionResult = {
        success: true,
        data: user,
      };

      onSuccess?.(user);
      return result;
    } catch (error) {
      console.error('Login action error:', error);

      const result = this.handleLoginError(error);
      onError?.(result);
      return result;
    }
  }

  /**
   * Validate login credentials
   */
  private static validateCredentials(credentials: { username: string; password: string }): {
    isValid: boolean;
    error?: string;
  } {
    if (!credentials.username?.trim()) {
      return {
        isValid: false,
        error: 'Username is required',
      };
    }

    if (!credentials.password?.trim()) {
      return {
        isValid: false,
        error: 'Password is required',
      };
    }

    return { isValid: true };
  }

  /**
   * Handle and format login errors
   */
  private static handleLoginError(error: unknown): LoginActionResult {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as {
        error?: string;
        message?: string;
      };

      // Handle specific HTTP status codes
      if (error.response?.status === 401) {
        return {
          success: false,
          error: 'Invalid username or password',
        };
      }

      if (error.response?.status === 429) {
        return {
          success: false,
          error: 'Too many login attempts. Please try again later.',
        };
      }

      if (error.response && error.response.status >= 500) {
        return {
          success: false,
          error: 'Server error. Please try again later.',
        };
      }

      // Handle API error messages
      if (apiError?.error) {
        return {
          success: false,
          error: apiError.error,
        };
      }
    }

    // Fallback for unknown errors
    return {
      success: false,
      error: 'Login failed. Please try again.',
    };
  }
}
