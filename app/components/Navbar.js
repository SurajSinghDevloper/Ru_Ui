"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { contextManager } from "context/store";
import { deleteCookie } from "cookies-next";
const imageUrl =
  "https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg";
const Navbar = () => {
  const img = "/ru-logo.jpeg";

  const { toggleSidebar, setToggleSideBar } = contextManager();
  const { push } = useRouter();

  function deleteAndClearCookie(cookieName) {
    deleteCookie(cookieName, {
      path: "/",
      sameSite: "None",
      secure: true,
    });
  }

  const handleLogout = () => {
    deleteAndClearCookie("token");
    deleteAndClearCookie("collegeData");
    push("/");
  };

  return (
    <nav className="topnavsec">
      <div className="headersec">
        <div className="sitelogo">
          <img src="/img/logo.png" alt="NAAC" />
        </div>
        {/* <img src={img} alt="Profile" className="w-10 h-10 rounded-full mr-2" /> */}
        <div
          onClick={() => setToggleSideBar(!toggleSidebar)}
          className={`navicon  ${toggleSidebar ? "active" : ""}`}
        >
          <span></span>
        </div>

        <div className="userlog">
          <div>
            <h4>John Doe </h4>
          </div>
          <div className="userimg">
            <img src={imageUrl} alt="User Avatar" />
          </div>
          <div className="logoutbtn">
            <button onClick={handleLogout}>Logout</button>{" "}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
