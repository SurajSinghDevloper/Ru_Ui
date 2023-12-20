"use client";
import React, { useState, useEffect } from "react";
import { config } from "apiCalls/Configuration";
import { contextManager } from "context/store";

const Form1 = ({ formData, setFormData }) => {
  const { ssrID, setSSRID, collegeData } = contextManager();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const ssr = await config.ssrAPIRequest(
        "GET",
        `ssr-specifics/${collegeData.collegId}`
      );
      setSSRID(ssr.ssrID);
    })();
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
    if (ssrID) {
      async function fetchData() {
        const response = await config.ssrAPIRequest("GET", `staff/${ssrID}`);
        const updatedFormData = { ...formData };

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
      }
      fetchData();
    }
  }, [ssrID]);

  const handleChange = (section, e) => {
    const { name, value } = e.target;

    // Check if the input is a valid number
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        teachingStaff: {
          ...prevFormData.teachingStaff,
          [section]: {
            ...prevFormData.teachingStaff[section],
            [name]: parsedValue,
          },
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        teachingStaff: {
          ...prevFormData.teachingStaff,
          [section]: {
            ...prevFormData.teachingStaff[section],
            [name]: "",
          },
        },
      }));
    }
  };

  useEffect(() => {
    if (
      formData.teachingStaff.ugcProfessorYetToRecruited < 0 ||
      formData.teachingStaff.ugcAssociateProfessorYetToRecruited < 0 ||
      formData.teachingStaff.ugcAssistantProfessorYetToRecruited < 0 ||
      formData.teachingStaff.managementProfessorYetToRecruited < 0 ||
      formData.teachingStaff.managementAssociateProfessorYetToRecruited < 0 ||
      formData.teachingStaff.managementAssistantProfessorYetToRecruited < 0 ||
      formData.nTS.ugcYetToRecruited < 0 ||
      formData.nTS.managementYetToRecruited < 0 ||
      formData.technicalStaff.ugcYetToRecruited < 0 ||
      formData.technicalStaff.managementYetToRecruited < 0
    ) {
      setModalOpen(true);
    }
  }, [formData]);

  return (
    <div className="border rounded-lg mb-4">
      <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
        Position Details of Faculity & Staff in the College
      </h3>
      <div className="container p-3">
        <h3 className="font-bold">Teaching Staff</h3>
        <table className="w-full">
          <tbody>
            <tr className="w-full">
              <td className="border border-black w-1/6">&nbsp;</td>
              <td className="border border-black" style={{ width: "27.7777%" }}>
                Professor
              </td>
              <td
                className="border border-black "
                style={{ width: "27.7777%" }}
              >
                Associate Professor
              </td>
              <td
                className="border border-black "
                style={{ width: "27.7777%" }}
              >
                Assistant Professor
              </td>
            </tr>
            <tr className="w-full">
              <td className="border border-black">
                <span></span>
              </td>
              <td className="border border-black p-0">
                <div className="flex">
                  <div className="w-1/4 border-black border-r">Male</div>
                  <div className="w-1/4 border-black border-r">Female</div>
                  <div className="w-1/4 border-black border-r">Others</div>
                  <div className="w-1/4 border-black">Total</div>
                </div>
              </td>
              <td className="border border-black p-0">
                <div className="flex">
                  <div className="w-1/4 border-black border-r">Male</div>
                  <div className="w-1/4 border-black border-r">Female</div>
                  <div className="w-1/4 border-black border-r">Others</div>
                  <div className="w-1/4 border-black">Total</div>
                </div>
              </td>
              <td className="border border-black p-0">
                <div className="flex">
                  <div className="w-1/4 border-black border-r">Male</div>
                  <div className="w-1/4 border-black border-r">Female</div>
                  <div className="w-1/4 border-black border-r">Others</div>
                  <div className="w-1/4 border-black">Total</div>
                </div>
              </td>
            </tr>

            {/* Sanctioned by UGC /University State Government */}
            <Sanctioned
              formData={formData}
              type="ugc"
              handleChange={handleChange}
            />
            {/* Recruited */}
            <Recruited
              formData={formData}
              type="ugc"
              handleChange={handleChange}
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              setFormData={setFormData}
            />
            {/* Yet to Recruit */}
            <YetToRecruit
              formData={formData}
              type="ugc"
              handleChange={handleChange}
              setFormData={setFormData}
            />

            {/* Sanctioned by the Management/Society or Other Authorized Bodies */}
            <Sanctioned
              formData={formData}
              type="management"
              handleChange={handleChange}
            />
            {/* Recruited */}
            <Recruited
              formData={formData}
              type="management"
              handleChange={handleChange}
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              setFormData={setFormData}
            />
            {/* Yet to Recruit */}
            <YetToRecruit
              formData={formData}
              type="management"
              handleChange={handleChange}
            />
          </tbody>
        </table>
        <br />

        {/* Non-Teaching Staff */}
        <h3 className="font-bold">Non-Teaching Staff</h3>
        <StaffForm
          formData={formData}
          staffType={"nTS"}
          handleChange={handleChange}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          setFormData={setFormData}
        />

        {/* Technical Staff */}
        <h3 className="font-bold">Technical Staff</h3>
        <StaffForm
          formData={formData}
          staffType={"technicalStaff"}
          handleChange={handleChange}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default Form1;

export const YetToRecruit = ({ formData, type }) => {
  const calculateYetToRecruit = (faculty) => {
    const parseAndDefaultToZero = (value) => parseFloat(value) || 0;

    return (
      parseAndDefaultToZero(formData.teachingStaff[type + faculty]) -
      (parseAndDefaultToZero(formData.teachingStaff[type + faculty + "Male"]) +
        parseAndDefaultToZero(
          formData.teachingStaff[type + faculty + "Others"]
        ) +
        parseAndDefaultToZero(
          formData.teachingStaff[type + faculty + "Female"]
        ))
    );
  };
  return (
    <tr className="w-full">
      <td className="border border-black">Yet to Recruit</td>
      <td className="border border-black border-t-0 px-1">
        <div className="border border-black top-0">
          {calculateYetToRecruit("Professor")}
        </div>
      </td>
      <td className="border border-black border-t-0 px-1">
        <div className="border border-black top-0">
          {calculateYetToRecruit("AssociateProfessor")}
        </div>
      </td>
      <td className="border border-black border-t-0 p-1">
        <div className="border border-black top-0">
          {calculateYetToRecruit("AssistantProfessor")}
        </div>
      </td>
    </tr>
  );
};

export const Recruited = ({
  formData,
  type,
  handleChange,
  isModalOpen,
  setModalOpen,
  setFormData,
}) => {
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFormChange = (section, total, state, e) => {
    const { name, value } = e.target;
    //Total recruited staff
    const a =
      formData[section][`${total}Male`] +
      formData[section][`${total}Female`] +
      formData[section][`${total}Others`];
    //
    const final = a - (formData[section][name] - parseFloat(value));

    if (!isNaN(parseFloat(value))) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [section]: {
          ...prevFormData[section],
          [section]: {
            ...prevFormData[section][section],
            [state]: formData[section][total] - final,
          },
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [section]: {
          ...prevFormData[section],
          [section]: {
            ...prevFormData[section][section],
            [state]: formData[section][state] + formData[section][name],
          },
        },
      }));
    }
  };

  const calculateProfessorTotal = (faculty) => {
    const parseAndDefaultToZero = (value) => parseFloat(value) || 0;

    return (
      parseAndDefaultToZero(formData.teachingStaff[type + faculty + "Male"]) +
      parseAndDefaultToZero(formData.teachingStaff[type + faculty + "Others"]) +
      parseAndDefaultToZero(formData.teachingStaff[type + faculty + "Female"])
    );
  };

  return (
    <>
      {/* Check here */}
      <tr className="w-full">
        <td className="border border-black">Recruited</td>
        <td className="border border-black p-0">
          <div className="flex">
            <div className="w-1/4 border-black border-r">
              <input
                type="text"
                name={`${type}ProfessorMale`}
                value={formData.teachingStaff[type + "ProfessorMale"]}
                onChange={(e) => {
                  handleChange("teachingStaff", e);
                  handleFormChange(
                    "teachingStaff",
                    `${type}Professor`,
                    `${type}ProfessorYetToRecruited`,
                    e
                  );
                }}
                className="border border-black m-2 w-4/5"
              />
            </div>
            <div className="w-1/4 border-black border-r">
              <input
                type="text"
                name={`${type}ProfessorFemale`}
                value={formData.teachingStaff[type + "ProfessorFemale"]}
                onChange={(e) => {
                  handleChange("teachingStaff", e);
                  handleFormChange(
                    "teachingStaff",
                    `${type}Professor`,
                    `${type}ProfessorYetToRecruited`,
                    e
                  );
                }}
                className="border border-black m-2 w-4/5"
              />
            </div>
            <div className="w-1/4 border-black border-r">
              <input
                type="text"
                name={`${type}ProfessorOthers`}
                value={formData.teachingStaff[type + "ProfessorOthers"]}
                onChange={(e) => {
                  handleChange("teachingStaff", e);
                  handleFormChange(
                    "teachingStaff",
                    `${type}Professor`,
                    `${type}ProfessorYetToRecruited`,
                    e
                  );
                }}
                className="border border-black m-2 w-4/5"
              />
            </div>
            <div className="w-1/4 border-black">
              <div className="border border-black m-2 w-4/5">
                {calculateProfessorTotal("Professor")}
              </div>
            </div>
          </div>
        </td>
        <td className="border border-black p-0">
          <div className="flex">
            <div className="w-1/4 border-black border-r">
              <input
                type="text"
                name={`${type}AssociateProfessorMale`}
                value={formData.teachingStaff[type + "AssociateProfessorMale"]}
                onChange={(e) => {
                  handleChange("teachingStaff", e);
                  handleFormChange(
                    "teachingStaff",
                    `${type}AssociateProfessor`,
                    `${type}AssociateProfessorYetToRecruited`,
                    e
                  );
                }}
                className="border border-black m-2 w-4/5"
              />
            </div>
            <div className="w-1/4 border-black border-r">
              <input
                type="text"
                name={`${type}AssociateProfessorFemale`}
                value={
                  formData.teachingStaff[type + "AssociateProfessorFemale"]
                }
                onChange={(e) => {
                  handleChange("teachingStaff", e);
                  handleFormChange(
                    "teachingStaff",
                    `${type}AssociateProfessor`,
                    `${type}AssociateProfessorYetToRecruited`,
                    e
                  );
                }}
                className="border border-black m-2 w-4/5"
              />
            </div>
            <div className="w-1/4 border-black border-r">
              <input
                type="text"
                name={`${type}AssociateProfessorOthers`}
                value={
                  formData.teachingStaff[type + "AssociateProfessorOthers"]
                }
                onChange={(e) => {
                  handleChange("teachingStaff", e);
                  handleFormChange(
                    "teachingStaff",
                    `${type}AssociateProfessor`,
                    `${type}AssociateProfessorYetToRecruited`,
                    e
                  );
                }}
                className="border border-black m-2 w-4/5"
              />
            </div>
            <div className="w-1/4 border-black">
              <div className="border border-black m-2 w-4/5">
                {calculateProfessorTotal("AssociateProfessor")}
              </div>
            </div>
          </div>
        </td>
        <td className="border border-black p-0">
          <div className="flex">
            <div className="w-1/4 border-black border-r">
              <input
                type="text"
                name={`${type}AssistantProfessorMale`}
                value={formData.teachingStaff[type + "AssistantProfessorMale"]}
                onChange={(e) => {
                  handleChange("teachingStaff", e);
                  handleFormChange(
                    "teachingStaff",
                    `${type}AssistantProfessor`,
                    `${type}AssociateProfessorYetToRecruited`,
                    e
                  );
                }}
                className="border border-black m-2 w-4/5"
              />
            </div>
            <div className="w-1/4 border-black border-r">
              <input
                type="text"
                name={`${type}AssistantProfessorFemale`}
                value={
                  formData.teachingStaff[type + "AssistantProfessorFemale"]
                }
                onChange={(e) => {
                  handleChange("teachingStaff", e);
                  handleFormChange(
                    "teachingStaff",
                    `${type}AssistantProfessor`,
                    `${type}AssociateProfessorYetToRecruited`,
                    e
                  );
                }}
                className="border border-black m-2 w-4/5"
              />
            </div>
            <div className="w-1/4 border-black border-r">
              <input
                type="text"
                name={`${type}AssistantProfessorOthers`}
                value={
                  formData.teachingStaff[type + "AssistantProfessorOthers"]
                }
                onChange={(e) => {
                  handleChange("teachingStaff", e);
                  handleFormChange(
                    "teachingStaff",
                    `${type}AssistantProfessor`,
                    `${type}AssociateProfessorYetToRecruited`,
                    e
                  );
                }}
                className="border border-black m-2 w-4/5"
              />
            </div>
            <div className="w-1/4 border-black">
              <div className="border border-black m-2 w-4/5">
                {calculateProfessorTotal("AssistantProfessor")}
              </div>
            </div>
          </div>
        </td>
        <td>
          <AlertModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            message="Recruited staff should not exceed sanctioned positions."
          />
        </td>
      </tr>
    </>
  );
};

