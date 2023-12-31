import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io";
import { addTableRowData } from "./TableRowSlice";

export const TableRow = (props) => {
  const articles = useSelector((state) => state.article.articleInfo);

  const handleSelectedArticle = (article) => {
    props.setSelectedArticle((prevSelected) => {
      const updatedSelected = [...prevSelected];
      updatedSelected[props.index] = article;
      return updatedSelected;
    });

    //assign selected article name to the tableRow data state
    props.tableRowData.article = article.articleName;

    props.setArticleSearchQuery((prevSearch) => {
      const updatedSearch = [...prevSearch];
      updatedSearch[props.index] = article.articleName;
      return updatedSearch;
    });

    props.toggleDropdown(props.index);
  };

  const handleArticleInputChange = (index, e) => {
    const inputValue = e.target.value;

    props.setArticleSearchQuery((prevSearch) => {
      const updatedSearch = [...prevSearch];
      updatedSearch[index] = inputValue;
      return updatedSearch;
    });

    props.setSelectedArticle((prevSelected) => {
      const updatedSelected = [...prevSelected];
      updatedSelected[index] = null;
      return updatedSelected;
    });
  };

  const filteredArticles = articles.filter((article) => {
    const searchQueries = props.articleSearchQuery || [];

    return (
      searchQueries.length === 0 || // If no search queries are provided, return true for all articles
      searchQueries.some((query) =>
        article.articleName.toLowerCase().includes(query.toLowerCase())
      )
    );
  });

  const sortedArticles = filteredArticles.sort((a, b) => {
    return a.articleName.localeCompare(b.articleName);
  });

  const handleDeleteRow = () => {
    props.onDelete(props.index);
  };

  const dropdownArticleRef = useRef(null);
  const inputArticleRef = useRef(null);

  const handleClickOutsideArticle = (event) => {
    if (
      dropdownArticleRef.current &&
      !dropdownArticleRef.current.contains(event.target)
    ) {
      props.setOpenArticleDropdown((prevState) => {
        const updatedState = [...prevState];
        updatedState[props.index] = false;
        return updatedState;
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideArticle);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideArticle);
    };
  }, []);

  //function for Description
  const updateDescription = (index, description) => {
    props.setTableRowData((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], description: description };
      return updatedRows;
    });
  };

  //function for Brand
  const updateBrand = (index, brand) => {
    props.setTableRowData((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], brand: brand };
      return updatedRows;
    });
  };

  // Set the current row index when a row is focused or selected
  const setCurrentRow = (index) => {
    setCurrentRowIndex(index);
  };

  //function for Model
  const updateModel = (index, model) => {
    props.setTableRowData((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], model: model };
      return updatedRows;
    });
  };

  //function for Serial Number
  const updateSerialNumber = (index, serialNumber) => {
    props.setTableRowData((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = {
        ...updatedRows[index],
        serialNumber: serialNumber,
      };
      return updatedRows;
    });
  };
  //function for Unit
  const updateUnit = (index, unit) => {
    props.setTableRowData((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = {
        ...updatedRows[index],
        unit: unit,
      };
      return updatedRows;
    });
  };

  //function for Quantity
  const updateQuantity = (index, qty) => {
    props.setTableRowData((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = {
        ...updatedRows[index],
        quantity: qty,
      };
      const quantity = parseFloat(qty);
      const unitCost = updatedRows[index].unitCost;

      if (!isNaN(quantity) && !isNaN(unitCost)) {
        updatedRows[index].amount = (quantity * unitCost).toFixed(2);
      } else {
        updatedRows[index].amount = 0.0; // Reset the amount if either quantity or unit cost is not a number
      }

      return updatedRows;
    });
  };

  const updateUnitCost = (index, unitCost) => {
    props.setTableRowData((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = {
        ...updatedRows[index],
        unitCost: unitCost,
      };
      const quantity = parseFloat(updatedRows[index].quantity);
      const unitCostValue = unitCost;

      if (!isNaN(quantity) && !isNaN(unitCostValue)) {
        updatedRows[index].amount = (quantity * unitCostValue).toFixed(2);
      } else {
        updatedRows[index].amount = 0; // Reset the amount if either quantity or unit cost is not a number
      }

      return updatedRows;
    });
  };

  //Calculate Total Cost
  const calculateTotalCost = () => {
    const total = props.tableData.reduce((acc, row) => {
      return acc + parseFloat(row.amount);
    }, 0);
    return total.toFixed(2);
  };
  useEffect(() => {
    const totalCost = calculateTotalCost();
    props.setPoValues((prevPoValues) => ({
      ...prevPoValues,
      totalCost: totalCost,
    }));
  }, [props.tableData]);

  //<---DATA FORMATTING--->

  return (
    <>
      <tr className="hover:bg-gray-100 hover:shadow-sm ">
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap ">
          {props.index + 1}
        </td>
        <td
          className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap relative"
          ref={dropdownArticleRef}
        >
          <input
            className="border-2 h-8 w-full pr-10 pl-3 cursor-pointer"
            value={props.articleSearchQuery[props.index] || ""}
            onChange={(e) => handleArticleInputChange(props.index, e)}
            onClick={() => {
              props.toggleDropdown(props.index);
              props.setEditingRowIndex(props.index);
            }}
          />
          <i onClick={(e) => props.toggleDropdown(props.index, e)}>
            <IoIcons.IoMdArrowDropdown
              className="absolute right-3 top-3 text-2xl cursor-pointer"
              onClick={() => {
                props.setEditingRowIndex(props.index);
              }}
            />
          </i>
          <div>
            {props.openArticleDropdown[props.index] && (
              <div
                className={`flex justify-start relative`}
                ref={inputArticleRef}
              >
                <ul
                  className={`bg-gray-100 w-44 mt-0 fixed cursor-pointer overflow-y-scroll z-20 ${
                    props.openArticleDropdown[props.index]
                      ? "max-h-60"
                      : "max-h-0 hidden"
                  }`}
                >
                  <li
                    className="ml-2 pt-2 text-sm hover:bg-sky-100"
                    onClick={() => {
                      props.setShowArticleModal(true);
                      props.toggleDropdown(props.index);
                    }}
                  >
                    Add new item
                  </li>
                  {sortedArticles.map((article) => {
                    return (
                      <li
                        key={article.articleId}
                        className="ml-2 pt-2 text-sm hover:bg-sky-100"
                        onClick={() => handleSelectedArticle(article)}
                      >
                        {article.articleName}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </td>

        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap flex ">
          <textarea
            value={props.tableRowData.description}
            onChange={(e) => updateDescription(props.index, e.target.value)}
            className="border-2 h-8 resize-none"
          />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap">
          <input
            value={props.tableRowData.brand}
            onChange={(e) => updateBrand(props.index, e.target.value)}
            className="border-2 w-full h-8 resize-none"
          />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap">
          <input
            value={props.tableRowData.model}
            onChange={(e) => updateModel(props.index, e.target.value)}
            className="border-2 h-8 w-full"
          />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap">
          <input
            value={props.tableRowData.serialNumber}
            onChange={(e) => updateSerialNumber(props.index, e.target.value)}
            className="border-2 h-8 w-32"
          />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap">
          <select
            value={props.tableRowData.unit}
            onChange={(e) => updateUnit(props.index, e.target.value)}
            className="border-2 w-14  h-8 "
          >
            <option>pc</option>
            <option>box</option>
            <option>pack</option>
          </select>
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap">
          <input
            type="number"
            value={props.tableRowData.quantity}
            onChange={(e) => updateQuantity(props.index, e.target.value)}
            className="border-2 w-14 h-8"
          />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap">
          <input
            type="number"
            value={props.tableRowData.unitCost}
            onChange={(e) => updateUnitCost(props.index, e.target.value)}
            className="border-2 w-24 h-8"
          />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap">
          <input
            value={props.tableRowData.amount}
            placeholder="0.00"
            disabled
            className="border-2 w-32 h-8"
          />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap ">
          <BiIcons.BiTrash className="text-xl" onClick={handleDeleteRow} />
        </td>
      </tr>
    </>
  );
};
