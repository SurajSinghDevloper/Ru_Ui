import React from "react";

const StudentEnrolled = ({ type, formdata, setFormData, total }) => {
  return (
    <tr className="border border-black">
      <td className="w-1/4 border-black border-r border-b-0 p-0 relative">
        <ul className="flex h-full">
          <li className="absolute w-3/5">{type}</li>
          <li className="absolute top-0 h-full left-[calc(60%+1px)] w-2/5">
            <ul className="h-full">
              <li className="border border-black h-[calc(33.333%-1px)] border-t-0 border-b-0">
                Male
              </li>
              <li className="border border-black h-[calc(33.333%+1px)] border-b-0">
                Female
              </li>
              <li className="border border-black h-1/3 border-b-0">Others</li>
            </ul>
          </li>
        </ul>
      </td>
      <td className={`p-0 ${total ? "flex" : "w-3/4"}`}>
        <div className={total ? "w-4/5 p-0" : ""}>
          <InputRow
            total={total}
            formdata={formdata}
            gender="Male"
            setFormData={setFormData}
            type={type}
          />
          <InputRow
            total={total}
            formdata={formdata}
            gender="Female"
            setFormData={setFormData}
            type={type}
          />
          <InputRow
            total={total}
            last={true}
            formdata={formdata}
            gender="Others"
            setFormData={setFormData}
            type={type}
          />
        </div>
        {total && (
          <div className="w-1/5 flex flex-col">
            <TotalRow formdata={formdata} gender="Male" type={type} />
            <TotalRow formdata={formdata} gender="Female" type={type} />
            <TotalRow
              formdata={formdata}
              gender="Others"
              type={type}
              last={true}
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export default StudentEnrolled;

const TotalRow = ({ last, formdata, gender, type }) => {
  const data = formdata[type][gender];
  let sum = 0;
  const findSum = (data) => {
    for (const category in data) {
      if (category !== "studentCurrentYearId") {
        sum += data[category];
      }
    }
    return sum;
  };

  return (
    <ul className={`flex w-full ${!last && "border-b border-black"}`}>
      <li className="p-1 w-full">
        <div className="w-full border border-black p-1">{findSum(data)}</div>
      </li>
    </ul>
  );
};

export const InputRow = ({
  last,
  gender,
  total,
  formdata,
  type,
  setFormData,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const formdataField = total
      ? "studentCourseEnrolled"
      : "studentCategoryEnrolled";

    const numericValue = parseFloat(value);

    if (!isNaN(numericValue) && numericValue >= 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [formdataField]: {
          ...prevFormData[formdataField],
          [type]: {
            ...prevFormData[formdataField][type],
            [gender]: {
              ...prevFormData[formdataField][type][gender],
              [name]: numericValue,
            },
          },
        },
      }));
    }
  };

  return (
    <ul className={`flex w-full ${!last && "border-b border-black"}`}>
      <li className="w-1/4 border-black border-r p-1">
        <input
          className="w-full border border-black p-1"
          type="number"
          name={total ? "CollegeState" : "Year1"}
          value={formdata[type][gender][total ? "CollegeState" : "Year1"]}
          onChange={(e) => handleChange(e)}
        />
      </li>
      <li className="w-1/4 border-black border-r p-1">
        <input
          className="h-full w-full border border-black p-1"
          type="number"
          name={total ? "OtherState" : "Year2"}
          value={formdata[type][gender][total ? "OtherState" : "Year2"]}
          onChange={(e) => handleChange(e)}
        />
      </li>
      <li className="w-1/4 border-black border-r p-1">
        <input
          className="h-full w-full border border-black p-1"
          type="number"
          name={total ? "NRI" : "Year3"}
          value={formdata[type][gender][total ? "NRI" : "Year3"]}
          onChange={(e) => handleChange(e)}
        />
      </li>
      <li className={`w-1/4 border-black p-1 ${total && "border-r"}`}>
        <input
          className="h-full w-full border border-black p-1"
          type="number"
          name={total ? "Foreign" : "Year4"}
          value={formdata[type][gender][total ? "Foreign" : "Year4"]}
          onChange={(e) => handleChange(e)}
        />
      </li>
    </ul>
  );
};
