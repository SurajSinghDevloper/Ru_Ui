"use client";
import React, { useState, useRef, useEffect } from "react";
import IIQA from "./IIQA";
import SSR from "./ssr/SSR";
import { contextManager } from "context/store";
import { config } from "apiCalls/Configuration";

const AdminPage = () => {
  const { setSSRID } = contextManager();
  const [inputID, setInputID] = useState("");
  const [selectedInput, setSelectedInput] = useState("");
  const IIQARef = useRef();

  const handleButtonClick = (input) => {
    config.cookieAssign();
    (async () => {
      const ssr = await config.ssrAPIRequest("GET", `ssr-specifics/${inputID}`);
      setSSRID(ssr.ssrID);
    })();
    setSelectedInput(input);
  };

  useEffect(() => {
    // Check if IIQARef is defined before calling getIIQA
    if (selectedInput === "IIQA" && IIQARef.current) {
      IIQARef.current.getIIQA();
    }
  }, [selectedInput]);

  return (
    <>
      <div className="mb-4">
        <label className="text-lg mx-2">
          Please Enter College ID
          <input
            className="border border-black ml-2 p-1 rounded"
            type="text"
            onChange={(e) => setInputID(e.target.value)}
          />
        </label>
        {inputID !== "" && (
          <>
            <button
              className="p-2 px-4 rounded-lg bg-blue-600 mx-2"
              onClick={() => {
                handleButtonClick("IIQA");
              }}
            >
              IIQA
            </button>
            <button
              className="p-2 px-4 rounded-lg bg-blue-600 mx-2"
              onClick={() => handleButtonClick("SSR")}
            >
              SSR
            </button>
          </>
        )}
      </div>

      <div>
        {selectedInput === "IIQA" && <IIQA ref={IIQARef} inputID={inputID} />}
        {selectedInput === "SSR" && <SSR inputID={inputID} />}
      </div>
    </>
  );
};

export default AdminPage;
