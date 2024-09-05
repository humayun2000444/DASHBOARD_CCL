import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import StudentList from "./views/services/Students/StudentList.js";
import { jwtDecode } from "jwt-decode"; ////
import { history } from "./history";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "./components/core/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";

import { ToastProvider } from "react-toast-notifications";
import "./assets/CoustomStyle/style.css";
import "./assets/CoustomStyle/pageView.css";
import AdmissionGetData from "./views/Test/AdmissionGetData";

import { permissionList } from "./constants/AuthorizationConstant";
import { userTypes } from "./constants/userTypeConstant";
import PrivateRoute from "./PrivateRoute.js";

// Authentication Checking

const tokenForRouting = JSON.parse(localStorage.getItem("userInfo"));

const adminChecking =
  tokenForRouting && tokenForRouting.roles[0].name !== "ROLE_ADMIN";

const token2 = localStorage.getItem("userInfo");
let isAuth = token2 != null ? true : false;

// Session Expired check
if (token2) {
  const decodedToken = jwtDecode(token2);
  let tokenExpiredTime = decodedToken.exp;

  const currentDate = new Date();
  const currentTime = Math.floor(currentDate.getTime() / 1000);

  if (currentTime > tokenExpiredTime) {
    isAuth = false;
    localStorage.clear();
  }
}

const permission = JSON.parse(localStorage.getItem("current_user"));
const userTypeId = localStorage.getItem("userType");

// Route-based code splitting
const analyticsDashboard = lazy(() =>
  import("./views/dashboard/analytics/AnalyticsDashboard")
);

// trial dashboard start
// const analyticsDashboard = lazy(() =>
//   import("./views/services/Dashboard/Pages/ProviderAdmin/Index")
// )
// trial dashboard end
const CallWebrtc = lazy(() => import("./views/dashboard/WebRtc/Calls"));

const ContactsWebrtc = lazy(() => import("./views/dashboard/WebRtc/Contacts"));

const select = lazy(() => import("./views/forms/form-elements/select/Select"));
const switchComponent = lazy(() =>
  import("./views/forms/form-elements/switch/Switch")
);
const checkbox = lazy(() =>
  import("./views/forms/form-elements/checkboxes/Checkboxes")
);
const radio = lazy(() => import("./views/forms/form-elements/radio/Radio"));
const input = lazy(() => import("./views/forms/form-elements/input/Input"));
const group = lazy(() =>
  import("./views/forms/form-elements/input-groups/InputGoups")
);
const numberInput = lazy(() =>
  import("./views/forms/form-elements/number-input/NumberInput")
);
const textarea = lazy(() =>
  import("./views/forms/form-elements/textarea/Textarea")
);
const pickers = lazy(() =>
  import("./views/forms/form-elements/datepicker/Pickers")
);
const inputMask = lazy(() =>
  import("./views/forms/form-elements/input-mask/InputMask")
);
const layout = lazy(() => import("./views/forms/form-layouts/FormLayouts"));
const formik = lazy(() => import("./views/forms/formik/Formik"));

// Desk Client Component
const countryList = lazy(() => import("./views/core/country/pages/index"));
const designationList = lazy(() =>
  import("./views/core/designation/pages/index")
);
const companyBranchList = lazy(() =>
  import("./views/company/companyBranch/pages/index")
);
const companyContactInformation = lazy(() =>
  import("./views/company/companyContactInformaiton/pages/index")
);
const companyInformation = lazy(() =>
  import("./views/company/companyInformation/pages/index")
);
const noticeItemList = lazy(() =>
  import("./views/notice/noticeItem/pages/index")
);
const noticeForEmployeeList = lazy(() =>
  import("./views/notice/noticeForEmployee/pages/index")
);
const cityList = lazy(() => import("./views/core/city/pages/index"));
const stateList = lazy(() => import("./views/core/state/pages/index"));
const jobCircularList = lazy(() =>
  import("./views/recruitments/jobCircular/pages/index")
);
const applicationList = lazy(() =>
  import("./views/recruitments/application/pages/index")
);
const clientList = lazy(() => import("./views/clients/client/pages/index"));
const clientTypeList = lazy(() =>
  import("./views/clients/clientType/pages/index")
);
// services Client Component

// const AdmissionManager = lazy(() => import("./views/Test/AdmissionManager"))

const Roles = lazy(() =>
  import("./views/services/Configuration/Roles/Roles.jsx")
);
const Menu = lazy(() => import("./views/services/Configuration/Menu/Menu.jsx"));

const RolePermission = lazy(() =>
  import("./views/services/Configuration/Permissions/RolePermission.jsx")
);
const RoleMenu = lazy(() =>
  import("./views/services/Configuration/Menu/RoleMenu.jsx")
);
const EmployeeType = lazy(() =>
  import("./views/services/Configuration/Employees/EmployeeType.jsx")
);
const EmployeeGeneralInfo = lazy(() =>
  import("./views/services/Configuration/Employees/EmployeeGeneralInfo.jsx")
);
const EmployeeContactInfo = lazy(() =>
  import("./views/services/Configuration/Employees/EmployeeContactInfo.jsx")
);
const EmployeeList = lazy(() =>
  import("./views/services/Configuration/Employees/EmployeeList.jsx")
);
const EmployeeProfile = lazy(() =>
  import("./views/services/Configuration/Employees/EmployeeProfile.jsx")
);
const AddUniversityType = lazy(() =>
  import("./views/services/University/AddUniversityType.jsx")
);
const AddUniversityCountry = lazy(() =>
  import("./views/services/University/AddUniversityCountry.jsx")
);
const AddUniversityState = lazy(() =>
  import("./views/services/University/AddUniversityState.jsx")
);
const AddUniversity = lazy(() =>
  import("./views/services/University/AddUniversity.jsx")
);
const AddProviderUniversity = lazy(() =>
  import("./views/services/University/ProviderUniversity/AddProviderUniversity")
);
const AddProviderUniversityCampus = lazy(() =>
  import(
    "./views/services/University/ProviderUniversity/AddProviderUniversityCampus"
  )
);
const AddProviderUniversityFinancial = lazy(() =>
  import(
    "./views/services/University/ProviderUniversity/AddProviderUniversityFinancial"
  )
);
const AddProviderUniversityFeatures = lazy(() =>
  import(
    "./views/services/University/ProviderUniversity/AddProviderUniversityFeatures"
  )
);
const AddProviderUniversityGallery = lazy(() =>
  import(
    "./views/services/University/ProviderUniversity/AddProviderUniversityGallery"
  )
);
const AddProviderUniversityApplicationDocument = lazy(() =>
  import(
    "./views/services/University/ProviderUniversity/AddProviderUniversityApplicationDocument"
  )
);
const AddProviderUniversityTemplateDocument = lazy(() =>
  import(
    "./views/services/University/ProviderUniversity/AddProviderUniversityTemplateDocument"
  )
);
const AddProviderUniversityCommission = lazy(() =>
  import(
    "./views/services/University/ProviderUniversity/AddProviderUniversityCommission"
  )
);
const AddProviderUniversityTestScore = lazy(() =>
  import(
    "./views/services/University/ProviderUniversity/AddProviderUniversityTestScore"
  )
);

// university create form
const UniversityForm = lazy(() =>
  import("./views/services/University/UniCreateForm/UniversityForm")
);

const UniversityCampusForm = lazy(() =>
  import("./views/services/University/UniCreateForm/UniversityCampusForm")
);

const UniversityFinancialForm = lazy(() =>
  import("./views/services/University/UniCreateForm/UniversityFinancialForm")
);

const UniversityFeaturesForm = lazy(() =>
  import("./views/services/University/UniCreateForm/UniversityFeaturesForm")
);

const UniversityTestScoreForm = lazy(() =>
  import("./views/services/University/UniCreateForm/UniversityTestScoreForm")
);

const UniversityApplicationDocumentForm = lazy(() =>
  import(
    "./views/services/University/UniCreateForm/UniversityApplicationDocumentForm"
  )
);

const UniversityTemplateDocumentForm = lazy(() =>
  import(
    "./views/services/University/UniCreateForm/UniversityTemplateDocumentForm"
  )
);

const UniversityCommissionForm = lazy(() =>
  import("./views/services/University/UniCreateForm/UniversityCommissionForm")
);

