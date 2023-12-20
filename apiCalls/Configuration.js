import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import "react-toastify/dist/ReactToastify.css";

let tocen;
let collegeInfo;

const cookieAssign = () => {
  const JSONToken = getCookie("token");
  const JSONCollegeInfo = getCookie("collegeData");
  if (JSONToken) {
    tocen = JSON.parse(JSONToken);
    collegeInfo = JSON.parse(JSONCollegeInfo);
  }
};

let resp;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const RESOURCE_URL = process.env.NEXT_PUBLIC_RESOURCE;

const methodForFile = async (link, method, data) => {
  try {
    const response = await fetch(`${BASE_URL}/prepareiiqa/${link}`, {
      method: method,
      headers: {
        Authorization: `Bearer ${tocen}`,
      },
      body: data,
    });

    if (response.ok) {
      resp = await response.text();
      return resp;
    } else {
      console.error("File upload failed.");
      // Handle the failure case
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

const generateCaptcha = () => {
  let uniquechar = "";

  const randomchar =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 1; i < 7; i++) {
    uniquechar += randomchar.charAt(Math.random() * randomchar.length);
  }
  return uniquechar;
};

const apiRequest = async (method, url, data, json) => {
  const config = {
    method: method,
    headers: {
      Authorization: `Bearer ${tocen}`,
    },
  };
  if (json) {
    config.headers["Content-Type"] = "application/json";
  }
  if (data) {
    config.body = data; // Add body if data is provided
  }

  const response = await fetch(`${BASE_URL}/prepareiiqa/${url}`, config);
  if (!response) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  // Check if the response status is OK (200)
  if (response.status === 200 || response.status === 201) {
    const responseText = await response.text();
    if (responseText.trim() === "") {
      console.log("Table is Empty");
      return { message: "No data available" }; // Provide a default message
    }

    try {
      const responseData = JSON.parse(responseText);
      return responseData;
    } catch (error) {
      // console.error("Response in not a JSON");
      // If parsing fails, return responseText directly
      return responseText;
    }
  }
  if (response.status === 404) {
    console.log("Not Found");
  }
  // if (response.status === 204) {
  //   console.log("No content");
  // }

  // else {
  //   // throw new Error(`Request failed with status: ${response.status}`);
  //   console.log(response.status);
  // }
};

const deleteRequest = async (method, url, data) => {
  const config = {
    method: method,
    headers: {
      Authorization: `Bearer ${tocen}`,
      // "Content-Type": "application/json",
    },
  };
  if (data) {
    config.body = data;
  }

  const response = await fetch(`${BASE_URL}/prepareiiqa/${url}`, config);

  if (!response) {
    throw new Error(`Request failed with status: ${response.status}`);
  }
  if (response === null) {
    return null;
  }

  return response;
};

const notify = (message, type) => {
  // Determine the toast type based on the 'type' parameter (default to 'success')
  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: "success",
      });
      break;
    case "error":
      toast.error(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: "error",
      });
      break;
    case "info":
      toast.error(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: "info",
      });
    case "warning":
      toast.error(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: "warning",
      });
      break;
    // Add more cases for other types (info, warning, etc.) if needed
    default:
      toast(message);
      break;
  }
};

const ssrAPIRequest = async (method, url, data, json) => {
  const config = {
    method: method,
    headers: {
      Authorization: `Bearer ${tocen}`,
    },
  };
  if (json) {
    config.headers["Content-Type"] = "application/json";
  }
  if (data) {
    config.body = data; // Add body if data is provided
  }
  const response = await fetch(`${BASE_URL}/ssr/${url}`, config);
  if (!response) {
    throw new Error(`Request failed with status: ${response.status}`);
  }
  // Check if the response status is OK (200)
  if (
    response.status === 200 ||
    response.status === 201 ||
    response.status === 403
  ) {
    const responseText = await response.text();
    if (responseText.trim() === "") {
      return { message: "No data available" }; // Provide a default message
    }

    try {
      const responseData = JSON.parse(responseText);
      return responseData;
    } catch (error) {
      // If parsing fails, return responseText directly
      return responseText;
    }
  }
  if (response.status === 404) {
    console.log("Not Found");
  }
};
const prepareIIQAID = collegeInfo && collegeInfo.prepareIIQA_id;
const token = tocen;
const collegeData = collegeInfo;

export const config = {
  prepareIIQAID,
  deleteRequest,
  token,
  collegeData,
  methodForFile,
  apiRequest,
  BASE_URL,
  notify,
  generateCaptcha,
  cookieAssign,
  ssrAPIRequest,
  RESOURCE_URL,
};
