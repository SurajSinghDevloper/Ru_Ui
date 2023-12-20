import React from "react";

function FormsSSR({ title, formData, setFormData, field }) {
  const currentYear = new Date().getFullYear();
  function extractLastTwoDigits(year) {
    // Convert the year to a string, then use substring to get the last two characters.
    return year.toString().slice(-2);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: {
          ...prevFormData[field],
          [name]: numericValue,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: {
          ...prevFormData[field],
          [name]: 0,
        },
      }));
    }
  };
  return (
    <>
      <div className="flex w-full ">
        <div className="w-3/5">{title}</div>
        <div className="w-2/5 flex">
          <div className="flex flex-col w-1/5 p-2 pt-0">
            <label>
              {currentYear - 1}-{extractLastTwoDigits(currentYear)}
            </label>
            <input
              className="border border-black"
              type="text"
              name="year1"
              value={formData.year1 || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/5 p-2 pt-0">
            <label>
              {currentYear - 2}-{extractLastTwoDigits(currentYear - 1)}
            </label>
            <input
              className="border border-black"
              type="text"
              name="year2"
              value={formData.year2 || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/5 p-2 pt-0">
            <label>
              {currentYear - 3}-{extractLastTwoDigits(currentYear - 2)}
            </label>
            <input
              className="border border-black"
              type="text"
              name="year3"
              value={formData.year3 || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/5 p-2 pt-0">
            <label>
              {currentYear - 4}-{extractLastTwoDigits(currentYear - 3)}
            </label>
            <input
              className="border border-black"
              type="text"
              name="year4"
              value={formData.year4 || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/5 p-2 pt-0">
            <label>
              {currentYear - 5}-{extractLastTwoDigits(currentYear - 4)}
            </label>
            <input
              className="border border-black"
              type="text"
              name="year5"
              value={formData.year5 || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FormsSSR;
