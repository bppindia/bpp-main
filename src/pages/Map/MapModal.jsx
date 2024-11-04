import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SandD from "./StateAndDistrict.json";

const MapModal = ({ content, onClose }) => {
  const [districts, setDistricts] = useState([]);

  function findDistrictByState(stateName) {
    const stateData = SandD.states.find((state) => state.state === stateName);
    return stateData ? stateData.districts : [];
  }

  useEffect(() => {
    if (content) {
      const foundDistricts = findDistrictByState(content);
      setDistricts(foundDistricts);
    }
  }, [content]);

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50 p-4">
      {/* <div className="relative p-4 w-full max-w-md sm:max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow dark:bg-gray-700 sm:p-8"> */}
      <div className="relative p-4 w-full max-w-[22rem] max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow dark:bg-gray-700 sm:p-8">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {content}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}>
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal body */}
        <div className="p-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter The Name"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="name@flowbite.com"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Selected State
              </label>
              <Select disabled>
                <SelectTrigger className="w-full">{content}</SelectTrigger>
              </Select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select a District
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a District" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Taluka/village/city
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter the village"
            />
          </div>

          <button
            type="button"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onClose}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
