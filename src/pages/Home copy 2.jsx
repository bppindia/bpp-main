'use client'

import { CheckCircle, ChevronDown, ChevronUp, Menu, Star, X } from 'lucide-react'
import React, { useState } from 'react'
import  Layout  from '../layout/Layout'
import { getURLbyEndPointV2 } from '../api';
import homepagebanner from '../../public/homepagebanner.png'
import toast from "react-hot-toast";
import axios from 'axios'


export function HomePage() {
  const [registerFormSuccess, setRegisterFormSuccess] = useState(false);

  const initialFormData = {
    firstName: "",
    lastName: "",
    fatherName: "",
    voterIdNo: "",
    email: "",
    phoneNo: "",
    address: "",
    assemblyID: "",
    voterIdFront: null,
    voterIdBack: null,
    userMessage: "",
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
      console.error("File should be JPG, JPEG, PNG, or PDF and size should not exceed 5MB");
      alert("File should be JPG, JPEG, PNG, or PDF and size should not exceed 5MB");
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

    console.log(formData)
      // Validate common fields
      if (!validateField(formData.firstName, "first name")) return;
      if (!validateField(formData.lastName, "last name")) return;
      if (!validateField(formData.fatherName, "father's Name")) return;
      if (!validateField(formData.voterIdNo, "voter id")) return;
      if (!validateField(formData.email, "email")) return;
      if (!validateField(formData.address, "address")) return;
      if (!validateField(formData.assemblyID, "assembly id")) return;
      if (
        !validateField(
          formData.phoneNo.toString(),
          "Phone No.",
          /^(?:\d{10,15})$/
        )
      )
        return;


      const res = await axios.post(
        getURLbyEndPointV2("createBppMember"),
        {
          ...formData,
        }
      );

      if (res && res.data && res.data.status) {
        toast.success(res.data.message);
        setFormSuccessful(true);
        setRegisterFormSuccess(false);
        setFormData(initialFormData);
      } else {
        console.log("Response data:", res);
        toast.error(res?.data?.message || "An error occurred");
      }
    } catch (e) {
      console.log("Error caught:", e);
      toast.error(e?.response?.data?.message || "An error occurred");
    } finally {
      setRegisterFormSuccess(false);
    }
  };
  return (
   <Layout>
      {/* Hero Section */}
      <div className="relative w-full bg-white" id='enroll'>
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="flex flex-col justify-center px-4 py-8 md:py-8 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-10 xl:col-span-6">
            <h1 className="text-4xl font-bold tracking-tight text-black md:text-4xl lg:text-4xl">
            Decentralized Democracy, Centralized Progress
            </h1>
            <p className="mt-8 text-lg text-gray-700">
            Objective: Strengthen the people of India and local institutions to ensure that decisions are made with the involvement of the people they affect
            </p>
          <div>
             
          <form onSubmit={handleFormSubmit} className="mt-6">
  <div className="flex w-11/12 flex-col space-y-4">
    <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
      <div className="grid w-full items-center gap-1.5">
        <label
          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="first_name"
        >
          First Name *
        </label>
        <input
              className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          id="first_name"
          placeholder="First Name"
          name="firstName"
          onChange={handleInputChange}
          value={formData.firstName}
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label
          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="last_name"
        >
          Last Name *
        </label>
        <input
            className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          id="last_name"
          placeholder="Last Name"
          name="lastName"
          onChange={handleInputChange}
          value={formData.lastName}
          required
        />
      </div>
    </div>
    <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
      <div className="grid w-full items-center gap-1.5">
        <label
          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="father_name"
        >
          Father's Name *
        </label>
        <input
             className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          id="father_name"
          placeholder="Father's Name"
          name="fatherName"
          onChange={handleInputChange}
          value={formData.fatherName}
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label
          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="voter_number"
        >
          Voter ID No *
        </label>
        <input
              className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          id="voter_number"
          placeholder="Voter ID"
          name="voterIdNo"
          onChange={handleInputChange}
          value={formData.voterIdNo}
          required
        />
      </div>
    </div>
    <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
      <div className="grid w-full items-center gap-1.5">
        <label
          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="email"
        >
          Email
        </label>
        <input
              className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="email"
          id="email"
          placeholder="Enter your email"
          name="email"
          onChange={handleInputChange}
          value={formData.email}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label
          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="phone_number"
        >
          Phone No *
        </label>
        <input
             className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          id="phone_number"
          placeholder="Enter your number"
          name="phoneNo"
          onChange={handleInputChange}
          value={formData.phoneNo}
          required
        />
      </div>
    </div>
    <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-1">
      <div className="grid w-full items-center gap-1.5">
        <label
          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="address"
        >
          Address mentioned on Voter ID *
        </label>
        <input
             className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          id="address"
          placeholder="Enter your address"
          name="address"
          onChange={handleInputChange}
          value={formData.address}
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label
          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="assemblyId"
        >
          Assembly Constituency
        </label>
        <input
             className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          id="assemblyId"
          placeholder="Enter Assembly Constituency mentioned on Voter ID"
          name="assemblyID"
          onChange={handleInputChange}
          value={formData.assemblyID}
          required
        />
      </div>
    </div>
    <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
      <div className="grid w-full items-center gap-1.5">
        <label
          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="voter_id_front"
        >
          Voter ID Front
        </label>
        <input
           className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="file"
          id="voter_id_front"
          accept=".jpg,.jpeg,.png,.pdf"
          name="voterIdFront"
          onChange={(e) =>
            handleFileUpload("voterIdFront", e.target.files[0])
          }
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label
          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="voter_id_back"
        >
          Voter ID Back
        </label>
        <input
            className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="file"
          id="voter_id_back"
          accept=".jpg,.jpeg,.png,.pdf"
          name="voterIdBack"
          onChange={(e) =>
            handleFileUpload("voterIdBack", e.target.files[0])
          }
        />
      </div>
    </div>
    <button
      type="submit"
      className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      disabled={registerFormSuccess}
    >
      {!registerFormSuccess ? "Enroll Now" : "Processing..."}
    </button>
  </div>
</form>

              </div>
            
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
            <img
              className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[750px] xl:aspect-[16/9]"
              src={homepagebanner}
              alt=""
            />
          </div>
        </div>
      </div>



      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Our Vision</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
          BPP’s vision is: "Empowering communities through
decentralized solutions while driving combined progress. Our vision is to create
a society where local initiatives prosper with autonomy and flexibility, yet
contribute to a progressive national impact. By understanding the strength of
localized efforts and aligning them with a central mission, we strive to achieve
sustainable development, peace, and prosperity on national level."
          </p>
        </div>
        </div>
        </div>
      <section className="mx-auto max-w-full bg-gray-50 px-2 py-10 md:px-0"  id="mission">
        <div>
          <div className="mx-auto max-w-full lg:text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Our Mission
            </h2>
            <p className="mt-4 max-w-6xl text-base leading-relaxed text-gray-600 lg:mx-auto">
            BPP's mission is: "Our mission is to empower individuals by leveraging a decentralized society, giving the common man a central role in shaping the nation. We aim to create party's platform where educated representatives from different parts of the community can connect, share ideas, and collaborate on services. By ensuring decisions are made at the grassroots level, we support and drive the overall growth of the nation. While planning and implementation are decentralized, we focus on achieving centralized outcomes and sustainable growth."
            </p>
          </div>
        </div>
      </section>

    </Layout>
  )
}
