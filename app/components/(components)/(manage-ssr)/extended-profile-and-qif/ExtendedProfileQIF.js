"use client";
import React, { useState, useEffect } from "react";
import ExtendedProfile from "./extended-profile/ExtendedProfile";
import QIF from "./qif/QIF";
import { contextManager } from "context/store";
import { config } from "apiCalls/Configuration";

const ExtendedProfileQIF = () => {
  const [activeButton, setActiveButton] = useState("Extended Profile");

  const { setIiqa, collegeData } = contextManager();
  useEffect(() => {
    config.cookieAssign();
    config
      .apiRequest("GET", `${collegeData.collegId}/by-prepareIIQAID`)
      .then((response) => {
        if (response && response.length > 1) {
          setIiqa(response[0]);
          return;
        }
      });
  }, []);
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const buttonContent = {
    "Extended Profile": (
      <div>
        <ExtendedProfile setActiveButton={setActiveButton} />
      </div>
    ),
    QIF: (
      <div>
        <QIF />
      </div>
    ),
  };

  return (
    <div className=" border border-slate-500 rounded-b-lg">
      {/* Top navigation bar */}
      <nav className="bg-slate-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Navigation links */}
          <div className="flex justify-center space-x-4 ">
            {Object.keys(buttonContent).map((button) => (
              <button
                key={button}
                className={`hover:bg-gray-600 px-3 py-2 rounded ${
                  activeButton === button ? "bg-gray-600" : ""
                }`}
                onClick={() => handleButtonClick(button)}
              >
                {button.charAt(0).toUpperCase() + button.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content container */}
      <div className="container mx-auto mt-4">
        {buttonContent[activeButton]}
      </div>
    </div>
  );
};

export default ExtendedProfileQIF;
