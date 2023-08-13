import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import { useState } from "react";
import { SideBar } from "./SideBar";

export const NavBar = () => {
  const [sideBar, setSidebar] = useState(false);

  const showSideBar = () => setSidebar(!sideBar);
  return (
    <>
      <div className="bg-slate-800 h-20 flex justify-start align-center items-center">
        <Link to="#" className="ml-8 text-2xl">
          <FaIcons.FaBars onClick={showSideBar} className="text-white" />
        </Link>
      </div>
      <nav
        className={`bg-slate-800 w-60 pr-3 h-screen flex justify-center fixed top-0 ${
          sideBar ? "left-0" : "-left-full"
        } duration-500`}
      >
        <ul className="w-full">
          <li className="bg-slate-800 w-full h-20 flex justify-start align-center">
            <Link
              className={`${
                sideBar ? "-left-full" : "left-0"
              } text-white ml-6 text-3xl mt-8 `}
            >
              <AiIcons.AiOutlineClose
                onClick={showSideBar}
                className="text-white"
              />
            </Link>
          </li>
          {SideBar.map((item, index) => {
            return (
              <li
                key={index}
                className="flex justify-start align-center h-14 pl-4 hover:bg-blue-400 mt-2 ml-3 rounded "
              >
                <Link
                  to={item.path}
                  className="text-white text-lg w-full flex items-center  "
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
