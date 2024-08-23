"use client";
import { useState } from "react";
import Layout from "../layout/Layout";

export function HomePage() {
  const [activePage, setActivePage] = useState("homePage");
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

      const res = await axios.post(getURLbyEndPointV2("createBppMember"), {
        ...formData,
      });

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
      <div>
        <div className="relative mx-auto px-6 pt-14 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden sm:-top-80"
          >
            <div className="relative-bg" />
          </div>
          {activePage === "homePage" ? (
            <div className="mx-auto max-w-2xl h-screen max-h-screen py-56 sm:py-48 lg:py-52">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Decentralized Democracy, Centralized Progress
                </h1>
                {/* <p className="mt-6 text-lg leading-8 text-white">
                  Objective: Strengthen the people of India and local
                  institutions to ensure that decisions are made with the
                  involvement of the people they affect
                </p> */}
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:
               outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setActivePage("nextPage")}
                  >
                    Enroll Now
                  </a>
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-white"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          ) : activePage === "nextPage" ? (
            <div className="mx-auto max-w-2xl h-screen max-h-screen py-20 sm:py-24 lg:py-40">
              <div className="text-center mx-auto">
                <form onSubmit={handleFormSubmit} className="mt-6">
                  <div className="flex  flex-col space-y-4">
                    <div className="grid w-full gap-y-4 md:gap-x-4 gap-2 grid-cols-2">
                      <div className="grid w-full items-center gap-1.5">
                        <label
                          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                          htmlFor="first_name"
                        >
                          First Name *
                        </label>
                        <input
                          className="flex w-full rounded-md border border-white bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                          htmlFor="last_name"
                        >
                          Last Name *
                        </label>
                        <input
                          className="flex w-full rounded-md border border-white bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                    <div className="grid w-full gap-y-4 md:gap-x-4 gap-2 grid-cols-2">
                      <div className="grid w-full items-center gap-1.5">
                        <label
                          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                          htmlFor="father_name"
                        >
                          Father's Name *
                        </label>
                        <input
                          className="flex w-full rounded-md border border-white bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                          htmlFor="voter_number"
                        >
                          Voter ID No *
                        </label>
                        <input
                          className="flex w-full rounded-md border border-white bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                    <div className="grid w-full gap-y-4 md:gap-x-4 gap-2 grid-cols-2">
                      <div className="grid w-full items-center gap-1.5">
                        <label
                          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className="flex w-full rounded-md border border-white bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                          htmlFor="phone_number"
                        >
                          Phone No *
                        </label>
                        <input
                          className="flex w-full rounded-md border border-white bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                    <div className="grid w-full gap-y-4 md:gap-x-4 gap-2 grid-cols-2">
                      <div className="grid w-full items-center gap-1.5">
                        <label
                          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                          htmlFor="address"
                        >
                          Address mentioned on Voter ID *
                        </label>
                        <input
                          className="flex w-full rounded-md border border-white bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                          htmlFor="assemblyId"
                        >
                          Assembly Constituency
                        </label>
                        <input
                          className="flex w-full rounded-md border border-white bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                    <div className="grid w-full gap-y-4 md:gap-x-4 gap-2 grid-cols-2">
                      <div className="grid w-full items-center gap-1.5">
                        <label
                          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                          htmlFor="voter_id_front"
                        >
                          Voter ID Front
                        </label>
                        <input
                          className="flex w-full rounded-md border border-white bg-transparent px-3 py-2 text-sm text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                          className="text-sm font-medium leading-none text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                          htmlFor="voter_id_back"
                        >
                          Voter ID Back
                        </label>
                        <input
                          className="flex w-full rounded-md border border-white bg-transparent px-3 py-2 text-sm text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={registerFormSuccess}
                    >
                      {!registerFormSuccess ? "Enroll Now" : "Processing..."}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : null}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div />
          </div>
        </div>
      </div>
    </Layout>
  );
}
