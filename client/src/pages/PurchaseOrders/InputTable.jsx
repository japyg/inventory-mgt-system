import React from "react";
import { useState, useEffect } from "react";
import { TableRow } from "./TableRow";
import * as TbIcons from "react-icons/tb";
import { ArticleModal } from "./ArticleModal";
import { useDispatch, useSelector } from "react-redux";

export const InputTable = (props) => {
  const dispatch = useDispatch();
  //<---STATES--->
  const tableData = useSelector((state) => state.tableRowData.tableRowDataInfo);

  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [openArticleDropdown, setOpenArticleDropdown] = useState(
    Array(props.tableRowData.length).fill(false)
  );

  // const [selectedArticle, setSelectedArticle] = useState(
  //   Array(props.tableRowData.length).fill({})
  // );
  const [articleSearchQuery, setArticleSearchQuery] = useState(
    Array(props.tableRowData.length).fill("")
  );

  const generateKey =
    props.tableRowData.length > 0
      ? Number(props.tableRowData[props.tableRowData.length - 1].key) + 1
      : 1;

  //<---HANDLER FUNCTIONS--->
  const handleAddRow = (event, newRowData) => {
    event.preventDefault();
    const newRow = {
      key: generateKey,
      index: generateKey,
      article: "",
      description: "",
      brand: "",
      model: "",
      serialNumber: "",
      unit: "pc",
      quantity: 0,
      unitCost: 0,
      amount: 0,
    };
    props.setTableRowData([...props.tableRowData, newRow]);
    setArticleSearchQuery([...articleSearchQuery, ""]);
  };

  const handleDeleteRow = (indexToDelete) => {
    props.setTableRowData((prevRows) =>
      prevRows.filter((row) => row.index !== indexToDelete)
    );
  };

  const handleRowArticleChange = (index, newValue) => {
    props.setTableRowData((prevRows) => {
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
            {props.tableRowData.map((row, index) => (
              <TableRow
                key={row.key}
                index={index}
                tableRowData={row}
                tableData={props.tableRowData}
                setTableRowData={props.setTableRowData}
                onChangeArticle={handleRowArticleChange}
                setEditingRowIndex={setEditingRowIndex}
                onDelete={handleDeleteRow}
                openArticleDropdown={openArticleDropdown}
                setOpenArticleDropdown={setOpenArticleDropdown}
                toggleDropdown={toggleDropdown}
                editingRowIndex={editingRowIndex}
                setShowArticleModal={props.setShowArticleModal}
                selectedArticle={props.selectedArticle}
                setSelectedArticle={props.setSelectedArticle}
                articleSearchQuery={articleSearchQuery}
                setArticleSearchQuery={setArticleSearchQuery}
                poValues={props.poValues}
                setPoValues={props.setPoValues}
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

            <input
              value={props.poValues.totalCost}
              className="w-36 text-xl"
              id="amount"
              disabled
            />
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
        tableRowData={props.tableRowData}
      />
    </>
  );
};
