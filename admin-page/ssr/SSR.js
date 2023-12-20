"use client";
import React, { useEffect, useState } from "react";
import { contextManager } from "context/store";
import { config } from "apiCalls/Configuration";
import { getCookie } from "cookies-next";
import { ssrData } from "../Constants";
import QualificationTable from "./QualificationTable";
import FacultyPositionTable from "./FacultyPositionTable";
import StudentEnrolled from "./StudentEnrolled";

const SSR = () => {
  const { setIiqa, collegeData, setCollegeData } = contextManager();
  const [SSR, setSSR] = useState({});
  const [formData, setFormData] = useState({
    qualification: {},
    teachingStaff: { teachingStaff: {}, nTS: {}, technicalStaff: {} },
    guestFaculty: {},
    studentCourseEnrolled: {},
    studentCategoryEnrolled: {},
    programs: {},
    cost: {},
    progDetails: {},
  });

  useEffect(() => {
    config.cookieAssign();
    const collegeDataString = getCookie("collegeData");
    if (collegeDataString) {
      setCollegeData(JSON.parse(collegeDataString));
    }
  }, []);

  const facultyTypeMap = {
    PROFESSOR: "Professor",
    ASSOCIATE_PROFESSOR: "AssociateProfessor",
    ASSISTANT_PROFESSOR: "AssistantProfessor",
  };
  const sanctionBodyMap = {
    UGC: "ugc",
    MANAGEMENT: "management",
  };
  useEffect(() => {
    if (collegeData.collegId) {
      config
        .apiRequest("GET", `${collegeData.collegId}/by-prepareIIQAID`)
        .then((response) => {
          if (response && response.length > 1) {
            setIiqa(response[0]);
            return;
          }
        });

      (async () => {
        const response = await config.ssrAPIRequest(
          "GET",
          `ssr-specifics/${collegeData.collegId}`
        );
        if (response) {
          setSSR(response);
        }
      })();
    }
  }, [collegeData.collegId]);

  useEffect(() => {
    if (SSR.ssrID) {
      (async () => {
        const response = await config.ssrAPIRequest(
          "GET",
          `staff-details/${SSR.ssrID}`
        );
        if (response) {
          response.forEach((ele) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              qualification: {
                ...prevFormData.qualification,
                [ele.teacherType]: {
                  ...(prevFormData.qualification?.[ele.teacherType] || {}),
                  [ele.qualifications]: {
                    ...(prevFormData.qualification?.[ele.teacherType]?.[
                      ele.qualifications
                    ] || {}),
                    [ele.facultyType]: {
                      ...(prevFormData.qualification?.[ele.teacherType]?.[
                        ele.qualifications
                      ]?.[ele.facultyType] || {}),
                      staffId: ele.staffId,
                      maleTeacher: ele.maleTeacher,
                      femaleTeacher: ele.femaleTeacher,
                      otherTeacher: ele.otherTeacher,
                      staffDetailsId: ele.staffDetailsId,
                    },
                  },
                },
              },
            }));
          });
        }
      })();
      (async () => {
        const response = await config.ssrAPIRequest(
          "GET",
          `student-details/${SSR.ssrID}`
        );
        if (response) {
          response.map((ele) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              studentCourseEnrolled: {
                ...prevFormData.studentCourseEnrolled,
                [ele.program]: {
                  ...prevFormData.studentCourseEnrolled[ele.program],
                  [ele.gender]: {
                    ...prevFormData.studentCourseEnrolled[ele.gender],
                    CollegeState: ele.fromState,
                    Foreign: ele.foreignStudent,
                    NRI: ele.nriStudent,
                    OtherState: ele.fromOther,
                    studentCurrentYearId: ele.studentCurrentYearId,
                  },
                },
              },
            }));
          });
        }
      })();
      (async () => {
        const response = await config.ssrAPIRequest(
          "GET",
          `student-details-last-four-year/${SSR.ssrID}`
        );

        if (response) {
          response.forEach((ele) => {
            if (ele.category !== null) {
              setFormData((prevFormData) => ({
                ...prevFormData,
                studentCategoryEnrolled: {
                  ...prevFormData.studentCategoryEnrolled,
                  [ele.category]: {
                    ...prevFormData.studentCategoryEnrolled[ele.category],
                    [ele.gender]: {
                      ...prevFormData.studentCategoryEnrolled[ele.category]?.[
                        ele.gender
                      ],
                      Year1: ele.year1 || 0,
                      Year2: ele.year2 || 0,
                      Year3: ele.year3 || 0,
                      Year4: ele.year4 || 0,
                      studentDeatailId: ele.studentDeatailId,
                    },
                  },
                },
              }));
            } else {
              setFormData((prevFormData) => ({
                ...prevFormData,
                programs: {
                  studentDeatailId: ele.studentDeatailId,
                  selfFinanced: ele.selfFinancedPrograms,
                  newProg: ele.newProgramsIntroduced,
                },
                cost: {
                  unitCost: ele.unitCostofEducation,
                  includingSalary: ele.includingSalary,
                  excludingSalary: ele.excludingSalary,
                },
              }));
            }
          });
        }
      })();
      (async () => {
        const response = await config.ssrAPIRequest(
          "GET",
          `staff/${SSR.ssrID}`
        );
        const updatedFormData = { ...formData.teachingStaff };

        response.forEach((item) => {
          const staffType = item.staffType;
          // console.log(staffType);
          const facultyType = facultyTypeMap[item.facultyType];
          const sanctionBody = sanctionBodyMap[item.sanctionedBy];

          if (staffType === "TEACHING_STAFF" && facultyType && sanctionBody) {
            updatedFormData.teachingStaff[`${sanctionBody}${facultyType}`] =
              item.totalStaff;
            updatedFormData.teachingStaff[`${sanctionBody}${facultyType}Male`] =
              item.recruitedMale;
            updatedFormData.teachingStaff[
              `${sanctionBody}${facultyType}Female`
            ] = item.recruitedFemale;
            updatedFormData.teachingStaff[
              `${sanctionBody}${facultyType}Others`
            ] = item.recruitedOther;
            updatedFormData.teachingStaff[
              `${sanctionBody}${facultyType}YetToRecruited`
            ] = item.yetToRecruited;
            updatedFormData.teachingStaff[
              `${sanctionBody}${facultyType}staffId`
            ] = item.staffId;
          }
          if (staffType === "NON_TEACHING_STAFF" && sanctionBody) {
            updatedFormData.nTS[sanctionBody] = item.totalStaff;
            updatedFormData.nTS[`${sanctionBody}Male`] = item.recruitedMale;
            updatedFormData.nTS[`${sanctionBody}Female`] = item.recruitedFemale;
            updatedFormData.nTS[`${sanctionBody}Others`] = item.recruitedOther;
            updatedFormData.nTS[`${sanctionBody}YetToRecruited`] =
              item.yetToRecruited;
            updatedFormData.nTS[`${sanctionBody}staffId`] = item.staffId;
          }
          if (staffType === "TECHNICAL_STAFF" && sanctionBody) {
            updatedFormData.technicalStaff[sanctionBody] = item.totalStaff;
            updatedFormData.technicalStaff[`${sanctionBody}Male`] =
              item.recruitedMale;
            updatedFormData.technicalStaff[`${sanctionBody}Female`] =
              item.recruitedFemale;
            updatedFormData.technicalStaff[`${sanctionBody}Others`] =
              item.recruitedOther;
            updatedFormData.technicalStaff[`${sanctionBody}YetToRecruited`] =
              item.yetToRecruited;
            updatedFormData.technicalStaff[`${sanctionBody}staffId`] =
              item.staffId;
          }
          if (staffType === "GUEST_STAFF") {
            setFormData((prevFormData) => ({
              ...prevFormData,
              guestFaculty: {
                ...prevFormData.guestFaculty,
                staffId: item.staffId,
                male: item.guestFacultiesMale,
                female: item.guestFacultiesFemale,
                others: item.guestFacultiesOther,
              },
            }));
          }
        });
        setFormData((prevFormData) => ({
          ...prevFormData,
          teachingStaff: updatedFormData,
        }));
      })();
    }
  }, [SSR.ssrID]);

  const findSum = (data, Year) => {
    let sum = 0;
    for (const key in data) {
      const a = data[key];
      for (const key in a) {
        sum += a[key][Year];
      }
    }
    return sum;
  };
  return (
    <>
      <div className="p-2">
        <h1 className="text-lg font-bold text-center text-blue-600">SSR</h1>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border border-black bg-gray-200">
              {["Field", "Value", "Status", "Description"].map((header) => (
                <th key={header} className="border-r border-black px-4 py-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(ssrData)
              .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // Sort keys alphabetically
              .map(([key, value]) => (
                <tr key={key} className="border border-black">
                  <td className="border-r border-black px-4 py-2">{key}</td>
                  <td className="border-r border-black px-4 py-2">
                    {typeof SSR[value] === "string" &&
                    SSR[value].endsWith(".pdf") ? (
                      <a
                        className="font-bold cursor-pointer"
                        href={`${config.BASE_URL}/files/view/${SSR[value]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Document
                      </a>
                    ) : (
                      String(SSR[value])
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

      {/* Tables */}

      {/*Position Details of Faculity & Staff in the College*/}
      {formData.teachingStaff.teachingStaff.managementAssistantProfessor && (
        <div className="p-2">
          <FacultyPositionTable formData={formData.teachingStaff} />
        </div>
      )}
      {/* Qualification Details of the Teaching Staff */}
      {formData.qualification.PART_TIME_TEACHER && (
        <div className="p-4">
          <QualificationTable
            formData={formData.qualification}
            category={"PERMANENT_TEACHER"}
            type={"PERMANENT TEACHER"}
          />
          <QualificationTable
            formData={formData.qualification}
            category={"TEMPORARY_TEACHER"}
            type={"TEMPORARY TEACHER"}
          />
          <QualificationTable
            formData={formData.qualification}
            category={"PART_TIME_TEACHER"}
            type={"PART-TIME TEACHER"}
          />
          <ul className="my-4 p-4 border border-black">
            <li>
              <ul className="flex">
                <li className="w-2/5">&nbsp;</li>
                <li className="w-3/5">
                  <ul className="flex">
                    <li className="w-1/4">Male</li>
                    <li className="w-1/4">Female</li>
                    <li className="w-1/4">Others</li>
                    <li className="w-1/4">Total</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <ul className="flex">
                <li className="w-1/3">
                  Number of Visiting/Guest Faculties engaged with the college?
                </li>
                <li className="w-2/3 ml-5">
                  <ul className="flex">
                    <li className="w-1/4 pr-5">
                      <div className="border border-black w-full pl-1">
                        {parseFloat(formData.guestFaculty.male) || ""}
                      </div>
                    </li>
                    <li className="w-1/4 pr-5">
                      <div className="border border-black w-full pl-1">
                        {parseFloat(formData.guestFaculty.female) || ""}
                      </div>
                    </li>
                    <li className="w-1/4 pr-5">
                      <div className="border border-black w-full pl-1">
                        {parseFloat(formData.guestFaculty.others) || ""}
                      </div>
                    </li>
                    <li className="w-1/4">
                      <div className="border border-black w-full pl-1">
                        {parseFloat(formData.guestFaculty.male) +
                          parseFloat(formData.guestFaculty.female) +
                          parseFloat(formData.guestFaculty.others) || 0}
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      )}

      {/* Students Enrolled in the college During the Current Academic Year */}
      {formData.studentCourseEnrolled.PG && (
        <div className="mb-4 p-2">
          <h3 className="text-center font-semibold p-3">
            Details of Students Enrolled in the college During the Current
            Academic Year
          </h3>
          <div className="p-3">
            <table className="w-full rounded-lg w-">
              <tbody>
                <tr className="border border-black relative">
                  <td className="w-1/4 border-black border-r p-2">Program</td>
                  <td className="flex p-0">
                    <div className="w-4/5 p-0">
                      <ul className="flex w-full">
                        <li className="w-1/4 border-black border-r p-1">
                          From the State Where College is Located
                        </li>
                        <li className="w-1/4 border-black border-r p-1">
                          From the Other States of India
                        </li>
                        <li className="w-1/4 border-black border-r p-1">
                          NRI Students
                        </li>
                        <li className="w-1/4 border-black border-r p-1">
                          Foreign Students
                        </li>
                      </ul>
                    </div>
                    <div className="w-1/5">
                      <div className=" border-black p-1">Total</div>
                    </div>
                  </td>
                </tr>
                <StudentEnrolled
                  type={"UG"}
                  formdata={formData.studentCourseEnrolled}
                  total={true}
                />
                <StudentEnrolled
                  type={"PG"}
                  formdata={formData.studentCourseEnrolled}
                  total={true}
                />
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Students Enrolled in the college During the last four Academic Year */}
      {formData.studentCategoryEnrolled.OBC && (
        <div className="mb-4 p-2">
          <h3 className="text-center font-semibold p-3">
            Details of Students Enrolled in the college During the last four
            Academic Year
          </h3>
          <div className="p-3">
            <table className="w-full rounded-lg">
              <tbody>
                <tr className="border border-black">
                  <td className="w-1/4 border-black border-r pb-2">Category</td>
                  <td className="w-3/4 relative p-0">
                    <ul className="flex w-full">
                      <li className="w-1/4 border-black border-r p-1">
                        Year 1
                      </li>
                      <li className="w-1/4 border-black border-r p-1">
                        Year 2
                      </li>
                      <li className="w-1/4 border-black border-r p-1">
                        Year 3
                      </li>
                      <li className="w-1/4 border-black p-1">Year 4</li>
                    </ul>
                  </td>
                </tr>
                <StudentEnrolled
                  type={"SC"}
                  formdata={formData.studentCategoryEnrolled}
                  total={false}
                />
                <StudentEnrolled
                  type={"ST"}
                  formdata={formData.studentCategoryEnrolled}
                  total={false}
                />
                <StudentEnrolled
                  type={"OBC"}
                  formdata={formData.studentCategoryEnrolled}
                  total={false}
                />
                <StudentEnrolled
                  type={"Others"}
                  formdata={formData.studentCategoryEnrolled}
                  total={false}
                />
                <tr className="border border-black relative">
                  <td className="w-1/4 border-black border-r border-b-0 p-0 relative">
                    Total
                  </td>
                  <td className="w-3/4 relative p-0">
                    <ul className="flex w-full border-black">
                      <li className="w-1/4 border-black border-r p-1">
                        <div className="border border-black p-1">
                          {findSum(formData.studentCategoryEnrolled, "Year1")}
                        </div>
                      </li>
                      <li className="w-1/4 border-black border-r p-1">
                        <div className="border border-black p-1">
                          {findSum(formData.studentCategoryEnrolled, "Year2")}
                        </div>
                      </li>
                      <li className="w-1/4 border-black border-r p-1">
                        <div className="border border-black p-1">
                          {findSum(formData.studentCategoryEnrolled, "Year3")}
                        </div>
                      </li>
                      <li className="w-1/4 border-black p-1">
                        <div className="border border-black p-1">
                          {findSum(formData.studentCategoryEnrolled, "Year4")}
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {formData.programs.newProg && formData.cost.unitCost && (
        <div className="mb-4">
          <div className="p-4">
            {/* Number of Programs */}
            <div className="flex border border-black">
              <div className="w-1/5 border-r border-black p-1">
                Number of Programs
              </div>
              <div className="w-2/5 border-r border-black">
                <div className="border-b border-black p-1">
                  Self-financed Programs offered
                </div>
                <div className="p-1 ">
                  <input
                    className="border border-black w-full p-1"
                    type="number"
                    name="selfFinanced"
                    value={parseFloat(formData.programs.selfFinanced) || ""}
                    onChange={(e) => handleChange("programs", e)}
                  />
                </div>
              </div>
              <div className="w-2/5">
                <div className="border-b border-black p-1">
                  New Programs introduced in last five years
                </div>
                <div className="p-1 ">
                  <input
                    className="border border-black w-full p-1"
                    type="number"
                    name="newProg"
                    value={parseFloat(formData.programs.newProg) || ""}
                    onChange={(e) => handleChange("programs", e)}
                  />
                </div>
              </div>
            </div>

            <div className="flex border border-black mt-8 mb-3">
              <div className="w-1/3 border-r border-black">
                <div className="border-b border-black p-1">
                  Unit Cost of Education
                </div>
                <div className="p-1 ">
                  <input
                    className="border border-black w-full p-1"
                    type="number"
                    name="unitCost"
                    value={parseFloat(formData.cost.unitCost) || ""}
                    onChange={(e) => handleChange("cost", e)}
                  />
                </div>
              </div>
              <div className="w-1/3 border-r border-black">
                <div className="border-b border-black p-1">
                  Including Salary component
                </div>
                <div className="p-1 ">
                  <input
                    className="border border-black w-full p-1"
                    type="number"
                    name="includingSalary"
                    value={parseFloat(formData.cost.includingSalary) || ""}
                    onChange={(e) => handleChange("cost", e)}
                  />
                </div>
              </div>
              <div className="w-1/3">
                <div className="border-b border-black p-1">
                  Excluding salary component
                </div>
                <div className="p-1 ">
                  <input
                    className="border border-black w-full p-1"
                    type="number"
                    name="excludingSalary"
                    value={parseFloat(formData.cost.excludingSalary) || ""}
                    onChange={(e) => handleChange("cost", e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SSR;
