import axios from "axios";
import { root } from "../../constants/constants";

const DID_POOL_API_BASE_URL = `${root}8001/FREESWITCH/`;

const DidPoolServices = {
  // Fetch all DID pools
  getDidPools: async () => {
    try {
      const response = await axios.post(
        `${DID_POOL_API_BASE_URL}get-did-pools`
      );
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error in DID pools:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error in DID pools:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error in DID pools:", errorEx);

      throw errorEx;
    }
  },

  //Update a Did Pool
  updateDidPool: async (id, data, token) => {
    try {
      const response = await axios.post(
        `${DID_POOL_API_BASE_URL}update-did-pool`,
        {
          id: id,
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error in DID pools:", errorEx);

      throw errorEx;
    }
  },

  // Delete a DID pool by ID
  deleteDidPool: async (id, token) => {
    try {
      const response = await axios.post(
        `${DID_POOL_API_BASE_URL}delete-did-pool`,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error in DID pools:", errorEx);

      throw errorEx;
    }
  },
  getDidAssingnmentNumberById: async (id) => {
    try {
      const response = await axios.post(
        `${DID_POOL_API_BASE_URL}get-did-assignment-by-didpool`,
        { id: id }
      );
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error in DID pools:", errorEx);

      throw errorEx;
    }
  },

  // All Did Number
  getDidNumbers: async () => {
    try {
      const response = await axios.post(
        `${DID_POOL_API_BASE_URL}get-did-numbers`
      );
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error in DID pools:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error in DID pools:", errorEx);

      throw errorEx;
    }
  },

  DidAssignmentSingleData: async (id, token) => {
    try {
      const response = await axios.post(
        `${DID_POOL_API_BASE_URL}get-did-assignment`,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error in DID pools:", errorEx);

      throw errorEx;
    }
  },

  updateDidAssignmentId: async (id, data, token) => {
    try {
      const response = await axios.post(
        `${DID_POOL_API_BASE_URL}update-did-assignment`,
        {
          id: id,
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error in DID pools:", errorEx);

      throw errorEx;
    }
  },

  deleteDidAssignmentId: async (id, token) => {
    try {
      const response = await axios.post(
        `${DID_POOL_API_BASE_URL}delete-did-assignment`,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error in DID pools:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error in DID pools:", errorEx);

      throw errorEx;
    }
  },

  importDidPoolFromFile: async (payload) => {
    try {
      const response = await axios.post(
        `${root}8001/FREESWITCH/create-did-assign-from-csv`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error Uploading Did Pool:", error);
    }
  },
};

export default DidPoolServices;
