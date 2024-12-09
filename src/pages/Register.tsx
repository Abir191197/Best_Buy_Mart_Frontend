import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import reqApi from "../redux/features/auth/regApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RegisterFormInputs {
  name: string;
  address: string;
  phone: number;
  email: string;
  password: string;
}


export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const [registerUser, { isLoading }] =
    reqApi.useRegisterMutation();

  const onSubmit = async (data: RegisterFormInputs) => {
    const userInfo = {
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
      password: data.password,
    };

    try {
      await registerUser(userInfo).unwrap();
      toast.success("Registration successful");
     
    } catch (error) {
      toast.error(`Registration failed: ${error}`);
      
    }
  };

  if (isLoading) {
    //return <Loading />;
  }


  return (
    <div className="relative isolate bg-white px-6 py-16 sm:py-16 lg:px-8">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
        <svg x="50%" y={-64} className="overflow-visible fill-gray-50">
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
      <div className="mx-auto max-w-xl lg:max-w-4xl">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 mx-40 ">
          Register
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          "We assist students in enhancing their learning journeys."
        </p>
        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
          <form onSubmit={handleSubmit(onSubmit)} className="lg:flex-auto">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 text-gray-900">
                  Full Name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      Name is required
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="Address"
                  className="block text-sm font-semibold leading-6 text-gray-900">
                  Address
                </label>
                <div className="mt-2.5">
                  <input
                    id="address"
                    type="text"
                    required
                    {...register("address", { required: true })}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.address ? "border-red-500" : ""
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      Address is required
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-semibold leading-6 text-gray-900">
                  Phone Number
                </label>

                <div className="mt-2.5">
                  <input
                    type="phone"
                    id="phone"
                    {...register("phone", { required: true, pattern: /^\d+$/ })}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                  />
                  {errors.phone?.type === "required" && (
                    <p className="text-red-500 text-xs mt-1">
                      Phone number is required
                    </p>
                  )}
                  {errors.phone?.type === "pattern" && (
                    <p className="text-red-500 text-xs mt-1">
                      Invalid phone number
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900 ">
                  Email address
                </label>
                <div>
                  <div className="mt-2">
                    <input
                      id="email"
                      type="email"
                      {...register("email", { required: true })}
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        Email is required
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="Password"
                  className="block text-sm font-semibold leading-6 text-gray-900">
                  Password
                </label>
                <div>
                  <div className="mt-2">
                    <input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                      })}
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        Password is required and must be at least 6 characters
                        long
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign Up
              </button>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-500">
              Already have an account?{" "}
              <Link to="/Login" className="font-semibold text-indigo-600">
                Login Here
              </Link>
            </p>
          </form>
          
        </div>
      </div>
    </div>
  );
}
