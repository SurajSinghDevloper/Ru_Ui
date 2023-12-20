import React from "react";

const QualificationTable = ({ type, formData, setFormData, category }) => {
  const qualificationLevel = [
    { level: "DSC_DLITT", name: "D.sc/D.Litt" },
    { level: "PHD", name: "Ph.D." },
    { level: "MPHIL", name: "M.Phil." },
    { level: "PG", name: "PG" },
  ];

  return (
    <table className="w-full">
      <thead>
        <tr className="">
          <td>&nbsp;</td>
          <td className="text-center font-semibold">{type}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-black">Highest Qualification</td>
          <td className="border border-black relative">
            <ul className="flex absolute h-full top-0 left-0 w-full">
              <li className="w-1/3 border-black border-r pl-1">Professor</li>
              <li className="w-1/3 border-black border-r pl-1">
                Assistant Professor
              </li>
              <li className="w-1/3 pl-1">Associate Professor</li>
            </ul>
          </td>
          <td className="border border-black"></td>
        </tr>
        <tr>
          <td className="border border-black p-0">&nbsp;</td>
          <td className="border border-black p-0">
            <ul className="flex w-full">
              <GenderList border={true} />
              <GenderList border={true} />
              <GenderList border={false} />
            </ul>
          </td>
          <td className="border border-black px-1 py-0">Total</td>
        </tr>
        {qualificationLevel.map((ele, i) => {
          return (
            <QlificationRow
              key={i}
              name={ele.name}
              formData={formData}
              setFormData={setFormData}
              qualificationLevel={ele.level}
              category={category}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default QualificationTable;

const GenderList = ({ border }) => {
  return (
    <li className={`w-1/3 ${border && "border-black border-r"}`}>
      <ul className="flex h-full top-0 w-full">
        <li className="w-1/3 border-black border-r pl-1">Male</li>
        <li className="w-1/3 border-black border-r pl-1">Female</li>
        <li className="w-1/3 border-black pl-1">Others</li>
      </ul>
    </li>
  );
};

const QlificationRow = ({
  name,
  formData,
  setFormData,
  qualificationLevel,
  category,
}) => {
  const inputType = [
    { border: true, role: "PROFESSOR" },
    { border: true, role: "ASSOCIATE_PROFESSOR" },
    { border: false, role: "ASSISTANT_PROFESSOR" },
  ];

  const data = formData[category][qualificationLevel];

  // To find the total number of staff in one category(DSC, PhD ...)

  let sum = 0;
  const findSum = (data) => {
    for (const role in data) {
      sum +=
        data[role]["maleTeacher"] +
        data[role]["femaleTeacher"] +
        data[role]["otherTeacher"];
    }
    return sum;
  };

  return (
    <tr>
      <td className="border border-black p-2">{name}</td>
      <td className="border border-black p-0">
        <ul className="flex w-full">
          {inputType.map((ele, i) => {
            return (
              <GenderInputs
                key={i}
                border={ele.border}
                formData={formData}
                setFormData={setFormData}
                category={category}
                qualificationLevel={qualificationLevel}
                role={ele.role}
                sum={sum}
              />
            );
          })}
        </ul>
      </td>
      <td className="border border-black w-1/12 p-1">
        <div className="w-full border border-black p-1">{findSum(data)}</div>
      </td>
    </tr>
  );
};

const GenderInputs = ({
  border,
  setFormData,
  category,
  role,
  formData,
  qualificationLevel,
  sum,
}) => {
  const handleUpdate = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        qualification: {
          ...prevFormData.qualification,
          [category]: {
            ...prevFormData.qualification[category],
            [qualificationLevel]: {
              ...prevFormData.qualification[category][qualificationLevel],
              [role]: {
                ...prevFormData.qualification[category][qualificationLevel][
                  role
                ],
                [name]: numericValue,
                totalTeacher: sum,
              },
            },
          },
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        qualification: {
          ...prevFormData.qualification,
          [category]: {
            ...prevFormData.qualification[category],
            [qualificationLevel]: {
              ...prevFormData.qualification[category][qualificationLevel],
              [role]: {
                ...prevFormData.qualification[category][qualificationLevel][
                  role
                ],
                [name]: 0,
                totalTeacher: sum,
              },
            },
          },
        },
      }));
    }
  };
  return (
    <li className={`w-1/3 ${border && "border-black border-r"}`}>
      <ul className="flex w-full">
        <li className="w-1/3 border-black border-r p-1">
          <input
            type="text"
            className="w-full border border-black p-1"
            name="maleTeacher"
            value={formData[category][qualificationLevel][role].maleTeacher}
            onChange={(e) => handleUpdate(e)}
          />
        </li>
        <li className="w-1/3 border-black border-r p-1">
          <input
            type="text"
            className="w-full border border-black p-1"
            name="femaleTeacher"
            value={formData[category][qualificationLevel][role].femaleTeacher}
            onChange={(e) => handleUpdate(e)}
          />
        </li>
        <li className="w-1/3 border-black p-1">
          <input
            type="text"
            className="w-full border border-black p-1"
            name="otherTeacher"
            value={formData[category][qualificationLevel][role].otherTeacher}
            onChange={(e) => handleUpdate(e)}
          />
        </li>
      </ul>
    </li>
  );
};
