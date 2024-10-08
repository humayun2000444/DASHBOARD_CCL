import React, { useState, useEffect } from "react";
import AccountDetails from "../UserDashBoard/AccountDetails";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import CallSummaryChart from "../UserDashBoard/CallSummaryChart";
import DashboardBalance from "../UserDashBoard/DashboardBalance";
import DashboardCallStatus from "../UserDashBoard/DashboardCallStatus";
import DashboardCdrTable from "../UserDashBoard/DashboardCdrTable";
import LiveCalls from "../UserDashBoard/LiveCalls";
import PBXOverview from "../UserDashBoard/PBXOverview";
import FilterTabs from "../../../../../components/core/filter/FilterTabs";
import NewCallSummaryChart from "./NewCallSummaryChart";

  const SuperAdmin = () => {
  const [selectedFilter, setSelectedFilter] = useState("Last 1 hour"); // Default filter

  // Function to handle filter change from FilterTabs
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

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
        const response = await axios.get(
          "http://iptsp.cosmocom.net:4000/systeminfo"
        );
        setSystemInfo(response.data);
      } catch (error) {
        console.error("Error fetching system information:", error);
      }
    };

    fetchData();
  }, []);

  const metrics = [
    { title: "CPU usage", value: systemInfo.cpu?.usage || "Loading..." },
    { title: "Memory usage", value: systemInfo.memory?.usage || "Loading..." },
    { title: "Disk usage", value: systemInfo.disk?.usage || "Loading..." },
    { title: "Registered users", value: "0", extraIcons: true },
    { title: "Answer Seizure Ratio (ASR)", value: "0%" },
    { title: "Average Call Duration (ACD)", value: "00:00:18.5" },
  ];
  const commonContainerStyle = {
    backgroundColor: "#FFFFFF",
    boxShadow: "0 8px 24px rgba(69, 69, 80, 0.1)",
    padding: "24px",
    borderRadius: "12px",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    border: "1px solid #E6F5F8",
    height: "100%", // Ensures both components take up full height
  };
  return (
    <div>
      <div
        className="dashboardWrapper"
        style={{
          width: "100%",
          display: "flex",
          position: "absolute",
          top: "-8px",
          right: "0px",
        }}
      >
        <div
          className="dashboardLeftWrapper"
          style={{
            width: "24%",
            height: "100vh",
            background: "#f8f8f8",
            padding: "32px 28px",
          }}>
          <AccountDetails />
          <LiveCalls />
          <DashboardBalance />
        </div>
        <div
          className="dashboardRightWrapper"
          style={{
            width: "76%",
            background: "#fff",
            padding: "32px 28px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div style={{display: "flex", alignItems: "center"}}>
              <h1
                style={{
                  fontFamily: "Inter",
                  fontSize: "30px",
                  lineHeight: "36px",
                  fontWeight: 600,
                  letterSpacing: "-1px",
                  color: "#09090B",
                }}
              >
                Statistics of {selectedFilter} Calls
              </h1>
              {/*<span>*/}
              {/*  <LiveClock/>*/}
              {/*</span>*/}
            </div>
            {/* Pass the handleFilterChange and selectedFilter to FilterTabs */}
            <FilterTabs
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              gap: "18px",
              height: "auto",
            }}
          >
            <div style={{flex: 1, height: "400px"}}>
              <div style={commonContainerStyle}>
                <CallSummaryChart userRole={"admin"} selectedFilter={selectedFilter}/>
              </div>
            </div>

            <div style={{flex: 1, height: "400px"}}>
              <div style={commonContainerStyle}>
                <DashboardCallStatus selectedFilter={selectedFilter}/>
              </div>
            </div>
          </div>
          {/*<CallSummaryChart selectedFilter={selectedFilter}/>*/}
          {/*<DashboardCallStatus selectedFilter={selectedFilter}/>*/}
          <PBXOverview selectedFilter={selectedFilter}/>

          <DashboardCdrTable selectedFilter={selectedFilter}/>
        </div>
      </div>
    </div>
  );
  };

export default SuperAdmin;
