import React, { useEffect, useState } from "react";
import { Paper, Typography, IconButton, Box } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import { Card, CardBody, Table } from "reactstrap";

import "../../../../../assets/scss/pages/dashboard-analytics.scss";

import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import ReactECharts from "echarts-for-react";

import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import { Col, Row } from "react-bootstrap";

import axios from "axios";

const UserDashBoard = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([40, 20, 20]);
  const [Labels, setLabels] = useState([
    "Total",
    "In single Chats",
    "In Group Chats",
  ]);
  const [count, setCount] = useState({});
  const [applications, setApplications] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const history = useHistory();

  const orderName = [
    { label: "Order", value: 1 },
    { label: "Order 2", value: 2 },
    { label: "Order 3", value: 3 },
    // Add more orders as needed
  ];
  const [intake, setIntake] = useState({});

  const [selectedOrder, setSelectedOrder] = useState({
    label: "Select Country ",
    value: "Country..",
  });

  // useEffect(() => {
  //   get(`SystemAdminDashboard/Counting`).then((res) => {
  //     setCount(res);
  //   });

  //   get(`SystemAdminDashboard/Application`).then((res) => {
  //     setApplications(res);
  //   });

  //   get(`SystemAdminDashboard/GetTransactions`).then((res) => {
  //     setConsultants(res);
  //   });

  //   get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
  //     setIntake(res);
  //   });
  // }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const selectOrder = (label, value) => {
    setSelectedOrder({ label, value });
  };

  const data = [
    { time: "12:15:00", Success: 10, Failed: 9 },
    { time: "12:30:00", Success: 10, Failed: 2 },
    { time: "12:45:00", Success: 5, Failed: 15 },
    { time: "13:00:00", Success: 0, Failed: 0 },
    { time: "13:15:00", Success: 1, Failed: 0 },
    { time: "13:30:00", Success: 0, Failed: 0 },
    { time: "13:45:00", Success: 8, Failed: 0 },
    { time: "14:00:00", Success: 0, Failed: 0 },
    { time: "14:15:00", Success: 0, Failed: 0 },
    { time: "14:30:00", Success: 0, Failed: 0 },
  ];
  const option = {
    title: {
      text: "Calls",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Failed", "Success"],
      right: 10,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "12:15:00",
        "12:30:00",
        "12:45:00",
        "13:00:00",
        "13:15:00",
        "13:30:00",
        "13:45:00",
        "14:00:00",
        "14:15:00",
        "14:30:00",
      ],
    },
    yAxis: {
      type: "value",
      min: -1,
    },
    series: [
      {
        name: "Failed",
        type: "line",
        stack: "Total",
        data: [9, 7, 15, 0, 0, 9, 4, 1, 2, 9],
        itemStyle: {
          color: "red",
        },
      },
      {
        name: "Success",
        type: "line",
        stack: "Total",
        data: [10, 12, 5, 22, 1, 4, 6, 3, 19, 7],
        itemStyle: {
          color: "green",
        },
      },
    ],
  };

  // Statistics
  const chartData = {
    series: [
      {
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 123, 89, 60, 30, 20, 10, 5],
      },
    ],
    options: {
      chart: {
        type: "area",
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: "smooth",
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        type: "datetime",
        categories: Array.from(
          { length: 16 },
          (_, i) => `2023-07-01T${i}:00:00`
        ),
      },
    },
  };

  const [systemInfo, setSystemInfo] = useState({
    disk: undefined,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://103.95.96.98:4000/systeminfo");
        setSystemInfo(response.data);
      } catch (error) {
        console.error("Error fetching system information:", error);
      }
    };

    fetchData();
  }, []);

  const metrics = [
    { title: "Balance", value: systemInfo.cpu?.usage || "Loading..." },
    { title: "Total Calls", value: systemInfo.memory?.usage || "Loading..." },
    { title: "Miss Called", value: systemInfo.disk?.usage || "Loading..." },
  ];

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap">
        <div>
          <span className="std-dashboard-style1">
            {/* Hello, {currentUser?.displayName}! */}
          </span>
        </div>
      </div>

      {/* Status */}

      <Card>
        <CardBody>
          <h2 className="mb-4">User Dashboard</h2>
          <div className="row">
            <div className="col-md-3 mb-3">
              <div className="count-card count-primary counter-h-112 bg-gray shadow border-0">
                <div className="count-card-title">Total Users</div>
                <div
                  className="count-card-value"
                  onClick={() => {
                    history.push(`/applications`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {count?.totalApplication}
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="count-card count-primary counter-h-112 bg-gray shadow border-0">
                <span className="pvdadmin-span-style1">Online Users</span>

                <span
                  className="pvdadmin-span-style2"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/applicationsByStatus/${2}/${1}`);
                  }}
                >
                  {count?.totalApplicationInProgress}
                </span>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div
                className="count-card counter-h-112 bg-gray shadow border-0"
                style={{ border: "0.5px solid #AE75F8" }}
              >
                <span className="pvdadmin-span-style1">Lives Call</span>

                <span
                  className="pvdadmin-span-style2"
                  style={{ color: "#AE75F8", cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/applicationsByStatus/${2}/${2}`);
                  }}
                >
                  {count?.totalUnconditionalOffer}
                </span>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div
                className="count-card counter-h-112 bg-gray shadow border-0"
                style={{ border: "0.5px solid #F7BD12 " }}
              >
                <span className="pvdadmin-span-style1">
                  Live Out / In Calls
                </span>

                <span
                  className="pvdadmin-span-style2"
                  style={{ color: "#F7BD12", cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/applicationsByStatus/${2}/${3}`);
                  }}
                >
                  {count?.totalRegistered}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <div>
        <Card>
          <CardBody>
            <Row>
              {metrics.map((metric, index) => (
                <Col md={4} key={index} style={{ marginBottom: "20px" }}>
                  <Paper style={{ padding: "20px", position: "relative" }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6">{metric.title}</Typography>
                      {metric.extraIcons && (
                        <Box>
                          <IconButton size="small">
                            <FullscreenIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small">
                            <RefreshIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                    <Typography variant="h3" style={{ margin: "10px 0" }}>
                      {metric.value}
                    </Typography>
                    <ReactApexChart
                      options={chartData.options}
                      series={chartData.series}
                      type="area"
                      height={80}
                    />
                  </Paper>
                </Col>
              ))}
            </Row>
            <ReactECharts
              option={option}
              style={{ height: 400, width: "100%" }}
            />
          </CardBody>
        </Card>
      </div>

      <section>
        <Card>
          <CardBody>
            <p style={{ textAlign: "center", fontWeight: "700" }}>Total</p>
          </CardBody>
        </Card>
      </section>
      {/* message section */}

      {/* call section */}
      <section className="row">
        <div className="col-md-12">
          <Card>
            <CardBody>
              {/* call by types */}
              <div className="border-bottom">
                <h4>Calls by Types</h4>
              </div>
              <div className="row mt-3" style={{ fontSize: "18px" }}>
                <div className="col-md-4  border-right">
                  <div className="d-flex justify-content-around">
                    {" "}
                    <div>
                      <p className="mb-1">0.0</p>
                      <p>Internal calls</p>
                    </div>
                    <div>
                      <p className="mb-1">0.0</p>
                      <p>Duration (min)</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 border-right">
                  <div className="d-flex justify-content-around">
                    {" "}
                    <div>
                      <p className="mb-1">0.0</p>
                      <p>Out calls</p>
                    </div>
                    <div>
                      <p className="mb-1">0.0</p>
                      <p>Duration (min)</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-around">
                    {" "}
                    <div>
                      <p className="mb-1">0.0</p>
                      <p>In calls</p>
                    </div>
                    <div>
                      <p className="mb-1">0.0</p>
                      <p>Duration (min)</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <Card>
                <CardBody>
                  <div className="row my-4">
                    <div className="col-md-3">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="custom-conslt-div1"></div>
                          <p
                            style={{
                              fontWeight: "500",
                              position: "relative",
                              top: "4px",
                            }}
                          >
                            Total
                          </p>
                        </div>

                        <div>
                          <span style={{ position: "relative", top: "4px" }}>
                            40
                          </span>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="custom-conslt-div2"></div>
                          <p
                            style={{
                              fontWeight: "500",
                              position: "relative",
                              top: "4px",
                            }}
                          >
                            In Single Chats{" "}
                          </p>
                        </div>

                        <div>
                          <span style={{ position: "relative", top: "4px" }}>
                            20
                          </span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="custom-conslt-div4"></div>
                          <p
                            style={{
                              fontWeight: "500",
                              position: "relative",
                              top: "4px",
                            }}
                          >
                            In Group Chats
                          </p>
                        </div>

                        <div>
                          <span style={{ position: "relative", top: "4px" }}>
                            20
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <Chart
                        options={options}
                        series={series}
                        type="donut"
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                </CardBody>
              </Card> */}
            </CardBody>
          </Card>
        </div>
      </section>

      {/* consultant transaction list table end */}
    </React.Fragment>
  );
};

export default UserDashBoard;
