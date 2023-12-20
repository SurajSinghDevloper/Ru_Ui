"use client";
import React, { useState } from "react";
import Basic_Information from "./Basic_Information/page";
import AcademicInformation from "./AccademicInformation/page";

const ProfileForSSR = () => {
  // State to track the active button
  const [activeButton, setActiveButton] = useState("Basic Information");

  // const showPercentage = () => {
  //   // You can add your logic here
  //   console.log("Showing IIQA compliance percentage");
  // };

  // Define a function to handle button clicks
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  // Define content for each button
  const buttonContent = {
    "Basic Information": (
      <div>
        <Basic_Information />
      </div>
    ),
    "Academic Information": (
      <div>
        <AcademicInformation />
      </div>
    ),
    "Evaluative Reports Of The Department": (
      <div>
        <h1>Evaluative_Reports_Of_The_Department</h1>
      </div>
    ),
  };

  return (
    <>
      {/*<div className="flex flex-row justify-evenly bg-transparent mb-3">
         <div className="w-1/2">
          <div className="flex ">
            <div className="  h-3 w-1/2">
              <progress
                className="w-full"
                min="0"
                max="100"
                low="25"
                high="75"
                optimum="80"
                value="90"
              ></progress>
            </div>
          </div>
        </div> 

        <div className=" flex  flex-col-5 float-left ">
          <a
            type="button"
            id="view"
            data-toggle="modal"
            data-target="#complianceModal"
            className="text-purple"
            onClick={showPercentage}
          >
            View IIQA compliance
          </a>
        </div>

        <div>
          <a className="text-purple">View filled details</a>
        </div>
      </div>*/}

      <div>
        {/* Top navigation bar */}
        <nav className="bg-slate-500 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            {/* Navigation links */}
            <div className="flex justify-center space-x-4 ">
              {Object.keys(buttonContent).map((button) => (
                <button
                  key={button}
                  className={`hover:bg-gray-600 px-3 py-2 rounded ${activeButton === button ? "bg-gray-600" : ""
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
    </>
  );
};

export default ProfileForSSR;
