import { IoMdArrowDropleft } from "react-icons/io";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "manageiiqa",
    label: "Manage IIQA",
    menu: [
      {
        item: "Prepare IIQA",
        path: "/components/prepare-iiqa",
      },
      {
        item: "Make Payment",
        path: "/",
      },
      {
        item: "Submit IIQA",
        path: "/",
      },
      {
        item: "View IIQA Clarifications",
        path: "/",
      },
    ],

    icon: <IoMdArrowDropleft />,
  },

  {
    key: "managessr",
    label: "Manage SSR",
    menu: [
      {
        item: "Profile For SSR",
        path: "/components/profile-for-ssr",
      },
      {
        item: "Extended Profile & QIF",
        path: "/components/extended-profile-and-qif",
      },
      {
        item: "Executive Summary",
        path: "/",
      },
      {
        item: "Select Optional Metrics",
        path: "/",
      },
      {
        item: "SSR Initial Payment",
        path: "/",
      },
      {
        item: "Student Details for Survey",
        path: "/",
      },
      {
        item: "Submit SSR",
        path: "/",
      },
    ],
    icon: <IoMdArrowDropleft />,
  },
  {
    key: "managedvv",
    label: "Manage DVV",
    path: "/managedvv",
    menu: [
      {
        item: "SSR-DVV Clarifications",
        path: "/",
      },
      {
        item: "Inflibnet Input & Review",
        path: "/",
      },
    ],
    icon: <IoMdArrowDropleft />,
  },
  {
    key: "Manageassessment",
    label: "Manage Assessment",
    path: "/Manageassessment",
    menu: [
      {
        item: "Set Visit Calendar",
        path: "/",
      },
      {
        item: "View Visit Details",
        path: "/",
      },
      {
        item: "Assessment Review",
        path: "/",
      },
      {
        item: "Assessment Payment",
        path: "/",
      },
      {
        item: "Set Revisit Dates",
        path: "/",
      },
    ],
    icon: <IoMdArrowDropleft />,
  },
  {
    key: "manageappeal",
    label: "Manage Appeal",
    path: "/manageappeal",
    menu: [
      {
        item: "Create & Submit Proforma",
        path: "/",
      },

      {
        item: "View Current Status",
        path: "/",
      },

      {
        item: "Non Availability Calendar",
        path: "/",
      },

      {
        item: "Appeal Clarification",
        path: "/",
      },

      {
        item: "Re-DVV Clarification",
        path: "/",
      },
    ],
    icon: <IoMdArrowDropleft />,
  },
  {
    key: "manageaqar",
    label: "Manage AQAR",
    path: "/manageappeal",
    menu: [
      {
        item: "Prepare & Submit AQAR",
        path: "/",
      },
      {
        item: "AQAR Review Details",
        path: "/",
      },
    ],
    icon: <IoMdArrowDropleft />,
  },
  {
    key: "reports",
    label: "Reports",
    path: "/reports",
    menu: [
      {
        item: "Assessment Details",
        path: "/",
      },

      {
        item: "AQAR List",
        path: "/",
      },

      {
        item: "Assessment Cycle History",
        path: "/",
      },
    ],
    icon: null,
  },
  {
    key: "visitfeedback",
    label: "Visit Feedback",
    path: "/visitFeedback",
    menu: [],
    icon: null,
  },
  {
    key: "manageprofiledetails",
    label: "Manage Profile Details",
    path: "/manageprofiledetails",
    menu: [],
    icon: null,
  },
  {
    key: "mocktests",
    label: "Mock Test",
    path: "/mocktests",
    menu: [],
    icon: null,
  },
  {
    key: "guidelines",
    label: "Guidelines",
    path: "/guidelines",
    menu: [],
    icon: null,
  },
  {
    key: "faq",
    label: "FQA",
    path: "/fqa",
    menu: [],
    icon: null,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    menu: [
      "Prepare IIQA",
      "Make Payment",
      "Submit IIQA",
      "View IIQA Clarifications",
    ],
    icon: <IoMdArrowDropleft />,
  },
  {
    key: "support",
    label: "Support/ Helpdesk",
    path: "/support",
    menu: [
      "Prepare IIQA",
      "Make Payment",
      "Submit IIQA",
      "View IIQA Clarifications",
    ],
    icon: <IoMdArrowDropleft />,
  },
];

export const userInfo = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "https://example.com/avatar.jpg",
  },
];

export const sraListItem = [
  "AICTE",
  "ICAR",
  "NCTE",
  "DCI",
  "PCI",
  "INC",
  "BCI",
  "CCIM",
  "MCI",
  "CCH",
  "VCI",
  "COA",
  "RCI",
  "NCHMCT",
  "DEB-UGC",
  "OT PT",
];

export const collegeType = [
  ["Medical college", "Dental college"],
  ["Nursing college", "Physiotherapy college"],
  ["Ayurveda college", "Unani college"],
  ["Siddha college", "Homeopathy college"],
  ["Allied Health science college", "Yoga and Naturopathy college"],
  ["Teacher Education Institutions", "Law PG & Above College"],
  ["Law UG College", "Sanskrit College"],
];
