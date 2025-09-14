import { Toastify } from "../../components/toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import { useCallback, useEffect, useState } from "react";
import { networkErrorHandeller } from "../../utils/helper";
import { ImageUpload, TextInput } from "../../components/input";
import { websettingInputFieldData } from "./data";
import WebSettingEditSkeleton from "../../components/loading/web-skeleton-form";

export const WebSettingEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [data, setData] = useState({});
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  /* submit reosurce */

  const onSubmit = async (data) => {
    try {
      setButtonLoading(true);
      const formData = new FormData();
      websettingInputFieldData.forEach((key) => {
        if (key.name !== "logo") {
          formData.append(key?.name, data[key?.name]);
        }
      });
      formData.append("_method", "PUT");
      data?.logo && formData.append("logo", data?.logo);
      const response = await NetworkServices.WebSetting.update(id, formData);
      if (response && (response.status === 201 || response?.status === 200)) {
        navigate("/dashboard/web-setting");
        setButtonLoading(false);
        return Toastify.Success(response?.data?.message);
      }
    } catch (error) {
      setButtonLoading(false);
      networkErrorHandeller(error);
    }
  };
  const fetchData = useCallback(async () => {
    try {
      const response = await NetworkServices.WebSetting.show(id);
      if (response.status === 200) {
        setLoading(false);
        const result = response.data.data;
        setData(response.data.data);
        websettingInputFieldData.forEach((key) => {
          if (key.name !== "logo") {
            setValue(key?.name, result[key?.name]);
          }
        });
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  }, [id]);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="flex justify-between shadow-md p-4   rounded-md bg-white mb-3">
        <h2 className=" font-semibold text-xl">Web Setting Edit</h2>
        <Link to="/dashboard/web-setting">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>
      {loading ? (
        <WebSettingEditSkeleton />
      ) : (
        <section className="shadow-md my-5   ">
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
                      imgUrl={data?.logo}
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
      )}
    </>
  );
};
