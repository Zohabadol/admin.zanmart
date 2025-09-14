import { Toastify } from "../../components/toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import { useCallback, useEffect, useState } from "react";
import { networkErrorHandeller } from "../../utils/helper";
import "react-quill/dist/quill.snow.css";
import {
  Checkbox,
  ImageUpload,
  SingleSelect,
  TextInput,
} from "../../components/input";
import { SkeletonForm } from "../../components/loading/skeleton-table";
import ReactQuill from "react-quill";
import { productField } from "./data";

export const ProductEdit = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [multiImages, setMultiImages] = useState([]);
  const [categoryList, setCategoryData] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [product, setProduct] = useState({});
  const {
    control,

    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });
  //   single product fetch
  const fetchData = useCallback(
    async (product) => {
      try {
        setLoading(true);
        const response = await NetworkServices.Product.show(id);
        if (response?.status === 200 || response?.status === 201) {
          setProduct(response?.data?.data);

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
  }, []);

  //   multi state set in multisetate
  const handleMultiImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setMultiImages(files);
    }
  };
  //   fetch category
  const fetchDataForUnit = useCallback(async (category) => {
    try {
      //   setLoading(true);
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
        setCategoryData(data);
        setLoading(false);
      }
    } catch (error) {
      if (error) {
        networkErrorHandeller(error);
      }
    }
  }, []);
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
  useEffect(() => {
    fetchBrandList();
    fetchDataForUnit();
  }, []);
  /* submit reosurce */ 
  const onSubmit = async (data) => {
    try {
      setButtonLoading(true);
      const formData = new FormData();
      formData.append("title", data?.title); 
      formData.append("description", data?.description); 
      formData.append("sell_price", data?.sell_price); 
      formData.append("category_id", data?.category_id); 
      formData.append("rating", data?.rating); 
      formData.append("tax_price", data?.tax_price); 
      formData.append("buy_price", data?.buy_price); 
      formData.append("stock_qty", data?.stock_qty);  
      formData.append("flat_discount", data?.flat_discount);  
      formData.append("status", data?.status);  
      formData.append(
        "low_stock_quantity_warning",
        data?.low_stock_quantity_warning
      );
      data?.is_refundable_product_day &&
        formData.append(
          "is_refundable_product_day",
          data?.is_refundable_product_day
        );
      data?.brand_id && formData.append("brand_id", data?.brand_id);
      data?.singleImage &&
        formData.append("thumbnail_image", data?.singleImage);
      formData.append("_method", "PUT"); //
      multiImages &&
        multiImages.forEach((image, index) => {
          formData.append(`gallery_image[${index}]`, image);  
        });
      const response = await NetworkServices.Product.update(id, formData);
      if (response && (response.status === 201 || response?.status === 200)) {
        navigate("/dashboard/product");
        setButtonLoading(false);
        return Toastify.Success(response?.data?.message);
      }
    } catch (error) {
      setButtonLoading(false);
      networkErrorHandeller(error);
    }
  };
  // product field for update value added
  useEffect(() => {
    setValue("description", product?.description);
    setValue("title", product?.title);
    setValue("sell_price", product?.sell_price);
    setValue("category_id", product?.category_id);
    setValue("rating", product?.rating);
    setValue("tax_price", product?.tax_price);
    setValue("buy_price", product?.buy_price);
    setValue("stock_qty", product?.stock_qty);
    setValue("flat_discount", product?.flat_discount);
    setValue("low_stock_quantity_warning", product?.low_stock_quantity_warning);
    setValue("thumbnail_image", product?.thumbnail_image);
    setValue("brand_id", product?.brand_id);
    setValue("is_refundable_product_day", product?.is_refundable_product_day);
    setValue("status", product?.status);
  }, [product]);
  //   set decription
  const handleQuillChange = (content) => {
    setValue("description", content); // Update form state
  };
  console.log(product);
  return (
    <>
      <section className="flex justify-between shadow-md p-4 px-6 rounded-md bg-white mb-3">
        <h2 className=" font-semibold text-xl">Product update</h2>
        <Link to="/dashboard/product">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>

      {loading ? (
        <SkeletonForm />
      ) : (
        <section className="shadow-md my-5 p-4 px-6">
          <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
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
                  value={product?.description}
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
                name="Product update"
              ></PrimaryButton>
            </div>
          </form>
        </section>
      )}
    </>
  );
};
