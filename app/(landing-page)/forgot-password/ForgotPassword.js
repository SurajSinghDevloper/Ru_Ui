"use client";
import React, { useState } from "react";
import { config } from "apiCalls/Configuration";
import { AiFillCloseCircle } from "react-icons/ai";
import CountdownTimer from "./CountdownTimer";
import Link from "next/link";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [otpProcessing, setOtpProcessing] = useState(false);
  const [otpStatus, setOtpStatus] = useState(false);
  const [invalidOtp, setInvalidOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [shortEmail, setShortEmail] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(null);

  const sendOtp = async () => {
    const isValid = isEmailValid(email);
    if (!isValid) {
      setIsValidEmail(false);
      return;
    }

    const otpForm = new FormData();
    otpForm.append("email", email);
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/otp/repas`, {
      method: "POST",
      body: otpForm,
    })
      .then((response) => {
        if (response.ok) {
          setOtpProcessing(false);
          setOtpStatus(true);
          const [username, domain] = email.split("@");
          const len = username.length;
          const maskedUsername =
            username.charAt(0) + "*****" + username.charAt(len - 1);
          setShortEmail(`${maskedUsername}@${domain}`);
        }
        if (!response.ok) {
          setOtpProcessing(false);
        }
        return response.text();
      })
      .then((responseText) => {
        if (responseText === "Email Not Found") {
          setEmailNotFound(true);
        }
      });
  };

  function isEmailValid(email) {
    // Regular expression for a basic email format check
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailRegex.test(email);
  }

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

    if (response.status === 200) {
      config.notify("Email Verified", "success");
      setEmailVerified(true);
    } else {
      setInvalidOtp(true);
      console.log(response.status);
      config.notify("Incorrect otp", "error");
    }
    if (!response) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  };

  const handleSubmit = async () => {
    if (password === password1) {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/password`,
        {
          method: "POST",
          body: formdata,
        }
      );

      if (response.status === 200) {
        console.log("Password reset successfully");
        window.alert("Password reset successful");
        router.push("/login");
      }
      if (!response) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } else {
      setPasswordsMatch(true);
    }
  };

  const checkPassword = () => {
    if (password !== password1) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-300 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between mb-4">
          <div></div> {/* This empty div will push the button to the right */}
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
              Forgot Password
            </h1>
            <span className="text-black hover:text-gray-700 text-lg p-2 pl-4 mb-7 cursor-pointer">
              <Link href="/login">
                <AiFillCloseCircle color="#3B82F6" size={20} />
              </Link>
            </span>
          </div>
        </div>
        {!otpStatus && (
          <>
            <div className="mb-4 text-center">
              Please enter your registered email.
            </div>
            <div
              className={`flex items-center ${
                isValidEmail || !emailNotFound ? "" : "mb-4"
              }`}
            >
              <div className="flex flex-col">
                <input
                  className={`flex-1 bg-gray-100 rounded-l p-2 focus:outline-none ${
                    (!isValidEmail || emailNotFound) && "border border-red-600"
                  }`}
                  type="text"
                  placeholder="Please enter your Email"
                  onChange={(e) => {
                    setEmailNotFound(false);
                    setIsValidEmail(true);
                    setEmail(e.target.value);
                  }}
                  disabled={otpStatus}
                />
              </div>
              <button
                className="bg-blue-500 rounded-r text-white px-4 py-2 hover:bg-blue-700 focus:outline-none"
                onClick={sendOtp}
                disabled={otpProcessing}
              >
                Send OTP
              </button>
            </div>
            {!isValidEmail && (
              <div className="text-red-600">Please enter a valid email</div>
            )}
            {emailNotFound && (
              <div className="text-red-600">Email not Found</div>
            )}
          </>
        )}

        {otpStatus && !emailVerified && (
          <>
            <div className="mb-4 text-center">
              OTP has been sent to {shortEmail}.
              {/* OTP has been sent to {email} */}
            </div>
            <div className={`flex items-center ${!invalidOtp && "mb-4 "}`}>
              <input
                className={`flex-1 bg-gray-100 rounded-l p-2 focus:outline-none ${
                  invalidOtp && "border border-red-600"
                }`}
                type="text"
                placeholder="Please enter OTP"
                onChange={(e) => {
                  setOtp(e.target.value);
                  setInvalidOtp(false);
                }}
              />

              <button
                className="bg-blue-500 rounded-r text-white px-4 py-2 hover:bg-blue-700 focus:outline-none"
                onClick={handleVerify}
              >
                Verify
              </button>
            </div>
            {invalidOtp && <div className="text-red-600">Invalid Otp</div>}
            <div className="flex justify-end">
              <CountdownTimer sendOtp={sendOtp} />
              <button
                className="bg-red-400 rounded text-white px-6 py-2 hover:bg-blue-700 focus:outline-none"
                onClick={() => {
                  setOtpStatus(false);
                }}
              >
                Back
              </button>
            </div>
          </>
        )}
        {emailVerified && (
          <div>
            <input
              type="password"
              className="border border-black w-full p-2 mb-4"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className={`w-full p-2 ${
                passwordsMatch
                  ? "border border-red-600"
                  : "border border-black mb-4"
              }`}
              placeholder="Re-Enter Your Password"
              onChange={(e) => {
                setPassword1(e.target.value);
                setPasswordsMatch(false);
              }}
              onBlur={checkPassword}
            />
            {passwordsMatch && (
              <div className=" mb-4">Password must be same same</div>
            )}
            <button
              className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 focus:outline-none"
              onClick={handleSubmit}
              disabled={passwordsMatch && password1.length > 0}
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
