import React, { useCallback, useEffect, useState } from "react";
import Card from "./card/Card";
import CalendarComponent from "./calender/Calender";
import RecentOrderChart from "./Chart/RecentOrderChart";
import EarningsChart from "./Chart/EarningsChart";
import ShowTable from "./table/ShowTable";
import { MyCalendar } from "./calender/MyCalendar";
import { NetworkServices } from "../../network";
import { networkErrorHandeller, responseChecker } from "../../utils/helper";
import { useDeleteModal } from "../../context/DeleteModalContext";


const Dashboard = () => {
    const [dashboard, setDashboard] = useState([]);
    const [loading, setLoading] = useState(false);
  
     
    const { openModal } = useDeleteModal();
    const handleDelete = () => {
      // your delete logic here
      
    };
  
  return (
    <div className="mt-5" >
        <button
        onClick={() => openModal(handleDelete, "Do you really want to r  item?sdfsfds")}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete Item
      </button>
      <Card dashboard={dashboard} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4 mt-8">
        <div className="col-span-4 ">
          <CalendarComponent />
          {/* <MyCalendar/> */}
        </div>
        {/* <div className="col-span-4">
          <RecentOrderChart />
        </div> */}
              <div className=" col-span-4">
          <EarningsChart dashboard={dashboard} />
        </div>
  
      </div>
      {/* <div className="mt-8">
          <EarningsChart dashboard={dashboard} />
        </div> */}
      <div className="mt-8">
        <ShowTable dashboard={dashboard}/>
      </div>
    </div>
  );
};

export default Dashboard;
