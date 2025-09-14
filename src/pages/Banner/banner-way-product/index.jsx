import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helper";
import { SkeletonTable } from "../../../components/loading/skeleton-table";
import {   Link, useParams } from "react-router-dom"; 
const BannerWayProduct = () => {
    const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [bannerData, setbannerData] = useState([]); 
  // fetch banner data
  const fetchData = useCallback(
    async (banner) => {
      try {
        setLoading(true);
        const response = await NetworkServices.Banner.homepagebannershowproduct(id);
        
        if (response?.status === 200 || response?.status === 201) {
          setbannerData(response?.data?.data ); 
          setLoading(false);
        }
      } catch (error) {
        if (error) {
          setLoading(false);
          networkErrorHandeller(error);
        }
      }
    },
    [id]
  );
  useEffect(() => {
    fetchData();
  }, [ ]);
 
  const columns = [
    {
      name: "Product ID",
      cell: (row) => row?.product_id,
    },

    {
      name: "Title",
      cell: (row) => row?.title,
    },
    {
      name: "Product Image",
      cell: (row) => (
        <div> 
          <img
            className="w-40 h-20 border rounded-lg"
            src={`${process.env.REACT_APP_BASE_API}${row?.thumbnail_image}`}
            alt="loading"
          />
        </div>
      ),
    },
     

    
  ];

  return (
    <section>
      <div className="flex justify-between shadow-md p-2 my-5 rounded-md">
        <h2 className=" font-semibold text-xl">Banner Way Product List</h2>
        <Link to="/dashboard/banner">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable columns={columns} data={bannerData?.products}   />
         
        </>
      )}
    </section>
  );
};

export default BannerWayProduct;
 