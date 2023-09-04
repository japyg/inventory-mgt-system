import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: "",
  tableRowDataInfo: [
    {
      key: 0,
      index: 0,
      description: "",
      brand: "",
      model: "",
      serialNumber: "",
      unit: "pc",
      quantity: 0,
      unitCost: 0,
      amount: 0,
    },
  ],
};

export const fetchTableRowData = createAsyncThunk(
  "/purchaseOrders/fetchTableRowData",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/getTableRowData"
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const tableRowSlice = createSlice({
  name: "tableRowData",
  initialState,
  reducers: {
    addTableRowData: (state, action) => {
      state.tableRowDataInfo.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTableRowData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTableRowData.fulfilled, (state, action) => {
      state.loading = false;
      state.tableRowDataInfo = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTableRowData.rejected, (state, action) => {
      state.loading = false;
      state.tableRowDataInfo = [];
      state.error = action.error.message;
    });
  },
});

export default tableRowSlice.reducer;
export const { addTableRowData } = tableRowSlice.actions;
