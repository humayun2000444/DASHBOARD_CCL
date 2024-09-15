import React, { useEffect, useState } from "react";

import CallIcon from "@mui/icons-material/Call";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import adminDashboardServices from "../../../../../apiServices/AdminDashboardServices/adminDashboardServices";

const styles = {
  cardWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 16,
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    boxShadow: "0 8px 24px rgba(69,69,80,0.1)",
    width: "25%",
    padding: "18px 22px",
    borderRadius: "12px",
  },
  cardContext: {
    color: "#656575",
    fontSize: "14px",
  },
  cardValue: {
    color: "#2D3748",
    fontSize: "24px",
    fontWeight: "bold",
  },
  iconWrapper: {
    backgroundColor: "#EFF2F1",
    padding: "12px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#006AFF",
  },
};

const username = localStorage.getItem("username");

const CallStatusCard = ({ label, value, Icon }) => {
  return (
    <div style={styles.card}>
      <div className="cardContext">
        <span style={styles.cardContext}>{label}</span>
        <br />
        <span style={styles.cardValue}>{value}</span>
      </div>
      <div style={styles.iconWrapper}>
        <Icon style={styles.icon} />
      </div>
    </div>
  );
};

const DashboardCallStatus = () => {
  const [totalCallData, setTotalCallData] = useState(null);
  const [outgoingCallData, setOutgoingCallData] = useState(null);
  const [incomingCallData, setTIncomingCallData] = useState(null);
  const [missedCallData, setMissedCallData] = useState(null);

  console.log("total call", totalCallData);
  const token = localStorage.getItem("authToken");
  const callerIdNumber = "09646999999";
  const domainName = "103.95.96.100";

  const fetchData = async () => {
    try {
      const totalCall = await adminDashboardServices.fetchTotalCallForAdmin(
        token
      );
      const outgoingCall =
        await adminDashboardServices.fetchOutgoingCallForAdmin(token);
      const incomingCall =
        await adminDashboardServices.fetchIncomingCallForAdmin(token);
      const missedCall = await adminDashboardServices.fetchMissedCallForAdmin(
        token
      );
      setTotalCallData(totalCall);
      setOutgoingCallData(outgoingCall);
      setTIncomingCallData(incomingCall);
      setMissedCallData(missedCall);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const callStatuses = [
    {
      label: "Total calls",
      value: totalCallData,
      Icon: CallIcon,
    },
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
