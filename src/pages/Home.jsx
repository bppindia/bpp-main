'use client'
import React, { useState } from 'react'
import  Layout  from '../layout/Layout'
import { getURLbyEndPointV2 } from '../api';
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
    <div>
      <Layout>
      <div className="relative relative-bg">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col justify-center px-4 py-10 lg:px-6">
            <h1 className="mt-8 max-w-4xl text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-6xl">
            Empowering Communities Through Decentralization
            </h1>
            <p className="mt-8 max-w-3xl text-2xl text-white text-bolder">
            Objective: Strengthen the people of India and local institutions
to ensure that decisions are made with the involvement of the people they
affect
            </p>
           
          </div>
          <div className="rounded-lg p-4 blurred-container">
          <div >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full md:w-1/3 lg:w-1/2">
            <h2 className="text-3xl font-bold text-dark">Enroll Now</h2>
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
            className="flex w-full rounded-md border border-white/30 bg-white px-3 py-2 text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="flex w-full rounded-md border border-white/30 bg-white px-3 py-2 text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="flex w-full rounded-md border border-white/30 bg-white px-3 py-2 text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="flex w-full rounded-md border border-white/30 bg-white px-3 py-2 text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="flex w-full rounded-md border border-white/30 bg-white px-3 py-2 text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="flex w-full rounded-md border border-white/30 bg-white px-3 py-2 text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="flex w-full rounded-md border border-white/30 bg-white px-3 py-2 text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="flex w-full rounded-md border border-white/30 bg-white px-3 py-2 text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="flex w-full rounded-md border border-white/30 bg-white px-3 py-2 text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-gray-700 file:placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
            type="file"
            id="voter_id_front"
            accept=".jpg,.jpeg,.png,.pdf"
            name="voterIdFront"
            onChange={(e) =>
              handleFileUpload(
                "voterIdFront",
                e.target.files[0]
              )
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
            className="flex w-full rounded-md border border-white/30 bg-white px-3 py-2 text-sm placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-gray-700 file:placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
            type="file"
            id="voter_id_back"
            accept=".jpg,.jpeg,.png,.pdf"
            name="voterIdBack"
            onChange={(e) =>
              handleFileUpload(
                "voterIdBack",
                e.target.files[0]
              )
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
            <p className="mt-2">
              <span className="text-sm text-dark-600">
                By Enroll, you agree to our terms of service and privacy policy.
              </span>
            </p>
          </div>
          <div className="mt-10 w-full md:w-2/3 lg:mt-0 lg:w-1/2">
            <img
              className="h-full w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1541560052-77ec1bbc09f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG5ld3NsZXR0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
              alt="Newsletter"
            />
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>
      </Layout>
    </div>
  )
}
