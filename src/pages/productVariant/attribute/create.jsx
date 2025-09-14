import { Toastify } from "../../../components/toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../../network/index";
import { PrimaryButton } from "../../../components/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { networkErrorHandeller } from "../../../utils/helper";
import { Checkbox, SingleSelect, TextInput } from "../../../components/input";
import { SkeletonForm } from "../../../components/loading/skeleton-table";

const AttributeCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [unitId, setUnitId] = useState(null);
  const [unitData, setUnitData] = useState([]);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  /* submit reosurce */
  const onSubmit = async (data) => {
    try {
      setButtonLoading(true);
      const payload = {
        ...data,
        unit_id: data?.unit_id,
      };
      const response = await NetworkServices.Attribute.store(payload);
      if (response && (response.status === 201 || response?.status === 200)) {
        navigate("/dashboard/attribute");
        setButtonLoading(false);
        return Toastify.Success("attribute Created.");
      }
    } catch (error) {
      setButtonLoading(false);
      networkErrorHandeller(error);
    }
  };
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
          <section className="flex justify-between shadow-md p-4 rounded-md bg-white mb-3">
            <h2 className=" font-semibold text-xl">attribute Create</h2>
            <Link to="/dashboard/attribute">
              <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
                list
              </span>
            </Link>
          </section>

          <section className="shadow-md    ">
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
              <div className="mb-6 lg:mb-2">
                <TextInput
                  label="Attribute Name"
                  name="name"
                  type="text"
                  placeholder="Enter attribute name"
                  control={control}
                  error={errors.name && errors.name.message}
                  rules={{ required: "attribute Name is required" }}
                />
              </div>

              {/* submit button */}
              <div className="my-4 flex justify-center">
                <PrimaryButton
                  loading={buttonLoading}
                  name="attribute create"
                ></PrimaryButton>
              </div>
            </form>
          </section>
        </>
      )}
    </>
  );
};

export default AttributeCreate;
