import Link from "next/link";
import React from "react";
import { BiBell } from "react-icons/bi";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Dashboard = () => {
  return (
    <section className="container h-4/5 mx-auto">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <div className="bg-white rounded-lg  flex justify-between align-center shadow-md p-4">
            <div className="grid grid-cols-1 w-1/2 m-2 gap-4">
              <div className="col-span-1">
                <div className="bg-green-700 rounded-lg p-4   text-white">
                  <i className="text-4xl mb-2">
                    <BiBell fontSize="25px" />
                  </i>
                  <p className="text-xl font-bold">APPLICATION STATUS</p>
                  <p className="text-xl font-bold">IIQA PENDING</p>
                  <div className="bg-white-100 h-2 mt-2">
                    <div className="bg-green-500 h-full w-full"></div>
                  </div>
                  <p className="text-sm mt-1">updated on 11 Sep 2023</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 w-1/2 gap-4 m-2">
              <div className="col-span-1">
                <div className="bg-blue-700 rounded-lg p-4 text-white">
                  <i className="text-4xl mb-2">
                    <RiLogoutCircleRLine fontSize="25px" />
                  </i>
                  <p className="text-xl font-bold">LAST LOGIN DETAILS</p>
                  <p className="text-xl font-bold">12 Sep 2023</p>
                  <div className="bg-blue-200 h-2 mt-2">
                    <div className="bg-blue-400 h-full w-full"></div>
                  </div>
                  <p className="text-sm mt-1">From: 103.189.81.105</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-initial col-span-8 ">
            <div className="col-span-4"></div>
            <div className="col-span-4">
              <div className="">
                <div className="flex flex-row w-full">
                  <div className="w-1/2 p-4">
                    <div className="bg-red-700 rounded-md p-1">
                      <div className="bg-white rounded-lg shadow-md p-4 mt-1 h-full mb-0 w-full">
                        <h3 className="text-center text-2xl font-bold">
                          Important Dates
                        </h3>
                        <ul className="list-group">
                          <li className="list-group-item flex justify-between">
                            IIQA Submission Date
                            <span className="text-red-500">1/7/2017</span>
                          </li>
                          <li className="list-group-item flex justify-between">
                            Payment Date
                            <span className="text-green-500">2/7/2017</span>
                          </li>
                          <li className="list-group-item flex justify-between">
                            SSR Submission Date
                            <span className="text-green-500">3/7/2017</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 p-4 flex">
                    <div className="bg-yellow-200 rounded-lg flex-grow">
                      <div className="w-full p-4">
                        <p className="font-semibold mix-blend-color-burn">
                          Notification
                        </p>
                        <div className="text-justify">
                          <div className="scrolling-text overflow-hidden ">
                            <div className="animate-scrolling">
                              All the institutions are hereby informed that an
                              OTP verification method will be introduced for the
                              students who are taking up Student Satisfaction
                              Survey (SSS) on their institution teaching
                              learning process. All the institutions have to
                              submit the mobile numbers of the students
                              mandatorily while uploading
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="bg-white rounded-lg shadow-md p-4 h-72">
            <h3 className="text-center text-2xl font-bold">
              Institution Details
            </h3>
            <ul className="list-group">
              <li className="list-group-item flex justify-between">
                <b>Institution Type</b>
                <span>College</span>
              </li>
              <li className="list-group-item flex justify-between">
                <b>Current Cycle</b>
                <span>Cycle 1</span>
              </li>
              <li className="list-group-item flex justify-between">
                <b>Previous Cycle</b>
                <span>Nil</span>
              </li>
              <li className="list-group-item flex justify-between">
                <b>Previous Grade</b>
                <span>Nil</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 mt-4">
            <h3 className="text-center text-2xl font-bold">
              Support / Helpdesk
            </h3>
            <ul className="list-group">
              <li className="list-group-item flex justify-between">
                <b>Issues Raised</b>
                <span>0</span>
              </li>
              <li className="list-group-item flex justify-between">
                <b>Issues Closed</b>
                <span>0</span>
              </li>
            </ul>
            <Link href="" className="btn btn-warning mt-4">
              Report New Issue
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
