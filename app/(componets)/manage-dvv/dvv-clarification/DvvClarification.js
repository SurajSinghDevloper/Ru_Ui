"use client";
import React, { useState } from "react";
import ExtendedProfileDeviations from "./extended-profile-deviations/ExtendedProfileDeviations"
import MetricsLevelDeviations from "./metrics-level-deviations/MetricsLevelDeviations"
const ManageDvv = () => {
    // State to track the active button
    const [activeButton, setActiveButton] = useState("Extended Profile Deviations");

    // Define a function to handle button clicks
    const handleButtonClick = (button) => {
        setActiveButton(button);
    };
    // Define content for each button
    const buttonContent = {
        "Extended Profile Deviations": (<div>
            <ExtendedProfileDeviations />
        </div>),
        "Metrics Level Deviations": (<div>
            <MetricsLevelDeviations />
        </div>),
    };

    return (
        <>
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

export default ManageDvv;
