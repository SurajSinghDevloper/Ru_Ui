"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { getCookie } from "cookies-next";
import { contextManager } from "context/store";

export default function App() {
  const { setBaseURL } = contextManager();

  const environ = process.env.BASE_URL;

  useEffect(() => {
    setBaseURL(environ);
    const token = getCookie("token");
    if (token) {
      redirect("/components");
    } else {
      redirect("/login");
    }
  }, []);

  return <div className="maindiv">{/* <LandingPage /> */}</div>;
}
