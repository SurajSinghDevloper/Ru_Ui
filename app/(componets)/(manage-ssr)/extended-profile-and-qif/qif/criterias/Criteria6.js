"use client";
import React, { useState, useEffect } from "react";
import Question from "../Question";
import { ImBin2 } from "react-icons/im";

const Criteria6 = ({ setAnsQs, ansQs }) => {
  const [formData, setFormData] = useState({
    "6.1.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "6.2.1": {
      para: "",
      doc: ["", ""],
      link: [""],
    },
    "6.2.2": {
      doc: ["", "", "", ""],
      select: "",
    },
    "6.3.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "6.3.2": {
      doc: ["", "", "", ""],
      "6.3.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      link: [""],
    },
    "6.3.3": {
      doc: ["", "", "", ""],
      "6.3.3.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      link: [""],
    },
    "6.4.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "6.5.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "6.5.2": {
      select: "",
      doc: ["", "", ""],
      link: ["", ""],
    },
  });
  const keyIndicators = {
    "Institutional Vision and Leadership": {
      "6.1.1": [
        "QIM",
        "The institutional governance and leadership are in accordance with the vision and mission of the Institution and it is visible in various institutional practices such as NEP implementation, sustained institutional growth, decentralization, participation in the institutional governance and in their short term and long term Institutional Perspective Plan.",
        {
          "Upload Additional information": "Upload",
          "Provide Link for Additional information": "Link",
        },
      ],
    },
    "Strategy Development and Deployment": {
      "6.2.1": [
        "QIM",
        "The institutional perspective plan is effectively deployed and functioning of the institutional bodies is effective and efficient as visible from policies, administrative setup, appointment, service rules, and procedures, etc.",
        {
          "Institutional perspective Plan and deployment documents on the website":
            "Upload",
          "Upload Additional information": "Upload",
          "Provide Link for Additional information": "Link",
        },
      ],
      "6.2.2": [
        "QnM",
        "Institution implements e-governance in its operations",
        {
          "Institution implements e-governance in its operations": "Upload",
          "Institutional expenditure statements for the budget heads of egovernance implementation ERP Document":
            "Upload",
          "Annual e-governance report approved by the Governing Council/ Board of Management/ Syndicate Policy document on e-governance":
            "Upload",
          "Provide Links for any other relevant document to support the claim (if any)":
            "Upload",
        },
        [
          [
            "",
            "",
            "select",
            "",
            [
              "Administration including complaint management",
              "Finance and Accounts",
              "Student Admission and Support",
              "Examinations",
            ],
          ],
        ],
      ],
    },
    "Faculty Empowerment Strategies": {
      "6.3.1": [
        "QIM",
        "The institution has performance appraisal system, effective welfare measures for teaching and non-teaching staff and avenues for career development/progression",
        {
          "Upload Additional information": "Upload",
          "Provide Link for Additional information": "Link",
        },
      ],
      "6.3.2": [
        "QnM",
        "Percentage of teachers provided with financial support to attend conferences/workshops and towards membership fee of professional bodies during the last five years",
        {
          "Institutional data in the prescribed format (data template)":
            "Data Template",
          "Policy document on providing financial support to teachers":
            "Upload",
          "Copy of letter/s indicating financial assistance to teachers and list of teachers receiving financial support year-wise under each head.":
            "Upload",
          "Audited statement of account highlighting the financial support to teachers to attend conferences/workshops and towards membership fee for professional bodies.":
            "Upload",
          "Provide Links for any other relevant document to support the claim (if any)":
            "Link",
        },
        [
          [
            "6.3.2.1",
            "6.3.2.1 Number of teachers provided with financial support to attend conferences/workshops and towards membership fee of professional bodies year wise during the last five years",
            true,
            "Number of full time teachers year-wise during the last five years",
          ],
        ],
      ],
      "6.3.3": [
        "QnM",
        "Percentage of teaching and non-teaching staff participating in Faculty development Programmes (FDP), Management Development Programmes (MDPs) professional development /administrative training programs during the last five years",
        {
          "Institutional data in the prescribed format (data template)":
            "Data Template",
          "Refresher course/Faculty Orientation or other programmes as per UGC/AICTE stipulated periods, as participated by teachers yearwise.":
            "Upload",
          "Copy of the certificates of the program attended by teachers.":
            "Upload",
          "Annual reports highlighting the programmes undertaken by the teachers":
            "Upload",
          "Provide Links for any other relevant document to support the claim (if any)":
            "Link",
        },
        [
          [
            "6.3.3.1",
            "6.3.3.1 Total number of teaching and non-teaching staff participating in Faculty development Programmes (FDP), Management Development Programmes (MDPs) professional development /administrative training programs during the last five years",
            true,
            "Number of full time teachers year-wise during the last five years",
          ],
        ],
      ],
    },
    "Financial Management and Resource Mobilization": {
      "6.4.1": [
        "QIM",
        "Institution has strategies for mobilization and optimal utilization of resources and funds from various sources (government/ nongovernment organizations) and it conducts financial audits regularly (internal and external).",
        {
          "Upload Additional information": "Upload",
          "Provide Link for Additional information": "Link",
        },
      ],
    },
    "Internal Quality Assurance System": {
      "6.5.1": [
        "QIM",
        "Internal Quality Assurance Cell (IQAC) has contributed significantly for institutionalizing the quality assurance strategies and processes. It reviews teaching learning process, structures & methodologies of operations and learning outcomes at periodic intervals and records the incremental improvement in various activities.",
        {
          "Upload Additional information": "Upload",
          "Provide Link for Additional information": "Link",
        },
      ],
      "6.5.2": [
        "QnM",
        "Quality assurance initiatives of the institution include:",
        {
          "Link to Minute of IQAC meetings, hosted on HEI website": "Link",
          "NIRF report, AAA report and details on follow up actions": "Upload",
          "Quality audit reports/certificate as applicable and valid for the assessment period.":
            "Upload",
          "List of Collaborative quality initiatives with other institution(s)  with brochures and geo-tagged photos with caption and date.":
            "Upload",
          "Provide Links for any other relevant document to support the claim (if any)":
            "Link",
        },
        [
          [
            "",
            "",
            "select",
            "",
            [
              "Regular meeting of Internal Quality Assurance Cell (IQAC); quality improvement initiatives identified and implemented",
              "Academic and Administrative Audit (AAA) and follow-up action taken",
              "Collaborative quality initiatives with other institution(s)",
              "Participation in NIRF and other recognized rankings",
              "Any other quality audit/accreditation recognized by state, national or international agencies such as NAAC, NBA etc.",
            ],
          ],
        ],
      ],
    },
  };
  const relatedInput = useState({
    "6.3.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "6.3.3.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
  });

  const options = [
    "A. All of the above",
    "B. Any 3 of the above",
    "C. Any 2 of the above",
    "D. Any 1 of the above",
    "E. None of the above",
  ];

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
            5.{i + 1}. {ele}
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
                      <div>
                        <div className="flex">
                          <span className="w-3/5">
                            {e} {keyIndicators[ele][e][1]}
                          </span>
                          <div className="w-2/5 h-8 border border-black p-1">
                            5
                          </div>
                        </div>
                      </div>
                      {keyIndicators[ele][e][3][0][2] === "select" &&
                        (console.log(),
                        (
                          <div className="my-4 rounded-lg flex bg-slate-300">
                            <ul className="my-2 p-2 w-3/4">
                              {keyIndicators[ele][e][3][0][4].map(
                                (item, index) => (
                                  <li key={index}>
                                    {index + 1}. {item}
                                  </li>
                                )
                              )}
                            </ul>
                            <ul className="pb-4 w-1/4">
                              {options.map((option, index) => (
                                <li className="px-2 " key={index}>
                                  <label>
                                    <input
                                      className="mr-2"
                                      type="radio"
                                      name="option"
                                      value={`option${index + 1}`}
                                      checked={
                                        formData[e].select ===
                                        `option${index + 1}`
                                      }
                                      onChange={(event) => {
                                        setFormData((prevData) => {
                                          const updatedFormData = {
                                            ...prevData,
                                          };
                                          updatedFormData[e].select =
                                            event.target.value;
                                          return updatedFormData;
                                        });
                                      }}
                                    />
                                    {option}
                                  </label>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
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
                                      Array.from(
                                        { length: 5 },
                                        (_, index) => (
                                          console.log(
                                            relatedInput[0][elem[0]],
                                            elem[0]
                                          ),
                                          (
                                            <div
                                              key={index}
                                              className="flex flex-col w-1/5 p-2 pt-0"
                                            >
                                              <div>
                                                {currentYear - (index + 1)}-
                                                {extractLastTwoDigits(
                                                  currentYear
                                                )}
                                              </div>
                                              <div className="border border-black px-1">
                                                {relatedInput[0][elem[0]][
                                                  `year${index + 1}`
                                                ] || 0}
                                              </div>
                                            </div>
                                          )
                                        )
                                      )}
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

export default Criteria6;

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
