"use client";
import React, { useState, useEffect } from "react";
import { collegeType } from "../../contants";
import { config } from "apiCalls/Configuration";
import { ImBin2 } from "react-icons/im";
import { contextManager } from "context/store";

const ProfileInformation = ({ completedForm }) => {
  const { iiqa, iiqaUpdate, setIIQAUpdate, collegeData } = contextManager();

  // Method to separte Title and Name
  const setTitle = (full_name) => {
    const titles = ["Mr.", "Mrs.", "Dr.", "Ms.", "Prof."];
    const titleRegex = new RegExp("^(?:" + titles.join("|") + ")\\s", "i");

    const titleMatch = full_name.match(titleRegex);
    let title = titleMatch ? titleMatch[0].trim() : "";
    let name = titleMatch
      ? full_name.replace(titleRegex, "").trim()
      : full_name.trim();
    return { title, name };
  };
  const hoiInfo =
    (iiqa.headOfTheInstitution && setTitle(iiqa.headOfTheInstitution)) || "";
  const altFacultyInfo =
    (iiqa.alternateFacultyName && setTitle(iiqa.alternateFacultyName)) || "";

  const [formData, setFormData] = useState({
    hoiTitle: hoiInfo.title || "",
    name: hoiInfo.name || "",
    designation: iiqa.designation || "--Select--",
    ownsCampus:
      (iiqa.isCollegeFunctionFromOwnCampus === "YES" && "YES") || "NO",
    address: iiqa.collegeAddress || "",
    state: iiqa.stateOrUT || "",
    city: iiqa.city || "",
    pincode: iiqa.collegePincode || "",
    phoneNumber1: iiqa.collegePhoneAreaCode || "",
    phoneNumber2: iiqa.collegePhone || "",
    faxNumber1: iiqa.collegeFaxAreaCode || "",
    faxNumber2: iiqa.collegeFax || "",
    alternateEmail: iiqa.alternateEmail || "",
    altFacultyTitle: altFacultyInfo.title || "",
    altFacultyName: altFacultyInfo.name || "",
    altFacultyDesignation: iiqa.alternateFacultyDesignation || "--Select--",
    altFacultyAddress: iiqa.alternateFacultyAddress || "",
    altFacultyPincode: iiqa.alternateFacultyPincode || "",
    altFacultyPhoneNumber1: iiqa.alternateFacultyPhoneAreaCode || "",
    altFacultyPhoneNumber2: iiqa.alternateFacultyPhone || "",
    altFacultyFaxNumber1: iiqa.alternateFacultyFaxAreaCode || "",
    altFacultyFaxNumber2: iiqa.alternateFacultyFax || "",
    altFacultyMobileNo: iiqa.alternateFacultyMobile || "",
    altFacultyEmail: iiqa.alternateFacultyEmail || "",
    altFacultyAlternateEmail: iiqa.alternateFacultyAltenateEmail || "",
    website: iiqa.collegeWebsite || "",
    special_university: iiqa.isSpecificTypeOfCollege || "",
  });

  const [isSpecialUni, setIsSpecialUni] = useState(
    iiqa.isSpecificTypeOfCollege === "" ? false : true
  );
  const [variable, setVariable] = useState({
    section2f: {
      section2fState: (iiqa.documentOfRecognitionByUGC_2f && "1") || "0",
      section2fDate: iiqa.dateOfRecognitionByUGC_2f || "",
      section2fDocument: iiqa.documentOfRecognitionByUGC_2f || "",
    },
    section12b: {
      section12bState: (iiqa.documentOfRecognitionByUGC_12B && "1") || "0",
      section12bDate: iiqa.dateOfRecognitionByUGC_12B || "",
      section12bDocument: iiqa.documentOfRecognitionByUGC_12B || "",
    },
    autonomous: {
      autonomousState: (iiqa.documentOfRecognisedAutonomous && "1") || "0",
      autonomousDocument: iiqa.documentOfRecognisedAutonomous || "",
    },
    coe: {
      coeState: (iiqa.documentOfRecognisedAsCPE && "1") || "0",
      coeDocument: iiqa.documentOfRecognisedAsCPE || "",
    },
    cpe: {
      cpeState: (iiqa.documentRecognisedAsCollege_of_Excellence && "1") || "0",
      cpeDocument: iiqa.documentRecognisedAsCollege_of_Excellence || "",
    },
    aishe: {
      aisheState: (iiqa.documentAISHE_Upload_Date && "1") || "0",
      aisheDate: iiqa.dateOf_AISHE_Upload || "",
      aisheDocument: iiqa.documentAISHE_Upload_Date || "",
    },
    choi: {
      choiDocument: iiqa.documentCertification_by_Head_of_the_Institution || "",
    },
    rti: {
      rtiState: (iiqa.rtiactSection4_1_b_Declaration_Url && "1") || "0",
      rtiLink: iiqa.rtiactSection4_1_b_Declaration_Url || "",
    },
  });
  const [doc, setDoc] = useState({
    section2f: "",
    section12b: "",
    autonomous: "",
    coe: "",
    cpe: "",
    aishe: "",
    choi: "",
  });
  const [nature, setNature] = useState({
    Government: iiqa.natureOfCollegeGoverment || false,
    Private: iiqa.natureOfCollegePrivate || false,
    GrantInAid: iiqa.natureOfCollegeGrantAid || false,
    SelfFinancing: iiqa.natureOfCollegeSelfFinancing || false,
    Constituent: iiqa.natureOfCollegeConstitiuent || false,
  });
  const [statutoryCell, setStatutoryCell] = useState({
    commiteeForScSt: iiqa.statutoryCommittees_for_ST_SC === "true" || false,
    minorityCell: iiqa.statutoryCommittees_for_MinorityCell === "true" || false,
    grievanceRedressalCommittee:
      iiqa.statutoryCommittees_for_Grievance_Redressal === "true" || false,
    internalCompliantCommittee:
      iiqa.statutoryCommittees_for_Internal_Compliant === "true" || false,
    antiRaggingCommittee:
      iiqa.statutoryCommittees_for_Anti_ragging === "true" || false,
    obcCell: iiqa.statutoryCommittees_for_OBC_cell === "true" || false,
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
    if (name === "special_uni") {
      setIsSpecialUni(newValue);
    }
  };
  const handleSection2f = (e, input) => {
    let newName, newValue, file;
    if (e.target.value) {
      newValue = e.target.value;
    }
    if (e.target.name) {
      newName = e.target.name;
    }

    if (e.target.files !== null) {
      if (`variable.input.${input}Date`) {
        file = e.target.files[0];
        const fileExtension = file.name.split(".").pop().toLowerCase();

        if (fileExtension !== "pdf") {
          config.notify("File must be in PDF format.", "info");
          e.target.value = "";
          return;
        }
        config.notify("File Uploaded", "success");
      }

      if (
        `variable.${input}.${input}Date` === null ||
        `variable.${input}.${input}Date` === ""
      ) {
        config.notify("Please Enter Date First", "info");
        e.target.value = "";
        return;
      }
    }

    switch (input) {
      case "section2f":
        if (!file) {
          setVariable((prevState) => ({
            ...prevState,
            section2f: {
              ...prevState.section2f,
              [newName]: newValue,
            },
          }));
        } else {
          setVariable((prevState) => ({
            ...prevState,
            section2f: {
              ...prevState.section2f,
              section2fDocument: file.name, // Update the relevant section document property
              section2fFile: file,
              state: true,
            },
          }));
          setDoc({
            ...doc,
            section2f: file,
          });
        }
        break;
      case "section12b":
        if (!file) {
          setVariable((prevState) => ({
            ...prevState,
            section12b: {
              ...prevState.section12b,
              [newName]: newValue,
            },
          }));
        } else {
          setVariable((prevState) => ({
            ...prevState,
            section12b: {
              ...prevState.section12b,
              section12bDocument: file.name, // Update the relevant section document property
              section12bFile: file,
              state: true,
            },
          }));
          setDoc({
            ...doc,
            section12b: file,
          });
        }
        break;
      case "autonomous":
        if (!file) {
          setVariable((prevState) => ({
            ...prevState,
            autonomous: {
              ...prevState.autonomous,
              [newName]: newValue,
            },
          }));
        } else {
          setVariable((prevState) => ({
            ...prevState,
            autonomous: {
              ...prevState.autonomous,
              autonomousDocument: file.name, // Update the relevant autonomous document property
              autonomousFile: file,
              state: true,
            },
          }));
          setDoc({
            ...doc,
            autonomous: file,
          });
        }
        break;
      case "cpe":
        if (!file) {
          setVariable((prevState) => ({
            ...prevState,
            cpe: {
              ...prevState.cpe,
              [newName]: newValue,
            },
          }));
        } else {
          setVariable((prevState) => ({
            ...prevState,
            cpe: {
              ...prevState.cpe,
              cpeDocument: file.name, // Update the relevant autonomous document property
              cpeFile: file,
              state: true,
            },
          }));
          setDoc({
            ...doc,
            cpe: file,
          });
        }
        break;
      case "coe":
        if (!file) {
          setVariable((prevState) => ({
            ...prevState,
            coe: {
              ...prevState.coe,
              [newName]: newValue,
            },
          }));
        } else {
          setVariable((prevState) => ({
            ...prevState,
            coe: {
              ...prevState.coe,
              coeDocument: file.name, // Update the relevant autonomous document property
              coeFile: file,
              state: true,
            },
          }));
          setDoc({
            ...doc,
            coe: file,
          });
        }
        break;
      case "aishe":
        if (!file) {
          setVariable((prevState) => ({
            ...prevState,
            aishe: {
              ...prevState.aishe,
              [newName]: newValue,
            },
          }));
        } else {
          setVariable((prevState) => ({
            ...prevState,
            aishe: {
              ...prevState.aishe,
              aisheDocument: file.name, // Update the relevant autonomous document property
              aisheFile: file,
              state: true,
            },
          }));
          setDoc({
            ...doc,
            aishe: file,
          });
        }
        break;
      case "choi":
        if (!file) {
          setVariable((prevState) => ({
            ...prevState,
            choi: {
              ...prevState.choi,
              [newName]: newValue,
            },
          }));
        } else {
          setVariable((prevState) => ({
            ...prevState,
            choi: {
              ...prevState.choi,
              choiDocument: file.name, // Update the relevant autonomous document property
              choiFile: file,
              state: true,
            },
          }));
          setDoc({
            ...doc,
            choi: file,
          });
        }
        break;
      case "rti":
        setVariable((prevState) => ({
          ...prevState,
          rti: {
            ...prevState.rti,
            [newName]: newValue,
          },
        }));
        break;
      default:
        break;
    }
  };
  const sendData = async (date, pdf, url, field) => {
    const formData = new FormData();
    formData.append("prepareIIQA_ID", iiqa.iiqa_ID);
    date !== "" && formData.append("date", date);
    formData.append("pdf", pdf);

    try {
      const response = await config.methodForFile(url, "POST", formData);
      if (response) {
        setVariable((prevState) => ({
          ...prevState,
          [field]: {
            ...prevState[field],
            [`${field}Document`]: response,
            state: false,
          },
        }));
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  useEffect(() => {
    switch (true) {
      case variable.section2f.state:
        sendData(
          variable.section2f.section2fDate,
          variable.section2f.section2fFile,
          "updateIn-IIQA_DateOfRecognitionByUGCAndDocument",
          "section2f"
        );
        setVariable((prevState) => ({
          ...prevState,
          section2f: {
            ...prevState.section2f,
            state: false,
          },
        }));
        break;
      case variable.section12b.state:
        sendData(
          variable.section12b.section12bDate,
          variable.section12b.section12bFile,
          "updateIn-IIQA_DateOfRecognitionByUGC_12BAndDocument",
          "section12b"
        );
        setVariable((prevState) => ({
          ...prevState,
          section12b: {
            ...prevState.section12b,
            state: false,
          },
        }));
        break;
      case variable.autonomous.state:
        sendData(
          "",
          variable.autonomous.autonomousFile,
          "updateIIQA-IsCollege-Autonomus",
          "autonomous"
        );
        setVariable((prevState) => ({
          ...prevState,
          autonomous: {
            ...prevState.autonomous,
            state: false,
          },
        }));
        break;
      case variable.coe.state:
        sendData(
          variable.coe.coeDate,
          variable.coe.coeFile,
          "updateIIQA-IsCollege-COE",
          "coe"
        );
        setVariable((prevState) => ({
          ...prevState,
          coe: {
            ...prevState.coe,
            state: false,
          },
        }));
        break;
      case variable.cpe.state:
        sendData(
          variable.cpe.cpeDate,
          variable.cpe.cpeFile,
          "updateIIQA-IsCollege-CPE",
          "cpe"
        );
        setVariable((prevState) => ({
          ...prevState,
          cpe: {
            ...prevState.cpe,
            state: false,
          },
        }));
        break;
      case variable.aishe.state:
        sendData(
          variable.aishe.aisheDate,
          variable.aishe.aisheFile,
          "updateIn-IIQA_College_as_AISHE",
          "aishe"
        );
        setVariable((prevState) => ({
          ...prevState,
          aishe: {
            ...prevState.aishe,
            state: false,
          },
        }));
        break;
      case variable.choi.state:
        sendData(
          "",
          variable.choi.choiFile,
          "updateIn-IIQA_DocumentCertification_by_Head_of_the_Institution",
          "choi"
        );
        setVariable((prevState) => ({
          ...prevState,
          choi: {
            ...prevState.choi,
            state: false,
          },
        }));
        break;
      default:
        break;
    }
  }, [doc]);

  const deleteDoc = async (ele) => {
    const response = await config.deleteRequest(
      "POST",
      `${iiqa.iiqa_ID}/${ele}`
    );
    if (response) {
      config.notify("File Delted SuccessFully", "error");
    }
  };

  const handleDocDelete = async (e) => {
    switch (e) {
      case "file-recognitionByUGC-documnet":
        deleteDoc(e);
        const newObj = { ...variable };
        newObj.section2f.section2fDocument = "";
        setVariable(newObj);
        break;

      case "file-recognitionByUGC12B-documnet":
        deleteDoc(e);
        const newObj6 = { ...variable };
        newObj6.section2f.section2fDocument = "";
        setVariable(newObj6);
        break;
      case "file-recognitionAutonomous-documnet":
        deleteDoc(e);
        const newObj1 = { ...variable };
        newObj1.autonomous.autonomousDocument = "";
        setVariable(newObj1);
        break;

      case "file-recognitioncpe-documnet":
        deleteDoc(e);
        const newObj2 = { ...variable };
        newObj2.cpe.cpeDocument = "";
        setVariable(newObj2);
        break;

      case "file-recognition-college-of-Excellence-documnet":
        deleteDoc(e);
        const newObj3 = { ...variable };
        newObj3.cpe.cpeDocument = "";
        setVariable(newObj3);
        break;

      case "file-aishe-mhrd":
        deleteDoc(e);
        const newObj4 = { ...variable };
        newObj4.aishe.aisheDocument = "";
        setVariable(newObj4);
        break;

      case "file-head-of-institution":
        deleteDoc(e);
        const newObj5 = { ...variable };
        newObj5.choi.choiDocument = "";
        setVariable(newObj5);
        break;

      default:
        break;
    }
  };

  const handleSave = async () => {
    // for (const key in formData) {
    //   if (!formData[key]) {
    //     const fieldNameDisplay =
    //       key === "title"
    //         ? "Title"
    //         : key.charAt(0).toUpperCase() + key.slice(1);
    //     config.notify(`All fields are mandatory`, "info");
    //     return; // Stop checking fields once an empty field is found
    //   }
    //   if (
    //     !variable.aishe.aisheState ||
    //     !variable.autonomous.autonomousState ||
    //     !variable.choi.choiDocument ||
    //     !variable.coe.coeState ||
    //     !variable.cpe.cpeState ||
    //     !variable.section2f.section2fState ||
    //     // !variable.rti.rtiState
    //   ) {
    //     config.notify("All fields are mandatory", "info");
    //     return;
    //   }
    // }
    const data = {
      iiqa_ID: `${iiqa.iiqa_ID}`,
      headOfTheInstitution: `${formData.hoiTitle} ${formData.name}`,
      designation: formData.designation,
      isCollegeFunctionFromOwnCampus: formData.ownsCampus,
      collegeAddress: formData.address,
      city: formData.city,
      stateOrUT: formData.state,
      collegePincode: formData.pincode,
      collegePhoneAreaCode: formData.phoneNumber1,
      collegePhone: formData.phoneNumber2,
      collegeFaxAreaCode: formData.faxNumber1,
      collegeFax: formData.faxNumber2,
      alternateEmail: formData.alternateEmail,
      alternateFacultyName: `${formData.altFacultyTitle} ${formData.altFacultyName}`,
      alternateFacultyDesignation: formData.altFacultyDesignation,
      alternateFacultyAddress: formData.altFacultyAddress,
      alternateFacultyPincode: formData.altFacultyPincode,
      alternateFacultyPhoneAreaCode: formData.altFacultyPhoneNumber1,
      alternateFacultyPhone: formData.altFacultyPhoneNumber2,
      alternateFacultyFaxAreaCode: formData.altFacultyFaxNumber1,
      alternateFacultyFax: formData.altFacultyFaxNumber2,
      alternateFacultyMobile: formData.altFacultyMobileNo,
      alternateFacultyEmail: formData.altFacultyEmail,
      alternateFacultyAltenateEmail: formData.altFacultyAlternateEmail,
      collegeWebsite: formData.website,
      isSpecificTypeOfCollege: formData.special_university,
    };
    const updatedData = JSON.stringify(data);
    const response = await config.apiRequest(
      "PUT",
      "updateProfileInformationInIIQA",
      updatedData,
      "json"
    );

    const statutoryFormData = new FormData();
    statutoryFormData.append(
      "StatutoryCommittees_for_ST_SC",
      statutoryCell.commiteeForScSt
    );
    statutoryFormData.append(
      "StatutoryCommittees_for_MinorityCell",
      statutoryCell.minorityCell
    );
    statutoryFormData.append(
      "StatutoryCommittees_for_Grievance_Redressal",
      statutoryCell.grievanceRedressalCommittee
    );
    statutoryFormData.append(
      "StatutoryCommittees_for_Internal_Compliant",
      statutoryCell.internalCompliantCommittee
    );
    statutoryFormData.append(
      "StatutoryCommittees_for_Anti_ragging",
      statutoryCell.antiRaggingCommittee
    );
    statutoryFormData.append(
      "StatutoryCommittees_for_OBC_cell",
      statutoryCell.obcCell
    );
    const statutoryResponse = await config.apiRequest(
      "PUT",
      `${iiqa.iiqa_ID}/updateStatutoryCommittees`,
      statutoryFormData
    );

    const natureData = {
      natureOfCollegeGoverment: nature.Government,
      natureOfCollegePrivate: nature.Private,
      natureOfCollegeGrantAid: nature.GrantInAid,
      natureOfCollegeSelfFinancing: nature.SelfFinancing,
      natureOfCollegeConstitiuent: nature.Constituent,
    };

    const natureResponse = await config.apiRequest(
      "PUT",
      `${iiqa.iiqa_ID}/update-natures-of-college`,
      JSON.stringify(natureData),
      "json"
    );

    if (response && statutoryResponse && natureResponse) {
      completedForm("Profile Information");
      setIIQAUpdate(!iiqaUpdate);
      config.notify("Profile Information completed", "successs");
    }

    const rtiFormData = new FormData();
    rtiFormData.append("url", variable.rti.rtiLink);

    config.apiRequest(
      "POST",
      `${iiqa.iiqa_ID}/rti-act-Section4-1-b`,
      rtiFormData
    );
  };

  const handleListChange = (event, field) => {
    const { name, checked } = event.target;
    switch (field) {
      case "nature":
        if (name === "Government" || name === "Constituent") {
          setNature((prevNature) => ({
            ...prevNature,
            ["Private"]: false,
          }));
        }
        if (name === "Private") {
          setNature((prevNature) => ({
            ...prevNature,
            ["Government"]: false,
            ["Constituent"]: false,
          }));
        }
        setNature((prevNature) => ({
          ...prevNature,
          [name]: checked,
        }));
        break;
      case "statutory":
        setStatutoryCell((prevState) => ({
          ...prevState,
          [name]: checked,
        }));
        break;
      default:
        break;
    }
  };

  const handleCheck = (e) => {
    const inputValue = e.target.value;
    const isValidHTTP =
      inputValue.startsWith("http://") || inputValue.startsWith("https://");
    if (!isValidHTTP) {
      config.notify("Put valid URL", "error");
    }
  };

  return (
    <>
      <div className=" border p-2">
        {/* Profile Data Requirements */}
        <>
          <div className="p-3 bg-slate-500">
            <h1 className="font-bold text-white">Profile Data Requirements</h1>
          </div>
          <div className="flex flex-row w-full border mt-2 p-3">
            <label className="w-2/5">
              Name of the Head of the Institution:
            </label>

            <div className="flex w-3/5">
              <select
                name="hoiTitle"
                value={formData.hoiTitle}
                onChange={handleInputChange}
                className="w-1/5 rounded-md border p-2"
                required
              >
                <option>--Select--</option>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Dr.</option>
                <option>Ms.</option>
                <option>Prof.</option>
              </select>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-3/5 form-control rounded-md border p-2 ml-3"
                type="text"
                required
              />
            </div>
          </div>

          <div className="flex border mt-2 p-3">
            <label className="w-2/5">Designation:</label>

            <select
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="form-control w-2/5 rounded-md border p-2 "
              required
            >
              <option>--Select--</option>
              <option>Principal</option>
              <option>Principal (in-Charge)</option>
              <option>Director</option>
              <option>Director (in-Charge)</option>
            </select>
          </div>

          <div className="border mt-2 p-3 flex">
            <label className="w-2/5">
              Does the college function from Own Campus
            </label>
            <div className="justify-start flex w-3/5">
              <div className="box-content w-1/3">
                <label className="mr-2">Yes</label>
                <input
                  name="ownsCampus"
                  type="radio"
                  value="YES"
                  checked={formData.ownsCampus === "YES"}
                  onChange={handleInputChange}
                />
              </div>
              <div className="box-content w-1/3">
                <label className="mr-2">No</label>
                <input
                  name="ownsCampus"
                  type="radio"
                  value="NO"
                  checked={formData.ownsCampus === "NO"}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </>

        {/* Address of the College */}
        <div className="border mt-2 ">
          <div className="p-3 border bg-slate-500">
            <h1 className="font-bold text-white">Address of the College</h1>
          </div>
          <form className="mx-auto p-3 space-y-1">
            <div className="grid grid-cols-2 gap-1">
              <div className="col-span-1">
                <label className="text-gray-600">Address: </label>
              </div>
              <div className="col-span-1">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 h-50"
                  type="text"
                  placeholder="Enter Address"
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">State/Ut :</label>
              </div>
              <div className="col-span-1">
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  disabled
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">City:</label>
              </div>
              <div className="col-span-1">
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  disabled
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">Pincode:</label>
              </div>
              <div className="col-span-1">
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder="Enter Pincode"
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">Phone Number:</label>
              </div>
              <div className="col-span-1 flex">
                <input
                  name="phoneNumber1"
                  value={formData.phoneNumber1}
                  onChange={handleInputChange}
                  className="w-2/5 border border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder="Enter area code"
                />
                <input
                  name="phoneNumber2"
                  value={formData.phoneNumber2}
                  onChange={handleInputChange}
                  className="w-3/5 border border-gray-300 rounded-md p-2 ml-3"
                  type="text"
                  placeholder="Enter Phone Number"
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">Fax Number:</label>
              </div>
              <div className="col-span-1 flex">
                <input
                  name="faxNumber1"
                  value={formData.faxNumber1}
                  onChange={handleInputChange}
                  className="w-2/5 border border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder="Enter area code"
                />
                <input
                  name="faxNumber2"
                  value={formData.faxNumber2}
                  onChange={handleInputChange}
                  className="w-3/5 border border-gray-300 rounded-md p-2 ml-3"
                  type="text"
                  placeholder="Enter Fax Number"
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">Registered Mobile No:</label>
              </div>
              <div className="col-span-1">
                <input
                  name="registeredMobileNo"
                  value={collegeData.collegeMobileNo}
                  className="w-full border border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder="Enter Registered Mobile No"
                  disabled
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">Registered Email:</label>
              </div>
              <div className="col-span-1">
                <input
                  name="registeredEmail"
                  value={collegeData.collegeEmailID}
                  className="w-full border border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder="Enter Registered Email"
                  disabled
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">Alternate Email:</label>
              </div>
              <div className="col-span-1">
                <input
                  name="alternateEmail"
                  value={formData.alternateEmail}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder="Enter Alternate Email"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Alternate Faculty Contact Details */}
        <div className="border mt-2 ">
          <div className="p-3 border bg-slate-500">
            <h1 className="font-bold text-white">
              Alternate Faculty Contact Details
            </h1>
          </div>
          <form className="mx-auto p-3 space-y-1">
            <div className="grid grid-cols-2 gap-1">
              <div className="col-span-1">
                <label className="text-gray-600">Name: </label>
              </div>
              <div className="col-span-1 flex">
                <select
                  name="altFacultyTitle"
                  value={formData.altFacultyTitle}
                  onChange={handleInputChange}
                  className="form-control w-40 rounded-md border p-2 mr-3"
                >
                  <option>--Select--</option>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Dr.</option>
                  <option>Ms.</option>
                  <option>Prof.</option>
                </select>
                <input
                  name="altFacultyName"
                  value={formData.altFacultyName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 h-50"
                  type="text"
                  placeholder="Enter Name"
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">Select Designation:</label>
              </div>
              <div className="col-span-1">
                <select
                  name="altFacultyDesignation"
                  value={formData.altFacultyDesignation}
                  onChange={handleInputChange}
                  className="form-control w-full rounded-md border p-2 mr-3"
                >
                  <option>--Select--</option>
                  <option>Professor</option>
                  <option>Associate professor</option>
                  <option>IQAC / CIQA Coordinator</option>
                </select>
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">Address:</label>
              </div>
              <div className="col-span-1">
                <textarea
                  name="altFacultyAddress"
                  value={formData.altFacultyAddress}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 h-22 rounded-md p-2"
                  type="text"
                  placeholder="Enter Address"
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">State / UT:</label>
              </div>
              <div className="col-span-1">
                <input
                  name="altFacultyState"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  disabled
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">City:</label>
              </div>
              <div className="col-span-1">
                <input
                  name="altFacultyCity"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  disabled
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">Pincode:</label>
              </div>
              <div className="col-span-1">
                <input
                  name="altFacultyPincode"
                  value={formData.altFacultyPincode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder="Enter Pincode"
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">Phone Number:</label>
              </div>
              <div className="col-span-1 flex">
                <input
                  name="altFacultyPhoneNumber1"
                  value={formData.altFacultyPhoneNumber1}
                  onChange={handleInputChange}
                  className="w-2/5 border border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder="Enter area code"
                />
                <input
                  name="altFacultyPhoneNumber2"
                  value={formData.altFacultyPhoneNumber2}
                  onChange={handleInputChange}
                  className="w-3/5 border border-gray-300 rounded-md p-2 ml-3"
                  type="text"
                  placeholder="Enter Phone Number"
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">Fax Number:</label>
              </div>
              <div className="col-span-1 flex">
                <input
                  name="altFacultyFaxNumber1"
                  value={formData.altFacultyFaxNumber1}
                  onChange={handleInputChange}
                  className="w-2/5 border border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder="Enter area code"
                />
                <input
                  name="altFacultyFaxNumber2"
                  value={formData.altFacultyFaxNumber2}
                  onChange={handleInputChange}
                  className="w-3/5 border border-gray-300 rounded-md p-2 ml-3"
                  type="text"
                  placeholder="Enter Fax Number"
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">Mobile No:</label>
              </div>
              <div className="col-span-1">
                <input
                  name="altFacultyMobileNo"
                  value={formData.altFacultyMobileNo}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder="Enter Mobile No"
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">Email:</label>
              </div>
              <div className="col-span-1">
                <input
                  name="altFacultyEmail"
                  value={formData.altFacultyEmail}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder="Enter Email"
                />
              </div>
              <div className="col-span-1">
                <label className="text-gray-600">Alternate Email:</label>
              </div>
              <div className="col-span-1">
                <input
                  name="altFacultyAlternateEmail"
                  value={formData.altFacultyAlternateEmail}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  type="text"
                  placeholder="Enter Alternate Email"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="border mt-2 p-3">
          <form className="mx-auto space-y-1">
            <div className="grid grid-cols-2 gap-1">
              <div className="col-span-1">
                <label className="text-gray-600">
                  Website [e.g. :www.abc.com] :
                </label>
              </div>
              <div className="col-span-1">
                <input
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 h-50"
                  type="text"
                  placeholder="Enter Field 1"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Nature of college */}
        <div className="card border flex flex-row mt-2 p-3">
          <div>
            Nature of the College
            <span
              data-placement="right"
              title="(Classified based on financial management)"
            ></span>
          </div>
          <div className="ml-auto mr-80">
            <div className="mr-40">
              <label>
                <input
                  className=""
                  name="Government"
                  type="checkbox"
                  value="Government"
                  checked={nature.Government}
                  onChange={(e) => handleListChange(e, "nature")}
                />
                Government
              </label>
            </div>
            <div>
              <label>
                <input
                  className=""
                  name="Private"
                  type="checkbox"
                  value="Private"
                  checked={nature.Private}
                  onChange={(e) => handleListChange(e, "nature")}
                />
                Private
              </label>
            </div>
            <div>
              <label>
                <input
                  className=""
                  name="GrantInAid"
                  type="checkbox"
                  value="GrantInAid"
                  checked={nature.GrantInAid}
                  onChange={(e) => handleListChange(e, "nature")}
                />
                Grant-in-aid
              </label>
            </div>
            <div>
              <label>
                <input
                  className=""
                  name="SelfFinancing"
                  type="checkbox"
                  value="SelfFinancing"
                  checked={nature.SelfFinancing}
                  onChange={(e) => handleListChange(e, "nature")}
                />
                Self Financing
              </label>
            </div>
            <div>
              <label>
                <input
                  className=""
                  type="checkbox"
                  name="Constituent"
                  value="Constituent"
                  checked={nature.Constituent}
                  onChange={(e) => handleListChange(e, "nature")}
                />
                Constituent
              </label>
            </div>
            <div id="nature_msg" style={{ color: "red" }}></div>
          </div>
        </div>

        {/* type of college */}
        <div className="border mt-2 p-3">
          <div className="flex">
            <div className="w-2/5 mr-4">
              <div className="w-full">
                Are you a specific type of college?
                <span
                  data-placement="right"
                  title="Health Science and allied institutions and Teacher education institution should use this option and select the appropriate Manual"
                ></span>
              </div>
            </div>
            <div className="w-3/5">
              <div className="flex justify-start w-full">
                <div className="flex justify-start w-full">
                  <label className="w-1/3">
                    Yes
                    <input
                      id="special_uni_yes"
                      className="ml-2"
                      onChange={() => setIsSpecialUni(true)}
                      name="special_uni"
                      type="radio"
                      value="1"
                      checked={isSpecialUni === true}
                    />
                  </label>
                  <label className="w-1/3">
                    No
                    <input
                      className="ml-2"
                      onChange={() => {
                        setIsSpecialUni(false);
                        setFormData((prevData) => ({
                          ...prevData,
                          special_university: "",
                        }));
                      }}
                      name="special_uni"
                      type="radio"
                      value="0"
                      checked={isSpecialUni === false}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {isSpecialUni && (
            <div className="w-full justify-end flex mt-8">
              <div className="w-3/5">
                <div className="input-group">
                  <div id="special_uni flex">
                    {collegeType.map((ele, index) => {
                      return (
                        <div key={index} className="flex flex-row w-full">
                          {ele.map((label, index) => (
                            <div
                              key={index}
                              className="mb-2 flex flex-col w-1/2"
                            >
                              <label className="checkbox-inline">
                                <input
                                  type="radio"
                                  name="special_university"
                                  value={index + 1}
                                  checked={
                                    formData.special_university === label
                                  }
                                  onChange={() => {
                                    setFormData(() => ({
                                      ...formData,
                                      special_university: label,
                                    }));
                                  }}
                                />{" "}
                                <b>{label}</b>
                              </label>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2f */}
        <div className=" border mt-2 p-2">
          <div className="flex">
            <div className="w-2/5 mr-4">
              <div className="w-full">
                Is the Institution recognized under section 2(f) of the UGC Act?
                If yes, date of the recognition by UGC under section 2(f)
                (upload document)
              </div>
            </div>
            <div className="w-3/5">
              <div className="flex justify-start w-full">
                <div className="flex justify-start w-full">
                  <label className="w-1/3">
                    Yes
                    <input
                      // id="section_2f_yes"
                      className="ml-2"
                      onChange={(e) => handleSection2f(e, "section2f")}
                      value="1"
                      name="section2fState"
                      type="radio"
                      defaultChecked={variable.section2f.section2fState === "1"}
                    />
                  </label>
                  <label className="w-1/3">
                    No
                    <input
                      // id="section_2f_no"
                      className="ml-2"
                      onChange={(e) => handleSection2f(e, "section2f")}
                      name="section2fState"
                      type="radio"
                      value="0"
                      defaultChecked={variable.section2f.section2fState === "0"}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {variable.section2f.section2fState === "1" && (
            <div className="flex flex-row justify-end w-full">
              <div
                id="hei_ugc_recognitions_date_2f"
                className="w-3/5 flex flex-row"
              >
                <input
                  className="w-1/4 border border-gray-300 rounded-md p-2 mr-1"
                  type="date"
                  name="section2fDate"
                  value={variable.section2f.section2fDate}
                  onChange={(e) => handleSection2f(e, "section2f")}
                />
                {variable.section2f.section2fDocument ? (
                  <div className="flex flex-row">
                    <a
                      className="cursor-pointer my-auto ml-2"
                      href={`${config.BASE_URL}/files/view/${variable.section2f.section2fDocument}`}
                      target="_blank"
                    >
                      View Document
                    </a>
                    <div
                      className="ml-2 my-auto cursor-pointer"
                      name="section2f"
                      onClick={() =>
                        handleDocDelete("file-recognitionByUGC-documnet")
                      }
                    >
                      <ImBin2 />
                    </div>
                  </div>
                ) : (
                  <label
                    className="custom-file-upload border  bg-gradient-to-br from-slate-100 to-slate-200
                  text-black/80
                  rounded-md
                  cursor-pointer
                  shadow-xl shadow-slate-300/60 p-2"
                    title={
                      variable.section2f.section2fDate === ""
                        ? "Please Enter Date"
                        : ""
                    }
                    onChange={(e) => handleSection2f(e, "section2f")}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      name="fileInput"
                      accept=".pdf"
                      style={{ display: "none" }}
                    />
                    Upload File
                  </label>
                )}
                {/* <b
                  className="text-white cursor-pointer p-2 bg-black rounded-full aspect-square"
                  title="(If there are multiple files for uploading, they have to be merged and uploaded as a single file. The file format for uploading shall be .pdf format and the size of the file should not exceed 1MB )"
                >
                  ?
                </b> */}
              </div>
            </div>
          )}
        </div>

        {/* Section 12B */}
        <div className=" border mt-2 p-2">
          <div className="flex">
            <div className="w-2/5 mr-4">
              <div className="w-full">
                Is the Institution recognized under section 12B of the UGC Act?
                If yes, date of the recognition by UGC under section 12B along
                with latest Plan General Developement Grant release letter
                (upload document)
              </div>
            </div>
            <div className="w-3/5">
              <div className="flex justify-start w-full">
                <div className="flex justify-start w-full">
                  <label className="w-1/3">
                    Yes
                    <input
                      // id="section_2f_yes"
                      className="ml-2"
                      onChange={(e) => handleSection2f(e, "section12b")}
                      value="1"
                      name="section12bState"
                      type="radio"
                      defaultChecked={
                        variable.section12b.section12bState === "1"
                      }
                    />
                  </label>
                  <label className="w-1/3">
                    No
                    <input
                      // id="section_2f_no"
                      className="ml-2"
                      onChange={(e) => handleSection2f(e, "section12b")}
                      name="section12bState"
                      type="radio"
                      value="0"
                      defaultChecked={
                        variable.section12b.section12bState === "0"
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {variable.section12b.section12bState === "1" && (
            <div className="flex flex-row justify-end w-full">
              <div
                id="hei_ugc_recognitions_date_2f"
                className="w-3/5 flex flex-row"
              >
                <input
                  className="w-1/4 border border-gray-300 rounded-md p-2 mr-1"
                  type="date"
                  name="section12bDate"
                  value={variable.section12b.section12bDate}
                  onChange={(e) => handleSection2f(e, "section12b")}
                />
                {variable.section12b.section12bDocument ? (
                  <div className="flex flex-row">
                    <a
                      className="cursor-pointer my-auto ml-2"
                      href={`${config.BASE_URL}/files/view/${variable.section12b.section12bDocument}`}
                      target="_blank"
                    >
                      View Document
                    </a>
                    <div
                      className="ml-2 my-auto cursor-pointer"
                      name="section2f"
                      onClick={() =>
                        handleDocDelete("file-recognitionByUGC12B-documnet")
                      }
                    >
                      <ImBin2 />
                    </div>
                  </div>
                ) : (
                  <label
                    className="custom-file-upload border  bg-gradient-to-br from-slate-100 to-slate-200
                  text-black/80
                  rounded-md
                  cursor-pointer
                  shadow-xl shadow-slate-300/60 p-2"
                    title={
                      variable.section12b.section12bDate === ""
                        ? "Please Enter Date"
                        : ""
                    }
                    onChange={(e) => handleSection2f(e, "section12b")}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      name="fileInput"
                      accept=".pdf"
                      style={{ display: "none" }}
                    />
                    Upload File
                  </label>
                )}{" "}
                {/* <b
                  className="text-white cursor-pointer p-2 bg-black rounded-full aspect-square"
                  title="(If there are multiple files for uploading, they have to be merged and uploaded as a single file. The file format for uploading shall be .pdf format and the size of the file should not exceed 1MB )"
                >
                  ?
                </b> */}
              </div>
            </div>
          )}
        </div>

        {/* Autonomous College */}
        <div className="border mt-2 p-3">
          <div className="flex">
            <div className="w-2/5 mr-4">
              <div className="w-full">
                Is the institution recognised as an Autonomous College by the
                UGC?
                {variable.autonomous.autonomousState === "1" && (
                  <span> (if yes, upload document)</span>
                )}
              </div>
            </div>
            <div className="w-3/5">
              <div className="flex justify-start w-full">
                <div className="flex justify-start w-full">
                  <label className="w-1/3">
                    Yes
                    <input
                      className="ml-2"
                      onChange={(e) => handleSection2f(e, "autonomous")}
                      value="1"
                      name="autonomousState"
                      type="radio"
                      defaultChecked={
                        variable.autonomous.autonomousState === "1"
                      }
                    />
                  </label>
                  <label className="w-1/3">
                    No
                    <input
                      className="ml-2"
                      onChange={(e) => handleSection2f(e, "autonomous")}
                      name="autonomousState"
                      type="radio"
                      value="0"
                      defaultChecked={
                        variable.autonomous.autonomousState === "0"
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {variable.autonomous.autonomousState === "1" && (
            <div className="flex justify-end w-full">
              <div id="ugcdoc6" className="w-3/5">
                {variable.autonomous.autonomousDocument ? (
                  <div className="flex flex-row">
                    <a
                      className="cursor-pointer my-auto ml-2"
                      href={`${config.BASE_URL}/files/view/${variable.autonomous.document}`}
                      target="_blank"
                    >
                      View Document
                    </a>
                    <div
                      className="ml-2 my-auto cursor-pointer"
                      name="section2f"
                      onClick={() =>
                        handleDocDelete("file-recognitionAutonomous-documnet")
                      }
                    >
                      <ImBin2 />
                    </div>
                  </div>
                ) : (
                  <label
                    className="custom-file-upload border  bg-gradient-to-br from-slate-100 to-slate-200
                  text-black/80
                  rounded-md
                  cursor-pointer
                  shadow-xl shadow-slate-300/60 p-2"
                    title={
                      variable.autonomous.date === "" ? "Please Enter Date" : ""
                    }
                    onChange={(e) => handleSection2f(e, "autonomous")}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      name="fileInput"
                      accept=".pdf"
                      style={{ display: "none" }}
                    />
                    Upload File
                  </label>
                )}

                <span
                  data-placement="right"
                  title="(If there are multiple files for uploading, they have to be merged and uploaded as a single file. The file format for uploading shall be .pdf format and the size of the file should not exceed 1MB )"
                  className="glyphicon glyphicon-question-sign"
                ></span>
                <input
                  type="hidden"
                  name="checkugc6"
                  id="checkugc6"
                  autoComplete="off"
                />
              </div>
            </div>
          )}
        </div>

        {/*CPE*/}
        <div className="border mt-2 p-3">
          <div className="flex">
            <div className="w-2/5 mr-4">
              <div className="w-full">
                Is the institution recognised as a &apos;College with Potential
                for Excellence (CPE)&apos; by the UGC? (upload document)
                {variable.cpe.cpeState && <span> (upload document)</span>}
              </div>
            </div>
            <div className="w-3/5">
              <div className="flex justify-start w-full">
                <div className="flex justify-start w-full">
                  <label className="w-1/3">
                    Yes
                    <input
                      className="ml-2"
                      onChange={(e) => handleSection2f(e, "cpe")}
                      value="1"
                      name="cpeState"
                      type="radio"
                      defaultChecked={variable.cpe.cpeState === "1"}
                    />
                  </label>
                  <label className="w-1/3">
                    No
                    <input
                      className="ml-2"
                      onChange={(e) => handleSection2f(e, "cpe")}
                      value="0"
                      name="cpeState"
                      type="radio"
                      defaultChecked={variable.cpe.cpeState === "0"}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {variable.cpe.cpeState === "1" && (
            <div className="flex justify-end w-full">
              <div className="w-3/5">
                {variable.cpe.cpeDocument ? (
                  <div className="flex flex-row">
                    <a
                      className="cursor-pointer my-auto ml-2"
                      href={`${config.BASE_URL}/files/view/${variable.cpe.cpeDocument}`}
                      target="_blank"
                    >
                      View Document
                    </a>
                    <div
                      className="ml-2 my-auto cursor-pointer"
                      name="section2f"
                      onClick={() =>
                        handleDocDelete("file-recognitioncpe-documnet")
                      }
                    >
                      <ImBin2 />
                    </div>
                  </div>
                ) : (
                  <label
                    className="custom-file-upload border  bg-gradient-to-br from-slate-100 to-slate-200
                  text-black/80
                  rounded-md
                  cursor-pointer
                  shadow-xl shadow-slate-300/60 p-2"
                    onChange={(e) => handleSection2f(e, "cpe")}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      name="fileInput"
                      accept=".pdf"
                      style={{ display: "none" }}
                    />
                    Upload File
                  </label>
                )}
              </div>{" "}
            </div>
          )}
        </div>

        {/* COE */}
        <div className="border mt-2 p-3">
          <div className="flex">
            <div className="w-2/5 mr-4">
              <div className="w-full">
                Is the institution recognised as a &apos;College of
                Excellence&apos; by the UGC?
                {variable.coe.coeState && <span> (upload document)</span>}
              </div>
            </div>
            <div className="w-3/5">
              <div className="flex justify-start w-full">
                <div className="flex justify-start w-full">
                  <label className="w-1/3">
                    Yes
                    <input
                      className="ml-2"
                      onChange={(e) => handleSection2f(e, "coe")}
                      value="1"
                      name="coeState"
                      type="radio"
                      defaultChecked={variable.coe.coeState === "1"}
                    />
                  </label>
                  <label className="w-1/3">
                    No
                    <input
                      className="ml-2"
                      onChange={(e) => handleSection2f(e, "coe")}
                      value="0"
                      name="coeState"
                      type="radio"
                      defaultChecked={variable.coe.coeState === "0"}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {variable.coe.coeState === "1" && (
            <div className="flex justify-end w-full">
              <div className="w-3/5">
                {variable.coe.coeDocument ? (
                  <div className="flex flex-row">
                    <a
                      className="cursor-pointer my-auto ml-2"
                      href={`${config.BASE_URL}/files/view/${variable.coe.coeDocument}`}
                      target="_blank"
                    >
                      View Document
                    </a>
                    <div
                      className="ml-2 my-auto cursor-pointer"
                      name="section2f"
                      onClick={() =>
                        handleDocDelete(
                          "file-recognition-college-of-Excellence-documnet"
                        )
                      }
                    >
                      <ImBin2 />
                    </div>
                  </div>
                ) : (
                  <label
                    className="custom-file-upload border  bg-gradient-to-br from-slate-100 to-slate-200
                  text-black/80
                  rounded-md
                  cursor-pointer
                  shadow-xl shadow-slate-300/60 p-2"
                    onChange={(e) => handleSection2f(e, "coe")}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      name="fileInput"
                      accept=".pdf"
                      style={{ display: "none" }}
                    />
                    Upload File
                  </label>
                )}
              </div>{" "}
            </div>
          )}
        </div>

        {/* AISHE */}
        <div className="border mt-2 p-3">
          <div className="flex">
            <div className="flex w-full mr-4">
              <div className="w-2/5">
                Date of uploading data on MHRD website for All India Survey on
                Higher Education (AISHE).
                {variable.aishe.aisheState && <span> (upload document)</span>}
              </div>
              <div className="w-3/5 flex">
                <input
                  id="aishe_date"
                  className="w-1/4 border border-gray-300 rounded-md p-2 mr-1"
                  type="date"
                  name="aisheDate"
                  value={variable.aishe.aisheDate}
                  onChange={(e) => handleSection2f(e, "aishe")}
                />

                {variable.aishe.aisheDocument ? (
                  <div className="flex flex-row">
                    <a
                      className="cursor-pointer my-auto ml-2"
                      href={`${config.BASE_URL}/files/view/${variable.aishe.aisheDocument}`}
                      target="_blank"
                    >
                      View Document
                    </a>
                    <div
                      className="ml-2 my-auto cursor-pointer"
                      name="section2f"
                      onClick={() => handleDocDelete("file-aishe-mhrd")}
                    >
                      <ImBin2 />
                    </div>
                  </div>
                ) : (
                  <label
                    className="custom-file-upload border  bg-gradient-to-br from-slate-100 to-slate-200
                  text-black/80
                  rounded-md
                  cursor-pointer
                  shadow-xl shadow-slate-300/60 p-2"
                    title={
                      variable.aishe.aisheDate === "" ? "Please Enter Date" : ""
                    }
                    onChange={(e) => handleSection2f(e, "aishe")}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      name="fileInput"
                      accept=".pdf"
                      style={{ display: "none" }}
                    />
                    Upload File
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CHOI */}
        <div className="border mt-2 p-3">
          <div className="flex">
            <div className="flex w-full mr-4">
              <div className="w-2/5">
                Attach Certification by the Head of the Institution for having
                complied with Rules &amp; Regulations of Central Government,
                State Government, UGC, Affiliating University, and other
                applicable SRA in the prescribed format of NAAC.
                <br />
                <a
                  target="_new"
                  href="https://assessmentonline.naac.gov.in/public/pdf/statement_compliance.docx"
                  className="font-bold"
                >
                  Download prescribed format
                </a>
                <span
                  data-placement="right"
                  title="Download the prescribed format and fill it, take the print on Letterhead of the Institute. Kindly upload the undertaking without deleting any clause with the signature and seal of the Head of the Institution in .pdf format. Kindly fill the Internet Protocol address (IP address) in clause H of the undertaking."
                  className="glyphicon glyphicon-question-sign"
                ></span>
              </div>
              <div className="w-3/5">
                {variable.choi.choiDocument ? (
                  <div className="flex">
                    <a
                      className="cursor-pointer my-auto ml-2"
                      href={`${config.BASE_URL}/files/view/${variable.choi.choiDocument}`}
                      target="_blank"
                    >
                      View Document
                    </a>
                    <div
                      className="ml-2 my-auto cursor-pointer"
                      name="section2f"
                      onClick={() =>
                        handleDocDelete("file-head-of-institution")
                      }
                    >
                      <ImBin2 />
                    </div>
                  </div>
                ) : (
                  <label
                    className="custom-file-upload border  bg-gradient-to-br from-slate-100 to-slate-200
                  text-black/80
                  rounded-md
                  cursor-pointer
                  shadow-xl shadow-slate-300/60 p-2 w-1/3"
                    onChange={(e) => handleSection2f(e, "choi")}
                  >
                    <input
                      type="file"
                      id="fileInputCE"
                      name="fileInput"
                      accept=".pdf"
                      style={{ display: "none" }}
                    />
                    Upload File
                  </label>
                )}
                <div id="ugcdoc12" className="text-right flex-col">
                  <span
                    data-placement="right"
                    title="(If there are multiple files for uploading, they have to be merged and uploaded as a single file. The file format for uploading shall be .pdf format and the size of the file should not exceed 1MB )"
                    className="glyphicon glyphicon-question-sign"
                  ></span>
                  <input
                    type="hidden"
                    name="checkugc12"
                    id="checkugc12"
                    autoComplete="off"
                  />
                </div>
                <div
                  className="col-lg-8"
                  id="checkugc12_msg"
                  style={{ color: "red" }}
                ></div>
                <br />
              </div>
            </div>
          </div>
        </div>

        {/* RTI */}
        <div className=" border mt-2 p-3">
          <div className="row items-center flex">
            <div className="w-2/5">
              <div className="col-lg-12">
                Has the institution made statutory declaration on the
                institution website under Section 4 (1)(b) of the RTI act 2005
                as issued and amended from time to time.
              </div>
            </div>
            <div className="w-3/5 ">
              <div className="flex justify-start w-full">
                <div className="flex justify-start w-full">
                  <label className="w-1/3">
                    Yes
                    <input
                      className="ml-2"
                      name="rtiState"
                      type="radio"
                      value="1"
                      onChange={(e) => handleSection2f(e, "rti")}
                      defaultChecked={variable.rti.rtiState === "1"}
                    />
                  </label>
                  <label className="w-1/3">
                    No
                    <input
                      className="ml-2"
                      // checked={!hasDeclaredRTI}
                      name="rtiState"
                      type="radio"
                      value="0"
                      onChange={(e) => handleSection2f(e, "rti")}
                      defaultChecked={variable.rti.rtiState === "0"}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {variable.rti.rtiState === "1" && (
            <div className="flex flex-row justify-end w-full">
              <div className="w-3/5 flex flex-row">
                <input
                  type="text"
                  name="rtiLink"
                  onBlur={handleCheck}
                  onChange={(e) => handleSection2f(e, "rti")}
                  placeholder="http://example.com"
                  value={variable.rti.rtiLink}
                  className={`w-1/4 border border-gray-300 rounded-md p-2 mr-1`}
                />
              </div>
            </div>
          )}
        </div>

        {/* STATUTORY CELL */}
        <>
          <div className="border p-3 mt-2 bg-slate-500">
            <h1 className="font-bold text-white">
              Does the institution have Statutory Cells / Committees?
            </h1>
          </div>
          <div className="border p-3 flex justify-center">
            <div className=" w-1/2">
              <div className="grid grid-cols-2 gap-2">
                <label className="inline-flex items-center">
                  <input
                    name="commiteeForScSt"
                    type="checkbox"
                    value="commiteeForScSt"
                    checked={statutoryCell.commiteeForScSt}
                    onChange={(e) => handleListChange(e, "statutory")}
                  />
                  Commitee for SC/ST
                </label>
                <label className="inline-flex items-center">
                  <input
                    name="minorityCell"
                    type="checkbox"
                    value="minorityCell"
                    checked={statutoryCell.minorityCell}
                    onChange={(e) => handleListChange(e, "statutory")}
                  />
                  Minority Cell
                </label>
                <label className="inline-flex items-center">
                  <input
                    name="grievanceRedressalCommittee"
                    type="checkbox"
                    value="grievanceRedressalCommittee"
                    checked={statutoryCell.grievanceRedressalCommittee}
                    onChange={(e) => handleListChange(e, "statutory")}
                  />
                  Grievance Redressal Committee
                </label>
                <label className="inline-flex items-center">
                  <input
                    name="internalCompliantCommittee"
                    type="checkbox"
                    value="internalCompliantCommittee"
                    checked={statutoryCell.internalCompliantCommittee}
                    onChange={(e) => handleListChange(e, "statutory")}
                  />
                  Internal Compliant Committee
                </label>
                <label className="inline-flex items-center">
                  <input
                    name="antiRaggingCommittee"
                    type="checkbox"
                    value="antiRaggingCommittee"
                    checked={statutoryCell.antiRaggingCommittee}
                    onChange={(e) => handleListChange(e, "statutory")}
                  />
                  Anti-ragging Committee
                </label>
                <label className="inline-flex items-center">
                  <input
                    name="obcCell"
                    type="checkbox"
                    value="obcCell"
                    checked={statutoryCell.obcCell}
                    onChange={(e) => handleListChange(e, "statutory")}
                  />
                  OBC Cell uent{" "}
                </label>
              </div>
            </div>
          </div>
        </>

        {/* Submit Button */}
        <div className="text-right mt-3 mb-3">
          <button
            type="button"
            className="btn btn-primary p-2 rounded-md mb-2"
            id="savingprofile"
            onClick={handleSave}
            style={{ background: "#3c8dbc" }}
          >
            Save and Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileInformation;
