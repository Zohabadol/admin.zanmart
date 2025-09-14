import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { Link } from "react-router-dom";
// import { Toastify } from "../../components/toastify";

import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helper";
import { Toastify } from "../../../components/toastify";
import { SkeletonTable } from "../../../components/loading/skeleton-table";
import { useForm } from "react-hook-form";
import { SingleSelect, TextInput } from "../../../components/input";
// import { useDeleteModal } from "../../context/DeleteModalContext";
const District = () => {
  //   const { openModal } = useDeleteModal();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [divisions, setDevisions] = useState([]);
  const [filteredText, setFilteredText] = useState("");

  const {
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });
  console.log("data",data)
  const divisionId = watch("division_id");
  const districtName = watch("name");
  console.log("divisionName", divisionId);
  console.log("districtName", districtName);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredText(districtName);
      console.log("Filtered with:", districtName);
    }, 500);

    return () => clearTimeout(timer);
  }, [districtName]);

  const fetchDivisionName = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Division.index();
      //   console.log("response",response)

      if (response && response.status === 200) {
        const result = response?.data?.data?.data?.map((item, index) => {
          return {
            label: item.name,
            value: item.name,
            ...item,
          };
        });
        setDevisions(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // category api fetch
  useEffect(() => {
    fetchDivisionName();
  }, [fetchDivisionName]);
  // fetch banner data
  const fetchData = useCallback(
    async (banner) => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (filteredText) queryParams.append("name", filteredText);
        if (divisionId) queryParams.append("division_id", divisionId);
        queryParams.append("page", currentPage);
        queryParams.append("per_page", perPage);
        console.log("queryParams",queryParams.toString())
        const response = await NetworkServices.District.index(
          queryParams.toString()
        );
        if (response?.status === 200 || response?.status === 201) {
          setData(response?.data?.data?.data);

          setLoading(false);
          setTotalRows(response?.data?.data?.total || 0);
        }
      } catch (error) {
        if (error) {
          setLoading(false);
          networkErrorHandeller(error);
        }
      }
    },
    [filteredText,divisionId, currentPage, perPage]
  );
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (page) => {
    if (!loading) {
      setCurrentPage(page);
    }
  };
  const handleRowsPerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };
  // delete data
  const destroy = async (id) => {
    try {
      const response = await NetworkServices.District.destroy(id);
      if (response.status === 200 || response?.status === 201) {
        fetchData();
        // return Toastify.Info(response?.data?.message);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  const columns = [
    {
      name: "District Name",
      cell: (row) => row?.name,
    },
    {
      name: "District Bangla Name",
      cell: (row) => row?.bn_name,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-1">
          <Link to={`/dashboard/district/edit/${row?.id}`}>
            <span className="bg-primary text-white btn btn-sm  ">Edit</span>
          </Link>

          <span>
            <span
              className="bg-primary text-white btn btn-sm"
              onClick={() => destroy(row?.id)}
            >
              Delete
            </span>
          </span>
        </div>
      ),
    },
  ];

  return (
    <section>
      <div className="flex justify-between shadow-md p-2 my-5 rounded-md">
        <h2 className=" font-semibold text-xl">District List</h2>
        <Link
          to="/dashboard/district/create"
          className="flex hover:bg-primary hover:text-white items-center gap-2 border-primary border text-primary  py-1 px-2  rounded-lg"
        >
          Add New <span className="  material-symbols-outlined p-1">add</span>
        </Link>
      </div>

      <div className="mb-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div className="flex-1">
          <SingleSelect
            name="division_name"
            control={control}
            options={divisions}
            onSelected={(selected) => setValue("division_id", selected?.id)}
            placeholder="Select a category"
            label="Filter with Division"
            isClearable={true}
          />
        </div>

        <div className="flex-1">
          <TextInput
            label="Filter With District Name"
            name="name"
            type="text"
            placeholder="Enter Name"
            control={control}
            error={errors.name && errors.name.message}
            // rules={{ required: "Name is required" }}
          />
        </div>
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={data}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            paginationPerPage={perPage}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            paginationDefaultPage={currentPage}
          />
        </>
      )}
    </section>
  );
};

export default District;

