import React, { useState } from "react";
import { config } from "apiCalls/Configuration";
import { AiFillCloseCircle } from "react-icons/ai";

const VerifyEmail = ({ closeModel, email, handleSubmit }) => {
  // const [action, setAction] = useState("Sign Up");
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    const otpForm = new FormData();
    otpForm.append("otp", otp);
    otpForm.append("email", email);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/otp/verify-otp`,
      {
        method: "POST",
        body: otpForm,
      }
    );

    // Check if the response status is OK (200)
    if (response.status === 200) {
      handleSubmit();
      config.notify("Email Verified", "success");
    } else {
      console.log(response.status);
      config.notify("Incorrect otp", "error");
    }
    if (!response) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between mb-4">
          <div></div> {/* This empty div will push the button to the right */}
          <div className="flex">
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 ">
              Forgot Password
            </h1>
            <span
              type="button"
              className="text-black hover:text-gray-700 text-lg p-2 pl-4 cursor-pointer"
              onClick={closeModel}
            >
              <AiFillCloseCircle color="red" size={20} />{" "}
            </span>
          </div>
        </div>
        <div className="mb-4">
          An OTP has been sent to the provided email address.
        </div>
        <div className="flex mb-4">
          <input
            className="flex-1 bg-gray-100 rounded-l p-2 focus:outline-none"
            type="text"
            placeholder="Please enter your OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="bg-blue-500 rounded-r text-white px-4 hover:bg-blue-700 focus:outline-none"
            onClick={handleVerify}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
