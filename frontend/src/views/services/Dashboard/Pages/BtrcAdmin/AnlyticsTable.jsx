import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

export default function AnalyticsTable({ cclData, tableType, totalUsage }) {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  let cellBorderStyle = {
    border: "1px solid #DBDFE3",
    borderCollapse: "collapse",
  };

  const tableStyle = {
    borderCollapse: "collapse",
  };

  const columns = [
    { id: "icxName", label: "Name of ICX" },
    { id: "totalAssignmentE1", label: "Total Assignment E1" },
    { id: "signalingCircuits", label: "Signaling Circuits" },
    { id: "synchronizationCircuits", label: "Synchronization Circuits" },
    { id: "voiceCircuits", label: "Voice Circuits" },
    { id: "concurrentChannel", label: "Concurrent Channel" },
    { id: "freeChannel", label: "Free Channel" },
    { id: "usage", label: "Usage %" },
  ];

  let total = {
    partnerName: "",
    maxCapacity: 0,
    concurrentCall: 0,
    usage: 0,
  };

  for (let i = 0; i < cclData.length; i++) {
    total.maxCapacity += cclData[i].maxCapacity;
    total.concurrentCall += cclData[i].concurrentCall;
    total.usage += (cclData[i].maxCapacity * cclData[i].concurrentCall) / 100;
  }
  total.partnerName = tableType !== "grandTotal" ? "Sub Total" : "Grand Total";
  const cellColor =
    tableType === "grandTotal"
      ? { color: "#fff", fontSize: "13px", fontWeight: "600" }
      : { color: "#000" };

  let cellStyle = {};
  if (totalUsage < 70) {
    cellStyle = {
      color: "#fff",
      backgroundColor: "#1679AB",
    };
  } else if (totalUsage < 80) {
    cellStyle = {
      color: "#fff",
      backgroundColor: "#F4CE14",
    };
  } else if (totalUsage < 90) {
    cellStyle = {
      color: "#fff",
      backgroundColor: "#FF6500",
    };
  } else {
    cellStyle = {
      color: "#fff",
      backgroundColor: "#B80000",
    };
  }
  const headingStyle = {
    fontSize: "13px",
    fontWeight: "600",
  };

  return (
    <Paper sx={{ width: "100%", overflow: "auto" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" sx={tableStyle}>
          {tableType !== "grandTotal" && (
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{ ...headingStyle, ...cellBorderStyle, color: "#fff" }}
                    className="table_cell"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {tableType !== "grandTotal" &&
              cclData.map((singleDemo) => (
                <TableRow
                  hover
                  key={singleDemo.partnerName + singleDemo.callType}
                >
              <TableCell sx={cellBorderStyle}>
                    {singleDemo.partnerName}
                    {tableType === "cclIp" && singleDemo.callType === 1
                      ? " Domestic"
                      : tableType === "cclIp" && singleDemo.callType === 2
                      ? " International"
                      : ""}
                  </TableCell>
                  <TableCell sx={cellBorderStyle}>0</TableCell>
                  <TableCell sx={cellBorderStyle}>0</TableCell>
                  <TableCell sx={cellBorderStyle}>0</TableCell>
                  <TableCell sx={cellBorderStyle}>
                    {singleDemo.maxCapacity}
                  </TableCell>
                  <TableCell sx={cellBorderStyle}>
                    {singleDemo.concurrentCall}
                  </TableCell>
                  <TableCell sx={cellBorderStyle}>0</TableCell>
                  <TableCell sx={{ ...cellBorderStyle, ...cellStyle }}>
                    {(singleDemo.maxCapacity * singleDemo.concurrentCall) / 100}
                  </TableCell>
                </TableRow>
              ))}

            <TableRow
              sx={
                tableType === "grandTotal" && {
                  backgroundColor: "#072541",
                  color: "#fff !important",
                }
              }
            >
              <TableCell sx={{ ...cellBorderStyle, ...cellColor ,...headingStyle}
            }>
                {total.partnerName}
              </TableCell>
              <TableCell sx={{ ...cellBorderStyle, ...cellColor }}>0</TableCell>
              <TableCell sx={{ ...cellBorderStyle, ...cellColor }}>0</TableCell>
              <TableCell sx={{ ...cellBorderStyle, ...cellColor }}>0</TableCell>
              <TableCell sx={{ ...cellBorderStyle, ...cellColor }}>
                {total.maxCapacity}
              </TableCell>
              <TableCell sx={{ ...cellBorderStyle, ...cellColor }}>
                {total.concurrentCall}
              </TableCell>
              <TableCell sx={{ ...cellBorderStyle, ...cellColor }}>0</TableCell>
              <TableCell sx={{ ...cellStyle, ...cellBorderStyle }}>
                {total.usage}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
