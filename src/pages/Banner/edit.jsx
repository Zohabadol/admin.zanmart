import { Toastify } from "../../components/toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import { useCallback, useEffect, useState } from "react";
import { networkErrorHandeller } from "../../utils/helper";
import { FaCamera } from "react-icons/fa";
import { Checkbox, TextInput } from "../../components/input";

export const BannerEdit = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", image: "" });
  const { id } = useParams();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [singleImage, setSingleImage] = useState(null);
  const [updateBannerImage, setUpdateBannerImage] = useState(null);
  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdateBannerImage(file);
      const imageUrl = URL.createObjectURL(file);
      setSingleImage(imageUrl);
    }
  };
  const fetchData = useCallback(async () => {
    try {
      const response = await NetworkServices.Banner.show(id);

      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  }, [id]);
  // fetch banner single data
  useEffect(() => {
    fetchData();
  }, []);
  // here i decalre react hook forms




  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useForm();


  /* submit reosurce */
  const onSubmit = async (bannerFormData) => {
    try {
      setButtonLoading(true);
      const formData = new FormData();
      formData.append("name", bannerFormData?.name);
     updateBannerImage && formData.append(
        "image",
        updateBannerImage 
      );
      formData.append("status", bannerFormData?.status);
      formData.append("is_campaign", bannerFormData?.is_campaign);
      formData.append("_method", "PUT");
      const response = await NetworkServices.Banner.update(id, formData);
      if (response && (response.status === 201 || response?.status === 200)) {
        navigate("/dashboard/banner");
        setButtonLoading(false);
        return Toastify.Success(response?.data?.message);
      }
    } catch (error) {
      setButtonLoading(false);
      networkErrorHandeller(error);
    }
  };
  // value set for update in form
  useEffect(() => {
    setValue("name", data?.name || "");
    setValue("status", data?.status);
    setValue("is_campaign", data?.is_campaign);
  }, [data, setValue]);
  return (
    <>
      <section className="flex justify-between shadow-md p-2   rounded-md  my-3">
        <h2 className=" font-semibold text-xl">Banner Edit</h2>
        <Link to="/dashboard/banner">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>

      <section className="shadow-md my-2 ">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 lg:mb-2">
            {errors?.name ? (
              <span className="text-red-500 text-sm">
                {errors?.name?.message}
              </span>
            ) : (
              <span className="  text-sm">Banner Title</span>
            )}
            <input
              type="text"
              value={data?.name || ""}
              {...register("name", {
                required: {
                  value: true,
                  message: "Banner Title is required",
                },
                validate: (value) => value.trim() !== "" || "Title is required", // Optional validation to ensure non-empty
              })}
              onChange={(e) => {
                setData({
                  ...data,
                  name: e.target.value,
                });
              }}
              placeholder="Enter your name"
              className={`  w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300 ${
                errors?.name ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
          </div>
          {/* banner image upload area  */}
          <div className="mb-6 lg:mb-2 w-full">
            <p className="text-sm mb-1 text-gray-500">Banner Image</p>
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
                      src={`${process.env.REACT_APP_BASE_API}${data?.image}`}
                      alt="Uploaded"
                      className="absolute inset-0 w-full h-full object-cover rounded-md opacity-50"
                    />
                    <span className="text-gray-500 ">
                      <FaCamera className="text-black opacity-100 bg-gray-300 p-1 text-3xl  " />
                    </span>
                  </div>
                )}
              </label>

              {/* Optional: Display file name or upload button */}
              {singleImage && (
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={() => setSingleImage(null)}
                >
                  Remove Image
                </button>
              )}
            </div>
            <br />
            <Checkbox
              name="status"
              control={control}
              label="Task Status"
              rules={{ required: "Status is required" }}
            />
            <Checkbox
              name="is_campaign"
              control={control}
              label="Is Campain"
              rules={{ required: "Status is required" }}
            />

          </div>
          {/* submit button */}
          <div className="my-4 flex justify-center">
            <PrimaryButton
              loading={buttonLoading}
              name="Banner Update"
            ></PrimaryButton>
          </div>
        </form>
      </section>
    </>
  );
};
