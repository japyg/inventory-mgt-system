import React, { useRef } from "react";
import { useState, useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import * as TbIcons from "react-icons/tb";
import * as IoIcons from "react-icons/io";
import { SuppliersModal } from "../Suppliers/SuppliersModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchSuppliers } from "../Suppliers/SupplierSlice";
import { addPurchaseOrder } from "./POSlice";
import Axios from "axios";
import { InputTable } from "./InputTable";
import { ArticleModal } from "./ArticleModal";

export const POForm = (props) => {
  //PO Form States
  const [poValues, setPoValues] = useState({
    poNumber: "",
    poDate: "",
    fundCluster: "fund101",
    procMode: "shopping",
    unit: "",
    article: [],
    brand: "",
    model: "",
    serialNumber: "",
    quantity: "",
    unitCost: "",
    totalCost: 0,
  });

  const suppliers = useSelector((state) => state.supplier.supplierInfo);

  const dispatch = useDispatch();

  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [openSupplierDropDown, setOpenSupplierDropDown] = useState(false);
  const [openArticleDropdown, setOpenArticleDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const handleOnClose = () => setShowSupplierModal(false);

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setOpenSupplierDropDown(false);
    }
  };

  //DATA FORMATTING
  const calculateTotalCost = () => {
    const totalCost =
      parseFloat(poValues.quantity) * parseFloat(poValues.unitCost);
    return totalCost.toFixed(2);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleCostChange = (fieldName, value) => {
    setPoValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleBlur = () => {
    if (poValues.quantity && poValues.unitCost) {
      const newTotalCost = calculateTotalCost();
      setPoValues((prevValues) => ({
        ...prevValues,
        totalCost: newTotalCost,
      }));
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatPoNum = (poNum) => {
    poNum = poNum.replace(/-/g, ""); // Remove existing dashes
    if (poNum.length > 4) poNum = poNum.slice(0, 4) + "-" + poNum.slice(4);
    if (poNum.length > 7) poNum = poNum.slice(0, 7) + "-" + poNum.slice(7);
    return poNum;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    setSelectedSupplier(null);
    setOpenSupplierDropDown(!!inputValue); // Open dropdown when the input is not empty or a supplier is selected
  };

  const handleSelectSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setSearchQuery(supplier.supplierName); // Set searchQuery to display selected supplier name
    setOpenSupplierDropDown(false);
  };

  // Filter suppliers based on the search query
  const filteredSuppliers = suppliers.filter((supplier) => {
    return (
      !searchQuery || // Show all suppliers when search query is empty
      supplier.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  //Sort alphabetically in the dropdown menu
  const sortedSuppliers = filteredSuppliers.sort((a, b) => {
    return a.supplierName.localeCompare(b.supplierName);
  });

  if (!props.visible) return null;

  const handleNewSupplierData = (newSupplierData) => {
    setSelectedSupplier(newSupplierData);
    setSearchQuery(newSupplierData.supplierName);
  };

  const addNewPo = () => {
    dispatch(
      addPurchaseOrder({
        supplierName: selectedSupplier.supplierName,
        supplierTin: selectedSupplier.supplierTin,
        supplierAddress: selectedSupplier.supplierAddress,
        poNumber: poValues.poNumber,
        poDate: poValues.poDate,
        fundCluster: poValues.fundCluster,
        procMode: poValues.procMode,
        unit: poValues.unit,
        article: poValues.article,
        brand: poValues.brand,
        model: poValues.model,
        serialNumber: poValues.serialNumber,
        quantity: poValues.quantity,
        unitCost: poValues.unitCost,
        totalCost: poValues.totalCost,
      })
    );

    setPoValues({
      poNumber: "",
      poDate: "",
      supplierName: selectedSupplier.supplierName,
      fundCluster: "fund101",
      procMode: "shopping",
      unit: "",
      article: "",
      brand: "",
      model: "",
      serialNumber: "",
      quantity: 0,
      unitCost: 0.0,
      totalCost: 0.0,
    });

    Axios.post("http://localhost:3000/api/postPO", {
      supplierId: selectedSupplier.supplierId,
      poNumber: poValues.poNumber,
      poDate: poValues.poDate,
      fundCluster: poValues.fundCluster,
      procMode: poValues.procMode,
      unit: poValues.unit,
      article: poValues.article,
      brand: poValues.brand,
      model: poValues.model,
      serialNumber: poValues.serialNumber,
      quantity: poValues.quantity,
      unitCost: poValues.unitCost,
      totalCost: poValues.totalCost,
    }).then(() => {
      alert("Supplier added succesfully!");
    });
  };

  return (
    <div className="fixed inset-0 bg-white">
      <div className="flex inset-0 flex justify-between pt-4 h-12 relative w-full px-5">
        <div className="text-2xl font-bold ml-5">Purchase Order</div>
        <AiIcons.AiOutlineClose
          onClick={props.onClose}
          className="text-black text-3xl cursor-pointer"
        />
      </div>

      <form
        className="mx-10 h-3/4 mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          addNewPo();
          props.onClose();
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex-wrap w-72 " ref={dropdownRef}>
            <label htmlFor="supplierName" className="mb-1">
              Supplier Name
            </label>
            <div className="flex relative">
              <input
                type="text"
                id="supplierName"
                placeholder="Choose a supplier"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => setOpenSupplierDropDown(true)}
                className={`border-2 w-full cursor-pointer`}
                ref={inputRef}
              />
              <i className="absolute right-3 ">
                <IoIcons.IoMdArrowDropdown
                  size={28}
                  className=""
                  onClick={() => setOpenSupplierDropDown(!openSupplierDropDown)}
                />
              </i>
            </div>

            {openSupplierDropDown && (
              <div className="flex justify-start relative">
                <ul
                  className={`bg-gray-100 w-64 absolute cursor-pointer overflow-y-auto z-10 ${
                    openSupplierDropDown ? "max-h-60" : "max-h-0"
                  }`}
                >
                  <li
                    className="p-2 text-sm hover:bg-sky-100"
                    onClick={() => {
                      setShowSupplierModal(true);
                      setOpenSupplierDropDown(false);
                    }}
                  >
                    Add new supplier
                  </li>

                  {sortedSuppliers.map((supplier) => {
                    return (
                      <li
                        key={supplier.supplierId}
                        className={`p-2 text-sm hover:bg-sky-100`}
                        onClick={() => handleSelectSupplier(supplier)}
                      >
                        {supplier.supplierName}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <div className="flex-wrap">
            <label>Balance Due</label>
            <div className="flex content-center text-3xl">
              <TbIcons.TbCurrencyPeso />
              <div className="mr-4">{poValues.totalCost}</div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-between w-11/12">
          <div className="flex-wrap w-52">
            <label>Supplier Address</label>
            <textarea
              className="border-2"
              id="supplierAddress"
              value={selectedSupplier?.supplierAddress || ""}
              disabled
            ></textarea>
          </div>
          <div className="flex-wrap w-48">
            <label>TIN</label>
            <input
              className="border-2"
              id="tin"
              disabled
              value={selectedSupplier?.supplierTin || ""}
            />
          </div>
          <div className="flex-wrap w-48">
            <label>PO Date</label>
            <input
              type="date"
              className="border-2"
              id="poDate"
              value={poValues.poDate || getCurrentDate()}
              onChange={(e) =>
                setPoValues({ ...poValues, poDate: e.target.value })
              }
            />
          </div>
          <div className="flex-wrap w-48">
            <label>PO Number</label>
            <input
              type="text"
              className="border-2"
              id="poNumber"
              value={formatPoNum(poValues.poNumber)}
              onChange={(e) =>
                setPoValues({ ...poValues, poNumber: e.target.value })
              }
              required
              maxLength={11}
              title="Enter a valid PO Number  in the format XXXX-XX-XXX"
            />
          </div>
          <div className="flex-wrap w-36">
            <label>Fund Cluster</label>
            <select
              className="border-2 w-36"
              id="fundCluster"
              value={poValues.fundCluster}
              onChange={(e) => {
                setPoValues({ ...poValues, fundCluster: e.target.value });
              }}
            >
              <option value="fund101">Fund 101</option>
              <option value="fund151">Fund 151</option>
            </select>
          </div>
          <div className="flex-wrap w-36">
            <label>Procurement Mode</label>
            <select
              className="border-2 w-36"
              id="procurementMode"
              value={poValues.procMode}
              onChange={(e) =>
                setPoValues({ ...poValues, procMode: e.target.value })
              }
            >
              <option value="shopping">Shopping</option>
              <option value="smallValue">Small Value</option>
            </select>
          </div>
        </div>
        <div className="mt-10">
          {/* <h1>DESCRIPTION</h1> */}
          {/* <div className="flex  "> */}
          <div>
            <InputTable
              openArticleDropdown={openArticleDropdown}
              setOpenArticleDropdown={setOpenArticleDropdown}
              setShowArticleModal={setShowArticleModal}
              showArticleModal={showArticleModal}
            />
          </div>

          {/* <div className="flex-wrap w-52 mr-8">
              <label>Article</label>
              <textarea
                className="border-2"
                id="article"
                value={poValues.article}
                onChange={(e) =>
                  setPoValues({ ...poValues, article: e.target.value })
                }
              ></textarea>
            </div> */}
          {/* <div className="flex-wrap w-52 mr-4">
              <label>Brand</label>
              <input
                className="border-2"
                id="brand"
                value={poValues.brand}
                onChange={(e) =>
                  setPoValues({ ...poValues, brand: e.target.value })
                }
              />
            </div> */}
          {/* <div className="flex-wrap w-52 mr-5">
              <label>Model</label>
              <input
                className="border-2"
                id="model"
                value={poValues.model}
                onChange={(e) =>
                  setPoValues({ ...poValues, model: e.target.value })
                }
              />
            </div> */}
          {/* <div className="flex-wrap w-52 ">
              <label>Serial Number</label>
              <input
                className="border-2"
                id="serialNumber"
                value={poValues.serialNumber}
                onChange={(e) =>
                  setPoValues({ ...poValues, serialNumber: e.target.value })
                }
              />
            </div> */}
          {/* </div> */}
        </div>
        {/* <div className=" flex justify-end w-11/12 ">
          <div className="flex-wrap w-20 ">
            <label>Unit</label>
            <input
              className="border-2 w-16"
              id="unit"
              value={poValues.unit}
              onChange={(e) =>
                setPoValues({ ...poValues, unit: e.target.value })
              }
            />
          </div>
          <div className="flex-wrap w-20 ml-6">
            <label>Quantity</label>
            <input
              className="border-2 w-16"
              id="quantity"
              value={poValues.quantity}
              onChange={(e) => handleCostChange("quantity", e.target.value)}
              onBlur={handleBlur}
            />
          </div>
          <div className="flex-wrap w-36 ml-6">
            <label>Unit Cost</label>
            <input
              className="border-2 w-36"
              id="unitCost"
              value={poValues.u}
              onChange={(e) => handleCostChange("unitCost", e.target.value)}
              onBlur={handleBlur}
            />
          </div>
        </div> */}
        {/* <div className="flex justify-end w-11/12 mt-10">
          <div className="flex mr-18">
            <label className="pr-2">Total Cost</label>
            <TbIcons.TbCurrencyPeso className="text-3xl ml-24" />

            <input
              className="w-36 text-xl"
              id="totalCost"
              value={poValues.totalCost}
              disabled
            />
          </div>
        </div> */}
        <div className="flex justify-end w-11/12 mt-16 ">
          <input
            type="submit"
            className="bg-blue-500 border-2 rounded p-1 px-4 bg"
          />
        </div>
      </form>
      <SuppliersModal
        onClose={handleOnClose}
        visible={showSupplierModal}
        setOpenSupplierDropDown={setOpenSupplierDropDown}
        handleNewSupplierData={handleNewSupplierData}
        setSelectedSupplier={setSelectedSupplier}
      />
      <ArticleModal
        showArticleModal={showArticleModal}
        setShowArticleModal={setShowArticleModal}
      />
    </div>
  );
};
