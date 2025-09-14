import { Toastify } from "../../components/toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import { useState } from "react";
import { networkErrorHandeller } from "../../utils/helper";
import { FaCamera } from "react-icons/fa";
import { Checkbox, TextInput } from "../../components/input";

export const BannerCreate = () => {
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [singleImage, setSingleImage] = useState(null);
  const [showSingleImage, setShowSingleImage] = useState(null);
  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSingleImage(file);
      const imageUrl = URL.createObjectURL(file);
      setShowSingleImage(imageUrl);
    }
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });

  /* submit reosurce */
  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      setButtonLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("image", singleImage);
      formData.append("status", data?.status);
      formData.append("is_campaign", data?.is_campaign);

      const response = await NetworkServices.Banner.store(formData);
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

  return (
    <>
      <section className="flex justify-between shadow-md p-2   rounded-md bg-white my-3">
        <h2 className=" font-semibold text-xl">Banner Create</h2>
        <Link to="/dashboard/banner">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>

      <section className="shadow-md my-2  ">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 lg:mb-2">
            <TextInput
              label="Banner Title"
              name="name"
              type="text"
              placeholder="Enter banner title"
              control={control}
              error={errors.name && errors.name.message}
              // rules={{ required: "Banner title is required" }}
            />
          </div>
          <div className="mb-6 lg:mb-2 w-full ">
            <p className="text-sm mb-1 text-gray-500">Banner Image</p>
            <div className="flex flex-col items-center cursor-pointer">
              <label className="relative flex items-center justify-center w-full  h-48 md:h-72  border-2 border-dashed border-gray-300 cursor-pointer bg-gray-100 rounded-md">
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
          {/* status  */}

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

          {/* submit button */}
          <div className="my-4 pb-4 flex justify-center">
            <PrimaryButton
              loading={buttonLoading}
              name="Banner create"
            ></PrimaryButton>
          </div>
        </form>
      </section>
    </>
  );
};
