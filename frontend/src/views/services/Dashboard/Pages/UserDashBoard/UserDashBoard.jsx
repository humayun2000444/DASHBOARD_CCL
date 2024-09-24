import React, { useState } from "react";
import AccountDetails from "./AccountDetails";
import CallSummaryChart from "./CallSummaryChart";
import DashboardBalance from "./DashboardBalance";
import DashboardCallStatus from "./DashboardCallStatus";
import DashboardCdrTable from "./DashboardCdrTable";
import LiveCalls from "./LiveCalls";
import FilterTabs from "../../../../../components/core/filter/FilterTabs";
import LiveClock from "../../../../../components/core/clock/LiveClock";

const UserDashBoard = () => {
  const [selectedFilter, setSelectedFilter] = useState("Last 1 hour"); // Default filter

  // Function to handle filter change from FilterTabs
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  // Common container style for cards
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
    <React.Fragment>
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
        {/* Left Sidebar */}
        <div
          className="dashboardLeftWrapper"
          style={{
            width: "24%",
            height: "100vh",
            background: "#F5F5F5",
            padding: "32px 28px",
            boxShadow: "2px 0px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <AccountDetails />
          <DashboardBalance />
          <LiveCalls />
        </div>

        {/* Right Content */}
        <div
          className="dashboardRightWrapper"
          style={{
            width: "76%",
            background: "#ffffff",
            padding: "32px 28px",
            border: "1px solid #E0E0E0",
          }}
        >
          {/* Header */}
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
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#2E3A45",
                }}
              >
                Dashboard Overview
              </h1>
              <span>
                <LiveClock/>
              </span>
            </div>

            {/* Filter Tabs */}
            <FilterTabs
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Dashboard Call Status & Call Summary Chart */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start", // Align both components to the start
              alignItems: "flex-start", // Top alignment
              width: "100%",
              gap: "28px",
              height: "auto", // Ensures container is flexible with content height
            }}
          >
            <div style={{flex: 1, height: "400px"}}> {/* Same fixed height for both components */}
              <div style={commonContainerStyle}>
                <CallSummaryChart selectedFilter={selectedFilter}/>
              </div>
            </div>

            <div style={{flex: 1, height: "400px"}}> {/* Same fixed height for both components */}
              <div style={commonContainerStyle}>
                <DashboardCallStatus selectedFilter={selectedFilter}/>
              </div>
            </div>
          </div>

          {/* CDR Table */}
          <div style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "0 8px 24px rgba(69, 69, 80, 0.1)",
            padding: "24px",
            borderRadius: "12px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            border: "1px solid #E6F5F8",
          marginTop: "28px",}}>
            <DashboardCdrTable/>
          </div>

        </div>
      </div>
    </React.Fragment>
  );
};

export default UserDashBoard;