// -----------------------------------------------------------------------------
export const Sanctioned = ({ formData, type, handleChange }) => {
  return (
    <tr className="w-full">
      <td className="border border-black">
        Sanctioned by UGC /University State Government
      </td>
      <td className="border border-black border-t-0">
        <input
          type="text"
          name={`${type}Professor`}
          value={formData.teachingStaff[type + "Professor"]}
          onChange={(e) => handleChange("teachingStaff", e)}
          className="border border-black mt-1 top-0"
          style={{ width: "96%", margin: "2%" }}
        />
      </td>
      <td className="border border-black border-t-0">
        <input
          type="text"
          name={`${type}AssociateProfessor`}
          value={formData.teachingStaff[type + "AssociateProfessor"]}
          onChange={(e) => handleChange("teachingStaff", e)}
          className="border border-black mt-1 top-0"
          style={{ width: "96%", margin: "2%" }}
        />
      </td>
      <td className="border border-black border-t-0">
        <input
          type="text"
          name={`${type}AssistantProfessor`}
          value={formData.teachingStaff[type + "AssistantProfessor"]}
          onChange={(e) => handleChange("teachingStaff", e)}
          className="border border-black mt-1 top-0"
          style={{ width: "96%", margin: "2%" }}
        />
      </td>
    </tr>
  );
};

