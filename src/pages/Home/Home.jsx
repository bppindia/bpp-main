"use client";
import { useState } from "react";
import "@/App.css";
import Layout from "@/layout/Layout";
import bppflag from "@/assets/bppflag.png";
import axios from "axios";
import { getURLbyEndPointV1 } from "@/api";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { indianStateWithCity, professions } from "@/data/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const [ApiRecomFlag, setApiRecomFlag] = useState(false);
  const [cities, setCities] = useState([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    fatherName: "",
    dob: "",
    voterIdNo: "",
    state: "",
    city: "",
    district: "",
    profession: "",
    email: "",
    phoneNo: "",
    voterIdFront: null,
    voterIdBack: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [field]: value,
      };

      // Add validation for DOB to ensure user is at least 18 years old
      if (field === "dob") {
        const dob = value.trim();
        if (dob !== "") {
          const dobDate = new Date(dob);
          const today = new Date();

          // Calculate age
          let age = today.getFullYear() - dobDate.getFullYear();
          const monthDifference = today.getMonth() - dobDate.getMonth();
          const dayDifference = today.getDate() - dobDate.getDate();

          // Calculate adjusted age
          if (
            monthDifference < 0 ||
            (monthDifference === 0 && dayDifference < 0)
          ) {
            age--; // Adjust age if birthday hasn't occurred yet this year
          }

          // If age is less than 18, set an error message
          if (age < 18) {
            console.error("You must be at least 18 years old.");
            alert("You must be at least 18 years old.");
            return prevData; // Return previous data to avoid updating with invalid DOB
          }
        }
      }

      return updatedData;
    });
  };

  const handleProfessionChange = (e) => {
    const selectedProfession = e.target.value;
    if (selectedProfession === "Other") {
      setIsOtherSelected(true);
      setFormData((prevData) => ({
        ...prevData,
        profession: "", // Clear the profession field to show the input box as empty
      }));
    } else {
      setIsOtherSelected(false);
      setFormData((prevData) => ({
        ...prevData,
        profession: selectedProfession, // Update the profession with the selected value
      }));
    }
  };

  const handleFileUpload = (field, file) => {
    // You can set the size limit here if needed
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB

    if (file.size <= MAX_SIZE) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: file,
      }));
    } else {
      console.error("File size exceeds 5MB");
      alert("File size exceeds 5MB");
    }
  };

  // const handleStateChange = (e) => {
  //   const selectedState = e.target.value;
  //   setFormData({
  //     ...formData,
  //     state: selectedState,
  //     city: "",
  //   });
  //   setCities(indianStateWithCity[selectedState] || []);
  // };

  // const handleCityChange = (e) => {
  //   const selectedCity = e.target.value;
  //   setFormData({
  //     ...formData,
  //     city: selectedCity,
  //   });
  // };

  const handleFormSubmit = async (e) => {
    setApiRecomFlag(true);
    e.preventDefault();
    console.log(formData);

    const validationRules = {
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
      // dob: {
      //   message: "Please enter your date of birth.",
      //   isValid: () => formData.dob.trim() !== "",
      // },
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
      district: {
        message: "Please Enter Your district",
        isValid: () => formData.district.trim() !== "",
      },
      // city: {
      //   message: "Please select your city",
      //   isValid: () => formData.city.trim() !== "",
      // },
      // email: {
      //   message: "Please enter a valid email address",
      //   isValid: () => {
      //     const email = formData.email.trim();
      //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      //     return email !== "" && emailPattern.test(email);
      //   },
      // },
      // phoneNo: {
      //   message: "Please enter a valid phone number.",
      //   isValid: () => {
      //     const phoneNo = formData.phoneNo.trim();
      //     const phonePattern = /^\d{10}$/;
      //     return phoneNo !== "" && phonePattern.test(phoneNo);
      //   },
      // },
      voterIdNo: {
        message: "Please enter a valid voter ID number.",
        isValid: () => /^([a-zA-Z]){3}([0-9]){7}$/.test(formData.voterIdNo),
      },
      voterIdFront: {
        message: "Please Upload voter id Front.",
        isValid: () => formData.voterIdFront !== null,
      },
      voterIdBack: {
        message: "Please Upload voter id Back.",
        isValid: () => formData.voterIdBack !== null,
      },
    };

    // Loop through each field and validate
    for (const field in validationRules) {
      const { message, isValid } = validationRules[field];
      if (!isValid()) {
        alert(message);
        return;
      }
    }

    try {
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
      apiFormData.append("district", formData.district);
      apiFormData.append("voterIdFront", formData.voterIdFront);
      apiFormData.append("voterIdBack", formData.voterIdBack);

      const res = await axios.post(
        getURLbyEndPointV1("createBppMember"),
        apiFormData
      );

      if (res.data.status) {
        alert(res.data.message);
        setTableFlag(true);
        setFormFlag(false);
        setApiRecomFlag(false);
        window.location.reload();
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        alert(e.response.data.message);
      } else {
        console.error("Server is not responding");
      }
    } finally {
      setApiRecomFlag(false);
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
              Objectives: BPP works on the concept of mass-connectivity. Our objective is to
create connectivity among people at different levels of society and empower
every individual by offering a transparent, and accessible way to contribute to
the shaping of policies and decisions that impact our society.
The Party intends to create an environment where every citizen has a voice,
where transparency is the norm, and where decision-making is a collective
process. The Party is aimed to ensure that all voices are heard, and all
perspectives are considered.
              </h2>
              <div className="mt-4">
              <button
                  className="w-2/6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"

                  onClick={()=> navigate("/why-bpp")}
                >
                 Learn More
                </button>
              </div>
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
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      required
                    />
                  </div>

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
                      onChange={(e) =>
                        handleInputChange("fatherName", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div className="flex-1">
                    <label className="block text-gray-700" htmlFor="gender">
                      Gender <span className="text-red-700">*</span>
                    </label>
                    <select
                      id="gender"
                      className="mt-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black text-sm"
                      name="gender"
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      required
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="preferNotToSay">Prefer not to say</option>
                    </select>
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
                      onChange={(e) => handleInputChange("dob", e.target.value)}
                      // required
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
                      style={{ textTransform: "uppercase" }}
                      name="voterIdNo"
                      value={formData.voterIdNo}
                      onChange={(e) =>
                        handleInputChange("voterIdNo", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div className="flex-1">
                    <label className="block text-gray-700" htmlFor="city">
                      Taluka/village/city{" "}
                      <span className="text-red-700">*</span>
                    </label>
                    <Input
                      id="city"
                      type="text"
                      maxLength={40}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
                      name="city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-gray-700" htmlFor="district">
                      District <span className="text-red-700">*</span>
                    </label>
                    <Input
                      id="district"
                      type="text"
                      maxLength={40}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
                      name="district"
                      value={formData.district}
                      onChange={(e) =>
                        handleInputChange("district", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-gray-700" htmlFor="state">
                      State <span className="text-red-700">*</span>
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      // onChange={handleInputChange}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      // onChange={handleStateChange}
                      className="mt-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
                      required
                    >
                      <option value="" disabled>
                        Select state
                      </option>
                      {Object.keys(indianStateWithCity).map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* <div className="flex-1">
                    <label className="block text-gray-700" htmlFor="city">
                      City / Village <span className="text-red-700">*</span>
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
                      <option value="" disabled>
                        Select city
                      </option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div> */}

                  {/* <div className="flex-1">
                    <label className="block text-gray-700" htmlFor="profession">
                      Profession <span className="text-red-700">*</span>
                    </label>
                    <select
                      id="profession"
                      name="profession"
                      value={formData.profession}
                      onChange={(e) =>
                        handleInputChange("profession", e.target.value)
                      }
                      className="mt-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
                      required
                    >
                      <option value="" disabled>
                        Select state
                      </option>
                      {profession.map((profession, index) => (
                        <option key={index} value={profession}>
                          {profession}
                        </option>
                      ))}
                    </select>
                  </div> */}
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div className="flex-1">
                    <label className="block text-gray-700" htmlFor="profession">
                      Profession <span className="text-red-700">*</span>
                    </label>

                    {isOtherSelected ? (
                      <input
                        type="text"
                        id="profession"
                        name="profession"
                        value={formData.profession}
                        onChange={(e) =>
                          handleInputChange("profession", e.target.value)
                        }
                        className="mt-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
                        placeholder="Enter your profession"
                        // required
                      />
                    ) : (
                      <select
                        id="profession"
                        name="profession"
                        value={formData.profession}
                        onChange={handleProfessionChange}
                        className="mt-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 h-8 lg:h-10 focus:ring-indigo-500 text-black"
                        // required
                      >
                        <option value="" disabled>
                          Select profession
                        </option>
                        {professions.map((profession, index) => (
                          <option key={index} value={profession}>
                            {profession}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
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
                      onChange={(e) =>
                        handleInputChange("phoneNo", e.target.value)
                      }
                      // required
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
                      maxLength={40}
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleFileUpload("voterIdFront", e.target.files[0])
                      }
                      required
                    />
                    <p className="text-xs text-red-600">
                      File size exceeds the 5MB limit
                    </p>
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
                      onChange={(e) =>
                        handleFileUpload("voterIdBack", e.target.files[0])
                      }
                      required
                    />
                    <p className="text-xs text-red-600">
                      File size exceeds the 5MB limit
                    </p>
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
                  disabled={ApiRecomFlag}
                >
                  {ApiRecomFlag ? "Processing..." : "Enroll Now"}
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
