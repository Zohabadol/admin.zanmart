import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { Link, useNavigate } from "react-router-dom";
import { Toastify } from "../../components/toastify";
import { FiSend } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteModal } from "../../context/DeleteModalContext";
const Product = () => {
  const { openModal } = useDeleteModal();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [countLoading, setCountLoading] = useState(1);
  // fetch product data
  const fetchData = async (page = 1, per_page) => {
    try {
      if (countLoading === 1) {
        setLoading(true);
      }
      setCountLoading(2);
      const response = await NetworkServices.Product.index(page, per_page); // Only use page from param
      console.log(response.data);

      if (response?.status === 200 || response?.status === 201) {
        setProductData(response?.data?.data?.data);
        setLastPage(response?.data?.data?.last_page);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [currentPage, perPage]);

  // delete data
  const destroy = async (id) => {
    try {
      const response = await NetworkServices.Product.destroy(id);
      if (response.status === 200 || response?.status === 201) {
        fetchData(currentPage, perPage);
        return Toastify.Info("product Deleted");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  // update best selling product
  const [bestProductId, setBestProductId] = useState([]);
  const updateBestSellingProduct = async () => {
    try {
      const response = await NetworkServices.Product.bestSellingProduct(
        bestProductId
      );
      if (response.status === 200 || response?.status === 201) {
        navigate("/dashboard/product/best-selling");
        return Toastify.Info("Best Selling Product Added");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  // selected row id find
  const handleSelectedRowsChange = async (state) => {
    // Extract only the category_id from selected rows
    const ids = state.selectedRows.map((row) => row?.product_id);
    setBestProductId(ids);
  };

  // pagination for current data set
  const handlePageChange = (page) => {
    console.log(page);
    if (!loading) {
      setCurrentPage(page);
    }

    // fetchData(page);
  };
  // page per product show
  const handleRowsPerPageChange = (newPerPage) => {
    console.log("Rows per page changed to:", newPerPage);
    setPerPage(newPerPage);
  };
  // table column use here
  const columns = [
    {
      name: "Product ID",
      cell: (row) => row?.product_id,
    },
    {
      name: "Image",
      cell: (row) => (
        <div>
          <img
            className="w-20 h-20 border rounded-full"
            src={`${process.env.REACT_APP_BASE_API}${row?.thumbnail_image}`}
            alt="loading"
          />
        </div>
      ),
    },

    {
      name: "Product Name",
      cell: (row) => row?.title,
    },

    {
      name: " Sale Price",
      cell: (row) => row?.sell_price,
    },
    {
      name: " Flat Discount",
      cell: (row) => row?.flat_discount,
    },
    {
      name: "Buy Price",
      cell: (row) => row?.buy_price,
    },
    {
      name: "In Stock",
      cell: (row) => row?.stock_qty,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-3">
          <Link to={`/dashboard/product/edit/${row?.product_id}`}>
            <span className="">
              <FaRegEdit />
            </span>
          </Link>

          <span>
            <span
              className="text-red-700  cursor-pointer"
              onClick={() =>
                openModal(
                  () => destroy(row?.product_id),
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
          <Link to={`/dashboard/product-variant/create/${row?.product_id}`}>
            <span className="">
              <FiSend />
            </span>
          </Link>
        </div>
      ),
    },
  ];
  return (
    <section>
      <div className="flex justify-between shadow-md p-4 px-6 rounded-md">
        <h2 className=" font-semibold text-xl">Product List</h2>
        <div className="flex gap-4">
          {bestProductId?.length ? (
            <button
              onClick={() => updateBestSellingProduct()}
              className="flex hover:bg-primary hover:text-white items-center gap-2 border-primary border text-primary  py-1 px-2  rounded-lg"
            >
              Add Best Selling{" "}
            </button>
          ) : (
            ""
          )}
          <Link
            to="/dashboard/product/create"
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
            pagination
            paginationServer
            paginationTotalRows={lastPage * perPage} // Important for DataTable
            paginationPerPage={perPage}
            onChangePage={handlePageChange}
            paginationDefaultPage={currentPage}
            onChangeRowsPerPage={handleRowsPerPageChange}
            columns={columns}
            data={productData}
            selectableRows
            onSelectedRowsChange={handleSelectedRowsChange}
            expandableRows
            expandableRowsComponent={({ data }) => (
              <div>
                <ProductVariantShow
                  data={data}
                  openModal={openModal}
                  fetchData={fetchData}
                />
              </div>
            )}
          />
        </>
      )}
    </section>
  );
};

export default Product;

const ProductVariantShow = ({ data, openModal, fetchData }) => {
  const destroy = async (id) => {
    try {
      const response = await NetworkServices.ProductVariant.destroy(id);
      if (response.status === 200 || response?.status === 201) {
        fetchData();
        return Toastify.Info("productVariant Deleted");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* If no product variants */}
      {!data?.product_variants?.length ? (
        <div className="bg-blue-100 text-blue-800 font-semibold text-center py-3 rounded-md">
          Category: {data?.category?.category_name}
        </div>
      ) : (
        <>
          {/* Product Variants */}
          {data?.product_variants.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-blue-50 p-4 rounded-md shadow-sm"
            >
              <div className="text-gray-700 font-medium">
                <span className="text-gray-500">Category: </span>
                {data?.category?.category_name}
              </div>
              <div className="text-gray-700 font-medium">
                <span className="text-gray-500">Price: </span>
                {item?.price}
              </div>
              <div className="text-gray-700 font-medium">
                <span className="text-gray-500">Color: </span>
                {item?.color?.name}
              </div>
              <div className="text-gray-700 font-medium">
                <span className="text-gray-500">Unit: </span>
                {item?.unit?.name}
              </div>
              <div className="text-gray-700 font-medium">
                <span className="text-gray-500">Attribute: </span>
                {item?.attribute?.name}
              </div>
              <div className="text-gray-700 font-medium">
                <span className="text-gray-500">Available Qty: </span>
                {item?.available_quantity}
              </div>
              <div className="text-gray-700 font-medium">
                <span className="text-gray-500">Discount Price: </span>
                {item?.discount_price}
              </div>
              <div className="text-gray-700 font-medium flex gap-4">
                <Link
                  to={`/dashboard/product-variant/edit/${data?.product_id}?product_variant_id=${item?.product_variant_id}`}
                >
                  <span className="">
                    <FaRegEdit />
                  </span>
                </Link>
                <span>
                  <span
                    className="text-red-700 cursor-pointer"
                    // onClick={()=>destroyss(item?.product_variant_id)}
                    onClick={() =>
                      openModal(
                        () => destroy(item?.product_variant_id),
                        <span>
                          Are you sure you want to delete{" "}
                          <span className="bg-blue-500 text-white font-semibold px-2 py-1 rounded">
                            {data?.title}
                          </span>{" "}
                          item?
                        </span>
                      )
                    }
                  >
                    <RiDeleteBin6Line />
                  </span>
                </span>
              </div>
               
            </div>
          ))}
        </>
      )}
    </div>
  );
};
