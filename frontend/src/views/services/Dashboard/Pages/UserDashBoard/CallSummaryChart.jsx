import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import ReactECharts from "echarts-for-react";
import CommonCardHeader from "../../../../../components/core/commonCardHeader/CommonCardHeader";

const handleButtonClick = () => {
  console.log("Button clicked!");
};

const CallSummaryChart = () => {

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
      top: "-2%",
      left: "0%",
      right: "3%",
      bottom: "12%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30"],
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
      min: -1,
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
        data: [9, 7, 15, 0, 0, 9, 4, 1, 2, 9],
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
        data: [10, 12, 5, 22, 1, 4, 6, 3, 19, 7],
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
      <div>
        <CommonCardHeader
          title="Detailed Call Summary"
          subtitle="Data from last 24 hours"
          buttonText="View Report"
          onButtonClick={handleButtonClick}
        />
        <div>
          <ReactECharts option={chartOptions} style={{top:"-16px"}}/>
        </div>
      </div>
    </div>
  );
};

export default CallSummaryChart;
