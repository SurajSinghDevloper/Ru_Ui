"use client";
import React, { useEffect, useState } from "react";
import { config } from "apiCalls/Configuration";
import { contextManager } from "context/store";
import { getCookie } from "cookies-next";
// import DatePicker from "ReusableComponents/DatePicker";

const BasicEligibility = ({ completedForm }) => {
  const [update, setUpdate] = useState(false);

  const { iiqa, collegeData, iiqaUpdate, setIIQAUpdate, setIiqa } =
    contextManager();
  let parts;
  if (!update && iiqa && iiqa.city) {
    setUpdate(true);
  }

  // function formatDate(inputDate) {
  //   if (inputDate) {
  //     const parts = inputDate.split("-");
  //     const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  //     return formattedDate;
  //   } else {
  //     return "";
  //   }
  // }

  // const formattedDate =
  //   iiqa &&
  //   iiqa.date_of_establishment_of_the_Institution &&
  //   formatDate(iiqa.date_of_establishment_of_the_Institution);

  const [formData, setFormData] = useState({
    accreditedcollege: `${
      collegeData.accreditedcollege === "NO" ? "NO" : "YES"
    }`,
    cycleOfAccreditation: `${
      collegeData.accreditedcollege === "NO" ? "Cycle 1" : ""
    }`,
    nameOfHigherEducationInstitution: `${collegeData.collegeName}`,
    city: iiqa.city || "",
    stateOrUT: iiqa.stateOrUT || "",
    district: iiqa.district || "",
    establishmentDate:
      iiqa.date_of_establishment_of_the_Institution &&
      iiqa.date_of_establishment_of_the_Institution.length > 4
        ? iiqa.date_of_establishment_of_the_Institution
        : "",
    establishmentYear:
      iiqa.date_of_establishment_of_the_Institution &&
      iiqa.date_of_establishment_of_the_Institution.length === 4
        ? iiqa.date_of_establishment_of_the_Institution
        : "",
    graduationYear1: (parts && parts[0]) || "", // Initialize with empty values
    graduationYear2: (parts && parts[1]) || "", // Initialize with empty values
  });

  useEffect(() => {
    if (iiqa.years_of_graduation_of_the_last_two_batches) {
      parts = iiqa.years_of_graduation_of_the_last_two_batches.split(",");
    }
    // Update formData when iiqa or collegeData changes
    setFormData((prevFormData) => ({
      ...prevFormData,
      accreditedcollege: collegeData.accreditedcollege === "NO" ? "NO" : "YES",
      cycleOfAccreditation:
        collegeData.accreditedcollege === "NO" ? "Cycle 1" : "",
      nameOfHigherEducationInstitution: collegeData.collegeName || "",
      city: iiqa.city || "",
      stateOrUT: iiqa.stateOrUT || "",
      district: iiqa.district || "",
      establishmentDate:
        iiqa.date_of_establishment_of_the_Institution &&
        iiqa.date_of_establishment_of_the_Institution.length > 4
          ? iiqa.date_of_establishment_of_the_Institution
          : "",
      establishmentYear:
        iiqa.date_of_establishment_of_the_Institution &&
        iiqa.date_of_establishment_of_the_Institution.length === 4
          ? iiqa.date_of_establishment_of_the_Institution
          : "",
      graduationYear1: (parts && parts[0]) || "", // Initialize with empty values
      graduationYear2: (parts && parts[1]) || "",
      // Add other properties as needed
    }));
  }, [iiqa, collegeData]);

  const handleNumChange = (e) => {
    const { name, value } = e.target;
    if (name === "establishmentYear") {
      if (/^[0-9]*$/.test(value)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          establishmentDate: "",
          [name]: value,
        }));
      }
    } else if (/^[0-9]*$/.test(value)) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "establishmentDate") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        establishmentYear: "",
        [name]: value,
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(getCookie("token"));
    const date_of_establishment_of_the_Institution = formData.establishmentDate
      ? formData.establishmentDate
      : formData.establishmentYear;
    const Years_of_graduation_of_the_last_two_batches = `${formData.graduationYear1},${formData.graduationYear2}`;

    const formDatas = new FormData();
    formDatas.append("cycleOfAccreditation", formData.cycleOfAccreditation);
    formDatas.append(
      "nameOfHigherEducationInstitution",
      formData.nameOfHigherEducationInstitution
    );
    formDatas.append("city", formData.city);
    formDatas.append("stateOrUT", formData.stateOrUT);
    formDatas.append("district", formData.district);
    formDatas.append(
      "date_of_establishment_of_the_Institution",
      date_of_establishment_of_the_Institution
    );
    formDatas.append(
      "years_of_graduation_of_the_last_two_batches",
      Years_of_graduation_of_the_last_two_batches
    );

    if (update) {
      try {
        const response = await fetch(
          `${config.BASE_URL}/prepareiiqa/${iiqa.iiqa_ID}/updateBasicEligibility`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDatas,
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setIiqa(data);
          config.notify("Saved", "success");
        } else {
          return;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const response = await fetch(
          `${config.BASE_URL}/prepareiiqa/${collegeData.collegId}/basic-eligibility`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDatas,
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setIiqa(data);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    completedForm("Basic Eligibility");
    setIIQAUpdate(!iiqaUpdate);
  };

  return (
    <>
      <div className="rowbox">
        <div className="lightbg">
          <h2 className="heading2">
            Institutional Information for Quality Assessment (IIQA){" "}
            <small>(For all Colleges including Autonomous Colleges)</small>{" "}
          </h2>
          <h3 className="heading3">
            {collegeData ? collegeData.collegeName : ""}{" "}
          </h3>
        </div>
        <div className="checklabel colsec">
          <label>
            <input
              type="radio"
              name="accreditation"
              value="NO"
              checked={formData.accreditedcollege === "NO"}
              onChange={handleChange}
              disabled={collegeData.accreditedcollege === "YES"}
              required
            />{" "}
            Accreditation
          </label>
          <label>
            <input
              type="radio"
              name="accreditation"
              value="YES"
              checked={formData.accreditedcollege === "YES"}
              onChange={handleChange}
              disabled={collegeData.accreditedcollege === "NO"}
              required
            />{" "}
            Reassessment
          </label>
        </div>

        <form className="formsec" onSubmit={handleSubmit}>
          <div className="flexsec3">
            <>
              <div className="colsec">
                <label>Cycle of Accreditation:</label>
                <input
                  className="forminput"
                  type="text"
                  placeholder="Enter Field 1"
                  name="cycleOfAccreditation"
                  value={`${
                    collegeData.accreditedcollege === "NO"
                      ? "Cycle 1"
                      : formData.cycleOfAccreditation
                  }`}
                  onChange={handleChange}
                  disabled={collegeData.accreditedcollege === "NO"}
                  required
                />
              </div>
            </>

            <>
              <div className="colsec">
                <label>Name of Higher Education Institution:</label>
                <input
                  className="forminput"
                  type="text"
                  placeholder="Enter Field 2"
                  name="nameOfHigherEducationInstitution"
                  value={`${collegeData.collegeName}`}
                  onChange={handleChange}
                  disabled={true}
                  required
                />
              </div>
            </>

            <>
              <div className="colsec">
                <label>City:</label>
                <input
                  className="forminput"
                  type="text"
                  placeholder="Enter Field 3"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </>

            <>
              <div className="colsec">
                <label>State/UT:</label>
                <input
                  className="forminput"
                  type="text"
                  placeholder="Enter Field 4"
                  name="stateOrUT"
                  value={formData.stateOrUT || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </>

            <>
              <div className="colsec">
                <label>District:</label>
                <input
                  className="forminput"
                  type="text"
                  placeholder="Enter Field 5"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>
            </>

            <>
              <div className="colsec">
                <label>Date of establishment of the Institution:</label>
                <div className="flex">
                  <input
                    className="forminput"
                    type="date"
                    name="establishmentDate"
                    value={formData.establishmentDate}
                    onChange={handleChange}
                  />
                  {/* <DatePicker /> */}
                  <div className="p5">OR</div>
                  <input
                    className="forminput"
                    type="text"
                    placeholder="YYYY"
                    name="establishmentYear"
                    value={formData.establishmentYear}
                    onChange={handleNumChange}
                  />
                </div>
              </div>
            </>

            <>
              <div className="colsec">
                <label> Years of Graduation of last two batches:</label>
                <div className="flex justify colspace">
                  <div>
                    <input
                      className="forminput"
                      type="text"
                      placeholder="YEAR 1"
                      name="graduationYear1"
                      value={formData.graduationYear1}
                      onChange={handleNumChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      className="forminput"
                      type="text"
                      placeholder="YEAR 2"
                      name="graduationYear2"
                      value={formData.graduationYear2}
                      onChange={handleNumChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </>
          </div>
          <div className="bottombtn">
            <button type="button" className="btns cancelbtn">
              Cancel
            </button>
            <button type="submit" className="btns submitbtn">
              Save and Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BasicEligibility;
