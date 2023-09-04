import { configureStore } from "@reduxjs/toolkit";
import supplierReducer from "./pages/Suppliers/SupplierSlice";
import purchaseOrderReducer from "./pages/PurchaseOrders/POSlice";
import articleReducer from "./pages/PurchaseOrders/ArticleSlice";
import thunkMiddleware from "redux-thunk";
import tableRowSliceReducer from "./pages/PurchaseOrders/TableRowSlice";

export const store = configureStore({
  reducer: {
    supplier: supplierReducer,
    purchaseOrder: purchaseOrderReducer,
    article: articleReducer,
    tableRowData: tableRowSliceReducer,
  },
  middleware: [thunkMiddleware],
});
