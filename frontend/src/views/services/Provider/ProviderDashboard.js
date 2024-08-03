import React, { useEffect, useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import { Drawer } from "antd";
import plusicon from "../../../assets/img/plusicon.svg";
import Vectorbeat from "../../../assets/img/Vectorbeat.svg";
import gift from "../../../assets/img/gift.PNG";
import cuser1 from "../../../assets/img/cuser1.svg";
import user from "../../../assets/img/Uapp_fav.png";
import get from "../../../helpers/get";
import { rootUrl } from "../../../constants/constants";
import { useHistory, useParams } from "react-router-dom";

const ProviderDashboard = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState({});
  const [applications, setApplications] = useState([]);
  const [managers, setManagers] = useState([]);
  const history = useHistory();
  const [intake, setIntake] = useState({});
  const { id } = useParams();

  // useEffect(()=>{

  //   get(`ProviderAdminDashboard/ProviderCounting/${id}`)
  //   .then(res => {
  //     setCount(res);
  //   })

  //   get(`ProviderAdminDashboard/ProviderApplication/${id}`)
  //   .then(res => {
  //     setApplications(res);
  //   })

  //   get(`ProviderAdminDashboard/ProviderManagers/${id}`)
  //   .then(res => {
  //     setManagers(res);
  //   })

  //   get(`AccountIntake/GetCurrentAccountIntake`)
  //   .then(res =>{
  //     setIntake(res);
  //   })

  // },[])

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap">
        <div>
          <span className="std-dashboard-style1">
            Hello, {currentUser?.displayName}!
          </span>
          <br />
          <span className="std-dashboard-style2">
            Here's what's happening with your store today.
          </span>
        </div>

        <div className="d-flex flex-wrap">
          <div className="mt-2 mr-4">
            <span style={{ fontWeight: "500" }}>
              Intake: {intake?.intakeName}
            </span>
          </div>

          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/createUniversity`);
            }}
          >
            <div className="std-dashboard-style4"></div>

            <div className="std-dashboard-style5">
              <img src={plusicon} className="img-fluid dashbard-img-style1" />
              <span className="std-dashboard-style3">Add University</span>
            </div>
          </div>

          <div style={{ cursor: "pointer" }}>
            <div className="std-dashboard-style6" onClick={showDrawer}></div>

            <div onClick={function noRefCheck() {}}>
              <img
                src={Vectorbeat}
                className="img-fluid dashbard-img-style2"
                onClick={showDrawer}
              />

              <Drawer placement="right" onClose={onClose} open={open}>
                <div className="">
                  <div>
                    <Card>
                      <CardBody>
                        <span className="consultant-news-feed-style">
                          NOTICE
                        </span>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <div className="">
                          <div className="notice-image-stylemb-2">
                            <span className="notice-user-name">
                              Super Admin
                            </span>
                          </div>
                          <div className="mt-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              University of Suffolk admissions open for
                              September 2022 intake.
                              <br />
                              <span
                                style={{
                                  textDecoration: "underline",
                                  textDecorationColor: "#878A99",
                                  cursor: "pointer",
                                }}
                              >
                                View
                              </span>
                            </span>
                          </div>

                          <div className="mt-2">
                            <span className="notice-time-style">
                              02:14 PM 19/07/22
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <div>
                          <div className="notice-image-stylemb-2">
                            <span className="notice-user-name">
                              Super Admin
                            </span>
                          </div>
                          <div className="mt-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              University of Suffolk admissions open for
                              September 2022 intake.
                              <br />
                              <span
                                style={{
                                  textDecoration: "underline",
                                  textDecorationColor: "#878A99",
                                  cursor: "pointer",
                                }}
                              >
                                View
                              </span>
                            </span>
                          </div>

                          <div className="mt-2">
                            <span className="notice-time-style">
                              02:14 PM 19/07/22
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  <Card>
                    <CardBody>
                      <div>
                        <img src={gift} className="img-fluid" />
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      </div>

      {/* Status reports start */}

      <div className="row">
        <div className="col-md-2 mb-3">
          <div
            className="count-card counter-h-112"
            style={{ border: "0.5px solid #24A1CD" }}
          >
            <span className="pvdadmin-span-style1">Total Application</span>

            <span
              className="pvdadmin-span-style2"
              style={{ color: "#24A1CD", cursor: "pointer" }}
            >
              {count?.totalApplication}
            </span>
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <div
            className="count-card counter-h-112"
            style={{ border: "0.5px solid #23CCB5" }}
          >
            <span className="pvdadmin-span-style1">
              Applications In Process
            </span>

            <span
              className="pvdadmin-span-style2"
              style={{ color: "#23CCB5", cursor: "pointer" }}
            >
              {count?.totalApplicationInProgress}
            </span>
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <div
            className="count-card counter-h-112"
            style={{ border: "0.5px solid #AE75F8" }}
          >
            <span className="pvdadmin-span-style1">Unconditional Offer</span>

            <span
              className="pvdadmin-span-style2"
              style={{ color: "#AE75F8", cursor: "pointer" }}
            >
              {count?.totalUnconditionalOffer}
            </span>
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <div
            className="count-card counter-h-112"
            style={{ border: "0.5px solid #F87675" }}
          >
            <span className="pvdadmin-span-style1">Total Registered</span>

            <span
              className="pvdadmin-span-style2"
              style={{ color: "#F87675", cursor: "pointer" }}
            >
              {count?.totalRegistered}
            </span>
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <div
            className="count-card counter-h-112"
            style={{ border: "0.5px solid #F7BD12" }}
          >
            <span className="pvdadmin-span-style1">Rejected / Cancelled</span>

            <span
              className="pvdadmin-span-style2"
              style={{ color: "#F7BD12", cursor: "pointer" }}
            >
              {count?.totalRejected}
            </span>
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <div
            className="count-card counter-h-112"
            style={{ border: "0.5px solid #707070" }}
          >
            <span className="pvdadmin-span-style1">Withdrawn Application</span>

            <span
              className="pvdadmin-span-style2"
              style={{ color: "#707070", cursor: "pointer" }}
            >
              {count?.totalWithdrawn}
            </span>
          </div>
        </div>
      </div>

      {/* status reports end */}

      {/* table start */}

      <div>
        <Card>
          <CardBody>
            <span className="app-style-const">New Applications</span>

            {applications?.length > 0 ? (
              <div style={{ height: "300px", overflowY: "scroll" }}>
                <Table borderless responsive className="mt-3">
                  <thead style={{ backgroundColor: "#EEF3F4" }}>
                    <tr>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>University</th>
                      <th>Admission Manager</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications?.map((app, i) => (
                      <tr key={i}>
                        <td className="cursor-pointer hyperlink-hover">
                          <span
                            onClick={() => {
                              history.push(
                                `/applicationDetails/${app?.id}/${app?.studentId}`
                              );
                            }}
                          >
                            {app?.student?.studentViewId}
                          </span>
                        </td>
                        <td>
                          <div>
                            <img
                              src={
                                app?.student?.profileImage?.thumbnailUrl == null
                                  ? user
                                  : rootUrl +
                                    app?.student?.profileImage?.thumbnailUrl
                              }
                              style={{
                                height: "28px",
                                width: "28px",
                                borderRadius: "50%",
                              }}
                              className="img-fluid"
                            />
                            <span style={{ marginLeft: "5px" }}>
                              {app?.student?.nameTittle?.name}
                              {""}
                              {app?.student?.firstName} {app?.student?.lastName}
                            </span>
                          </div>
                        </td>
                        <td>{app?.universityName}</td>
                        <td>{app?.managerName}</td>
                        <td>{handleDate(app?.applicationDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <p style={{ textAlign: "center", fontWeight: "700" }}>
                No Application
              </p>
            )}
          </CardBody>
        </Card>
      </div>
      <div>
        <Card>
          <CardBody>
            <span className="app-style-const">Admission Manager List</span>

            {managers?.length > 0 ? (
              <div style={{ height: "300px", overflowY: "scroll" }}>
                <Table borderless responsive className="mt-3">
                  <thead style={{ backgroundColor: "#EEF3F4" }}>
                    <tr>
                      <th>Admission Manager ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managers?.map((man, i) => (
                      <tr key={i}>
                        <td>{man?.uappId}</td>
                        <td>
                          <div>
                            <img
                              src={
                                man?.imageUrl == null
                                  ? user
                                  : rootUrl + man?.imageUrl
                              }
                              style={{
                                height: "28px",
                                width: "28px",
                                borderRadius: "50%",
                              }}
                              className="img-fluid"
                            />
                            <span style={{ marginLeft: "5px" }}>
                              {man?.nameTittle} {man?.fullName}
                            </span>
                          </div>
                        </td>
                        <td>{man?.email}</td>
                        <td>{man?.applicationCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <p style={{ textAlign: "center", fontWeight: "700" }}>
                No Admission Manager
              </p>
            )}
          </CardBody>
        </Card>
      </div>

      {/* table end */}
    </React.Fragment>
  );
};

export default ProviderDashboard;
