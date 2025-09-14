import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { Link, useNavigate } from "react-router-dom";
import { Toastify } from "../../components/toastify";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaRegEdit,
} from "react-icons/fa";
import { CategoryUtilsFunction } from "./components/hooks";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteModal } from "../../context/DeleteModalContext";
const Category = () => {
  const { openModal } = useDeleteModal();
  const { column } = CategoryUtilsFunction();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem("currentPage")
      ? Number(sessionStorage?.getItem("currentPage"))
      : 1
  );
  const [lastPage, setLastPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  // fetch category data
  const fetchData = useCallback(
    async (category) => {
      try {
        setLoading(true);
        const response = await NetworkServices.Category.index(currentPage);
        console.log(response);
        if (response?.status === 200 || response?.status === 201) {
          setCategoryData(response?.data?.data?.data);
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
    [currentPage]
  );
  useEffect(() => {
    fetchData();
  }, []);

  // delete data
  const destroy = async (id) => {
    try {
      const response = await NetworkServices.Category.destroy(id);

      if (response.status === 200 || response?.status === 201) {
        fetchData();
        return Toastify.Info(response?.data?.message);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  // columns for table
  const columns = [
    ...column,
    {
      name: "Action",
      cell: (row) => (
        <span className="flex gap-3">
          <Link to={`/dashboard/category/edit/${row?.category_id}`}>
            <span className=" ">
              <FaRegEdit />
            </span>
          </Link>

          <span>
            <span
              className="text-red-500 cursor-pointer"
              onClick={() =>
                openModal(
                  () => destroy(row?.category_id),
                  <span>
                    Are you sure you want to delete{" "}
                    <span className="bg-blue-500 text-white font-semibold px-2 py-1 rounded">
                      {row?.category_name}
                    </span>
                    item?
                  </span>
                )
              }
            >
              <RiDeleteBin6Line />
            </span>
          </span>
        </span>
      ),
    },
  ];

  const handleSelectedRowsChange = (state) => {
    // Extract only the category_id from selected rows
    const ids = state.selectedRows.map((row) => row.category_id);
    setSelectedIds(ids);
  };
  const addedHomePageCategory = async () => {
    try {
      const response = await NetworkServices.Category.homepagecategory({
        category_id: selectedIds,
      });

      if (response.status === 200 || response?.status === 201) {
        // fetchData();
        navigate("/dashboard/category/homepage");
        return Toastify.Info(response?.data?.message);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  return (
    <section>
      <div className="flex justify-between shadow-md p-2 my-3 rounded-md">
        <h2 className=" font-semibold text-xl">Category List</h2>
        <div className="flex items-center gap-3">
          { selectedIds?.length?<button
            onClick={() => addedHomePageCategory()}
            className="flex hover:bg-primary hover:text-white items-center gap-2 border-primary border text-primary py-2 px-2 rounded-lg"
     
          >
            Add Home Category
          </button>:"" }
          <Link
            to="/dashboard/category/create"
            className="flex hover:bg-primary hover:text-white items-center gap-2 border-primary border text-primary  py-1 px-2  rounded-lg"
          >
            Add New <span className="  material-symbols-outlined p-1">add</span>
          </Link>
        </div>
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable
            selectableRows
            columns={columns}
            data={categoryData}
            onSelectedRowsChange={handleSelectedRowsChange}
          />
          <Pagination
            nextPageUrl={nextPageUrl}
            setCurrentPage={setCurrentPage}
            prevPageUrl={prevPageUrl}
            lastPage={lastPage}
            currentPage={currentPage}
          />
        </>
      )}
    </section>
  );
};

export default Category;
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
