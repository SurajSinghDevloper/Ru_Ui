"use client";
import React, { useState } from "react";
import BasicEligiblity from "./basic-eligiblity/BasicEligiblity";
import AffiliationComplianceForm from "./affiliation-compliance/AffiliationComplianceForm";
import ProfileInformation from "./profile-information/ProfileInformation";
import AcedemicForm from "./acedemic-form/AcedemicForm";
import QualityIformationForm from "./quality-information/QualityIformationForm";
import { contextManager } from "context/store";

const ManageIIQAForms = () => {
  const [activeButton, setActiveButton] = useState("Basic Eligibility");

  const completedForm = (item) => {
    item === "Basic Eligibility" && setActiveButton("Affiliation Compliance");
    item === "Affiliation Compliance" && setActiveButton("Profile Information");
    item === "Profile Information" && setActiveButton("Academic Information");
    item === "Academic Information" && setActiveButton("Quality Information");
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const buttonContent = {
    "Basic Eligibility": (
      <div>
        <BasicEligiblity completedForm={completedForm} />
      </div>
    ),
    "Affiliation Compliance": (
      <div>
        <AffiliationComplianceForm completedForm={completedForm} />
      </div>
    ),
    "Profile Information": (
      <div>
        <ProfileInformation completedForm={completedForm} />
      </div>
    ),
    "Academic Information": (
      <div>
        <AcedemicForm completedForm={completedForm} />
      </div>
    ),
    "Quality Information": (
      <div>
        <QualityIformationForm completedForm={completedForm} />
      </div>
    ),
  };

  return (
    <>
      {/* <div className="flex flex-row justify-evenly bg-transparent mb-3">
        <div className="w-1/2">
          <div className="flex ">
            <div className="  h-3 w-1/2">
              <progress
                className="w-full h-5 border rounded-xl"
                min="0"
                max="100"
                low="25"
                high="75"
                optimum="80"
                value={iiqaprogress}
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
      </div> */}
      <div className="tabsec">
        <nav className="navbtn">
          <div className="toptab">
            {Object.keys(buttonContent).map((button) => (
              <button
                key={button}
                className={`tabbtns ${activeButton === button ? "active" : ""}`}
                onClick={() => handleButtonClick(button)}
              >
                {button.charAt(0).toUpperCase() + button.slice(1)}
              </button>
            ))}
          </div>
        </nav>

        {/* Main content container */}
        <div className="sectionbox">{buttonContent[activeButton]}</div>
      </div>
    </>
  );
};

export default ManageIIQAForms;
