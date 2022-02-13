import React from "react";
import Icon from '@mui/material/Icon'

function SidebarItem({ Menu, isActive }) {
  return isActive === true ? (
    <div className="bg-indigo-300 p-3  rounded-full">
      <Menu.icon size="24" color="white" />
    </div>
  ) : (
    <div className="bg-indigo-50 p-3 rounded-full text-gray-400">
         <Menu.icon size="24" />
    </div>
  );
}

export default SidebarItem;