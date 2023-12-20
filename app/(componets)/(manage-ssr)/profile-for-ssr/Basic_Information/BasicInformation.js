"use client";
import React, { useState, useEffect } from "react";
import { config } from "apiCalls/Configuration";
import { ImBin2 } from "react-icons/im";
import { contextManager } from "context/store";

const BasicInformation = () => {
  const { iiqa, collegeData, setIiqa, setSSRID } = contextManager();
  const [formdata, setFormdata] = useState({
    bygender: "",
    byshift: "",
    religiousStatus: "",
    linguisticStatus: "",
    otherStatus: "",
    minorityStatus: "NO",
    autonomyConferment: "NO",
    autonomyApplication: "NO",
    govRecognized: "NO",
    agencyName: "",
    recognitionDate: "",
    location: "",
    campusArea: "",
    builtInArea: "",
    "doc-of-minority": "",
    "doc-of-autonomy": "",
  });
  const [universityList, setUniversityList] = useState("");
  const [sraList, setSraList] = useState([]);

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    (async () => {
      if (iiqa.iiqa_ID) {
        const response = await config.apiRequest(
          "GET",
          `${iiqa.iiqa_ID}/getAffiliation`
        );

        if (response) {
          if (response[0].AffiliatingUniversity.length > 0) {
            setUniversityList(response[0].AffiliatingUniversity);
          }
          if (response[1].SraList.length > 0) {
            setSraList(response[1].SraList);
          }
        }
      }
    })();
    (async () => {
      const response = await config.ssrAPIRequest(
        "GET",
        `ssr-specifics/${collegeData.collegId}`
      );
      if (response) {
        setFormdata((prevState) => ({
          ...prevState,
          bygender: response.byGender,
          byshift: response.byShift,
          // Add other state properties based on your response
          religiousStatus: response.minorityByReligious,
          linguisticStatus: response.minorityByLinguistic,
          otherStatus: response.minorityByOther,
          minorityStatus: response.recognizedMinorityInstitution,
          autonomyConferment: response.isAutonomyGranted,
          autonomyApplication: response.collegeAutonomousApplicationStatus,
          govRecognized: response.isCollegeRecognizedByGovtAgency,
          agencyName: response.recognizedAgencyName,
          recognitionDate: response.dateOfRecognisation,
          location: response.campusLocation,
          campusArea: response.campusAreaInAcres,
          builtInArea: response.builtUpAreaInSqMt,
          "doc-of-minority": response.documentOFMinorityInstitution,
          "doc-of-autonomy": response.isAutonomyGrantedDocumnet,
        }));
      }
    })();
  }, []);

  const handleSave = async () => {
    const finalData = new FormData();
    finalData.append("byGender", formdata.bygender);
    finalData.append("byShift", formdata.byshift);
    finalData.append("recognizedMinorityInstitution", formdata.minorityStatus);
    finalData.append("minorityByReligious", formdata.religiousStatus);
    finalData.append("minorityByLinguistic", formdata.linguisticStatus);
    finalData.append("minorityByOther", formdata.otherStatus);
    finalData.append("isAutonomyGranted", formdata.autonomyApplication);
    finalData.append(
      "collegeAutonomousApplicationStatus",
      formdata.autonomyConferment
    );
    finalData.append("isCollegeRecognizedByGovtAgency", formdata.govRecognized);
    finalData.append("recognizedAgencyName", formdata.agencyName);
    finalData.append("dateOfRecognisation", formdata.recognitionDate);
    finalData.append("campusLocation", formdata.location);
    finalData.append("campusAreaInAcres", formdata.campusArea);
    finalData.append("builtUpAreaInSqMt", formdata.builtInArea);

    const response = await config.ssrAPIRequest(
      "POST",
      `${collegeData.collegId}/basic-information`,
      finalData
    );
    setSSRID(response.ssrID);
  };

  const handleFileUpload = async (e) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (fileExtension !== "pdf") {
        config.notify("File must be in PDF format.", "info");
        e.target.value = "";
        return;
      }
      config.notify("File Uploaded", "success");
    }

    const docToUpload = new FormData();
    docToUpload.append("pdf", e.target.files[0]);

    const response = await config.ssrAPIRequest(
      "POST",
      `${collegeData.collegId}/${e.target.name}`,
      docToUpload
    );
    if (response) {
      setFormdata((pervState) => ({
        ...pervState,
        [e.target.name]: response,
      }));
    }
  };

  const handleDocDelete = async (url, variable) => {
    const response = await config.ssrAPIRequest(
      "POST",
      `${collegeData.collegId}/${url}`
    );
    if (response === "Deleted Successfully") {
      setFormdata((pervState) => ({
        ...pervState,
        [variable]: "",
      }));
    }
  };

  return (
    <div className="p-2 ">
      <h1 className="bg-[#337ab7] p-2 border border-cyan-700 rounded-b-none rounded-lg text-white">
        Basic Information
      </h1>
      <div className="border border-[#337ab7] rounded-b-lg bg-white">
        <div className="p-3 pt-2 rounded-lg">
          {/*Name and Address of the College*/}
          <div className="border rounded-lg mb-4">
            <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
              Name and Address of the College
            </h3>
            <div className="container p-3">
              <table className="w-full">
                <tbody>
                  <tr className="border">
                    <td className="border-r text-left w-1/4 p-2">Name</td>
                    <td>
                      <div className=" w-full p-2">
                        {iiqa.nameOfHigherEducationInstitution}
                      </div>
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border-r text-left w-1/4 p-2">Address</td>
                    <td>
                      <div className=" w-3/4 p-2">{iiqa.collegeAddress}</div>
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border-r text-left w-1/4 p-2">City</td>
                    <td className="border-r">
                      <div className=" w-3/4 p-2">{iiqa.city}</div>
                    </td>
                    <td className="border-r text-left w-1/4 p-2">Pin</td>
                    <td>
                      <div className=" w-3/4 p-2">{iiqa.collegePincode}</div>
                    </td>
                  </tr>

                  <tr className="border">
                    <td className="border-r text-left w-1/4 p-2">State</td>
                    <td className="border-r">
                      <div className=" w-3/4 p-2">{iiqa.stateOrUT}</div>
                    </td>
                    <td className="border-r text-left w-1/4 p-2">Website</td>
                    <td>
                      <div className=" w-3/4 p-2">{iiqa.collegeWebsite}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/*Contact For Communication*/}
          <div className="border rounded-lg mb-4">
            <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
              Contact For Communication
            </h3>
            <table className="p-3 pt-2 text-base w-full">
              <thead className="bg-gray-400">
                <tr className="border border-gray-400">
                  <td className="p-2 border-r border-white text-left w-36">
                    Designation
                  </td>
                  <td className="p-2 border-r border-white text-left w-40">
                    Name
                  </td>
                  <td className="p-2 border-r border-white text-left">
                    Telephone With STD code
                  </td>
                  <td className="p-2 border-r border-white text-left w-24">
                    Mobile
                  </td>
                  <td className="p-2 border-r border-white text-left w-32">
                    Fax
                  </td>
                  <td className="p-2 text-left w-44">Email</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">{iiqa.designation}</div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {iiqa.headOfTheInstitution}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {`${iiqa.collegePhoneAreaCode} ${iiqa.collegePhone}`}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {collegeData.collegeMobileNo}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {`${iiqa.alternateFacultyFaxAreaCode} ${iiqa.alternateFacultyFax}`}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {collegeData.collegeEmailID}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {iiqa.alternateFacultyDesignation}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {iiqa.alternateFacultyName}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {`${iiqa.alternateFacultyPhoneAreaCode} ${iiqa.alternateFacultyPhone}`}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {iiqa.alternateFacultyMobile}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {`${iiqa.alternateFacultyFaxAreaCode} ${iiqa.alternateFacultyFax}`}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {iiqa.alternateFacultyAltenateEmail}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Status Of the Institution */}
          <div className="border rounded-lg mb-4">
            <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
              Status Of the Institution
            </h3>
            <div className="container p-3">
              <table className="w-full">
                <tbody>
                  {iiqa.natureOfCollegeGoverment && (
                    <tr className="border">
                      <td className="p-1">Government</td>
                    </tr>
                  )}
                  {iiqa.natureOfCollegePrivate && (
                    <tr className="border">
                      <td className="p-1">Private</td>
                    </tr>
                  )}
                  {iiqa.natureOfCollegeGrantAid && (
                    <tr className="border">
                      <td className="p-1">Grant in Aid </td>
                    </tr>
                  )}
                  {iiqa.natureOfCollegeSelfFinancing && (
                    <tr className="border">
                      <td className="p-1">Self Financing</td>
                    </tr>
                  )}
                  {iiqa.natureOfCollegeConstitiuent && (
                    <tr className="border">
                      <td className="p-1">Constitiuent</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Type Of the Institution */}
          <div className="border rounded-lg mb-4">
            <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
              Type Of the Institution
            </h3>
            <div className="container p-3">
              <table className="w-full">
                <tbody>
                  <tr className="border">
                    <td className="border-r w-1/2 p-2">By Gender</td>
                    <td className="w-1/2 p-1">
                      <select
                        className="w-full p-1 border border-gray-400"
                        value={formdata.bygender || "-Select"}
                        name="bygender"
                        onChange={handleChange}
                      >
                        <option defaultValue disabled>
                          -Select-
                        </option>
                        <option value="1">For Men</option>
                        <option value="2">For Women</option>
                        <option value="3">Co-education</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border-r w-1/2 p-2">By Shift</td>
                    <td className="w-1/2 p-1">
                      <div className="flex items-center">
                        <label htmlFor="myCheckbox1" className="text-gray-700">
                          <input
                            type="checkbox"
                            id="myCheckbox1"
                            name="byshift"
                            value="Regular"
                            className="form-checkbox mr-2 h-4 w-4 text-blue-600"
                            checked={formdata.byshift === "Regular"}
                            onChange={handleChange}
                          />
                          Regular
                        </label>

                        <label
                          htmlFor="myCheckbox2"
                          className="ml-2 text-gray-700"
                        >
                          <input
                            type="checkbox"
                            id="myCheckbox2"
                            name="byshift"
                            value="Day"
                            className="form-checkbox mr-2 h-4 w-4 text-blue-600"
                            checked={formdata.byshift === "Day"}
                            onChange={handleChange}
                          />
                          Day
                        </label>

                        <label
                          htmlFor="myCheckbox3"
                          className="ml-2 text-gray-700"
                        >
                          <input
                            type="checkbox"
                            id="myCheckbox3"
                            name="byshift"
                            value="Evening"
                            className="form-checkbox mr-2 h-4 w-4 text-blue-600"
                            checked={formdata.byshift === "Evening"}
                            onChange={handleChange}
                          />
                          Evening
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recognized Minority Institution */}
          <div className="border rounded-lg mb-4">
            <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
              Recognized Minority Institution
            </h3>
            <div className="container p-3">
              <table className="w-full">
                <tbody>
                  <tr className="border">
                    <td className="border-r w-1/2 p-2">
                      If it is a recognized Minority Institution
                    </td>
                    <td className="w-1/2 p-1">
                      <select
                        className="w-full p-1 border border-gray-400"
                        name="minorityStatus"
                        onChange={handleChange}
                        value={formdata.minorityStatus || "NO"}
                      >
                        <option value="YES">Yes</option>
                        <option value="NO">No</option>
                      </select>
                      <>
                        {formdata.minorityStatus === "YES" && (
                          <div className="m-2 mt-3">
                            {formdata["doc-of-minority"] === "" ? (
                              <label className="custom-file-upload border  bg-gradient-to-br from-slate-100 to-slate-200 text-black/80 rounded-md cursor-pointer p-2">
                                <input
                                  className="hidden"
                                  type="file"
                                  name="doc-of-minority"
                                  accept=".pdf"
                                  onChange={(e) => handleFileUpload(e)}
                                />
                                Upload File
                              </label>
                            ) : (
                              <div className="flex">
                                <a
                                  target="blank"
                                  href={`${config.BASE_URL}/files/view/${formdata["doc-of-minority"]}`}
                                >
                                  View Document
                                </a>
                                <div
                                  className="ml-2 my-auto cursor-pointer"
                                  name="doc-of-minority-detach"
                                  onClick={() =>
                                    handleDocDelete(
                                      "doc-of-minority-detach",
                                      "doc-of-minority"
                                    )
                                  }
                                >
                                  <ImBin2 />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="w-1/2 p-2">
                      If Yes, specific minority status
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="w-1/2 pl-2 border-r">Religious</td>
                    <td className="w-1/2 p-1">
                      <input
                        className="border p-1 w-full"
                        name="religiousStatus"
                        value={formdata.religiousStatus}
                        onChange={handleChange}
                        type="text"
                        disabled={formdata.minorityStatus === "NO"}
                      />
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="w-1/2 pl-2  border-r">Linguistic</td>
                    <td className="w-1/2 p-1">
                      <input
                        className="border p-1 w-full"
                        name="linguisticStatus"
                        value={formdata.linguisticStatus}
                        onChange={handleChange}
                        type="text"
                        disabled={formdata.minorityStatus === "NO"}
                      />
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="w-1/2 pl-2  border-r">Any Other</td>
                    <td className="w-1/2 p-1">
                      <input
                        className="border p-1 w-full"
                        name="otherStatus"
                        value={formdata.otherStatus}
                        onChange={handleChange}
                        type="text"
                        disabled={formdata.minorityStatus === "NO"}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/*Establishment Details*/}
          <div className="border rounded-lg mb-4">
            <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
              Establishment Details
            </h3>
            <div className="w-full p-2 ">
              <div className="w-full flex border">
                <div className="w-1/2 border-r p-2">
                  Date Of Establishment of the college
                </div>
                <div className="w-1/2 p-2">
                  <div className="w-full">
                    {iiqa.date_of_establishment_of_the_Institution}
                  </div>
                </div>
              </div>
              <div className="w-full flex border border-t-0">
                <div className="w-1/2 border-r p-2">
                  Number of academic years completed till date
                </div>
                <div className="w-1/2 p-2">
                  <div className="w-full">
                    {new Date().getFullYear() -
                      new Date(
                        iiqa.date_of_establishment_of_the_Institution
                      ).getFullYear() || 0}
                  </div>
                </div>
              </div>
              <h3 className="bg-gray-400 text-black mb-2 p-1">
                University to which the college is affiliated or which governs
                the college (if it is a constituent college)
              </h3>
              <table className="mt-3 w-full mb-2">
                <tbody>
                  <tr className="bg-gray-400 border-gray-400 border">
                    <td className="w-1/3 border-r border-white p-1">State</td>
                    <td className="w-1/3 border-r border-white p-1">
                      University Name
                    </td>
                    <td className="w-1/3 p-1">View Document</td>
                  </tr>
                  {universityList.length > 0 &&
                    universityList.map((ele, index) => {
                      return (
                        <tr key={index}>
                          <td className="border p-1">
                            <div className="w-full">{ele.state}</div>
                          </td>
                          <td className="border p-1">
                            <div className="w-full">{ele.universityName}</div>
                          </td>
                          <td className="border p-1">
                            <a
                              href={`${config.BASE_URL}/files/view/${ele.documentName}`}
                              target="_blank"
                              className="w-full cursor-pointer"
                            >
                              View Document
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              {(iiqa.documentOfRecognitionByUGC_2f ||
                iiqa.documentOfRecognitionByUGC_12B) && (
                <>
                  <h3 className="bg-gray-400 text-black p-1 mt-3 mb-2">
                    Details of UGC Recognition
                  </h3>
                  <>
                    <div className="border border-gray-400 bg-gray-400 flex mt-3">
                      <div className="w-1/3 p-1">Under Section</div>
                      <div className="border-x w-1/3 p-1">Date</div>
                      <div className="w-1/3 p-1">View Document</div>
                    </div>
                    <table className="p-3 pt-2 text-base w-full mb-2">
                      <tbody>
                        {iiqa.documentOfRecognitionByUGC_2f && (
                          <tr className="border ">
                            <td className="w-1/3 p-1">2f of UGC</td>
                            <td className="w-1/3 border p-1">
                              {iiqa.dateOfRecognitionByUGC_2f}
                            </td>
                            <td className="w-1/3 p-1">
                              <a
                                href={`${config.BASE_URL}/files/view/${iiqa.documentOfRecognitionByUGC_2f}`}
                                target="_blank"
                                className="w-full cursor-pointer"
                              >
                                View Document
                              </a>
                            </td>
                          </tr>
                        )}
                        {iiqa.documentOfRecognitionByUGC_12B && (
                          <tr className="border ">
                            <td className="w-1/3 p-1">12B Of UGC</td>
                            <td className="w-1/3 border p-1">
                              {iiqa.dateOfRecognitionByUGC_12B}
                            </td>
                            <td className="w-1/3 p-1">
                              <a
                                href={`${config.BASE_URL}/files/view/${iiqa.documentOfRecognitionByUGC_12B}`}
                                target="_blank"
                                className="w-full cursor-pointer"
                              >
                                View Document
                              </a>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </>
                </>
              )}

              {sraList.length > 0 && (
                <>
                  <h3 className="border border-gray-400 bg-gray-400 p-1 mt-3">
                    Details of Recognition / Approval by Statutory / Regulatory
                    bodies like AICTE, NCTE, MCI, DCI, PCI,RCI etc (other than
                    UGC)
                  </h3>
                  <table className="w-full">
                    <tbody className="border border-gray-400">
                      <tr className="border border-gray-400 bg-gray-400 p-1">
                        <td className="border-white p-1 border border-l-0">
                          Statutory Regulatory Authority
                        </td>
                        <td className="border-white p-1 border">
                          Recognition/Approval details Institution/Department
                          Program
                        </td>
                        <td className="border-white p-1 border">
                          Day, Month, Year AND (dd-mm-yyyy)
                        </td>
                        <td className="border-white p-1 border">
                          Validity in Month
                        </td>
                        <td className="border-white p-1 border border-r-0">
                          Remarks
                        </td>
                      </tr>
                      {sraList.map((ele, index) => {
                        return (
                          <tr key={index}>
                            <td className="border border-gray-400">
                              <div>{ele.sraType}</div>
                            </td>
                            <td className="border border-gray-400">
                              <a
                                href={`${config.BASE_URL}/files/view/${ele.sraDocumentName}`}
                                target="_blank"
                                className="w-full cursor-pointer"
                              >
                                View Document
                              </a>
                            </td>
                            <td className="border border-gray-400">
                              <div>01/08/1997</div>
                            </td>
                            <td className="border border-gray-400">
                              <div>12</div>
                            </td>
                            <td className="border border-gray-400">
                              <textarea />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>

          {/* Details of Autonomy */}
          <div className="border rounded-lg mb-4">
            <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
              Details of Autonomy
            </h3>
            <table className="border m-2">
              <tbody>
                <tr className="border">
                  <td className="border border-r w-1/2">
                    Does the affiliating university Act provide for conferment
                    of Autonomy (as recognized by UGC), on its affiliated
                    colleges?
                  </td>
                  <td className="w-1/2 p-1">
                    <select
                      className="w-full p-1 border border-gray-400"
                      name="autonomyConferment"
                      onChange={handleChange}
                      value={formdata.autonomyApplication || "NO"}
                    >
                      <option value="YES">Yes</option>
                      <option value="NO">No</option>
                    </select>
                    <>
                      {formdata.autonomyConferment === "YES" && (
                        <div className="m-2 mt-3">
                          {formdata["doc-of-autonomy"] === "" ? (
                            <label className="custom-file-upload border  bg-gradient-to-br from-slate-100 to-slate-200 text-black/80 rounded-md cursor-pointer p-2">
                              <input
                                className="hidden"
                                type="file"
                                name="doc-of-autonomy"
                                accept=".pdf"
                                onChange={(e) => handleFileUpload(e)}
                              />
                              Upload File
                            </label>
                          ) : (
                            <div className="flex">
                              <a
                                target="blank"
                                href={`${config.BASE_URL}/files/view/${formdata["doc-of-autonomy"]}`}
                              >
                                View Document
                              </a>
                              <div
                                className="ml-2 my-auto cursor-pointer"
                                name="doc-of-minority-detach"
                                onClick={() =>
                                  handleDocDelete(
                                    "doc-of-autonomy-detach",
                                    "doc-of-autonomy"
                                  )
                                }
                              >
                                <ImBin2 />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  </td>
                </tr>
                <tr className="mt-2">
                  <td className="border border-r w-1/2">
                    If Yes, has the College applied for availing the autonomous
                    status?
                  </td>
                  <td className="w-1/2 p-1">
                    <select
                      className="w-full p-1 border border-gray-400"
                      name="autonomyApplication"
                      onChange={handleChange}
                      value={formdata.autonomyApplication || "NO"}
                    >
                      <option value="YES">Yes</option>
                      <option value="NO">No</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Recognitions */}
          <div className="border rounded-lg mb-4">
            <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
              Recognitions
            </h3>
            <div className="container p-3">
              <table className="w-full">
                <tbody>
                  <tr className="border">
                    <td className="border-r w-1/2 p-2">
                      Is the College recognized by UGC as a college with
                      Potential for Excellence(CPE)?
                    </td>
                    <td className="w-1/2 p-1">
                      <select
                        className="w-full p-1 border border-gray-400"
                        defaultValue={
                          iiqa.documentOfRecognisedAsCPE !== "" && true
                        }
                        disabled
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border-r w-1/2 p-2">
                      Is the College recognized for its performance by any other
                      governmental agency ?
                    </td>
                    <td className="w-1/2 p-1">
                      <select
                        className="w-full p-1 border border-gray-400"
                        name="govRecognized"
                        onChange={handleChange}
                        value={formdata.govRecognized || "NO"}
                      >
                        <option value="YES">Yes</option>
                        <option value="NO">No</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border-r w-1/2 p-2">
                      If yes, Name of the agency
                    </td>
                    <td className="w-1/2 p-1">
                      <input
                        type="text"
                        className="border w-full"
                        name="agencyName"
                        value={formdata.agencyName}
                        disabled={formdata.govRecognized === "NO"}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border-r w-1/2 p-2">Date of Recognition</td>
                    <td className="w-1/2 p-1">
                      <input
                        type="date"
                        name="recognitionDate"
                        value={formdata.recognitionDate}
                        className="border w-full"
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Location and Area of Campus */}
          <div className="border rounded-lg">
            <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
              Location and Area of Campus
            </h3>
            <div className="container p-3">
              <table className="w-full">
                <tbody>
                  <tr className="border border-gray-400 bg-gray-400">
                    <td className="w-1/5 p-1">Campus Type</td>
                    <td className="w-1/5 p-1 border  border-y-gray-400 border-x-white">
                      Address
                    </td>
                    <td className="w-1/5 p-1">Location</td>
                    <td className="w-1/5 p-1 border border-y-gray-400  border-x-white">
                      Campus Area in Acres
                    </td>
                    <td className="w-1/5 p-1">Built up Area in sq. mts.</td>
                  </tr>
                  <tr>
                    <td className="border p-1">
                      {iiqa.isCollegeFunctionFromOwnCampus === "YES"
                        ? "Main Campus"
                        : "Type nown"}
                    </td>
                    <td className="border p-1">{iiqa.collegeAddress}</td>
                    <td className="border p-1">
                      <select
                        name="location"
                        className="w-full p-1 border border-gray-400"
                        onChange={handleChange}
                        defaultValue="select"
                      >
                        <option value="select">--Select--</option>
                        <option value="Rural">Rural</option>
                        <option value="Urban">Urban</option>
                        <option value="SemiUrban">Semi Urban</option>
                        <option value="city">City</option>
                        <option value="tribal">Tribal</option>
                        <option value="hill">Hill</option>
                      </select>
                    </td>
                    <td className="border p-1">
                      <input
                        className="border"
                        name="campusArea"
                        type="text"
                        onChange={handleChange}
                        value={formdata.campusArea}
                      />
                    </td>
                    <td className="border p-1">
                      <input
                        className="border"
                        name="builtInArea"
                        type="text"
                        onChange={handleChange}
                        value={formdata.builtInArea}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="m-3 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-[#3c8dbc]"
            onClick={handleSave}
          >
            Save and Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
