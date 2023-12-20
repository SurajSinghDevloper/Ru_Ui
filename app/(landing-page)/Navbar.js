import React from "react";

const Navbar = ({ swapToLogin, loginNav }) => {
  return (
    <nav className="flex p-2 bg-[#5876a1] justify-end ">
      <div className="flex justify-end text-white">
        {!loginNav ? (
          <>
            <div className="p-1 pr-8 pl-8 ">
              <span className="cursor-pointer">Home</span>
            </div>
            <div className="p-1  pr-8 pl-8 ">
              <span className=" cursor-pointer">Help Documents</span>
            </div>
            <div className="p-1 pr-8 pl-8 ">
              <span className=" cursor-pointer">Contact Us</span>
            </div>
          </>
        ) : (
          <>
            <div className="p-1 pr-8 pl-8">
              <span
                className="text-white cursor-pointer "
                onClick={swapToLogin}
              >
                Login
              </span>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
