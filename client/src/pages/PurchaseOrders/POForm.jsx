import React, { useRef } from "react";
import { useState, useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import * as TbIcons from "react-icons/tb";
import * as IoIcons from "react-icons/io";
import { SuppliersModal } from "../Suppliers/SuppliersModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchSuppliers } from "../Suppliers/SupplierSlice";
import { fetchArticles } from "./ArticleSlice";
import { addPurchaseOrder } from "./POSlice";
import Axios from "axios";
import { InputTable } from "./InputTable";
import { addTableRowData } from "./TableRowSlice";

export const POForm = (props) => {
  //PO Form States
  const [tableRowData, setTableRowData] = useState([
    {
      key: 0,
      index: 0,
      articleName: "",
      description: "",
      brand: "",
      model: "",
      serialNumber: "",
      unit: "pc",
      quantity: 0,
      unitCost: 0,
      amount: 0,
    },
  ]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Add 1 because months are 0-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [poValues, setPoValues] = useState({
    poNumber: "",
    supplierName: "",
    supplierAddress: "",
    supplierTin: "",
    poDate: getCurrentDate(),
    fundCluster: "fund101",
    procMode: "shopping",
    unit: "",
    totalCost: 0,
    articleId: [],
  });

  const suppliers = useSelector((state) => state.supplier.supplierInfo);

  const dispatch = useDispatch();

  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedArticle, setSelectedArticle] = useState(
    Array(tableRowData.length).fill({})
  );

  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [openSupplierDropDown, setOpenSupplierDropDown] = useState(false);
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

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
    dispatch(addTableRowData(tableRowData));
    dispatch(
      addPurchaseOrder({
        poNumber: poValues.poNumber,
        poDate: poValues.poDate,
        fundCluster: poValues.fundCluster,
        procMode: poValues.procMode,
        totalCost: poValues.totalCost,
      })
    );
    setPoValues({
      poNumber: "",
      poDate: "",
      supplierName: "",
      fundCluster: "fund101",
      procMode: "shopping",
      totalCost: 0.0,
      tableRowData: [],
    });

    const promises = tableRowData.map((row, index) => {
      return Axios.post("http://localhost:3000/api/postTableRowData", {
        tableKey: row.key,
        poNumber: poValues.poNumber,
        articleId: selectedArticle[index].articleId, // Access the articleId for the current row
        description: row.description,
        brand: row.brand,
        model: row.model,
        serialNumber: row.serialNumber,
        unit: row.unit,
        quantity: row.quantity,
        unitCost: row.unitCost,
        amount: row.amount,
      });
    });

    Promise.all(promises)
      .then(() => {
        alert("Data from table added successfully!");
      })
      .catch((error) => {
        console.error("Error adding data to the table:", error);
      });

    Axios.post("http://localhost:3000/api/postPO", {
      poNumber: poValues.poNumber,
      supplierId: selectedSupplier.supplierId,
      poDate: poValues.poDate,
      fundCluster: poValues.fundCluster,
      procMode: poValues.procMode,
      totalCost: poValues.totalCost,
    }).then(() => {
      alert("PO added succesfully!");
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
              <div className="flex justify-start relative z-20">
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
              onChange={(e) => {
                setPoValues({ ...poValues, poNumber: e.target.value });
              }}
              required
              maxLength={11}
              title="Enter a valid PO Number in the format XXXX-XX-XXX"
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
          <InputTable
            setShowArticleModal={setShowArticleModal}
            showArticleModal={showArticleModal}
            poValues={poValues}
            setPoValues={setPoValues}
            tableRowData={tableRowData}
            setTableRowData={setTableRowData}
            selectedArticle={selectedArticle}
            setSelectedArticle={setSelectedArticle}
          />
        </div>

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
    </div>
  );
};
