import React, { useEffect, useState } from "react";
import CDRServices from "../../../../../apiServices/CDRServices/CDRServices";
import CDRTable from "../../../Reports/CDRTable";

const rows = [
  {
    id: 1,
    extension: "09646400100",
    callerNumber: "09646400100",
    callerDestination: "+880911941199607",
    callType: "Inbound Call",
    date: "20 Aug 2024",
    time: "06:06 pm",
    duration: "0:01:33",
    status: "Answered",
    hangupCause: "Normal Clearing",
  },
  {
    id: 2,
    extension: "09646400101",
    callerNumber: "09646400100",
    callerDestination: "+880911941199607",
    callType: "Inbound Call",
    date: "20 Aug 2024",
    time: "06:06 pm",
    duration: "0:01:33",
    status: "Answered",
    hangupCause: "Normal Clearing",
  },
  {
    id: 3,
    extension: "09646400103",
    callerNumber: "09646400100",
    callerDestination: "+880911941199607",
    callType: "Inbound Call",
    date: "20 Aug 2024",
    time: "06:06 pm",
    duration: "0:01:33",
    status: "Answered",
    hangupCause: "Normal Clearing",
  },
  {
    id: 4,
    extension: "09646400102",
    callerNumber: "09646400100",
    callerDestination: "+880911941199607",
    callType: "Inbound Call",
    date: "20 Aug 2024",
    time: "06:06 pm",
    duration: "0:01:33",
    status: "Answered",
    hangupCause: "Normal Clearing",
  },
  {
    id: 5,
    extension: "09646400106",
    callerNumber: "09646400100",
    callerDestination: "+880911941199607",
    callType: "Inbound Call",
    date: "20 Aug 2024",
    time: "06:06 pm",
    duration: "0:01:33",
    status: "Answered",
    hangupCause: "Normal Clearing",
  },
  {
    id: 6,
    extension: "09646400607",
    callerNumber: "09646400100",
    callerDestination: "+880911941199607",
    callType: "Inbound Call",
    date: "20 Aug 2024",
    time: "06:06 pm",
    duration: "0:01:33",
    status: "Answered",
    hangupCause: "Normal Clearing",
  },
  {
    id: 7,
    extension: "09646699607",
    callerNumber: "09646400100",
    callerDestination: "+880911941199607",
    callType: "Inbound Call",
    date: "20 Aug 2024",
    time: "06:06 pm",
    duration: "0:01:33",
    status: "Answered",
    hangupCause: "Normal Clearing",
  },
];
const columns = [
  { field: "extension", headerName: "Extension", flex: 1 },
  { field: "callerNumber", headerName: "Caller Number", flex: 1 },
  { field: "callerDestination", headerName: "Caller Destination", flex: 1 },
  { field: "callType", headerName: "Call Type", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "time", headerName: "Time", flex: 1 },
  { field: "duration", headerName: "Duration", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  { field: "hangupCause", headerName: "Hangup Cause", flex: 1 },
];

const DashboardCdrTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCDRData = async () => {
      setLoading(true); // Start loading before fetching data
      try {
        const data = await CDRServices.fetchAllCDRData();
        console.log(data);
        setTableData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };
    fetchCDRData();
  }, []);

  return (
    <div
      style={{
        height: 400,
        width: "100%",
        marginTop: "20px",
        backgroundColor: "#fff",
        padding: "32px 28px 28px 28px",
        boxShadow: "0 8px 24px rgba(69,69,80,0.1)",
        borderRadius: "12px",
      }}
    >
      <h4 style={{ marginBottom: "12px" }}>Call Details Records</h4>
      <CDRTable dashboardCDR={true} />
    </div>
  );
};

export default DashboardCdrTable;
