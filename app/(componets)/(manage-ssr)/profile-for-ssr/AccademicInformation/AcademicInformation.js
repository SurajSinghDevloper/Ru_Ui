"use client";
import React, { useEffect, useState } from "react";
import { config } from "apiCalls/Configuration";
import Form1 from "./Form1";
import QualificationTable from "./QualificationTable";
import StudentEnrolled from "./StudentEnrolled";
import { contextManager } from "context/store";
import SubmitModal from "./SubmitModal";

const AcademicInformation = () => {
  const { ssrID, collegeData, setSelectedMenu } = contextManager();
  const qualifications = ["DSC_DLITT", "PHD", "MPHIL", "PG"];
  const categories = [
    "PERMANENT_TEACHER",
    "TEMPORARY_TEACHER",
    "PART_TIME_TEACHER",
  ];
  const program = ["UG", "PG"];
  const stuCategory = ["ST", "SC", "OBC", "Others"];
  const sanctionAuth = ["management", "ugc"];
  const facultyType = ["Professor", "AssociateProfessor", "AssistantProfessor"];
  const staffType = ["teachingStaff", "nTS", "technicalStaff"];
  const [formData, setFormData] = useState({
    teachingStaff: createEmptyTeachingstaff(),
    qualification: createEmptyQualification(),
    guestFaculty: { male: 0, female: 0, others: 0 },
    studentCourseEnrolled: createEmptyStudentEnrolled(),
    studentCategoryEnrolled: createEmptyCategoryStudentEnrolled(),
    progrmas: {
      selfFinanced: 0,
      newProg: 0,
    },
    cost: {
      unitCost: 0,
      includingSalary: 0,
      excludingSalary: 0,
    },
    progDetails: {
      level: "",
      language: [],
    },
  });

  const [finalsubmitState, setFinalSubmitState] = useState(false);

  function createEmptyQualification() {
    return categories.reduce((categoryAcc, category) => {
      categoryAcc[category] = qualifications.reduce(
        (qualificationAcc, qualification) => {
          qualificationAcc[qualification] = {
            PROFESSOR: createEmptyGender(),
            ASSOCIATE_PROFESSOR: createEmptyGender(),
            ASSISTANT_PROFESSOR: createEmptyGender(),
          };
          return qualificationAcc;
        },
        {}
      );
      return categoryAcc;
    }, {});
  }

  function createEmptyTeachingstaff() {
    return staffType.reduce((staffACC, category) => {
      staffACC[category] = {};
      sanctionAuth.forEach((sanct) => {
        if (category === "teachingStaff") {
          facultyType.forEach((ele) => {
            staffACC[category][sanct + ele] = 0;
            staffACC[category][sanct + ele + "Male"] = 0;
            staffACC[category][sanct + ele + "Female"] = 0;
            staffACC[category][sanct + ele + "Others"] = 0;
            staffACC[category][sanct + ele + "YetToRecruited"] = 0;
          });
        } else {
          staffACC[category][sanct] = 0;
          staffACC[category][sanct + "Male"] = 0;
          staffACC[category][sanct + "Female"] = 0;
          staffACC[category][sanct + "Others"] = 0;
          staffACC[category][sanct + "YetToRecruited"] = 0;
        }
      });

      return staffACC;
    }, {});
  }

  function createEmptyStudentEnrolled() {
    return program.reduce((programAcc, prog) => {
      programAcc[prog] = {
        Male: createEmptyProgType(),
        Female: createEmptyProgType(),
        Others: createEmptyProgType(),
      };
      return programAcc;
    }, {});
  }

  function createEmptyCategoryStudentEnrolled() {
    return stuCategory.reduce((stuCategoryAcc, prog) => {
      stuCategoryAcc[prog] = {
        Male: createEmptyProgYear(),
        Female: createEmptyProgYear(),
        Others: createEmptyProgYear(),
      };
      return stuCategoryAcc; // Add this line to return the accumulator
    }, {});
  }

  function createEmptyGender() {
    return {
      maleTeacher: 0,
      femaleTeacher: 0,
      otherTeacher: 0,
    };
  }
  function createEmptyProgType() {
    return {
      CollegeState: 0,
      OtherState: 0,
      NRI: 0,
      Foreign: 0,
    };
  }
  function createEmptyProgYear() {
    return {
      Year1: 0,
      Year2: 0,
      Year3: 0,
      Year4: 0,
    };
  }

  useEffect(() => {
    if (ssrID) {
      (async () => {
        const response = await config.ssrAPIRequest(
          "GET",
          `staff-details/${ssrID}`
        );
        response &&
          response.map((ele) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              qualification: {
                ...prevFormData.qualification,
                [ele.teacherType]: {
                  ...prevFormData.qualification[ele.teacherType],
                  [ele.qualifications]: {
                    ...prevFormData.qualification[ele.teacherType][
                      ele.qualifications
                    ],
                    [ele.facultyType]: {
                      ...prevFormData.qualification[ele.teacherType][
                        ele.qualifications
                      ][ele.facultyType],
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
      })();
      (async function fetchStudentYearwise() {
        const response = await config.ssrAPIRequest(
          "GET",
          `student-details/${ssrID}`
        );
        response &&
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
      })();
      (async function fetchStudentCatwise() {
        const response = await config.ssrAPIRequest(
          "GET",
          `student-details-last-four-year/${ssrID}`
        );

        response &&
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
                progrmas: {
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
      })();
    }
  }, [ssrID]);

  const handleChange = (section, e) => {
    const { name, value } = e.target;

    // Check if the input is a valid number
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [section]: {
          ...prevFormData[section],
          [name]: numericValue,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [section]: {
          ...prevFormData[section],
          [name]: 0,
        },
      }));
    }
  };

  const handleLangChange = (e) => {
    const selectedLanguage = e.target.value;
    console.log(selectedLanguage);
    const isLanguageSelected =
      formData.progDetails.language.includes(selectedLanguage);

    if (isLanguageSelected) {
      // If the language is already selected, remove it from the array
      setFormData((prevFormData) => ({
        ...prevFormData,
        progDetails: {
          ...prevFormData.progDetails,
          language: prevFormData.progDetails.language.filter(
            (lang) => lang !== selectedLanguage
          ),
        },
      }));
    }
    // If the language is not already selected, add it to the array
    else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        progDetails: {
          ...prevFormData.progDetails,
          language: [...prevFormData.progDetails.language, selectedLanguage],
        },
      }));
    }
  };

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

  const handleSubmit = () => {
    const submitStaff = async () => {
      const staffType = {
        TEACHING_STAFF: "teachingStaff",
        NON_TEACHING_STAFF: "nTS",
        TECHNICAL_STAFF: "technicalStaff",
      };

      const sanctionBodyMap = {
        UGC: "ugc",
        MANAGEMENT: "management",
      };

      const facultyTypeMap = {
        PROFESSOR: "Professor",
        ASSOCIATE_PROFESSOR: "AssociateProfessor",
        ASSISTANT_PROFESSOR: "AssistantProfessor",
      };

      for (const staff in staffType) {
        for (const sanctioned in sanctionBodyMap) {
          const isTeachingStaff = staffType[staff] === "teachingStaff";

          if (isTeachingStaff) {
            for (const faculty in facultyTypeMap) {
              const formItemKey = `${sanctionBodyMap[sanctioned]}${facultyTypeMap[faculty]}`;
              const staffIdKey = `${sanctionBodyMap[sanctioned]}${facultyTypeMap[faculty]}staffId`;
              const Method = formData[staffType[staff]][staffIdKey]
                ? "PUT"
                : "POST";

              // FormData Append
              const formsData = new FormData();
              formsData.append("ssrId", ssrID);
              formsData.append("staffType", staff);
              formsData.append("sanctionedBy", sanctioned);
              formsData.append("facultyType", faculty);
              formsData.append(
                "totalStaff",
                formData.teachingStaff[staffType[staff]][formItemKey]
              );
              formsData.append(
                "recruitedMale",
                formData.teachingStaff[staffType[staff]][`${formItemKey}Male`]
              );
              formsData.append(
                "recruitedFemale",
                formData.teachingStaff[staffType[staff]][`${formItemKey}Female`]
              );
              formsData.append(
                "recruitedOther",
                formData.teachingStaff[staffType[staff]][`${formItemKey}Others`]
              );
              formsData.append(
                "yetToRecruited",
                formData.teachingStaff[staffType[staff]][
                  `${formItemKey}YetToRecruited`
                ]
              );
              const response = await config.ssrAPIRequest(
                Method,
                Method === "POST"
                  ? "staff"
                  : `staff/${
                      formData.teachingStaff[staffType[staff]][staffIdKey]
                    }`,
                formsData
              );
            }
          } else {
            const formItemKey = sanctionBodyMap[sanctioned];
            const staffIdKey = `${sanctionBodyMap[sanctioned]}staffId`;
            const Method = formData.teachingStaff[staffType[staff]][staffIdKey]
              ? "PUT"
              : "POST";

            // FormData Append
            const formsData = new FormData();
            formsData.append("ssrId", ssrID);
            formsData.append("staffType", staff);
            formsData.append("sanctionedBy", sanctioned);
            formsData.append(
              "totalStaff",
              formData.teachingStaff[staffType[staff]][formItemKey]
            );
            formsData.append(
              "recruitedMale",
              formData.teachingStaff[staffType[staff]][`${formItemKey}Male`]
            );
            formsData.append(
              "recruitedFemale",
              formData.teachingStaff[staffType[staff]][`${formItemKey}Female`]
            );
            formsData.append(
              "recruitedOther",
              formData.teachingStaff[staffType[staff]][`${formItemKey}Others`]
            );
            formsData.append(
              "yetToRecruited",
              formData.teachingStaff[staffType[staff]][
                `${formItemKey}YetToRecruited`
              ]
            );
            const response = await config.ssrAPIRequest(
              Method,
              Method === "POST"
                ? "staff"
                : `staff/${
                    formData.teachingStaff[staffType[staff]][staffIdKey]
                  }`,
              formsData
            );
          }
        }
      }
    };
    const submitSatffDetails = async () => {
      const facultyType = {
        PROFESSOR: "PROFESSOR",
        ASSOCIATE_PROFESSOR: "ASSOCIATE_PROFESSOR",
        ASSISTANT_PROFESSOR: "ASSISTANT_PROFESSOR",
      };

      for (const teacherType in categories) {
        for (const degree in qualifications) {
          for (const type in facultyType) {
            const data =
              formData.qualification[categories[teacherType]][
                qualifications[degree]
              ];
            const totalSum = Object.values(data).reduce(
              (acc, category) =>
                acc +
                category.maleTeacher +
                category.femaleTeacher +
                category.otherTeacher,
              0
            );

            const staffid =
              formData.qualification[categories[teacherType]][
                qualifications[degree]
              ][type].staffDetailsId &&
              formData.qualification[categories[teacherType]][
                qualifications[degree]
              ][type].staffDetailsId;

            const formsData = new FormData();
            formsData.append("ssrId", ssrID);
            formsData.append("qualifications", qualifications[degree]);
            formsData.append("teacherType", categories[teacherType]);
            formsData.append("facultyType", type);
            formsData.append(
              "maleTeacher",
              formData.qualification[categories[teacherType]][
                qualifications[degree]
              ][type].maleTeacher
            );
            formsData.append(
              "femaleTeacher",
              formData.qualification[categories[teacherType]][
                qualifications[degree]
              ][type].femaleTeacher
            );
            formsData.append(
              "otherTeacher",
              formData.qualification[categories[teacherType]][
                qualifications[degree]
              ][type].otherTeacher
            );
            formsData.append("totalTeacher", totalSum);

            const response = await config.ssrAPIRequest(
              `${staffid ? "PUT" : "POST"}`,
              `staff-details${staffid ? "/" + staffid : ""}`,
              formsData
            );
            // console.log(response);
          }
        }
      }
    };
    const submitGuestFaculty = async () => {
      const total =
        formData.guestFaculty.male +
        formData.guestFaculty.female +
        formData.guestFaculty.others;
      const formsData = new FormData();
      formsData.append("guestFacultiesMale", formData.guestFaculty.male);
      formsData.append("guestFacultiesFemale", formData.guestFaculty.female);
      formsData.append("guestFacultiesOther", formData.guestFaculty.others);
      formsData.append("guestFacultiesTotal", total);
      formsData.append("staffType", "GUEST_STAFF");
      formsData.append("ssrId", ssrID);

      const response = await config.ssrAPIRequest(
        "PUT",
        `staff-guest/${
          formData.guestFaculty.staffId ? formData.guestFaculty.staffId : ""
        }`,
        formsData
      );
      // console.log(response);
    };
    const submitProgDetails = async () => {
      const formsData = new FormData();
      formsData.append("selfFinancedPrograms", formData.progrmas.selfFinanced);
      formsData.append("newProgramsIntroduced", formData.progrmas.newProg);
      formsData.append("unitCostofEducation", formData.cost.unitCost);
      formsData.append("includingSalary", formData.cost.includingSalary);
      formsData.append("excludingSalary", formData.cost.excludingSalary);
      formsData.append("ssrId", ssrID);

      const response = await config.ssrAPIRequest(
        "PUT",
        `student-details-enrolled${
          formData.progrmas.studentDeatailId
            ? "/" + formData.progrmas.studentDeatailId
            : ""
        }`,
        formsData
      );
      console.log(response);
    };
    const submitStuCourseEnrolled = async () => {
      const gender = ["Male", "Female", "Others"];
      program.map((prog) => {
        gender.map(async (gender) => {
          const studentId =
            formData.studentCourseEnrolled[prog][gender].studentCurrentYearId &&
            formData.studentCourseEnrolled[prog][gender].studentCurrentYearId;
          const total =
            formData.studentCourseEnrolled[prog][gender].CollegeState +
            formData.studentCourseEnrolled[prog][gender].OtherState +
            formData.studentCourseEnrolled[prog][gender].NRI +
            formData.studentCourseEnrolled[prog][gender].Foreign;
          const formsData = new FormData();
          formsData.append("ssrId", ssrID);
          formsData.append("program", prog);
          formsData.append("gender", gender);
          formsData.append(
            "fromState",
            formData.studentCourseEnrolled[prog][gender].CollegeState
          );
          formsData.append(
            "fromOther",
            formData.studentCourseEnrolled[prog][gender].OtherState
          );
          formsData.append(
            "nriStudent",
            formData.studentCourseEnrolled[prog][gender].NRI
          );
          formsData.append(
            "foreignStudent",
            formData.studentCourseEnrolled[prog][gender].Foreign
          );
          formsData.append("total", total);

          const response = await config.ssrAPIRequest(
            `${studentId ? "PUT" : "POST"}`,
            `student-details${studentId ? "/" + studentId : ""}`,
            formsData
          );
          console.log(response);
        });
      });
    };
    const submitStuCatEnrolled = async () => {
      const gender = ["Male", "Female", "Others"];
      stuCategory.map((prog) => {
        gender.map(async (gender) => {
          const studentId =
            formData.studentCategoryEnrolled[prog][gender].studentDeatailId &&
            formData.studentCategoryEnrolled[prog][gender].studentDeatailId;

          const formsData = new FormData();
          formsData.append("ssrId", ssrID);
          formsData.append("category", prog);
          formsData.append("gender", gender);
          formsData.append(
            "year1",
            formData.studentCategoryEnrolled[prog][gender].Year1
          );
          formsData.append(
            "year2",
            formData.studentCategoryEnrolled[prog][gender].Year2
          );
          formsData.append(
            "year3",
            formData.studentCategoryEnrolled[prog][gender].Year3
          );
          formsData.append(
            "year4",
            formData.studentCategoryEnrolled[prog][gender].Year4
          );

          // console.log(formsData);

          const response = await config.ssrAPIRequest(
            `${studentId ? "PUT" : "POST"}`,
            `student-details-last-four-year${studentId ? "/" + studentId : ""}`,
            formsData
          );
        });
      });
    };
    submitStaff();
    submitSatffDetails();
    submitGuestFaculty();
    submitStuCourseEnrolled();
    submitStuCatEnrolled();
    submitProgDetails();
  };

  const finalsubmit = async () => {
    const formsData = new FormData();
    formsData.append("ssrID", ssrID);
    formsData.append("collegeId", collegeData.collegId);
    const response = await config.ssrAPIRequest(
      "PUT",
      "academic-ssr",
      formsData
    );
    if (response === "Already Exists" || response === "Saved Successfully") {
      setSelectedMenu("Extended Profile & QIF");
    }
  };

  return (
    <>
      <div className="p-2 items-center justify-center">
        <h1 className="bg-[#337ab7] p-2 border border-cyan-700 rounded-b-none rounded-lg text-white">
          Academic Information
        </h1>
        <div className="border border-[#337ab7] rounded-b-lg card">
          <div className="p-3 pt-2 rounded-lg bg-white">
            <div className="horizontalScroll overflow-hidden">
              <div className="horizontal-scrolling">
                Note: This form will automaticaly colsed after 30 min
              </div>
            </div>

            {/*Details Of Program Offered by the college (give the data for current accademic year)*/}
            {/* <div className="border rounded-lg mb-4">
              <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
                Details Of Program Offered by the college (give the data for
                current accademic year)
              </h3>
              <div className="container p-3">
                <table className="w-full rounded-lg">
                  <tbody>
                    <tr className="text-sm">
                      <td className="w-1/12 pl-2 pr-3 py-1">
                        <span className="">Level of program</span>
                      </td>
                      <td className="w-2/12 pl-2 pr-3 py-1">
                        <span className="">Name of Program/Course</span>
                      </td>
                      <td className="w-1/12 pl-2 pr-3 py-1">
                        <span className="">Duration in months</span>
                      </td>
                      <td className="w-2/12 pl-2 pr-3 py-1">
                        <span className="">Entry Qualification</span>
                      </td>
                      <td className="w-2/12 pl-2 pr-3 py-1">
                        <span className="">Medium Of Instruction</span>
                      </td>
                      <td className="w-2/12 pl-2 pr-3 py-1">
                        <span className="">Sectioned Strength</span>
                      </td>
                      <td className="w-2/12 pl-2 pr-3 py-1">
                        <span className="">Number of student admited</span>
                      </td>
                    </tr>
                    <tr className="">
                      <td className="w-1/12 pl-2 pr-2 py-1">
                        <input
                          className="border block w-16"
                          type="text"
                          name="level"
                          value={formData.progDetails.level || ""}
                          onChange={(e) => handleChange("progDetails", e)}
                        />
                      </td>
                      <td className="w-2/12 pl-2 pr-2 py-1">
                        <input
                          className="border block w-36"
                          type="text"
                          name="name"
                          value={formData.progDetails.name || ""}
                          onChange={(e) => handleChange("progDetails", e)}
                        />
                      </td>
                      <td className="w-1/12 pl-2 pr-2 py-1">
                        <input
                          className="border block w-16"
                          type="text"
                          name="duration"
                          value={formData.progDetails.duration || ""}
                          onChange={(e) => handleChange("progDetails", e)}
                        />
                      </td>
                      <td className="w-2/12 pl-2 pr-2 py-1">
                        <input
                          className="border block w-36"
                          type="text"
                          name="qualification"
                          value={formData.progDetails.qualification || ""}
                          onChange={(e) => handleChange("progDetails", e)}
                        />
                      </td>
                      <td className="w-2/12 pl-2 pr-2 py-1">
                        <select
                          className="border block w-36"
                          name="language"
                          onChange={handleLangChange}
                          value={
                            formData.progDetails.language.length === 0 && ""
                          }
                        >
                          <option defaultValue="">Select Language</option>
                          <option
                            value="English"
                            className="hover:bg-green-500"
                          >
                            English
                          </option>
                          <option value="Hindi" className="hover:bg-green-500">
                            Hindi
                          </option>
                          <option
                            value="Sanskrit"
                            className="hover:bg-green-500"
                          >
                            Sanskrit
                          </option>
                        </select>
                      </td>
                      <td className="w-2/12 pl-2 pr-2 py-1">
                        <input
                          className="border block w-36"
                          type="text"
                          name="strength"
                          value={formData.progDetails.strength || ""}
                          onChange={(e) => handleChange("progDetails", e)}
                        />
                      </td>
                      <td className="w-2/12 pl-2 pr-2 py-1">
                        <input
                          className="border block w-36"
                          type="text"
                          name="stuAdmitted"
                          value={formData.progDetails.stuAdmitted || ""}
                          onChange={(e) => handleChange("progDetails", e)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}

            {/*Position Details of Faculity & Staff in the College*/}
            <Form1
              formData={formData.teachingStaff}
              setFormData={setFormData}
            />

            {/* Qualification Details of the Teaching Staff */}
            <div className="border rounded-lg mb-4">
              <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
                Qualification Details of the Teaching Staff{" "}
                <b
                  className="text-blue-600 cursor-pointer"
                  title="(Consider highest qualification only for each teacher. Do not recount for other qualifications.)"
                >
                  ?
                </b>
              </h3>
              <div className="container p-3">
                {/* Permanent Teachers */}
                <QualificationTable
                  formData={formData.qualification}
                  setFormData={setFormData}
                  category={"PERMANENT_TEACHER"}
                  type={"PERMANENT TEACHER"}
                />
                <br />

                {/* Temporary Teachers */}
                <QualificationTable
                  formData={formData.qualification}
                  setFormData={setFormData}
                  category={"TEMPORARY_TEACHER"}
                  type={"TEMPORARY TEACHER"}
                />
                <br />

                {/* Part Time Teachers */}
                <QualificationTable
                  formData={formData.qualification}
                  setFormData={setFormData}
                  category={"PART_TIME_TEACHER"}
                  type={"PART-TIME TEACHER"}
                />
              </div>
            </div>

            {/* Details of Visiting/Guest Faculties */}
            <div className="border rounded-lg mb-4">
              <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
                Details of Visiting/Guest Faculties
              </h3>
              <div className="container p-3">
                <ul>
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
                        Number of Visiting/Guest Faculties engaged with the
                        college?
                      </li>
                      <li className="w-2/3">
                        <ul className="flex">
                          <li className="w-1/4 pr-5">
                            <input
                              className="border border-black w-full"
                              type="number"
                              name="male"
                              value={
                                parseFloat(formData.guestFaculty.male) || ""
                              }
                              onChange={(e) => handleChange("guestFaculty", e)}
                            />
                          </li>
                          <li className="w-1/4 pr-5">
                            <input
                              className="border border-black w-full"
                              type="number"
                              name="female"
                              value={
                                parseFloat(formData.guestFaculty.female) || ""
                              }
                              onChange={(e) => handleChange("guestFaculty", e)}
                            />
                          </li>
                          <li className="w-1/4 pr-5">
                            <input
                              className="border border-black w-full"
                              type="number"
                              name="others"
                              value={
                                parseFloat(formData.guestFaculty.others) || ""
                              }
                              onChange={(e) => handleChange("guestFaculty", e)}
                            />
                          </li>
                          <li className="w-1/4 pr-5">
                            <div className="border border-black w-full">
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
                <span className="w-[30%]"></span>
                <span></span>
              </div>
            </div>

            {/* Students Enrolled in the college During the Current Academic Year */}
            <div className="border rounded-lg mb-4">
              <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
                Provide the Following Details of Students Enrolled in the
                college During the Current Academic Year
              </h3>
              <div className="container p-3">
                <table className="w-full rounded-lg w-">
                  <tbody>
                    <tr className="border border-black relative">
                      <td className="w-1/4 border-black border-r p-2">
                        Program
                      </td>
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
                      setFormData={setFormData}
                      total={true}
                    />
                    <StudentEnrolled
                      type={"PG"}
                      formdata={formData.studentCourseEnrolled}
                      setFormData={setFormData}
                      total={true}
                    />
                  </tbody>
                </table>
              </div>
            </div>

            {/* Students Enrolled in the college During the last four Academic Year */}
            <div className="border rounded-lg mb-4">
              <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
                Provide the Following Details of Students Enrolled in the
                college During the last four Academic Year
              </h3>
              <div className="container p-3">
                <table className="w-full rounded-lg">
                  <tbody>
                    <tr className="border border-black">
                      <td className="w-1/4 border-black border-r pb-2">
                        Category
                      </td>
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
                      setFormData={setFormData}
                      total={false}
                    />
                    <StudentEnrolled
                      type={"ST"}
                      formdata={formData.studentCategoryEnrolled}
                      setFormData={setFormData}
                      total={false}
                    />
                    <StudentEnrolled
                      type={"OBC"}
                      formdata={formData.studentCategoryEnrolled}
                      setFormData={setFormData}
                      total={false}
                    />
                    <StudentEnrolled
                      type={"Others"}
                      formdata={formData.studentCategoryEnrolled}
                      setFormData={setFormData}
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
                              {findSum(
                                formData.studentCategoryEnrolled,
                                "Year1"
                              )}
                            </div>
                          </li>
                          <li className="w-1/4 border-black border-r p-1">
                            <div className="border border-black p-1">
                              {findSum(
                                formData.studentCategoryEnrolled,
                                "Year2"
                              )}
                            </div>
                          </li>
                          <li className="w-1/4 border-black border-r p-1">
                            <div className="border border-black p-1">
                              {findSum(
                                formData.studentCategoryEnrolled,
                                "Year3"
                              )}
                            </div>
                          </li>
                          <li className="w-1/4 border-black p-1">
                            <div className="border border-black p-1">
                              {findSum(
                                formData.studentCategoryEnrolled,
                                "Year4"
                              )}
                            </div>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Provide few more details */}
            <div className="border rounded-lg mb-4">
              <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3 ">
                Provide the Following Details of Students Enrolled in the
                college During the last four Academic Year
              </h3>
              <div className="container p-3">
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
                        value={parseFloat(formData.progrmas.selfFinanced) || ""}
                        onChange={(e) => handleChange("progrmas", e)}
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
                        value={parseFloat(formData.progrmas.newProg) || ""}
                        onChange={(e) => handleChange("progrmas", e)}
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
                <i>
                  <span className="text-red-600">**</span>Formula: (Unit cost =
                  total annual recurring expenditure (actual) dividev by total
                  number of students enrolled )
                </i>
              </div>
              <div className="text-center pb-2">
                <button
                  className="border p-1 px-4 mr-4 rounded-md bg-yellow-500"
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  className="border p-1 rounded-md bg-[#3391b7]"
                  onClick={() => setFinalSubmitState(true)}
                >
                  Save and Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        {finalsubmitState && (
          <SubmitModal
            setFinalSubmitState={setFinalSubmitState}
            finalsubmit={finalsubmit}
          />
        )}
      </div>
    </>
  );
};
export default AcademicInformation;
