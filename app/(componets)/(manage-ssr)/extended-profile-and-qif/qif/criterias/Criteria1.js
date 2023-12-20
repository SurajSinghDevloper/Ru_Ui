"use client";
import React, { useEffect, useState } from "react";
import Question from "../Question1";
import { ImBin2 } from "react-icons/im";
import { config } from "apiCalls/Configuration";
import { contextManager } from "context/store";

const Criteria1 = ({ setAnsQs }) => {
  const { collegeData } = contextManager();
  const [formData, setFormdata] = useState({
    "1.1.1": [
      "", //Link
      "", //Paragraph
      {
        doc1: "",
      },
    ],
    "1.2.1": [
      "", //Link
      {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      {
        doc1: "",
        doc2: "",
        doc3: "",
        doc4: "",
      },
    ],
    "1.2.2": [
      "abcd", //Link (dummy dont make it empty)
      {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      {
        doc1: "",
        doc2: "",
      },
    ],
    "1.3.1": [
      "", //Paragraph
      "", //Link
      {
        doc1: "",
      },
    ],
    "1.3.2": [
      "abcd", //Link (dummy dont make it empty)
      {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      {
        doc1: "",
        doc2: "",
      },
    ],
    "1.4.1": [
      "", //Link
      "abcd", //Paragraph (dummy dont make it empty)
      {
        doc1: "",
        doc2: "",
        doc3: "",
        doc4: "",
      },
      false, // Selected option
    ],
  });
  const keyIndicators = {
    "Curriculum Planning and Implementation": {
      "1.1.1": [
        "QIM",
        "The Institution ensures effective curriculum planning and delivery through a well-planned and documented process including Academic calendar and conduct of continuous internal Assessment",
        {
          "Upload Additional information": "Upload",
          "Link for Additional Information": "Link",
        },
      ],
    },
    "Academic Flexibility": {
      "1.2.1": [
        "QnM",
        "Number of Certificate/Value added courses offered and online courses of MOOCs, SWAYAM, NPTEL etc.  where the students of the institution have enrolled and successfully completed during the last five years)",
        {
          "Institutional data in the prescribed format": "Document Template",
          "Institutional programme brochure/notice for Certificate/Value added programs with course modules and outcomes":
            "Upload",
          "List of students and the attendance sheet for the above mentioned programs":
            "Upload",
          "Evidence of course completion, like course completion certificate etc.":
            "Upload",
          "Provide Links for any other relevant document to support the claim (if any)":
            "Link",
        },
        "1.2.1.1: Number of Certificate/Value added courses offered and online courses of MOOCs, SWAYAM, NPTEL etc. where the students of the institution have enrolled and successfully completed during the last five years:",
      ],
      "1.2.2": [
        "QnM",
        "Percentage of students enrolled in Certificate/ Value added courses and also completed online courses of MOOCs, SWAYAM, NPTEL etc. as against the total number of students during the last five years",
        {
          "Institutional data in the prescribed format": "Document Template",
          "Upload supporting document": "Upload",
        },
        "1.2.2.1. Number of students enrolled in Certificate/ Value added courses and also completed online courses of MOOCs, SWAYAM, NPTEL etc. as against the total number of students during the last five years",
      ],
    },
    "Curriculum Enrichment": {
      "1.3.1": [
        "QIM",
        "Institution integrates crosscutting issues relevant to Professional Ethics, Gender, Human Values, Environment and Sustainability in transacting the Curriculum",
        {
          "Upload Additional information": "Upload",
          "Link for Additional Information": "Link",
        },
      ],
      "1.3.2": [
        "QnM",
        "Percentage of students undertaking project work/field work/ internships (Data for the latest completed academic year)",

        {
          "Institutional data in the prescribed format": "Document Template",
          "Upload supporting document": "Upload",
        },
        "1.3.2.1. Number of students undertaking project work/field work/internships:",
      ],
    },
    "Feedback System": {
      "1.4.1": [
        "QnM",
        "Institution obtains feedback on the academic performance and ambience of the institution from various stakeholders, such as Students, Teachers, Employers, Alumni etc. and action taken report on the feedback is made available on institutional website",
        {
          "Institutional data in the prescribed format": "Document Template",
          "At least 4 filled-in feedback form from different stake holders like Students, Teachers, Employers, Alumni etc.":
            "Upload",
          "Feedback analysis report submitted to appropriate bodies": "Upload",
          "Action taken report on the feedback analysis": "Upload",
          "Link of institution’s website where comprehensive feedback, its analytics and action taken report are hosted":
            "Link",
        },
        "",

        [
          "Feedback processes of the institution may be classified as follows: ",
          "Feedback collected, analysed, action taken& communicated to the relevant bodies and feedback hosted on the institutional website.",
          "Feedback collected, analysed and action has been taken and communicated to the relevant bodies.",
          "Feedback collected and analysed.",
          "Feedback collected.",
          "Feedback not collected.",
        ],
      ],
    },
  };
  useEffect(() => {
    const fetcQif = async () => {
      const response = await config.ssrAPIRequest(
        "GET",
        `qif/${collegeData.collegId}`
      );
      const a = Object.keys(response);

      const updatedFormData = { ...formData };

      updatedFormData["1.1.1"][1] = response.effectiveCurriculumPlanning_CA;
      updatedFormData["1.1.1"][0] = response.link_CA;
      updatedFormData["1.1.1"][2].doc1 = response.documents_CA;
      updatedFormData["1.2.1"][0] = response.supportingLinks_AF;
      updatedFormData["1.2.1"][1].year1 = response.certCourseCompY1_AF;
      updatedFormData["1.2.1"][1].year2 = response.certCourseCompY2_AF;
      updatedFormData["1.2.1"][1].year3 = response.certCourseCompY3_AF;
      updatedFormData["1.2.1"][1].year4 = response.certCourseCompY4_AF;
      updatedFormData["1.2.1"][1].year5 = response.certCourseCompY5_AF;
      updatedFormData["1.2.1"][2].doc1 = response.institutionalDataFormatDoc_AF;
      updatedFormData["1.2.1"][2].doc2 = response.programBrochureDoc_AF;
      updatedFormData["1.2.1"][2].doc3 = response.studentAttendanceList_AF;
      updatedFormData["1.2.1"][2].doc4 =
        response.courseCompletionEvidenceDoc_AF;
      updatedFormData["1.2.2"][1].year1 = response.enrollCompPercentY1_AF;
      updatedFormData["1.2.2"][1].year2 = response.enrollCompPercentY2_AF;
      updatedFormData["1.2.2"][1].year3 = response.enrollCompPercentY3_AF;
      updatedFormData["1.2.2"][1].year4 = response.enrollCompPercentY4_AF;
      updatedFormData["1.2.2"][1].year5 = response.enrollCompPercentY5_AF;
      updatedFormData["1.2.2"][2].doc1 =
        response.institutionalDataFormatDocs_AF;
      updatedFormData["1.2.2"][2].doc1 = response.supportingDoc_AF;
      updatedFormData["1.3.1"][0] = response.integratesCrosscuttingIssues_CE;
      // updatedFormData["1.3.1"][1] = response.;    correct this
      updatedFormData["1.3.1"][2].doc1 = response.supportingDoc_CE;
      updatedFormData["1.3.2"][1].year1 = response.stdUndertakingProjY1_CE;
      updatedFormData["1.3.2"][1].year2 = response.stdUndertakingProjY2_CE;
      updatedFormData["1.3.2"][1].year3 = response.stdUndertakingProjY3_CE;
      updatedFormData["1.3.2"][1].year4 = response.stdUndertakingProjY4_CE;
      updatedFormData["1.3.2"][1].year5 = response.stdUndertakingProjY5_CE;
      updatedFormData["1.3.2"][2].doc1 = response.institutionalDataFormatDoc_CE;
      updatedFormData["1.3.2"][2].doc2 = response.supportingDocs_CE;
      updatedFormData["1.4.1"][2].doc1 = response.instiDataFormatDoc_FS;
      updatedFormData["1.4.1"][2].doc2 =
        response.feedbackFormsFromStakeholdersDoc_FS;
      updatedFormData["1.4.1"][2].doc3 =
        response.feedbackAnalysisReprtSubmDoc_FS;
      updatedFormData["1.4.1"][2].doc4 = response.feedbackActionReportDoc_FS;
      updatedFormData["1.4.1"][0] = response.feedbackWebsiteLink_FS;
      //1.4.1 select option
      setFormdata(updatedFormData);
    };

    fetcQif();
  }, []);

  // useEffect(() => {
  //   (() => {
  //     let filledKeysCount = 0;
  //     for (const key in formData) {
  //       // Check if every field in the key is filled
  //       const isKeyFilled = formData[key].every((field) => {
  //         // Check if the field is a nested object
  //         if (typeof field === "object") {
  //           // If it's an object, check if every nested field is filled
  //           return Object.values(field).every(
  //             (nestedField) => nestedField !== ""
  //           );
  //         } else {
  //           // If it's not an object, check if the field is filled
  //           return field !== "";
  //         }
  //       });
  //       // If every field in the key is filled, increment the count
  //       if (isKeyFilled) {
  //         filledKeysCount++;
  //       }
  //     }
  //     setAnsQs(filledKeysCount);
  //   })();
  // }, [formData]);

  const handleChange = (event) => {
    setFormdata((prevData) => {
      const updatedFormData = { ...prevData };
      updatedFormData["1.4.1"][3] = event.target.value;
      return updatedFormData;
    });
  };

  return (
    <div className="max-h-[540px] overflow-scroll">
      {Object.keys(keyIndicators).map((ele, i) => (
        <div className="p-2" key={i}>
          <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
            1.{i + 1}. {ele}
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
                        setFormdata={setFormdata}
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
                          {parseFloat(formData[e][1].year1) +
                            parseFloat(formData[e][1].year2) +
                            parseFloat(formData[e][1].year3) +
                            parseFloat(formData[e][1].year4) +
                            parseFloat(formData[e][1].year5) || ""}
                        </div>
                      </div>
                      {keyIndicators[ele][e][3] && (
                        <>
                          <div className="p-4 bg-slate-300 rounded-md flex mb-4 mt-4">
                            <span className="w-3/5">
                              {keyIndicators[ele][e][3]}
                            </span>
                            <FiveYearInput
                              e={e}
                              formData={formData}
                              setFormdata={setFormdata}
                            />
                          </div>
                        </>
                      )}
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
                      setFormData={setFormdata}
                      e={e}
                      tableData={keyIndicators[ele][e][2]}
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

export default Criteria1;

const DocumentUpload = ({ formData, setFormData, e, tableData }) => {
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
        updatedFormData[e][2][name] = selectedFile.name;
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
      updatedFormData[e][2][name] = "";
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
                <tr key={i}>
                  <td className="w-1/5 border border-black">{ele}</td>
                  <td className="w-1/5 border border-black">
                    {tableData[ele] === "Document Template" &&
                      "Document Template"}
                  </td>
                  <td className="w-1/5 border border-black p-1">
                    {(tableData[ele] === "Document Template" ||
                      tableData[ele] === "Upload") && (
                      <div className="w-1/2 border-black">
                        {formData[e][2][`doc${i + 1}`] ? (
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
                              onClick={() => handleDocDelete(`doc${i + 1}`)}
                            >
                              <ImBin2 />
                            </div>
                          </div>
                        ) : (
                          <label className="custom-file-upload border bg-gradient-to-br from-slate-100 to-slate-200 text-black/80 rounded-md cursor-pointer shadow-xl shadow-slate-300/60 p-1">
                            <input
                              type="file"
                              name={`doc${i + 1}`}
                              accept=".pdf"
                              style={{ display: "none" }}
                              onChange={handleDocUpload}
                            />
                            Upload File
                          </label>
                        )}
                      </div>
                    )}
                    {tableData[ele] === "Link" && (
                      <input
                        className="w-full border border-black p-1"
                        type="text"
                        name="Link"
                        value={formData[e][0] || ""}
                        onChange={(event) => {
                          const { name, value } = event.target;
                          setFormData((prevData) => {
                            const updatedFormData = { ...prevData };
                            updatedFormData[e][0] = value;
                            return updatedFormData;
                          });
                        }}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <span className="text-blue-600 pl-3">
        Note:{" "}
        <i>
          No repeat count of courses will be considered{" "}
          <span className="text-red-600">*</span>
        </i>
      </span>
    </div>
  );
};

const FiveYearInput = ({ e, formData, setFormdata }) => {
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
            value={formData[e][1][`year${index + 1}`] || ""}
            onChange={(event) => {
              const { name, value } = event.target;
              const numericValue = parseFloat(value) ? parseFloat(value) : 0;
              setFormdata((prevData) => {
                const updatedFormData = { ...prevData };
                updatedFormData[e][1] = {
                  ...updatedFormData[e][1],
                  [name]: numericValue,
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
