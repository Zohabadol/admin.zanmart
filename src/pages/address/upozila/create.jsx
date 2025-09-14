import React from "react";
import usePost from "../../../hooks/api/usePost";
import CreateForm from "../components/CreateForm";
import { useForm } from "react-hook-form";
import useFetch from "../../../hooks/api/useFetch";
import { Link, useNavigate } from "react-router-dom";

const CreateUpozila = () => {
  const navigate = useNavigate();
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
  const { postData, loading, data, error } = usePost();
  const { data: districtData } = useFetch("admin/district-dropdown");
  console.log("districtData", districtData);
  const onSubmit = async (data) => {
    const updateData = {
      ...data,
      district_id: data?.district_id?.id,
    };
    postData("admin/upazila", updateData);
  };
  if (data) {
    // console.log(data)
    navigate(`/dashboard/upozila`);
  }

  if (loading) return;

  return (
    <div>
      <section className="flex justify-between shadow-md p-4 px-6 rounded-md bg-white mb-3 mt-3">
        <h2 className=" font-semibold text-xl">Create Upazila</h2>
        <Link to="/dashboard/upozila">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>
      <CreateForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        errors={errors}
        btnName="Create Upazila"
        id="district_id"
        idData={districtData?.data?.map((item) => {
          return {
            ...item,
            value: item?.id,
            label: item?.name,
          };
        })}
        setValue={setValue}
      />
    </div>
  );
};

export default CreateUpozila;
