import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Navbar from '../components/Navbar';
import { useState } from 'react';

const SignupPage = () => {
  const history = useNavigate();

  const [user, setUser] = useState({});

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      data: data,
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`http://localhost:8080/${data.category}/signup`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.error) {
          console.error(result.error);
        } else {
          console.log(result);
          setUser(result);
          history('/'); // redirects to home page
        }
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  return (
    <>
      <Navbar />
      <section className=" h-screen flex justify-center items-center sm:bg-cover md:bg-cover bg-cover bg-[url('https://europeancoffeetrip.com/wp-content/uploads/2018/12/Elbgold-Coffee-Lab-2.jpg')]">
        <div className=" w-full rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-900">
          <div className="space-y-4 md:space-y-6 sm:p-8">
            <h1 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Create an account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <div className="flex">
                  <input
                    {...register('username', {
                      required: true,
                      minLength: {
                        value: 5,
                        message: 'Enter min 5 characters',
                      },
                      maxLength: 20,
                      pattern: /^[A-Za-z]+$/i,
                    })}
                    min="5"
                    type="username"
                    name="username"
                    id="username"
                    placeholder="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <select
                    {...register('category')}
                    onChange={(e) =>
                      setValue('category', e.target.value, {
                        shouldValidate: true,
                      })
                    }
                    name="category"
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-r-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                  >
                    <option>Choose a category</option>
                    <option value="user">Jobseeker</option>
                    <option value="employer">Employer</option>
                  </select>
                </div>
                {errors.username && (
                  <span className="block pl-3 mt-1 text-xs text-red-200">
                    Minimum length 5 characters
                  </span>
                )}
                {errors.username && errors.username.type === 'maxLength' && (
                  <span className="block pl-3 mt-1 text-xs text-red-200">
                    Max length exceeded
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register('password', {
                    required: true,
                    minLength: 8,
                    maxLength: 15,
                  })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {errors.password && (
                  <span className="block pl-3 mt-1 text-xs text-red-200">
                    Minimum length 8 characters
                  </span>
                )}
                {errors.password && errors.password.type === 'maxLength' && (
                  <span className="block pl-3 mt-1 text-xs text-red-200">
                    Max length exceeded
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
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{' '}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create an account
              </button>
              <p className=" font-medium text-sm text-gray-500 dark:text-gray-400">
                Already have an account?
                <Link
                  to="/login"
                  className="pl-4 text-blue-700 hover:underline dark:text-blue-500"
                >
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
