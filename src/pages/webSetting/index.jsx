import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { Link } from "react-router-dom";
import { Toastify } from "../../components/toastify";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaYoutube,
  FaInstagramSquare,
  FaRegEdit,
} from "react-icons/fa"; 
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteModal } from "../../context/DeleteModalContext";
const WebSetting = () => {
   const { openModal } = useDeleteModal();
  const [loading, setLoading] = useState(false);
  const [websettingData, setwebsettingData] = useState([]); 
  // fetch websetting data
  const fetchData = useCallback(
    async (websetting) => {
      try {
        setLoading(true);
        const response = await NetworkServices.WebSetting.index( );

        if (response?.status === 200 || response?.status === 201) {
          setwebsettingData(response?.data?.data); 
          setLoading(false);
        }
      } catch (error) {
        if (error) {
          setLoading(false);
          networkErrorHandeller(error);
        }
      }
    },
    [ ]
  );
  useEffect(() => {
    fetchData();
  }, [ ]);

  // delete data
  const destroy = async (id) => {
    try {
      const response = await NetworkServices.WebSetting.destroy(id);
      if (response.status === 200 || response?.status === 201) {
        fetchData();
        return Toastify.Info("websetting Deleted");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  const columns = [
    {
      name: "Web-Setting ID",
      cell: (row) => row?.web_setting_id,
    },

    {
      name: "Logo",
      cell: (row) => (
        <div>
          <img
            className="w-40 h-20 border rounded-full"
            src={`${process.env.REACT_APP_BASE_API}${row?.logo}`}
            alt="loading"
          />
        </div>
      ),
    },
    {
      name: "Title",
      cell: (row) => row?.title,
    },
    {
      name: "Email websetting",
      cell: (row) => row?.email,
    },
    {
      name: "Phone",
      cell: (row) => row?.phone,
    },
    {
      name: "Bio",
      cell: (row) => row?.bio,
    },
    {
      name: "Location",
      cell: (row) => row?.location,
    },
    {
      name: "Social Media",

      cell: (row) => (
        <div className="flex items-center gap-2 w-3 -ml-12 ">
          <a href={row?.facebook} className="h-6 w-6">
            <FaFacebookSquare className="h-6 w-6" />
          </a>
          <a href={row?.linkedin}>
            <FaLinkedin className="h-6 w-6" />
          </a>
          <a href={row?.twitter}>
            <FaTwitterSquare className="h-6 w-6" />
          </a>
          <a href={row?.youtube}>
            <FaYoutube className="h-6 w-6" />
          </a>
          <a href={row?.instagram}>
            <FaInstagramSquare className="h-6 w-6" />
          </a>
        </div>
      ),
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-1">
          <Link to={`/dashboard/web-setting/edit/${row?.web_setting_id}`}>
            <span className=" btn btn-sm material-symbols-outlined">
              <FaRegEdit />
            </span>
          </Link>

          <span>
            <span
              className=" text-red-700 btn btn-sm material-symbols-outlined"
              onClick={() =>
                openModal(
                  () => destroy(row?.web_setting_id),
                  <span>
                    Are you sure you want to delete{" "}
                    <span className="bg-blue-500 text-white font-semibold px-2 py-1 rounded">
                      {row?.title}
                    </span>
                    item?
                  </span>
                )
              }
            >
              <RiDeleteBin6Line />
            </span>
          </span>
        </div>
      ),
    },
  ];

  return (
    <section>
      <div className="flex justify-between shadow-md p-4 px-6 rounded-md">
        <h2 className=" font-semibold text-xl">Websetting List</h2>
        <Link
          to="/dashboard/web-setting/create"
          className="flex hover:bg-primary hover:text-white items-center gap-2 border-primary border text-primary  py-1 px-2  rounded-lg"
        >
          Add New <span className="  material-symbols-outlined p-1">add</span>
        </Link>
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable columns={columns} data={websettingData} />
           
        </>
      )}
    </section>
  );
};

export default WebSetting;
 ;
