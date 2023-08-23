import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io";

export const TableRow = (props) => {
  const articles = useSelector((state) => state.article.articleInfo);
  console.log(articles);
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
            value={props.tableRowData.article}
            onChange={(e) => props.onChangeArticle(props.index, e.target.value)}
            onClick={() => {
              props.toggleDropdown(props.index);
              props.setEditingRowIndex(props.index);
            }}
          />
          <i onClick={() => props.toggleDropdown(props.index)}>
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
                  {articles.map((article, index) => {
                    return (
                      <li
                        key={index}
                        className="ml-2 pt-2 text-sm hover:bg-sky-100"
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
          <textarea className="border-2 h-8 resize-none" />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap">
          <input className="border-2 w-full h-8 resize-none" />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap">
          <input className="border-2 h-8 w-full" />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap">
          <input className="border-2 h-8 w-32" />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap">
          <input className="border-2 w-14  h-8 " />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap">
          <input className="border-2 w-14 h-8" />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap">
          <input className="border-2 w-24 h-8" />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap">
          <input className="border-2 w-32 h-8" />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap ">
          <BiIcons.BiTrash className="text-xl" onClick={handleDeleteRow} />
        </td>
      </tr>
    </>
  );
};
