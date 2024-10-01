import React, { useState, useEffect } from "react";
import { FormControl, Grid, TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import { Form } from "reactstrap";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications
import didPoolServices from "../../../apiServices/DIDPoolServices/DidPoolServices";

const ManageDidPool = ({ token, onSave, poolData, handleCloseModal }) => {
  // State to manage form inputs
  const [poolName, setPoolName] = useState("");
  const [description, setDescription] = useState("");

  // Effect to populate form fields if poolData is passed for editing
  useEffect(() => {
    if (poolData) {
      setPoolName(poolData.poolName || "");
      setDescription(poolData.description || "");
    }
  }, [poolData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    // Prepare the data object
    const data = {
      name: poolName,
      description: description,
    };

    try {
      if (poolData) {
        // Update existing pool
        await didPoolServices.updateDidPool(poolData.id, data, token); // Ensure the update API exists
        toast.success("Pool Information Updated Successfully!");
      } else {
        // Create new pool
        await didPoolServices.createDidPool(data, token);
        toast.success("New DID Pool Created Successfully!");
      }

      // Optionally pass the new or updated pool data to the parent component
      if (onSave) {
        onSave(data);
      }

      // Close the modal after saving and reset the form
      handleCloseModal();
    } catch (error) {
      console.error("Error creating/updating DID pool:", error);
      toast.error("Failed to save pool information. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            name="Pool Name"
            label="Pool Name"
            variant="standard"
            fullWidth
            value={poolName}
            onChange={(e) => setPoolName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="Description"
            label="Description"
            variant="standard"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} className="mt-3">
        <Grid item xs={2}>
          <Button type="submit">Submit</Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default ManageDidPool;
