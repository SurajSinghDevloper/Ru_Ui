import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { FaRegCalendarAlt } from "react-icons/fa";

const DatePicker = () => {
  return (
    <div className="relative flex">
      <Datetime
        value={new Date()}
        input={true}
        className="text-gray-900 align-middle border  rounded-lg flex"
      />
      <div style={{ position: "absolute", top: "30%", right: "10px" }}>
        <FaRegCalendarAlt />
      </div>
    </div>
  );
};

export default DatePicker;
