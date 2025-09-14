import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { addedApi, deleteApi, fetchApi, updatedApi } from "../utils/variantApi";
import { formatDate } from "../../../utils/formatedate";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import VariantModal from "../Components/VariantModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { SkeletonTable } from "../../../components/loading/skeleton-table";
import { useDeleteModal } from "../../../context/DeleteModalContext";
const Unit = () => {
  const { openModal } = useDeleteModal();
  const [addedToggle, setAddedToggle] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);
  const [unitValue, setunitValue] = useState([]);
  const [unitText, setunitText] = useState("");
  const [addunitValue, setAddunitValue] = useState({});
  const [updateunitValue, setUpdateValue] = useState({});
  const [idx, setIdx] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  // unit fetch api call here
  useEffect(() => {
    setLoading(true);
    fetchApi(`admin/unit?page=${currentPage}`).then((res) => {
    
      setunitValue(res?.data?.data?.data);
      if (res?.data?.success) {
        setLoading(false);
        setCurrentPage(res?.data?.data?.current_page);
        setLastPage(res?.data?.data?.last_page);
        setNextPageUrl(res?.data?.data?.next_page_url);
        setPrevPageUrl(res?.data?.data?.prev_page_url);
      }
    });
  }, [currentPage]);
  //  add  unit
  const handleAddedunit = (e) => {
    e.preventDefault();
    addedApi(`admin/unit`, addunitValue).then((res) => {
      if (res?.data?.success) {
        fetchApi("admin/unit").then((res) => {
          setunitValue(res?.data?.data?.data);
        });
      }
    });
  };
  //  update unit
  const handleuUpdateunit = (e) => {
    e.preventDefault();
    updatedApi(`admin/unit/${idx}`, updateunitValue).then((res) => {
      if (res?.data?.success) {
        fetchApi("admin/unit").then((res) => {
          setunitValue(res?.data?.data?.data);
        });
      }
    });
  };
  //   delete unit
  const destroy = async (id) => {
    deleteApi(`admin/unit/${id}`).then((res) => {
      if (res?.data?.success) {
        fetchApi("admin/unit").then((res) => {
          setunitValue(res?.data?.data?.data);
        });
      }
    });
  };
  const columns = [
    {
      name: "Unit ID",
      selector: (row) => row?.unit_id,
    },
    {
      name: "Name",
      selector: (row) => row?.name,
    },
    {
      name: "Status",
      selector: (row) => row?.status,
    },
    {
      name: "Created Date",
      selector: (row) => formatDate(row?.created_at).formate_date,
    },
    {
      name: "Update Date",
      selector: (row) => formatDate(row?.updated_at).formate_date,
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <button
            onClick={() => {
              // handleuUpdateunit()
              setIdx(row?.unit_id);
              setUpdateToggle(true);
            }}
          >
            <FaRegEdit />
          </button>
          <button
            className=" text-red-700 px-4 py-2 rounded" 
            onClick={() =>
              openModal(
                () => destroy(row?.unit_id),
                <span>
                  Are you sure you want to delete{" "}
                  <span className="bg-blue-500 text-white font-semibold px-2 py-1 rounded">
                    {row?.name}
                  </span>
                  item?
                </span>
              )
            }
          >
            <RiDeleteBin6Line />
          </button>
        </>
      ),
    },
  ];
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
  return (
   <>
     {
        loading ? <SkeletonTable/>: <div>
        {addedToggle && (
          <VariantModal setOpen={setAddedToggle}>
            <UnitForm
              addedunitValue={setAddunitValue}
              handleAdded={handleAddedunit}
            />
          </VariantModal>
        )}
        {updateToggle && (
          <VariantModal setOpen={setUpdateToggle}>
            <UnitForm
              unit={unitValue?.find((item) => item.unit_id === idx)}
              addedunitValue={setUpdateValue}
              handleAdded={handleuUpdateunit}
            />
          </VariantModal>
        )}
        <div className="  flex justify-between items-center py-2 px-3 gap-2   ">
          <input
            type="search"
            className="  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search unit Name"
            onChange={(e) => setunitText(e.target.value)}
          />
          <button
            className="flex hover:bg-primary hover:text-white items-center gap-2 border-primary border text-primary  py-1 px-2  rounded-lg"
            onClick={() => setAddedToggle(true)}
          >
           Add New  <span className="  material-symbols-outlined p-1">
            add
          </span>
          </button>
        </div>
        <DataTable
          // pagination
          columns={columns}
          data={unitValue?.filter((item) => item?.name?.includes(unitText))}
        />
        {/* pagination code here  */}
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
      </div>
     }
   </>
  );
};

export default Unit;
const UnitForm = ({ unit = {}, handleAdded, addedunitValue }) => {
 
  return (
    <form onSubmit={handleAdded} className="space-y-4">
      <div>
        <label
          htmlFor="unit"
          className="block text-gray-700 font-semibold mb-2"
        >
          Unit Name
        </label>
        <input
          type="text"
          id="unit"
          name="name"
          defaultValue={unit?.name}
          placeholder="Enter your unit name"
          onChange={(e) => {
            addedunitValue({
              name: e.target.value,
            });
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};
