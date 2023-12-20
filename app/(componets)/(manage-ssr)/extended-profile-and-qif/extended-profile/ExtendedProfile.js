"use client";
import React, { useEffect, useState } from "react";
import { config } from "apiCalls/Configuration";
import { contextManager } from "context/store";
import ExtendedComponent from "./ExtendedComponent";

const ExtendedProfile = ({ setActiveButton }) => {
  const { collegeData, ssrID } = contextManager();
  const [formData, setFormData] = useState({
    programCourseYear: createYearlyData(),
    programYear: createYearlyData(),
    studentYear: createYearlyData(),
    stuAppearedYear: createYearlyData(),
    stuRevalApplicationsYear: createYearlyData(),
    stuOutgoingYear: createYearlyData(),
    acadCoursesInAllProgsYear: createYearlyData(),
    acadFullTimeTeachYear: createYearlyData(),
    acadSanctionedPostsYear: createYearlyData(),
    addmAppliReceviedYear: createYearlyData(),
    addmReservedSeatsYear: createYearlyData(),
    addmNumOfComputer: 0,
    expenditureWithoutSalaryYear: createYearlyData(),
    addmNumOfClassrooms: 0,
    addmNumOfSeminarHall: 0,
    extendedProfileSSRId: "",
  });

  function createYearlyData() {
    return {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    };
  }

  useEffect(() => {
    config.cookieAssign();
    async function fetchExtendedData() {
      const response = await config.ssrAPIRequest(
        "GET",
        `extended-ssr/${collegeData.collegId}`
      );

      const keysToRemove = [
        "addmNumOfClassrooms",
        "addmNumOfSeminarHall",
        "addmNumOfComputer",
        "extendedProfileSSRId",
      ];
      const updatedMappings = Object.keys(formData).filter(
        (key) => !keysToRemove.includes(key)
      );
      const mappings = updatedMappings.map((key) => key.replace("Year", ""));

      const updatedFormData = { ...formData };
      mappings.forEach((ele) => {
        for (let i = 1; i <= 5; i++) {
          const responseKey = `${ele}Year${i}`;
          updatedFormData[`${ele}Year`][`year${i}`] =
            response[responseKey] === 0 ? "" : response[responseKey];
          if (ele !== "program") {
            updatedFormData[`${ele}Year`][`${ele}InstDataDoc`] =
              response[`${ele}InstDataDoc`];
          }
        }
      });

      Object.assign(updatedFormData, {
        addmNumOfClassrooms: response.addmNumOfClassrooms
          ? response.addmNumOfClassrooms
          : "",
        addmNumOfSeminarHall: response.addmNumOfSeminarHall
          ? response.addmNumOfSeminarHall
          : "",
        addmNumOfComputer: response.addmNumOfComputer
          ? response.addmNumOfComputer
          : "",
        extendedProfileSSRId: response.extendedProfileSSRId,
      });

      setFormData(updatedFormData);
    }

    fetchExtendedData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
      setFormData((prevFormdata) => ({
        ...prevFormdata,
        [name]: numericValue,
      }));
    } else {
      setFormData((prevFormdata) => ({
        ...prevFormdata,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    const formKeys = [
      "programCourseYear",
      "programYear",
      "studentYear",
      "stuAppearedYear",
      "stuRevalApplicationsYear",
      "stuOutgoingYear",
      "acadCoursesInAllProgsYear",
      "acadFullTimeTeachYear",
      "acadSanctionedPostsYear",
      "addmAppliReceviedYear",
      "addmReservedSeatsYear",
      "expenditureWithoutSalaryYear",
      // Add other keys as needed
    ];

    const formsData = new FormData();
    formsData.append("collegeId", collegeData.collegId);
    formsData.append("ssrID", ssrID);
    formsData.append(
      "addmNumOfClassrooms",
      formData.addmNumOfClassrooms ? formData.addmNumOfClassrooms : 0
    );
    formsData.append(
      "addmNumOfComputer",
      formData.addmNumOfComputer ? formData.addmNumOfComputer : 0
    );
    formsData.append(
      "addmNumOfSeminarHall",
      formData.addmNumOfSeminarHall ? formData.addmNumOfSeminarHall : 0
    );
    formKeys.map((ele) => {
      for (let i = 1; i < 6; i++) {
        formsData.append(ele + i, formData[ele]["year" + i]);
      }
    });

    const response = await config.ssrAPIRequest(
      "PUT",
      `extended-ssr/${formData.extendedProfileSSRId}`,
      formsData
    );

    if (response) {
      const isFormDataEmpty = (formData) => {
        for (const key in formData) {
          // Check if the property is not a nested object
          if (typeof formData[key] !== "object") {
            // Check if the property is empty
            if (
              formData[key] === null ||
              formData[key] === undefined ||
              formData[key] === "" ||
              formData[key] === 0
            ) {
              return true; // Field is empty
            }
          } else {
            // Recursively check nested objects
            if (isFormDataEmpty(formData[key])) {
              return true; // Field is empty
            }
          }
        }
        return false; // No empty fields found
      };
      // Example usage
      const isEmpty = isFormDataEmpty(formData);

      if (isEmpty) {
        config.notify("Some field is empty", "success");
      } else {
        const formsData = new FormData();
        formsData.append("collegeID", collegeData.collegId);
        formsData.append("ssrID", ssrID);
        const response = await config.ssrAPIRequest(
          "PUT",
          "qif/new-qif",
          formsData
        );
        if (
          response === "Already Exists" ||
          response === "Saved Successfully"
        ) {
          config.notify("Saved Successfully", "success");
          setActiveButton("QIF");
        } else {
          config.notify("Something went wrong, try again", "error");
        }
      }
    }
  };
  return (
    <>
      {/* Programs */}
      <div className="p-2 ">
        <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
          1 . Program
        </h1>
        <ul className="border border-[#337ab7] p-3 rounded-b-lg bg-white">
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "1.1 . Numbers of courses offered by the institution across all programs during the last five years"
              }
              formData={formData.programCourseYear}
              setFormData={setFormData}
              field={"programCourseYear"}
              upload={true}
              doc={[
                "programCourseInstDataDoc",
                `document-programInstructional`,
              ]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "1.2 . Number of Programmes offered year-wise during the last five years"
              }
              formData={formData.programYear}
              setFormData={setFormData}
              field={"programYear"}
            />
          </li>
        </ul>
      </div>

      {/* Students */}
      <div className="p-2">
        <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
          2 . Students
        </h1>
        <ul className="border border-[#337ab7] p-3 rounded-b-lg bg-white">
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "2.1 . Number of students year-wise during the last five years"
              }
              formData={formData.studentYear}
              setFormData={setFormData}
              field={"studentYear"}
              upload={true}
              doc={["studentInstDataDoc", `document-studentInstructional`]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "2.2 . Number of students appeared in the University examination year- wise during the last five years"
              }
              formData={formData.stuAppearedYear}
              setFormData={setFormData}
              field={"stuAppearedYear"}
              doc={[
                "stuAppearedInstDataDoc",
                `document-stuAppeared-instructional`,
              ]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "2.3 . Number of revaluation applications received year-wise during the last 5 years"
              }
              formData={formData.stuRevalApplicationsYear}
              setFormData={setFormData}
              field={"stuRevalApplicationsYear"}
              doc={[
                "stuRevalApplicationsInstDataDoc",
                `document-stu-rev-appInst`,
              ]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "2.4 . Number of outgoing / final year students year- wise during the last five years"
              }
              formData={formData.stuOutgoingYear}
              setFormData={setFormData}
              field={"stuOutgoingYear"}
              doc={[
                "stuOutgoingInstDataDoc",
                `document-stu-outgoing-instructional`,
              ]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>
        </ul>
      </div>

      {/* Academic Data */}
      <div className="p-2 ">
        <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
          3 . Academic Data
        </h1>
        <ul className="border border-[#337ab7] p-3 rounded-b-lg bg-white">
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "3.1 . Number of courses in all Programmes year-wise during the last five years"
              }
              formData={formData.acadCoursesInAllProgsYear}
              setFormData={setFormData}
              field={"acadCoursesInAllProgsYear"}
              doc={[
                "acadCoursesInAllProgsInstDataDoc",
                `acad-courses-in-all-progs-inst-data-doc`,
              ]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "3.2 . Number of full time teachers year-wise during the last five years"
              }
              formData={formData.acadFullTimeTeachYear}
              setFormData={setFormData}
              field={"acadFullTimeTeachYear"}
              doc={[
                "acadFullTimeTeachInstDataDoc",
                `acad-full-time-teach-inst`,
              ]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "3.3 . Number of sanctioned posts year-wise during the last five years"
              }
              formData={formData.acadSanctionedPostsYear}
              setFormData={setFormData}
              field={"acadSanctionedPostsYear"}
              doc={[
                "acadSanctionedPostsInstDataDoc",
                `acad-sanctioned-posts-inst`,
              ]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>
        </ul>
      </div>

      {/* Admission data */}
      <div className="p-2 ">
        <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
          4 . Admission data
        </h1>
        <ul className="border border-[#337ab7] p-3 rounded-b-lg bg-white">
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "4.1 . Number of eligible applications received for all the Programmes year-wise during the last five years"
              }
              formData={formData.addmAppliReceviedYear}
              setFormData={setFormData}
              field={"addmAppliReceviedYear"}
              doc={["addmAppliReceviedInstDataDoc", `addm-appli-recevied-inst`]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "4.2 . Number of seats earmarked for reserved category as per the GOI/State Govt. rules year- wise during the last five years"
              }
              formData={formData.addmReservedSeatsYear}
              setFormData={setFormData}
              field={"addmReservedSeatsYear"}
              doc={["addmReservedSeatsInstDataDoc", `addm-reserved-seats-inst`]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>

          <li className="p-3 pt-2 border rounded-lg mb-4">
            <div className="w-full">
              4.3 .
              <div className="flex w- full">
                <div className="w-3/5">Total number of classrooms</div>
                <input
                  type="text"
                  className="w-2/5 border border-black"
                  name="addmNumOfClassrooms"
                  value={formData.addmNumOfClassrooms}
                  onChange={handleChange}
                />
              </div>
              <div className="flex w- full pt-2">
                <div className="w-3/5">Total number of Seminar Halls</div>
                <input
                  type="text"
                  className="w-2/5 border border-black"
                  name="addmNumOfSeminarHall"
                  value={formData.addmNumOfSeminarHall}
                  onChange={handleChange}
                />
              </div>
            </div>
          </li>
          <li className="p-3 pt-2 border rounded-lg mb-4 flex">
            <div className="w-3/5">
              4.4 . Total number of computers in the campus for academic purpose
            </div>
            <input
              type="text"
              className=" border border-black w-2/5"
              name="addmNumOfComputer"
              value={formData.addmNumOfComputer}
              onChange={handleChange}
            />
          </li>
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "4.5 . Total Expenditure excluding salary year-wise during the last five years (INR in Lakhs) years"
              }
              formData={formData.expenditureWithoutSalaryYear}
              setFormData={setFormData}
              field={"expenditureWithoutSalaryYear"}
              doc={[
                "expenditureWithoutSalaryInstDataDoc",
                `expenditure-without-salary-inst`,
              ]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>
        </ul>
      </div>
      <div className="flex justify-end pr-2 pb-2">
        <button
          className="px-3 py-1 bg-blue-600 rounded-lg"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default ExtendedProfile;
