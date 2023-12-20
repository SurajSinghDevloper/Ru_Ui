"use client";
import React, { useState, useEffect } from "react";
import Question from "../Question";
import { ImBin2 } from "react-icons/im";

const Criteria4 = ({ setAnsQs, ansQs }) => {
  const [formData, setFormData] = useState({
    "4.1.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "4.1.2": {
      doc: ["", "", ""],
      "4.1.2.1": {
        year1: 1,
        year2: 2,
        year3: 3,
        year4: 4,
        year5: 5,
      },
    },
    "4.2.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "4.3.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "4.3.2": {
      doc: ["", "", ""],
      "4.3.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "4.4.1": {
      doc: [""],
      "4.4.1.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      link: [""],
    },
  });
  const keyIndicators = {
    "Physical Facilities": {
      "4.1.1": [
        "QIM",
        "The Institution has adequate infrastructure and other facilities for (a). teaching learning, viz., classrooms, laboratories, computing equipment etc (b). ICT enabled facilities such as smart class, LMS etc. Facilities for Cultural and sports activities, yoga centre, games (indoor and outdoor), Gymnasium, auditorium etc Describe the adequacy of facilities in maximum of 500 words.",
        {
          "Upload Additional information": "Upload",
          "Provide Link for Additional information": "Link",
        },
      ],
      "4.1.2": [
        "QnM",
        "Percentage of expenditure for infrastructure development and augmentation excluding salary during the last five years",
        {
          "Institutional data in the prescribed format (data template)":
            "Data Template",
          "Audited income and expenditure statement of the institution to be signed by CA and counter signed by the competent authority (relevant expenditure claimed for infrastructure augmentation should be clearly highlighted)":
            "Upload",
          "Provide Links for any other relevant document to support the claim (if any)":
            "Upload",
        },
        [
          [
            "4.1.2.1",
            "4.1.2.1: Expenditure for infrastructure development and augmentation, excluding salary year wise during last five years (INR in lakhs)",
            true,
            "Total Expenditure excluding salary year-wise during the last five years (INR in Lakhs) years",
          ],
        ],
      ],
    },
    "Library as a learning Resource": {
      "4.2.1": [
        "QIM",
        "Library is automated with digital facilities using Integrated Library Management System (ILMS), adequate subscriptions to e-resources and journals are made. The library is optimally used by the faculty and students",
        {
          "Upload Additional information": "Upload",
          "Provide Link for Additional information": "Link",
        },
      ],
    },
    "IT Infrastructure": {
      "4.3.1": [
        "QIM",
        "Institution frequently updates its IT facilities and provides sufficient bandwidth for internet connection (Describe IT facilities including Wi-Fi with date and nature of updation, available internet bandwidth within a maximum of 500 words)",
        {
          "Upload Additional information": "Upload",
          "Provide Link for Additional information": "Link",
        },
      ],
      "4.3.2": [
        "QnM",
        "Student Computer ratio (Data for the latest completed academic year)",
        {
          "Extracts stock register/ highlighting the computers issued to respective departments for student's usage.":
            "Upload",
          "Purchased Bills/Copies highlighting the number of computers purchased":
            "Upload",
          "Provide Links for any other relevant document to support the claim (if any)":
            "Upload",
        },
        [
          [
            "4.3.2.1",
            "4.3.2.1 Number of computers available for students usage during the latest completed academic year",
            true,
            "Number of students year-wise during the last five years",
          ],
        ],
      ],
    },
    "Maintenance of Campus Infrastructure": {
      "4.4.1": [
        "QnM",
        "Percentage expenditure incurred on maintenance of physical facilities and academic support facilities excluding salary component, during the last five years.",
        {
          "Upload Additional information": "Upload",
          "Provide Link for Additional information": "Link",
        },
        [
          [
            "4.4.1.1",
            "4.4.1.1 Expenditure incurred on maintenance of physical facilities an academic support facilities excluding salary component year wise during last five years (INR in lakhs)",
            true,
            "Total Expenditure excluding salary year-wise during the last five years (INR in Lakhs) years",
          ],
        ],
      ],
    },
  };
  const relatedInput = useState({
    "4.1.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "4.3.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "4.4.1.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
  });

  useEffect(() => {
    const isObjectFilled = (obj) => {
      for (const key in obj) {
        if (
          Array.isArray(obj[key]) &&
          !obj[key].every((value) => value !== "" && value !== undefined)
        ) {
          return false;
        } else if (typeof obj[key] === "object" && !isObjectFilled(obj[key])) {
          return false;
        } else if (
          obj[key] === "" ||
          obj[key] === 0 ||
          obj[key] === undefined
        ) {
          return false;
        }
      }
      return true;
    };

    const countFilledParentObjects = (data) => {
      return Object.values(data).filter((item) => isObjectFilled(item)).length;
    };

    const filledParentObjectsCount = countFilledParentObjects(formData);
    setAnsQs({ ...ansQs, 7: filledParentObjectsCount });
  }, [formData]);

  const currentYear = new Date().getFullYear();
  function extractLastTwoDigits(year) {
    // Convert the year to a string, then use substring to get the last two characters.
    return year.toString().slice(-2);
  }
  return (
    <div className="max-h-[540px] overflow-scroll">
      {Object.keys(keyIndicators).map((ele, i) => (
        <div className="p-2" key={i}>
          <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
            4.{i + 1}. {ele}
          </h1>
          <div className="border border-[#337ab7] rounded-b-lg bg-white">
            {Object.keys(keyIndicators[ele]).map((e, i) => {
              return (
                <div
                  className={`p-2 mb-2 ${
                    Object.keys(keyIndicators[ele]).length - 1 !== i
                      ? "border-b border-[#337ab7]"
                      : ""
                  }`}
                  key={i}
                >
                  {keyIndicators[ele][e][0] === "QIM" && (
                    <div>
                      {e} {keyIndicators[ele][e][1]}
                      <i
                        className="text-[#337ab7] cursor-pointer p-1"
                        title="Write description in a maximum of 500 words"
                      >
                        <b>i</b>
                      </i>
                      <Question
                        e={e}
                        formData={formData}
                        setFormData={setFormData}
                      />
                    </div>
                  )}
                  {keyIndicators[ele][e][0] === "QnM" && (
                    <>
                      <div className="flex">
                        <span className="w-3/5">
                          {e} {keyIndicators[ele][e][1]}
                        </span>
                        <div className="w-2/5 h-8 border border-black p-1">
                          5
                        </div>
                      </div>
                      {keyIndicators[ele][e][3] &&
                        keyIndicators[ele][e][3].map((elem, index) => {
                          return (
                            <div key={index}>
                              {elem[2] === true && (
                                <div className="p-4 bg-slate-300 rounded-md flex mb-4 mt-4">
                                  <span className="w-3/5">{elem[1]}</span>

                                  <FiveYearInput
                                    e={e}
                                    question={elem[0]}
                                    formData={formData}
                                    setFormData={setFormData}
                                  />
                                </div>
                              )}

                              {elem[3] && (
                                <div className="p-4  rounded-md flex mb-4 mt-4">
                                  <span className="w-3/5">{elem[3]}</span>
                                  <div className="w-2/5 flex border border-black">
                                    {elem[3] &&
                                      Array.from({ length: 5 }, (_, index) => (
                                        <div
                                          key={index}
                                          className="flex flex-col w-1/5 p-2 pt-0"
                                        >
                                          <div>
                                            {currentYear - (index + 1)}-
                                            {extractLastTwoDigits(currentYear)}
                                          </div>
                                          <div className="border border-black px-1">
                                            {relatedInput[0][elem[0]][
                                              `year${index + 1}`
                                            ] || 0}
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      {keyIndicators[ele][e][4] && (
                        <>
                          <div className="p-4 bg-slate-300 rounded-md flex">
                            <div className="flex flex-col">
                              <b>
                                <i>{keyIndicators[ele][e][4][0]}</i>
                              </b>
                              <table>
                                <tbody>
                                  {Array.from({ length: 5 }, (_, index) => (
                                    <tr key={`A${index}`}>
                                      <td>
                                        <input
                                          type="radio"
                                          name="option"
                                          value={`option${index + 1}`}
                                          checked={
                                            formData["1.4.1"][3] ===
                                            `option${index + 1}`
                                          }
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td className="align-middle">
                                        &nbsp;&nbsp;
                                        <b>{index + 1}. </b>
                                        &nbsp;
                                      </td>
                                      <td>
                                        <label className="text-sm">
                                          {keyIndicators[ele][e][4][index + 1]}
                                        </label>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                  {keyIndicators[ele][e][2] && (
                    <DocumentUpload
                      formData={formData}
                      setFormData={setFormData}
                      e={e}
                      tableData={keyIndicators[ele][e][2]}
                      i={i}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Criteria4;

const DocumentUpload = ({ tableData, e, formData, setFormData }) => {
  const links = Object.keys(tableData).filter(
    (key) => tableData[key] === "Link"
  );
  const handleDocUpload = async (event) => {
    const selectedFile = event.target.files[0];
    const name = event.target.name;

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
      setFormData((prevData) => {
        const updatedFormData = { ...prevData };
        updatedFormData[e].doc[name] = selectedFile.name;
        return updatedFormData;
      });

      // (async () => {
      //   const formsData = new FormData();
      //   formsData.append("pdf", selectedFile);
      //   const response = await config.ssrAPIRequest(
      //     "POST",
      //     doc[1] + "/" + extendedID,
      //     formsData
      //   );
      //   if (response) {
      //     // config.notify("File Uploaded")
      //     setFormData((prevFormData) => ({
      //       ...prevFormData,
      //       [field]: {
      //         ...prevFormData[field],
      //         [doc[0]]: response,
      //       },
      //     }));
      //   }
      // })();
    }
  };

  const handleDocDelete = (name) => {
    setFormData((prevData) => {
      const updatedFormData = { ...prevData };
      updatedFormData[e].doc[name] = "";
      return updatedFormData;
    });
  };
  return (
    <div className="mb-4">
      {tableData && (
        <table className="pl-4 pr-8 w-full">
          <tbody>
            <tr className="w-full border border-black">
              <td className="w-1/5 border border-black">File Description</td>
              <td className="w-1/5 border border-black">Template</td>
              <td className="w-1/5 border border-black">Documents</td>
            </tr>
            {Object.keys(tableData).map((ele, i) => {
              return (
                (tableData[ele] === "Data Template" ||
                  tableData[ele] === "Upload") && (
                  <tr key={i}>
                    <td className="w-1/5 border border-black">{ele}</td>
                    <td className="w-1/5 border border-black">
                      {tableData[ele] === "Data Template" &&
                        "Document Template"}
                    </td>
                    <td className="w-1/5 border border-black p-1">
                      <div className="w-1/2 border-black">
                        {formData[e].doc[i] ? (
                          <div className="flex flex-row">
                            <a
                              className="cursor-pointer my-auto ml-2"
                              // href={`${config.BASE_URL}/files/view/${
                              //   formData[doc[0]]
                              // }`}
                              href="/#"
                              target="_blank"
                            >
                              View Document
                            </a>
                            <div
                              className="ml-2 my-auto cursor-pointer"
                              name={i}
                              onClick={() => handleDocDelete(i)}
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
                              name={i}
                              accept=".pdf"
                              style={{ display: "none" }}
                            />
                            Upload File
                          </label>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              );
            })}
            {links.length > 0 &&
              links.map((ele, i) => {
                return (
                  <tr key={i}>
                    <td className="w-1/5 border border-black">{ele}</td>
                    <td className="w-1/5 border border-black"></td>
                    <td className="w-1/5 border border-black p-1">
                      <input
                        className="w-full border border-black mb-1"
                        type="text"
                        value={formData[e].link[i] || ""}
                        onChange={(event) => {
                          setFormData((prevData) => {
                            const updatedFormData = { ...prevData };
                            updatedFormData[e].link[i] = event.target.value;
                            return updatedFormData;
                          });
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

const FiveYearInput = ({ e, question, formData, setFormData }) => {
  const currentYear = new Date().getFullYear();
  function extractLastTwoDigits(year) {
    // Convert the year to a string, then use substring to get the last two characters.
    return year.toString().slice(-2);
  }
  return (
    <div className="w-2/5 flex">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="flex flex-col w-1/5 p-2 pt-0">
          <label>
            {currentYear - (index + 1)}-{extractLastTwoDigits(currentYear)}
          </label>
          <input
            className="border border-black px-1"
            type="text"
            name={`year${index + 1}`}
            value={formData[e][question][`year${index + 1}`] || ""}
            onChange={(event) => {
              const { name, value } = event.target;
              const numericValue = parseFloat(value) ? parseFloat(value) : 0;
              setFormData((prevData) => {
                const updatedFormData = { ...prevData };
                updatedFormData[e][question] = {
                  ...updatedFormData[e][question],
                  [name]: numericValue ? numericValue : "",
                };
                return updatedFormData;
              });
            }}
          />
        </div>
      ))}
    </div>
  );
};
