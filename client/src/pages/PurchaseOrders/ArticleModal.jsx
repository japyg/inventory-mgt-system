import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";
import { useSelector } from "react-redux";

export const ArticleModal = (props) => {
  const [newArticle, setNewArticle] = useState("");

  const handleCloseModal = () => {
    props.setShowArticleModal(false);
  };

  const handleArticleInputChange = (e) => {
    setNewArticle(e.target.value);
  };

  const addNewArticle = () => {
    props.onChangeArticle(props.editingRowIndex, newArticle);
    setNewArticle("");
    props.setShowArticleModal(false);
  };

  if (!props.showArticleModal) return null;
  return (
    <div>
      <div className="border-2 fixed inset-0 backdrop-brightness-50 backdrop-contrast-125 flex justify-center items-center">
        <div className="border-2 w-2/6 h-40 bg-white">
          <div className="flex justify-end">
            <AiIcons.AiOutlineClose
              onClick={handleCloseModal}
              className="cursor-pointer"
            />
          </div>
          <div className="flex justify-center mt-2 text-lg mb-4">
            Add New Article
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              className="border-2 w-4/5"
              value={newArticle}
              onChange={handleArticleInputChange}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              className="border-2 mt-5 px-3 rounded bg-blue-300"
              onClick={addNewArticle}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
