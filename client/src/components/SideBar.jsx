import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";

export const SideBar = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Purchase Orders",
    path: "/purchase-orders",
    icon: <FaIcons.FaCartPlus />,
  },
  {
    title: "IARs",
    path: "/IARs",
    icon: <FcIcons.FcInspection />,
  },
  {
    title: "Suppliers",
    path: "/suppliers",
    icon: <AiIcons.AiFillShop />,
  },
];
