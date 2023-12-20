import React from "react";

const SubmitModal = ({ setFinalSubmitState, finalsubmit }) => {
  return (
    <div className="bg-slate-300 inset-1/4 start-[307px] end-16 z-50 fixed cursor-pointer p-4 rounded-lg">
      <div className="text-center">
        <b>
          Are you sure you want to submit the form? This action cannot be
          undone.
        </b>
      </div>
      <div className="flex justify-end h-4/5">
        <div className="flex justify-evenly items-end w-full">
          <button
            className="bg-blue-600 rounded-lg px-4 py-1"
            onClick={() => setFinalSubmitState(false)}
          >
            Edit
          </button>
          <button
            className="bg-blue-600 rounded-lg px-4 py-1"
            onClick={finalsubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
