import React, { useState } from "react";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io";

export const TableRow = ({
  index,
  onDelete,
  openArticleDropdown,
  setOpenArticleDropdown,
}) => {
  const handleDeleteRow = () => {
    onDelete(index);
  };

  return (
    <>
      <tr className="hover:bg-gray-100 hover:shadow-sm">
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap ">
          {index + 1}
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap relative">
          <input className="border-2 h-8 w-full pr-10 pl-3 cursor-pointer" />
          <i>
            <IoIcons.IoMdArrowDropdown
              className="absolute right-3 top-3 text-2xl cursor-pointer"
              onClick={() => setOpenArticleDropdown(!openArticleDropdown)}
            />
          </i>
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap flex ">
          <textarea className="border-2 h-8 resize-none overflow-y-visible" />
        </td>
        <td className="p-2 border resize-horizontal overflow-hidden whitespace-nowrap">
          <input className="border-2 w-full h-8" />
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
          <BiIcons.BiTrash className="text-3xl" onClick={handleDeleteRow} />
        </td>
      </tr>
    </>
  );
};
