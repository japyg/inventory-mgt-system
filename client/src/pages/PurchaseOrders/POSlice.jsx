import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: "",
  purchaseOrderData: [
    {
      poNumber: "",
      poDate: "",
      fundCluster: "",
      procMode: "",
      totalCost: "",
    },
  ],
};

export const fetchPurchaseOrders = createAsyncThunk(
  "/purchaseOrders/fetchPurchaseOrders",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getPO");

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const POSlice = createSlice({
  name: "purchaseOrder",
  initialState,
  reducers: {
    addPurchaseOrder: (state, action) => {
      state.purchaseOrderData.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPurchaseOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPurchaseOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.purchaseOrderData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPurchaseOrders.rejected, (state, action) => {
      state.loading = false;
      state.purchaseOrderData = [];
      state.error = action.error.message;
    });
  },
});

export default POSlice.reducer;
export const { addPurchaseOrder } = POSlice.actions;
