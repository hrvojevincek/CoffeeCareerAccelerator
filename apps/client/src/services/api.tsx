import axios from 'axios';

// Create a base axios instance with common settings
const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // This ensures cookies are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Job-related API functions
export const jobsApi = {
  getAll: async () => {
    const response = await api.get('/api/jobs/jobs');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/api/jobs/jobs/${id}`);
    return response.data;
  },

  getByCategory: async (category: string) => {
    const response = await api.get(`/api/jobs/jobs/categories/${category}`);
    return response.data;
  },

  create: async (jobData: any) => {
    const response = await api.post('/api/jobs/jobs', jobData);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/api/jobs/jobs/${id}`);
    return response.data;
  },
};

// Auth-related API functions
export const authApi = {
  login: async (username: string, password: string) => {
    const response = await api.post('/api/auth/login', {
      username,
      password,
    });
    return response.data;
  },

  signup: async (userData: any) => {
    const response = await api.post('/api/auth/signup', userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/api/auth/logout');
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};

// User-related API functions
export const userApi = {
  getById: async (id: number) => {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  },

  update: async (id: number, userData: any) => {
    const response = await api.put(`/api/users/${id}`, { data: userData });
    return response.data;
  },

  createApplication: async (jobId: number, userId: number) => {
    const response = await api.post('/api/users/application', {
      jobId,
      userId,
    });
    return response.data;
  },
};

export default api;
