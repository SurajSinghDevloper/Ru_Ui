"use client";
import React, { useState, useEffect } from "react";
import { config } from "apiCalls/Configuration";
import { contextManager } from "context/store";

const QualityInformationForm = () => {
  const { iiqa } = contextManager();
  const [establishmentDate, setEstablishmentDate] = useState(
    iiqa.dateOfEstablishmentOfIQACorCIQA || ""
  );

  const handleSaveAndNext = async () => {
    const formData = new FormData();
    formData.append("date", establishmentDate);
    const response = await config.apiRequest(
      "PUT",
      `${iiqa.iiqa_ID}/update-date-of-establishment`,
      formData,
      ""
    );
  };

  return (
    <div className="border mt-2 p-2">
      <div className="text-white border mt-2 p-2 bg-[#337ab7]">
        Quality Information
      </div>
      <form className="w-full border p-3">
        <div className="flex border p-2">
          <div className="col-md-5 w-1/2">
            Date of Establishment of IQAC / CIQA
            <span
              className="text-blue-600 cursor-pointer"
              title="(Date of establishment of any quality assurance committee or cell internal to the Institution)"
            >
              ?
            </span>
          </div>
          <input
            type="date" // Use type="date" for date input
            className="form-input calendar border p-2"
            value={establishmentDate} // Set the value
            onChange={(e) => setEstablishmentDate(e.target.value)}
          />
          <i
            title="Click here to reset date"
            className="border p-2 cursor-pointer"
            onClick={() => setEstablishmentDate("")}
          >
            <b> X </b>
          </i>
        </div>
        <div className="text-right m-2 mb-0">
          <button
            type="button"
            className="text-right p-2 rounded-md text-white bg-[#3c8dbc]"
            onClick={handleSaveAndNext}
          >
            Save and Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default QualityInformationForm;
