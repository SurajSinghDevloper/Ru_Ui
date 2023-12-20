"use client";
import React, { useState } from "react";
import Login from "./login/Login";
import RegistrationForm from "./register/RegistrationForm";
import ForgotPassword from "./forgot-password/ForgotPassword";

const LandingPage = () => {
  const [formSwitch, setFormSwitch] = useState("false");
  const [forget, setForget] = useState(false);
  const [loginNav, setLoginNav] = useState(false);

  const formSwap = () => {
    setFormSwitch(!formSwitch);
    setLoginNav(!loginNav);
  };

  // const swapToLogin = () => {
  //   setFormSwitch(true);
  //   setLoginNav(false);
  //   setForget(false);
  // };
  const handleForget = () => {
    setForget(!forget);
    setLoginNav(!loginNav);
  };

  return (
    <>
      {/* <Navbar swapToLogin={swapToLogin} loginNav={loginNav} /> */}
      {!formSwitch === false ? (
        !forget ? (
          <Login setFormSwitch={formSwap} handleForget={handleForget} />
        ) : (
          <div className="flex justify-center bg-gray-700 h-full">
            <ForgotPassword setForget={setForget} />
          </div>
        )
      ) : (
        <>
          <div className=""></div>
          <div className="flex justify-center bg-transparent h-full">
            <RegistrationForm formSwap={formSwap} />
          </div>
        </>
      )}
    </>
  );
};

export default LandingPage;
