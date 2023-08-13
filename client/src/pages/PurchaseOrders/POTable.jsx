import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { fetchPurchaseOrders } from "./POSlice";

export const POTable = () => {
  const poData = useSelector((state) => state.purchaseOrder.purchaseOrderData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPurchaseOrders());
  }, [dispatch]);

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
      header: "Unit",
      accessorKey: "unit",
    },
    {
      header: "Article",
      accessorKey: "article",
    },
    {
      header: "Brand",
      accessorKey: "brand",
    },
    {
      header: "Model",
      accessorKey: "model",
    },
    {
      header: "Serial Number",
      accessorKey: "serialNumber",
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Unit Cost",
      accessorKey: "unitCost",
    },
    {
      header: "Total Cost",
      accessorKey: "totalCost",
    },
  ];

  const table = useReactTable({
    data: poData,
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
