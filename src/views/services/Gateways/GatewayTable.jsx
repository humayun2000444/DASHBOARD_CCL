import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function GatewayTable({
  rowData,
  setRowData,
  setEditMode,
  setFormData,
}) {
  const handleEditClick = (event, row) => {
    event.stopPropagation(); // Prevent row selection
    setEditMode({
      isOpen: true,
      type: "UPDATE",
    });
    setFormData(row);
  };

  const handleDeleteClick = (event, row) => {
    event.stopPropagation(); // Prevent row selection
    const filteredRowData = rowData.filter((data) => data.id !== row.id);
    setRowData(filteredRowData);
  };

  const handleCellClick = (params, event) => {
    if (params.field !== "__check__") {
      event.defaultMuiPrevented = true;
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "ipNumber", headerName: "Ip Number", width: 250 },
    { field: "callLimit", headerName: "Call limit", width: 180 },
    { field: "tariff", headerName: "Tariff", width: 180 },
    { field: "status", headerName: "Status", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={(event) => handleEditClick(event, params.row)}
            style={{ transition: "0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "blue")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            style={{ color: "red", transition: "0.3s" }}
            onClick={(event) => handleDeleteClick(event, params.row)}
            onMouseEnter={(e) => (e.currentTarget.style.color = "darkred")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "red")}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = rowData;

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20, 40, 100]}
        checkboxSelection
        disableColumnMenu
        disableColumnSorting
        disableColumnResize
        classes={{ columnHeaders: "header-style" }}
        onCellClick={handleCellClick}
        componentsProps={{
          cell: {
            onClick: (event, params) => {
              if (params.field !== "__check__") {
                event.defaultMuiPrevented = true;
              }
            },
          },
        }}
      />
    </div>
  );
}