const AddUniversityCampus = lazy(() =>
  import("./views/services/University/AddUniversityCampus.jsx")
);
const EditDepartment = lazy(() =>
  import("./views/services/UniversitySubjects/EditDepartment")
);
const EditSubDepartment = lazy(() =>
  import("./views/services/UniversitySubjects/EditSubDepartment")
);
const AddUniversityFinancial = lazy(() =>
  import("./views/services/University/AddUniversityFinancial.jsx")
);
const AddUniversityFeatures = lazy(() =>
  import("./views/services/University/AddUniversityFeatures.jsx")
);
const UniversityList = lazy(() =>
  import("./views/services/University/UniversityList.jsx")
);
const UniversityDetails = lazy(() =>
  import("./views/services/University/UniversityDetails.jsx")
);
const CampusList = lazy(() =>
  import("./views/services/University/CampusList.jsx")
);
const CampusDetails = lazy(() =>
  import("./views/services/University/CampusDetails.jsx")
);
const AssignMultipleSubject = lazy(() =>
  import("./views/services/University/AssignMultipleSubject")
);
const CampusSubjectList = lazy(() =>
  import("./views/services/University/CampusSubjectList.jsx")
);
const AddUniversityGallery = lazy(() =>
  import("./views/services/University/AddUniversityGallery.jsx")
);
const AddUniversityTemplateDocument = lazy(() =>
  import("./views/services/University/AddUniversityTemplateDocument")
);
const AddUniversityApplicationDocument = lazy(() =>
  import("./views/services/University/AddUniversityApplicationDocument")
);
const UniversityRecquiredDocument = lazy(() =>
  import("./views/services/University/UniversityRecquiredDocument")
);

// intake
const Intake = lazy(() => import("./views/services/University/Intake.js"));
const AddNewIntakes = lazy(() =>
  import("./views/services/University/AddNewIntakes.jsx")
);
const UpdateIntake = lazy(() =>
  import("./views/services/University/UpdateIntake.jsx")
);

// consultant
const ConsultantList = lazy(() =>
  import("./views/services/Consultant/ConsultantList")
);
const ConsultantDashboard = lazy(() =>
  import("./views/services/Consultant/ConsultantDashboard")
);
const ConsultantProfile = lazy(() =>
  import("./views/services/Consultant/ConsultantProfile")
);
const AssociateProfile = lazy(() =>
  import("./views/services/Consultant/AssociateProfile")
);
const AddConsultant = lazy(() =>
  import("./views/services/Consultant/AddConsultant")
);
const AddAssociate = lazy(() =>
  import("./views/services/Consultant/AddAssociate")
);
const AddConsultantType = lazy(() =>
  import("./views/services/Consultant/AddConsultantType")
);

const BankDetails = lazy(() =>
  import("./views/services/Consultant/BankDetails")
);
const UpdateAssociateBankDetails = lazy(() =>
  import("./views/services/Consultant/UpdateAssociateBankDetails")
);
const ConsultantCommission = lazy(() =>
  import("./views/services/Consultant/ConsultantCommission")
);
const UpdateAssociateCommission = lazy(() =>
  import("./views/services/Consultant/UpdateAssociateCommission")
);
const AddConsultantInformation = lazy(() =>
  import("./views/services/Consultant/AddConsultantInformation")
);
const AssociateInformation = lazy(() =>
  import("./views/services/Consultant/AssociateInformation")
);
const AssociateList = lazy(() =>
  import("./views/services/Consultant/ConsultantByConsultant")
);
const AssociateAddSuccess = lazy(() =>
  import("./views/services/Consultant/AssociateAddSuccess")
);

// Document
const DocumentList = lazy(() =>
  import("./views/services/Document/DocumentList.js")
);
const DocumentCategoryList = lazy(() =>
  import("./views/services/Document/DocumentcategoryList.js")
);

// Report
const AgentReport = lazy(() => import("./views/services/Report/AgentReport"));

// Common Profile Component
const CommonProfile = lazy(() =>
  import("./views/services/CommonProfile/CommonProfile")
);

//Subject
const AddDepartment = lazy(() =>
  import("./views/services/UniversitySubjects/Department.jsx")
);
const AddSubDepartment = lazy(() =>
  import("./views/services/UniversitySubjects/SubDepartment.jsx")
);
const AddProgramLevel = lazy(() =>
  import("./views/services/UniversitySubjects/ProgramLevel.jsx")
);
const Subject = lazy(() =>
  import("./views/services/UniversitySubjects/Subject.jsx")
);
const SubjectList = lazy(() =>
  import("./views/services/UniversitySubjects/SubjectList.jsx")
);
const DocumentGroup = lazy(() =>
  import("./views/services/UniversitySubjects/DocumentGroup.js")
);
const AddSubjectFee = lazy(() =>
  import("./views/services/UniversitySubjects/AddSubjectFee.jsx")
);
const AddSubjectDeliveryPattern = lazy(() =>
  import("./views/services/UniversitySubjects/AddSubjectDeliveryPattern")
);
const AddSubjectDocumentRequirement = lazy(() =>
  import("./views/services/UniversitySubjects/AddSubjectDocumentRequirement")
);
const EditSubjectDocumentRequirement = lazy(() =>
  import("./views/services/UniversitySubjects/EditSubjectDocumentRequirement")
);
const AddSubjectRequirements = lazy(() =>
  import("./views/services/UniversitySubjects/AddSubjectRequirements")
);
const EditSubjectRequirements = lazy(() =>
  import("./views/services/UniversitySubjects/EditSubjectRequirements")
);
const SubjectFeeInformation = lazy(() =>
  import("./views/services/UniversitySubjects/SubjectFeeInformation.jsx")
);
const EditSubject = lazy(() =>
  import("./views/services/UniversitySubjects/EditSubject.jsx")
);
const EditSubjectFee = lazy(() =>
  import("./views/services/UniversitySubjects/EditSubjectFee.jsx")
);
const EditDeliveryPattern = lazy(() =>
  import("./views/services/UniversitySubjects/EditDeliveryPattern")
);
const SubjectIntake = lazy(() =>
  import("./views/services/UniversitySubjects/SubjectIntake.jsx")
);
const SubjectProfile = lazy(() =>
  import("./views/services/UniversitySubjects/SubjectProfile.js")
);

// Settings
const Settings = lazy(() => import("./views/services/Settings/Settings"));

// university subject
const UniversitySubjectList = lazy(() =>
  import("./views/services/University/Subjects/UniversitySubjectList")
);
const AddUniversitySubject = lazy(() =>
  import("./views/services/University/Subjects/AddUniversitySubject")
);
const AddUniversitySubjectFee = lazy(() =>
  import("./views/services/University/Subjects/AddUniversitySubjectFee")
);
const AddUniversitySubjectDeliveryPattern = lazy(() =>
  import(
    "./views/services/University/Subjects/AddUniversitySubjectDeliveryPattern"
  )
);
const AddUniversitySubjectRequirements = lazy(() =>
  import(
    "./views/services/University/Subjects/AddUniversitySubjectRequirements"
  )
);
const AddUniversitySubjectDocumentRequirement = lazy(() =>
  import(
    "./views/services/University/Subjects/AddUniversitySubjectDocumentRequirement"
  )
);

// copy and save university subject
const CopyUniversitySubject = lazy(() =>
  import(
    "./views/services/University/Subjects/CopySubject/CopyUniversitySubject"
  )
);
const CopyUniversitySubjectFee = lazy(() =>
  import(
    "./views/services/University/Subjects/CopySubject/CopyUniversitySubjectFee"
  )
);
const CopyUniversitySubjectDeliveryPattern = lazy(() =>
  import(
    "./views/services/University/Subjects/CopySubject/CopyUniversitySubjectDeliveryPattern"
  )
);
const CopyUniversitySubjectRequirements = lazy(() =>
  import(
    "./views/services/University/Subjects/CopySubject/CopyUniversitySubjectRequirements"
  )
);
const CopyUniversitySubjectDocumentRequirement = lazy(() =>
  import(
    "./views/services/University/Subjects/CopySubject/CopyUniversitySubjectDocumentRequirement"
  )
);

