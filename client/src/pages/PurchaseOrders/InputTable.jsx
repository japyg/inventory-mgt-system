import React from "react";
import { useState } from "react";
import { TableRow } from "./TableRow";
import * as TbIcons from "react-icons/tb";
import { ArticleModal } from "./ArticleModal";

export const InputTable = (props) => {
  //<---STATES--->
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

  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [openArticleDropdown, setOpenArticleDropdown] = useState(
    Array(tableRowData.length).fill(false)
  );

  const [selectedArticle, setSelectedArticle] = useState(
    Array(tableRowData.length).fill({})
  );
  const [articleSearchQuery, setArticleSearchQuery] = useState(
    Array(tableRowData.length).fill("")
  );

  //<---HANDLER FUNCTIONS--->
  const handleAddRow = (newRowData) => {
    const newRow = {
      key: tableRowData.length,
      index: tableRowData.length,
      article: newRowData.length > 0 ? newRowData : "",
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

  const toggleDropdown = (index) => {
    setOpenArticleDropdown((prevState) => {
      if (!Array.isArray(prevState)) {
        return prevState; // Return the original state if it's not an array
      }

      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };

  return (
    <>
      <div className="w-full overflow-x-auto h-80">
        <table className="table-auto border-collapse w-full ">
          <thead className="sticky top-0 z-10">
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
                setTableRowData={setTableRowData}
                onChangeArticle={handleRowArticleChange}
                setEditingRowIndex={setEditingRowIndex}
                onDelete={handleDeleteRow}
                openArticleDropdown={openArticleDropdown}
                setOpenArticleDropdown={setOpenArticleDropdown}
                toggleDropdown={toggleDropdown}
                editingRowIndex={editingRowIndex}
                setShowArticleModal={props.setShowArticleModal}
                selectedArticle={selectedArticle}
                setSelectedArticle={setSelectedArticle}
                articleSearchQuery={articleSearchQuery}
                setArticleSearchQuery={setArticleSearchQuery}
              />
            ))}
          </tbody>
        </table>

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
        onChangeArticle={handleRowArticleChange}
        editingRowIndex={editingRowIndex}
        articleSearchQuery={articleSearchQuery}
        setArticleSearchQuery={setArticleSearchQuery}
        tableRowData={tableRowData}
      />
    </>
  );
};
