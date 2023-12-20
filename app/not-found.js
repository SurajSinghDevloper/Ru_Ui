import React from "react";

const NotFound = () => {
  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `url(/not-found.png)`, // Use an absolute path from the root
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default NotFound;
