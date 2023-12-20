"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { redirect } from "next/navigation";
import { contextManager } from "context/store";
import { ToastContainer } from "react-toastify";
import { getCookie } from "cookies-next";
const IndexLayout = ({ children }) => {
  const [processing, setProcessing] = useState(false);
  const { setCollegeData } = contextManager();

  let token = getCookie("token");
  let collegeData = getCookie("collegeData");

  useEffect(() => {
    setCollegeData(JSON.parse(collegeData));

    if (!token) {
      redirect("/");
    } else {
      setProcessing(true);
    }
  }, []);

  return (
    processing && (
      <div className="mainsection">
        <Navbar />
        <main className="mainbody">
          <Sidebar />
          <section className="pagesection scrollbar">{children}</section>
        </main>
        <ToastContainer />
      </div>
    )
  );
};

export default IndexLayout;
