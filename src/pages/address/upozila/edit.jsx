import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helper";
import { Toastify } from "../../../components/toastify";
import { SingleSelect, TextInput } from "../../../components/input";
import { PrimaryButton } from "../../../components/button";

const EditUpazila = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [district, setDistrict] = useState([]);
  const [districts, setDistricts] = useState([]);

  console.log("districts", districts);
  console.log("division", district);

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

  const fetchDivisionName = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.upazila.indexall();
      console.log("response", response);

      if (response && response.status === 200) {
        const result = response?.data?.data?.map((item, index) => {
          return {
            label: item.name,
            value: item.name,
            ...item,
          };
        });
        setDistricts(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // category api fetch
  useEffect(() => {
    fetchDivisionName();
  }, [fetchDivisionName]);

  const fetchDivision = async (id) => {
    setLoading(true);
    try {
      const response = await NetworkServices.upazila.show(id);
      //   console.log("response", response);

      if (response && response.status === 200) {
        const divisionName = response?.data?.data;
        setDistrict(divisionName);
        // console.log("divisionName", divisionName);

        setValue("name", divisionName?.name);
        setValue("bn_name", divisionName?.bn_name);
        setValue("district_id", divisionName?.district_id);
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
      const response = await NetworkServices.upazila.update(id, payload);

      if (response.status === 200) {
        navigate("/dashboard/upozila");
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
        <h2 className=" font-semibold text-xl">Upazila Update</h2>
        <Link to="/dashboard/upozila">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <SingleSelect
          name={id}
          control={control}
          options={districts}
          onSelected={(selected) =>
            setValue("district_id", selected?.id || null)
          }
          placeholder={
            districts.find((item) => item?.id == district.district_id)?.name ??
            "select parent Category"
          }
          error={errors?.[id]?.message}
          label="Select Division"
          isClearable
        />
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
          <PrimaryButton loading={loading} name="Edit Upazila"></PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default EditUpazila;
