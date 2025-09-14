import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { NetworkServices } from "../../../network";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Toastify } from "../../../components/toastify";
import { SkeletonForm } from "../../../components/loading/skeleton-table";
import { useFieldArray, useForm } from "react-hook-form";
import { SingleSelect, TextInput } from "../../../components/input";
import { networkErrorHandeller } from "../../../utils/helper";
import useFetch from "../../../hooks/api/useFetch";
import usePost from "../../../hooks/api/usePost";
import VariantModal from "../Components/VariantModal";
import { PrimaryButton } from "../../../components/button";
import { attributeField, colorField, unitField } from "./data";
const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match_unitId, setIds] = useState("");
  const [colorModal, setColorModal] = useState(false);
  const [dynamicAttributeName, setDynamicAttributeName] = useState({
    key: "",
    value: [],
  });
  // react hook form declaration
   const {
    data: product,
    loading: productLoading,
    refetch: fetchproduct,
  } = useFetch("admin/product/" + id);

  const {
    control,
    handleSubmit,
     reset:resetFrom,
    formState: { errors },
   
  } = useForm({
    defaultValues: {
      variant: [{ weight: "" ,price:product?.data?.sell_price, flat_discount:product?.data?.flat_discount,quantity: product?.data?.product_qty,available_quantity: product?.data?.available_quantity }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variant",
  });
  // color fetch for set product vairant
  const {
    data: colors,
    loading: colorLoading,
    refetch: fetchColor,
  } = useFetch("admin/color");
  // unit fetch
  const {
    data: units,
    loading: unitLoading,
    refetch: fetchUnit,
  } = useFetch("admin/unit");
  // attribute fetch
  const {
    data: attributes,
    loading: attributeLoading,
    refetch: fetchAttribute,
  } = useFetch("admin/attribute");
 
  const onSubmit = async (e) => {
    try {
      const updateValue = e.variant.map((e) => {
        return {
          product_id: Number(id),
          color_id: Number(e?.color?.color_id),
          attribute_id: Number(e?.attributes?.attribute_id),
          unit_id: Number(e?.unit?.unit_id),
          product_qty: Number(e?.quantity),
          weight: Number(e?.weight),
          price: Number(e?.price),
          discount_price: Number(e?.flat_discount),
          available_quantity: Number(e?.available_quantity),
        };
      });
      const response = await NetworkServices.ProductVariant.store(updateValue);
      if (response.status === 200 || response.status === 201) {
        navigate("/dashboard/product");
        return Toastify.Success("Product varaint create successfully.");
      }
    } catch (error) {
      return networkErrorHandeller(error);
    }
  };

  //  random color call for every form to see detairmind easily
  const callColor = (index) => {
    const randomColor = [
      "bg-blue-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-gray-200",
      "bg-lime-200",
      "bg-teal-200",
      "bg-indigo-200",
      "bg-purple-200",
      "bg-rose-900",
    ];
    const randomNumber = Math.ceil(Math.random() * 10);
    if (index >= 9) {
      return randomColor[randomNumber - 1];
    }
    return randomColor[index];
  };
  // added  attribute function
  const {
    control: newControl,
    handleSubmit: newColorAdded,
    formState: { errors: colorError },
    reset,
    setValue
  } = useForm();

  // post attribute
  const { data: colorData, loading: ColorLoading, error, postData } = usePost();
  const colorSubmit = async (data) => {
    let payload = { ...data };
    if (data?.unit_id) {
      payload.unit_id = data.unit_id?.unit_id;
    }
    const res = await postData(dynamicAttributeName?.key, payload);
    if (res) {
      if (dynamicAttributeName?.key === "admin/color") {
        fetchColor();
      }
      if (dynamicAttributeName?.key === "admin/unit") {
        fetchUnit();
      }
      if (dynamicAttributeName?.key === "admin/attribute") {
        fetchAttribute();
      }
      setColorModal(false);
      reset();
      return Toastify.Success(res?.message);
    }
  };
  // valu label added in unit color attribute section
  const selectValueLabelFieldAddedFunction = (
    data = [],
    label = "",
    value = ""
  ) => {
    return data.map((item) => {
      return {
        ...item,
        value: item?.[value],
        label: item?.[label],
      };
    });
  };

useEffect(() => {
  if (product?.data) {
    resetFrom({
      variant: [{
        weight: "",
        price: product.data.sell_price ?? "",
        flat_discount: product.data.flat_discount ?? "",
        quantity: product?.data?.stock_qty,
        available_quantity: product?.data?.available_quantity
      }]
    });
  }
}, [product?.data, resetFrom]);
  return (
    <>
      {(unitLoading || attributeLoading || colorLoading) && false ? (
        <SkeletonForm />
      ) : (
        <div className="p-6 bg-gray-100 rounded-md shadow-md mx-auto">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold mb-4 text-gray-700">
              Product Information
            </h2>
            <Link to={`/dashboard/product/`}>
              <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
                list
              </span>
            </Link>
          </div>
          {colorModal && (
            <VariantModal setOpen={setColorModal}>
              <section className="     ">
                <form className=" " onSubmit={newColorAdded(colorSubmit)}>
                  <div className=" ">
                    {dynamicAttributeName?.value.map((item, idx) => (
                      <div key={idx} className="pt-1">
                        {item?.type == "select" && (
                          <SingleSelect
                            label=" Select Attributes"
                            name={item?.name}
                            error={
                              errors[item?.name] && errors[item?.name].message
                            }
                            control={newControl}
                            isClearable={true}
                            placeholder={item?.placeholder}
                            options={selectValueLabelFieldAddedFunction(
                              units?.data?.data,
                              "name",
                              "unit_id"
                            )}
                            rules={{ required: item?.rules }}
                          />
                        )}
                        {["text", "number"].includes(item?.type) && (
                          <TextInput
                            label={item?.label}
                            name={item?.name}
                            type={item?.type}
                            placeholder={item?.placeholder}
                            control={newControl}
                            error={
                              errors[item?.name] && errors[item?.name].message
                            }
                            rules={{ required: item?.rules }}
                            min={item?.min}
                            max={item?.max}
                          />
                        )}
                      </div>
                    ))}
                    {/* <input type="color" name="color" {...register('name')} /> */}
                  </div>

                  {/* submit button */}
                  <div className=" mt-2 flex justify-center">
                    <PrimaryButton
                      loading={ColorLoading}
                      name="Create"
                    ></PrimaryButton>
                  </div>
                </form>
              </section>
            </VariantModal>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="p-4  ">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className={`mb-4 border p-4 rounded-md ${callColor(index)} `}
              >
                {/* Row for Color and Attribute */}
                <div className="md:space-y-0  space-y-2  flex flex-col mb-4 gap-4 md:flex-row">
                  {/* Color Select Dropdown */}
                  <div className="w-full flex-1 relative">
                    <SingleSelect
                      label="Select Color"
                      name={`variant.${index}.color`}
                      control={control}
                      error={
                        errors?.variant?.[index]?.color &&
                        errors?.variant?.[index]?.color.message
                      }
                      isClearable={true}
                      placeholder="Select Color"
                      options={selectValueLabelFieldAddedFunction(
                        colors?.data?.data,
                        "name",
                        "color_id"
                      )}
                      // rules={{ required: "Color is required" }}
                      // onSearch={fetchColor}
                      // onSelectId={(id) => setSelectedColor(id)}
                    />
                    <span
                      className="text-white bg-green-500 rounded-r-md absolute top-[25px] px-4 py-3 right-0 cursor-pointer"
                      onClick={() => {
                        setDynamicAttributeName({
                          key: "admin/color",
                          value: colorField,
                        });
                        setColorModal(true);
                      }}
                    >
                      <FaPlus className="text-2xl" />
                    </span>
                  </div>

                  {/* Unit Select Dropdown */}
                  <div className="w-full flex-1 relative">
                    <SingleSelect
                      label=" Select Unit"
                      control={control}
                      name={`variant.${index}.unit`}
                      error={
                        errors?.variant?.[index]?.unit &&
                        errors?.variant?.[index]?.unit.message
                      }
                      isClearable={true}
                      placeholder="Select unit"
                      options={selectValueLabelFieldAddedFunction(
                        units?.data?.data,
                        "name",
                        "unit_id"
                      )}
                      // rules={{ required: "unit is required" }}
                      // onSearch={fetchunit}
                      onSelected={(id) => {
                        setIds(id?.unit_id);
                      }}
                    />
                    <span
                      className="text-white bg-green-500 rounded-r-md absolute top-[25px] px-4 py-3 right-0 cursor-pointer"
                      onClick={() => {
                        setDynamicAttributeName({
                          key: "admin/unit",
                          value: unitField,
                        });
                        setColorModal(true);
                      }}
                    >
                      <FaPlus className="text-2xl" />
                    </span>
                  </div>
                </div>
                {/* Row for Unit and Quantity */}
                <div className="flex flex-col mb-4 gap-4 md:flex-row">
                  {/* Attribute Select Dropdown */}
                  <div className="w-full flex-1 relative">
                    <SingleSelect
                      label=" Select Attributes"
                      name={`variant.${index}.attributes`}
                      error={
                        errors?.variant?.[index]?.attributes &&
                        errors?.variant?.[index]?.attributes?.message
                      }
                      control={control}
                      isClearable={true}
                      placeholder="Select Attributes"
                      options={selectValueLabelFieldAddedFunction(
                        attributes?.data?.data.filter(
                          (item) => item?.unit?.unit_id === match_unitId
                        ),
                        "name",
                        "attribute_id"
                      )}
                      // rules={{ required: "Attributes is required" }}
                      // onSearch={fetchColor}
                      // onSelectId={(id) => setSelectedColor(id)}
                    />
                    <span
                      className="text-white bg-green-500 rounded-r-md absolute top-[25px] px-4 py-3 right-0 cursor-pointer"
                      onClick={() => {
                        setDynamicAttributeName({
                          key: "admin/attribute",
                          value: attributeField,
                        });
                        setColorModal(true);
                      }}
                    >
                      <FaPlus className="text-2xl" />
                    </span>
                  </div>

                  {/* Quantity Input */}
                  <div className="flex-1">
                    <TextInput
                      control={control}
                      label=" Product Quantity "
                      type="number"
                      name={`variant.${index}.quantity`}
                      error={
                        errors?.variant?.[index]?.quantity &&
                        errors?.variant?.[index]?.quantity?.message
                      }
                      placeholder="Create Quantity"
                      rules={{ required: "Quantity is required" }}
                    />
                  </div>
                  <div className="flex-1">
                    <TextInput
                      control={control}
                      label=" Available quantity "
                      type="number"
                      name={`variant.${index}.available_quantity`}
                      error={
                        errors?.variant?.[index]?.available_quantity &&
                        errors?.variant?.[index]?.available_quantity?.message
                      }
                      placeholder="Create available quantity"
                      rules={{ required: "available quantity is required" }}
                    />
                  </div>
                </div>
                {/* Row for Weight and Price */}
                <div className="flex flex-col mb-4 gap-4 md:flex-row">
                  {/* Weight Input */}
                  <div className="flex-1">
                    <TextInput
                      name={`variant.${index}.weight`}
                      error={
                        errors?.variant?.[index]?.weight &&
                        errors?.variant?.[index]?.weight?.message
                      }
                      control={control}
                      label=" Product Weight "
                      type="number"
                      placeholder="Enter weight"
                      // rules={{ required: "Quantity is required" }}
                    />
                  </div>
                  {/* Price Input */}
                  <div className="flex-1">
                   
                    <TextInput
                      name={`variant.${index}.price`}
                      error={
                        errors?.variant?.[index]?.price &&
                        errors?.variant?.[index]?.price?.message
                      }
                      control={control}
                      label=" Price "
                      type="number"
                      placeholder="Enter Price"
                      rules={{ required: "Price is required" }}
                    />
                  </div>
                  {/* flat discount  */}
                
                  <div className="flex-1">
                    
                    <TextInput
                      name={`variant.${index}.flat_discount`}
                      error={
                        errors?.variant?.[index]?.flat_discount &&
                        errors?.variant?.[index]?.flat_discount?.message
                      }
                      // defaultvalue={product?.data?.flat_discount}
                      control={control}
                      label=" Flat Discount "
                      type="number"
                      placeholder="Enter Flat Discount"
                      rules={{ required: "Price is required" }}
                    />
                  </div>
                </div>
                {fields?.length !== 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <div className="flex gap-4">
              {/* add more button  */}
      
              <button
                type="button"
                onClick={() => append({ price: "" })}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add More
              </button>
              {/* submit button  */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default ProductForm;
