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

  const goToAnotherPage = (metric) => {
    if (metric?.title === "Total Calls") {
      history.push("/CDRs");
    } else if (metric?.title === "Balance") {
      history.push("/balance");
    }
  };

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
        </CardBody>
      </Card>
      <div>
        <Card>
          <CardBody>
            <Row>
              {metrics.map((metric, index) => (
                <Col
                  md={4}
                  key={index}
                  style={{ marginBottom: "20px" }}
                  onClick={() => goToAnotherPage(metric)}
                >
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
    </React.Fragment>
  );
};

export default UserDashBoard;
