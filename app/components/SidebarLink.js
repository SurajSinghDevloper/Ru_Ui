import Link from "next/link";
import React from "react";

const SidebarLink = ({ link, menu1, setMenu1, setSelectedMenu }) => {
  const activeSidebar = () => {
    if (menu1 !== link.key) {
      setMenu1(link.key);
    }
  };

  return (
    <div
      className="transition duration-900 ease-out md:ease-in bg-neutral-200 text-black flex justify-between items-center gap-2 px-3 py-2 hover:bg-neutral-100 hover:no-underline active:text-slate-50 font-semibold rounded-sm text-base"
      onMouseEnter={activeSidebar}
    >
      <div className="w-full">
        <div className="cursor-pointer flex icon-center justify-between">
          <div className="text-xm arrow">{link.label}</div>
          {link.icon && (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M320 128L192 256l128 128z"></path>
            </svg>
          )}
        </div>

        {menu1 === link.key && (
          <ul className="bg-gray-300 p-2 rounded shadow">
            {link.menu.map((x, i) => {
              console.log(x);
              return (
                <li
                  key={i}
                  onClick={() => {
                    setSelectedMenu(x.item);
                  }}
                  className="py-1 px-4 hover:text-gray-200 hover:bg-neutral-900 cursor-pointer transition duration-200"
                >
                  <Link href={x.path} key={i}>
                    {x.item}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SidebarLink;
