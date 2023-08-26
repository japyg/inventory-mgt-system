import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io";

export const TableRow = (props) => {
  const articles = useSelector((state) => state.article.articleInfo);
  // console.log(articles);
  const handleSelectedArticle = (article) => {
    props.setSelectedArticle((prevSelected) => {
      const updatedSelected = [...prevSelected];
      updatedSelected[props.index] = article;
      return updatedSelected;
    });

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
