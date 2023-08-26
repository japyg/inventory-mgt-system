import React, { useState, useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { addSupplier } from "./SupplierSlice";
import Axios from "axios";

export const SuppliersModal = (props) => {
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newSupplierAddress, setNewSupplierAddress] = useState("");
  const [newSupplierTin, setNewSupplierTin] = useState("");
  const [newTelNumber, setNewTelNumber] = useState("");
  const [newCelNumber, setNewCelNumber] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const suppliers = useSelector((state) => state.supplier.supplierInfo);

  const dispatch = useDispatch();

  const generateSupplierID =
    suppliers.length > 0
      ? Number(suppliers[suppliers.length - 1].supplierId) + 1
      : 1;

  // Helper function to format the TIN input with dashes
  const formatTIN = (tin) => {
    tin = tin.replace(/-/g, ""); // Remove existing dashes
    if (tin.length > 3) tin = tin.slice(0, 3) + "-" + tin.slice(3);
    if (tin.length > 7) tin = tin.slice(0, 7) + "-" + tin.slice(7);
    if (tin.length > 11) tin = tin.slice(0, 11) + "-" + tin.slice(11);
    return tin;
  };

  // Function to handle adding a new item
  const addNewSupplier = () => {
    dispatch(
      addSupplier({
        supplierId: generateSupplierID,
        supplierName: newSupplierName,
        supplierTin: newSupplierTin,
        supplierAddress: newSupplierAddress,
        telNumber: newTelNumber,
        celNumber: newCelNumber,
        emailAddress: newEmail,
      })
    );

    const newSupplierData = {
      supplierName: newSupplierName,
      supplierTin: newSupplierTin,
      supplierAddress: newSupplierAddress,
      telNumber: newTelNumber,
      celNumber: newCelNumber,
      emailAddress: newEmail,
    };

    props.handleNewSupplierData(newSupplierData);

    setNewSupplierName("");
    setNewSupplierAddress("");
    setNewSupplierTin("");
    setNewTelNumber("");
    setNewCelNumber("");
    setNewEmail("");

    //send data to back-end
    Axios.post("http://localhost:3000/api/postSupplier", {
      supplierId: generateSupplierID,
      supplierName: newSupplierName,
      supplierAddress: newSupplierAddress,
      supplierTin: newSupplierTin,
      telNumber: newTelNumber,
      celNumber: newCelNumber,
      emailAddress: newEmail,
    }).then(() => {
      alert("Supplier added succesfully!");
    });
  };

  if (!props.visible) return null;
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewSupplier();
          props.onClose();
          props.setOpenDropDown(false);
        }}
        className="border-2 fixed inset-0 backdrop-brightness-50 backdrop-contrast-125 flex justify-center items-center z-20"
      >
        <div className="border-2 w-2/5 max-h-max bg-white">
          <div className="flex justify-end">
            <AiIcons.AiOutlineClose
              onClick={props.onClose}
              className="cursor-pointer"
            />
          </div>
          <div className="flex justify-center mt-5 text-lg mb-4">
            Add A Supplier
          </div>
          <div className="flex justify-around">
            <label>Supplier Name:</label>
            <input
              type="text"
              className="border-2 w-1/2"
              value={newSupplierName}
              onChange={(e) => setNewSupplierName(e.target.value)}
              required
              pattern="^[a-zA-Z0-9\s]+$"
              title="Only letters and numbers are allowed"
            />
          </div>

          <div className="mt-3 flex justify-around">
            <label className="w-24 mr-4">TIN:</label>
            <input
              type="text"
              className="border-2 w-1/2"
              value={formatTIN(newSupplierTin)}
              onChange={(e) => setNewSupplierTin(e.target.value)}
              required
              maxLength={15}
              title="Enter a valid TIN in the format XXX-XXX-XXX-XXX"
            />
          </div>
          <div className="mt-3 flex justify-around">
            <label className="ml-2">Supplier Address:</label>
            <textarea
              type="text"
              className="border-2 w-1/2 mr-2 h-20 resize-none"
              value={newSupplierAddress}
              onChange={(e) => setNewSupplierAddress(e.target.value)}
              required
              pattern="^[a-zA-Z0-9]+$"
              title="Only letters and numbers are allowed"
            />
          </div>
          <div className="mt-3 flex justify-around">
            <label className="w-24 mr-4">Tel. Number:</label>
            <input
              type="text"
              className="border-2 w-1/2"
              value={newTelNumber}
              onChange={(e) => setNewTelNumber(e.target.value)}
              maxLength={10}
              pattern="^[\d]{10}$"
            />
          </div>
          <div className="mt-3 flex justify-around ">
            <label className="w-24 mr-4">Cel. Number:</label>
            <input
              type="text"
              className="border-2 w-1/2 "
              value={newCelNumber}
              onChange={(e) => setNewCelNumber(e.target.value)}
              maxLength={11}
              pattern="^[\d]{11}$"
              title="Please enter a valid cellular number"
            />
          </div>
          <div className="mt-3 flex justify-around">
            <label className="w-24 mr-4">Email:</label>
            <input
              type="email"
              className="border-2 w-1/2"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div className="mt-8 flex justify-around mx-28 ">
            <button className="border-2 rounded px-3 py-1 bg-blue-300 mb-4">
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
