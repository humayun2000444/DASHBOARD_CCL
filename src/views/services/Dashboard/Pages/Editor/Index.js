import React, { useEffect, useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
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
import down from "../../../../../assets/img/down.svg";
import camera2 from "../../../../../assets/img/camera2.svg";
import Chart from "react-apexcharts";
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
import { useHistory } from "react-router-dom";

const Editor = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([20, 20, 20, 20, 20]);
  const [Labels, setLabels] = useState(["A", "B", "C", "D", "E"]);
  const [count, setCount] = useState({});
  const [universities, setUniversities] = useState([]);
  const history = useHistory();
  const [intake, setIntake] = useState({});

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   get(`EditorDashboard/Counting`).then((res) => {
  //     setCount(res);

  //   });

  //   get(`EditorDashboard/University`).then((res) => {
  //     setUniversities(res);

  //   });

  //   get(`AccountIntake/GetCurrentAccountIntake`)
  //   .then(res =>{
  //     setIntake(res);
  //   })
  // }, []);

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
              Intake Range: {intake?.intakeName}
            </span>
          </div>

          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/createUniversity");
            }}
          >
            <div className="std-dashboard-style4"></div>

            <div className="std-dashboard-style5">
              <img
                src={plusicon}
                alt=""
                className="img-fluid dashbard-img-style1"
              />
              <span className="std-dashboard-style3">Add University</span>
            </div>
          </div>

          <div style={{ cursor: "pointer" }}>
            <div className="std-dashboard-style6" onClick={showDrawer}></div>

            <div onClick={function noRefCheck() {}}>
              <img
                src={Vectorbeat}
                className="img-fluid dashbard-img-style2"
                alt=""
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
                            <img src={user1} alt="" />
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
                            <img src={user2} alt="" />
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
                            <img src={capture} alt="" className="img-fluid" />
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
                            <img src={user2} alt="" />
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
                              <img src={images1} alt="" className="img-fluid" />
                              <img src={images1} alt="" className="img-fluid" />
                              <img src={images1} alt="" className="img-fluid" />
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
                        <img src={gift} alt="" className="img-fluid" />
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

      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <div
            className="count-card counter-h-112"
            style={{ border: "0.5px solid #24A1CD" }}
          >
            <span className="pvdadmin-span-style1">Total University</span>

            <span className="pvdadmin-span-style2" style={{ color: "#24A1CD" }}>
              {count?.universityCount}
            </span>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div
            className="count-card counter-h-112"
            style={{ border: "0.5px solid #23CCB5" }}
          >
            <span className="pvdadmin-span-style1">Total Subjects</span>

            <span className="pvdadmin-span-style2" style={{ color: "#23CCB5" }}>
              {count?.subjectCount}
            </span>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div
            style={{ border: "0.5px solid #AE75F8" }}
            className="count-card counter-h-112"
          >
            <span className="pvdadmin-span-style1">Total Providers</span>

            <span className="pvdadmin-span-style2" style={{ color: "#AE75F8" }}>
              {count?.providerCount}
            </span>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div
            style={{ border: "0.5px solid #F7BD12 " }}
            className="count-card counter-h-112"
          >
            <span className="pvdadmin-span-style1">Total Students</span>

            <span className="pvdadmin-span-style2" style={{ color: "#F7BD12" }}>
              {count?.studentCount}
            </span>
          </div>
        </div>
      </div>

      {/* status reports end */}

      {/* table start */}

      <div>
        <Card>
          <CardBody>
            <span className="app-style-const">Recent Added Universities</span>

            {universities?.length > 0 ? (
              <div style={{ height: "300px", overflowY: "scroll" }}>
                <Table borderless responsive className="mt-3">
                  <thead style={{ backgroundColor: "#EEF3F4" }}>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Country</th>
                      <th>State</th>
                      <th>Provider</th>
                    </tr>
                  </thead>

                  <tbody>
                    {universities?.map((uni) => (
                      <tr>
                        <td>
                          <div>
                            <img
                              src={rootUrl + uni?.imageUrl}
                              style={{
                                height: "28px",
                                width: "28px",
                                borderRadius: "50%",
                              }}
                              alt=""
                              className="img-fluid"
                            />
                            <span style={{ marginLeft: "5px" }}>
                              {uni?.name}
                            </span>
                          </div>
                        </td>
                        <td>{uni?.typeName}</td>
                        <td>{uni?.countryName}</td>
                        <td>{uni?.stateName}</td>
                        <td>{uni?.providerName}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <p style={{ textAlign: "center", fontWeight: "700" }}>
                No University
              </p>
            )}
          </CardBody>
        </Card>
      </div>

      {/* table end */}
    </React.Fragment>
  );
};

export default Editor;
