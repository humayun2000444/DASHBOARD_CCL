import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";

const DashboardBalance = () => {
  return (
    <div>
      <div className="dashboardBalanceWrapper">
        <div>
          <div
            style={{
              backgroundColor: "#fff",
              boxShadow: "1",
              borderRadius: "8px",
              padding: "20px",
              marginTop: "16px",
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
              Balance
            </div>
            <div
              style={{
                color: "#2D3748",
                fontSize: "28px",
                fontWeight: "bold",
                padding: "12px 0 6px 0",
              }}
            >
              ৳1230.80
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
            >
              <CircularProgress
                variant="determinate"
                value={100} // This ensures the circle is fully drawn
                thickness={6}
                size={160} // Size should match the main circle
                sx={{
                  color: "#e0e0e0", // The rest color (light gray)
                  position: "absolute", // Position it behind the main progress
                }}
              />
              <CircularProgress
                variant="determinate"
                value={65}
                thickness={6}
                size={160} // You can adjust the size
                sx={{
                  color: "#006AFF", // Adjust color as needed
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "Sharp",
                  },
                }}
              />
            </div>

            <div
              style={{
                color: "#064E3B",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              <span>Valid till</span>
              <span>21 March 2025</span>
            </div>
            <div
              style={{
                color: "#064E3B",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              <span>Last week usage</span>
              <span>৳3233.10</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginTop: "12px",
              }}
            >
              <Button variant="contained">Recharge</Button>
              <Button variant="outlined">History</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBalance;
