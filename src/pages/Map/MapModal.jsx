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
    // Find the state object by matching the state name
    const stateData = SandD.states.find((state) => state.state === stateName);

    // If the state is found, return its districts, otherwise return an empty array
    return stateData ? stateData.districts : [];
  }

  useEffect(() => {
    if (content) {
      const foundDistricts = findDistrictByState(content);
      setDistricts(foundDistricts);
      // console.log("Districts for state:", content, foundDistricts);
    }
  }, [content]); // Run when 'content' (state name) changes

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-0">
      <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {content}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}>
            <svg
              className="w-3 h-3"
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
        <div className="p-4 md:p-5 space-y-4">
          <div className="flex modal-Name-input">
            <div>
              <label
                for="helper-text"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="email"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter The Name"
              />
            </div>
            <div className="mx-2">
              <label
                for="helper-text"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
              />
            </div>
          </div>
          <div className="flex modal-DropDown gap-5">
            <div>
              <label
                htmlFor="state-select"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Selected State
              </label>
              <Select disabled={true}>
                <SelectTrigger id="state-select" className="w-[180px]">
                  {/* Display the selected value */}
                  {content}
                </SelectTrigger>
              </Select>
            </div>

            <div>
              <label
                htmlFor="district-select"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select a District
              </label>

              <Select>
                <SelectTrigger id="district-select" className="w-[180px]">
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

            <div>
              <label
                htmlFor="district-select"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Taluka/village/city
              </label>
              <input
                type="email"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter the village "
              />
            </div>
          </div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onClose}>
            Submit
          </button>
        </div>
        {/* Modal footer */}
        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"></div>
      </div>
    </div>
  );
};

export default MapModal;
