"use client";
import React, { useEffect, useState } from "react";
import { config } from "apiCalls/Configuration";
import { ImBin2 } from "react-icons/im";
import { sraListItem } from "../../contants";
import { contextManager } from "context/store";
import YourComponent from "./Modal";

const AffiliationComplianceForm = ({ completedForm }) => {
  const { iiqa, iiqaUpdate, setIIQAUpdate } = contextManager();
  const [universityList, setUniversityList] = useState("");
  const [isAffiliated, setIsAffiliated] = useState("NO");
  const [state, setState] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [isSRARecognized, setIsSRARecognized] = useState(false);
  const [isNADRegistered, setIsNADRegistered] = useState(
    (iiqa.institutionisRegistereNAD_Document && true) || false
  );
  const [sraList, setSraList] = useState([]);
  const [selectedSRA, setSelectedSRA] = useState("");
  const [nadDocument, setNadDocument] = useState(
    iiqa.institutionisRegistereNAD_Document || ""
  );
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (iiqa.iiqa_ID) {
        const url = `${iiqa.iiqa_ID}/getAffiliation`;
        const response = await config.apiRequest("GET", url);

        if (response) {
          setUniversityList(response[0].AffiliatingUniversity);
          if (response[0].AffiliatingUniversity.length > 0) {
            setIsAffiliated("YES");
          }
          setSraList(response[1].SraList);
          if (response[1].SraList.length > 0) {
            setIsSRARecognized(true);
          }
        }
      }
    };
    fetchData();
  }, [iiqa]);

  const addUniversity = async (ele) => {
    // Make the function asynchronous to handle the API request
    if (state && universityName) {
      try {
        const formdata = new FormData();

        const newUniversity = {
          state: state,
          universityName: universityName,
        };

        formdata.append("state", state);
        formdata.append("universityName", universityName);

        // Send a POST request and wait for the response
        const response = await config.apiRequest(
          "POST",
          `${iiqa.iiqa_ID}/affiliating-universities`,
          formdata
        );

        if (response) {
          // Check if the response is successful
          config.notify("Affiliating University Added", "success");
          newUniversity.affiliatingUniversityId =
            response.affiliatingUniversityId;
          // Update universityList with the new university
          setUniversityList([...universityList, newUniversity]);

          // Reset state and universityName
          setState("");
          setUniversityName("");
        } else {
          window.alert("Failed to add university");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const handleUniversityDoc = async (e, i) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return config.notify("No file selected.", "error");
    }

    // Get the file extension
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (fileExtension !== "pdf") {
      config.notify("File must be in PDF format.", "info");
      e.target.value = ""; // Clear the file input
      return;
    }

    // If the file is a PDF, you can proceed with the POST request

    const newUniversityList = [...universityList];
    newUniversityList[i].documentName = selectedFile.name;
    setUniversityList(newUniversityList);

    const formData = new FormData();
    formData.append(
      "AffiliatingUniversityId",
      newUniversityList[i].affiliatingUniversityId
    );
    formData.append("pdf", selectedFile);

    const response = config.methodForFile(
      "upload-document-affiliating-universities",
      "POST",
      formData
    );
    if (response) {
      const resp = await response;
      const newuniversityList = [...universityList];
      newuniversityList[i].documentName = resp;
      setUniversityList(newuniversityList);
    }
  };

  const handleAffiliateDelete = async (e, i) => {
    const response = await config.deleteRequest(
      "DELETE",
      `${universityList[i].affiliatingUniversityId}/affiliatingUniversity`
    );
    if (response.status === 200) {
      config.notify("Delted SuccessFully", "error");
      const newUniversityList = [...universityList];
      newUniversityList.splice(i, 1);
      setUniversityList(newUniversityList);
    }
  };

  const handleAffiliateDocDelete = async (e, i) => {
    const response = await config.deleteRequest(
      "POST",
      `${universityList[i].affiliatingUniversityId}/remove-file`
    );
    if (response) {
      const resp = await response;
      config.notify("File Delted SuccessFully", "error");
      // console.log(resp);
    }

    const newUniversityList = [...universityList];
    newUniversityList[i].documentName = "";
    setUniversityList(newUniversityList);
  };

  const handleSelectedSRA = async (e) => {
    const checklist = sraList.map((e) => {
      return e.sra;
    });

    if (
      e.target.value !== "--Select SRA--" &&
      !checklist.includes(e.target.value)
    ) {
      const newSraData = {
        collegeProgramBySRA_Type: e.target.value,
        collegeProgramBySRA_Document: "",
      };

      const newSraList = [...sraList];
      newSraList.push(newSraData);
      setSraList(newSraList);
      setSelectedSRA(e.target.value);

      const formdata = new FormData();
      formdata.append("sraType", e.target.value);
      // formdata.append("prepareIIQA_ID", iiqa.iiqa_ID);

      // const headers = {
      //   "Content-Type": "multipart/form-data",
      // };
      const response = await config.apiRequest(
        "POST",
        `${iiqa.iiqa_ID}/sra`,
        formdata
        // headers
      );
      if (response) {
        const newSraList = [...sraList];
        config.notify("Added SuccessFully", "success");
        newSraList.push(response);
        setSraList(newSraList);
      }
    }
  };

  const handleSraDoc = async (e, i) => {
    const selectedFile = e.target.files[0];

    const newSraList = [...sraList];
    newSraList[i].sraDocumentName = selectedFile.name;
    setSraList(newSraList);

    if (!selectedFile) {
      config.notify("No File Selected", "info");
      return;
    }

    // Get the file extension
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (fileExtension !== "pdf") {
      config.notify("File Must be pdf", "info");
      e.target.value = ""; // Clear the file input
      return;
    }

    // If the file is a PDF, you can proceed with the POST request
    const formData = new FormData();
    formData.append("pdf", selectedFile);
    const response = config.methodForFile(
      `${sraList[i].sraId}/updatingFile-sra`,
      "POST",
      formData
    );
    if (response) {
      const resp = await response;
      config.notify("File Added SuccessFully", "sucess");
      const newsraList = [...sraList];
      newsraList[i].sraDocumentName = resp;
      setSraList(newsraList);
    }
  };

  const handleSraDelete = async (i) => {
    const response = await config.deleteRequest(
      "DELETE",
      `${sraList[i].sraId}/remove-sra-by-sraId`
    );
    if (response.status === 200) {
      const newsraList = [...sraList];
      newsraList.splice(i, 1);
      setSraList(newsraList);
    }
  };

  const handleSraDocDelete = async (e, i) => {
    const response = await config.deleteRequest(
      "POST",
      `${sraList[i].sraId}/remove-file-sralist`
    );
    if (response) {
      const resp = await response;
      console.log(resp);
    }

    const newSraList = [...sraList];
    newSraList[i].sraDocumentName = "";
    setSraList(newSraList);
  };

  const handleNadDocDelete = async () => {
    const response = await config.deleteRequest(
      "POST",
      `${iiqa.iiqa_ID}/remove-file-nad-documnet`
    );
    if (response) {
      setNadDocument("");
    }
  };

  const handleNADDoc = async (e) => {
    if (!e.target.files[0].name) {
      alert("No file selected.");
      return;
    }
    // Get the file extension
    const fileExtension = e.target.files[0].name.split(".").pop().toLowerCase();

    if (fileExtension !== "pdf") {
      alert("File must be in PDF format.");
      e.target.value = ""; // Clear the file input
      return;
    }

    // If the file is a PDF, you can proceed with the POST request
    const formData = new FormData();
    formData.append("pdf", e.target.files[0]);

    const response = config.methodForFile(
      `${iiqa.iiqa_ID}/file-institutionisRegistereNAD-Document`,
      "POST",
      formData
    );
    if (response) {
      const resp = await response;
      setNadDocument(resp);
    }
  };

  const handleSaveAndNext = () => {
    // console.log(sraList);
    // console.log(object);
    async function checkConditions() {
      for (const ele of universityList) {
        if (ele.documentName === "") {
          alert(`Please Upload Document of ${ele.universityName}`);
          return null; // Return early when the condition is met
        }
      }

      for (const ele of sraList) {
        if (ele.sraDocumentName === "") {
          window.alert(`Please Upload Document of ${ele.sraType}`);
          return null; // Return early when the condition is met
        }
      }

      if (!nadDocument) {
        window.alert(
          `Please Upload Document of National Academic Depository (NAD) System`
        );
        return null; // Return early when the condition is met
      }

      await completedForm("Affiliation Compliance");
      setIIQAUpdate(!iiqaUpdate);
    }

    // Call the async function and handle the result accordingly
    checkConditions()
      .then((result) => {
        if (result === null) {
          // Handle the case where conditions were not met
        }
      })
      .catch((error) => {
        // Handle any errors that may occur during execution
        console.error(error);
      });
  };

  return (
    <div className="font-normal text-base">
      <h2 className="heading2">Affiliation Compliance</h2>

      {/* Affiliation Radio Buttons */}
      <div className="borderbox">
        <div className="flexbox">
          <label>Whether the College is Affiliated</label>
          <div className="checklabel colsec">
            <label>
              <input
                className=""
                checked={isAffiliated === "YES"}
                type="radio"
                value="YES"
                onChange={(e) => setIsAffiliated(e.target.value)}
              />{" "}
              <span>Yes</span>
            </label>
            <label>
              <input
                className="form-control"
                checked={isAffiliated === "NO"}
                type="radio"
                value="NO"
                onChange={(e) => setIsAffiliated(e.target.value)}
              />{" "}
              <span>No</span>
            </label>
          </div>
        </div>
        {isAffiliated === "YES" && (
          <>
            <div className="bgobx">
              <h3>
                Name of the Affiliating University(ies) and the state(s) in
                which the University (ies) is located.
              </h3>
              <div className=" ">
                <div className="flex ">
                  <div className="flex form-control flex-col form-control">
                    <label>State</label>
                    <input
                      type="text"
                      className=" border border-gray-300 rounded-md p-2"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div className=" flex form-control flex-col ml-10">
                    <label>University Name</label>
                    <div className="flex">
                      <input
                        type="text"
                        className="form-control border border-gray-300 rounded-md p-2"
                        value={universityName}
                        onChange={(e) => setUniversityName(e.target.value)}
                      />
                      <button
                        className="border text-white rounded-md border-gray-300 p-2 ml-4"
                        style={{ background: "#3c8dbc" }}
                        onClick={addUniversity}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="badge-secondary p-2 flex justify-center items-center">
              <button
                className="border rounded-md border-gray-300 p-2"
                onClick={() => setModalOpen(true)}
              >
                Request for Inclusion of University
              </button>
              <div className="flex justify-center">
                {modalOpen && <YourComponent setModalOpen={setModalOpen} />}
              </div>
            </div>
            {universityList.length > 0 && (
              <div className="flex justify-end">
                <table className="border border-slate-500 w-2/3">
                  <thead>
                    <tr>
                      <th className="border border-slate-500">State</th>
                      <th className="border border-slate-500">
                        University Name
                      </th>
                      <th className="border border-slate-500">
                        Upload Document
                      </th>
                      <th className="border border-slate-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {universityList.map((ele, i) => {
                      return (
                        <tr key={i}>
                          <td className="border border-slate-500">
                            {ele.state}
                          </td>
                          <td className="border border-slate-500">
                            {ele.universityName}
                          </td>
                          <td className="border border-slate-500">
                            {!ele.documentName ? (
                              <input
                                className=" cursor-pointer"
                                type="file"
                                placeholder="Upload Document"
                                accept=".pdf"
                                onChange={(e) => handleUniversityDoc(e, i)}
                              />
                            ) : (
                              <div className="flex flex-row justify-evenly">
                                <a
                                  className="cursor-pointer"
                                  href={`${config.BASE_URL}/files/view/${ele.documentName}`}
                                  target="_blank"
                                >
                                  View Document
                                </a>

                                <div>
                                  <ImBin2
                                    onClick={(e) =>
                                      handleAffiliateDocDelete(e, i)
                                    }
                                    className="flex align-middle justify-center my-auto cursor-pointer"
                                  />
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="border border-slate-500">
                            <button
                              onClick={(e) => handleAffiliateDelete(e, i)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* SRA Radio Buttons */}
      <div className="borderbox">
        <div className="flexbox">
          <label>
            Is the college offering a program recognized by any Statutory
            Regulatory<br></br>
            <small>
              Authority (SRA) such as AICTE, NCTE, MCI, DCI, BCI, INC, RCI,
              etc.?
            </small>
          </label>
          <div className="checklabel colsec">
            <label>
              <input
                checked={isSRARecognized === true}
                type="radio"
                value="1"
                onChange={(e) => setIsSRARecognized(e.target.value === "1")}
              />{" "}
              <span>Yes</span>
            </label>
            <label>
              <input
                checked={isSRARecognized === false}
                type="radio"
                value="0"
                onChange={(e) => setIsSRARecognized(e.target.value === "1")}
              />{" "}
              <span>No</span>
            </label>
          </div>
        </div>
        {isSRARecognized && (
          <>
            <div className="mt-1 flex">
              <div className="flex w-1/3 p-2">
                SRA List (Upload approval from each SRA.)
              </div>
              <div className="mr-10">
                <div className="flex">
                  <div className="flex form-control flex-col form-control">
                    <select
                      value={selectedSRA}
                      onChange={handleSelectedSRA}
                      className="border border-gray-300 rounded-md p-2"
                    >
                      <option value="">--Select SRA--</option>
                      {sraListItem.map((item, index) => (
                        <option
                          className=" border border-gray-300 rounded-md p-2"
                          key={index}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {sraList.length > 0 && (
              <div className="flex justify-end mt-5 ">
                <table className="border border-slate-500 w-2/3">
                  <thead>
                    <tr>
                      <th className="border border-slate-500 w-2/5">SRA</th>
                      <th className="border border-slate-500">
                        Upload Document
                      </th>
                      <th className="border border-slate-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sraList.map((ele, i) => {
                      return (
                        <tr key={i}>
                          <td className="border border-slate-500 text-center">
                            {ele.sraType}
                          </td>
                          <td className="border border-slate-500">
                            {!ele.sraDocumentName ? (
                              <input
                                className=" cursor-pointer"
                                type="file"
                                placeholder="Upload Document"
                                accept=".pdf"
                                onChange={(e) => handleSraDoc(e, i)}
                              />
                            ) : (
                              <div className="flex flex-row justify-evenly">
                                <a
                                  className="cursor-pointer"
                                  href={`${config.BASE_URL}/files/view/${ele.sraDocumentName}`}
                                  target="_blank"
                                >
                                  View Document
                                </a>
                                <div>
                                  <ImBin2
                                    onClick={(e) => handleSraDocDelete(e, i)}
                                    className="flex align-middle justify-center my-auto cursor-pointer"
                                  />
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="border border-slate-500 text-center">
                            <button onClick={() => handleSraDelete(i)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
      {/* NAD Radio Buttons */}
      <div className="card border mt-2 flex items-center p-3">
        <label className="col-form-label w-1/2">
          Whether the Institution is registered in the National Academic
          Depository (NAD) System
        </label>

        <div className="md:w-8/12">
          <div className="md:flex md:space-x-4 p-3">
            <div className="md:w-8/12 space-y-2 flex justify-evenly">
              <label className="space-x-2 ">
                <input
                  className="form-control"
                  checked={isNADRegistered === true}
                  type="radio"
                  value="1"
                  onChange={(e) => setIsNADRegistered(e.target.value === "1")}
                />
                <span>Yes</span>
              </label>
              <label className="space-x-2 ">
                <input
                  className="form-control"
                  checked={isNADRegistered === false}
                  type="radio"
                  value="0"
                  onChange={(e) => setIsNADRegistered(e.target.value === "1")}
                />
                <span>No</span>
              </label>
            </div>
          </div>
          {isNADRegistered &&
            (!nadDocument ? (
              <input
                className=" cursor-pointer"
                type="file"
                placeholder="Upload Document"
                accept=".pdf"
                onChange={handleNADDoc}
              />
            ) : (
              <div className="flex flex-row justify-evenly ">
                <a
                  className="cursor-pointer"
                  href={`${config.BASE_URL}/files/view/${nadDocument}`}
                  target="_blank"
                >
                  View Document
                </a>
                <div>
                  <ImBin2
                    onClick={handleNadDocDelete}
                    className="flex align-middle justify-center my-auto cursor-pointer"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Save and Next Button */}
      <div className="float-right mt-2">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleSaveAndNext}
          id="affli_save"
        >
          Save and Next
        </button>
      </div>
    </div>
  );
};

export default AffiliationComplianceForm;
