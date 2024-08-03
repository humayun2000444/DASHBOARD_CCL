import React from 'react';
import { userTypes } from '../../../constants/userTypeConstant';
import AdmissionOfficerNewDetails from '../AdmissionOfficer/AdmissionOfficerNewDetails';
import BranchManagerNewProfile from '../Branches/BranchManager/BranchManagerNewProfile';
import ComplianceOfficerNewProfile from '../Branches/ComplianceOfficer/ComplianceOfficerNewProfile';
import EmployeeNewProfile from '../Configuration/Employees/EmployeeNewProfile';
import ConsultantNewProfile from '../Consultant/ConsultantNewProfile';
import AdmissionManagerNewProfile from '../Provider/AdmissionManager/AdmissionManagerNewProfile';
import ProviderAdminNewProfile from '../Provider/ProviderAdminNewProfile';
import StudentNewProfile from '../Students/StudentNewProfile';


const CommonProfile = () => {

    const currentUser  = localStorage.getItem('userType');

    return (

      <>

    

    {
      currentUser == userTypes?.AdmissionManager && 

      <AdmissionManagerNewProfile/>
     
      }

   

    {
      currentUser == userTypes?.BranchManager && 

      <BranchManagerNewProfile/>
      
      }

    {
      currentUser == userTypes?.Student && 

      <StudentNewProfile/>
      
      
      }

      {
        (currentUser == userTypes?.AccountManager || currentUser == userTypes?.Editor || currentUser == userTypes?.AccountOfficer || currentUser == userTypes?.ComplianceManager ||
            currentUser == userTypes?.FinanceManager) &&
            <EmployeeNewProfile/>
      }

   

    {
      currentUser == userTypes?.ProviderAdmin && 
      <ProviderAdminNewProfile/>
     
      }

    {
      currentUser == userTypes?.AdmissionOfficer && 
      <AdmissionOfficerNewDetails/>
     
      }

    {
      currentUser == userTypes?.Consultant && 
        <ConsultantNewProfile/>
      } 

    {
      currentUser == userTypes?.ComplianceOfficer && 
        <ComplianceOfficerNewProfile/>
      } 


      
      </>
    );
};

export default CommonProfile;