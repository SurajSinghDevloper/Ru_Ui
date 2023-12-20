"use client";
import React, { useState, useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { BiSolidHelpCircle } from "react-icons/bi";
import { config } from "apiCalls/Configuration";
import "./login.css";
import { useRouter } from "next/navigation";
import { TfiReload } from "react-icons/tfi";
import TextToImage from "./TextToImage";
import Link from "next/link";

const Login = ({ handleForget }) => {
  useEffect(() => {
    document.body.classList.add("loginpage");
    return () => {
      document.body.classList.remove("loginpage");
    };
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [checkCaptcha, setCheckCaptcha] = useState(false);
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [refreshCaptcha, setRefreshCaptcha] = useState(false);
  const { push } = useRouter();

  const captchaValidate = (e) => {
    setCheckCaptcha(false);
    setCaptchaInput(e.target.value);
  };

  useEffect(() => {
    setGeneratedCaptcha(config.generateCaptcha());
  }, [refreshCaptcha]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const collegeEmailID = email;

    if (generatedCaptcha === captchaInput) {
      try {
        const response = await fetch(`${config.BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ collegeEmailID, password }),
        });

        if (response.status === 200) {
          const data = await response.json();

          document.cookie = `token=${JSON.stringify(
            data.token
          )}; SameSite=None; Secure;`;
          document.cookie = `collegeData=${JSON.stringify(
            data.college
          )}; SameSite=None; Secure;`;
          push("/components");
        } else {
          setRefreshCaptcha(!refreshCaptcha);
          setCaptchaInput("");
          config.notify("Invalid Credential", "error");
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        setRefreshCaptcha(!refreshCaptcha);
        setCaptchaInput("");
        config.notify("Something Went Wrong", "error");
        console.error("Error:", error);
      }
    } else {
      setRefreshCaptcha(!refreshCaptcha);
      setCaptchaInput("");
      setCheckCaptcha(true);
      config.notify("Invalid Captcha", "error");
    }
  };

  return (
    <div className="mainlogin">
      <div className="loginsec">
        <div className="leftlogin">
          <div className="loginlogo">
            {" "}
            <img src="/img/logo.png" alt="NAAC" />{" "}
            {/* <Image src="/img/logo.png" alt="NAAC"  width={240} height={80} priority={true} /> */}{" "}
          </div>
        </div>
        <div className="righttlogin">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="inputsec">
              <i>
                <BsFillPersonFill />
              </i>
              <input
                type="text"
                id="email"
                name="email"
                maxLength="50"
                autoComplete="off"
                className="inputfield"
                placeholder="Enter institutional email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div id="email_msg" className="text-red-500 text-sm"></div>
            </div>
            <div className="inputsec">
              <i>
                <RiLockPasswordFill />
              </i>
              <input
                type="password"
                id="password"
                name="password"
                maxLength="11"
                autoComplete="off"
                className="inputfield"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div id="password_msg" className="text-red-500 text-sm"></div>
            </div>
            <div className="captchasec">
              <div className="captchatext select-none">
                <TextToImage text={generatedCaptcha} />
                <div className="absolute inset-x-0 inset-y-5 bottom-0 h-[2px] bg-slate-500 transform rotate-6"></div>
              </div>
              <TfiReload
                onClick={() => setRefreshCaptcha(!refreshCaptcha)}
                className="mx-2"
              />
              <div>
                <input
                  type="text"
                  name="captcha"
                  maxLength="6"
                  className={`captcha ${checkCaptcha ? `border-red-700` : ""}`}
                  placeholder="Enter Captcha"
                  value={captchaInput}
                  onChange={(e) => captchaValidate(e)}
                  required
                />

                <div id="captcha_msg" className="text-red-500 text-sm"></div>
              </div>
            </div>
            <div className="inputsec">
              <button type="submit" className="logbtn" id="hei_loginbtn">
                LOG IN
              </button>
            </div>
          </form>
          <div className="logbot ">
            <div className="cursor-pointer">
              <BiSolidHelpCircle color="#3b82f6" />{" "}
              <Link href={"/forgot-password"}>Forgot Password</Link>
            </div>
            <div className="cursor-pointer">
              <BsFillFileEarmarkTextFill color="#3b82f6" />{" "}
              <Link href="/register">New Registration</Link>
            </div>
          </div>
          <div
            className="mt-4 text-red-500"
            id="divResult1"
            style={{
              overflow: "auto",
              border: "1px solid transparent",
              borderRadius: "4px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