// university profile subject
const AddUniProfileSubject = lazy(() =>
  import(
    "./views/services/University/UniversityProfileSubjectAdd/AddUniProfileSubject"
  )
);
const AddUniProfileSubjectFee = lazy(() =>
  import(
    "./views/services/University/UniversityProfileSubjectAdd/AddUniProfileSubjectFee"
  )
);
const AddUniProfileSubjectDeliveryPattern = lazy(() =>
  import(
    "./views/services/University/UniversityProfileSubjectAdd/AddUniProfileSubjectDeliveryPattern"
  )
);
const AddUniProfileSubjectRequirements = lazy(() =>
  import(
    "./views/services/University/UniversityProfileSubjectAdd/AddUniProfileSubjectRequirements.js"
  )
);
const AddUniProfileSubjectDocumentRequirement = lazy(() =>
  import(
    "./views/services/University/UniversityProfileSubjectAdd/AddUniProfileSubjectDocumentRequirement"
  )
);

// country List
const AddCountry = lazy(() => import("./views/services/Country/AddCountry"));

// State List
const AddState = lazy(() => import("./views/services/State/AddState"));

// City List
const AddCity = lazy(() => import("./views/services/City/AddCity"));

// file upload
const FileUpload = lazy(() =>
  import("./views/services/UniversitySubjects/FileUpload.js")
);

// Applications
const Applications = lazy(() =>
  import("./views/services/Applications/Applications.js")
);
const ApplicationDetails = lazy(() =>
  import("./views/services/Applications/ApplicationDetails.js")
);

// const Pagination = lazy(() => import("./views/services/Pagination/Pagination.jsx"))

// const Login = lazy(() => import("./views/services/Login/Login.jsx"))

const forgotPassword = lazy(() =>
  import("./views/pages/authentication/ForgotPassword")
);
const lockScreen = lazy(() =>
  import("./views/pages/authentication/LockScreen")
);
const resetPassword = lazy(() =>
  import("./views/pages/authentication/ResetPassword")
);
const StudentRegister = lazy(() =>
  import("./views/pages/authentication/register/StudentRegister")
);
const ConsultantRegister = lazy(() =>
  import("./views/pages/authentication/register/ConsultantRegister")
);
const ProviderRegister = lazy(() =>
  import("./views/pages/authentication/register/ProviderRegister")
);
const accessControl = lazy(() =>
  import("./extensions/access-control/AccessControl")
);
const notFound = lazy(() => import("./views/pages/misc/error/404"));
const BadRequest = lazy(() => import("./views/pages/misc/error/400"));

const InternalServerError = lazy(() => import("./views/pages/misc/error/500"));

const NotAuthorized = lazy(() => import("./views/pages/misc/NotAuthorized"));

const Post = lazy(() => import("./views/services/CRUD/Post/Post"));
const Get = lazy(() => import("./views/services/CRUD/Get/Get"));
const Put = lazy(() => import("./views/services/CRUD/PUT/Put"));
const Delete = lazy(() => import("./views/services/CRUD/Delete/Delete"));
const ProviderForm = lazy(() =>
  import("./views/services/Provider/ProviderForm")
);
const AdminProviderForm = lazy(() =>
  import("./views/services/Provider/Admin/AdminProviderForm")
);
const loginForm = lazy(() => import("./views/core/auth/pages/loginForm"));
const BTRCLogin = lazy(() =>
  import("./views/pages/authentication/login/BTRCLogin.js")
);

const SessionExpired = lazy(() =>
  import("./views/pages/authentication/login/SessionExpired")
);

const AddEmployeeGeneralInfo = lazy(() =>
  import("./views/services/Configuration/Employees/AddEmployeeGeneralInfo")
);
const AddEmployeeContactInfo = lazy(() =>
  import("./views/services/Configuration/Employees/AddEmployeeContactInfo")
);
const EmployeeInformation = lazy(() =>
  import("./views/services/Configuration/Employees/EmployeeInformatio")
);
const MenuInfo = lazy(() =>
  import("./views/services/Configuration/Menu/MenuInfo")
);
const SiteSetting = lazy(() =>
  import("./views/services/Configuration/SiteSetting/SiteSetting")
);
const AddSiteSetting = lazy(() =>
  import("./views/services/Configuration/SiteSetting/AddSiteSetting")
);
const UpdateSiteSetting = lazy(() =>
  import("./views/services/Configuration/SiteSetting/UpdateSiteSetting")
);
const Country = lazy(() => import("./views/core/country/pages/index"));
const ProviderList = lazy(() =>
  import("./views/services/Provider/ProviderList")
);
const ProviderAdminList = lazy(() =>
  import("./views/services/Provider/Admin/ProviderAdminList")
);
const ProviderAdminProfile = lazy(() =>
  import("./views/services/Provider/ProviderAdminProfile")
);
const ProviderDetails = lazy(() =>
  import("./views/services/Provider/ProviderDetails")
);
const ProviderDashboard = lazy(() =>
  import("./views/services/Provider/ProviderDashboard")
);
const AssignUniversity = lazy(() =>
  import("./views/services/Provider/AssignUniversity")
);
const AssignOfficerUniversity = lazy(() =>
  import("./views/services/AdmissionOfficer/AssignOfficerUniversity")
);
const UpdateProvider = lazy(() =>
  import("./views/services/Provider/UpdateProvider")
);
const Branch = lazy(() => import("./views/services/Branches/Branch/Branch"));
const BranchManager = lazy(() =>
  import("./views/services/Branches/Manager/BranchManager")
);
const BranchManagerProfile = lazy(() =>
  import("./views/services/Branches/BranchManager/BranchManagerProfile")
);
const AddBranchManager = lazy(() =>
  import("./views/services/Branches/Manager/AddBranchManager")
);
const UpdateBranch = lazy(() =>
  import("./views/services/Branches/Branch/UpdateBranch")
);
const BranchList = lazy(() =>
  import("./views/services/Branches/Branch/BranchList")
);
const UpdateBranchManager = lazy(() =>
  import("./views/services/Branches/Manager/UpdateBranchManager")
);
const BranchProfile = lazy(() =>
  import("./views/services/Branches/Branch/BranchProfile")
);
const BranchEmployee = lazy(() =>
  import("./views/services/Branches/Employee/BranchEmployee")
);
const BranchManagerInformation = lazy(() =>
  import("./views/services/Branches/BranchManager/BranchManagerInformation")
);
const BranchTeamEmployeeInformation = lazy(() =>
  import(
    "./views/services/Branches/BranchManager/BranchTeamEmployeeInformation"
  )
);

const BranchConsultantRegistration = lazy(() =>
  import(
    "./views/services/Branches/BranchConsultant/BranchConsultantRegistration"
  )
);

// Compliance Officer
const ComplianceOfficerList = lazy(() =>
  import("./views/services/Branches/ComplianceOfficer/ComplianceOfficerList")
);
const AddComplianceOfficer = lazy(() =>
  import("./views/services/Branches/ComplianceOfficer/AddComplianceOfficer")
);
const ComplianceOfficerProfile = lazy(() =>
  import("./views/services/Branches/ComplianceOfficer/ComplianceOfficerProfile")
);

// Admission Manager

const AdmissionManager = lazy(() =>
  import("./views/services/Provider/AdmissionManager/AdmissionManager")
);
const AdmissionManagerList = lazy(() =>
  import("./views/services/Provider/AdmissionManager/AdmissionManagerList")
);
const UpdateAdmissionManager = lazy(() =>
  import("./views/services/Provider/AdmissionManager/UpdateAdmissionManager")
);

const UniversityWiseAdmissionManager = lazy(() =>
  import(
    "./views/services/Provider/AdmissionManager/UniversityWiseAdmissionManager"
  )
);

const UniversityWiseAdmissionOfficer = lazy(() =>
  import("./views/services/AdmissionOfficer/UniversityWiseAdmissionOfficer")
);

const AdmissionManagerSubjects = lazy(() =>
  import("./views/services/Provider/AdmissionManager/AdmissionManagerSubjects")
);

const AdmissionOfficerSubjects = lazy(() =>
  import("./views/services/AdmissionOfficer/AdmissionOfficerWiseSubject")
);

const AddNewAdmissionOfficerPage = lazy(() =>
  import("./views/services/AdmissionOfficer/AddNewAdmissionOfficerPage")
);

const AdmissionOfficerAssignedSubjects = lazy(() =>
  import(
    "./views/services/AdmissionOfficer/AdmissionOfficerWiseAssignedSubject"
  )
);

