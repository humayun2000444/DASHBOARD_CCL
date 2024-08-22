import React from "react";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import { userTypes } from "../../../constants/userTypeConstant";
import Consultant from "../../services/Dashboard/Pages/Consultant/Index";
import SuperAdmin from "../../services/Dashboard/Pages/SuperAdmin/Index";
import BtrcPortal from "../../../views/services/Dashboard/Pages/BtrcAdmin/BtrcPortal.jsx";
import AdmissionManager from "../../services/Dashboard/Pages/AdmissionManager/Index";
import Admin from "../../services/Dashboard/Pages/Admin/Index";
import Provider from "../../services/Dashboard/Pages/Provider/Index";
import BranchManager from "../../services/Dashboard/Pages/BranchManager/Index";
import Student from "../../services/Dashboard/Pages/Student/Index";
import AccountManager from "../../services/Dashboard/Pages/AccountManager/Index";
import Editor from "../../services/Dashboard/Pages/Editor/Index";
import FinanceManager from "../../services/Dashboard/Pages/FinanceManager/Index";
import AccountOfficer from "../../services/Dashboard/Pages/AccountOfficer/Index";
import ComplianceManager from "../../services/Dashboard/Pages/ComplianceManager/Index";
import ProviderAdmin from "../../services/Dashboard/Pages/ProviderAdmin/Index";
import AdmissionOfficer from "../../services/Dashboard/Pages/AdmissionOfficer/Index";
import NewDashboard from "../../services/Dashboard/Pages/NewDashboard/NewDashboard";
import StudentDashboard from "../../services/Dashboard/Pages/StudentNew/StudentDashboard";
import Users from "../../services/Users/Users";
import UserDashBoard from "../../services/Dashboard/Pages/UserDashBoard/UserDashBoard.jsx";
import Calls from "../WebRtc/Calls";

const AnalyticsDashboard = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  //fetch('https://localhost:44349/api/Values')
  //  .then(response => response.json())
  //  .then(data => {

  //  });

  const token = JSON.parse(localStorage.getItem("userInfo"));
  const userRole = token.roles[0];

  return (
    <>
      {/* working User Dashboard */}
      {userRole.name === "ROLE_BTRC" && <BtrcPortal /> }
      {userRole.name === "ROLE_ADMIN" &&  <SuperAdmin /> }
      {userRole.name === "ROLE_WEBRTC" &&  <Calls/> }
      {userRole.name === "ROLE_USER" &&  <UserDashBoard/> }

      {/*
      {userRole.name === "ROLE_ADMIN" ? <BtrcPortal /> : <SuperAdmin />} */}

      {/* {userRole.name === "ROLE_USER" && UserDashBoard} */}
    </>

    // <div>
    //   {currentUser.userTypeId === userTypes?.AdmissionManager && (
    //     <AdmissionManager />
    //   )}

    //   {currentUser.userTypeId === userTypes?.Provider && <Provider />}

    //   {currentUser.userTypeId === userTypes?.BranchManager && <BranchManager />}

    //   {currentUser.userTypeId === userTypes?.Student && <Student />}

    //   {currentUser.userTypeId === userTypes?.AccountManager && (
    //     <AccountManager />
    //   )}

    //   {currentUser.userTypeId === userTypes?.Editor && <Editor />}

    //   {currentUser.userTypeId === userTypes?.FinanceManager && (
    //     <FinanceManager />
    //   )}

    //   {currentUser.userTypeId === userTypes?.AccountOfficer && (
    //     <AccountOfficer />
    //   )}

    //   {currentUser.userTypeId === userTypes?.ComplianceManager && (
    //     <ComplianceManager />
    //   )}

    //   {currentUser.userTypeId === userTypes?.ProviderAdmin && <ProviderAdmin />}

    //   {currentUser.userTypeId === userTypes?.AdmissionOfficer && (
    //     <AdmissionOfficer />
    //   )}

    //   {currentUser.userTypeId === userTypes?.Consultant && <Consultant />}
    // </div>
  );
};

export default AnalyticsDashboard;
