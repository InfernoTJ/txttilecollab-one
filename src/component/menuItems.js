// import {  MdCancelPresentation } from "react-icons/md";
// import { GrCompliance } from "react-icons/gr";
// import { MdPeople } from "react-icons/md";
// import { BsPersonWorkspace } from "react-icons/bs";
// import { RiHome2Fill, RiDashboardFill, RiBook2Fill, RiCalculatorLine, RiPriceTag3Fill, RiListOrdered2  } from "react-icons/ri";


// export const menuItems = [
//   {
//     title: "Home",
//     icon: <RiHome2Fill />,
//     path: "home"
//   },
//   {
//     title: "Dashboard",
//     path: "dashboard",
//     icon: <RiDashboardFill />,
   
//   },
//   {
//     title: "Loom Details",
//     path: "loomdetails",
//     icon: <MdCancelPresentation />,
   
//   },
//   {
//     title: "Loom Booking",
//     path: "loomBooking",
//     icon: <RiBook2Fill />,
   
//   },
//   {
//     title: "Job Work Enquiry",
//     icon: <BsPersonWorkspace />,
//     path: "jobwork-enquiry"
//   },
//   {
//     title: "Live Orders",
//     icon: <RiListOrdered2 />,
//     path: "live-orders"
//   },
//   {
//     title: "Cancelled Orders",
//     icon: <MdCancelPresentation />,
//     path: "cancelled-order"
//   },
//   {
//     title: "Get Yarn Rates",
//     icon: <RiPriceTag3Fill />,
//     path: "get-yarn"
//   },
//   {
//     title: "Calculation",
//     icon: <RiCalculatorLine />,
//     path: "calculation"
//   },
//   {
//     title: "Completed Orders",
//     icon: <GrCompliance />,
//     path: "completed-orders"
//   },
//   {
//     title: "Human Resource",
//     icon: <MdPeople />,
//     path: "human-resource"
//   }
// ];


import { MdCancelPresentation } from "react-icons/md";
import { GrCompliance,GrDocumentTime  } from "react-icons/gr";
import { MdPeople } from "react-icons/md";
// import { BsPersonWorkspace } from "react-icons/bs";
import { RiHome2Fill, RiCalculatorLine, RiPriceTag3Fill, RiStickyNoteAddLine } from "react-icons/ri";
import { FaChartLine, FaUserTie, FaUser, FaBell, } from "react-icons/fa"; // Import additional icons for trader, yarn, and admin
import { MdPostAdd,  MdNotificationAdd,MdOutlineAddToPhotos } from "react-icons/md";
import { SiGitbook } from "react-icons/si";
import { AiOutlineAudit } from "react-icons/ai";
import { BsFillStickiesFill ,BsCardChecklist } from "react-icons/bs";
import { CgDatabase } from "react-icons/cg";
import { GiYarn } from "react-icons/gi";
export const menuItems = [
  // Common items
  {
    title: "Home",
    icon: <RiHome2Fill />,
    path: "home",
    roles: ["L", "T", "Y", "A"],
  },

  {
    title: "Loom Details",
    path: "loomdetails",
    icon: <MdPostAdd />,
    roles: ["L"],
  },
  {
    title: "Plan Loom",
    // path: "plan-loom",
    icon: <FaChartLine />,
    roles: ["T"],
    submenus: [
      {
        title: "Generate Enquiry",
        path: "plan-loom",
        icon: <RiStickyNoteAddLine />,
      },
      {
        title: "Check Response",
        path: "check-response",
        icon: <BsCardChecklist  />,
      },
      {
        title: "My Enquiries",
        path: "updatemyenquiries",
        icon: <CgDatabase />,
      },
    ]
  },
  
  





  {
    title: "Loom Booking",
    path: "loombookDetails",
    icon: <SiGitbook />,
    roles: ["L"],
  },

  {
    title: "Job Work Enquiry",
    icon: <MdNotificationAdd />,
    path: "jobwork-enquiry",
    roles: ["L"],
  },

  {
    title: "Live Orders",
    icon: <GrDocumentTime />,
    path: "live-orders",
    roles: ["L"]
  },

  {
    title: "Live Orders",
    icon: <GrDocumentTime />,
    path: "trader-live-orders",
    roles: ["T"],
  },

  {
    title: "Cancelled Orders",
    icon: <MdCancelPresentation />,
    path: "cancelled-order",
    roles: ["L"],
  },



  {
    title: "Knotting Offers",
    // path: "plan-loom",
    icon: <AiOutlineAudit />,
    roles: ["L"],
    submenus: [
      {
        title: "Generate Knotting Offer",
        path: "generateknottingOffer",
        icon: <MdOutlineAddToPhotos />,
      },
      {
        title: "Knotting Response",
        path: "knottingResponse",
        icon: <BsFillStickiesFill />,
      }
    ]
  },


  {
    title: "Knotting Offers",
    icon: <AiOutlineAudit />,
    path: "trader-knotting-offers",
    roles: ["T"],
    submenus: [
      {
        title: "Knotting Offers",
        path: "trader-knotting-offers",
        icon: <MdOutlineAddToPhotos />,
      },
      {
        title: "Knotting Live Order",
        path: "trader-live-order",
        icon: <BsFillStickiesFill />,
      }
    ]
  },

  {
    title: "Get Yarn Rates",
    icon: <RiPriceTag3Fill />,
    path: "get-yarn",
    roles: ["L"],
  },

  {
    title: "Get Yarn Rates",
    icon: <RiPriceTag3Fill />,
    path: "trader-get-yarn",
    roles: ["T"],
  },

  // {
  //   title: "Calculation",
  //   icon: <RiCalculatorLine />,
  //   path: "calculation",
  //   roles: ["L"],
  // },

  {
    title: "Calculation",
    icon: <RiCalculatorLine />,
    path: "Tcalculation",
    roles: ["T"],
  },

  {
    title: "Completed Orders",
    icon: <GrCompliance />,
    path: "completed-orders",
    roles: ["L"],
  },

  {
    title: "Completed Orders",
    icon: <GrCompliance />,
    path: "T-completed-orders",
    roles: ["T"],
  },

  {
    title: "Profile",
    icon: <FaUser  />,
    path: "L-Profile",
    roles: ["L"],
  },

  {
    title: "Incomplete Task",
    path: "incomplete-task",
    icon: <FaUserTie />,
    roles: ["T"],
  },
  {
    title: "Profile",
    icon: <FaUser  />,
    path: "T-Profile",
    roles: ["T"],
  },
  // Yarn-specific items
  // {
  //   title: "Notifications",
  //   path: "notifications",
  //   icon: <FaBell />,
  //   roles: ["Y"],
  // },

  {
    title: "Loom",
    path: "yarn-loom",
    icon: <SiGitbook />,
    roles: ["Y"],
  },

  {
    title: "Trader",
    path: "yarn-Trader",
    icon: <GiYarn style={{fontWeight:'bold'}} />,
    roles: ["Y"],
  },



  // Admin-specific items
  {
    title: "Users",
    path: "users",
    icon: <FaUser />,
    roles: ["A"],
  },
  {
    title: "Trader",
    path: "trader",
    icon: <FaUser />,
    roles: ["A"],
  },
  {
    title: "Loom",
    path: "loom",
    icon: <FaUser />,
    roles: ["A"],
  },
  {
    title: "Yarn",
    path: "yarn",
    icon: <FaUser />,
    roles: ["A"],
  },
];




