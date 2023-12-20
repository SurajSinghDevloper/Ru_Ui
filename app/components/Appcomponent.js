"use client";
import React, { useEffect, useState } from "react";
import Dashboard from "./(components)/dashboard/page";
import { config } from "apiCalls/Configuration";
import { contextManager } from "context/store";

const Appcomponent = () => {
  const [processing, setProcessing] = useState(false);
  const {
    selectedMenu,
    setIiqa,
    collegeData,
    setIIQAProgress,
    iiqaUpdate,
    setSSRID,
  } = contextManager();

  // Set token from cookies
  config.cookieAssign();

  useEffect(() => {
    config
      .apiRequest("GET", `${collegeData.collegId}/by-prepareIIQAID`)
      .then((response) => {
        setProcessing(true);
        if (response && response.length > 1) {
          setIiqa(response[0]);
          const keyValue = response[1].split(": ");
          const percentageValue = parseFloat(keyValue[1].match(/\d+\.\d+/)[0]);
          setIIQAProgress(percentageValue);
          return;
        }
      });
  }, [iiqaUpdate]);

  useEffect(() => {
    if (
      selectedMenu === "Profile For SSR" ||
      selectedMenu === "Extended Profile & QIF"
    ) {
      (async () => {
        const ssr = await config.ssrAPIRequest(
          "GET",
          `ssr-specifics/${collegeData.collegId}`
        );
        if (ssr) {
          setSSRID(ssr.ssrID);
        }
      })();
    }
  }, [selectedMenu]);
  return (
    processing && (
      <div>
        <Dashboard />
        {/* {(selectedMenu === "" && <Dashboard />) ||
          (selectedMenu === "Dashboard" && <Dashboard />)} */}
        {/*{selectedMenu === "Prepare IIQA" && <ManageIIQAForms />}
        {selectedMenu === "Profile For SSR" && <ProfileForSSR />}
        {selectedMenu === "Extended Profile & QIF" && <ExtendedProfileQIF />}
        {selectedMenu === "SSR-DVV Clarifications" && <ManageDvv />} */}
        {/* 
    {selectedMenu === "" && }
    {selectedMenu === "" && }
    */}
      </div>
    )
  );
};

export default Appcomponent;
