import React, { useState } from "react";
import { POForm } from "./POForm";
import { POTable } from "./POTable";

export const POHome = () => {
  const [showForm, setShowForm] = useState(false);
  const handleOnClose = () => setShowForm(false);
  return (
    <>
      <h1 className="text-center text-3xl mt-5">Purchase Orders</h1>
      <div className="flex justify-end mr-40 mt-6">
        <button
          onClick={() => setShowForm(true)}
          type="submit"
          className="border-solid border-1 border-current rounded p-1 bg-blue-400 px-10 py-2 "
        >
          Create PO
        </button>
      </div>
      <POForm onClose={handleOnClose} visible={showForm} />
      <div>
        <POTable />
      </div>
    </>
  );
};
