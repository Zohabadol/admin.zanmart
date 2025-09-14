import { Toastify } from "../../components/toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import { useCallback, useEffect, useState } from "react";
import { networkErrorHandeller } from "../../utils/helper";
import { Checkbox, SingleSelect, TextInput } from "../../components/input";
import { SkeletonForm } from "../../components/loading/skeleton-table";
import { FaCamera } from "react-icons/fa";
import Select, { components } from "react-select";
import { SearchDropdownWithSingle } from "../../components/input/selectsearch";
export const CategoryCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedunitIds, setSelectedunitIds] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [singleImage, setSingleImage] = useState(null);
  const [showSingleImage, setShowSingleImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  // uploadProgress
  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSingleImage(file);
      const imageUrl = URL.createObjectURL(file);
      setShowSingleImage(imageUrl);
    }
  };
  // submit form for cateogyr
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });
  //  unit data fetch function
  const fetchDataForUnit = useCallback(async (category) => {
    try {
      // setLoading(true);
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
    // call unit fetch function
    fetchDataForUnit();
  }, []);
  // submit functionality for the category
  const onSubmit = async (data) => {
    try {
      setButtonLoading(true);
      const formData = new FormData();
      formData.append("category_name", data?.category_name);
      data?.parent_id && formData.append("parent_id", data?.parent_id);
      formData.append("is_unit", JSON.stringify(selectedunitIds));
      data?.is_color && formData.append("is_color", data?.is_color);
      formData.append("status", data?.status);
      singleImage && formData.append("thumbnail", singleImage);
      const response = await NetworkServices.Category.store(formData);
      if (response && (response.status === 201 || response?.status === 200)) {
        navigate("/dashboard/category");
        setButtonLoading(false);
        return Toastify.Success("Category Created.");
      }
    } catch (error) {
      setButtonLoading(false);
      networkErrorHandeller(error);
    }
  };
  // unit id multple and unselected selected function here
  const handleCheckboxChange = (unitId) => {
    setSelectedunitIds((prevSelected) => {
      if (prevSelected.includes(unitId)) {
        // If the unit ID is already selected, remove it
        return prevSelected.filter((id) => id !== unitId);
      } else {
        // If the unit ID is not selected, add it
        return [...prevSelected, unitId];
      }
    });
  };

  // fetch category list here
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
  useEffect(() => {
    fetchCategoryList();
  }, []);
  return (
    <>
      <section className="flex justify-between shadow-md p-2 my-3 rounded-md bg-white mb-3">
        <h2 className=" font-semibold text-xl">Category Create</h2>
        <Link to="/dashboard/category">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>

      {loading ? (
        <SkeletonForm />
      ) : (
        <section className="shadow-md mb-5  ">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            {/* category name */}

            <div className="mb-6 lg:mb-2  relative">
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

            <div className="mb-6 lg:mb-2">
              <TextInput
                label="Category Name"
                name="category_name"
                type="text"
                placeholder="Enter category name"
                control={control}
                error={errors.name && errors.name.message}
                rules={{ required: "Category Name is required" }}
              />
            </div>
            {/* image section  */}
            <div className="mb-6 lg:mb-2 w-full z-10">
              <p className="text-sm mb-1 text-gray-500">Banner Image</p>
              <div className="flex flex-col items-center cursor-pointer">
                <label className="relative flex items-center justify-center w-full  h-36 md:h-36  border-2 border-dashed border-gray-300 cursor-pointer bg-gray-100 rounded-md">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSingleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {singleImage ? (
                    <img
                      src={showSingleImage}
                      alt="Uploaded"
                      className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <div>
                      <span className="text-gray-500 ">
                        <FaCamera className="text-black opacity-100    text-3xl  " />
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="mb-6 lg:mb-2">
              <p>Unit IDs</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
                {unitData.map((unit) => (
                  <div key={unit?.unit_id}>
                    <label className="space-x-2">
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          checked={selectedunitIds.includes(unit?.unit_id)}
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
            <div className="mb-6 lg:mb-2">
              <p>Is Color?</p>
              <input
                type="checkbox"
                {...register("checkbox")}
                onChange={(e) => setValue("is_color", e.target.checked ? 1 : 0)}
              />
            </div>
            <br />
            <Checkbox
              name="status"
              control={control}
              label="Task Status"
              rules={{ required: "Status is required" }}
            />
            {/* submit button */}
            <div className="my-4 flex justify-center">
              <PrimaryButton
                loading={buttonLoading}
                name="Category create"
              ></PrimaryButton>
            </div>
          </form>
        </section>
      )}
    </>
  );
};
