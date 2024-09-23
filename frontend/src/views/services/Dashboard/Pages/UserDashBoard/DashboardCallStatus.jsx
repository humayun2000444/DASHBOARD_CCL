import React, { useEffect, useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import adminDashboardServices from "../../../../../apiServices/AdminDashboardServices/adminDashboardServices";
import CDRServices from "../../../../../apiServices/CDRServices/CDRServices";

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
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 400,
    textTransform: "capitalize",
  },
  cardContext: {
    color: "#656575",
    fontSize: "14px",
  },
  cardValue: {
    color: "#2D3748",
    fontFamily: "Inter",
    fontSize: "28px",
    fontWeight: "800",
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

const getDateRange = (filter) => {
  const now = new Date();
  let startStamp = new Date();

  switch (filter) {
    case "Last 1 hour":
      startStamp.setHours(now.getHours() - 1);
      break;
    case "Last 24 hours":
      startStamp.setDate(now.getDate() - 1);
      break;
    case "Last 7 days":
      startStamp.setDate(now.getDate() - 7);
      break;
    case "Last 30 days":
      startStamp.setDate(now.getDate() - 30);
      break;
    default:
      break;
  }

  return { startStamp: startStamp.toISOString(), endStamp: now.toISOString() };
};

const CallStatusCard = ({ label, value, Icon }) => {
  return (
    <div style={styles.card}>
      <div className="cardContext">
        <span style={styles.cardContext}>{label}</span>
        <br />
        <span style={styles.cardValue}>{value || "N/A"}</span>
      </div>
      <div style={styles.iconWrapper}>
        <Icon style={styles.icon} />
      </div>
    </div>
  );
};

const DashboardCallStatus = ({ selectedFilter }) => {
  const [totalCallData, setTotalCallData] = useState(null);
  const [outgoingCallData, setOutgoingCallData] = useState(null);
  const [incomingCallData, setIncomingCallData] = useState(null);
  const [missedCallData, setMissedCallData] = useState(null);

  const token = localStorage.getItem("authToken");
  const userToken = JSON.parse(localStorage.getItem("userInfo"));
  const role = userToken.authRoles[0].name;
  const username = localStorage.getItem("username");

  const fetchData = async () => {
    const { startStamp, endStamp } = getDateRange(selectedFilter);

    try {
      if (role === "ROLE_ADMIN") {
        const totalCall = await adminDashboardServices.fetchTotalCallForAdmin(token, startStamp, endStamp);
        const outgoingCall = await adminDashboardServices.fetchOutgoingCallForAdmin(token, startStamp, endStamp);
        const incomingCall = await adminDashboardServices.fetchIncomingCallForAdmin(token, startStamp, endStamp);
        const missedCall = await adminDashboardServices.fetchMissedCallForAdmin(token, startStamp, endStamp);

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

        const outgoingCall = await adminDashboardServices.fetchOutgoingCallForUser({
          callerIdNumber: [...allPrefixArr],
          startStamp,
          endStamp,
        });

        const incomingCall = await adminDashboardServices.fetchIncomingCallForUser({
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
  };

  useEffect(() => {
    fetchData();
  }, [selectedFilter]); // Refetch data when selectedFilter changes

  const callStatuses = [
    { label: "Total calls", value: totalCallData, Icon: CallIcon },
    { label: "Outgoing calls", value: outgoingCallData, Icon: CallMadeIcon },
    { label: "Incoming calls", value: incomingCallData, Icon: CallReceivedIcon },
    { label: "Missed calls", value: missedCallData, Icon: CallMissedIcon },
  ];

  return (
    <div style={styles.cardWrapper}>
      {callStatuses.map((status, index) => (
        <CallStatusCard key={index} label={status.label} value={status.value} Icon={status.Icon} />
      ))}
    </div>
  );
};

export default DashboardCallStatus;
