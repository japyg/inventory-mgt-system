import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSuppliers } from "./SupplierSlice";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

export const SuppliersTable = () => {
  const suppliers = useSelector((state) => state.supplier.supplierInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const columns = [
    {
      header: "No.",
      accessorKey: "supplierId",
    },
    {
      header: "Supplier Name",
      accessorKey: "supplierName",
    },
    {
      header: "TIN",
      accessorKey: "supplierTin",
    },
    {
      header: "Address",
      accessorKey: "supplierAddress",
    },
    {
      header: "Tel. Number",
      accessorKey: "telNumber",
    },
    {
      header: "Cel. Number",
      accessorKey: "celNumber",
    },
    {
      header: "Email Address",
      accessorKey: "emailAddress",
    },
  ];

  const table = useReactTable({
    data: suppliers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="ml-24 mt-16 h-full w-11/12 overflow-scroll">
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
