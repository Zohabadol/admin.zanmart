import { useParams } from "react-router-dom";
import { Checkbox, SingleSelect, TextInput } from "../../components/input";
import { Toastify } from "../../components/toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonForm } from "../../components/loading/skeleton-table";
import { FaCamera } from "react-icons/fa";
import { SearchDropdownWithSingle } from "../../components/input/selectsearch";

export const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const [selectedunitIds, setSelectedunitIds] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [singleImage, setSingleImage] = useState(null);
  const [updateBannerImage, setUpdateBannerImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdateBannerImage(file);
      const imageUrl = URL.createObjectURL(file);
      setSingleImage(imageUrl);
    }
  };
  // form submit
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });
  // fetch all category
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
  /* category single data show reosure show */
  const fetchData = useCallback(async () => {
    try {
      const response = await NetworkServices.Category.show(id);
      if (response.status === 200) {
        setSelectedunitIds(response?.data?.data?.units);
        setData(response.data.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  }, []);

  /* submit reosurce */
  const onSubmit = async (data) => {
    try {
      const ids = selectedunitIds.map((id) => id.unit_id);
      const formData = new FormData();
      formData.append("category_name", data?.category_name);
      data?.parent_id && formData.append("parent_id", data?.parent_id);
      formData.append("is_unit", JSON.stringify(ids));
      data?.is_color && formData.append("is_color", data?.is_color);
      formData.append("status", data?.status);
      formData.append("_method", "PUT");
      singleImage && formData.append("thumbnail", updateBannerImage);
      const response = await NetworkServices.Category.update(id, formData);
      if (response.status === 200) {
        // navigate("/dashboard/category");
        return Toastify.Success(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      networkErrorHandeller(error);
    }
  };
  // fetch unit data
  const fetchDataForUnit = useCallback(async (category) => {
    try {
      setLoading(true);
      const response = await NetworkServices.Unit.index();
      if (response?.status === 200 || response?.status === 201) {
        setUnitData(response?.data?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      if (error) {
        networkErrorHandeller(error);
      }
    }
  }, []);
  useEffect(() => {
    fetchData();
    fetchDataForUnit();
    fetchCategoryList();
  }, []);
  // unit seletected area
  const handleCheckboxChange = (unitId) => {
    // filter here
    const filter = selectedunitIds?.find((item) => item?.unit_id === unitId);
    if (filter) {
      setSelectedunitIds(
        selectedunitIds?.filter((item) => item?.unit_id !== unitId)
      );
    } else {
      setSelectedunitIds([
        ...selectedunitIds,
        { unit_id: unitId, name: filter?.name },
      ]);
    }
    // setSelectedunitIds([]);
  };
  useEffect(() => {
    setValue("name", data?.category?.category_name || "");
    setValue("parent_id", data?.category?.parent_id || "");
    setValue("is_color", data?.cateory?.is_color ? 1 : 0);
    setValue("status", data?.category?.status);
  }, [data, setValue]);

  return (
    <>
      <section className="flex justify-between shadow-md p-2 my-3 rounded-md bg-white mb-3">
        <h2 className=" font-semibold text-xl">Category Edit</h2>
        <Link to="/dashboard/category">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>
      {!loading ? (
        <section className="shadow-md mb-5 ">
          <form className="p " onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className=" ">
                <div className=" lg:mb-2  relative"> 
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
                      )?.label ?? "Select Parent Category Id"
                    }
                    error={errors.category_id?.message}
                    label="Choose a Parent Category"
                    isClearable
                  />
                </div>
              </div>
              {/* category name */}
              <div className="mb-6 lg:mb-2">
                {errors?.name ? (
                  <span className="text-red-500 text-sm">
                    {errors?.name?.message}
                  </span>
                ) : (
                  <span className="  text-sm">Category Title</span>
                )}
                <input
                  type="text"
                  value={data?.category?.category_name || ""}
                  {...register("category_name", {
                    required: {
                      value: true,
                      message: "Banner Title is required",
                    },
                    validate: (value) =>
                      value.trim() !== "" || "Title is required", // Optional validation to ensure non-empty
                  })}
                  onChange={(e) => {
                    setData({
                      ...data,
                      category: {
                        ...data.category,
                        category_name: e.target.value,
                      },
                    });
                  }}
                  placeholder="Enter your name"
                  className={`  w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 ${
                    errors?.name ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
              </div>
            </div>
            {/* here i make image field
             */}
            {/* banner image upload area  */}
            <div className="mb-6 lg:mb-2 w-full">
              <p className="text-sm mb-1 text-gray-500">Category Image</p>
              <div className="flex flex-col items-center">
                <label className="relative flex items-center justify-center w-full  h-48 md:h-72  border-2 border-dashed border-gray-300 cursor-pointer bg-gray-100 rounded-md">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSingleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {singleImage ? (
                    <img
                      src={singleImage}
                      alt="Uploaded"
                      className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <div>
                      <img
                        src={`${process.env.REACT_APP_BASE_API}${data?.category?.thumbnail}`}
                        alt="Uploaded"
                        className="absolute inset-0 w-full h-full object-cover rounded-md opacity-50"
                      />
                      <span className="text-gray-500 ">
                        <FaCamera className="text-black opacity-100 bg-gray-300 p-1 text-3xl  " />
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>
            {/* unit ids  */}
            <div className="mb-6 lg:mb-2">
              <p>Unit IDs</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
                {unitData.map((unit) => (
                  <div key={unit?.unit_id}>
                    <label className="space-x-2">
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          // checked={selectedunitIds.includes(unit?.unit_id)}
                          // checked={unit?.some((item)=>item.unit_id==unit?.unit_id)} // Handle checkbox selection
                          checked={selectedunitIds.some(
                            (item) => item?.unit_id == unit?.unit_id
                          )} // Handle checkbox selection
                          // checked={selectedunitIds.includes(unit?.unit_id)} // Handle checkbox selection
                          onChange={() => handleCheckboxChange(unit?.unit_id)} // Handle checkbox selection
                          className="cursor-pointer"
                        />
                        <span>{unit?.name}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* is coloer  */}
            <div className="mb-6 lg:mb-2">
              <p>Is Color?</p>
              <input
                type="checkbox"
                {...register("checkbox")}
                checked={data?.category?.is_color}
                onChange={() =>
                  setData({
                    ...data,
                    category: {
                      ...data.category,
                      is_color: data?.category?.is_color ? 0 : 1,
                    },
                  })
                }
              />
            </div>
            <Checkbox
              name="status"
              control={control}
              label="Category Status"
              rules={{ required: "Status is required" }}
            />
            {/* submit button */}
            <div className="my-4 flex justify-center">
              <PrimaryButton
                loading={loading}
                name="Category Update"
              ></PrimaryButton>
            </div>
          </form>
        </section>
      ) : (
        <>
          <SkeletonForm></SkeletonForm>
        </>
      )}
    </>
  );
};
