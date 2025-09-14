import { Toastify } from "../../components/toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import {   useState } from "react";
import { networkErrorHandeller } from "../../utils/helper";
import { ImageUpload, TextInput } from "../../components/input";
import { websettingInputFieldData } from "./data";

export const WebSettingCreate = () => {
  const navigate = useNavigate(); 
  const [buttonLoading, setButtonLoading] = useState(false); 
  const {
    control,
    handleSubmit, 
    formState: { errors },
  } = useForm();
  /* submit reosurce */ 
  const onSubmit = async (data) => {
    try {
      setButtonLoading(true);
      const formData = new FormData();
      websettingInputFieldData.forEach((key) => {
        formData.append(key?.name, data[key?.name]);
      });
      data?.logo && formData.append("logo", data?.logo) ;
      const response = await NetworkServices.WebSetting.store(formData);
      if (response && (response.status === 201 || response?.status === 200)) {
        navigate("/dashboard/web-setting");
        setButtonLoading(false);
        return Toastify.Success("Web setting Created.");
      }
    } catch (error) {
      setButtonLoading(false);
      networkErrorHandeller(error);
    }
  };

  return (
    <>
      <section className="flex justify-between shadow-md p-4  rounded-md bg-white mb-3">
        <h2 className=" font-semibold text-xl">Create Web setting</h2>
        <Link to="/dashboard/web-setting">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>

      <section className="shadow-md my-5    ">
        <form className=" " onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {websettingInputFieldData.map((item, idx) => (
              <div
                key={idx}
                className={item?.name === "logo" ? "md:col-span-2" : ""}
              >
                {item?.name === "logo" ? (
                  <ImageUpload
                    control={control}
                    name={item?.name}
                    label={item?.label}
                    error={errors?.singleImage && errors?.singleImage.message}
                    rules={{ required: item?.rules }}
                  />
                ) : (
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
                )}
              </div>
            ))}
          </div>
          {/* submit button */}
          <div className="my-4 flex justify-center">
            <PrimaryButton
              loading={buttonLoading}
              name="Web Setting create"
            ></PrimaryButton>
          </div>
        </form>
      </section>
    </>
  );
};