// import { MdCancelPresentation } from "react-icons/md";
// import { GrCompliance } from "react-icons/gr";
// import { MdPeople } from "react-icons/md";
// import { BsPersonWorkspace } from "react-icons/bs";
// import { RiHome2Fill, RiDashboardFill, RiBook2Fill, RiCalculatorLine, RiPriceTag3Fill, RiListOrdered2 } from "react-icons/ri";
// import { FaChartLine, FaUserTie } from "react-icons/fa"; // Import additional icons for trader

// export const menuItems = [
//   // Common items for both loom and trader
//   {
//     title: "Home",
//     icon: <RiHome2Fill />,
//     path: "home",
//     forTrader: true,
//     forLoom: true,
//   },
//   {
//     title: "Dashboard",
//     path: "dashboard",
//     icon: <RiDashboardFill />,
//     forTrader: true,
//     forLoom: true,
//   },
//   {
//     title: "Live Orders",
//     icon: <RiListOrdered2 />,
//     path: "live-orders",
//     forTrader: false,
//     forLoom: true,
//   },
//   {
//     title: "Get Yarn Rates",
//     icon: <RiPriceTag3Fill />,
//     path: "get-yarn",
//     forTrader: false,
//     forLoom: true,
//   },
//   {
//     title: "Calculation",
//     icon: <RiCalculatorLine />,
//     path: "calculation",
//     forTrader: false,
//     forLoom: true,
//   },
  
//   {
//     title: "Completed Orders",
//     icon: <GrCompliance />,
//     path: "completed-orders",
//     forTrader: false,
//     forLoom: true,
//   },
//   // Loom-specific items
  
//   {
//     title: "Loom Details",
//     path: "loomdetails",
//     icon: <MdCancelPresentation />,
//     forTrader: false,
//     forLoom: true,
//   },
//   {
//     title: "Loom Booking",
//     path: "loomBooking",
//     icon: <RiBook2Fill />,
//     forTrader: false,
//     forLoom: true,
//   },
//   {
//     title: "Job Work Enquiry",
//     icon: <BsPersonWorkspace />,
//     path: "jobwork-enquiry",
//     forTrader: false,
//     forLoom: true,
//   },
 
//   {
//     title: "Cancelled Orders",
//     icon: <MdCancelPresentation />,
//     path: "cancelled-order",
//     forTrader: false,
//     forLoom: true,
//   },
  

//   {
//     title: "Human Resource",
//     icon: <MdPeople />,
//     path: "human-resource",
//     forTrader: false,
//     forLoom: true,
//   },
//   // Trader-specific items
//   {
//     title: "Plan Loom",
//     path: "plan-loom",
//     icon: <FaChartLine />,
//     forTrader: true,
//     forLoom: false,
//   },
//   {
//     title: "Generate Enqury",
//     path: "generate-enqury",
//     icon: <FaUserTie />,
//     forTrader: true,
//     forLoom: false,
//   },

//   {
//     title: "Check Response",
//     path: "check-response",
//     icon: <FaUserTie />,
//     forTrader: true,
//     forLoom: false,
//   },
//   {
//     title: "Incomplete Task",
//     path: "incomplete-task",
//     icon: <FaUserTie />,
//     forTrader: true,
//     forLoom: false,
//   },

// ];