import React, { useEffect, useState, useCallback } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Button from "@mui/material/Button";
import adminDashboardServices from "../../../../../apiServices/AdminDashboardServices/adminDashboardServices";
import CDRServices from "../../../../../apiServices/CDRServices/CDRServices";
import CommonCardHeader from "../../../../../components/core/commonCardHeader/CommonCardHeader";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Button Click
const handleButtonClick = () => {
  console.log("Button clicked!");
};

const useStyles = {
  chartContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chartSection: {
    width: "50%",
    textAlign: "center",
    maxWidth: "300px", // Set max width for the chart section
  },
  detailsList: {
    width: "45%",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 0",
    borderBottom: "1px dashed #E0E0E0",
  },
  rightLabel: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
  },
  rightCallCount: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
  },
  coloredCircle: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    marginRight: "8px",
  },
};

const getDateRange = (filter) => {
  const now = new Date();
  let startStamp = new Date();

  const ranges = {
    "Last 1 hour": () => startStamp.setHours(now.getHours() - 1),
    "Last 24 hours": () => startStamp.setDate(now.getDate() - 1),
    "Last 7 days": () => startStamp.setDate(now.getDate() - 7),
    "Last 30 days": () => startStamp.setDate(now.getDate() - 30),
  };

  ranges[filter]?.();
  return { startStamp: startStamp.toISOString(), endStamp: now.toISOString() };
};

const DashboardCallStatus = ({ selectedFilter }) => {
  const [callData, setCallData] = useState({
    total: 0,
    outgoing: 0,
    incoming: 0,
    missed: 0,
  });

  const token = localStorage.getItem("authToken");
  const userToken = JSON.parse(localStorage.getItem("userInfo"));
  const { name: role } = userToken.authRoles[0];
  const username = localStorage.getItem("username");

  const fetchData = useCallback(async () => {
    const { startStamp, endStamp } = getDateRange(selectedFilter);

    try {
      if (role === "ROLE_ADMIN") {
        const totalCall = await adminDashboardServices.fetchTotalCallForAdmin(
          token,
          startStamp,
          endStamp
        );
        const outgoingCall =
          await adminDashboardServices.fetchOutgoingCallForAdmin(
            token,
            startStamp,
            endStamp
          );
        const incomingCall =
          await adminDashboardServices.fetchIncomingCallForAdmin(
            token,
            startStamp,
            endStamp
          );
        const missedCall = await adminDashboardServices.fetchMissedCallForAdmin(
          token,
          startStamp,
          endStamp
        );

        setTotalCallData(totalCall);
        setOutgoingCallData(outgoingCall);
        setIncomingCallData(incomingCall);
        setMissedCallData(missedCall);
      } else if (role === "ROLE_USER") {
        const data = await CDRServices.fetchPartnerPrefixes(username);
        const allPrefixArr = data.map((item) => item.prefix);
        const totalCall = await adminDashboardServices.fetchTotalCallForUser({
          callerIdNumber: [...allPrefixArr],
          startStamp,
          endStamp,
        });

        const outgoingCall =
          await adminDashboardServices.fetchOutgoingCallForUser({
            callerIdNumber: [...allPrefixArr],
            startStamp,
            endStamp,
          });

        const incomingCall =
          await adminDashboardServices.fetchIncomingCallForUser({
            callerIdNumber: [...allPrefixArr],
            startStamp,
            endStamp,
          });

        const missedCall = await adminDashboardServices.fetchMissedCallForUser({
          callerIdNumber: [...allPrefixArr],
          startStamp,
          endStamp,
        });

        setTotalCallData(totalCall);
        setOutgoingCallData(outgoingCall);
        setIncomingCallData(incomingCall);
        setMissedCallData(missedCall);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedFilter, role, token, username]);

  useEffect(() => {
    fetchData();
  }, [selectedFilter]); // Refetch data when selectedFilter changes

  const callStatuses = [
    { label: "Total calls", value: totalCallData, Icon: CallIcon },
    { label: "Outgoing calls", value: outgoingCallData, Icon: CallMadeIcon },
    {
      label: "Incoming calls",
      value: incomingCallData,
      Icon: CallReceivedIcon,
    },
    { label: "Missed calls", value: missedCallData, Icon: CallMissedIcon },
  ];

  return (
    <div style={styles.cardWrapper}>
      {callStatuses.map((status, index) => (
        <CallStatusCard
          key={index}
          label={status.label}
          value={status.value}
          Icon={status.Icon}
        />
      ))}
    </div>
  );
};

export default DashboardCallStatus;
