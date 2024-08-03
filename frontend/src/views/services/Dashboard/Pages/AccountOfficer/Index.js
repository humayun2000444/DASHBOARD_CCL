import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
import { useHistory } from "react-router-dom";
import user1 from "../../../../../assets/img/user1.svg";
import user2 from "../../../../../assets/img/user2.svg";
import capture from "../../../../../assets/img/capture.PNG";
import images1 from "../../../../../assets/img/images1.svg";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";
import { Drawer } from "antd";
import plusicon from "../../../../../assets/img/plusicon.svg";
import Vectorbeat from "../../../../../assets/img/Vectorbeat.svg";
import gift from "../../../../../assets/img/gift.PNG";
import cuser1 from "../../../../../assets/img/cuser1.svg";
import user from "../../../../../assets/img/Uapp_fav.png";
import down from "../../../../../assets/img/down.svg";
import camera2 from "../../../../../assets/img/camera2.svg";
import downloadBtn from "../../../../../assets/img/downloadBtn.svg";
import Assets from "../../../../../assets/img/Asset 12Icon.svg";
import eyeBtn from "../../../../../assets/img/eyeBtn.svg";
import Chart from "react-apexcharts";
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
import ReactToPrint from "react-to-print";
import * as Icon from "react-feather";

const AccountOfficer = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState({});
  const [applications, setApplications] = useState([]);
  const componentRef2 = useRef();
  const history = useHistory();
  const [intake, setIntake] = useState({});

  // useEffect(()=>{

  //   get(`AccountOfficerDashboard/Counting`)
  //   .then(res => {
  //     setCount(res);
  //   })

  //   get(`AccountOfficerDashboard/WithdrawRequest`)
  //   .then(res => {
  //     setApplications(res);
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
              Intake Range: {intake?.intakeName}
            </span>
          </div>

          <div style={{ cursor: "pointer" }}>
            <div className="std-dashboard-style6"></div>

            <div onClick={function noRefCheck() {}}>
              <img
                src={Vectorbeat}
                className="img-fluid dashbard-img-style2"
                onClick={showDrawer}
              />

              <Drawer placement="right" onClose={onClose} open={open}>
                <div className="">
                  <Card>
                    <CardBody>
                      <span className="consultant-news-feed-style">
                        NEWS FEED
                      </span>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <div>
                        <div className="d-flex">
                          <div className="notice-image-style">
                            <img src={user1} />
                          </div>
                          <div className="ml-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              We're delighted to introduce you to our new
                              "Become an Education Consultant...
                              <br />
                              <span
                                style={{
                                  textDecoration: "underline",
                                  textDecorationColor: "#878A99",
                                  cursor: "pointer",
                                }}
                              >
                                read more
                              </span>
                            </span>

                            <br />
                            <span className="notice-time-style">
                              02:14 PM Today
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <div>
                        <div className="d-flex">
                          <div className="notice-image-style">
                            <img src={user2} />
                          </div>
                          <div className="ml-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              We're delighted to introduce you
                            </span>
                            <br />
                            <img src={capture} className="img-fluid" />
                            <br />
                            <span className="notice-time-style">
                              02:14 PM Today
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <div>
                        <div className="d-flex">
                          <div className="notice-image-style">
                            <img src={user2} />
                          </div>
                          <div className="ml-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              We're delighted to introduce you
                            </span>
                            <br />
                            <div className="d-flex justify-content-around my-2">
                              <img src={images1} className="img-fluid" />
                              <img src={images1} className="img-fluid" />
                              <img src={images1} className="img-fluid" />
                            </div>

                            <span className="notice-time-style">
                              02:14 PM Today
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

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
            style={{ border: "0.5px solid #24A1CD" }}
            className="count-card counter-h-112"
          >
            <span className="pvdadmin-span-style1">Total Application</span>

            <span
              className="pvdadmin-span-style2"
              onClick={() => history.push(`/applications`)}
              style={{ color: "#24A1CD", cursor: "pointer" }}
            >
              {count?.totalApplication}
            </span>
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <div
            style={{ border: "0.5px solid #F87675" }}
            className="count-card counter-h-112"
          >
            <span className="pvdadmin-span-style1">
              Applications In Process
            </span>

            <span
              className="pvdadmin-span-style2"
              onClick={() => {
                history.push(`/applicationsByStatus/${2}/${1}`);
              }}
              style={{ color: "#F87675", cursor: "pointer" }}
            >
              {count?.totalApplicationInProgress}
            </span>
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <div
            style={{ border: "0.5px solid #23CCB5" }}
            className="count-card counter-h-112"
          >
            <span className="pvdadmin-span-style1">Unconditional Offer</span>

            <span
              className="pvdadmin-span-style2"
              onClick={() => {
                history.push(`/applicationsByStatus/${2}/${2}`);
              }}
              style={{ color: "#23CCB5", cursor: "pointer" }}
            >
              {count?.totalUnconditionalOffer}
            </span>
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <div
            style={{ border: "0.5px solid #AE75F8" }}
            className="count-card counter-h-112"
          >
            <span className="pvdadmin-span-style1">Total Registered</span>

            <span
              className="pvdadmin-span-style2"
              onClick={() => {
                history.push(`/applicationsByStatus/${2}/${3}`);
              }}
              style={{ color: "#AE75F8", cursor: "pointer" }}
            >
              {count?.totalRegistered}
            </span>
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <div
            style={{ border: "0.5px solid #F7BD12" }}
            className="count-card counter-h-112"
          >
            <span className="pvdadmin-span-style1">Rejected / Cancelled</span>

            <span
              onClick={() => {
                history.push(`/applicationsbyStatus/${5}/${1}`);
              }}
              className="pvdadmin-span-style2"
              style={{ color: "#F7BD12", cursor: "pointer" }}
            >
              {count?.totalRejected}
            </span>
          </div>
        </div>

        <div className="col-md-2 mb-3">
          <div
            style={{ border: "0.5px solid #707070" }}
            className="count-card counter-h-112"
          >
            <span className="pvdadmin-span-style1">Withdrawn Application</span>

            <span
              onClick={() => {
                history.push(`/applicationsbyStatus/${4}/${3}`);
              }}
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
            <span className="app-style-const">Withdrawal Requests</span>

            {applications?.length > 0 ? (
              <div style={{ height: "300px", overflowY: "scroll" }}>
                <Table borderless responsive className="mt-3">
                  <thead style={{ backgroundColor: "#EEF3F4" }}>
                    <tr>
                      <th>
                        <span>Request Date</span>
                      </th>
                      <th>
                        <span>Agent</span>
                      </th>
                      <th>Transaction Code</th>
                      <th>
                        <span>Amount</span>
                      </th>

                      <th>
                        <span>Payment type</span>
                      </th>

                      <th>Payment Date</th>

                      <th>Payment Status</th>
                      <th>
                        <span>Invoice</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {applications?.map((app, i) => (
                      <tr key={i}>
                        <td>{app?.transactionDate}</td>
                        <td>
                          <div>
                            <img
                              src={
                                app?.imageUrl == null
                                  ? user
                                  : rootUrl + app?.imageUrl
                              }
                              style={{
                                height: "28px",
                                width: "28px",
                                borderRadius: "50%",
                              }}
                              className="img-fluid"
                            />
                            <span style={{ marginLeft: "5px" }}>
                              {app?.consultantName}
                            </span>
                          </div>
                        </td>
                        <td>{app?.transactionCode}</td>
                        <td>{app?.amount}</td>

                        <td>{app?.paymentType}</td>

                        <td>{app?.paymentDate}</td>
                        <td>{app?.paymentStatus}</td>

                        <td>
                          <ReactToPrint
                            trigger={() => (
                              <img
                                src={downloadBtn}
                                className="img-fluid"
                                style={{ cursor: "pointer" }}
                              />
                            )}
                            content={() => componentRef2.current}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <p style={{ textAlign: "center", fontWeight: "700" }}>
                No Withdrawal Requests
              </p>
            )}
          </CardBody>
        </Card>
      </div>

      {/* table end */}

      {/* invoice pdf start */}

      <div style={{ display: "none" }}>
        <div ref={componentRef2} style={{ marginTop: "100px" }}>
          <div className="invoice-winthdraw-request-style">
            <img height={100} src={Assets} />
            <h1>Remittance Advice</h1>
          </div>

          <div style={{ marginTop: "100px" }}>
            <hr />
          </div>

          <div style={{ marginTop: "100px" }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <div>
                  <span>
                    <Icon.PhoneCall color="#164677" />
                  </span>
                  <span
                    style={{ marginLeft: "10px" }}
                    className="inv-span-styles"
                  >
                    +442072658478
                  </span>
                </div>
                <div>
                  <span>
                    <Icon.Search color="#164677" />
                  </span>
                  <span
                    style={{ marginLeft: "10px" }}
                    className="inv-span-styles"
                  >
                    finance@uapp.uk
                  </span>
                </div>
                <div>
                  <span>
                    <Icon.Map color="#164677" />
                  </span>
                  <span
                    style={{ marginLeft: "10px" }}
                    className="inv-span-styles"
                  >
                    80-82 Nelson Street London E1 2DY
                  </span>
                </div>
                <div>
                  <span className="inv-span-styles">TC Date 24/11/2022</span>
                </div>
                <div>
                  <span className="inv-span-styles">TC ID 332</span>
                </div>
              </div>

              <div>
                <div>
                  <div>
                    <span className="inv-span-styles">
                      Consultant Name : Mirela-Gabriela
                    </span>
                  </div>
                  <div>
                    <span className="inv-span-styles">Porcisteanu</span>
                  </div>
                  <div>
                    <span className="inv-span-styles">
                      Consultant ID : AG009
                    </span>
                  </div>
                  <div>
                    <span className="inv-span-styles">Reference No :</span>
                  </div>
                  <div>
                    <span className="inv-span-styles">Date : 24/11/2022</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{ marginTop: "100px", width: "80%", marginLeft: "100px" }}
          >
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">Quantity</span>
                  </th>
                  <th style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">Description</span>
                  </th>
                  <th style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">Line Total</span>
                  </th>
                </tr>
              </thead>

              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <td style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">1</span>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">TC-W317</span>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">200.00</span>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderBottom: "1px solid black",
                      borderLeft: "1px solid black",
                    }}
                  >
                    <span></span>
                  </td>
                  <td style={{ borderBottom: "1px solid black" }}>
                    <span className="inv-span-styles">SubTotal</span>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">200.00</span>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderBottom: "1px solid black",
                      borderLeft: "1px solid black",
                    }}
                  >
                    <span></span>
                  </td>
                  <td style={{ borderBottom: "1px solid black" }}>
                    <span className="inv-span-styles">Deductions</span>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">0</span>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderBottom: "1px solid black",
                      borderLeft: "1px solid black",
                    }}
                  >
                    <span></span>
                  </td>
                  <td style={{ borderBottom: "1px solid black" }}>
                    <span className="inv-span-styles">Total</span>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">£ 200.00</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "100px", marginLeft: "100px" }}>
            <div>
              <span style={{ color: "#164677" }} className="inv-span-styles">
                Bank Details
              </span>
            </div>
            <div>
              <span className="inv-span-styles">
                Account Name : M G PORCISTEANU
              </span>
            </div>
            <div>
              <span className="inv-span-styles">Account Number : 31882007</span>
            </div>
            <div>
              <span className="inv-span-styles">Short code : 402310</span>
            </div>
            <div>
              <span className="inv-span-styles">Bank Name : HSBC</span>
            </div>
          </div>

          <div style={{ marginTop: "100px", textAlign: "center" }}>
            <span className="inv-span-styles">
              Thank you for your business.
            </span>
          </div>
        </div>
      </div>

      {/* invoice pdf end */}
    </React.Fragment>
  );
};

export default AccountOfficer;
