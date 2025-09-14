import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import { NetworkServices } from "../../network";
// import { networkErrorHandeller } from "../../utils/helper";
// import { SkeletonTable } from "../../components/loading/skeleton-table";
import { Link } from "react-router-dom";
import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helper";
import { Toastify } from "../../../components/toastify";
import { SkeletonTable } from "../../../components/loading/skeleton-table";
import { SingleSelect, TextInput } from "../../../components/input";
import { useForm } from "react-hook-form";
// import { useDeleteModal } from "../../context/DeleteModalContext";
const Upozila = () => {
  //   const { openModal } = useDeleteModal();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [districts, setDistricts] = useState([]);
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

  const districtId = watch("district_id");
  const upazilaName = watch("name");
  console.log("divisionName", districtId);
  console.log("districtName", upazilaName);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredText(upazilaName);
      console.log("Filtered with:", upazilaName);
    }, 500);

    return () => clearTimeout(timer);
  }, [upazilaName]);

  const fetchDivisionName = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.upazila.indexall();
      console.log("response", response);

      if (response && response.status === 200) {
        const result = response?.data?.data?.map((item, index) => {
          return {
            label: item.name,
            value: item.name,
            ...item,
          };
        });
        setDistricts(result);
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
        if (districtId) queryParams.append("district_id", districtId);
        queryParams.append("page", currentPage);
        queryParams.append("per_page", perPage);
        console.log("queryParams", queryParams.toString());
        const response = await NetworkServices.upazila.index(
          queryParams.toString()
        );
        if (response?.status === 200 || response?.status === 201) {
          setData(response?.data?.data?.data);
          setTotalRows(response?.data?.data?.total || 0);
          setLoading(false);
        }
      } catch (error) {
        if (error) {
          setLoading(false);
          networkErrorHandeller(error);
        }
      }
    },
    [currentPage,districtId,filteredText, currentPage, perPage]
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
      const response = await NetworkServices.upazila.destroy(id);
      if (response.status === 200 || response?.status === 201) {
        fetchData();
        return Toastify.Info(response?.data?.message);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  const columns = [
    {
      name: "Upazila Name",
      cell: (row) => row?.name,
    },
    {
      name: "Upazila Bangla Name",
      cell: (row) => row?.bn_name,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-1">
          <Link to={`/dashboard/upozila/edit/${row?.id}`}>
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
        <h2 className=" font-semibold text-xl">Upazila List</h2>
        <Link
          to="/dashboard/upozila/create"
          className="flex hover:bg-primary hover:text-white items-center gap-2 border-primary border text-primary  py-1 px-2  rounded-lg"
        >
          Add New <span className="  material-symbols-outlined p-1">add</span>
        </Link>
      </div>
      <div className="mb-10 flex w-1/2 gap-4">
        <div className="flex-1">
          <SingleSelect
            name="district_name"
            control={control}
            options={districts}
            onSelected={(selected) => setValue("district_id", selected?.id)}
            label="Filter with District"
            isClearable={true}
          />
        </div>

        <div className="flex-1">
          <TextInput
            label="Filter With Upazila Name"
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

export default Upozila;
