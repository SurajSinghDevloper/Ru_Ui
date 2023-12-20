"use client";
import React, { useEffect, useState } from "react";
import Question from "../Question";
import { ImBin2 } from "react-icons/im";
import { contextManager } from "context/store";
import { config } from "apiCalls/Configuration";

const Criteria2 = ({ setAnsQs, ansQs }) => {
  const { collegeData } = contextManager();
  const [formData, setFormData] = useState({
    "2.1.1": {
      doc: ["a", "b", "c"],
      "2.1.1.1": {
        year1: 5,
        year2: 6,
        year3: 7,
        year4: 8,
        year5: 9,
      },
      "2.1.1.2": {
        year1: 1,
        year2: 2,
        year3: 3,
        year4: 4,
        year5: 5,
      },
      link: ["qawdewfecw"],
    },
    "2.1.2": {
      doc: ["", "", "", ""],
      "2.1.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "2.2.1": {
      doc: [""],
      link: [""],
    },
    "2.3.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "2.4.1": {
      doc: [""],
      link: [""],
    },
    "2.4.2": {
      "2.4.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      doc: ["", "", ""],
      link: [""],
    },
    "2.5.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "2.6.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "2.6.2": {
      para: "",
      doc: [""],
      link: [""],
    },
    "2.6.3": {
      doc: ["", "", ""],
      link: [""],
      "2.6.3.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      "2.6.3.2": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
  });
  const [relatedInput, setRelatedInput] = useState({
    "2.1.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "2.2.1.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "2.2.1.2": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "2.4.1.1": {
      year1: 0,
      year2: 0,
      year3: 0,
      year4: 0,
      year5: 0,
    },
    "2.4.1.2": {
      year1: 0,
      year2: 0,
      year3: 0,
      year4: 0,
      year5: 0,
    },
    "2.4.2.1": {
      year1: 0,
      year2: 0,
      year3: 0,
      year4: 0,
      year5: 0,
    },
  });

  const keyIndicators = {
    "Student Enrolment and Profile ": {
      "2.1.1": [
        "QnM",
        "Enrolment percentage",
        {
          "Institutional data in the prescribed format (data template)":
            "Data Template",
          "Document relating to sanction of intake as approved by competent authority":
            "Upload",
          "Final admission list as published by the HEI and endorsed by the competent authority.":
            "Upload",
          "Provide Links for any other relevant document to support the claim (if any)":
            "Link",
        },
        [
          [
            "2.1.1.1",
            "2.1.1.1 Number of seats filled year wise during last five years (Only first year admissions to be considered)",
            true,
          ],
          [
            "2.1.1.2",
            "2.1.1.2 Number of sanctioned seats year wise during last five years",
            true,
          ],
        ],
      ],
      "2.1.2": [
        "QnM",
        "Percentage of seats filled against reserved categories (SC, ST, OBC etc.) as per applicable reservation policy for the first year admission during the last five years",
        {
          "Institutional data in the prescribed format (data template)":
            "Data Template",
          "Copy of the letter issued by the State govt. or Central Government Indicating the reserved categories(SC, ST, OBC, Divyangjan, etc.) to be considered as per the state rule (Translated copy in English to be provided as applicable)":
            "Upload",
          "Final admission list indicating the category as published by the HEI and endorsed by the competent authority.":
            "Upload",
          "Provide Links for any other relevant document to support the claim (if any)":
            "Upload",
        },
        [
          [
            "2.1.2.1",
            "2.1.2.1. Number of actual students admitted from the reserved categories year wise during last five years (Exclusive of supernumerary seats)",
            true,
            "Number of seats earmarked for reserved category as per GOI/State Govt rule year wise during the last five years",
          ],
        ],
      ],
    },
    "Student Teacher Ratio": {
      "2.2.1": [
        "QnM",
        "Student – Full time Teacher Ratio",
        {
          "Upload Additional information": "Upload",
          "Link for Additional Information": "Link",
        },
        [
          [
            "2.2.1.1",
            "",
            false,
            "Number of students year wise during last five years",
          ],
          [
            "2.2.1.2",
            "",
            false,
            "Number of full time teachers year wise during last five years",
          ],
        ],
      ],
    },
    "Teaching- Learning Process": {
      "2.3.1": [
        "QIM",
        "Student centric methods, such as experiential learning, participative learning and problem solving methodologies are used for enhancing learning experiences and teachers use ICT- enabled tools including online resources for effective teaching and learning process",
        {
          "Upload Additional information": "Upload",
          "Provide Link for Additional information": "Link",
        },
      ],
    },
    "Teacher Profile and Quality": {
      "2.4.1": [
        "QnM",
        "Percentage of full-time teachers against sanctioned posts during the last five years",
        {
          "Sanction letters indicating number of posts sanctioned by the competent authority (including Management sanctioned posts)":
            "Upload",
          "Provide Links for any other relevant document to support the claim (if any)":
            "Link",
        },
        [
          [
            "2.4.1.1",
            "",
            false,
            "Number of full time teachers year wise during last five years",
          ],
          [
            "2.4.1.2",
            "",
            false,
            "Number of sanctioned posts year wise during the last five years",
          ],
        ],
      ],
      "2.4.2": [
        "QnM",
        "Percentage of full time teachers with NET/SET/SLET/ Ph. D./D.Sc. /D.Litt./L.L.D. during the last five years (consider only highest degree for count)",
        {
          "Institutional data in the prescribed format (data template merged with 2.1)":
            "Data Template",
          "List of faculty having Ph.D./D.Sc. / D.Litt./ L.L.D along with particulars of the degree awarding university, subject and the year of award per academic year.":
            "Upload",
          "Copies of Ph.D./D.Sc. / D.Litt./ L.L.D awarded by UGC recognized universities":
            "Upload",
          "Provide Links for any other relevant document to support the claim (if any)":
            "Link",
        },
        [
          [
            "2.4.2.1",
            "2.4.2.1 Number of full time teachers with NET/SET/SLET/Ph. D./ D.Sc. / D.Litt./L.L.D year wise during the last five years",
            true,
            "Number of full time teachers year wise during last five years",
          ],
        ],
      ],
    },
    "Evaluation Process and Reforms": {
      "2.5.1": [
        "QIM",
        "Mechanism of internal/ external assessment is transparent and the grievance redressal system is time- bound and efficient",
        {
          "Upload Additional information": "Upload",
          "Provide Link for Additional information": "Link",
        },
      ],
    },
    "Student Performance and Learning Outcome": {
      "2.6.1": [
        "QIM",
        "Programme Outcomes (POs) and Course Outcomes (COs) for all Programmes offered by the institution are stated and displayed on website",
        {
          "Upload Additional information": "Upload",
          "Provide Link for Additional information": "Link",
        },
      ],
      "2.6.2": [
        "QIM",
        "Attainment of POs and COs are evaluated.",
        {
          "Upload Additional information": "Upload",
          "Provide Link for Additional information": "Link",
        },
      ],
      "2.6.3": [
        "QnM",
        "Pass percentage of Students during last five years (excluding backlog students)",
        {
          "Institutional data in the prescribed format (data template)":
            "Data Template",
          "Annual report of Controller of Examinations ( COE) highlighting the pass percentage of final year students":
            "Upload",
          "Certified report from the COE indicating the pass percentage of students of the final year (final semester) eligible for the degree program-wise / year wise":
            "Upload",
          "Provide Links for any other relevant document to support the claim (if any)":
            "Link",
        },
        [
          [
            "2.6.3.1",
            "2.6.3.1 Number of final year students who passed the university examination year wise during the last five years",
            true,
          ],
          [
            "2.6.3.2",
            "2.6.3.2 Number of final year students who appeared for the university examination year wise during the last five years",
            true,
          ],
        ],
      ],
    },
  };

  useEffect(() => {
    (async () => {
      const response = await config.ssrAPIRequest(
        "GET",
        `extended-ssr/${collegeData.collegId}`
      );

      const updatedRelatedInput = { ...relatedInput };
      updatedRelatedInput["2.1.2.1"].year1 = response.addmReservedSeatsYear1;
      updatedRelatedInput["2.1.2.1"].year2 = response.addmReservedSeatsYear2;
      updatedRelatedInput["2.1.2.1"].year3 = response.addmReservedSeatsYear3;
      updatedRelatedInput["2.1.2.1"].year4 = response.addmReservedSeatsYear4;
      updatedRelatedInput["2.1.2.1"].year5 = response.addmReservedSeatsYear5;
      updatedRelatedInput["2.2.1.1"].year1 = response.studentYear1;
      updatedRelatedInput["2.2.1.1"].year2 = response.studentYear2;
      updatedRelatedInput["2.2.1.1"].year3 = response.studentYear3;
      updatedRelatedInput["2.2.1.1"].year4 = response.studentYear4;
      updatedRelatedInput["2.2.1.1"].year5 = response.studentYear5;
      updatedRelatedInput["2.2.1.2"].year1 = response.acadFullTimeTeachYear1;
      updatedRelatedInput["2.2.1.2"].year2 = response.acadFullTimeTeachYear2;
      updatedRelatedInput["2.2.1.2"].year3 = response.acadFullTimeTeachYear3;
      updatedRelatedInput["2.2.1.2"].year4 = response.acadFullTimeTeachYear4;
      updatedRelatedInput["2.2.1.2"].year5 = response.acadFullTimeTeachYear5;
      setRelatedInput(updatedRelatedInput);
      updatedRelatedInput["2.4.1.1"].year1 = response.acadSanctionedPostsYear1;
      updatedRelatedInput["2.4.1.1"].year2 = response.acadSanctionedPostsYear2;
      updatedRelatedInput["2.4.1.1"].year3 = response.acadSanctionedPostsYear3;
      updatedRelatedInput["2.4.1.1"].year4 = response.acadSanctionedPostsYear4;
      updatedRelatedInput["2.4.1.1"].year5 = response.acadSanctionedPostsYear5;
    })();
  }, []);

  const countCompleteObjects = (formData) => {
    let count = 0;

    Object.keys(formData).forEach((key) => {
      const currentObject = formData[key];

      // Check if 'doc' and 'link' properties exist and are non-empty
      if (
        currentObject.doc &&
        currentObject.doc.every((item) => item !== "") &&
        currentObject.link &&
        currentObject.link.every((item) => item !== "")
      ) {
        // Check if nested objects have non-empty 'year' properties
        let nestedObjectsComplete = true;
        Object.values(currentObject).forEach((nestedObject) => {
          if (
            nestedObject &&
            typeof nestedObject === "object" &&
            !Object.values(nestedObject).every((year) => year !== "")
          ) {
            nestedObjectsComplete = false;
          }
        });

        if (nestedObjectsComplete) {
          count++;
        }
      }
    });

    return count;
  };
  useEffect(() => {
    setAnsQs({ ...ansQs, 2: completeObjectsCount });
  }, [formData]);
  const completeObjectsCount = countCompleteObjects(formData);

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
            2.{i + 1}. {ele}
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
                                            {
                                              relatedInput[elem[0]][
                                                `year${index + 1}`
                                              ]
                                            }
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

export default Criteria2;

const DocumentUpload = ({ tableData, e, formData, setFormData }) => {
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
                <tr key={i}>
                  <td className="w-1/5 border border-black">{ele}</td>
                  <td className="w-1/5 border border-black">
                    {tableData[ele] === "Data Template" && "Document Template"}
                  </td>
                  <td className="w-1/5 border border-black p-1">
                    {(tableData[ele] === "Data Template" ||
                      tableData[ele] === "Upload") && (
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
                    )}
                    {tableData[ele] === "Link" && (
                      <input
                        className="w-full border border-black"
                        type="text"
                        value={formData[e].link[0]}
                        onChange={(event) => {
                          setFormData((prevData) => {
                            const updatedFormData = { ...prevData };
                            updatedFormData[e].link[0] = event.target.value;
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
