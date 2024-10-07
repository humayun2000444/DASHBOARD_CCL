import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, Button } from "reactstrap";
import ReactECharts from "echarts-for-react";
import { useHistory } from "react-router-dom"
import CommonCardHeader from "../../../../../components/core/commonCardHeader/CommonCardHeader";

const CallSummaryChart = ({ selectedFilter }) => {

  const history = useHistory();
  const handleButtonClick = () => {
    history.push("/userCallHistory")
  };

  const [chartData, setChartData] = useState({
    failed: [],
    success: [],
    timeLabels: [],
  });
  const [loading, setLoading] = useState(false);
  const [lastFilter, setLastFilter] = useState("");

  const fetchCallSummary = async () => {
    if (loading) return; // Prevent multiple fetches
    setLoading(true); // Set loading state

    const now = new Date();
    let startStamp;
    let endStamp = now.toISOString();

    switch (selectedFilter) {
      case "Last 1 hour":
        startStamp = new Date(now.getTime() - 60 * 60 * 1000).toISOString(); // 1 hour ago
        break;
      case "Last 24 hours":
        startStamp = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(); // 24 hours ago
        break;
      case "Last 7 days":
        startStamp = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days ago
        break;
      case "Last 30 days":
        startStamp = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days ago
        break;
      default:
        setLoading(false);
        return; // Exit if no valid filter is selected
    }

    const requestData = {
      callerIdNumber: ["09646710720", "09646896378"], // Example callerIdNumbers
      startStamp,
      endStamp,
    };

    try {
      const response = await axios.post(
        "http://iptsp.cosmocom.net:5070/user/DashBoard/getIntervalWiseCall",
        requestData
      );
      const data = response.data;

      // Prepare data for the chart
      const timeLabels = [];
      const failedCalls = [];
      const successCalls = [];

      data.forEach(item => {
        timeLabels.push(new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        failedCalls.push(item.failedCalls);
        successCalls.push(item.successCalls);
      });

      setChartData({
        timeLabels,
        failed: failedCalls,
        success: successCalls,
      });
      setLastFilter(selectedFilter);
    } catch (error) {
      console.error("Error fetching call summary data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data only if the selected filter changes
    if (selectedFilter !== lastFilter) {
      fetchCallSummary();
    }
  }, [selectedFilter]); // Trigger effect when selectedFilter changes

  // ECharts Configuration
  const chartOptions = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "#ffffff",
      borderColor: "#D1E4F3",
      borderWidth: 1,
      textStyle: {
        color: "#374151",
        fontFamily: "Inter",
        fontSize: 12,
      },
    },
    legend: {
      data: ["Failed", "Success"],
      bottom: 0,
      icon: "circle",
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        fontFamily: "Inter",
        fontSize: 14,
        color: "#374151",
      },
    },
    grid: {
      top: "0%",
      left: "0%",
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
      },
    },
    yAxis: {
      type: "value",
      min: 0, // Ensure the min is 0 for better representation
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
      <div>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <ReactECharts option={chartOptions} style={{ top: "-16px" }} />
        )}
      </div>
    </div>
  );
};

export default CallSummaryChart;
