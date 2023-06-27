import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

function CvPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserExp>();
  const { id } = useParams<{ id: string }>();

  const onSubmitExperience: SubmitHandler<UserExp> = async (data) => {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
      redirect: 'follow',
    };
    try {
      const response = await fetch(
        `http://localhost:8080/user/${id}/edit`,
        requestOptions
      );
      console.log(response.body);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
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
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Job Position
                </label>

                <input
                  {...register('jobtitle')}
                  type="text"
                  id="jobtitle"
                  name="jobtitle"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  // for="LastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company
                </label>

                <input
                  {...register('company')}
                  type="text"
                  id="company"
                  name="company"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div className="col-span-6 ">
                <label
                  // for="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Years Worked - From / To
                </label>

                <input
                  {...register('dates')}
                  type="text"
                  id="dates"
                  name="dates"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  placeholder="01-2022 / 01-2023"
                />
              </div>
              <div className="col-span-6 ">
                <label
                  // for="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>

                <textarea
                  {...register('description')}
                  id="description"
                  rows="4"
                  name="description"
                  className="mt-1
                  w-full rounded-md border-gray-200 bg-white text-sm
                  text-gray-700 shadow-sm"
                ></textarea>
              </div>
              <div className="col-span-3 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-gray-600 bg-gray-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-blue-500"
                >
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
