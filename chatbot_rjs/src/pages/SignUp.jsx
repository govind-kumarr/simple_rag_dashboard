import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../config/axios_config";
import ThirdPartyAuth from "../components/ThirdPartyAuth";
import Divider from "../components/Divider";
import { IoReaderOutline } from "react-icons/io5";

const SignUp = () => {
  const initialInputs = {
    email: "",
    password: "",
    againPassword: "",
  };

  const [registerInfo, setRegisterInfo] = useState(initialInputs);
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [checkBoxModal, setCheckBoxModal] = useState(false);
  const [checkedBox, setCheckedBox] = useState(false);

  const navigate = useNavigate();

  const callRegisterAPI = async (registerData) => {
    if (!checkedBox) {
      return;
    }
    try {
      const res = await instance.post(`/auth/register`, registerData);
      const data = res.data;
      if (data.details === "Registered Successfully!") {
        navigate("/signin");
      }
    } catch (error) {}
  };

  const handleModal = (e) => {
    setCheckBoxModal(!checkBoxModal);
  };

  const handleCheckBox = (e) => {
    setCheckedBox(!checkedBox);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, againPassword } = registerInfo;
    if (!email || !password || !againPassword || passwordMatch != true) {
      return;
    }
    callRegisterAPI({ email, password });
  };

  const handlePasswordMatch = (enteredPassword) => {
    const { password } = registerInfo;
    if (password === enteredPassword) {
      setPasswordMatch(true);
    } else setPasswordMatch(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
    if (name === "againPassword") handlePasswordMatch(value);
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-8 h-8 mr-2" src="/favicon-32x32.png" alt="logo" />
            DocTalk
          </a>

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            {checkBoxModal && (
              <div className="p-6 h-[34rem] space-y-4 md:space-y-6 sm:p-8">
                <div className="flex border-b-2 border-black w-full space-x-8 ">
                  <div className="w-10 h-10 ml-8 mb-4">
                    <IoReaderOutline className="w-full h-full text-[#2563EB]" />
                  </div>
                  <h1 className="font-bold text-lg">Terms of Services</h1>
                </div>
                <div>
                  Use of the Service: The [Your Chatbot Project Name] service is
                  provided for your personal use only. You agree not to use it
                  for any illegal or unauthorized purposes. Intellectual
                  Property: All content and materials provided by [Your Chatbot
                  Project Name] are the intellectual property of [Your
                  Company/Organization Name]. You may not use, copy, or
                  distribute these materials without permission. User Conduct:
                  You agree to use [Your Chatbot Project Name] responsibly and
                  refrain from engaging in any activity that may harm the
                  service or other users. Privacy Policy: We are committed to
                  protecting your privacy. By signing up, you agree to the terms
                  of our Privacy Policy.
                </div>
                <div className="space-x-44">
                  <button
                    className="border-[#2563EB] ml-auto border-2 w-24 h-8 text-[#2563EB] rounded-md "
                    onClick={() => handleModal()}
                  >
                    Decline
                  </button>
                  <button
                    className="bg-[#2563EB] w-24 h-8 ml-auto text-white rounded-md"
                    onClick={() => {
                      handleModal();
                      handleCheckBox();
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>
            )}

            {!checkBoxModal && (
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required={true}
                      value={registerInfo.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                      value={registerInfo.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="againPassword"
                      id="confirm-password"
                      placeholder="Confirm Password"
                      className={
                        "bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                        `${
                          passwordMatch === null || passwordMatch
                            ? "border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                            : "border-red-300 focus:ring-red-600 focus:border-red-600"
                        }`
                      }
                      required={true}
                      value={registerInfo.againPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        checked={checkedBox}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <a
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          href="#"
                        >
                          <button onClick={() => handleModal()}>
                            Terms and Conditions
                          </button>
                        </a>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create an account
                  </button>
                  <Divider dividingText={"Sign Up using"} />
                  <ThirdPartyAuth />
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </Link>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
