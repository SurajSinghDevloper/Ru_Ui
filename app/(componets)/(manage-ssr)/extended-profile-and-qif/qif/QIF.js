"use client";
import React, { useState } from "react";
import Criteria1 from "./criterias/Criteria1";
import Criteria2 from "./criterias/Criteria2";
import Criteria3 from "./criterias/Criteria3";
import Criteria4 from "./criterias/Criteria4";
import Criteria5 from "./criterias/Criteria5";
import Criteria6 from "./criterias/Criteria6";
import Criteria7 from "./criterias/Criteria7";

const QIF = () => {
  const [selectedCriteria, setSelectedCriteria] = useState("");
  const [ansQs, setAnsQs] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });
  const creterions = {
    "Curricular Aspect": 6,
    "Teaching-Learning and Evaluation": 10,
    "Research, inovations and Extenstion": 9,
    "Infrastructure and Learning Resources": 6,
    "Student Support and Progression": 9,
    "Governance, LeaderShip and Management": 9,
    "Institutional Values and Best Practices": 6,
  };
  const criteriaComponents = [
    Criteria1,
    Criteria2,
    Criteria3,
    Criteria4,
    Criteria5,
    Criteria6,
    Criteria7,
  ];
  const SelectedCriteria = criteriaComponents[selectedCriteria];

  return (
    <>
      <div className="rounded-sm p-2">
        <p className="border border-slate-500 flex bg-white rounded-sm p-2 sticky top-[-24px] z-10 w-full justify-between">
          <span>
            {selectedCriteria !== "" ? `Criterion : ` : `Criterion `}
            <span className="text-blue-500 font-semibold">
              {Object.keys(creterions)[selectedCriteria]}
            </span>
          </span>
          {selectedCriteria !== "" && (
            <span className="flex justify-end">
              <button className="px-3 border border-[#329cf8] rounded-lg bg-[#329cf8]">
                Save
              </button>
            </span>
          )}
        </p>
        <div className="rounded-sm p-2 pt-0">
          {Object.keys(creterions).map((ele, i) => (
            <span key={i}>
              <div
                className="border-t-[3px] border-b my-3 border-slate-400 p-2 flex flex-row justify-between cursor-pointer"
                onClick={() => {
                  selectedCriteria === i
                    ? setSelectedCriteria("")
                    : setSelectedCriteria(i);
                }}
              >
                <p className="color-slate-100">
                  {i + 1}. {ele}
                </p>
                <b>
                  Number Of Questions Answered : {ansQs[i + 1] || 0}/
                  {creterions[ele]}
                </b>
              </div>
              {selectedCriteria === i && (
                <SelectedCriteria ansQs={ansQs} setAnsQs={setAnsQs} />
              )}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default QIF;
