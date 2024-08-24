"use client";
import { useState } from "react";
import Layout from "../layout/Layout";
import { Input } from "@/components/ui/input";
import bppmic from '../assets/bppmic.png';
import bpplogo from '../assets/bpplogo.png';
import { ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";
import bppflag from "../assets/bppflag.png"
import axios from "axios";
import { getURLbyEndPointV2 } from "@/api";

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
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/homepagebanner.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container z-10 flex flex-col lg:flex-row items-center h-full text-white p-8">
        <div className="flex-1 content-center">
          <div className="flex gap-2 content-center items-center">
          <img src={bpplogo} width={130}/>
          <h1 className="text-3xl lg:text-4xl font-bold">
            {" "}
            Decentralized Democracy, Centralized Progress
          </h1>
          </div>
          <h2 className="text-lg mt-4 font-semibold">
            Objective: Strengthen the people of India and local institutions to
            ensure that decisions are made with the involvement of the people
            they affect
          </h2>
        </div>
        <div className="mt-10 bg-white rounded-lg p-8 max-w-xl w-full shadow-lg flex-shrink-0">
          <h3 className="text-2xl font-bold text-gray-800">Enroll Now</h3>
          <h6 className="text-sm font-semibold text-gray-600 mb-4">Fill all the details as per Voter Id *</h6>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="flex flex-row space-x-4 lg:flex-row lg:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700" htmlFor="firstName">
                  First Name
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
                  Last Name
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
                  Father's Name
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
                  Voter ID No
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
                  Phone
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
                  Email
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
                  Voter ID Front
                </label>
                <Input
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
                <label className="block text-gray-700" htmlFor="voterIdFront">
                  Voter ID Back
                </label>
                <Input
                  id="voterIdFront"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  name="voterIdFront"
                  onChange={(e) =>
                    handleFileUpload("voterIdFront", e.target.files[0])
                  }
                />
              </div>
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
  
            <div className="relative py-28" style={{background: "#D3E6E0"}}>
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
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="container h-3/5">
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

    <footer className="w-full bg-slate-900 pb-8 pt-12 md:mt-16 border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-start space-x-8 md:flex-row">
          <div className="w-full px-6 md:w-1/2 lg:px-0">
            <h1 className="max-w-sm text-3xl text-white font-bold">Subscribe to our Newsletter</h1>
            <form action="" className="mt-4 inline-flex w-full items-center md:w-3/4">
            <input
  className="flex h-10 w-full rounded-md border border-white/60 bg-transparent px-3 py-2 text-sm placeholder-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white"
  type="email"
  placeholder="Email"
/>

              <button
                type="button"
                className="ml-4 rounded-full bg-white px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={()=> alert("thank you for subscribe!")}
              >
                <ChevronRight className="h-4 w-4 text-black" />
              </button>
            </form>
          </div>
          <div className="mt-8 grid w-4/5 gap-6 md:mt-0 lg:w-3/4 ">
          <p className="mb-6 text-lg font-semibold text-white">Please be advised that Bharatiya Popular Party does not hold any official accounts on social media platforms.
          </p>
          <p className="mb-6 text-lg font-semibold text-white" >

Our organization is not present on any social media network, including but not limited to Facebook, Twitter, Instagram, LinkedIn, and others. Reporting Unauthorized Accounts

          </p>
          <p className="mb-6 text-lg font-semibold text-white">
If you encounter any social media accounts or profiles that claim to represent Bhartiya Popular Party or use our name, logo, or any other intellectual property, please notify us immediately. These accounts are unauthorized and not affiliated with our organization. To report any such accounts, please contact us through email.</p>
          
          </div>
        </div>
        <hr className="my-8" />
        <div className="mx-auto max-w-6xl items-center justify-between px-4 md:flex lg:px-0">
        <div>
            <a
              href="/"
            className="flex gap-3 font-bold text-black-700 items-center"
            >
             <img src={bppmic} width={25} height={25}/>
              <span className='poppins-regular text-white font-black text-md lg:text-xl'>BHARATIYA POPULAR PARTY</span>
            </a>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm font-medium text-gray-500">© 2024 Bharatiya Popular Party. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </Layout>
    </>
  );
}
