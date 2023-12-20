"use client";
import React, { useEffect } from "react";
import ManageSSRForms from "./ProfileForSSR";
import { contextManager } from "context/store";
import { config } from "apiCalls/Configuration";

const ProfileForSSRComponent = () => {
  const { setIiqa, collegeData } = contextManager();
  useEffect(() => {
    config.cookieAssign();
    config
      .apiRequest("GET", `${collegeData.collegId}/by-prepareIIQAID`)
      .then((response) => {
        if (response && response.length > 1) {
          setIiqa(response[0]);
          return;
        }
      });
  }, []);
  return (
    <>
      <ManageSSRForms />
    </>
  );
};

export default ProfileForSSRComponent;
