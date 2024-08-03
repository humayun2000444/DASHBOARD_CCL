import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Table,
} from "reactstrap";
import { permissionList } from "../../../constants/AuthorizationConstant";
import get from "../../../helpers/get";
import ButtonForFunction from "../Components/ButtonForFunction";

const UniversityWiseAdmissionOfficer = () => {
  const history = useHistory();
  const { universityId } = useParams();
  const [officer, setOFficer] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // useEffect(()=>{
  //     get(`AdmissionOfficer/GetByUniversity/${universityId}`)
  //     .then(res => {

  //         setOFficer(res);
  //     })

  // },[])

  const backToDashboard = () => {
    history.push("/universityList");
  };

  const gotoProfile = (data) => {
    history.push(`/admissionOfficerDetails/${data?.admissionOfficerId}`);
  };

  const goToSubjectsList = (data) => {
    history.push(
      `/admissionOfficerSubjects/${data?.admissionOfficerId}/${universityId}`
    );
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Assigned Admission Officers </h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to University
              List
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table id="table-to-xls" className="table-sm table-bordered">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  <th>SL/NO</th>
                  <th>Name</th>

                  <th>Requirement Type</th>

                  {permissions?.includes(
                    permissionList.View_Admissionmanager_Subject_list
                  ) ? (
                    <th>Subject</th>
                  ) : null}
                  {/* {
                        permissions?.includes(permissionList.View_Admission_manager_info) ? */}
                  <th>Action</th>
                  {/* :
                        null
                       } */}
                </tr>
              </thead>
              <tbody>
                {officer?.map((ad, i) => (
                  <tr key={ad?.id} style={{ textAlign: "center" }}>
                    <th scope="row">{1 + i}</th>

                    <td>
                      {ad?.admissionOfficer?.firstName}{" "}
                      {ad?.admissionOfficer?.lastName}
                    </td>

                    <td>
                      {ad?.isAcceptEU_UK ? "EU_UK, " : null}
                      {ad?.isAcceptHome ? "Home, " : null}
                      {ad?.isAcceptInternational ? "International" : null}
                    </td>
                    {permissions?.includes(
                      permissionList.View_Admissionofficer_Subject_list
                    ) ? (
                      <td>
                        <span
                          className="badge badge-secondary"
                          style={{ cursor: "pointer" }}
                          onClick={() => goToSubjectsList(ad)}
                        >
                          View
                        </span>
                      </td>
                    ) : null}

                    <td style={{ width: "8%" }} className="text-center">
                      <ButtonGroup variant="text">
                        {permissions?.includes(
                          permissionList.View_Admissionofficer_info
                        ) ? (
                          <ButtonForFunction
                            func={() => gotoProfile(ad)}
                            color={"primary"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-eye"></i>}
                            permission={6}
                          />
                        ) : null}
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UniversityWiseAdmissionOfficer;
