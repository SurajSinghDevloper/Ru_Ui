import React, { useState } from "react";
import { ImBin2 } from "react-icons/im";
import { config } from "apiCalls/Configuration";
import { contextManager } from "context/store";

const DocumentTemplate = ({
  formData,
  setFormData,
  field,
  doc,
  extendedID,
}) => {
  const {} = contextManager;
  const handleDocDelete = () => {
    (async () => {
      const response = await config.ssrAPIRequest(
        "POST",
        extendedID + "/" + doc[1]
      );
      if (response === "Deleted Successfully") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [field]: {
            ...prevFormData[field],
            [doc[0]]: "",
          },
        }));
      }
    })();
  };
  const handleDocUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return config.notify("No file selected.", "error");
    }
    // Get the file extension
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (fileExtension !== "pdf") {
      config.notify("info", "File must be in PDF format.");
      e.target.value = ""; // Clear the file input
      return;
    } else {
      (async () => {
        const formsData = new FormData();
        formsData.append("pdf", selectedFile);
        const response = await config.ssrAPIRequest(
          "POST",
          doc[1] + "/" + extendedID,
          formsData
        );
        if (response) {
          // config.notify("File Uploaded")
          setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: {
              ...prevFormData[field],
              [doc[0]]: response,
            },
          }));
        }
      })();
    }
  };
  return (
    <div className="mt-4">
      <ul>
        <li className="border border-black w-full flex">
          <div className="w-1/4 border-black border-r pl-2">
            File Description
          </div>
          <div className="w-1/4 border-black border-r pl-2">Template</div>
          <div className="w-1/2 border-black pl-2">Documents</div>
        </li>
        <li className="border border-t-0 border-black w-full flex">
          <div className="w-1/4 border-black border-r pl-2">
            Institutional data prescribed format
            <span className="text-red-600">*</span>
          </div>
          <div className="w-1/4 border-black border-r pl-2">
            <a href="/#" target="blank">
              Data Template
            </a>
          </div>
          <div className="w-1/2 border-black p-2">
            {formData[doc[0]] &&
            formData[doc[0]] !== "" &&
            formData[doc[0]] !== undefined ? (
              <div className="flex flex-row">
                <a
                  className="cursor-pointer my-auto ml-2"
                  href={`${config.BASE_URL}/files/view/${formData[doc[0]]}`}
                  target="_blank"
                >
                  View Document
                </a>
                <div
                  className="ml-2 my-auto cursor-pointer"
                  name={field}
                  onClick={handleDocDelete}
                >
                  <ImBin2 />
                </div>
              </div>
            ) : (
              <label
                className="custom-file-upload border bg-gradient-to-br from-slate-100 to-slate-200 text-black/80 rounded-md cursor-pointer shadow-xl shadow-slate-300/60 p-1"
                onChange={handleDocUpload}
              >
                <input
                  type="file"
                  id="fileInput"
                  name="fileInput"
                  accept=".pdf"
                  style={{ display: "none" }}
                />
                Upload File
              </label>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DocumentTemplate;
