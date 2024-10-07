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
                fontFamily:"Inter",
                fontSize: "16px",
                fontWeight: 500,
                letterSpacing:"-0.4px",
                paddingBottom: "8px",
                borderBottom: "1px solid #EBEBEB",
              }}
            >
              Balance
            </div>
            <div
              style={{
                color: "#2D3748",
                fontFamily: "Inter",
                fontSize: "24px",
                letterSpacing:"-0.6px",
                textTransform: "capitalize",
                fontWeight: "800",
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
                position: "relative",
                width: "100%",
                height: "100%",
                padding:"12px 0",
              }}
            >
              <CircularProgress
                variant="determinate"
                value={100}
                thickness={6}
                size={160}
                sx={{
                  color: "#e0e0e0",
                  position: "absolute",
                }}
              />
              <CircularProgress
                variant="determinate"
                value={65}
                thickness={6}
                size={160}
                sx={{
                  color: "#1D94AB",
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "Sharp",
                  },
                }}
              />
            </div>

            <div
              style={{
                color: "#525256",
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight:"500",
                letterSpacing:"-0.4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Valid till</span>
              <span>21 March 2025</span>
            </div>
            <div
              style={{
                color: "#525256",
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight:"500",
                letterSpacing:"-0.4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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