export const StaffForm = ({
  formData,
  staffType,
  handleChange,
  isModalOpen,
  setModalOpen,
  setFormData,
}) => {
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFormChange = (section, state, e, type) => {
    //Total recruited staff
    const a =
      formData[section][`${type}Male`] +
      formData[section][`${type}Female`] +
      formData[section][`${type}Others`];

    const { name, value } = e.target;

    const final = a - ((formData[section][name] || 0) - parseFloat(value));

    if (!isNaN(parseFloat(value))) {
      if (name !== "ugc" && name !== "management") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          teachingStaff: {
            ...prevFormData.teachingStaff,
            [section]: {
              ...prevFormData.teachingStaff[section],
              [state]: formData[section][type] - final,
            },
          },
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          teachingStaff: {
            ...prevFormData.teachingStaff,
            [section]: {
              ...prevFormData.teachingStaff[section],
              [state]: value - a,
            },
          },
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        teachingStaff: {
          ...prevFormData.teachingStaff,
          [section]: {
            ...prevFormData.teachingStaff[section],
            [state]: formData[section][state] + formData[section][name],
          },
        },
      }));
    }
  };

  return (
    <table className="w-full">
      <tbody>
        <tr className="w-full">
          <td className="w-1/4 border border-black">&nbsp;</td>
          <td className="border border-black relative">
            <ul className="flex absolute h-full top-0 w-full">
              <li className="w-1/4 border-black border-r pl-1">Male</li>
              <li className="w-1/4 border-black border-r pl-1">Female</li>
              <li className="w-1/4 border-black border-r pl-1">Others</li>
              <li className="w-1/4 pl-1">Total</li>
            </ul>
          </td>
        </tr>
        <tr className="w-full">
          <td className="border border-black">
            Sanctioned by UGC /University State Government
          </td>
          <td className="border border-black border-t-0 relative">
            <ul className="flex absolute h-full top-0 w-full">
              <li className="w-1/4 border-black border-r p-2 flex justify-center "></li>
              <li className="w-1/4 border-black border-r p-2 flex justify-center "></li>
              <li className="w-1/4 border-black border-r p-2 flex justify-center "></li>
              <li className="w-1/4 border-black p-1 flex justify-center ">
                <input
                  type="text"
                  name="ugc"
                  value={formData[staffType].ugc}
                  onChange={(e) => {
                    handleChange(staffType, e);
                    handleFormChange(staffType, `ugcYetToRecruited`, e, "ugc");
                  }}
                  className="border border-black w-full pl-1"
                />
              </li>
            </ul>
          </td>
        </tr>
        <tr className="w-full">
          <td className="border border-black p-1  ">Recruited</td>
          <td className="border border-black border-t-0 p-0">
            <ul className="flex w-full">
              <li className="w-1/4 border-black border-r p-1 flex justify-center ">
                <input
                  type="text"
                  name="ugcMale"
                  value={formData[staffType].ugcMale}
                  onChange={(e) => {
                    handleChange(staffType, e);
                    handleFormChange(staffType, `ugcYetToRecruited`, e, "ugc");
                  }}
                  className="border border-black w-full p-1"
                />
              </li>
              <li className="w-1/4 border-black border-r p-1 flex justify-center ">
                <input
                  type="text"
                  name="ugcFemale"
                  value={formData[staffType].ugcFemale}
                  onChange={(e) => {
                    handleChange(staffType, e);
                    handleFormChange(staffType, `ugcYetToRecruited`, e, "ugc");
                  }}
                  className="border border-black w-full p-1"
                />
              </li>
              <li className="w-1/4 border-black border-r p-1 flex justify-center ">
                <input
                  type="text"
                  name="ugcOthers"
                  value={formData[staffType].ugcOthers}
                  onChange={(e) => {
                    handleChange(staffType, e);
                    handleFormChange(staffType, `ugcYetToRecruited`, e, "ugc");
                  }}
                  className="border border-black w-full p-1"
                />
              </li>
              <li className="w-1/4 border-black p-1 flex justify-center ">
                <div className="border border-black w-full p-1">
                  {formData[staffType].ugc || 0}
                </div>
              </li>
            </ul>
          </td>
        </tr>
        <tr className="w-full">
          <td className="border border-black p-1">Yet to Recruit</td>
          <td className="border border-black border-t-0 p-0">
            <ul className="flex w-full">
              <li className="w-1/4 border-black border-r p-1 flex justify-center "></li>
              <li className="w-1/4 border-black border-r p-1 flex justify-center "></li>
              <li className="w-1/4 border-black border-r p-1 flex justify-center "></li>
              <li className="w-1/4 border-black p-1 flex justify-center ">
                <div className="border border-black w-full p-1">
                  {formData[staffType].ugcYetToRecruited || 0}
                </div>
              </li>
            </ul>
          </td>
        </tr>
        <tr className="w-full">
          <td className="border border-black">
            Sanctioned by the Management/Society or Other Authorized Bodies
          </td>
          <td className="border border-black border-t-0 relative">
            <ul className="flex absolute h-full top-0 w-full">
              <li className="w-1/4 border-black border-r p-2 flex justify-center "></li>
              <li className="w-1/4 border-black border-r p-2 flex justify-center "></li>
              <li className="w-1/4 border-black border-r p-2 flex justify-center "></li>
              <li className="w-1/4 border-black p-1 flex justify-center ">
                <input
                  type="text"
                  name="management"
                  value={formData[staffType].management}
                  onChange={(e) => {
                    handleChange(staffType, e);
                    handleFormChange(
                      staffType,
                      `managementYetToRecruited`,
                      e,
                      "management"
                    );
                  }}
                  className="border border-black w-full p-1"
                />
              </li>
            </ul>
          </td>
        </tr>
        <tr className="w-full">
          <td className="border border-black p-1">Recruited</td>
          <td className="border border-black border-t-0 p-0">
            <ul className="flex w-full">
              <li className="w-1/4 border-black border-r p-1 flex justify-center ">
                <input
                  type="text"
                  name="managementMale"
                  value={formData[staffType].managementMale}
                  onChange={(e) => {
                    handleChange(staffType, e);
                    handleFormChange(
                      staffType,
                      `managementYetToRecruited`,
                      e,
                      "management"
                    );
                  }}
                  className="border border-black w-full p-1"
                />
              </li>
              <li className="w-1/4 border-black border-r p-1 flex justify-center ">
                <input
                  type="text"
                  name="managementFemale"
                  value={formData[staffType].managementFemale}
                  onChange={(e) => {
                    handleChange(staffType, e);
                    handleFormChange(
                      "technicalStaff",
                      `managementYetToRecruited`,
                      e,
                      "management"
                    );
                  }}
                  className="border border-black w-full p-1"
                />
              </li>
              <li className="w-1/4 border-black border-r p-1 flex justify-center ">
                <input
                  type="text"
                  name="managementOthers"
                  value={formData[staffType].managementOthers}
                  onChange={(e) => {
                    handleChange(staffType, e);
                    handleFormChange(
                      staffType,
                      `managementYetToRecruited`,
                      e,
                      "management"
                    );
                  }}
                  className="border border-black w-full p-1"
                />
              </li>
              <li className="w-1/4 border-black p-1 flex justify-center ">
                <div className="border border-black w-full p-1">
                  {(parseFloat(formData[staffType].managementMale) || 0) +
                    (parseFloat(formData[staffType].managementFemale) || 0) +
                    (parseFloat(formData[staffType].managementOthers) || 0)}
                </div>
              </li>
            </ul>
          </td>
        </tr>
        <tr className="w-full">
          <td className="border border-black p-1">Yet to Recruit</td>
          <td className="border border-black border-t-0 p-0">
            <ul className="flex w-full">
              <li className="w-1/4 border-black border-r p-1 flex justify-center "></li>
              <li className="w-1/4 border-black border-r p-1 flex justify-center "></li>
              <li className="w-1/4 border-black border-r p-1 flex justify-center "></li>
              <li className="w-1/4 border-black p-1 flex justify-center ">
                <div className="border border-black w-full p-1">
                  {formData[staffType].managementYetToRecruited || 0}
                </div>
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>
            <AlertModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              message="Recruited staff should not exceed sanctioned positions."
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

//Pop up Alert Modal
export const AlertModal = ({ isOpen, onClose, message }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white p-8 rounded shadow-lg z-50">
        <div className="rounded z-50 flex items-center justify-between">
          <div className="text-xl font-bold">Recruited Staff</div>
          <button
            className="bg-blue-500 text-white px-2 rounded hover:bg-blue-700 focus:outline-none"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <p className="my-4 ">{message}</p>
      </div>
    </div>
  );
};
