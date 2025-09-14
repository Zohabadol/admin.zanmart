import { useParams } from "react-router-dom";
import { TextInput } from "../../../components/input";
import { Toastify } from "../../../components/toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm  } from "react-hook-form";
import { NetworkServices } from "../../../network/index";
import { PrimaryButton } from "../../../components/button";
import { useCallback, useEffect,   useState } from "react";
import { networkErrorHandeller } from "../../../utils/helper";
import { SkeletonForm } from "../../../components/loading/skeleton-table";

export const ColorEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* reosure show */
  const fetchData = useCallback(async () => {
    try {
      const response = await NetworkServices.Color.show(id); 
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  }, [id]);

  /* submit reosurce */
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
      };
      const response = await NetworkServices.Color.update(id, payload);
 
      if (response.status === 200) {
        navigate("/dashboard/color");
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
      <section className="flex justify-between shadow-md p-4 rounded-md bg-white mb-3">
        <h2 className=" font-semibold text-xl">Color Update</h2>
        <Link to="/dashboard/color">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>
      {data ? (
        <section className="shadow-md my-3 p-4  ">
          <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              {/* Brand name */} 
              <TextInput
                label="Color Name"
                name="name"
                type="text"
                placeholder="Enter Color name"
                control={control}
                error={errors.name && errors.name.message}
                defaultvalue={data ? data?.name : "s"}
                rules={{ required: "Color name is required" }}
              />
            </div>

            {/* submit button */}
            <div className="my-4 flex justify-center">
              <PrimaryButton
                loading={loading}
                name="Color Update"
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
