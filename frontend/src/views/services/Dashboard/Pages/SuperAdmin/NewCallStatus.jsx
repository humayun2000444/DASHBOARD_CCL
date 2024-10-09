import React, {useState} from 'react';
import CommonCardHeader from "../../../../../components/core/commonCardHeader/CommonCardHeader";
import {Doughnut} from "react-chartjs-2";
import {useHistory} from "react-router-dom";

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

const NewCallStatus = () => {

  const history = useHistory();
  const handleButtonClick = () => {
    history.push("/userCallHistory")
  };

  const [callData, setCallData] = useState({
    total: 0,
    outgoing: 0,
    incoming: 0,
    missed: 0,
  });

  const chartData = {
    labels: [], // Hidden labels
    datasets: [
      {
        data: isDataEmpty ? [1] : [callData.total, callData.incoming, callData.outgoing, callData.missed],
        backgroundColor: isDataEmpty ? ['#E0E0E0'] : ['#1d94ab', '#4CAF50', '#2196F3', '#F44336'],
      },
    ],
  };

  // Check if all values are zero
  const isDataEmpty = callData.total === 0 && callData.incoming === 0 && callData.outgoing === 0 && callData.missed === 0;

  return (
    <div>
      <CommonCardHeader
        title="Call Status"
        subtitle="Data from last 24 hours"
        buttonText="View Report"
        onButtonClick={handleButtonClick}
      />

      {/* Chart Section */}
      <div style={useStyles.chartContainer}>
        <div style={{...useStyles.chartSection, position: 'relative'}}>
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              cutout: '90%',
              plugins: {
                tooltip: {enabled: !isDataEmpty},
              },
            }}
            height={230}
            width={230}
          />

          <h3 style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Perfectly centers the text
            fontSize: '24px',
            fontWeight: 'bold',
            color: isDataEmpty ? '#1d94ab' : '#1d94ab', // Same color for simplicity
            textAlign: 'center', // Centers text inside the h3
          }}>
            {isDataEmpty ? "0" : callData.total}
            <span style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 400,
              color: '#888888',
            }}>Total Calls</span>
          </h3>
        </div>


        <div style={useStyles.detailsList}>
          {[
            {label: "Total Calls", value: callData.total, color: "#1d94ab"},
            {label: "Incoming Calls", value: callData.incoming, color: "#4CAF50"},
            {label: "Outgoing Calls", value: callData.outgoing, color: "#2196F3"},
            {label: "Missed Calls", value: callData.missed, color: "#F44336"},
          ].map((item, index) => (
            <div
              key={index}
              style={{
                ...useStyles.detailItem,
                borderBottom: index < 3 ? '1px dashed #E0E0E0' : 'none' // Conditional border for the first 3 items
              }}
            >
              <div style={{display: "flex", alignItems: "center"}}>
                <div style={{...useStyles.coloredCircle, backgroundColor: item.color}}/>
                <span style={useStyles.rightLabel}>{item.label}:</span>
              </div>
              <span
                style={useStyles.rightCallCount}>{item.value === 0 ? "0" : item.value}</span> {/* Show 0 instead of N/A */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewCallStatus;
