import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SuppliersTable } from "./SuppliersTable";

export const SuppliersHome = () => {
  const suppliers = useSelector((state) => state.supplier);

  return (
    <div>
      <h1 className="text-center text-3xl mt-5">Suppliers</h1>
      <SuppliersTable />
    </div>
  );
};
