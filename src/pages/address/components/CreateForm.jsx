import React from "react";
import { SingleSelect, TextInput } from "../../../components/input";
import { PrimaryButton } from "../../../components/button";

const CreateForm = ({
  control,
  errors,
  onSubmit,
  btnName,
  id = "",
  idData = [],
  setValue,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        {id ==="division_id" && (
          <SingleSelect
            name={id}
            control={control}
            options={idData}
            // onSelected={(selected) => setValue([id], selected?.name  )}
            onSelected={(selected) =>
                    setValue("division", selected?.value || null)
                  }
            placeholder={"select a devision"} 
            error={errors?.[id]?.message}
            label="Select Division"
            isClearable
          />
        )}
        {id ==="district_id" && (
          <SingleSelect
            name={id}
            control={control}
            options={idData}
            // onSelected={(selected) => setValue([id], selected?.name  )}
            onSelected={(selected) =>
                    setValue("district", selected?.value || null)
                  }
            placeholder={"select district"} 
            error={errors?.[id]?.message}
            label="Select district"
            isClearable
          />
        )}
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
          <PrimaryButton
            // loading={buttonLoading}
            name={btnName}
          ></PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
