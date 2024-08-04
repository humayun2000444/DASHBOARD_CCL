import { combineReducers } from "redux";
import chatReducer from "./chat/";
import customizer from "./customizer/";
import auth from "./auth/";

// import { country } from "../reducers/core/country/country";
// import { designation } from "../reducers/core/designation/designation";
// import { companyBranch } from "../reducers/company/companyBranch/companyBranch";
// import { companyContactInformation } from "../reducers/company/companyContactInformation/companyContactInformation";
// import { companyInformation } from "../reducers/company/companyInformation/companyInformation";
// import { noticeForEmployee } from "../reducers/notice/noticeForEmployee/noticeForEmployee";
// import { noticeItem } from "../reducers/notice/noticeItem/noticeItem";

// import { city } from "../reducers/core/city/city";
// import { state } from "../reducers/core/state/state";
// import { application } from "../reducers/recruitments/application/application";
// import { jobCircular } from "../reducers/recruitments/jobCircular/jobCircular";
// import { client } from "../reducers/clients/client/client";
// import { clientType } from "../reducers/clients/clientType/clientType";
// import { commentDataReducer } from "./services/DemoReducers";
// import { postDataReducer } from "./services/DemoReducers";
// import { todoDataReducer } from "./services/DemoReducers";
// import { roleDataReducer } from "./services/RoleReducer";
// import { parentMenuItemReducer } from "./services/MenuReducers";

// import { permissionsDataReducer } from "./services/PermissionsReducer";
// import { employeeTypeDataReducer } from "./services/Employees/EmployeesTypeReducers";
// import { employeeProfileDataReducer } from "./services/Employees/EmployeeProfileReducers";
// import { universityTypeDataReducer } from "./services/UniversityTypeReducer";
// import { universityListReducer } from "./services/UniversityListReducer";
// import { universityCampusListReducer } from "./services/UniversityCampusListReducer";
// import { universityCountryDataReducer } from "./services/UniversityCountryReducer";
// import { universityProviderDataReducer } from "./services/Provider/UniversityProviderReducer";
// import { GeneralProviderlogoFile } from "./services/Provider/ProviderLogoFileReducer";
// import { universityStateDataReducer } from "./services/UniversityStateReducer";

// // UniversitySubject
// import { departmentDataReducer } from "./services/UniversitySubject/DepartmentReducer";
// import { subDepartmentDataReducer } from "./services/UniversitySubject/SubDepartmentReducer";
// import { programLevelDataReducer } from "./services/UniversitySubject/ProgramLevelReducer";

// import { UniversityLogoImageReducer } from "./services/UniversityLogoImageReducer";
// import { UniversityCoverImageReducer } from "./services/UniversityCoverImageReducer";
// import { UniversityGalleryImageReducer } from "./services/UniversityGalleryImageReducer";
// import { employeeProfileImageReducer } from "./services/Employees/EmployeeImageReducers";
// import { employeeCoverDataReducer } from "./services/Employees/EmployeeCoverReducers";
// import { SightSettingLogoDataReducer } from "./services/SiteSetting/SiteSettingLogoImageReducer";
// import { SightSettingCoverIconReducer } from "./services/SiteSetting/SiteSettingCoverIconReducer";

// import { ManagerImageReducer } from "./services/Branch/ManagerImageReducer";
// import { BranchEmployeeProfileImageReducer } from "./services/Branch/EmployeeProfileImageReducer";
// import { BranchEmployeeCoverImageReducer } from "./services/Branch/EmployeeCoverImageReducer";

// import { ConsultantFileReducer } from "./services/Consultant/ConsultantFileReducer";

// import { StudentProfileImageReducer } from "./services/Students/StudentsProfileImageReducer";

const rootReducer = combineReducers({
  chatApp: chatReducer,
  customizer: customizer,
  auth: auth,

  // country,
  // designation,
  // companyBranch,
  // companyContactInformation,
  // companyInformation,
  // noticeForEmployee,
  // noticeItem,
  // city,
  // state,
  // application,
  // jobCircular,
  // client,
  // clientType,

  // // services Reducers
  // commentDataReducer,
  // postDataReducer,
  // todoDataReducer,

  // roleDataReducer,
  // permissionsDataReducer,
  // parentMenuItemReducer,

  // employeeTypeDataReducer,
  // employeeProfileDataReducer,
  // universityTypeDataReducer,
  // universityListReducer,
  // universityCampusListReducer,
  // universityCountryDataReducer,
  // universityProviderDataReducer,
  // universityStateDataReducer,

  // // UniversitySubject
  // departmentDataReducer,
  // subDepartmentDataReducer,
  // programLevelDataReducer,

  // // University Logo Image
  // UniversityLogoImageReducer,

  // // University Gallery Image
  // UniversityGalleryImageReducer,

  // // University Cover Image
  // UniversityCoverImageReducer,

  // // Employee Profile Image
  // employeeProfileImageReducer,

  // // Employee Cover Image
  // employeeCoverDataReducer,

  // SightSettingLogoDataReducer,

  // SightSettingCoverIconReducer,

  // Branch Manager Image
  // ManagerImageReducer,

  // Branch Employee Images
  // BranchEmployeeProfileImageReducer,
  // BranchEmployeeCoverImageReducer,

  // Consultant

  // ConsultantFileReducer,

  //  Student profile image reducer
  // StudentProfileImageReducer,

  // General Provider Logo
  // GeneralProviderlogoFile,
});

export default rootReducer;
