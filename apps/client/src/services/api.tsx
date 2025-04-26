import axios from 'axios';

import type { JobData, User, UserData } from '../types/types';

// Determine the base URL based on the environment
const getBaseUrl = (): string => {
  console.log('VITE_PROD_API_URL:', import.meta.env.VITE_PROD_API_URL);

  // Check if we're in a production build
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_PROD_API_URL || 'https://coffee-career-api.vercel.app';
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

// Job-related API functions
export const jobsApi = {
  getAll: async (): Promise<JobData[]> => {
    const response = await api.get<JobData[]>('/jobs');
    return response.data;
  },

  getById: async (id: number): Promise<JobData> => {
    const response = await api.get<JobData>(`/jobs/${id}`);
    return response.data;
  },

  getByCategory: async (category: string): Promise<JobData[]> => {
    const response = await api.get<JobData[]>(`/jobs/categories/${category}`);
    return response.data;
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

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
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
