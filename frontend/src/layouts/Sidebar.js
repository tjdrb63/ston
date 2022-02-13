import React from "react";
import { Link, useLocation } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import { AiOutlineHome } from 'react-icons/ai';
import { BsChatDots } from 'react-icons/bs';
import { BsClipboard } from 'react-icons/bs';
function Sidebar() {

  // URL의 path값을 받아올 수 있다.
  const pathName = useLocation().pathname;

  const menus = [
    { name: "대시보드", path: "/" , icon: AiOutlineHome },
    { name: "회원 관리", path: "/home" ,  icon: BsChatDots },
    { name: "캐시 관리", path: "/cashes" , icon: BsClipboard }
  ];

  return (
 <div className="sticky top-56 z-50 flex flex-col h-10 items-center py-4  p-3 flex-shrink-0 rounded-3xl hidden sm:block" >
        <nav className="flex flex-col space-y-5 mt-12">
        <div className="flex flex-col items-center justify-center flex-1 space-y-4">
        {menus.map((menu, index) => {
        return (
   <Link to={menu.path} key={index}>
            <SidebarItem
              Menu={menu}
              isActive={pathName === menu.path ? true : false}	// 현재 URL pathname과 객체에 담긴 path값 일치 여부 확인
            />
          </Link>
       
        );
      })}
</div>
        
        </nav>
       
      </div>

           

  );
}

export default Sidebar;