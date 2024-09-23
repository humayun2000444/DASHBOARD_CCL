import React, { useEffect, useState } from "react";
import axios from "axios";
import AccountDetails from "./AccountDetails";
import CallSummaryChart from "./CallSummaryChart";
import DashboardBalance from "./DashboardBalance";
import DashboardCallStatus from "./DashboardCallStatus";
import DashboardCdrTable from "./DashboardCdrTable";
import LiveCalls from "./LiveCalls";
import FilterTabs from "../../../../../components/core/filter/FilterTabs";

const UserDashBoard = () => {
  const [selectedFilter, setSelectedFilter] = useState('Last 1 hour'); // Default filter

  // Function to handle filter change from FilterTabs
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
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
        <div
          className="dashboardLeftWrapper"
          style={{
            width: "24%",
            height: "100vh",
            background: "#f8f8f8",
            padding: "32px 28px",
          }}
        >
          <AccountDetails />
          <DashboardBalance />
          <LiveCalls />
        </div>
        <div
          className="dashboardRightWrapper"
          style={{
            width: "76%",
            background: "#fff",
            padding: "32px 28px",
          }}
        >
          <div style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}>
            <div>
              <h2>Dashboard Overview</h2>
            </div>
            {/* Pass the handleFilterChange and selectedFilter to FilterTabs */}
            <FilterTabs
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
            />
          </div>
          {/* Pass the selectedFilter to DashboardCallStatus */}
          <DashboardCallStatus selectedFilter={selectedFilter} />
          <CallSummaryChart />
          <DashboardCdrTable />
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserDashBoard;
