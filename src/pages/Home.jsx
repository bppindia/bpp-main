"use client";
import { useState } from "react";
import Layout from "../layout/Layout";
import { Input } from "@/components/ui/input";
import bppflag from "../assets/bppflag.png";
import axios from "axios";
import { getURLbyEndPointV2 } from "@/api";
import { Checkbox } from "@/components/ui/checkbox";
import "../App.css";
import { indianStateWithCity, profession } from "@/data/data";

export function HomePage() {
  const [registerFormSuccess, setRegisterFormSuccess] = useState(false);
  const [formSuccessful, setFormSuccessful] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    fatherName: "",
    dob: "",
    voterIdNo: "",
    state: "",
    city: "",
    profession: "",
    email: "",
    phoneNo: "",
    voterIdFront: null,
    voterIdBack: null,
  });

 
  const [cities, setCities] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0], 
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({
      ...formData,
      state: selectedState,
      city: "",
    });
    setCities(indianStateWithCity[selectedState] || []);
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setFormData({
      ...formData,
      city: selectedCity,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    try {
      // Validation rules for each field
      const validationRulesCreateUser = {
        firstName: {
          message: "Please enter first name.",
          isValid: () => formData.firstName.trim() !== "",
        },
        lastName: {
          message: "Please enter last Name.",
          isValid: () => formData.lastName.trim() !== "",
        },
        fatherName: {
          message: "Please enter fathers Name.",
          isValid: () => formData.fatherName.trim() !== "",
        },
        dob: {
          message: "Please enter your date of birth.",
          isValid: () => formData.dob.trim() !== "",
        },
        gender: {
          message: "Please enter your gender",
          isValid: () => formData.gender.trim() !== "",
        },
        profession: {
          message: "Please select your profession",
          isValid: () => formData.profession.trim() !== "",
        },
        state: {
          message: "Please select state",
          isValid: () => formData.state.trim() !== "",
        },
        city: {
          message: "Please select your city",
          isValid: () => formData.city.trim() !== "",
        },
        email: {
          message: "Please enter email",
          isValid: () => formData.email.trim() !== "",
        },
        phoneNo: {
          message: "Please enter phoneNo.",
          isValid: () => formData.phoneNo.trim() !== "",
        },
        voterIdNo: {
          message:
            "Please enter a valid voter ID number.",
          isValid: () => /^([a-zA-Z]){3}([0-9]){7}$/.test(formData.voterIdNo),
        },
        voterIdFront: {
          message: "Please upload voter id (below 3 MB).",
          isValid: () =>
            formData.voterIdFront !== null &&
            formData.voterIdFront.size <= 3 * 1024 * 1024, 
        },
        voterIdBack: {
          message: "Please upload Voter id (below 3 MB).",
          isValid: () =>
            formData.voterIdBack !== null &&
            formData.voterIdBack.size <= 3 * 1024 * 1024, 
        },
      };

      // Loop through each field and validate
      for (const field in validationRulesCreateUser) {
        const { message, isValid } = validationRulesCreateUser[field];
        if (!isValid()) {
          alert(message);
          return;
        }
      }

      // If all fields are valid, create FormData object and make API call
      const apiFormData = new FormData();
      apiFormData.append("firstName", formData.firstName);
      apiFormData.append("lastName", formData.lastName);
      apiFormData.append("fatherName", formData.fatherName);
      apiFormData.append("email", formData.email);
      apiFormData.append("voterIdNo", formData.voterIdNo);
      apiFormData.append("phoneNo", formData.phoneNo);
      apiFormData.append("dob", formData.dob);
      apiFormData.append("gender", formData.gender);
      apiFormData.append("profession", formData.profession);
      apiFormData.append("state", formData.state);
      apiFormData.append("city", formData.city);
      apiFormData.append("voterIdFront", formData.voterIdFront);
      apiFormData.append("voterIdBack", formData.voterIdBack);

      const res = await axios.post(
        getURLbyEndPointV2("createBppMember"),
        apiFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status) {
        setFormData({
          firstName: "",
          lastName: "",
          gender: "",
          fatherName: "",
          dob: "",
          voterIdNo: "",
          state: "",
          city: "",
          profession: "",
          email: "",
          phoneNo: "",
          voterIdFront: null,
          voterIdBack: null,
        });
      }

      alert(res.data.message);
    } catch (error) {
      alert("Something went wrong!!");
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div
          className="relative bg-cover bg-center"
          style={{ backgroundImage: "url('/homepagebanner.png')" }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative container z-10 flex flex-col justify-center content-center gap-2 lg:flex-row h-full text-white p-8">
            <div className="flex-1 mt-14">
              <div className="flex gap-2 content-center items-center">
                <h1 className="text-4xl lg:text-4xl raleway">
                  {" "}
                  Empowering Communities Through Decentralization
                </h1>
              </div>
              <h2 className="text-lg mt-4 font-semibold poppins-semibold">
                Objectives of Bhartiya Popular Party is to ensure that its
                policies and decisions are more responsive to the needs of the
                people. And, that local representatives, without interference of
                the central power, plays an important role in shaping a better,
                more connected community. To achieve the centralized progress,
                we aim to develop strong communication channels to facilitate
                information exchange and feedback.
              </h2>
            </div>
            <div className="mt-10 container bg-white rounded-lg p-8 max-w-xl w-full shadow-lg flex-shrink-0">
              <h3 className="text-2xl font-bold text-gray-800 roboto-medium">
                Enroll Now
              </h3>
              <h6 className="text-sm font-semibold lato-thin  text-gray-600 mb-4">
                Fill all the details as per Voter Id{" "}
                <span className="text-red-700">*</span>
              </h6>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div className="flex-1">
                    <label className="block text-gray-700" htmlFor="firstName">
                      First Name <span className="text-red-700">*</span>
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
                      name="firstName"
                      maxLength={30}
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700" htmlFor="lastName">
                      Last Name <span className="text-red-700">*</span>
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
                      name="lastName"
                      maxLength={30}
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
  <label className="block text-gray-700" htmlFor="gender">
    Gender <span className="text-red-700">*</span>
  </label>
  <select
    id="gender"
    className="mt-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black text-sm"
    name="gender"
    value={formData.gender}
    onChange={handleInputChange}
    required
  >
    <option value="" disabled>Select gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
    <option value="preferNotToSay">Prefer not to say</option>
  </select>
</div>
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div className="flex-1">
                    <label className="block text-gray-700" htmlFor="fatherName">
                      Father's Name <span className="text-red-700">*</span>
                    </label>
                    <Input
                      id="fatherName"
                      type="text"
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
                      name="fatherName"
                      maxLength={30}
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
  <label className="block text-gray-700" htmlFor="dob">
    Date of Birth <span className="text-red-700">*</span>
  </label>
  <input
    id="dob"
    type="date"
    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
    name="dob"
    value={formData.dob}
    onChange={handleInputChange}
    required
  />
</div>
                  <div className="flex-1">
                    <label className="block text-gray-700" htmlFor="voterIdNo">
                      Voter ID No <span className="text-red-700">*</span>
                    </label>
                    <Input
                      id="voterIdNo"
                      type="text"
                      maxLength={10}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
                      style={{ textTransform: 'uppercase' }}
                      name="voterIdNo"
                      value={formData.voterIdNo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="flex-1">
                <label className="block text-gray-700" htmlFor="state">
          State <span className="text-red-700">*</span>
        </label>
        <select
          id="state"
          name="state"
          value={formData.state}
          onChange={handleStateChange}
          className="mt-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
          required
        >
          <option value="" disabled>Select state</option>
          {Object.keys(indianStateWithCity).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
                  </div>

                  <div className="flex-1">
                  <label className="block text-gray-700" htmlFor="city">
          City <span className="text-red-700">*</span>
        </label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={handleCityChange}
          className="mt-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
          disabled={!formData.state} // Disable if no state is selected
          required
        >
          <option value="" disabled>Select city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
                  </div>

                  <div className="flex-1">
                <label className="block text-gray-700" htmlFor="profession">
          Profession <span className="text-red-700">*</span>
        </label>
        <select
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={handleInputChange}
          className="mt-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
          required
        >
          <option value="" disabled>Select state</option>
          {profession.map((profession, index) => (
            <option key={index} value={profession}>
              {profession}
            </option>
          ))}
        </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="flex-1">
                    <label className="block text-gray-700" htmlFor="phoneNo">
                      Phone <span className="text-red-700">*</span>
                    </label>
                    <Input
                      id="phoneNo"
                      type="text"
                      maxLength={10}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
                      name="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700" htmlFor="email">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
                      name="email"
                      maxLength={25}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>


                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="flex-1">
                    <label
                      className="block text-gray-700"
                      htmlFor="voterIdFront"
                    >
                      Voter ID Front <span className="text-red-700">*</span>
                    </label>
                    <Input
                      className="text-black h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      id="voterIdFront"
                      type="file"
                      accept="image/*,.pdf" 
                      name="voterIdFront"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      className="block text-gray-700"
                      htmlFor="voterIdBack"
                    >
                      Voter ID Back <span className="text-red-700">*</span>
                    </label>
                    <Input
                      id="voterIdBack"
                      className="text-black h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type="file"
                      accept="image/*,.pdf" 
                      name="voterIdBack"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled={registerFormSuccess}
                >
                  {!registerFormSuccess ? "Enroll Now" : "Processing..."}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div
          id="vision"
          className="relative py-28"
          style={{ background: "#D3E6E0" }}
        >
          <div>
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="lg:flex lg:items-center lg:justify-between">
                <div className="lg:w-1/2">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Our Vision
                  </h1>
                  <p className="mt-3 text-lg text-gray-600">
                    BPP’s vision is: "Empowering communities through
                    decentralized solutions while driving combined progress."
                  </p>
                  <p className="mt-3 text-lg text-gray-600">
                    Our vision is to create a society where local initiatives
                    prosper with autonomy and flexibility, yet contribute to a
                    progressive national impact. By understanding the strength
                    of localized efforts and aligning them with a central
                    mission,
                  </p>
                  <p className="mt-3 text-lg text-gray-600">
                    we strive to achieve sustainable development, peace, and
                    prosperity on the national level."
                  </p>
                </div>
                <div className="mt-10 lg:mt-0 lg:w-1/2 lg:pl-10">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      alt="bppflag"
                      src={bppflag}
                      className="h-full w-full object-cover object-center"
                      style={{ border: "1px solid" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="mission" className="container h-3/5">
          <div className="my-40">
            <h1 className="text-4xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
              Our Mission
            </h1>
            <p className="mt-3 text-lg  container text-gray-600">
              BPP's mission is: "Our mission is to empower individuals by
              leveraging a decentralized society, giving the common man a
              central role in shaping the nation.{" "}
            </p>

            <p className="mt-3 text-lg  container text-gray-600">
              We aim to create party's platform where educated representatives
              from different parts of the community can connect, share ideas,
              and collaborate on services. By ensuring decisions are made at the
              grassroots level, we support and drive the overall growth of the
              nation.
            </p>

            <p className="mt-3 text-lg  container text-gray-600">
              While planning and implementation are decentralized, we focus on
              achieving centralized outcomes and sustainable growth."
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}
