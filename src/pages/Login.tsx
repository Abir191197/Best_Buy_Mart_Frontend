
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";

import authApi from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";
import { verifyToken } from "../utils/verifyToken";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginFormInputs>({
   
  });
  const [login, { isLoading }] = authApi.useLoginMutation();

  const onSubmit = async (data: LoginFormInputs) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      // Perform login
      const res = await login(userInfo).unwrap();

      if (res.data?.user) {
        // Display success toast

        // Verify token and extract user
        const user: TUser = verifyToken(
          res.data.accessToken
        ) as unknown as TUser;

        dispatch(setUser({ user, token: res.data.accessToken }));
        navigate(`/${user.role}`);
      } else {
        throw new Error("User information is missing from the response.");
      }
    } catch (error: any) {
      // Log error for debugging
     

      // Extract and display error message from error response
      const errorMessage =
        error?.data?.message || // API error message
        error?.message || // General error message
        "An error occurred during login."; // Fallback message

      toast.error(`Login Error: ${errorMessage}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true">
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            x="50%"
            y={-64}
            patternUnits="userSpaceOnUse">
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-64} className="overflow-visible fill-sky-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        />
      </svg>
      
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-48">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-8 text-2xl font-bold leading-9 text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-black">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    {...register("email")}
                    className="text-black px-1.5 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    {...register("password")}
                    className="text-black px-1.5 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm leading-6">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </form>
          </div>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Not a member?{" "}
            <Link
              to="/Register"
              className="font-semibold text-indigo-600 hover:text-indigo-500">
              Register Here
            </Link>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-[#eaeaea] px-3 py-1.5 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]">
              <svg
                viewBox="0 0 262 262"
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#1D9BF0"
                  d="M262 48.2a107 107 0 0 1-30 8.2 53 53 0 0 0 23-29.2 106 106 0 0 1-34 13 53 53 0 0 0-90 48.5A150 150 0 0 1 18 34a53 53 0 0 0 16.5 70.8 53 53 0 0 1-24-6.6c0 .2 0 .3 0 .5a53 53 0 0 0 42.3 51.8 53 53 0 0 1-23.9.9 53 53 0 0 0 49.5 36.8A107 107 0 0 1 0 219.2 150 150 0 0 0 81 240c97.1 0 150.2-80.4 150.2-150.2 0-2.3-.1-4.5-.2-6.7a107 107 0 0 0 26.4-27.2z"
                />
              </svg>
              <span className="text-sm font-semibold leading-6 text-black">
                Twitter
              </span>
            </a>
            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-[#eaeaea] px-3 py-1.5 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              <svg
                className="h-5 w-5"
                viewBox="0 0 48 48"
                width="48px"
                height="48px">
                <path
                  fill="#4285F4"
                  d="M46.6,24.6c0-1.6-0.1-3.1-0.4-4.6H24v9.2h12.7c-0.5,2.8-2,5.2-4.2,6.8v5.6h6.8C43.8,37.4,46.6,31.5,46.6,24.6z"
                />
                <path
                  fill="#34A853"
                  d="M24,48c6.3,0,11.7-2.1,15.6-5.8l-7-5.7c-2.1,1.4-4.9,2.2-8.6,2.2c-6.6,0-12.2-4.4-14.2-10.4H2.6v6.5C6.5,43.8,14.8,48,24,48z"
                />
                <path
                  fill="#FBBC05"
                  d="M9.8,28.3c-1-2.8-1-5.8,0-8.5v-6.5H2.6c-2.6,5.2-2.6,11.4,0,16.6L9.8,28.3z"
                />
                <path
                  fill="#EA4335"
                  d="M24,9.5c3.4-0.1,6.6,1.2,9,3.6l6.7-6.7C33.8,2.1,28.4,0,24,0C14.8,0,6.5,4.2,2.6,11.1l7.2,5.7C11.8,13.9,17.4,9.5,24,9.5z"
                />
              </svg>
              <span className="text-sm font-semibold leading-6 text-black">
                Google
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
