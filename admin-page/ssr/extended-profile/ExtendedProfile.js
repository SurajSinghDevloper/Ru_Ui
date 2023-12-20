"use client";
import React, { useEffect, useState } from "react";
import { config } from "apiCalls/Configuration";
import { contextManager } from "context/store";
import ExtendedComponent from "./ExtendedComponent";

const ExtendedProfile = () => {
  const { collegeData } = contextManager();
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
    </>
  );
};

export default ExtendedProfile;
