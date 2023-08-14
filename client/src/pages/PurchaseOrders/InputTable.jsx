import React from "react";
import { useState } from "react";
import { TableRow } from "./TableRow";
import * as TbIcons from "react-icons/tb";
import { ArticleModal } from "./ArticleModal";

export const InputTable = (props) => {
  const [tableRowData, setTableRowData] = useState([
    {
      key: 0,
      index: 0,
      article: "",
      description: "",
      brand: "",
      model: "",
      serialNumber: "",
      unit: "",
      quantity: "",
      unitCost: "",
      amount: "",
      totalCost: "",
    },
  ]);
  console.log(tableRowData.article);

  const [editingRowIndex, setEditingRowIndex] = useState(-1);

  const handleAddRow = (newRowData) => {
    const newRow = {
      key: tableRowData.length,
      index: tableRowData.length,
      article: newRowData,
      description: "",
      brand: "",
      model: "",
      serialNumber: "",
      unit: "",
      quantity: "",
      unitCost: "",
      amount: "",
      totalCost: "",
    };
    setTableRowData([...tableRowData, newRow]);
  };

  const handleDeleteRow = (indexToDelete) => {
    setTableRowData((prevRows) =>
      prevRows.filter((row) => row.index !== indexToDelete)
    );
  };

  const handleRowArticleChange = (index, newValue) => {
    setTableRowData((prevRows) => {
      const updatedRows = [...prevRows]; // Create a copy of the array
      updatedRows[index] = { ...updatedRows[index], article: newValue }; // Update the specific row
      return updatedRows; // Return the updated array to setTableRowData
    });
  };

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-blue-100 text-xs">
              <th className="p-2 border">#</th>
              <th className="p-2 border">ARTICLE</th>
              <th className="p-2 border">DESCRIPTION</th>
              <th className="p-2 border">BRAND</th>
              <th className="p-2 border">MODEL</th>
              <th className="p-2 border">SERIAL NO.</th>
              <th className="p-2 border">UNIT</th>
              <th className="p-2 border">QTY</th>
              <th className="p-2 border">UNIT COST</th>
              <th className="p-2 border">AMOUNT</th>
              <th className="p-2 border"></th>
            </tr>
          </thead>
          <tbody>
            {tableRowData.map((row, index) => (
              <TableRow
                key={row.key}
                index={index}
                tableRowData={row}
                onChangeArticle={(newValue) =>
                  handleRowArticleChange(index, newValue)
                }
                setEditingRowIndex={setEditingRowIndex}
                onDelete={handleDeleteRow}
                openArticleDropdown={props.openArticleDropdown}
                setOpenArticleDropdown={props.setOpenArticleDropdown}
              />
            ))}
          </tbody>
        </table>

        {props.openArticleDropdown && (
          <div className="flex justify-start relative">
            <ul
              className={`bg-gray-100 w-48 ml-9 -mt-2 absolute cursor-pointer overflow-y-auto z-10 ${
                props.openArticleDropdown ? "max-h-60" : "max-h-0"
              }`}
            >
              <li
                className="p-2 text-sm hover:bg-sky-100"
                onClick={() => {
                  props.setShowArticleModal(true);
                  props.setOpenArticleDropdown(false);
                }}
              >
                Add new item
              </li>
            </ul>
          </div>
        )}

        <div className="flex justify-between mt-7 ">
          <button className="ml-2 border-2 rounded px-4" onClick={handleAddRow}>
            Add Line
          </button>
          <div className="flex">
            <label className="pr-2">Total Cost</label>
            <TbIcons.TbCurrencyPeso className="text-3xl ml-16" />

            <input className="w-36 text-xl" id="amount" disabled />
          </div>
        </div>
      </div>
      <ArticleModal
        showArticleModal={props.showArticleModal}
        setShowArticleModal={props.setShowArticleModal}
        handleAddRow={handleAddRow}
        onChangeArticle={(newValue) =>
          handleRowArticleChange(editingRowIndex, newValue)
        }
        editingRowIndex={editingRowIndex}
      />
    </>
  );
};
