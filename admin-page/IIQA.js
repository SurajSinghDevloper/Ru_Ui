"use client";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { config } from "apiCalls/Configuration";
import { getCookie } from "cookies-next";
import { contextManager } from "context/store";
import { iiqaData } from "./Constants";

const IIQA = (prop, ref) => {
  const { inputID } = prop;
  const { setCollegeData, setIiqa } = contextManager();
  const [IIQA, setIIQA] = useState({
    iiqa: {},
    affiliationCompliances: {},
    programs: [],
    staff: {},
    student: {},
  });
  useEffect(() => {
    config.cookieAssign();
    const collegeDataString = getCookie("collegeData");
    try {
      setCollegeData(JSON.parse(collegeDataString));
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    getIIQA,
  }));

  const getIIQA = async () => {
    const response = await config.apiRequest("GET", `${inputID}/by-collegeId`);
    if (response.length === 0) {
      setIiqa("");
      setIIQA((prevdata) => ({
        ...prevdata,
        iiqa: "",
      }));
      alert("No Record Found");
    } else {
      setIiqa(response[0]);
      setIIQA((prevdata) => ({
        ...prevdata,
        iiqa: response[0],
      }));
    }
  };

  useEffect(() => {
    if (IIQA.iiqa.iiqa_ID) {
      (async () => {
        const response = await config.apiRequest(
          "GET",
          `${IIQA.iiqa.iiqa_ID}/getAffiliation`
        );
        if (response) {
          setIIQA((prevdata) => ({
            ...prevdata,
            affiliationCompliances: response,
          }));
        }
      })();
      (async () => {
        const response = await config.apiRequest(
          "GET",
          `${IIQA.iiqa.iiqa_ID}/AllProgramBybyPrepareIIQAId`
        );
        if (response) {
          setIIQA((prevdata) => ({
            ...prevdata,
            programs: response,
          }));
        }
      })();

      (async () => {
        const response = await config.apiRequest(
          "GET",
          `${IIQA.iiqa.iiqa_ID}/all-staff`
        );
        if (response) {
          const categoryMapping = {
            "Number of Non Teaching staff": "nTS",
            "Number of Permanent Teaching staff": "pTS",
            "Number of Other Teaching staff": "oTS",
          };
          response.map((ele) => {
            if (categoryMapping.hasOwnProperty(ele.category)) {
              const categoryKey = categoryMapping[ele.category];

              setIIQA((prevStaff) => ({
                ...prevStaff,
                staff: {
                  ...prevStaff.staff,
                  [categoryKey]: {
                    ...prevStaff.staff[categoryKey],
                    male: ele.male,
                    female: ele.female,
                    transgender: ele.transgender,
                    status: true,
                  },
                },
              }));
            }
          });
        }
      })();
      (async () => {
        const response = await config.apiRequest(
          "GET",
          `${IIQA.iiqa.iiqa_ID}/all-students`
        );
        if (response[0]) {
          setIIQA((prevStaff) => ({
            ...prevStaff,
            student: {
              male: response[0].male,
              female: response[0].female,
              transgender: response[0].transgender,
              status: true,
            },
          }));
        }
      })();
    }
  }, [IIQA.iiqa.iiqa_ID]);
  return (
    <>
      {IIQA.iiqa.iiqa_ID && (
        <>
          <div className="p-2">
            <h1 className="text-lg font-bold text-center text-blue-600">
              IIQA
            </h1>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="border border-black bg-gray-200">
                  {["Field", "Value", "Status", "Description"].map((header) => (
                    <th
                      key={header}
                      className="border-r border-black px-4 py-2"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(IIQA.iiqa)
                  .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // Sort keys alphabetically
                  .map(([key, value]) => (
                    <tr key={key} className="border border-black">
                      <td className="border-r border-black px-4 py-2">
                        {iiqaData[key]}
                      </td>
                      <td className="border-r border-black px-4 py-2">
                        {typeof value === "string" && value.endsWith(".pdf") ? (
                          <a
                            className="font-bold"
                            href={`${config.BASE_URL}/files/view/${value}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </a>
                        ) : (
                          String(value)
                        )}
                      </td>
                      <td className="border-r border-black px-4 py-2">
                        <input type="checkbox" />
                      </td>
                      <td className="border-r border-black">
                        <textarea className="w-full" rows="1" cols="30" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col justify-center p-5">
            {IIQA.affiliationCompliances.length > 0 && (
              <>
                <h1 className="text-lg font-bold text-center text-blue-600">
                  Affiliating University List
                </h1>
                <table className="border border-slate-500">
                  <thead>
                    <tr>
                      <th className="border border-slate-500">State</th>
                      <th className="border border-slate-500">
                        University Name
                      </th>
                      <th className="border border-slate-500">Document</th>
                      <th className="border border-slate-500">Status</th>
                      <th className="border border-slate-500">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {IIQA.affiliationCompliances[0].AffiliatingUniversity.map(
                      (ele, i) => {
                        return (
                          <tr key={i}>
                            <td className="border border-slate-500 text-center w-1/6">
                              {ele.state}
                            </td>
                            <td className="border border-slate-500 text-center w-1/6">
                              {ele.universityName}
                            </td>
                            <td className="border border-slate-500 text-center w-1/6">
                              <div className="flex flex-row justify-evenly">
                                <a
                                  className="cursor-pointer"
                                  href={`${config.BASE_URL}/files/view/${ele.documentName}`}
                                  target="_blank"
                                >
                                  View Document
                                </a>
                              </div>
                            </td>
                            <td className="border border-slate-500 text-center w-1/6">
                              <input type="checkbox" />
                            </td>
                            <td className="border border-slate-500 w-2/6">
                              <textarea
                                className="w-full "
                                rows="1"
                                cols="30"
                              />
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>

                <h1 className="text-lg font-bold text-center mt-5 text-blue-600">
                  SRA List
                </h1>
                <table className="border border-slate-500">
                  <thead>
                    <tr>
                      <th className="border border-slate-500">SRA</th>
                      <th className="border border-slate-500">Document</th>
                      <th className="border border-slate-500">Status</th>
                      <th className="border border-slate-500">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {IIQA.affiliationCompliances[1].SraList.map((ele, i) => {
                      return (
                        <tr key={i}>
                          <td className="border border-slate-500 text-center">
                            {ele.sraType}
                          </td>
                          <td className="border border-slate-500">
                            <div className="flex flex-row justify-evenly">
                              <a
                                className="cursor-pointer"
                                href={`${config.BASE_URL}/files/view/${ele.sraDocumentName}`}
                                target="_blank"
                              >
                                View Document
                              </a>
                            </div>
                          </td>
                          <td className="border border-slate-500 text-center w-1/6">
                            <input type="checkbox" />
                          </td>
                          <td className="border border-slate-500 w-2/6">
                            <textarea className="w-full " rows="1" cols="30" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div className="flex flex-col justify-center p-5">
            <h1 className="text-lg font-bold text-center mt-5 text-blue-600">
              List programs offered by college
            </h1>
            <table className="w-full table-auto border-collapse border border-blue-500">
              <thead>
                <tr>
                  <th className="border border-blue-500 p-2">Department</th>
                  <th className="border border-blue-500 p-2">Program</th>
                  <th className="border border-blue-500 p-2">SRA</th>
                  <th className="border border-slate-500">Status</th>
                  <th className="border border-slate-500">Description</th>
                </tr>
              </thead>
              <tbody>
                {IIQA.programs.length > 0 &&
                  IIQA.programs.map((ele, i) => {
                    return (
                      <tr key={i}>
                        <td className="border border-blue-500 p-2 text-center">
                          {ele.departmentName}
                        </td>
                        <td className="border border-blue-500 p-2 text-center">
                          {ele.program}({ele.specialization})
                        </td>
                        <td className="border border-blue-500 p-2 text-center">
                          {ele.sra}
                        </td>
                        <td className="border border-slate-500 text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="border border-slate-500">
                          <textarea className="w-full " rows="1" cols="30" />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {IIQA.staff.nTS && IIQA.staff.nTS.status && (
            <div className="flex flex-col justify-center p-5">
              <h1 className="text-lg font-bold text-center mt-5 text-blue-600">
                Details of staff
              </h1>
              <ul className="flex">
                <li className="w-4/5">
                  <table className="table-auto w-full">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-2">Categories</th>
                        <th className="p-2">Male</th>
                        <th className="p-2">Female</th>
                        <th className="p-2">Transgender</th>
                        <th className="p-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          label: "Number of Permanent Teaching staff",
                          key: "pTS",
                        },
                        {
                          label: "Number of Other Teaching staff",
                          key: "oTS",
                          info: "(All other teaching staff engaged by the institution excluding permanent teaching staff)",
                        },
                        { label: "Number of Non Teaching staff", key: "nTS" },
                      ].map((category, index) => (
                        <tr key={index}>
                          <td className="border p-2">
                            {category.label}{" "}
                            {category.info && (
                              <span
                                data-placement="right"
                                title={category.info}
                                className="text-blue-500"
                              >
                                <i className="fas fa-question-circle"></i>
                              </span>
                            )}
                          </td>
                          {["male", "female", "transgender", "total"].map(
                            (type, i) => (
                              <td key={i} className="border p-2">
                                <input
                                  placeholder="count"
                                  maxLength={
                                    type === "total"
                                      ? "5"
                                      : type === "transgender"
                                      ? "2"
                                      : "4"
                                  }
                                  className="form-input w-full p-2 border"
                                  name={type}
                                  type="number"
                                  value={IIQA.staff[category.key][type] || 0}
                                  onChange={(e) => handleStaff(e, category.key)}
                                  disabled={type === "total"}
                                />
                              </td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </li>
                <li className="border w-1/5">
                  <div className="border-b p-1">
                    <label className="">
                      Status
                      <input className="ml-3" type="checkbox" />
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label>Description</label>
                    <textarea className="h-full border" rows="6" />
                  </div>
                </li>
              </ul>
            </div>
          )}
          <div className="flex flex-col justify-center p-5">
            {IIQA.student.status && (
              <>
                <h2 className="text-lg font-bold text-center mt-5 text-blue-600">
                  Details of Student
                </h2>
                <ul className="flex">
                  <li className="w-4/5">
                    <table className="table-auto w-full">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="p-2">Categories</th>
                          <th className="p-2">Male</th>
                          <th className="p-2">Female</th>
                          <th className="p-2">Transgender</th>
                          <th className="p-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-2 w-2/6">
                            Number of Regular Face to Face Students ( In case of
                            Open University consider Learners in the preceding
                            year )
                          </td>
                          {["male", "female", "transgender"].map(
                            (type, index) => (
                              <td
                                key={index}
                                className={`w-1/6 p-2 ${
                                  index === 4 ? " align-top" : ""
                                }`}
                              >
                                <div className="w-full p-2 border">
                                  {IIQA.student[type]}
                                </div>
                              </td>
                            )
                          )}
                          <td className="w-1/6 border p-2">
                            <div className="w-full p-2 border">
                              {IIQA.student.female +
                                IIQA.student.male +
                                IIQA.student.transgender}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                  <li className="border w-1/5">
                    <div className="border-b p-1">
                      <label className="">
                        Status
                        <input className="ml-3" type="checkbox" />
                      </label>
                    </div>
                    <div className="flex flex-col">
                      <label>Description</label>
                      <textarea className="h-full border" rows="2" />
                    </div>
                  </li>
                </ul>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default forwardRef(IIQA);
