import { Box, Card, Typography } from "@mui/material";
import "chart.js/auto";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

// InfoRow component
const InfoRow = ({ label, color, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left side: Colored square and text */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "12px",
            height: "12px",
            backgroundColor: color,
            marginRight: "8px",
          }}
        />
        <Typography>{label}</Typography>
      </Box>

      {/* Right side: Value */}
      <Typography>{value}</Typography>
    </Box>
  );
};

// Main component
const PBXOverview = () => {
  // Dummy data for hardware
  const [hardwareData, setHardwareData] = useState({
    cpu: 12.3221,
    memory: 332.3221,
    disk: 42.3221,
  });

  // Dummy data for call stats
  const [callStats, setCallStats] = useState({
    registeredUsers: 3254,
    asr: 745,
    acd: 745,
  });

  // Chart data state
  const [chartData, setChartData] = useState({
    labels: ["CPU Usage", "Memory Usage", "Disk Usage"],
    datasets: [
      {
        label: "Stats",
        data: [12.3221, 332.3221, 42.3221], // Use dummy data
        backgroundColor: ["#B6C93F", "#FF2727", "#52C93F"],
        borderColor: ["#B6C93F", "#FF2727", "#52C93F"],
        borderWidth: 1,
      },
    ],
  });

  // Chart options
  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Card>
        <Box
          className="pbx-overview"
          sx={{
            bgcolor: "#FFFFFF",
            p: 2,
            borderRadius: 1,
            boxShadow: 1,
            padding: "32px 28px 28px 28px",
          }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#1A1919",
              mb: 2,
              marginBottom: "24px",
            }}
          >
            PBX Overview
          </Typography>

          <Box sx={{ display: "flex", gap: "70px" }}>
            {/* Left Side: Hardware Information */}
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                  fontFamily: "Inter",
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "24px",
                  color: "#525256",
                  borderBottom: "1px solid #EBEBEB",
                  paddingBottom: "8px",
                }}
              >
                <div>HARDWARE INFORMATION</div>
                <div>TOTAL</div>
              </Box>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <li>
                  <InfoRow
                    label="CPU Usage"
                    color="#B6C93F"
                    value={hardwareData.cpu}
                  />
                </li>
                <li>
                  <InfoRow
                    label="Memory Usage"
                    color="#FF2727"
                    value={hardwareData.memory}
                  />
                </li>
                <li>
                  <InfoRow
                    label="Disk Usage"
                    color="#52C93F"
                    value={hardwareData.disk}
                  />
                </li>
              </ul>
            </Box>

            {/* Middle: Bar Chart */}
            <Box sx={{ flex: 1 }}>
              <Bar data={chartData} options={options} />
            </Box>

            {/* Right Side: User Statistics */}
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                  fontFamily: "Inter",
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "24px",
                  color: "#525256",
                  borderBottom: "1px solid #EBEBEB",
                  paddingBottom: "8px",
                }}
              >
                <div>USER INFORMATION</div>
                <div>TOTAL</div>
              </Box>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <li>
                  <InfoRow
                    label="Registered Users"
                    color="#27FFF2"
                    value={callStats.registeredUsers}
                  />
                </li>
                <li>
                  <InfoRow
                    label="Answer Seizure Ratio (ASR)"
                    color="#D54FF6"
                    value={callStats.asr}
                  />
                </li>
                <li>
                  <InfoRow
                    label="Average Call Duration (ACD)"
                    color="#00FFB2"
                    value={callStats.acd}
                  />
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default PBXOverview;
