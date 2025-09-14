
import { Outlet } from "react-router-dom";

import { useState } from "react";
import Sidebar from "../components/Sidebar/SidebarItem";
import Header from "../components/Header";

export const DashboardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [menuStyle, setMenuStyle] = useState("hover");
  const [menuPosition, setMenuPosition] = useState("fixed");

 

  const toggleSidebar = () => {
 
    setMenuOpen(!menuOpen);
  };

  return (
    // <div className="dark:bg-boxdark-2 dark:text-bodydark">
    <div>
      <div className="flex h-screen overflow-hidden ">
        {/* sidbar start  */}
        <Sidebar
          toggleSidebar={toggleSidebar}
          menuOpen={menuOpen}
          menuStyle={menuStyle}
          setMenuStyle={setMenuStyle}

        />
        <div className=" relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden  ">
          {/* relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden  */}
          {/* Header start  */}
          
            {" "}
            <Header
              toggleSidebar={toggleSidebar}
              menuOpen={menuOpen}
              menuStyle={menuStyle}
              setMenuStyle={setMenuStyle}
              menuPosition={menuPosition}
              setMenuPosition={setMenuPosition}
            />
       
          <main>
            <div
              className={`mx-auto w-full p-2 md:p-4 2xl:p-6 bg-light dark:bg-dark     ${
                menuPosition === "fixed"
                  ? "mt-16"
                  : ""
              } `}
            >
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

