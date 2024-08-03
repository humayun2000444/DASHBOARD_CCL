import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Select from "react-select";
import { CardBody, CardTitle } from "reactstrap";
import { Form, Button } from "react-bootstrap";
import RetailFormModal from "./RetailFormModal";
import RetailTable from "./RetailTable";
import "../../../assets/scss/pages/gateways.scss";

const RetailClients = () => {
  const [rowData, setRowData] = useState([
    {
      id: 1,
      name: "BejaNuevo1",
      ipNumber: "09614502010",
      callLimit: 10,
      tariff: 2,
      status: "Active",
    },
    {
      id: 2,
      name: "BejaNuevo1",
      ipNumber: "09614502010",
      callLimit: 10,
      tariff: 2,
      status: "Active",
    },
    {
      id: 3,
      name: "BejaNuevo1",
      ipNumber: "09614502010",
      callLimit: 10,
      tariff: 2,
      status: "Active",
    },
    {
      id: 4,
      name: "BejaNuevo1",
      ipNumber: "09614502010",
      callLimit: 10,
      tariff: 2,
      status: "Active",
    },
    {
      id: 5,
      name: "BejaNuevo1",
      ipNumber: "09614502010",
      callLimit: 10,
      tariff: 2,
      status: "Active",
    },
    {
      id: 6,
      name: "BejaNuevo1",
      ipNumber: "09614502010",
      callLimit: 10,
      tariff: 2,
      status: "Active",
    },
    {
      id: 7,
      name: "BejaNuevo1",
      ipNumber: "09614502010",
      callLimit: 10,
      tariff: 2,
      status: "Active",
    },
    {
      id: 8,
      name: "BejaNuevo1",
      ipNumber: "09614502010",
      callLimit: 10,
      tariff: 2,
      status: "Active",
    },
    {
      id: 9,
      name: "BejaNuevo1",
      ipNumber: "09614502010",
      callLimit: 10,
      tariff: 2,
      status: "Active",
    },
    {
      id: 10,
      name: "BejaNuevo1",
      ipNumber: "09614502010",
      callLimit: 10,
      tariff: 2,
      status: "Active",
    },
    {
      id: 11,
      name: "BejaNuevo1",
      ipNumber: "09614502010",
      callLimit: 10,
      tariff: 2,
      status: "Active",
    },
    {
      id: 12,
      name: "BejaNuevo1",
      ipNumber: "999",
      callLimit: 10,
      tariff: 2,
      status: "Active",
    },
  ]);

  const initialFormData = {
    name: "",
    ipNumber: "",
    callLimit: "",
    tariff: "",
    status: "Active",
  };
  const [formData, setFormData] = useState(initialFormData);

  const [editMode, setEditMode] = useState({
    isOpen: false,
    type: "",
  });

  const handleAddGateways = () => {
    setEditMode({
      isOpen: true,
      type: "ADD",
    });
  };

  const handleCloseModal = () => {
    setEditMode((prev) => {
      return {
        ...prev,
        isOpen: false,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e, editType) => {
    e.preventDefault();

    if (editType === "ADD") {
      setRowData((prev) => {
        return [
          ...prev,
          {
            id: prev.length + 1,
            ...formData,
          },
        ];
      });
    } else {
      const updatedRowData = rowData.map((row) => {
        if (row.id === formData.id) {
          return formData;
        }
        return row;
      });
      setRowData(updatedRowData);
    }

    setEditMode((prev) => {
      return {
        ...prev,
        isOpen: false,
      };
    });
    setFormData(initialFormData);
  };

  return (
    <div className="gateways">
      <RetailFormModal
        editMode={editMode}
        handleCloseModal={handleCloseModal}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Card>
        <CardBody>
          <CardTitle>
            <div className="border-bottom mb-4">
              <h4 className="pb-3">Retail Clients</h4>
            </div>
          </CardTitle>
          <div className="d-flex justify-content-between gateway__content">
            <div className="d-flex flex-wrap">
              <div>
                <h6>Name</h6>
                <form style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control
                    placeholder="Enter name"
                    style={{ marginRight: "10px" }}
                  />
                </form>
              </div>
              <div>
                <h6>Ip Number</h6>
                <form style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control
                    placeholder="Enter ip"
                    style={{ marginRight: "10px" }}
                  />
                </form>
              </div>
            </div>
            <div className="d-flex align-items-end">
              <Button
                style={{ padding: "7px 30px" }}
                onClick={() => handleAddGateways()}
              >
                Create Clients
              </Button>
            </div>
          </div>
          <div className="gatewayTable">
            <RetailTable
              rowData={rowData}
              setRowData={setRowData}
              setEditMode={setEditMode}
              setFormData={setFormData}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default RetailClients;
