import React from "react";
import usePost from "../../../hooks/api/usePost";
import CreateForm from "../components/CreateForm";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const CreateDivision = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });
  const { postData, loading, data, error } = usePost();
  const onSubmit = async (data) => {
    postData("admin/division", data);
  };
  if (data) {
    // console.log(data)
    navigate(`/dashboard/division`);
  }

  return (
    <div>
      <section className="flex justify-between shadow-md p-4 px-6 rounded-md bg-white mb-3 mt-3">
        <h2 className=" font-semibold text-xl">Division Create</h2>
        <Link to="/dashboard/division">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>
      <CreateForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        errors={errors}
        btnName="Create Division"
      />
    </div>
  );
};

export default CreateDivision;
