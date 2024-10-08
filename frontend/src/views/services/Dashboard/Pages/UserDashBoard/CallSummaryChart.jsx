import React, { useState, useEffect } from 'react';
import CommonCardHeader from "../../../../../components/core/commonCardHeader/CommonCardHeader";
import { useHistory } from "react-router-dom";
import ReactECharts from "echarts-for-react";
import axios from "axios";
import CDRServices from "../../../../../apiServices/CDRServices/CDRServices";


const username = localStorage.getItem("username");

const CallSummaryChart = ({ userRole, selectedFilter }) => {

  // Chart State
  const [chartData, setChartData] = useState({
    failed: [],
    success: [],
    timeLabels: [],
  });

  const history = useHistory();
  const handleButtonClick = () => {
    history.push("/userCallHistory");
  };

  // Function to get the start and end timestamps based on the selected filter
  const getTimestamps = (filter) => {
    const endStamp = new Date().toISOString(); // Current time
    let startStamp;

    switch (filter) {
      case 'Last 1 hour':
        startStamp = new Date(new Date().getTime() - 60 * 60 * 1000).toISOString(); // 1 hour ago
        break;
      case 'Last 24 hours':
        startStamp = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString(); // 24 hours ago
        break;
      case 'Last 7 days':
        startStamp = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(); // 7 days ago
        break;
      case 'Last 30 days':
        startStamp = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(); // 30 days ago
        break;
      default:
        startStamp = endStamp; // Fallback
        break;
    }
    return { startStamp, endStamp };
  };

  // Set sample data in useEffect
  useEffect(() => {
    const fetchCallSummery = async () => {

      const { startStamp, endStamp } = getTimestamps(selectedFilter);
      const adminRequestData = { startStamp, endStamp };

      const data = await CDRServices.fetchPartnerPrefixes(username);
      const callerIdNumber = data.map((item) => item.prefix);
      const requestData = { callerIdNumber, startStamp, endStamp };

      try {
        if(userRole==="admin") {
          const response = await axios.post(
            "http://iptsp.cosmocom.net:5070/admin/DashBoard/getIntervalWiseCall", adminRequestData
          );
          const data = await response.data;

          const sampleData = {
            failed: data.map(item => item.failedCalls),
            success: data.map(item => item.successCalls),
            timeLabels: data.map(item => item.timestamp)
          };

          const formattedTimeLabels = sampleData.timeLabels.map(label =>
            new Date(label).toLocaleDateString("en-GB") // Format as 'DD/MM/YYYY' or use any desired format
          );

          setChartData({
            failed: sampleData.failed,
            success: sampleData.success,
            timeLabels: formattedTimeLabels,
          });
        }
        else {
          const response = await axios.post(
            "http://iptsp.cosmocom.net:5070/user/DashBoard/getIntervalWiseCall", requestData,
            {
              headers: {
                'Authorization': `Bearer YOUR_TOKEN_HERE`,
                'Content-Type': 'application/json'
              }
            }
          );
          const data = await response.data;
          console.log(data);

          const sampleData = {
            failed: data.map(item => item.failedCalls),
            success: data.map(item => item.successCalls),
            timeLabels: data.map(item => item.timestamp)
          };

          const formattedTimeLabels = sampleData.timeLabels.map(label =>
            new Date(label).toLocaleDateString("en-GB") // Format as 'DD/MM/YYYY' or use any desired format
          );

          setChartData({
            failed: sampleData.failed,
            success: sampleData.success,
            timeLabels: formattedTimeLabels,
          });
        }
      } catch (e) {
        console.log('Error Message:', { e });
      }
    };
    fetchCallSummery();
  }, [selectedFilter]);

  // Chart Options
  const chartOptions = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Failed", "Success"],
      bottom: 0,
      icon: "circle",
    },
    grid: {
      top: "10%",
      left: "1%",
      right: "3%",
      bottom: "12%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: true,
      data: chartData.timeLabels,
      axisLine: {
        lineStyle: { color: "#D1E4F3" },
      },
      axisLabel: {
        fontFamily: "Inter",
        fontSize: 12,
        color: "#374151",
        rotate: 45,
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      axisLine: { lineStyle: { color: "#D1E4F3" } },
      axisLabel: {
        fontFamily: "Inter",
        fontSize: 12,
        color: "#374151",
      },
      splitLine: { lineStyle: { color: "#E5E7EB" } },
    },
    series: [
      {
        name: "Failed",
        type: "line",
        data: chartData.failed,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#E74C3C" },
              { offset: 1, color: "rgba(231, 76, 60, 0.2)" },
            ],
          },
        },
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 6,
        areaStyle: { color: "rgba(231, 76, 60, 0.2)" },
      },
      {
        name: "Success",
        type: "line",
        data: chartData.success,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#1d94ab" },
              { offset: 1, color: "rgba(29, 148, 171, 0.2)" },
            ],
          },
        },
        lineStyle: { width: 2 },
        symbol: "circle",
        symbolSize: 6,
        areaStyle: { color: "rgba(29, 148, 171, 0.2)" },
      },
    ],
  };

  return (
    <div>
      <CommonCardHeader
        title="Call Summary"
        subtitle={`Data from ${selectedFilter}`}
        buttonText="View Report"
        onButtonClick={handleButtonClick}
      />
      <ReactECharts option={chartOptions} style={{ top: "-16px" }} />
    </div>
  );
};

export default CallSummaryChart;
