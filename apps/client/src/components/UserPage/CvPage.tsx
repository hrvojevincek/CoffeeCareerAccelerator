import { type SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { type UserExp } from '../../types/types';

interface ApiResponse {
  success: boolean;
  data?: unknown;
  message?: string;
}

function CvPage() {
  const { register, handleSubmit } = useForm<UserExp>();
  const { id } = useParams<{ id: string }>();

  const onSubmitExperience: SubmitHandler<UserExp> = async data => {
    if (!id) {
      console.error('User ID is undefined');
      return;
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
      redirect: 'follow',
    };
    try {
      const response = await fetch(`http://localhost:8080/user/${id}/edit`, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = (await response.json()) as ApiResponse;
      // Log only in development environment
      if (process.env.NODE_ENV === 'development') {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-white">
      <div className="mt-6 lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center px-2 py-2 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-2xl">
              Add your experience
            </h1>
            <form
              onSubmit={handleSubmit(onSubmitExperience)}
              className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="jobPosition" className="block text-sm font-medium text-gray-700">
                  Job Position
                </label>
                <input
                  type="text"
                  id="jobPosition"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  {...register('jobtitle')}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  {...register('company')}
                />
              </div>
              <div className="col-span-6 ">
                <label htmlFor="yearsWorked" className="block text-sm font-medium text-gray-700">
                  Years Worked - From / To
                </label>
                <input
                  type="text"
                  id="yearsWorked"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  {...register('dates')}
                  placeholder="01-2022 / 01-2023"
                />
              </div>
              <div className="col-span-6 ">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...register('description')}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"></textarea>
              </div>
              <div className="col-span-3 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-gray-600 bg-gray-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-blue-500">
                  Add Experience
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default CvPage;
