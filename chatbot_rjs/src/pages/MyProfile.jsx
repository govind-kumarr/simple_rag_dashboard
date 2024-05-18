import React, { useEffect, useState } from "react";
import { instance } from "../config/axios_config";

const MyProfile = () => {
  const [userGeneralDetails, setUserGeneralDetails] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });
  const [userPassword, setUserPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const getUserInfo = async () => {
    try {
      const res = await instance.get("/get-user");
      console.log(res.data.user);
      let full = res.data.user.full_name.split(" ");
      setUserGeneralDetails({
        userName: res.data.user.username || " ",
        firstName: full[1] || " ",
        lastName: full[2] || " ",
        email: res.data.user.email || " ",
        avatar: res.data.user.avatar_url || " ",
      });
      console.log(res, "res");
    } catch (error) {
      console.log(error);
    }
  };
  const updateUserPassword = async (e) => {
    e.preventDefault();
    if (userPassword.newPassword !== userPassword.confirmPassword) {
      console.log(`password didn't matched`);
      return;
    }
    try {
      const res = await instance.put("/auth/update-pass", {
        userPassword,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateUserInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.put("/auth/update-details", {
        userGeneralDetails,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeGeneralDetails = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserGeneralDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
    console.log({ name, value }, "val");
  };

  const onChangePassword = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserPassword((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  border-gray-200 dark:border-gray-700 mt-14">
        <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
          <div className="mb-4 col-span-full xl:mb-2">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              User settings
            </h1>
          </div>
          <div className="col-span-4 ">
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                <img
                  className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                  // src="/images/users/bonnie-green-2x.png"
                  src={userGeneralDetails.avatar}
                  alt="Jese picture"
                />
                <div>
                  <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                    Profile picture
                  </h3>
                  <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    JPG, GIF or PNG. Max size of 800K
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      <svg
                        className="w-4 h-4 mr-2 -ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                        <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                      </svg>
                      Upload picture
                    </button>
                    {/* <button
                      type="button"
                      className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Delete
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-semibold dark:text-white">
                General information
              </h3>
              <form action="#">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="userName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      User Name
                    </label>
                    <input
                      type="text"
                      name="userName"
                      value={userGeneralDetails.userName}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Green"
                      required=""
                      onChange={onChangeGeneralDetails}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={userGeneralDetails.firstName}
                      id="firstName"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Bonnie"
                      required=""
                      onChange={onChangeGeneralDetails}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={userGeneralDetails.lastName}
                      id="lastName"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Green"
                      required=""
                      onChange={onChangeGeneralDetails}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userGeneralDetails.email}
                      id="email"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="example@company.com"
                      required=""
                      onChange={onChangeGeneralDetails}
                    />
                  </div>

                  <div className="col-span-6 sm:col-full">
                    <button
                      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      type="submit"
                      onClick={updateUserInfo}
                    >
                      Save all
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-semibold dark:text-white">
                Password information
              </h3>
              <form action="#">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Current Password
                    </label>
                    <input
                      type="text"
                      name="currentPassword"
                      id="currentPassword"
                      value={userPassword.currentPassword}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="••••••••"
                      required=""
                      onChange={onChangePassword}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New password
                    </label>
                    <input
                      data-popover-target="popover-password"
                      data-popover-placement="bottom"
                      type="password"
                      name="newPassword"
                      value={userPassword.newPassword}
                      id="newPassword"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="••••••••"
                      required=""
                      onChange={onChangePassword}
                    />
                    <div
                      data-popover=""
                      id="popover-password"
                      role="tooltip"
                      className="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                    >
                      <div className="p-3 space-y-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Must have at least 6 characters
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="h-1 bg-orange-300 dark:bg-orange-400" />
                          <div className="h-1 bg-orange-300 dark:bg-orange-400" />
                          <div className="h-1 bg-gray-200 dark:bg-gray-600" />
                          <div className="h-1 bg-gray-200 dark:bg-gray-600" />
                        </div>
                        <p>It’s better to have:</p>
                        <ul>
                          <li className="flex items-center mb-1">
                            <svg
                              className="w-4 h-4 mr-2 text-green-400 dark:text-green-500"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Upper &amp; lower case letters
                          </li>
                          <li className="flex items-center mb-1">
                            <svg
                              className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            A symbol (#$&amp;)
                          </li>
                          <li className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            A longer password (min. 12 chars.)
                          </li>
                        </ul>
                      </div>
                      <div data-popper-arrow="" />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="text"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={userPassword.confirmPassword}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="••••••••"
                      required=""
                      onChange={onChangePassword}
                    />
                  </div>
                  <div className="col-span-6 sm:col-full">
                    <button
                      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      type="submit"
                      onClick={updateUserPassword}
                    >
                      Save all
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
