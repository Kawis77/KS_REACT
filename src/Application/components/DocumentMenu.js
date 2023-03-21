import React from "react";
import SideMenu from "./SideMenu";

function DocumentMenu() {
  const items = [
    { id: 1, label: "Dodaj dokument" },
    { id: 2, label: "Zobacz listę dokumentów" },
  ];

  return (
    <div>
      <SideMenu items={items} />
    </div>
  );
}

export default DocumentMenu;