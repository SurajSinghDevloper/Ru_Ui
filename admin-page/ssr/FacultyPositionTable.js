import React from "react";
const FacultyPositionTable = ({ formData }) => {
  return (
    <div className="mb-4">
      <h3 className="text-center text-black font-semibold p-3">
        Position Details of Faculity & Staff in the College
      </h3>
      <div className="p-3">
        <h3 className="text-center font-semibold">Teaching Staff</h3>
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
            <Sanctioned formData={formData} type="ugc" />
            {/* Recruited */}
            <Recruited formData={formData} type="ugc" />
            {/* Yet to Recruit */}
            <YetToRecruit formData={formData} type="ugc" />

            {/* Sanctioned by the Management/Society or Other Authorized Bodies */}
            <Sanctioned formData={formData} type="management" />
            {/* Recruited */}
            <Recruited formData={formData} type="management" />
            {/* Yet to Recruit */}
            <YetToRecruit formData={formData} type="management" />
          </tbody>
        </table>
        <br />

        {/* Non-Teaching Staff */}
        <h3 className="text-center font-semibold">Non-Teaching Staff</h3>
        <StaffForm formData={formData} staffType={"nTS"} />

        {/* Technical Staff */}
        <h3 className="text-center font-semibold">Technical Staff</h3>
        <StaffForm formData={formData} staffType={"technicalStaff"} />
      </div>
    </div>
  );
};

export default FacultyPositionTable;

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

export const Recruited = ({ formData, type }) => {
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
      <tr className="w-full">
        <td className="border border-black">Recruited</td>
        <td className="border border-black p-0">
          <div className="flex">
            <div className="w-1/4 border-black border-r">
              <div className="border border-black m-2 w-4/5">
                {formData.teachingStaff[type + "ProfessorMale"]}
              </div>
            </div>
            <div className="w-1/4 border-black border-r">
              <div className="border border-black m-2 w-4/5">
                {formData.teachingStaff[type + "ProfessorFemale"]}
              </div>
            </div>
            <div className="w-1/4 border-black border-r">
              <div className="border border-black m-2 w-4/5">
                {formData.teachingStaff[type + "ProfessorOthers"]}
              </div>
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
              <div className="border border-black m-2 w-4/5">
                {formData.teachingStaff[type + "AssociateProfessorMale"]}
              </div>
            </div>
            <div className="w-1/4 border-black border-r">
              <div className="border border-black m-2 w-4/5">
                {formData.teachingStaff[type + "AssociateProfessorFemale"]}
              </div>
            </div>
            <div className="w-1/4 border-black border-r">
              <div className="border border-black m-2 w-4/5">
                {formData.teachingStaff[type + "AssociateProfessorOthers"]}
              </div>
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
              <div className="border border-black m-2 w-4/5">
                {formData.teachingStaff[type + "AssistantProfessorMale"]}
              </div>
            </div>
            <div className="w-1/4 border-black border-r">
              <div className="border border-black m-2 w-4/5">
                {formData.teachingStaff[type + "AssistantProfessorFemale"]}
              </div>
            </div>
            <div className="w-1/4 border-black border-r">
              <div className="border border-black m-2 w-4/5">
                {formData.teachingStaff[type + "AssistantProfessorOthers"]}
              </div>
            </div>
            <div className="w-1/4 border-black">
              <div className="border border-black m-2 w-4/5">
                {calculateProfessorTotal("AssistantProfessor")}
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export const Sanctioned = ({ formData, type }) => {
  return (
    <tr className="w-full">
      <td className="border border-black">
        Sanctioned by UGC /University State Government
      </td>
      <td className="border border-black border-t-0">
        <div>{formData.teachingStaff[type + "Professor"]}</div>
      </td>
      <td className="border border-black border-t-0">
        <div>{formData.teachingStaff[type + "AssociateProfessor"]}</div>
      </td>
      <td className="border border-black border-t-0">
        <div>{formData.teachingStaff[type + "AssistantProfessor"]}</div>
      </td>
    </tr>
  );
};

export const StaffForm = ({ formData, staffType }) => {
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
                <div>{formData[staffType].ugc}</div>
              </li>
            </ul>
          </td>
        </tr>
        <tr className="w-full">
          <td className="border border-black p-1  ">Recruited</td>
          <td className="border border-black border-t-0 p-0">
            <ul className="flex w-full">
              <li className="w-1/4 border-black border-r p-1 flex justify-center ">
                <div>{formData[staffType].ugcMale}</div>
              </li>
              <li className="w-1/4 border-black border-r p-1 flex justify-center ">
                <div>{formData[staffType].ugcFemale}</div>
              </li>
              <li className="w-1/4 border-black border-r p-1 flex justify-center ">
                <div>{formData[staffType].ugcOthers}</div>
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
                <div>{formData[staffType].management}</div>
              </li>
            </ul>
          </td>
        </tr>
        <tr className="w-full">
          <td className="border border-black p-1">Recruited</td>
          <td className="border border-black border-t-0 p-0">
            <ul className="flex w-full">
              <li className="w-1/4 border-black border-r p-1 flex justify-center ">
                <div>{formData[staffType].managementMale}</div>
              </li>
              <li className="w-1/4 border-black border-r p-1 flex justify-center ">
                <div>{formData[staffType].managementFemale}</div>
              </li>
              <li className="w-1/4 border-black border-r p-1 flex justify-center ">
                <div>{formData[staffType].managementOthers}</div>
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
      </tbody>
    </table>
  );
};
