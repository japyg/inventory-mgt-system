import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: "",
  supplierInfo: [
    {
      supplierId: "",
      supplierName: "",
      supplierTin: "",
      supplierAddress: "",
      telNumber: "",
      celNumber: "",
      emailAddress: "",
    },
  ],
};

//Generated pending, fulfilled and rejected action types
export const fetchSuppliers = createAsyncThunk(
  "/supplier/fetchSuppliers",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/getSuppliers"
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const SupplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    addSupplier: (state, action) => {
      state.supplierInfo.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSuppliers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSuppliers.fulfilled, (state, action) => {
      state.loading = false;
      state.supplierInfo = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSuppliers.rejected, (state, action) => {
      state.loading = false;
      state.supplierInfo = [];
      state.error = action.error.message;
    });
  },
});

export default SupplierSlice.reducer;
export const { addSupplier } = SupplierSlice.actions;
