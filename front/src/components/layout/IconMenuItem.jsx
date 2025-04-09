import React from "react";
import { NavLink } from "react-router-dom";

export default function IconMenuItem({ item }) {
  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        `flex items-center gap-5 mt-5 pl-2 lg:pl-6 bg-white w-40 lg:w-50 h-9 cursor-pointer rounded-lg hover:border-b hover:border-black hover:shadow-sm ${
          isActive ? "border-b border-black shadow-md" : ""
        }`
      }
    >
      <img className="w-5 h-5" src={item.icon} alt={item.icon} />
      <p className="text-sm">{item.name}</p>
    </NavLink>
  );
}
