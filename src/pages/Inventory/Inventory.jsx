import React from 'react';
import { SingleSelect } from '../../components/input/index';
import { useForm } from 'react-hook-form';

const Inventory = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
  return (
   
    <div>
      {/* <SingleSelect
       label="Parent Category"
       name="parent_id"
       control={control}
       error={errors.parent_id && errors.parent_id.message}
    //    options={options}
       isClearable={true}
       placeholder="Select parent category"
       ></SingleSelect> */}
       djdjhfsd
    </div>
  );
};

export default Inventory;