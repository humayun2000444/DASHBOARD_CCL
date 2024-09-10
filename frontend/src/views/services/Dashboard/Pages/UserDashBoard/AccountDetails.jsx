import React from "react";

const username = localStorage.getItem("username");
const AccountDetails = () => {
  return (
    <div>
      <div>
        <div className="dashboardBalanceWrapper">
          <div>
            <div
              style={{
                backgroundColor: "#fff",
                boxShadow: "1",
                borderRadius: "8px",
                padding: "20px",
                minWidth: "300px",
              }}
            >
              <div
                style={{
                  color: "#333",
                  fontSize: "18px",
                  fontWeight: 500,
                  paddingBottom: "8px",
                  borderBottom: "1px solid #EBEBEB",
                }}
              >
                Account Details
              </div>
              <div
                style={{
                  color: "#2D3748",
                  fontSize: "28px",
                  fontWeight: "bold",
                  padding: "12px 0 6px 0",
                }}
              >
                {username}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative", // Ensure that absolute positioning inside the container is relative to this div
                  width: "100%", // Set to the size of the CircularProgress
                  height: "100%", // Set to the size of the CircularProgress
                }}
              ></div>

              <div
                style={{
                  color: "#525256",
                  fontSize: "14px",
                }}
              >
                <span
                  style={{
                    color: "#064E3B",
                    fontSize: "14px",
                    padding: "4px 8px",
                    marginRight: "6px",
                    borderRadius: "4px",
                    backgroundColor: "#D1FAE5",
                  }}
                >
                  Perpaid
                </span>
                <span>Account Type</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
