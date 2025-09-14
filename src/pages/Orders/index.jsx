import React, { useEffect, useState } from "react";
import { privateRequest } from "../../config/axios.config";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  useEffect(() => {
    privateRequest.get("/admin/order").then((response) => {
    
      const { data } = response?.data;
      const result = data.map((item, idx) => {
        return {
          index: idx,
          ...item,
        };
      });
      setNewOrders(result);
    });
  }, []);
  
  // table column code here
  const colums = [
    { name: "Order ID", selector: (row) => row.order_id, sortable: true },
    {
      name: "Payment Status",
      selector: (row) => row.payment_status,
      sortable: true,
      cell:(row)=>{
        if(row.payment_status === "pending"){
          return <span className="text-gray-600 bg-gray-200 px-1 py-1 font-bold rounded-sm">{row?.payment_status}</span>
        }  else{
          return <span className="text-green-600 bg-green-100 px-1 py-1 font-bold rounded-sm"> {row?.payment_status}</span>
        }
      
    }
    },
    {
      name: "Order Status",
      selector: (row) => row.order_status,
      sortable: true,
      cell:(row)=>{
          
          if(row?.order_status === "cancelled"){
            return <span className="text-red-600 bg-red-100 px-1 py-1 font-bold rounded-sm">{row?.order_status}</span>
          } 
          else if(row?.order_status === "processing"){
            return <span className="text-gray-500 bg-gray-200 px-1 py-1 font-bold rounded-sm">{row?.order_status}</span>
          } 
          else if(row?.order_status === "shipped"){
            return <span className="text-green-500 bg-red-100 px-1 py-1 font-bold rounded-sm">{row?.order_status}</span>
          } 
          else{
            return row?.order_status
          }
        
      }
    },
    // { name: "Tracking", selector: (row) => row.order_status, sortable: true },
    { name: "Name", selector: (row) => row?.shipping_address?.name, sortable: true },
    { name: "Action", selector: (row) => row.tran_id, sortable: true 

      ,
      cell: (row) => 
        <div className="flex gap-1 border p-2 rounded-md hover:text-white hover:bg-blue-500 font-bold"> 
        <Link to={`/dashboard/order/order-details/${row?.order_id}`}>Details</Link>
         </div>
    },
  ];
  // Tailwind Conditional Row Styling
  const conditionalRowStyles = [
    {
      when: (row) => {
       
        return row.index % 2 !== 0;
      },
    },
    {
      when: (row, index) => row.index % 2 === 0,
      style: {
        backgroundColor: "#F8F9FC",
      },
    },
  ];
  const customStyles = {
    table: {
      style: {
        backgroundColor: "#eff6ff", // Full table background color
      },
    },
    rows: {
      style: {
        borderRadius: "8px", // Apply border radius to each row
        marginTop: "8px", // Optional: space between rows
      },
    },
    headCells: {
      style: {
        backgroundColor: "#F8F9FC", // Custom header background color
        color: "#black", // Custom text color
        fontWeight: "bold", // Make text bold
        padding: "10px", // Adjust
        // margin:"0px 0px 10px 0px"
        // borderRadius: "8px",
      },
    },
  };

  // implement search functionality here \
  const [searchQuery, setSearchQuery] = useState("");
   useEffect(()=>{ 
    const filteredProducts = newOrders.filter((product) => {
      const matchesName = product?.payment_status?.toLowerCase()
        .includes(searchQuery?.toLowerCase());
      const matchesPrice = product.order_status
        ?.toString()
        ?.startsWith(searchQuery);
  
      return matchesName || matchesPrice;
    });
    // orders(filteredProducts);
    setOrders(filteredProducts);
   },[searchQuery,newOrders])
  return (
    <div className="rounded-md bg-blue-50 p-5">
      {/* order list head  */}
      <section>
        {/* search order list  */}
        <div className="relative w-full max-w-sm">
          <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
            type="search"
            className="bg-blue-50 border rounded-lg py-3 px-4 w-full pr-10 focus:outline-none"
            placeholder="Search here..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zm-7 4a7 7 0 1112.667 4.09l4.706 4.707a1 1 0 01-1.414 1.415l-4.707-4.707A7 7 0 011 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </section>
      {/* order list body  */}
      <section className="mt-5">
        <DataTable
          columns={colums}
          data={orders}
          conditionalRowStyles={conditionalRowStyles}
          highlightOnHover
          theme="#F8F9FC"
          customStyles={customStyles}
          fixedHeader
          pagination
        />
      </section>
    </div>
  );
};

export default Orders;
