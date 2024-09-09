import React from "react";
import { Card, CardBody } from "reactstrap";

import "../../../../../assets/scss/pages/dashboard-analytics.scss";

import ReactECharts from "echarts-for-react";

const CallSummaryChart = () => {
  const option = {
    title: {
      text: "Call Summery",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Failed", "Success"],
      right: 10,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "12:15:00",
        "12:30:00",
        "12:45:00",
        "13:00:00",
        "13:15:00",
        "13:30:00",
        "13:45:00",
        "14:00:00",
        "14:15:00",
        "14:30:00",
      ],
    },
    yAxis: {
      type: "value",
      min: -1,
    },
    series: [
      {
        name: "Failed",
        type: "line",
        stack: "Total",
        data: [9, 7, 15, 0, 0, 9, 4, 1, 2, 9],
        itemStyle: {
          color: "red",
        },
      },
      {
        name: "Success",
        type: "line",
        stack: "Total",
        data: [10, 12, 5, 22, 1, 4, 6, 3, 19, 7],
        itemStyle: {
          color: "green",
        },
      },
    ],
  };

  return (
    <div>
      <Card style={{ marginTop: "20px" }}>
        <CardBody>
          <ReactECharts
            option={option}
            style={{ height: 300, width: "100%" }}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default CallSummaryChart;
