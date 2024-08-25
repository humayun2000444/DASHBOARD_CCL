import { Box, Grid, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import React from "react";
import { Cell, Pie, PieChart } from "recharts";

const data = [
  { value: 332, label: "Live Calls", color: "#006AFF" },
  { value: 48, label: "Queued Calls", color: "#52C93F" },
  { value: 122, label: "Missed Calls", color: "#FF2727" },
];

const LiveCalls = () => {
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
                Live Call Stats
              </div>
              <Stack
                direction="row"
                width="100%"
                textAlign="center"
                justifyContent="center"
                alignItems="center"
              >
                <Box width="100%" maxWidth={380} textAlign="center">
                  <PieChart width={340} height={100}>
                    <Pie
                      data={data}
                      dataKey="value"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      cx={160}
                      cy={100}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>

                  {/* Labels Below the Pie Chart */}
                  <Grid
                    container
                    justifyContent="space-between"
                    spacing={4}
                    mt={2}
                  >
                    {data.map((item, index) => (
                      <Grid item key={index}>
                        <Box display="flex" alignItems="center">
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: 100,
                              backgroundColor: item.color,
                              marginRight: 1,
                            }}
                          />
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            fontSize="16px"
                            color="#1A1919"
                          >
                            {item.value}
                          </Typography>
                        </Box>
                        <Typography variant="body1" color="#1A1919">
                          {item.label}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCalls;
