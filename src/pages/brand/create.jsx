import { Toastify } from "../../components/toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import {   useState } from "react";
import { networkErrorHandeller } from "../../utils/helper";
import {
   
  Checkbox,
  TextInput,
} from "../../components/input";
 
export const BrandCreate = () => {
  const navigate = useNavigate(); 
  const [buttonLoading, setButtonLoading] = useState(false); 
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues:{
      status:0
    }
  });
  /* submit reosurce */
  const onSubmit = async (data) => {
    try {
      setButtonLoading(true);
      const payload = {
        ...data,
      };  
      const response = await NetworkServices.Brand.store(payload);
      if (response && (response.status === 201 || response?.status === 200)) {
        navigate('/dashboard/brand')
        setButtonLoading(false);
        return Toastify.Success("Brand Created.");
      }
    } catch (error) {
      setButtonLoading(false);
      networkErrorHandeller(error);
    }
  };

  return (
    <>
      <section className="flex justify-between shadow-md p-4 px-6 rounded-md bg-white mb-3">
        <h2 className=" font-semibold text-xl">Brand Create</h2>
        <Link to="/dashboard/brand">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>

      <section className="shadow-md my-5 p-4 px-6">
        <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 lg:mb-2">
            <TextInput
              label="Brand Name"
              name="name"
              type="text"
              placeholder="Enter Brand name"
              control={control}
              error={errors.name && errors.name.message}
              rules={{ required: "Brand Name is required" }}
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
              loading={buttonLoading}
              name="Brand create"
            ></PrimaryButton>
          </div>
        </form>
      </section>
    </>
  );
};
