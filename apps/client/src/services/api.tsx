import axios, { type AxiosError } from 'axios';

import type { JobData, User, UserData } from '../types/types';

// Determine the base URL based on the environment
const getBaseUrl = (): string => {
  // For debugging purposes
  const prodUrl = import.meta.env.VITE_PROD_API_URL;
  const isProd = import.meta.env.PROD;

  // Check if we're in a production build
  if (isProd) {
    // Use the configured URL or fall back to the known production API URL
    return prodUrl || 'https://coffee-career-api.vercel.app';
  }

  // For development environment
  return 'http://localhost:8080';
};

// Create a base axios instance with common settings
const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true, // This ensures cookies are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to handle CORS issues
api.interceptors.request.use(
  config => {
    // You can modify headers here if needed for CORS
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 0) {
      console.error('Network error - likely CORS-related');
      // Fall back to dummy data or handle as needed
    }
    return Promise.reject(error);
  }
);

// Job-related API functions
export const jobsApi = {
  getAll: async (): Promise<JobData[]> => {
    try {
      const response = await api.get<JobData[]>('/jobs');
      return response.data;
    } catch (error) {
      console.error('Error fetching all jobs:', error);
      // Return empty array instead of failing
      return [];
    }
  },

  getById: async (id: number): Promise<JobData> => {
    try {
      const response = await api.get<JobData>(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching job ${id}:`, error);
      // Return a default job object to prevent crashes
      throw error;
    }
  },

  getByCategory: async (category: string): Promise<JobData[]> => {
    try {
      const response = await api.get<JobData[]>(`/jobs/categories/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching jobs by category ${category}:`, error);
      // Return empty array instead of failing
      return [];
    }
  },

  create: async (jobData: Partial<JobData>): Promise<JobData> => {
    const response = await api.post<JobData>('/jobs', jobData);
    return response.data;
  },

  delete: async (id: number): Promise<{ success: boolean }> => {
    const response = await api.delete<{ success: boolean }>(`/jobs/${id}`);
    return response.data;
  },
};

// Auth-related API functions
export const authApi = {
  login: async (credentials: { username: string; password: string }): Promise<User> => {
    const response = await api.post<User>('/auth/login', credentials);
    return response.data;
  },

  signup: async (userData: Record<string, unknown>): Promise<User> => {
    const response = await api.post<User>('/auth/signup', userData);
    return response.data;
  },

  logout: async (): Promise<{ success: boolean }> => {
    const response = await api.post<{ success: boolean }>('/auth/logout');
    return response.data;
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  },
};

// User-related API functions
export const userApi = {
  getById: async (id: number): Promise<UserData> => {
    const response = await api.get<UserData>(`/users/${id}`);
    return response.data;
  },

  update: async (id: number, userData: Partial<UserData>): Promise<UserData> => {
    const response = await api.put<UserData>(`/users/${id}`, { data: userData });
    return response.data;
  },

  createApplication: async (jobId: number, userId: number): Promise<{ success: boolean }> => {
    const response = await api.post<{ success: boolean }>('/users/application', {
      jobId,
      userId,
    });
    return response.data;
  },
};

export default api;
