import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { fetchPurchaseOrders } from "./POSlice";
import { fetchSuppliers } from "../Suppliers/SupplierSlice";

export const POTable = () => {
  const poData = useSelector((state) => state.purchaseOrder.purchaseOrderData);
  const suppliers = useSelector((state) => state.supplier.supplierInfo);
  const suppliersLoading = useSelector((state) => state.supplier.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPurchaseOrders());
  }, [dispatch]);

  const transformedPoData = useMemo(() => {
    // Create a mapping from supplierId to supplierName
    const supplierMapping = {};
    suppliers.forEach((supplier) => {
      supplierMapping[supplier.supplierId] = supplier.supplierName;
    });

    // Transform poData, replacing supplierId with supplierName
    return poData.map((po) => ({
      ...po,
      supplierName: supplierMapping[po.supplierId],
    }));
  }, [poData, suppliers]);

  const columns = [
    {
      header: "PO Number",
      accessorKey: "poNumber",
    },
    {
      header: "PO Date",
      accessorKey: "poDate",
    },
    {
      header: "Supplier Name",
      accessorKey: "supplierName",
    },
    {
      header: "Fund Cluster",
      accessorKey: "fundCluster",
    },
    {
      header: "Procurement Mode",
      accessorKey: "procMode",
    },

    {
      header: "Total Cost",
      accessorKey: "totalCost",
    },
  ];

  const table = useReactTable({
    data: transformedPoData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="ml-15 mt-16 h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-blue-100 bg-blue-50 p-4 leading-none "
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="even:bg-slate-200">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
