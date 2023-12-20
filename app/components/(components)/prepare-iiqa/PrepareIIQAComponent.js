"use client";
import React, { useEffect } from "react";
import ManageIIQAForms from "./ManageIIQAForms";
import { contextManager } from "context/store";
import { config } from "apiCalls/Configuration";

const PrepareIIQAComponent = () => {
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
    <div>
      <ManageIIQAForms />
    </div>
  );
};

export default PrepareIIQAComponent;
