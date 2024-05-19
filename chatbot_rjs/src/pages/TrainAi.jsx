import React, { useState } from "react";

const TrainAi = () => {
  const trainingData = [
    { data1: "hello hello hello hello hello hello" },
    { data2: "hello hello hello hello hello hello" },
    { data3: "hello hello hello hello hello hello" },
    { data4: "hello hello hello hello hello hello" },
  ];
  const [trainingValue, setTrainingValue] = useState("");
  function onChangeInput(e) {
    e.preventDefault();
    setTrainingValue(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    setTrainingValue("");
  }
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  border-gray-200 dark:border-gray-700 mt-14">
        <div>
          <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
            <div className="mb-4 col-span-full xl:mb-2">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                Train AI
              </h1>
            </div>
            <div className="col-span-full xl:mb-2">
              <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <div className=" flex gap-6">
                  <div className="w-[90%] sm:col-span-3">
                    <input
                      type="text"
                      name="userName"
                      value={trainingValue}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Train AI"
                      required=""
                      onChange={onChangeInput}
                    />
                  </div>
                  <button
                    onClick={onSubmit}
                    className="bg-[#2563EB]  text-white border w-[10%] border-gray-200 rounded-lg shadow-sm  dark:border-gray-700  dark:bg-gray-800"
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {trainingData.map((data, index) => (
            <div
              key={index}
              className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900"
            >
              <div className="col-span-full xl:mb-2">
                <div className="flex gap-6 h-full">
                  <div className="w-[90%] sm:col-span-3">
                    <div className="shadow-sm h-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      abcd
                    </div>
                  </div>
                  <button className="text-white bg-[#e51111b2]  border w-[10%] border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainAi;
