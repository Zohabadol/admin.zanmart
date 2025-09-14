import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helper";
import { Toastify } from "../../../components/toastify";
import { TextInput } from "../../../components/input";
import { PrimaryButton } from "../../../components/button";

const EditDivision = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

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

  const fetchDivision = async (id) => {
    setLoading(true);
    try {
      const response = await NetworkServices.Division.show(id);
      console.log("response", response);

      if (response && response.status === 200) {
        const divisionName = response?.data?.data;

        setValue("name", divisionName?.name);
        setValue("bn_name", divisionName?.bn_name);
      }
    } catch (error) {
      // console.error("Error fetching category:", error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchDivision(id);
    }
  }, [id]);

  const onFormSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
      };
      const response = await NetworkServices.Division.update(id, payload);

      if (response.status === 200) {
        navigate("/dashboard/division");
        return Toastify.Success(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      networkErrorHandeller(error);
    }
  };

  return (
    <div>
      <section className="flex justify-between shadow-md p-4 px-6 rounded-md bg-white mb-3 mt-3">
        <h2 className=" font-semibold text-xl">Division Update</h2>
        <Link to="/dashboard/division">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <TextInput
          label="Name"
          name="name"
          type="text"
          placeholder="Enter Name"
          control={control}
          error={errors.name && errors.name.message}
          rules={{ required: "Name is required" }}
        />
        <TextInput
          label="Bn Name"
          name="bn_name"
          type="text"
          placeholder="Enter bn name"
          control={control}
          error={errors.name && errors.name.message}
          rules={{ required: "Bn Name is required" }}
        />
        <div className="my-4 pb-4 flex justify-center">
          <PrimaryButton loading={loading} name="Edit Division"></PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default EditDivision;
