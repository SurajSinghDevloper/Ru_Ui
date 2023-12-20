"use client";
import React, { useState } from "react";
import { DASHBOARD_SIDEBAR_LINKS } from "./contants";
import { contextManager } from "context/store";
import Link from "next/link";

const Sidebar = () => {
  const [menu1, setMenu1] = useState("");
  const { setSelectedMenu, toggleSidebar, setToggleSideBar } = contextManager();
  return (
    <aside className={`sidebarsec ${toggleSidebar ? "active" : ""}`}>
      <div className="sidelinks scrollbar">
        <ul>
          <li
            onClick={() => setSelectedMenu("Dashboard")}
            className={menu1 === "" ? "active" : ""}
          >
            <div onClick={() => setMenu1("")}>
              <Link href="/components/dashboard">Dashboard</Link>
            </div>
          </li>
          {DASHBOARD_SIDEBAR_LINKS.map((link, i) => (
            <SidebarLink
              key={link.key}
              link={link}
              i={i}
              menu1={menu1}
              setMenu1={setMenu1}
              setToggleSideBar={setToggleSideBar}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

function SidebarLink({ link, menu1, setMenu1 }) {
  const { setSelectedMenu, selectedMenu } = contextManager();

  return (
    <li className={menu1 === link.key ? "active" : ""}>
      <div onClick={() => setMenu1(link.key)}>
        {link.label}
        {link.menu.length > 0 && (
          <span
            className="dropd p-3"
            onClick={
              menu1 === ""
                ? () => setMenu1(link.key)
                : (e) => {
                    e.stopPropagation(); // This prevents the event from propagating
                    menu1 !== link.key ? setMenu1(link.key) : setMenu1("");
                  }
            }
          ></span>
        )}{" "}
      </div>
      {menu1 === link.key && link.menu.some((x) => x.key !== 0) && (
        <ul>
          {link.menu.map((x, i) => (
            <li
              key={i}
              onClick={() => {
                setSelectedMenu(x.item);
              }}
            >
              <div
                className={selectedMenu === x.item ? "bg-gray-400" : ""}
                key={i}
              >
                <Link href={x.path}>{x.item}</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
