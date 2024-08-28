"use client";
import { useState } from "react";
import Layout from "../layout/Layout";
import { Input } from "@/components/ui/input";
import bpplogo from '../assets/bpplogoo.png';
import { ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";
import bppflag from "../assets/bppflag.png"
import axios from "axios";
import { getURLbyEndPointV2 } from "@/api";
import { Checkbox } from "@/components/ui/checkbox"
import '../App.css'

export function HomePage() {
  const [registerFormSuccess, setRegisterFormSuccess] = useState(false);
  const [formSuccessful, setFormSuccessful] = useState(false);

  const initialFormData = {
    firstName: "",
    lastName: "",
    fatherName: "",
    voterIdNo: "",
    phoneNo: "",
    email: "",
    voterIdFront: null,
    voterIdBack: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileUpload = (field, file) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (allowedTypes.includes(file.type) && file.size <= maxSize) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: file,
      }));
    } else {
      console.error(
        "File should be JPG, JPEG, PNG, or PDF and size should not exceed 5MB"
      );
      alert(
        "File should be JPG, JPEG, PNG, or PDF and size should not exceed 5MB"
      );
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setRegisterFormSuccess(true);
    try {
      formData.phoneNo = parseInt(formData.phoneNo);

      const validateField = (field, fieldName, regex) => {
        if (
          field === undefined ||
          (typeof field === "string" && field.trim() === "")
        ) {
          console.log("Invalid Form, field:", field);
          alert(`Invalid Form, ${fieldName} can not be empty`);
          return false;
        }
        if (regex && !regex.test(field)) {
          console.log("Invalid Form, field:", field);
          alert(`Invalid Form, ${fieldName} is not in the correct format`);
          return false;
        }

        return true;
      };

      console.log(formData);
      // Validate common fields
      if (!validateField(formData.firstName, "first name")) return;
      if (!validateField(formData.lastName, "last name")) return;
      if (!validateField(formData.fatherName, "father's Name")) return;
      if (!validateField(formData.voterIdNo, "voter id")) return;
      if (!validateField(formData.email, "email")) return;
      if (
        !validateField(
          formData.phoneNo.toString(),
          "Phone No.",
          /^(?:\d{10,15})$/
        )
      )
        return;

      const res = await axios.post(getURLbyEndPointV2("createBppMember"), {
        ...formData,
      });

      if (res && res.data && res.data.status) {
        toast.success(res.data.message);
        setFormSuccessful(true);
        setRegisterFormSuccess(false);
        setFormData(initialFormData);
        alert("Thank You for Your request")
      } else {
        console.log("Response data:", res);
        toast.error(res?.data?.message || "An error occurred");
        alert("Thank You for Your request")
      }
    } catch (e) {
      console.log("Error caught:", e);
      toast.error(e?.response?.data?.message || "An error occurred");
    } finally {
      setRegisterFormSuccess(false);
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
      <div className="relative container z-10 flex flex-col items-center justify-center content-center lg:flex-row h-full text-white p-8">
        <div className="flex-1 container content-center">
          <div className="flex gap-2 content-center items-center">
          <img src={bpplogo} className="w-20 lg:w-32"/>
          <h1 className="text-xl lg:text-4xl raleway">
            {" "}
            Decentralized Democracy, Centralized Progress
          </h1>
          </div>
          <h2 className="text-lg mt-4 font-semibold poppins-semibold">
            Objective: Strengthen the people of India and local institutions to
            ensure that decisions are made with the involvement of the people
            they affect
          </h2>
        </div>
        <div className="mt-10 container bg-white rounded-lg p-8 max-w-xl w-full shadow-lg flex-shrink-0">
          <h3 className="text-2xl font-bold text-gray-800 roboto-medium">Enroll Now</h3>
          <h6 className="text-sm font-semibold lato-thin  text-gray-600 mb-4">Fill all the details as per Voter Id <span className="text-red-700">*</span></h6>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="flex flex-row space-x-4 lg:flex-row lg:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700" htmlFor="firstName">
                  First Name  <span className="text-red-700">*</span>
                </label>
                <Input
                  id="firstName"
                  type="text"
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700" htmlFor="lastName">
                  Last Name  <span className="text-red-700">*</span>
                </label>
                <Input
                  id="lastName"
                  type="text"
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-row space-x-4 lg:flex-row lg:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700" htmlFor="fatherName">
                  Father's Name  <span className="text-red-700">*</span>
                </label>
                <Input
                  id="fatherName"
                  type="text"
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700" htmlFor="voterIdNo">
                  Voter ID No  <span className="text-red-700">*</span>
                </label>
                <Input
                  id="voterIdNo"
                  type="text"
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  name="voterIdNo"
                  value={formData.voterIdNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-row space-x-4 lg:flex-row lg:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700" htmlFor="phoneNo">
                  Phone  <span className="text-red-700">*</span>
                </label>
                <Input
                  id="phoneNo"
                  type="text"
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700" htmlFor="email">
                  Email  <span className="text-red-700">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-row space-x-4 lg:flex-row lg:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700" htmlFor="voterIdFront">
                  Voter ID Front  <span className="text-red-700">*</span>
                </label>
                <Input
                 className="text-black"
                  id="voterIdFront"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  name="voterIdFront"
                  onChange={(e) =>
                    handleFileUpload("voterIdFront", e.target.files[0])
                  }
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700" htmlFor="voterIdBack">
                  Voter ID Back  <span className="text-red-700">*</span>
                </label>
                <Input
                  id="voterIdBack"
                  className="text-black"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  name="voterIdBack"
                  onChange={(e) =>
                    handleFileUpload("voterIdBack", e.target.files[0])
                  }
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
      <Checkbox id="terms" required />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black"
      >
        I agree to the{' '}
        <a href="#" className="text-blue-600 hover:underline">
          Terms and Conditions
        </a>{' '}
        and{' '}
        <a href="#" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>.
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
  
            <div id="vision" className="relative py-28" style={{background: "#D3E6E0"}}>
  <div>
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Our Vision
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            BPP’s vision is: "Empowering communities through decentralized solutions while driving combined progress."
          </p>
          <p className="mt-3 text-lg text-gray-600">
            Our vision is to create a society where local initiatives prosper with autonomy and flexibility, yet contribute to a progressive national impact. By understanding the strength of localized efforts and aligning them with a central mission,
          </p>
          <p className="mt-3 text-lg text-gray-600">
            we strive to achieve sustainable development, peace, and prosperity on the national level."
          </p>
        </div>
        <div className="mt-10 lg:mt-0 lg:w-1/2 lg:pl-10">
          <div className="relative overflow-hidden rounded-lg">
            <img
              alt="bppflag"
              src={bppflag}
              className="h-full w-full object-cover object-center"
              style={{border: "1px solid"}}
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
            BPP's mission is: "Our mission is to empower individuals by leveraging a decentralized society, giving the common man a central role in shaping the nation. </p>
            
            <p className="mt-3 text-lg  container text-gray-600">We aim to create party's platform where educated representatives from different parts of the community can connect, share ideas, and collaborate on services. By ensuring decisions are made at the grassroots level, we support and drive the overall growth of the nation. 
            </p>
              
            <p className="mt-3 text-lg  container text-gray-600">While planning and implementation are decentralized, we focus on achieving centralized outcomes and sustainable growth."
            </p>
            </div>
            </div>
    </Layout>
    </>
  );
}
