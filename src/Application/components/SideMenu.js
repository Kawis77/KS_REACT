import React from "react";
import { BsFillFolderFill } from "react-icons/bs";
import '../styles/SideMenu.css';

function SideMenu({ items }) {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li key={item.id} className="list-group-item">
          <BsFillFolderFill />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default SideMenu;