const AdmissionManagerAssignedSubjects = lazy(() =>
  import(
    "./views/services/Provider/AdmissionManager/AdmissionManagerWiseAssignedSubject"
  )
);

// Student

//  import StudentList from "./views/services/Students/StudentList.js";
const StudentProfile = lazy(() =>
  import("./views/services/Students/StudentProfile")
);
const PersonalInformation = lazy(() =>
  import("./views/services/Students/PersonalInformation")
);
const ContactInformation = lazy(() =>
  import("./views/services/Students/ContactInformation")
);
const ApplicationInformation = lazy(() =>
  import("./views/services/Students/ApplicationInformation")
);
const EducationalInformation = lazy(() =>
  import("./views/services/Students/EducationalInformation")
);
const AddStudentRegister = lazy(() =>
  import("./views/services/Students/StudentRegister")
);
const AddExperience = lazy(() =>
  import("./views/services/Students/Experience")
);
const AddReference = lazy(() => import("./views/services/Students/Reference"));
const AddPersonalStatement = lazy(() =>
  import("./views/services/Students/PersonalStatement")
);
const AddOtherInformation = lazy(() =>
  import("./views/services/Students/OtherInformation")
);
const AddTestScore = lazy(() => import("./views/services/Students/TestScore"));
const StudentByConsultant = lazy(() =>
  import("./views/services/Students/StudentByConsultant")
);

// Education Level

const EducationLevelList = lazy(() =>
  import("./views/services/EducationLevel/EducationLevelList")
);
// const AddEducationLevel = lazy(() => import("./views/services/EducationLevel/AddEducationLevel"))

// Degree

const DegreeList = lazy(() => import("./views/services/Degree/DegreeList"));
// const AddDegree = lazy(() => import("./views/services/Degree/AddDegree"))

// Seed Data

const SeedData = lazy(() => import("./views/services/SeedData/Index"));

// Guidelines for newcomers to the website

const GuideLine = lazy(() => import("./views/services/Guideline/GuideLine"));

const UploadDocument = lazy(() =>
  import("./views/services/Students/DocumentUpload")
);

const ExamTestType = lazy(() =>
  import("./views/services/Configuration/ExamTestType/ExamTestType")
);
const ExamTestTypeAttribute = lazy(() =>
  import("./views/services/Configuration/ExamTestType/ExamTestTypeAttribute")
);

const UpdateUniversityInformation = lazy(() =>
  import("./views/services/University/UpdateUniversityInformation")
);

const StudentType = lazy(() =>
  import("./views/services/Students/StudentType.js")
);

// country

const CountryList = lazy(() =>
  import("./views/services/Configuration/Country/Country.js")
);

// Search

const Search = lazy(() => import("./views/services/Search/Search"));

// Comission
const AccountIntake = lazy(() =>
  import("./views/services/Comission/AccountIntake/AccountIntake")
);

const ComissionGroup = lazy(() =>
  import("./views/services/Comission/CommissionGroup/ComissionGroup")
);

const CommissionPriceList = lazy(() =>
  import("./views/services/Comission/CommissionPrice/CommissionPriceList")
);

// practice

const UpdateUser = lazy(() => import("./views/Test/UpdateUser"));

// Consultant Conscent

const ConsultantConscent = lazy(() =>
  import("./views/services/Consultant/ConsultantConscent")
);
const AssociateConsent = lazy(() =>
  import("./views/services/Consultant/AssociateConsent")
);

// Student Declaration
const StudentDeclaration = lazy(() =>
  import("./views/services/Students/StudentDeclaration")
);

// Branch Employee Profile Page
const BranchEmployeeProfile = lazy(() =>
  import("./views/services/Branches/Employee/EmployeeProfile")
);

const Nationality = lazy(() =>
  import("./views/services/Nationality/Nationality")
);

const AdmissionManagerProfile = lazy(() =>
  import("./views/services/Provider/AdmissionManager/AdmissionManagerProfile")
);

const AdmissionManagerConditionalProfile = lazy(() =>
  import(
    "./views/services/Provider/AdmissionManager/AdmissionManagerConditionalProfile"
  )
);

const PromotionalCommissionList = lazy(() =>
  import(
    "./views/services/PromotionalCommission/CommissionList/PromotionalCommissionList"
  )
);

const DistributionLevelSetting = lazy(() =>
  import("./views/services/DistributionLevelSetting/Index")
);

const ApplicationTransaction = lazy(() =>
  import("./views/services/ApplicationTransaction/Index")
);
const ApplicationTransactionDetails = lazy(() =>
  import("./views/services/ApplicationTransaction/Details")
);

const InFlow = lazy(() => import("./views/services/InFlow/Index"));
const InFlowDetails = lazy(() => import("./views/services/InFlow/Details"));
const InFlowUpdate = lazy(() => import("./views/services/InFlow/Update"));

const AccountTransactionList = lazy(() =>
  import("./views/services/AccountTransaction/Index")
);

const CreateWithdrawRequest = lazy(() =>
  import("./views/services/WithdrawRequest/Create")
);
const WithdrawRequestList = lazy(() =>
  import("./views/services/WithdrawRequest/List")
);
const ExportWithdrawRequestPdf = lazy(() =>
  import("./views/services/WithdrawRequest/ExportWithdrawRequestPdf")
);

const WithdrawTransaction = lazy(() =>
  import("./views/services/WithdrawTransaction/Index")
);
const WithdrawTransactionDetails = lazy(() =>
  import("./views/services/WithdrawTransaction/Details")
);

// Comission Transaction Details
const ComissionTransactionDetails = lazy(() =>
  import("./views/services/Comission/ComissionTransactionDetails")
);

// admission officer
const AdmissionOfficerList = lazy(() =>
  import("./views/services/AdmissionOfficer/AdmissionOfficerList.js")
);
const AdmissionOfficerDetails = lazy(() =>
  import("./views/services/AdmissionOfficer/AdmissionOfficerDetails.js")
);
const AssignAdmissionOfficer = lazy(() =>
  import("./views/services/AdmissionOfficer/AssignAdmissionOfficer.js")
);
const UpdateAdmissionOfficer = lazy(() =>
  import("./views/services/AdmissionOfficer/UpdateAdmissionOfficer.js")
);
const AddAdmissionOfficer = lazy(() =>
  import("./views/services/AdmissionOfficer/AddAdmissionOfficer")
);

// Student Create Forms
const StudentApplicationForm = lazy(() =>
  import("./views/services/Students/CreateForms/StudentApplicationForm")
);

const StudentPersonalForm = lazy(() =>
  import("./views/services/Students/CreateForms/StudentPersonalForm")
);

const StudentContactForm = lazy(() =>
  import("./views/services/Students/CreateForms/StudentContactForm")
);

const StudentEducationForm = lazy(() =>
  import("./views/services/Students/CreateForms/StudentEducationForm")
);

const StudentTestScoreForm = lazy(() =>
  import("./views/services/Students/CreateForms/StudentTestScoreForm")
);

const StudentExperienceForm = lazy(() =>
  import("./views/services/Students/CreateForms/StudentExperienceForm")
);

const StudentReferenceForm = lazy(() =>
  import("./views/services/Students/CreateForms/StudentReferenceForm")
);

const StudentPersonalStatementForm = lazy(() =>
  import("./views/services/Students/CreateForms/StudentPersonalStatementForm")
);

const StudentOtherInformationForm = lazy(() =>
  import("./views/services/Students/CreateForms/StudentOtherInformationForm")
);

const StudentDeclarationForm = lazy(() =>
  import("./views/services/Students/CreateForms/StudentDeclarationForm")
);

const UniversityCommission = lazy(() =>
  import("./views/services/University/UniversityCommission")
);
const UniversityTestScore = lazy(() =>
  import("./views/services/University/UniversityTestScore")
);

// All Notification Page
const Notifications = lazy(() =>
  import("./views/services/Notifications/Notifications")
);

const TrialNotification = lazy(() => import("./views/Test/Notification"));

// MAke Student a Consultant
const ConvertStudentIntoConsultantForm = lazy(() =>
  import(
    "./views/services/ConvertStudentIntoConsultant/ConvertStudentIntoConsultantForm"
  )
);

