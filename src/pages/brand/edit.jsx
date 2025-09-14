import { useParams } from "react-router-dom";
import { Checkbox, TextInput } from "../../components/input";
import { Toastify } from "../../components/toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm  } from "react-hook-form";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import { useCallback, useEffect,   useState } from "react";
import { networkErrorHandeller } from "../../utils/helper";
import { SkeletonForm } from "../../components/loading/skeleton-table";

export const BrandEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues:{
      status:0
    }
  });

  /* reosure show */
  const fetchData = useCallback(async () => {
    try {
      const response = await NetworkServices.Brand.show(id);
     
      if (response.status === 200) {
        setData(response.data.data);
        setValue('status',response?.data?.data?.status)
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  }, []);

  /* submit reosurce */
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
      };
      const response = await NetworkServices.Brand.update(id, payload);
 
      if (response.status === 200) {
        navigate("/dashboard/brand");
        return Toastify.Success(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      networkErrorHandeller(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="flex justify-between shadow-md p-4 px-6 rounded-md bg-white mb-3">
        <h2 className=" font-semibold text-xl">Brand Update</h2>
        <Link to="/dashboard/brand">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>
      {data ? (
        <section className="shadow-md my-5 p-4 px-6">
          <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              {/* brand name */}
              <TextInput
                label="Category Name"
                name="name"
                type="text"
                placeholder="Enter category name"
                control={control}
                error={errors.name && errors.name.message}
                defaultvalue={data ? data?.name : "s"}
                rules={{ required: "Category name is required" }}
              />
            </div>
            <br/>
            <Checkbox
            name="status"
            control={control}
            label="Task Status"
            rules={{ required: "Status is required" }}
          />
            {/* submit button */}
            <div className="my-4 flex justify-center">
              <PrimaryButton
                loading={loading}
                name="Brand Update"
              ></PrimaryButton>
            </div>
          </form>
        </section>
      ) : (
        <>
          <SkeletonForm></SkeletonForm>
        </>
      )}
    </>
  );
};
