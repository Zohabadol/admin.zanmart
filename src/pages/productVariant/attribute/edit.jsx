import { useParams } from "react-router-dom";
import { Checkbox, SingleSelect, TextInput } from "../../../components/input";
import { Toastify } from "../../../components/toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../../network/index";
import { PrimaryButton } from "../../../components/button";
import { useCallback, useEffect, useState } from "react";
import { networkErrorHandeller } from "../../../utils/helper";
import { SkeletonForm } from "../../../components/loading/skeleton-table";

const AttributeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [unitId, setUnitId] = useState(null);

  const [unitData, setUnitData] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  /* reosure show */
  const fetchData = useCallback(async () => {
    try {
      const response = await NetworkServices.Attribute.show(id);
      console.log(response.data?.data?.unit);
      if (response.status === 200) { 
        setValue("unit_id", response?.data?.data?.unit?.unit_id);
        setData(response.data.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  }, [id]);

  useEffect(() => {
    const defaultUnit = unitData.find(
      (unit) => unit?.name === data?.unit?.name
    );
    if (defaultUnit) {
      setUnitId(defaultUnit.unit_id);
    }
  }, [data?.unit?.name, unitData]);

  /* submit reosurce */
  const onSubmit = async (dat) => {
    try {
      const payload = {
        ...dat,
        unit_id: dat?.unit_id,
      };

      const response = await NetworkServices.Attribute.update(id, payload);
  console.log(response?.data?.unit?.name);
      if (response.status === 200) {
       
        navigate("/dashboard/attribute");
        return Toastify.Success(response.data.message);
      }
    } catch (error) {
      //   setLoading(false);
      networkErrorHandeller(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // find unit litre

  const fetchDataForUnit = useCallback(async (category) => {
    try {
      setLoading(true);
      const response = await NetworkServices.Unit.index();

      if (response?.status === 200 || response?.status === 201) {
        const result = response?.data?.data?.data;
        const data = result.map((item) => {
          return {
            value: item?.unit_id,
            label: item?.name,
            ...item,
          };
        });
        setUnitData(data);
        setLoading(false);
      }
    } catch (error) {
      if (error) {
        networkErrorHandeller(error);
      }
    }
  }, []);
  useEffect(() => {
    fetchDataForUnit();
  }, []);
  return (
    <>
      {loading ? (
        <SkeletonForm />
      ) : (
        <>
          {" "}
          <section className="flex justify-between shadow-md p-4  rounded-md bg-white mb-3">
            <h2 className=" font-semibold text-xl">attribute Update</h2>
            <Link to="/dashboard/attribute">
              <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
                list
              </span>
            </Link>
          </section>
          <section className="shadow-md  ">
            <form className=" " onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6 lg:mb-2">
               
                <SingleSelect
                  name="unit_id"
                  control={control}
                  options={unitData}
                  onSelected={(selected) =>
                    setValue("unit_id", selected?.value || null)
                  }
                  placeholder={
                    unitData.find((item) => item.value === watch("unit_id"))
                      ?.label ?? "Select Parent Unit Id"
                  }
                  error={errors.unit_id?.message}
                  label="Choose a Units ID"
                  isClearable
                />
              </div>
              <div>
                {/* Brand name */}
                <TextInput
                  label="attribute Name"
                  name="name"
                  type="text"
                  placeholder="Enter attribute name"
                  control={control}
                  error={errors.name && errors.name.message}
                  defaultvalue={data ? data?.name : "s"}
                  rules={{ required: "attribute name is required" }}
                />
              </div>

              {/* submit button */}
              <div className="my-4 flex justify-center">
                <PrimaryButton
                  loading={loading}
                  name="attribute Update"
                ></PrimaryButton>
              </div>
            </form>
          </section>
        </>
      )}
    </>
  );
};
export default AttributeEdit;