// Login History
const LoginHistory = lazy(() => import("./views/services/LoginHistory/Index"));
const AllLoginHistory = lazy(() =>
  import("./views/services/LoginHistory/AllLoginHistory")
);

// Student Type Document
const StudentTypeDocument = lazy(() =>
  import("./views/services/StudentTypeDocument/List")
);

// const Users = lazy(() => import("./views/services/Users/Users.jsx"));

// Emon code ================>
const Users = lazy(() =>
  import("./views/services/UserManagment/UserManageMent.jsx")
);
const Siptrunk = lazy(() => import("./views/services/SipTrunks/SipTrunks.jsx"));
const Calls = lazy(() => import("./views/services/Calls/Calls.jsx"));
const CallPackeges = lazy(() =>
  import("./views/services/CallPackeges/CallPackeges.jsx")
);
const AddRole = lazy(() =>
  import("./views/services/RoleManagment/RoleManagment.jsx")
);
const AddPermission = lazy(() =>
  import("./views/services/PermissionManagement/PermissionManagement.jsx")
);

const RatePlan = lazy(() => import("./views/services/RatePlan/RatePlan.jsx"));

// Rate Plan Assignment Component Here

const RatePlanAssignment = lazy(() =>
  import("./views/services/RatePlan/RatePlanAssignment.jsx")
);

const Sales = lazy(() => import("./views/services/Sales/Sales.jsx"));

const RetailClients = lazy(() =>
  import("./views/services/RetailClients/RetailClients.jsx")
);

const Gateways = lazy(() => import("./views/services/Gateways/Gateways.jsx"));

const RoutingPlan = lazy(() =>
  import("./views/services/RoutingPlan/RoutingPlan.jsx")
);

const Registrars = lazy(() =>
  import("./views/services/Registrars/Registrars.jsx")
);

const WholeSaleClinets = lazy(() =>
  import("./views/services/WholeSaleClients/WholeSaleClients.jsx")
);

const CallShopClients = lazy(() =>
  import("./views/services/CallShopClients/CallShopClients.jsx")
);

const Distributors = lazy(() =>
  import("./views/services/Distributors/Distributors.jsx")
);

const SmsRouting = lazy(() =>
  import("./views/services/SmsRouting/SmsRouting.jsx")
);

const BtrcPortal = lazy(() =>
  import("./views/services/Dashboard/Pages/BtrcAdmin/BtrcPortal.jsx")
);

// Call Details Record Component Here

const CDR = lazy(() => import("./views/services/Reports/CDR.jsx"));

// Rates Component Here

const Rates = lazy(() => import("./views/services/Rates/Rates.jsx"));

// Rate Task Component Here

const RateTask = lazy(() => import("./views/services/Rates/RateTask.jsx"));

// Dial Plan Manager Component Here

const DialPlanManager = lazy(() =>
  import("./views/services/DialplanManager/DialplanManager.jsx")
);

// Balance Component
const Balance = lazy(() => import("./views/services/Balance/Balance.jsx"));

