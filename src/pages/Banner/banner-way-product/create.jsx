 
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helper";
import { SkeletonTable } from "../../../components/loading/skeleton-table";
import {   Link, useNavigate, useParams } from "react-router-dom";
import { Toastify } from "../../../components/toastify";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"; 
const BannerWayProductCreate = () => {
    const {id} = useParams();
    const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(
      1
  );
  const [lastPage, setLastPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  // fetch product data
  const fetchData = useCallback(
    async (product) => {
      try {
        setLoading(true);
        const response = await NetworkServices.Product.index();
   
        if (response?.status === 200 || response?.status === 201) {
          setProductData(response?.data?.data?.data);
          setCurrentPage(response?.data?.data?.current_page);
          setLastPage(response?.data?.data?.last_page);
          setNextPageUrl(response?.data?.data?.next_page_url);
          setPrevPageUrl(response?.data?.data?.prev_page_url);
          setLoading(false);
        }
      } catch (error) {
       
        if (error) {
          setLoading(false);
          networkErrorHandeller(error);
        }
      }
    },
    []
  );
  useEffect(() => {
    fetchData();
  }, []);

 
  const columns = [
    {
      name: "Product ID",
      cell: (row) => row?.product_id,
    },

    {
      name: "Product Name",
      cell: (row) => row?.title,
    },

    
  ]; 
  const [selectedIds,setSelectedIds] = useState([]);
  const handleSelectedRowsChanged = (state) => { 
    const ids = state?.selectedRows?.map(row => row?.product_id);
    setSelectedIds(ids);

  }
  const handleAddedBannerWaysToProduct =async ()=>{
    try {
        const response = await NetworkServices.Banner.homepagebannerproduct({banner_id:id, product_id:selectedIds});
       
        if (response.status === 200 || response?.status === 201) {
          // fetchData();
          navigate(`/dashboard/banner/banner-product/${id}`); 
          return Toastify.Info(response?.data?.message);
        }
      } catch (error) {
        networkErrorHandeller(error);
      }
  }
  return (
    <section>
      <div className="flex justify-between shadow-md p-2  rounded-md">
        <h2 className=" font-semibold text-xl">Product List</h2>
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
          <DataTable onSelectedRowsChange={handleSelectedRowsChanged} selectableRows pagination columns={columns} data={productData} />
          {/* <Pagination
            nextPageUrl={nextPageUrl}
            setCurrentPage={setCurrentPage}
            prevPageUrl={prevPageUrl}
            lastPage={lastPage}
            currentPage={currentPage}
          /> */}
        </>
      )}  
      <div className="my-3 flex justify-center">
      <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-400" onClick={()=>handleAddedBannerWaysToProduct()}>Add Banner Ways To Product </button>
      </div>
    </section>
  );
};

export default BannerWayProductCreate;
const Pagination = ({
  nextPageUrl,
  setCurrentPage,
  prevPageUrl,
  lastPage,
  currentPage,
}) => {
  const handleNext = () => {
    if (nextPageUrl) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (prevPageUrl) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  // pagination store
  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);
  return (
    <>
      <div className="flex justify-end items-center gap-2 my-3">
        <button
          onClick={() => {
            setCurrentPage(1);
          }}
          disabled={!prevPageUrl}
          className={`px-2 py-2 rounded-lg font-medium text-white transition-all duration-300 ${
            !prevPageUrl
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <FaAngleDoubleLeft />
        </button>
        <button
          onClick={handlePrev}
          disabled={!prevPageUrl}
          className={`px-2 py-2 rounded-lg font-medium text-white transition-all duration-300 ${
            !prevPageUrl
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <IoIosArrowBack />
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {lastPage}
        </span>
        <button
          onClick={handleNext}
          disabled={!nextPageUrl}
          className={`px-2 py-2 rounded-lg font-medium text-white transition-all duration-300 ${
            !nextPageUrl
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <IoIosArrowForward />
        </button>
        <button
          onClick={() => {
            setCurrentPage(lastPage);
          }}
          disabled={!nextPageUrl}
          className={`px-2 py-2 rounded-lg font-medium text-white transition-all duration-300 ${
            !nextPageUrl
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <FaAngleDoubleRight />
        </button>
      </div>
    </>
  );
};
 