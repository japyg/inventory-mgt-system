import { configureStore } from "@reduxjs/toolkit";
import supplierReducer from "./pages/Suppliers/SupplierSlice";
import purchaseOrderReducer from "./pages/PurchaseOrders/POSlice";
import thunkMiddleware from "redux-thunk";

export const store = configureStore({
  reducer: {
    supplier: supplierReducer,
    purchaseOrder: purchaseOrderReducer,
  },
  middleware: [thunkMiddleware],
});
