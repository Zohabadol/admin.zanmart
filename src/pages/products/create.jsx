import { Toastify } from "../../components/toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import { useCallback, useEffect, useState } from "react";
import { networkErrorHandeller } from "../../utils/helper";
import "react-quill/dist/quill.snow.css";

import { SkeletonForm } from "../../components/loading/skeleton-table";
import ReactQuill from "react-quill";
import { SearchDropdownWithSingle } from "../../components/input/selectsearch";
import {
  Checkbox,
  ImageUpload,
  SingleSelect,
  TextInput,
} from "../../components/input";
import { productField } from "./data";

export const ProductCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [singleImage, setSingleImage] = useState(null);
  const [multiImages, setMultiImages] = useState([]);
  // react hooks form
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });

  //   multi state set in multisetate
  const handleMultiImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setMultiImages(files);
    }
  };

  /* submit reosurce */

  const onSubmit = async (data) => {
    try {
      setButtonLoading(true);
      const formData = new FormData();
      formData.append("title", data?.title); // Other form fields
      formData.append("description", data?.description); // Other form fields
      formData.append("short_description", data?.short_description); // Other form fields
      formData.append("sell_price", data?.sell_price); // Other form fields
      formData.append("category_id", data?.category_id); // Other form fields
      formData.append("rating", data?.rating); // Other form fields
      formData.append("tax_price", data?.tax_price); // Other form fields
      formData.append("buy_price", data?.buy_price); // Other form fields
      formData.append("flat_discount", data?.flat_discount); // Other form fields
      formData.append("stock_qty", data?.stock_qty); // Other form fields
      data?.is_refundable_product_day &&
        formData.append(
          "is_refundable_product_day",
          data?.is_refundable_product_day
        ); // Other form fields
      data?.brand_id && formData.append("brand_id", data?.brand_id); // Other form fields
      formData.append(
        "low_stock_quantity_warning",
        data?.low_stock_quantity_warning
      ); // Other form fields
      formData.append("thumbnail_image", data?.singleImage);
      multiImages.forEach((image, index) => {
        formData.append(`gallery_image[${index}]`, image); // Append multiple images
      });
      formData.append("status", data?.status);
      const response = await NetworkServices.Product.store(formData);

      if (response && (response.status === 201 || response?.status === 200)) {
        navigate(
          `/dashboard/product-variant/create/${response?.data?.data?.product_id}`
        );
        setButtonLoading(false);
        return Toastify.Success(response?.data?.message);
      }
    } catch (error) {
      setButtonLoading(false);
      networkErrorHandeller(error);
    }
  };
  // description handler react quill
  const handleQuillChange = (content) => {
    setValue("description", content); // Update form state
  };
  const handleQuillChange1 = (content) => {
    setValue("short_description", content); // Update form state
  };

  // fetch category list
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  // category fetch
  const fetchCategoryList = async () => {
    try {
      const response = await NetworkServices.Category.index();
      if (response?.status === 200 || response?.status === 201) {
        const result = response?.data?.data?.data;
        //  setCategoryList(result);
        const data = result.map((item) => {
          return {
            label: item?.category_name,
            value: item?.category_id,
            ...item,
          };
        });
        setCategoryList(data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  // fetch brand list
  const fetchBrandList = async () => {
    try {
      const response = await NetworkServices.Brand.index();
      if (response?.status === 200 || response?.status === 201) {
        const result = response?.data?.data?.data;
        //  setCategoryList(result);
        const data = result.map((item) => {
          return {
            label: item?.name,
            value: item?.brand_id,
            ...item,
          };
        });
        setBrandList(data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  // fetch brand and category list
  useEffect(() => {
    fetchCategoryList();
    fetchBrandList();
  }, []);
  return (
    <>
      <section className="flex justify-between shadow-md p-4 px-6 rounded-md bg-white mb-3">
        <h2 className=" font-semibold text-xl">Product Create</h2>
        <Link to="/dashboard/product">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>

      {loading ? (
        <SkeletonForm />
      ) : (
        <section className="shadow-md my-5  ">
          <form
            className="px-4 py-3 space-y-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
              {productField.map((item, idx) => (
                <div key={idx}>
                  <TextInput
                    label={item?.label}
                    name={item?.name}
                    type={item?.type}
                    placeholder={item?.placeholder}
                    control={control}
                    error={errors[item?.name] && errors[item?.name].message}
                    rules={{ required: item?.rules }}
                    min={item?.min}
                    max={item?.max}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className=" lg:mb-2 w-full">
                <SingleSelect
                  name="category_id"
                  control={control}
                  options={categoryList}
                  onSelected={(selected) =>
                    setValue("category_id", selected?.value || null)
                  }
                  placeholder={
                    categoryList.find(
                      (item) => item.value === watch("category_id")
                    )?.label ?? "Select Category"
                  }
                  error={errors.category_id?.message}
                  label="Choose a Category *"
                  isClearable
                  rules={{ required: "Product Category is required" }}
                />
              </div>
              {/* category field
               */}
              <div className="w-full">
                <SingleSelect
                  name="brand_id"
                  control={control}
                  options={brandList}
                  onSelected={(selected) =>
                    setValue("brand_id", selected?.value || null)
                  }
                  placeholder={
                    brandList.find((item) => item.value === watch("brand_id"))
                      ?.label ?? "Select Brand Id"
                  }
                  error={errors.brand_id?.message}
                  label="Choose a Brand"
                  isClearable
                />
              </div>
            </div>

            {/* short description field  */}

            <div className="mb-6 lg:mb-2">
              <p className="text-sm mb-1 text-gray-500">
                Product Short Description 
              </p>
              <div className="quill-wrapper   rounded-lg border border-gray-300 overflow-hidden">
                <ReactQuill
                  onChange={handleQuillChange1}
                  placeholder="Write your description..."
                  className="w-full overflow-y-auto h-32 bg-white rounded-md"
                />
                {errors?.description && (
                  <p className="text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
            {/* description field  */}

            <div className="mb-6 lg:mb-2">
              <p className="text-sm mb-1 text-gray-500">
                Product Description
                <span className="text-red-500">*</span>
              </p>
              <div className="quill-wrapper   rounded-lg border border-gray-300 overflow-hidden">
                <ReactQuill
                  onChange={handleQuillChange}
                  placeholder="Write your description..."
                  className="w-full overflow-y-auto h-72 bg-white rounded-md"
                />
                {errors?.description && (
                  <p className="text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* image area coide  */}
            <div className="space-y-2">
              {/* thumbnail image  */}
              <div>
                <ImageUpload
                  control={control}
                  name="singleImage"
                  label="Thumbnail Image"
                  error={errors?.singleImage && errors?.singleImage.message}
                  rules={{ required: "please insert image" }}
                />
              </div>
              {/* gallary iamge  */}
              <div className="mb-6 lg:mb-2 w-full">
                <p className="text-sm mb-1 text-gray-500">
                  Gallary Image
                  {/* <span className="text-red-500">*</span> */}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultiImageChange}
                  className="file-input file-input-bordered file-input-info w-full  "
                />
              </div>
            </div>
            <Checkbox
              name="status"
              control={control}
              label="Product Status"
              rules={{ required: "Status is required" }}
            />
            {/* submit button */}
            <div className="my-4 flex justify-center">
              <PrimaryButton
                loading={buttonLoading}
                name="Product create"
              ></PrimaryButton>
            </div>
          </form>
        </section>
      )}
    </>
  );
};
