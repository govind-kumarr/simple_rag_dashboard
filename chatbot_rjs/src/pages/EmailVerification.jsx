import React from "react";
import Logo from "../components/Logo";

const EmailVerification = () => {
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Logo />
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <div className="flex justify-center gap-2 items-center my-2 mt-0">
              <div className="-mt-1">
                <img src="../../public/verification.svg" alt="" />
              </div>
              <h1 className=" text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Email Vefification
              </h1>
            </div>

            <p className="font-light text-gray-500 dark:text-gray-400">
              Your email address has not been verified yet. To complete your
              registration and access our services, please verify your email
              address by clicking the link sent to your email.
            </p>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <a href="mailto:gk4051668@gmail.com">Verify now</a>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmailVerification;