const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <>
        {/* services Client Routing */}
        {isAuth ? (
          <>
            <Router history={history}>
              <ToastProvider autoDismiss={true}>
                <Switch>
                  <AppRoute exact path="/" component={analyticsDashboard} />
                  {/* emon code */}

                  <AppRoute path="/siptrunk" component={Siptrunk} />

                  {/* WEBRTC */}
                  <AppRoute path="/calls" component={Calls} />
                  <AppRoute path="/callPackages" component={CallPackeges} />
                  {/* END WEBRTC */}

                  <AppRoute path="/sales" component={Sales} />
                  <AppRoute path="/ratePlan" component={RatePlan} />
                  <AppRoute
                    path="/ratePlanAssignment"
                    component={RatePlanAssignment}
                  />
                  <AppRoute path="/addRole" component={AddRole} />
                  <AppRoute path="/permissions" component={AddPermission} />
                  <AppRoute path="/rolePermission" component={RolePermission} />
                  <AppRoute path="/roleMenu" component={RoleMenu} />
                  <AppRoute path="/users" component={Users} />
                  <AppRoute path="/retailClients" component={RetailClients} />
                  <AppRoute path="/gateways" component={Gateways} />
                  <AppRoute path="/routingPlan" component={RoutingPlan} />
                  <AppRoute path="/registers" component={Registrars} />
                  <AppRoute
                    path="/wholesaleClients"
                    component={WholeSaleClinets}
                  />

                  <AppRoute
                    path="/callshopClients"
                    component={CallShopClients}
                  />

                  <AppRoute path="/distributors" component={Distributors} />

                  <AppRoute path="/smsRouting" component={SmsRouting} />

                  <AppRoute path="/CDRs" component={CDR} />

                  <AppRoute path="/rates" component={Rates} />

                  <AppRoute path="/rateTask" component={RateTask} />

                  <AppRoute
                    path="/dialplanManager"
                    component={DialPlanManager}
                  />

                  <AppRoute path="/balance" component={Balance} />

                  <AppRoute
                    exact
                    path="/admissionManagerList"
                    component={AdmissionManagerList}
                  />
                  <AppRoute
                    path="/updateAdmissionManager/:id/:id2"
                    component={UpdateAdmissionManager}
                  />
                  <AppRoute
                    path="/universityAdmissionManagers/:universityId"
                    component={UniversityWiseAdmissionManager}
                  />
                  <AppRoute
                    path="/universityAdmissionOfficers/:universityId"
                    component={UniversityWiseAdmissionOfficer}
                  />
                  <AppRoute
                    path="/updateAdmissionOfficer/:officerId/:id"
                    component={UpdateAdmissionOfficer}
                  />
                  <AppRoute
                    path="/addAdmissionOfficer/:providerId"
                    component={AddAdmissionOfficer}
                  />
                  <AppRoute
                    path="/admissionManagerSubjects/:managerId/:universityId"
                    component={AdmissionManagerSubjects}
                  />
                  <AppRoute
                    path="/admissionOfficerSubjects/:managerId/:universityId"
                    component={AdmissionOfficerSubjects}
                  />
                  <AppRoute
                    path="/admissionOfficerAssignedSubjects/:officerId"
                    component={AdmissionOfficerAssignedSubjects}
                  />
                  <AppRoute
                    path="/admissionManagerAssignedSubjects/:managerId"
                    component={AdmissionManagerAssignedSubjects}
                  />
                  <AppRoute
                    path="/addAdmissionOfficer"
                    component={AddNewAdmissionOfficerPage}
                  />
                  {/* admission officer */}
                  <AppRoute
                    path="/admissionOfficerList"
                    component={AdmissionOfficerList}
                  />
                  <AppRoute
                    path="/admissionOfficerListFromAdmissionManagerList/:providerId/:managerId"
                    component={AdmissionOfficerList}
                  />
                  <AppRoute
                    path="/admissionOfficerDetails/:officerId"
                    component={AdmissionOfficerDetails}
                  />
                  <AppRoute path="/staffType" component={EmployeeType} />
                  <AppRoute
                    path="/staffListByType/:type"
                    component={EmployeeList}
                  />
                  <AppRoute exact path="/staffList" component={EmployeeList} />
                  <AppRoute
                    path="/staffProfile/:id"
                    component={EmployeeProfile}
                  />
                  <AppRoute
                    path="/universityTypes"
                    component={AddUniversityType}
                  />
                  <AppRoute
                    path="/universityCountry"
                    component={AddUniversityCountry}
                  />
                  <AppRoute
                    path="/universityState"
                    component={AddUniversityState}
                  />
                  <AppRoute
                    path="/addUniversity/:univerId?"
                    component={AddUniversity}
                  />
                  <AppRoute
                    path="/addProviderUniversity/:providerProfileId/:univerId?"
                    component={AddProviderUniversity}
                  />
                  <AppRoute
                    path="/addUniversityApplicationDocument/:univerId"
                    component={AddUniversityApplicationDocument}
                  />
                  <AppRoute
                    path="/addProviderUniversityApplicationDocument/:providerProfileId/:univerId"
                    component={AddProviderUniversityApplicationDocument}
                  />
                  <AppRoute
                    path="/addUniversityTemplateDocument/:univerId"
                    component={AddUniversityTemplateDocument}
                  />
                  <AppRoute
                    path="/addProviderUniversityTemplateDocument/:providerProfileId/:univerId"
                    component={AddProviderUniversityTemplateDocument}
                  />
                  <AppRoute
                    path="/addProviderUniversityCommission/:providerProfileId/:univerId"
                    component={AddProviderUniversityCommission}
                  />
                  {/* end code emon */}
                  {/* intake */}
                  <AppRoute path="/intake" component={Intake} />
                  <AppRoute path="/addNewIntakes" component={AddNewIntakes} />
                  <AppRoute path="/updateIntake/:id" component={UpdateIntake} />
                  {/* university create form */}
                  <AppRoute
                    path="/createUniversity"
                    component={UniversityForm}
                  />
                  <AppRoute
                    path="/createUniversityCampus/:univerId"
                    component={UniversityCampusForm}
                  />
                  <AppRoute
                    path="/createUniversityFinancial/:univerId"
                    component={UniversityFinancialForm}
                  />
                  <AppRoute
                    path="/createUniversityFeatures/:univerId"
                    component={UniversityFeaturesForm}
                  />
                  <AppRoute
                    path="/createUniversityTestScore/:univerId"
                    component={UniversityTestScoreForm}
                  />
                  <AppRoute
                    path="/createUniversityApplicationDocument/:univerId"
                    component={UniversityApplicationDocumentForm}
                  />
                  <AppRoute
                    path="/createUniversityTemplateDocument/:univerId"
                    component={UniversityTemplateDocumentForm}
                  />
                  <AppRoute
                    path="/createUniversityCommission/:univerId"
                    component={UniversityCommissionForm}
                  />
                  {/* Country */}
                  <AppRoute path="/country" component={AddCountry} />
                  {/* State */}
                  <AppRoute path="/state" component={AddState} />
                  {/* State also path not implemented yet */}
                  <AppRoute path="/city" component={AddCity} />
                  {/* consultant */}
                  <AppRoute path="/consultantList" component={ConsultantList} />
                  <AppRoute
                    path="/consultantProfile/:id"
                    component={ConsultantProfile}
                  />
                  <AppRoute
                    path="/associateProfile/:id"
                    component={AssociateProfile}
                  />
                  <AppRoute
                    exact
                    path="/call-page-webrtc"
                    component={CallWebrtc}
                  />
                  <AppRoute
                    exact
                    path="/contatc-page-webrtc"
                    component={ContactsWebrtc}
                  />
                  <AppRoute path="/addConsultant" component={AddConsultant} />
                  <AppRoute path="/addAssociate" component={AddAssociate} />
                  {/* Branch consultant */}
                  <AppRoute
                    path="/addBranchConsultant/:branchId"
                    component={BranchConsultantRegistration}
                  />
                  {/* Report */}
                  <AppRoute path="/agentReport" component={AgentReport} />
                  {/* permission not added */}
                  <AppRoute
                    path="/consultantType"
                    component={AddConsultantType}
                  />
                  <AppRoute
                    path="/consultantBankDetails/:consultantRegisterId"
                    component={BankDetails}
                  />
                  <AppRoute
                    path="/associateBankDetails/:consultantRegisterId"
                    component={UpdateAssociateBankDetails}
                  />
                  <AppRoute
                    path="/consultantCommission/:consultantRegisterId"
                    component={ConsultantCommission}
                  />
                  <AppRoute
                    path="/associateCommission/:consultantRegisterId"
                    component={UpdateAssociateCommission}
                  />
                  {userTypeId === userTypes.ComplianceManager ? (
                    <AppRoute
                      path="/consultantInformation/:consultantRegisterId"
                      component={AddConsultantInformation}
                    />
                  ) : (
                    <AppRoute
                      path="/consultantInformation/:consultantRegisterId"
                      component={AddConsultantInformation}
                    />
                  )}
                  <AppRoute
                    path="/associateInformation/:consultantRegisterId"
                    component={AssociateInformation}
                  />
                  <AppRoute path="/associates/:id" component={AssociateList} />
                  <AppRoute path="/associateList" component={AssociateList} />
                  <AppRoute
                    path="/associateAddSuccess"
                    component={AssociateAddSuccess}
                  />
                  <AppRoute
                    path="/addUniversityCampus/:univerId"
                    component={AddUniversityCampus}
                  />
                  <AppRoute
                    path="/addProviderUniversityCampus/:providerProfileId/:univerId"
                    component={AddProviderUniversityCampus}
                  />
                  <AppRoute
                    path="/addUniversityFinancial/:univerId"
                    component={AddUniversityFinancial}
                  />
                  <AppRoute
                    path="/addProviderUniversityFinancial/:providerProfileId/:univerId"
                    component={AddProviderUniversityFinancial}
                  />
                  <AppRoute
                    path="/addUniversityFeatures/:univerId"
                    component={AddUniversityFeatures}
                  />
                  <AppRoute
                    path="/addProviderUniversityFeatures/:providerProfileId/:univerId"
                    component={AddProviderUniversityFeatures}
                  />
                  <AppRoute
                    path="/addUniversityGallery/:univerId"
                    component={AddUniversityGallery}
                  />
                  <AppRoute
                    path="/addProviderUniversityGallery/:providerProfileId/:univerId"
                    component={AddProviderUniversityGallery}
                  />
                  <AppRoute path="/universityList" component={UniversityList} />
                  <AppRoute
                    path="/universityListFromAddUniversityCountry/:counId"
                    component={UniversityList}
                  />
                  <AppRoute
                    path="/universityListFromUniversityTypes/:univerTypeId"
                    component={UniversityList}
                  />
                  <AppRoute
                    path="/universityListFromProviderList/:provideId"
                    component={UniversityList}
                  />
                  <AppRoute
                    path="/universityDetails/:id"
                    component={UniversityDetails}
                  />
                  <AppRoute path="/campusList/:uniId?" component={CampusList} />
                  <AppRoute
                    path="/campusSubjectList/:camId"
                    component={CampusSubjectList}
                  />
                  <AppRoute
                    path="/campusDetails/:id"
                    component={CampusDetails}
                  />
                  <AppRoute
                    path="/assignMultipleSubject/:id"
                    component={AssignMultipleSubject}
                  />
                  {/* University Subject starts here */}
                  <AppRoute
                    path="/universitySubjectList/:id"
                    component={UniversitySubjectList}
                  />
                  <AppRoute
                    path="/addUniversitySubject/:id/:subjId?"
                    component={AddUniversitySubject}
                  />
                  <AppRoute
                    path="/addUniversitySubjectFee/:id/:subjId"
                    component={AddUniversitySubjectFee}
                  />
                  <AppRoute
                    path="/addUniversitySubjectDeliveryPattern/:id/:subjId"
                    component={AddUniversitySubjectDeliveryPattern}
                  />
                  <AppRoute
                    path="/addUniversitySubjectRequirements/:id/:subjId"
                    component={AddUniversitySubjectRequirements}
                  />
                  <AppRoute
                    path="/addUniversitySubjectDocumentRequirement/:id/:subjId"
                    component={AddUniversitySubjectDocumentRequirement}
                  />
                  {/* copy and add university subject */}
                  <AppRoute
                    path="/copyAndAddUniversitySubject/:id/:subjId/:newSubId?"
                    component={CopyUniversitySubject}
                  />
                  <AppRoute
                    path="/copyAndAddUniversitySubjectFee/:id/:subjId/:newSubId"
                    component={CopyUniversitySubjectFee}
                  />
                  <AppRoute
                    path="/copyAndAddUniversitySubjectDeliveryPattern/:id/:subjId/:newSubId"
                    component={CopyUniversitySubjectDeliveryPattern}
                  />
                  <AppRoute
                    path="/copyAndAddUniversitySubjectRequirements/:id/:subjId/:newSubId"
                    component={CopyUniversitySubjectRequirements}
                  />
                  <AppRoute
                    path="/copyAndAddUniversitySubjectDocumentRequirement/:id/:subjId/:newSubId"
                    component={CopyUniversitySubjectDocumentRequirement}
                  />
                  {/* University Subject ends here */}
                  {/* university profile subject add starts here */}
                  <AppRoute
                    path="/addUniProfileSubject/:id/:subjId?"
                    component={AddUniProfileSubject}
                  />
                  <AppRoute
                    path="/addUniProfileSubjectFee/:id/:subjId"
                    component={AddUniProfileSubjectFee}
                  />
                  <AppRoute
                    path="/addUniProfileSubjectDeliveryPattern/:id/:subjId"
                    component={AddUniProfileSubjectDeliveryPattern}
                  />
                  <AppRoute
                    path="/addUniProfileSubjectRequirements/:id/:subjId"
                    component={AddUniProfileSubjectRequirements}
                  />
                  <AppRoute
                    path="/addUniProfileSubjectDocumentRequirement/:id/:subjId"
                    component={AddUniProfileSubjectDocumentRequirement}
                  />
                  {/* university profile subject add ends here */}
                  <AppRoute path="/documentlist" component={DocumentList} />
                  <AppRoute
                    path="/documentCategoryList"
                    component={DocumentCategoryList}
                  />
                  <AppRoute
                    path="/subjectDocumentGroup"
                    component={DocumentGroup}
                  />
                  {/* Student type document group path */}
                  <AppRoute
                    path="/studentTypeDocumentGroup"
                    component={StudentTypeDocument}
                  />
                  <AppRoute path="/department" component={AddDepartment} />
                  <AppRoute
                    path="/subDepartment"
                    component={AddSubDepartment}
                  />
                  <AppRoute path="/programLevel" component={AddProgramLevel} />
                  <AppRoute
                    path="/addSubDepartment"
                    component={AddSubDepartment}
                  />
                  <AppRoute path="/programLevel" component={AddProgramLevel} />
                  <AppRoute path="/addSubject/:id?" component={Subject} />
                  <AppRoute path="/subjectList" component={SubjectList} />
                  <AppRoute path="/editSubject/:id" component={EditSubject} />
                  <AppRoute
                    path="/addSubjectFee/:id"
                    component={AddSubjectFee}
                  />
                  <AppRoute
                    path="/addSubjectDeliveryPattern/:id"
                    component={AddSubjectDeliveryPattern}
                  />
                  <AppRoute
                    path="/addSubjectDocumentRequirement/:id"
                    component={AddSubjectDocumentRequirement}
                  />
                  <AppRoute
                    path="/editSubjectDocumentRequirement/:id"
                    component={EditSubjectDocumentRequirement}
                  />
                  <AppRoute
                    path="/addSubjectRequirements/:id"
                    component={AddSubjectRequirements}
                  />
                  <AppRoute
                    path="/EditSubjectRequirements/:id"
                    component={EditSubjectRequirements}
                  />
                  <AppRoute
                    path="/EditSubjectFee/:subId"
                    component={EditSubjectFee}
                  />
                  <AppRoute
                    path="/editDeliveryPattern/:id"
                    component={EditDeliveryPattern}
                  />
                  <AppRoute
                    path="/subjectFeeInfo"
                    component={SubjectFeeInformation}
                  />
                  <AppRoute
                    path="/subjectIntake/:camId/:subbId"
                    component={SubjectIntake}
                  />
                  <AppRoute
                    path="/subjectProfile/:subjId"
                    component={SubjectProfile}
                  />
                  {/* Applications */}
                  <AppRoute path="/applications" component={Applications} />
                  <AppRoute
                    path="/applicationsByStatus/:status/:selector"
                    component={Applications}
                  />
                  <AppRoute
                    path="/applicationsFromConsultant/:consultantId"
                    component={Applications}
                  />
                  <AppRoute
                    path="/applicationsFromUniversity/:universityId"
                    component={Applications}
                  />
                  <AppRoute
                    path="/applicationDetails/:id/:stdId"
                    component={ApplicationDetails}
                  />
                  <AppRoute path="/providerForm" component={ProviderForm} />
                  <AppRoute
                    path="/adminProviderForm/:adminProviderHiddenId"
                    component={AdminProviderForm}
                  />
                  <AppRoute
                    path="/addStaffGeneralInfo"
                    component={AddEmployeeGeneralInfo}
                  />
                  <AppRoute
                    path="/addStaffContactInfo/:employeeId?"
                    component={AddEmployeeContactInfo}
                  />
                  <AppRoute
                    path="/staffGeneralInfo/:id"
                    component={EmployeeGeneralInfo}
                  />
                  <AppRoute
                    path="/staffContactInfo/:id"
                    component={EmployeeContactInfo}
                  />
                  <AppRoute
                    path="/editDepartment/:id"
                    component={EditDepartment}
                  />
                  <AppRoute
                    path="/editSubDepartment/:id"
                    component={EditSubDepartment}
                  />
                  <AppRoute path="/providerList" component={ProviderList} />
                  <AppRoute
                    path="/providerAdminList"
                    component={ProviderAdminList}
                  />
                  <AppRoute
                    path="/providerAdminProfile/:providerAdminId"
                    component={ProviderAdminProfile}
                  />
                  <AppRoute
                    path="/providerDetails/:id"
                    component={ProviderDetails}
                  />
                  <AppRoute
                    path="/providerDashboard/:id"
                    component={ProviderDashboard}
                  />
                  <AppRoute
                    path="/consultantDashboard/:consultantId"
                    component={ConsultantDashboard}
                  />
                  <AppRoute
                    path="/assignUniversity/:providerId/:managerId"
                    component={AssignUniversity}
                  />
                  <AppRoute
                    path="/assignOfficerUniversity/:providerId/:managerId"
                    component={AssignOfficerUniversity}
                  />
                  <AppRoute
                    path="/updateProvider/:id"
                    component={UpdateProvider}
                  />
                  <AppRoute
                    path="/branchInformation/:branchId?"
                    component={Branch}
                  />
                  <AppRoute
                    path="/addBranchManager/:branchId"
                    component={BranchManager}
                  />
                  <AppRoute
                    path="/branchManager/:branchId"
                    component={AddBranchManager}
                  />
                  <AppRoute
                    path="/branchManagerProfile/:branchManagerId"
                    component={BranchManagerProfile}
                  />
                  <AppRoute
                    path="/branchEmployeeInformation/:branchId/:employeeId?"
                    component={BranchEmployee}
                  />
                  <AppRoute path="/branchList" component={BranchList} />
                  <AppRoute
                    path="/branchProfile/:id"
                    component={BranchProfile}
                  />
                  <AppRoute
                    path="/updateBranchManagerInformation/:branchId/:managerId"
                    component={BranchManagerInformation}
                  />
                  <AppRoute
                    path="/teamEmployee/:branchId/:teamId"
                    component={BranchTeamEmployeeInformation}
                  />
                  {/*  */}
                  {/* compliance officer */}
                  <AppRoute
                    path="/complianceOfficerList"
                    component={ComplianceOfficerList}
                  />
                  <AppRoute
                    path="/complianceOfficerInformation/:complianceOfficerId?"
                    component={AddComplianceOfficer}
                  />
                  <AppRoute
                    path="/complianceOfficerProfile/:complianceOfficerId"
                    component={ComplianceOfficerProfile}
                  />
                  <AppRoute path="/studentList" component={StudentList} />
                  <AppRoute
                    path="/studentListByType/:type"
                    component={StudentList}
                  />
                  <AppRoute
                    path="/studentListByConsultant/:cId"
                    component={StudentList}
                  />
                  <AppRoute
                    path="/studentProfile/:sId"
                    component={StudentProfile}
                  />
                  <AppRoute
                    path="/addStudentInformation/:applicationStudentId/:update?"
                    component={PersonalInformation}
                  />
                  <AppRoute
                    path="/addStudentContactInformation/:applicationStudentId/:update?"
                    component={ContactInformation}
                  />
                  <AppRoute
                    path="/addStudentApplicationInformation/:applicationStudentId/:update?"
                    component={ApplicationInformation}
                  />
                  <AppRoute
                    path="/addStudentEducationalInformation/:applicationStudentId/:update?"
                    component={EducationalInformation}
                  />
                  <AppRoute
                    path="/addStudentRegister"
                    component={AddStudentRegister}
                  />
                  <AppRoute
                    path="/addExperience/:applicationStudentId/:update?"
                    component={AddExperience}
                  />
                  <AppRoute
                    path="/addReference/:applicationStudentId/:update?"
                    component={AddReference}
                  />
                  <AppRoute
                    path="/addPersonalStatement/:applicationStudentId/:update?"
                    component={AddPersonalStatement}
                  />
                  <AppRoute
                    path="/addOtherInformation/:applicationStudentId/:update?"
                    component={AddOtherInformation}
                  />
                  <AppRoute
                    path="/addTestScore/:applicationStudentId/:update?"
                    component={AddTestScore}
                  />
                  <AppRoute
                    path="/studentByConsultant/:id"
                    component={StudentByConsultant}
                  />
                  <AppRoute
                    path="/uploadDocument/:applicationStudentId?/:update?"
                    component={UploadDocument}
                  />
                  {/* Education Level paths */}
                  <AppRoute
                    path="/educationalLevelList"
                    component={EducationLevelList}
                  />
                  {/* Degree Paths */}
                  <AppRoute path="/degreeList" component={DegreeList} />
                  <AppRoute path="/examTestType" component={ExamTestType} />
                  <AppRoute
                    path="/updateUniversityInformation/:id"
                    component={UpdateUniversityInformation}
                  />
                  <AppRoute path="/studentTypeList" component={StudentType} />
                  <AppRoute path="/countryList" component={CountryList} />
                  {/* Comission paths */}
                  <AppRoute
                    path="/accountIntakeList"
                    component={AccountIntake}
                  />
                  <AppRoute
                    path="/commissionGroupList"
                    component={ComissionGroup}
                  />
                  <AppRoute
                    path="/commissionPriceList/:id"
                    component={CommissionPriceList}
                  />
                  {/* Consultant Conscent Path */}
                  <AppRoute
                    path="/consultantConscent/:consultantRegisterId"
                    component={ConsultantConscent}
                  />
                  <AppRoute
                    path="/associateConsent/:consultantRegisterId"
                    component={AssociateConsent}
                  />
                  {/* Student Declaration Path */}
                  <AppRoute
                    path="/studentDeclaration/:applicationStudentId/:update?"
                    component={StudentDeclaration}
                  />
                  {/* Branch Employee Profile path */}
                  <AppRoute
                    path="/branchEmployeeProfile/:branchId/:employeeId"
                    component={BranchEmployeeProfile}
                  />
                  {/* nationality path */}
                  <AppRoute path="/nationality" component={Nationality} />
                  <AppRoute
                    path="/providerAdmissionManager/:managerId/:providerId"
                    component={AdmissionManagerProfile}
                  />
                  <AppRoute
                    path="/admissionManagerProfile/:managerId"
                    component={AdmissionManagerConditionalProfile}
                  />
                  <AppRoute
                    path="/promotionalCommissionList"
                    component={PromotionalCommissionList}
                  />
                  <AppRoute
                    path="/distributionLevelSetting"
                    component={DistributionLevelSetting}
                  />
                  <AppRoute
                    path="/applicationTransaction"
                    component={ApplicationTransaction}
                  />
                  <AppRoute
                    path="/applicationTransactionFromConsultant/:consultantId"
                    component={ApplicationTransaction}
                  />
                  <AppRoute
                    path="/applicationTransactionDetails/:id"
                    component={ApplicationTransactionDetails}
                  />
                  <AppRoute path="/inFlowTransaction" component={InFlow} />
                  <AppRoute
                    path="/inFlow/details/:id"
                    component={InFlowDetails}
                  />
                  <AppRoute
                    path="/inFlow/Update/:id"
                    component={InFlowUpdate}
                  />
                  <AppRoute
                    path="/accountTransaction"
                    component={AccountTransactionList}
                  />
                  <AppRoute
                    path="/accountTransactionByConsultant/:consultantId"
                    component={AccountTransactionList}
                  />
                  <AppRoute
                    path="/createWithdrawRequest"
                    component={CreateWithdrawRequest}
                  />
                  <AppRoute
                    path="/withdrawRequestList"
                    component={WithdrawRequestList}
                  />
                  <AppRoute
                    path="/withdrawTransaction"
                    component={WithdrawTransaction}
                  />
                  <AppRoute
                    path="/withdrawTransactionByConsultant/:consultantId"
                    component={WithdrawTransaction}
                  />
                  <AppRoute
                    path="/withdrawTransactionDetails/:id"
                    component={WithdrawTransactionDetails}
                  />
                  {/* commission transaction details  */}
                  <AppRoute
                    path="/commissionTransactionDetails/:id"
                    component={ComissionTransactionDetails}
                  />
                  <AppRoute
                    path="/exportPDF"
                    component={ExportWithdrawRequestPdf}
                  />
                  {/* Student Create Form Paths */}
                  <AppRoute
                    path="/studentApplication/:id"
                    component={StudentApplicationForm}
                  />
                  <AppRoute
                    path="/studentPersonal/:id"
                    component={StudentPersonalForm}
                  />
                  <AppRoute
                    path="/studentContact/:id"
                    component={StudentContactForm}
                  />
                  <AppRoute
                    path="/studentEducation/:id"
                    component={StudentEducationForm}
                  />
                  <AppRoute
                    path="/studentTestScore/:id"
                    component={StudentTestScoreForm}
                  />
                  <AppRoute
                    path="/studentExperience/:id"
                    component={StudentExperienceForm}
                  />
                  <AppRoute
                    path="/studentReference/:id"
                    component={StudentReferenceForm}
                  />
                  <AppRoute
                    path="/studentPersonalStatement/:idVal"
                    component={StudentPersonalStatementForm}
                  />
                  <AppRoute
                    path="/studentOtherInformation/:idVal"
                    component={StudentOtherInformationForm}
                  />
                  <AppRoute
                    path="/studentDeclarations/:idVal"
                    component={StudentDeclarationForm}
                  />
                  <AppRoute
                    path="/addUniversityCommission/:univerId"
                    component={UniversityCommission}
                  />
                  <AppRoute
                    path="/addUniversityTestScore/:univerId"
                    component={UniversityTestScore}
                  />
                  <AppRoute
                    path="/addProviderUniversityTestScore/:providerProfileId/:univerId"
                    component={AddProviderUniversityTestScore}
                  />
                  {/* login history path */}
                  <AppRoute path="/loginHistory" component={LoginHistory} />
                  <AppRoute
                    path="/allUsersLoginHistory"
                    component={AllLoginHistory}
                  />
                  {/* common profile path */}
                  {/* Account Settings Path */}
                  <AppRoute
                    path="/accountSettings/:userId"
                    component={Settings}
                  />
                  <AppRoute path="/search" component={Search} />
                  {/* Seed Data path */}
                  <AppRoute path="/seedData" component={SeedData} />
                  {/* All Notifications Path */}
                  <AppRoute
                    path="/allNotifications"
                    component={Notifications}
                  />
                  {/* guideline path */}
                  <AppRoute path="/guideLines" component={GuideLine} />
                  <AppRoute path="/500" component={InternalServerError} />
                  <AppRoute path="/notAuthorized" component={NotAuthorized} />
                  {/* make student a consultant path */}
                  <AppRoute
                    path="/becomeConsultant/:studentId"
                    component={ConvertStudentIntoConsultantForm}
                  />
                  {/* trial notification */}
                  <AppRoute
                    path="/notification"
                    component={TrialNotification}
                  />
                  <AppRoute path="/400" component={BadRequest} fullLayout />
                  {/* Session Expired  */}
                  <AppRoute component={notFound} fullLayout />
                </Switch>
              </ToastProvider>
            </Router>
          </>
        ) : (
          <>
            <Router history={history}>
              <ToastProvider autoDismiss={true}>
                <Switch>
                  <AppRoute exact path="/" component={BTRCLogin} fullLayout />

                  <AppRoute
                    path="/studentRegister"
                    component={StudentRegister}
                    fullLayout
                  />
                  <AppRoute
                    path="/consultantRegister"
                    component={ConsultantRegister}
                    fullLayout
                  />
                  <AppRoute
                    path="/providerRegister"
                    component={ProviderRegister}
                    fullLayout
                  />

                  <AppRoute
                    path="/pages/forgot-password"
                    component={forgotPassword}
                    fullLayout
                  />
                  <AppRoute
                    path="/pages/lock-screen"
                    component={lockScreen}
                    fullLayout
                  />
                  <AppRoute
                    path="/pages/reset-password"
                    component={resetPassword}
                    fullLayout
                  />

                  <AppRoute
                    path="*"
                    exact
                    component={() => <Redirect to="/" />}
                  />
                </Switch>
              </ToastProvider>
            </Router>
          </>
        )}
      </>
    );
  }
}

export default AppRouter;
