"use client";
import React, { useState } from "react";
import { config } from "apiCalls/Configuration";
import VerifyEmail from "../verify-email/VerifyEmail";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegistrationForm({ formSwap }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    collegeName: "",
    collegeCode: "",
    aishe_id: "",
    aishe_id_part: "",
    collegeEmailID: "",
    conf_email: "",
    collegeMobileNo: "",
    password: "",
    accreditedcollege: "NO", // Assuming Yes is the default option
  });

  const [emailVerifyModal, setEmailVerifyModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const finalData = {
      collegeName: formData.collegeName,
      collegeCode: formData.collegeCode,
      collegeEmailID: formData.collegeEmailID,
      collegeMobileNo: formData.collegeMobileNo,
      accreditedcollege: formData.accreditedcollege,
      password: formData.password,
    };
    try {
      fetch(`${config.BASE_URL}/api/auth/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      }).then(
        (res) => {
          router.push("/login");
        },
        (err) => {
          config.notify("Something Went Wrong", "error");
          console.log(err);
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModel = () => {
    setEmailVerifyModal(false);
  };

  const openModal = () => {
    if (formData.collegeEmailID === formData.conf_email) {
      const otpForm = new FormData();
      otpForm.append("email", formData.collegeEmailID);
      const response = fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/otp/send-otp`,
        {
          method: "POST",
          body: otpForm,
        }
      )
        .then((resp) => {
          return resp.text();
        })
        .then((data) => {
          if (
            data === "Email Already Register" ||
            data === "Invalid email address"
          ) {
            window.alert(data);
            closeModel();
          }
        });
      if (!response) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      // Check if the response status is OK (200)
      if (response.status === 200 || response.status === 201) {
        console.log(response);
      }
      setEmailVerifyModal(true);
    } else {
      alert("Please enter same email");
    }
  };

  return (
    <div className="bg-white border border-cyan-600 items-center justify-center mt-6 p-6 shadow-[0_0_0_15px_rgba(0,0,0,0.4)] w-1/2">
      <h2 className="items-center text-2xl text-center text-[#3c8dbc] pb-2">
        Higher Education Institution(HEI)
      </h2>
      <h3 className="items-center text-xl text-center text-[#804952]">
        Registration for Assessment and Accreditation
      </h3>
      <form className="mt-6">
        {/* Name of the Institution */}
        <div className="mb-4 flex">
          <label
            htmlFor="collegeName"
            className="flex text-base items-center font-semibold text-gray-900 w-2/5"
          >
            Name of the Institution
          </label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-3/5 border-slate-500"
            placeholder="Enter name of the college"
            required
          />
        </div>

        {/* College Code */}
        <div className="mb-4 flex">
          <label
            htmlFor="collegeCode"
            className="flex text-base items-center font-semibold text-gray-900 w-2/5"
          >
            College Code
          </label>
          <input
            type="text"
            id="collegeCode"
            name="collegeCode"
            value={formData.collegeCode}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-3/5 border-slate-500"
            placeholder="Enter College Code"
            required
          />
        </div>

        {/* MHRD AISHE Id */}
        <div className="mb-4 flex">
          <label
            htmlFor="aishe_id"
            className="flex text-base items-center font-semibold text-gray-900 w-2/5"
          >
            MHRD AISHE Id
          </label>
          <div className="flex w-3/5">
            <select
              id="aishe_id"
              name="aishe_id"
              value={formData.aishe_id}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-1/5 mr-2 border-slate-500"
              required
            >
              <option value="">Select</option>
              <option value="U-">U-</option>
              <option value="C-">C-</option>
              <option value="S-">S-</option>
            </select>
            <input
              type="text"
              id="aishe_id_part"
              name="aishe_id_part"
              value={formData.aishe_id_part}
              onChange={handleInputChange}
              className="flex-grow mt-1 p-2 border rounded-md w-2/3 border-slate-500"
              placeholder="Enter AISHE Id"
              required
            />
          </div>
        </div>

        {/* Institution email Id */}
        <div className="mb-4 flex">
          <label
            htmlFor="collegeEmailID"
            className="flex text-base items-center font-semibold text-gray-900 w-2/5"
          >
            Institution Email Id
          </label>
          <input
            type="email"
            id="collegeEmailID"
            name="collegeEmailID"
            value={formData.collegeEmailID}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-3/5 border-slate-500"
            placeholder="Enter HEI email"
            required
          />
        </div>

        {/* Re-enter Institution email Id */}
        <div className="mb-4 flex">
          <label
            htmlFor="conf_email"
            className="flex text-base items-center font-semibold text-gray-900 w-2/5"
          >
            Re-enter Institution Email Id
          </label>
          <input
            type="email"
            id="conf_email"
            name="conf_email"
            value={formData.conf_email}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-3/5 border-slate-500"
            placeholder="Re-enter email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4 flex">
          <label
            htmlFor="password"
            className="flex text-base items-center font-semibold text-gray-900 w-2/5"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-3/5 border-slate-500"
            placeholder="Enter a secure password"
            required
          />
        </div>

        {/* Mobile number for communication */}
        <div className="mb-4 flex">
          <label
            htmlFor="collegeMobileNo"
            className="flex text-base items-center font-semibold text-gray-900 w-2/5"
          >
            Mobile number for communication
          </label>
          <input
            type="text"
            id="collegeMobileNo"
            name="collegeMobileNo"
            value={formData.collegeMobileNo}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-3/5 border-slate-500"
            pattern="[0-9]{10}"
            placeholder="Enter Mobile number"
            required
          />
        </div>

        {/* Are You previously Accredited */}
        <div className="mb-4 flex">
          <label className="flex text-base items-center font-semibold text-gray-900 w-2/5">
            Are You previously Accredited
          </label>
          <div className="flex">
            <label className="block mr-4">
              Yes
              <input
                type="radio"
                name="accreditedcollege"
                value="YES"
                checked={formData.accreditedcollege === "YES"}
                onChange={handleInputChange}
              />
            </label>
            <label className="block">
              No
              <input
                type="radio"
                name="accreditedcollege"
                value="NO"
                checked={formData.accreditedcollege === "NO"}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mb-4 flex flex-col">
          <label className="flex text-base items-center font-semibold text-gray-900 w-2/5">
            Terms and Conditions
          </label>
          <ul className="border border-solid border-slate-400 p-4 pl-12 mt-4 list-disc">
            <li className="text-sm">
              Visit NAAC website{" "}
              <a
                href="http://www.naac.gov.in"
                target="_blank"
                className="text-blue-600"
              >
                www.naac.gov.in
              </a>{" "}
              for Eligibility Criteria, Fee structure, Grading pattern etc.
            </li>
            <li className="text-sm">
              Provide official institutional e-mail id’s and contact numbers
              only. All future communications from NAAC shall be done with this
              e-mail id’s and contact numbers.
            </li>
            <li className="text-sm">
              Registration does not imply institutional eligibility for
              assessment.
            </li>
          </ul>
        </div>
      </form>
      <div className="flex justify-end items-center">
        <button
          onClick={openModal}
          className="mr-4 bg-blue-500 py-1 px-6 rounded-lg"
        >
          Submit
        </button>

        <button className="mr-4 bg-blue-500 py-1 px-6 rounded-lg">
          <Link href={"/login"}>Cancel</Link>
        </button>
      </div>
      {emailVerifyModal && (
        <VerifyEmail
          closeModel={closeModel}
          email={formData.collegeEmailID}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
