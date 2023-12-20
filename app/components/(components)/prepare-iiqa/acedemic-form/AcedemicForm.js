"use client";
import React, { useState, useEffect } from "react";
import { config } from "apiCalls/Configuration";
import { ImBin2 } from "react-icons/im";
import { contextManager } from "context/store";

const AcedemicForm = ({ completedForm }) => {
  const { iiqa, iiqaUpdate, setIIQAUpdate } = contextManager();
  const [mou, setMou] = useState({
    state: (iiqa.document_academic_mou_foreign && true) || false,
    document: iiqa.document_academic_mou_foreign || "",
  });
  const [progValues, setProgValues] = useState({
    departmentName: "",
    program: "",
    sra: "",
    specialization: "",
    prepareIIQA_ID: iiqa.iiqa_ID,
    id: "",
  });

  const [program, setProgram] = useState([]);
  const [acadmicData, setAcadmicData] = useState({
    ug: iiqa.program_Count_UG || "",
    pg: iiqa.program_Count_PG || "",
    pm: iiqa.program_Count_DM_Ayurveda_Vachaspathi || "",
    predoctoral: iiqa.program_Count_Pre_Doctoral || "",
    phd: iiqa.program_Count_Doctoral || "",
    postdoctoral: iiqa.program_Count_Post_Doctoral || "",
    pgDiploma: iiqa.program_Count_PG_Diploma || "",
    diploma: iiqa.program_Count_Diploma || "",
    cirAware: iiqa.program_Count_Certificate_Awareness || "",
  });
  const [staff, setStaff] = useState({
    pTS: {
      male: "",
      female: "",
      transgender: "",
      id: "",
      method: "POST",
    },
    oTS: {
      male: "",
      female: "",
      transgender: "",
      id: "",
      method: "POST",
    },
    nTS: {
      male: "",
      female: "",
      transgender: "",
      id: "",
      method: "POST",
    },
  });
  const [student, setStudent] = useState({
    male: "",
    female: "",
    transgender: "",
    id: "",
    method: "POST",
  });
  const [selfDoc, setSelfDoc] = useState("");
  const [method, setMethod] = useState({
    staff: "POST",
    student: "POST",
  });
  const [sraList, setSraList] = useState({});

  useEffect(() => {
    if (iiqa.iiqa_ID) {
      (async () => {
        const response = await config.apiRequest(
          "GET",
          `${iiqa.iiqa_ID}/AllProgramBybyPrepareIIQAId`
        );
        if (response) {
          setProgram(response);
          response.map((ele) => {
            if (ele.selfDeclaration) {
              setSelfDoc(ele.selfDeclaration);
            }
          });
        }
      })();
      (async () => {
        try {
          const response = await config.apiRequest(
            "GET",
            `${iiqa.iiqa_ID}/all-staff`
          );
          if (response) {
            const categoryMapping = {
              "Number of Non Teaching staff": "nTS",
              "Number of Permanent Teaching staff": "pTS",
              "Number of Other Teaching staff": "oTS",
            };
            response.map((ele) => {
              if (categoryMapping.hasOwnProperty(ele.category)) {
                const categoryKey = categoryMapping[ele.category];

                setStaff((prevStaff) => ({
                  ...prevStaff,
                  [categoryKey]: {
                    ...prevStaff[categoryKey], // Copy existing properties
                    male: ele.male,
                    female: ele.female,
                    transgender: ele.transgender,
                    method: "PUT",
                    id: ele.id,
                  },
                }));
              }
            });
            setMethod({
              ...method,
              staff: "PUT",
            });
          }
        } catch {}
      })();
      (async () => {
        const response = await config.apiRequest(
          "GET",
          `${iiqa.iiqa_ID}/all-students`
        );
        if (response[0]) {
          setStudent({
            male: response[0].male,
            female: response[0].female,
            transgender: response[0].transgender,
            method: "PUT",
            id: response[0].id,
          });
        }
      })();
      (async () => {
        if (iiqa.iiqa_ID) {
          const url = `${iiqa.iiqa_ID}/getAffiliation`;
          const response = await config.apiRequest("GET", url);

          if (response) {
            setSraList(response[1].SraList);
          }
        }
      })();
    }
  }, [iiqa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcadmicData({
      ...acadmicData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let values = Object.values(acadmicData);
    fetch(
      `http://192.168.1.37:8081/prepareiiqa/${iiqa.iiqa_ID}/updateProgramCount`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    // .then((response) => console.log(response.json()))
    // .then((data) => console.log(data));
  };

  const handleProgram = (e) => {
    const { name, value } = e.target;
    setProgValues({
      ...progValues,
      [name]: value,
    });
  };

  const handleDoc = async (e, field) => {
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
    switch (field) {
      case "mou":
        const newMou = { ...mou, document: selectedFile.name };
        setMou(newMou);

        const formDataMou = new FormData();
        formDataMou.append("pdf", selectedFile);

        const responseMou = config.methodForFile(
          `${iiqa.iiqa_ID}/updateIn-IIQA-document-academic-mou`,
          "POST",
          formDataMou
        );
        if (responseMou) {
          const resp = await responseMou;
          const mouDoc = {
            ...mou,
            document: resp,
          };
          setMou(mouDoc);
        }
        break;

      case "prg":
        if (program.length < 1) {
          config.notify("Enter atleast 1 program first", "error");
          return;
        }
        setSelfDoc(selectedFile.name);

        const formDataPrg = new FormData();
        formDataPrg.append("pdf", selectedFile);

        const responsePrg = config.methodForFile(
          `${program[0].id}/file-self-declaration`,
          "POST",
          formDataPrg
        );
        if (responsePrg) {
          const resp = await responsePrg;
          setSelfDoc(resp);
        }
        break;

      default:
        break;
    }
  };

  const addProgram = async (e) => {
    let prgValue = progValues;
    e.preventDefault();
    try {
      const response = await config.apiRequest(
        "POST",
        `updateCollegeProgram`,
        JSON.stringify(progValues),
        true
      );

      if (response) {
        const newPrgValue = {
          ...prgValue,
          ["id"]: response.id,
        };

        prgValue = newPrgValue;
      }
      if (!response) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }

    program.push(prgValue);

    setProgValues({
      departmentName: "",
      program: "",
      sra: "",
      specialization: "",
      prepareIIQA_ID: "1",
      id: "",
    });
  };

  const handleProgramDelete = async (id, i) => {
    const newProgram = [...program];
    newProgram.splice(i, 1);

    await config.deleteRequest("DELETE", `${id}/program-run-by-college`);
    setProgram(newProgram);
  };

  const handleDocDelete = async (field) => {
    const response = await config.deleteRequest(
      "POST",
      `${iiqa.iiqa_ID}/${field}`
    );
    if (response) {
      config.notify("File Deleted SuccessFully", "error");
    }

    setMou({
      ...mou,
      ["document"]: "",
    });
  };

  const handleStaff = (e, name) => {
    const inputValue = e.target.value;
    const parsedValue = parseInt(inputValue);

    // Check if the parsed value is NaN (Not-a-Number)
    const isValidValue = !isNaN(parsedValue);

    const newStaff = {
      ...staff[name],
      [e.target.name]: isValidValue ? parsedValue : "",
    };

    setStaff({
      ...staff,
      [name]: newStaff,
    });
  };

  const handleStuChange = (e) => {
    const newStudent = {
      ...student,
      [e.target.name]: !isNaN(parseInt(e.target.value))
        ? parseInt(e.target.value)
        : "",
    };
    setStudent(newStudent);
  };

  const handleSelfDocDelete = async () => {
    const response = await config.deleteRequest(
      "POST",
      `${program[0].id}/remove-file-self-declaration`
    );
    if (response) {
      config.notify("File Deleted SuccessFully", "error");
    }

    setSelfDoc("");
  };

  const handleSubmit = async () => {
    if (selfDoc) {
      await config.apiRequest(
        "POST",
        `${iiqa.iiqa_ID}/updateProgramCount`,
        JSON.stringify(Object.values(acadmicData)),
        true
      );

      staffData("pTS", "Number of Permanent Teaching staff");
      staffData("oTS", "Number of Other Teaching staff");
      staffData("nTS", "Number of Non Teaching staff");
      studentData();

      config.notify("Saved", "success");
      completedForm("Academic Information");
      setIIQAUpdate(!iiqaUpdate);
    } else {
      config.notify("Please Upload Self Declaration", "info");
    }
  };

  const staffData = async (field, category) => {
    const formdata = new FormData();
    formdata.append("male", staff[field].male);
    formdata.append("female", staff[field].female);
    formdata.append("transgender", staff[field].transgender);
    staff[field].method === "POST" && formdata.append("category", category);

    await config.apiRequest(
      staff[field].method,
      `${
        staff[field].method === "POST"
          ? iiqa.iiqa_ID + "/save"
          : staff[field].id + "/update"
      }-details-of-staff`,
      formdata,
      ""
    );
  };

  const studentData = async () => {
    const formdata = new FormData();
    student.method === "POST" &&
      formdata.append(
        "category",
        "Number of Regular Face to Face Students ( In case of Open University consider Learners in the preceding year )"
      );
    formdata.append("male", student.male);
    formdata.append("female", student.female);
    formdata.append("transgender", student.transgender);

    await config.apiRequest(
      student.method,
      `${
        student.method === "POST" ? iiqa.iiqa_ID : student.id
      }/update-details-of-student`,
      formdata,
      ""
    );
  };

  return (
    <>
      <div className="panel panel-primary card border p-4 mt-1">
        <div className="panel-heading p-3 text-white bg-slate-500">
          Academic Information
        </div>
        <div className="panel-body">
          {/* Number of Programmes offered */}
          <div className="panel panel-default border ">
            <div className="panel-heading mt-1 p-1">
              Number of Programmes offered ( In case of Open University consider
              programmes offered through distance mode and regular mode - only
              applicable to MPhil and PhD Programmes )
              <span
                data-placement="right"
                title="Classified as per UGC Specification of degree Regulation of 2014..."
                className="glyphicon glyphicon-question-sign"
              ></span>
            </div>
            <form onSubmit={handleFormSubmit} className="panel-body p-3">
              <table
                className="table table-bordered table-responsive"
                style={{ tableLayout: "fixed" }}
              >
                <tbody>
                  {/* UG */}
                  <tr>
                    <td>UG</td>
                    <td>
                      <input
                        name="ug"
                        className="numberwidth inputs border rounded-md p-1 "
                        maxLength="3"
                        type="number"
                        value={acadmicData.ug}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  {/* PG */}
                  <tr>
                    <td>PG</td>
                    <td>
                      <input
                        className="numberwidth inputs border rounded-md p-1"
                        maxLength="3"
                        name="pg"
                        type="number"
                        value={acadmicData.pg}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* Post Master's (DM, Ayurveda Vachaspathi, M.Ch) */}
                  <tr>
                    <td>Post Master&apos;s (DM, Ayurveda Vachaspathi, M.Ch)</td>
                    <td>
                      <input
                        name="pm"
                        className="numberwidth inputs border rounded-md p-1"
                        maxLength="3"
                        type="number"
                        value={acadmicData.pm}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* Pre Doctoral (M.Phil) */}
                  <tr>
                    <td>Pre Doctoral (M.Phil)</td>
                    <td>
                      <input
                        className="numberwidth inputs border rounded-md p-1"
                        maxLength="3"
                        name="predoctoral"
                        type="number"
                        value={acadmicData.predoctoral}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* Doctoral (Ph.D) */}
                  <tr>
                    <td>Doctoral (Ph.D)</td>
                    <td>
                      <input
                        className="numberwidth inputs border rounded-md p-1"
                        maxLength="3"
                        name="phd"
                        type="number"
                        value={acadmicData.phd}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* Post Doctoral (D.Sc, D.Litt, LLD) */}
                  <tr>
                    <td>Post Doctoral (D.Sc, D.Litt, LLD)</td>
                    <td>
                      <input
                        className="numberwidth inputs border rounded-md p-1"
                        maxLength="3"
                        name="postdoctoral"
                        type="number"
                        value={acadmicData.postdoctoral}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* PG Diploma recognised by statutory authority including university */}
                  <tr>
                    <td>
                      PG Diploma recognised by statutory authority including
                      university
                    </td>
                    <td>
                      <input
                        className="numberwidth inputs border rounded-md p-1"
                        maxLength="3"
                        name="pgDiploma"
                        type="number"
                        value={acadmicData.pgDiploma}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* Diploma */}
                  <tr>
                    <td>
                      Diploma{" "}
                      <span
                        data-placement="right"
                        title="Please provide only number of Diploma programs offered..."
                        className="glyphicon glyphicon-question-sign"
                      ></span>
                    </td>
                    <td>
                      <input
                        className="numberwidth inputs border rounded-md p-1"
                        maxLength="3"
                        name="diploma"
                        type="number"
                        value={acadmicData.diploma}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  {/* Certificate / Awareness */}
                  <tr>
                    <td>Certificate / Awareness</td>
                    <td className="ml-auto w-1/4">
                      <input
                        className="numberwidth inputs border rounded-md p-1 w-full"
                        maxLength="3"
                        name="cirAware"
                        type="number"
                        value={acadmicData.cirAware}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>

        {/* PROGRAMS */}
        <div className="bg-blue-200 card mt-4 py-2">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold">
              Program
              <span
                className="text-sm text-blue-600 cursor-pointer"
                title="a) Click on Add button enter the department name(s) and click on the dropredoctoralown list for confirming the Department name.
              b) Move to the next field that is program and select the program from the system suggested dropredoctoralown list.
                c) Select the SRA if applicable.
              d) Click on Add button to view the saved result in the table. Repeat the process for additional   entries."
              >
                &nbsp; &nbsp;&nbsp;<b>?</b>
              </span>
            </h2>
          </div>
          <form className="p-4" onSubmit={addProgram}>
            <table
              className={`w-full table-auto border-collapse border border-slate-500 ${
                program.length > 0 && "border-b-0"
              }`}
            >
              <thead>
                <tr className="bg-slate-500 text-white">
                  <th className="">Department</th>
                  <th className="">Program</th>
                  <th className="">SRA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-500 p-2">
                    <input
                      type="text"
                      name="departmentName"
                      value={progValues.departmentName}
                      onChange={handleProgram}
                      className="w-full p-2 border border-blue-300 rounded"
                      placeholder="Department"
                      required
                    />
                    <div className="text-red-500"></div>
                  </td>
                  <td className="border border-slate-500 p-2">
                    <input
                      className="w-full p-2 border border-blue-300 rounded"
                      placeholder="Enter program"
                      // onKeyPress={(e) => e.charCode >= 48 && e.charCode <= 57}
                      value={progValues.program}
                      name="program"
                      type="text"
                      onChange={handleProgram}
                      required
                    />
                  </td>
                  <td className="border border-slate-500 p-2">
                    <select
                      value={progValues.sra}
                      name="sra"
                      className="w-full p-2 border border-blue-300 rounded"
                      onChange={handleProgram}
                      required
                    >
                      <option value="" disabled>
                        --SRA--
                      </option>
                      {sraList.length > 0 &&
                        sraList.map((ele, i) => {
                          return (
                            <option value={ele.sraType} key={i}>
                              {ele.sraType}
                            </option>
                          );
                        })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td
                    className={`border border-l-0 border-slate-500 p-2 ${
                      program.length > 0 && "border-b-0"
                    }`}
                  >
                    <label className="text-sm">
                      Specialization
                      <span
                        className="text-blue-600 cursor-pointer"
                        title="Please use this option only when the program or degree has a specialization included in the parenthesis, Eg:- B.Sc(industrial chemistry), B.Tech(Electrical Engineering), BA(Fine Arts), B.Com(Computers), MBA(Tourism &amp; Management)etc. Also in case of multiple programs offered by the same department please enter specialization for distinguishing the programs i.e., BA(Mathematics), BA(Statistics), MA(English), MA(Literature)."
                      >
                        ?
                      </span>
                    </label>
                    <input
                      name="specialization"
                      className="w-full p-2 border border-blue-300 rounded"
                      placeholder="Enter Specialization"
                      maxLength="100"
                      value={progValues.specialization}
                      type="text"
                      onChange={handleProgram}
                      required
                    />
                    <br />
                    <div className="text-right">
                      <button className="btns submitbtn mt-2" type="submit">
                        ADD
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="w-full table-auto border-collapse border border-slate-500">
              <tbody>
                {program.length > 0 &&
                  program.map((ele, i) => {
                    return (
                      <tr key={i}>
                        <td className="border border-slate-500 p-2">
                          {ele.departmentName}
                        </td>
                        <td className="border border-slate-500 p-2">
                          {ele.program}({ele.specialization})
                        </td>
                        <td className="border border-slate-500 p-2">
                          {ele.sra}
                        </td>
                        <td
                          className="border border-slate-500 p-2 cursor-pointer"
                          onClick={() => handleProgramDelete(ele.id, i)}
                        >
                          <ImBin2 />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </form>
          <div className="p-4">
            <div className="">
              Please upload self-declaration by the head of the institution with
              reference to affiliation status in the format of NAAC
              <br />
              <a
                target="_new"
                href="https://assessmentonline.naac.gov.in/public/predoctoralf/self_declaration.docx"
                className="text-blue-600 font-bold"
              >
                <div className="m-2">
                  <b className="p-1 m-2 mb-2">Download prescribed format</b>
                  <span
                    className="text-blue-600 cursor-pointer"
                    title="Do not exclude any of the clauses stated therein and use only the format downloaded from this portal only. Ensure that all the programs having the current affiliation and students enrolled are included. In case of programs discontinued but have students enrolled in the previous years pursuing the studies, the same may be entered with a remark reflecting the status."
                  >
                    ?
                  </span>
                </div>
              </a>
            </div>
            <div className="flex">
              {selfDoc ? (
                <>
                  <a
                    className="cursor-pointer my-auto ml-2"
                    href={config.RESOURCE_URL + selfDoc}
                    target="_blank"
                  >
                    View Document
                  </a>
                  <div
                    className="ml-2 my-auto cursor-pointer"
                    name="mouDocument"
                    onClick={handleSelfDocDelete}
                  >
                    <ImBin2 />
                  </div>
                </>
              ) : (
                <label
                  className="custom-file-upload border  bg-gradient-to-br from-slate-100 to-slate-200
                  text-black/80
                  rounded-md
                  cursor-pointer
                  shadow-xl shadow-slate-300/60 p-2"
                >
                  <input
                    className="hidden"
                    type="file"
                    name="fileInput"
                    accept=".pdf"
                    onChange={(e) => handleDoc(e, "prg")}
                  />
                  Upload File
                </label>
              )}
              <div className="text-red-500"></div>
            </div>
          </div>
        </div>

        {/* Details of Collge*/}
        <div className="border mt-4 px-4 p-3">
          {/* Details of Staff */}
          <div className="bg-white border rounded shadow">
            <div className="p-2 border-b bg-[#468cc9]">
              <h2 className="text-white">Details of Staff</h2>
            </div>
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Categories</th>
                  <th className="p-2">Male</th>
                  <th className="p-2">Female</th>
                  <th className="p-2">Transgender</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Number of Permanent Teaching staff", key: "pTS" },
                  {
                    label: "Number of Other Teaching staff",
                    key: "oTS",
                    info: "(All other teaching staff engaged by the institution excluding permanent teaching staff)",
                  },
                  { label: "Number of Non Teaching staff", key: "nTS" },
                ].map((category, index) => (
                  <tr key={index}>
                    <td className="border p-2">
                      {category.label}{" "}
                      {category.info && (
                        <span
                          data-placement="right"
                          title={category.info}
                          className="text-blue-500"
                        >
                          <i className="fas fa-question-circle"></i>
                        </span>
                      )}
                    </td>
                    {["male", "female", "transgender", "total"].map(
                      (type, i) => (
                        <td key={i} className="border p-2">
                          <input
                            placeholder="count"
                            maxLength={
                              type === "total"
                                ? "5"
                                : type === "transgender"
                                  ? "2"
                                  : "4"
                            }
                            className="form-input w-full p-2 border"
                            name={type}
                            type="number"
                            value={staff[category.key][type]}
                            onChange={(e) => handleStaff(e, category.key)}
                            disabled={type === "total"}
                          />
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Details of Student */}
          <div className="bg-white border rounded shadow mt-4">
            <div className="bg-[#468cc9] p-2 border-b">
              <h2 className="text-white">Details of Student</h2>
            </div>
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Categories</th>
                  <th className="p-2">Male</th>
                  <th className="p-2">Female</th>
                  <th className="p-2">Transgender</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 w-2/6">
                    Number of Regular Face to Face Students ( In case of Open
                    University consider Learners in the preceding year )
                  </td>
                  {["male", "female", "transgender"].map((type, index) => (
                    <td
                      key={index}
                      className={`w-1/6 p-2 ${index === 4 ? " align-top" : ""}`}
                    >
                      <input
                        placeholder="count"
                        maxLength={index === 4 ? "5" : "4"}
                        className="w-full p-2 border"
                        name={type}
                        type="number"
                        value={student[type]}
                        onChange={handleStuChange}
                      />
                    </td>
                  ))}
                  <td className="w-1/6 border p-2">
                    <div className="w-full p-2 border">
                      {student.female + student.male + student.transgender}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/*MOU*/}
        <div className="flex items-center card border mt-4 p-2">
          <div className="w-1/3">
            <div className="p-4">
              <p className="text ">
                Does the college have an academic MoU with any foreign
                institution? If so, attach the MoU (Upload document)
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="p-4">
              <div className="flex">
                <div className="flex justify-start w-full">
                  <div className="flex align-middle w-2/3">
                    <label className="my-auto w-1/3">
                      Yes
                      <input
                        className="ml-2"
                        onChange={() =>
                          setMou({
                            ...mou,
                            state: true,
                          })
                        }
                        name="special_uni"
                        type="radio"
                        value="1"
                        defaultChecked={mou.state === true}
                      />
                    </label>
                    <label className="my-auto w-1/3">
                      No
                      <input
                        className="ml-2"
                        onChange={() =>
                          setMou({
                            ...mou,
                            state: false,
                          })
                        }
                        name="special_uni"
                        type="radio"
                        value="0"
                        defaultChecked={mou.state === false}
                      />
                    </label>
                    {mou.state && (
                      <div className="flex align-middle m-auto">
                        {mou.document ? (
                          <div className="flex ">
                            <a
                              className="cursor-pointer my-auto ml-2"
                              href={config.RESOURCE_URL + mou.document}
                              target="_blank"
                            >
                              View Document
                            </a>
                            <div
                              className="ml-2 my-auto cursor-pointer"
                              name="mouDocument"
                              onClick={() => handleDocDelete("remove-file-mou")}
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
                            onChange={(e) => handleDoc(e, "mou")}
                          >
                            <input
                              className="hidden"
                              type="file"
                              name="fileInput"
                              accept=".pdf"
                            />
                            Upload File
                          </label>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-right">
        <button
          type="button"
          className="btns submitbtn mt-2"
          onClick={handleSubmit}
        >
          Save and Next
        </button>
      </div>
    </>
  );
};

export default AcedemicForm;
