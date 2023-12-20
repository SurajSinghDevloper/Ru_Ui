"use client";
import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface DataType {
  firstName: string;
}

interface ContextProps {
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
  baseURL: string;
  setBaseURL: Dispatch<SetStateAction<string>>;
  iiqa: Record<string, DataType>;
  setIiqa: Dispatch<SetStateAction<Record<string, DataType>>>;
  collegeData: string;
  setCollegeData: Dispatch<SetStateAction<string>>;
  iiqaUpdate: boolean;
  setIIQAUpdate: Dispatch<SetStateAction<boolean>>;
  iiqaprogress: string;
  setIIQAProgress: Dispatch<SetStateAction<string>>;
  toggleSidebar: boolean;
  setToggleSideBar: Dispatch<SetStateAction<boolean>>;
  ssrID: string;
  setSSRID: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
  selectedMenu: "",
  setSelectedMenu: () => "",
  baseURL: "",
  setBaseURL: () => {},
  iiqa: {},
  setIiqa: () => {},
  collegeData: "",
  setCollegeData: () => "",
  iiqaUpdate: false,
  setIIQAUpdate: () => false,
  iiqaprogress: "",
  setIIQAProgress: () => "",
  toggleSidebar: false,
  setToggleSideBar: () => false,
  ssrID: "",
  setSSRID: () => "",
});

export const GlobalContextProvider = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [baseURL, setBaseURL] = useState("");
  const [iiqa, setIiqa] = useState({});
  const [collegeData, setCollegeData] = useState("");
  const [iiqaUpdate, setIIQAUpdate] = useState(false);
  const [iiqaprogress, setIIQAProgress] = useState("");
  const [toggleSidebar, setToggleSideBar] = useState(false);
  const [ssrID, setSSRID] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        selectedMenu,
        setSelectedMenu,
        baseURL,
        setBaseURL,
        iiqa,
        setIiqa,
        collegeData,
        setCollegeData,
        iiqaUpdate,
        setIIQAUpdate,
        iiqaprogress,
        setIIQAProgress,
        toggleSidebar,
        setToggleSideBar,
        ssrID,
        setSSRID,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const contextManager = () => useContext(GlobalContext);
