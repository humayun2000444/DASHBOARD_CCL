import axios from "axios";
import { root } from "../../constants/constants";
import { root2 } from "../../constants/constants";

const DID_POOL_API_BASE_URL = `${root}8001/FREESWITCH/`;

const DidPoolServices = {
  // Fetch all DID pools
  getDidPools: async () => {
    try {
      const response = await axios.post(`${DID_POOL_API_BASE_URL}get-did-pools`);
      return response.data;
    } catch (error) {
      console.error("Error fetching DID pools:", error);
      throw error;
    }
  },

  // Fetch DID pool by ID
  getDidPoolById: async (id, token) => {
    try {
      const response = await axios.post(
        `${DID_POOL_API_BASE_URL}get-did-pool`,
        { idDidPool: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching DID pool by ID:", error);
      throw error;
    }
  },

  // Create a new DID pool
  createDidPool: async (data, token) => {
    try {
      const response = await axios.post(
        `${DID_POOL_API_BASE_URL}create-did-pool`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating DID pool:", error);
      throw error;
    }
  },

  // Delete a DID pool by ID
  deleteDidPool: async (id, token) => {
    try {
      const response = await axios.post(
        `${DID_POOL_API_BASE_URL}delete-did-pool`,
        { idDidPool: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting DID pool:", error);
      throw error;
    }
  },
  getDidNumbers: async () => {
    try {
      const response = await axios.post(`${DID_POOL_API_BASE_URL}get-did-numbers`);
      return response.data;
    } catch (error) {
      console.error("Error fetching DID numbers:", error);
      throw error;
    }
  },
  // Create a DID assignment
  createDidAssignment: async (data, token) => {
    try {
      const response = await axios.post(
        `${DID_POOL_API_BASE_URL}create-did-assignment`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating DID assignment:", error);
      throw error;
    }
  },

  // Create a DID number
  createDidNumber: async (data, token) => {
    try {
      const response = await axios.post(
        `${DID_POOL_API_BASE_URL}create-did-number`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating DID number:", error);
      throw error;
    }
  },
};

export default DidPoolServices;
