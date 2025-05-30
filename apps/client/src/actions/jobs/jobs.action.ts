import { AxiosError } from 'axios';

import { jobsApi, userApi } from '../../services/api';

import type { JobData } from '../../types/types';

export interface JobsActionResult<T = JobData[]> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Business logic for job operations
 */
export class JobsAction {
  /**
   * Fetch all jobs with optional filtering
   */
  static async getAllJobs(): Promise<JobsActionResult> {
    try {
      const jobs = await jobsApi.getAll();

      return {
        success: true,
        data: jobs,
      };
    } catch (error) {
      console.error('Get all jobs error:', error);
      return this.handleJobsError(error);
    }
  }

  /**
   * Fetch jobs by category
   */
  static async getJobsByCategory(category: string): Promise<JobsActionResult> {
    try {
      if (!category?.trim()) {
        return {
          success: false,
          error: 'Category is required',
        };
      }

      const jobs = await jobsApi.getByCategory(category);

      return {
        success: true,
        data: jobs,
      };
    } catch (error) {
      console.error('Get jobs by category error:', error);
      return this.handleJobsError(error);
    }
  }

  /**
   * Fetch single job by ID
   */
  static async getJobById(id: number): Promise<JobsActionResult<JobData>> {
    try {
      if (!id || id <= 0) {
        return {
          success: false,
          error: 'Valid job ID is required',
        };
      }

      const job = await jobsApi.getById(id);

      return {
        success: true,
        data: job,
      };
    } catch (error) {
      console.error('Get job by ID error:', error);
      return {
        success: false,
        error: this.handleJobsError(error).error || 'Failed to get job',
      };
    }
  }

  /**
   * Apply to a job
   */
  static async applyToJob(
    jobId: number,
    userId: number
  ): Promise<JobsActionResult<{ success: boolean }>> {
    try {
      if (!jobId || jobId <= 0) {
        return {
          success: false,
          error: 'Valid job ID is required',
        };
      }

      if (!userId || userId <= 0) {
        return {
          success: false,
          error: 'User must be logged in to apply',
        };
      }

      const result = await userApi.createApplication(jobId, userId);

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error('Apply to job error:', error);
      return {
        success: false,
        error: this.handleJobsError(error).error || 'Failed to apply to job',
      };
    }
  }

  /**
   * Filter jobs by criteria
   */
  static filterJobs(
    jobs: JobData[],
    criteria: {
      search?: string;
      location?: string;
      category?: string;
      salary?: string;
    }
  ): JobData[] {
    if (!jobs || jobs.length === 0) return [];

    return jobs.filter(job => {
      // Search filter (title, description, company)
      if (criteria.search?.trim()) {
        const searchTerm = criteria.search.toLowerCase();
        const searchableText =
          `${job.title} ${job.description} ${job.employer?.name || ''}`.toLowerCase();
        if (!searchableText.includes(searchTerm)) return false;
      }

      // Location filter
      if (criteria.location?.trim()) {
        const locationTerm = criteria.location.toLowerCase();
        if (!job.location.toLowerCase().includes(locationTerm)) return false;
      }

      // Category filter
      if (criteria.category?.trim()) {
        const categoryTerm = criteria.category.toLowerCase();
        if (!job.category.toLowerCase().includes(categoryTerm)) return false;
      }

      return true;
    });
  }

  /**
   * Sort jobs by criteria
   */
  static sortJobs(
    jobs: JobData[],
    sortBy: 'newest' | 'oldest' | 'title' | 'location' = 'newest'
  ): JobData[] {
    if (!jobs || jobs.length === 0) return [];

    const sortedJobs = [...jobs];

    switch (sortBy) {
      case 'newest':
        return sortedJobs.sort(
          (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );

      case 'oldest':
        return sortedJobs.sort(
          (a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
        );

      case 'title':
        return sortedJobs.sort((a, b) => a.title.localeCompare(b.title));

      case 'location':
        return sortedJobs.sort((a, b) => a.location.localeCompare(b.location));

      default:
        return sortedJobs;
    }
  }

  /**
   * Handle and format jobs-related errors
   */
  private static handleJobsError(error: unknown): JobsActionResult {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as {
        error?: string;
        message?: string;
      };

      // Handle specific HTTP status codes
      if (error.response?.status === 404) {
        return {
          success: false,
          error: 'Job not found',
        };
      }

      if (error.response?.status === 403) {
        return {
          success: false,
          error: 'You do not have permission to perform this action',
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
      error: 'An error occurred while processing jobs. Please try again.',
    };
  }
}
