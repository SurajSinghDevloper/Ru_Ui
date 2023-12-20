"use client";
import React, { useState, useEffect } from "react";

function CountdownTimer({ sendOtp }) {
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000); // Decrease time by 1 second every second
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [time]);

  return (
    <div className=" text-blue-600 px-6 py-2 focus:outline-none">
      {time > 0 ? (
        <p>Resend OTP in : {time} seconds</p>
      ) : (
        <p
          className="cursor-pointer"
          onClick={() => {
            sendOtp();
            setTime(30);
          }}
        >
          Resend
        </p>
      )}
    </div>
  );
}

export default CountdownTimer;
