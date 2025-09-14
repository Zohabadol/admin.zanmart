import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom";
import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helper";
import { Toastify } from "../../../components/toastify";
import { SkeletonTable } from "../../../components/loading/skeleton-table";
import { SingleSelect, TextInput } from "../../../components/input";
import useFetch from "../../../hooks/api/useFetch";
const ProductVariantEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
const productVariantId = searchParams.get("product_variant_id");

  const [colors, setColors] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [allAttributes, setAllAttributes] = useState([]);
  const [filteredAttributes, setFilteredAttributes] = useState([]);
  const [productVariantData, setProductVariantData] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  const watchUnit = watch("unit_id");





  useEffect(() => {
  const productVariantId = searchParams.get("product_variant_id");

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [colorRes, attrRes, unitRes] = await Promise.all([
        NetworkServices.Color.index(),
        NetworkServices.Attribute.index(),
        NetworkServices.Unit.index()
      ]);

      if (colorRes?.status === 200) setColors(colorRes.data?.data?.data || []);
      if (attrRes?.status === 200) setAllAttributes(attrRes.data?.data?.data || []);
      if (unitRes?.status === 200) setUnitList(unitRes.data?.data?.data || []);

      // Only fetch variant if query param is available
      if (productVariantId) {
        const res = await NetworkServices.ProductVariant.show(productVariantId);
        if (res?.status === 200) {
          const data = res.data?.data;
          setProductVariantData(data);

          reset({
            color_id: data?.color_id,
            unit_id: data?.unit_id,
            attribute_id: data?.attribute_id,
            product_qty: data?.product_qty,
            available_quantity: data?.available_quantity,
            weight: data?.weight,
            price: data?.price,
            discount_price: data?.discount_price
          });

          const filtered = (attrRes.data?.data?.data || []).filter(
            (attr) => attr.unit?.unit_id === data?.unit_id
          );
          setFilteredAttributes(filtered);
        }
      }
    } catch (err) {
      networkErrorHandeller(err);
    }
    setLoading(false);
  };

  fetchAllData();
}, []);




  useEffect(() => {
    const filtered = allAttributes.filter(attr => attr.unit?.unit_id === Number(watchUnit));
    setFilteredAttributes(filtered);
  }, [watchUnit, allAttributes]);

  const toSelectOptions = (list, valueKey, labelKey) =>
    list.map(item => ({ value: item[valueKey], label: item[labelKey] }));

  const onSubmit = async (formData) => {
    try {
      const payload = [{
        product_id: Number(productVariantData?.product_id),
        color_id: Number(formData.color_id),
        unit_id: Number(formData.unit_id),
        attribute_id: Number(formData.attribute_id),
        product_qty: Number(formData.product_qty),
        available_quantity: Number(formData.available_quantity),
        weight: Number(formData.weight),
        price: Number(formData.price),
        discount_price: Number(formData.discount_price),
        product_variant_id: Number(productVariantId),
      }];

      const res = await NetworkServices.ProductVariant.update(productVariantId, payload);
      if (res?.status === 200 || res?.status === 201) {
        Toastify.Success("Product variant updated successfully.");
         navigate("/dashboard/product-variant");
      }
    } catch (err) {
      Toastify.Error(err);
    }
  };

  return loading ? (
    <SkeletonTable />
  ) : (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Edit Product Variant</h2>
        <Link to="/dashboard/product-variant">
          <span className="material-symbols-outlined border border-green-500 rounded-full p-1">list</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Color */}
        <SingleSelect
          name="color_id"
          control={control}
          options={toSelectOptions(colors, "color_id", "name")}
          onSelected={selected => setValue("color_id", selected?.value || null)}
          placeholder={
            toSelectOptions(colors, "color_id", "name").find(
              item => item.value === watch("color_id")
            )?.label ?? "Select Color"
          }
          error={errors.color_id?.message}
          label="Choose a Color"
          isClearable
        />

        {/* Unit */}
        <SingleSelect
          name="unit_id"
          control={control}
          options={toSelectOptions(unitList, "unit_id", "name")}
          onSelected={selected => setValue("unit_id", selected?.value || null)}
          placeholder={
            toSelectOptions(unitList, "unit_id", "name").find(
              item => item.value === watch("unit_id")
            )?.label ?? "Select Unit"
          }
          error={errors.unit_id?.message}
          label="Choose a Unit"
          isClearable
        />

        {/* Attribute */}
        <SingleSelect
          name="attribute_id"
          control={control}
          options={toSelectOptions(filteredAttributes, "attribute_id", "name")}
          onSelected={selected => setValue("attribute_id", selected?.value || null)}
          placeholder={
            toSelectOptions(filteredAttributes, "attribute_id", "name").find(
              item => item.value === watch("attribute_id")
            )?.label ?? "Select Attribute"
          }
          error={errors.attribute_id?.message}
          label="Choose an Attribute"
          isClearable
        />

        {/* Quantity */}
        <TextInput
          label="Poduct Quantity"
          name="product_qty"
          type="number"
          placeholder="Enter quantity"
          control={control}
          error={errors.product_qty?.message}
          rules={{ required: "Quantity is required" }}
        />
        <TextInput
          label="available Quantity"
          name="available_quantity"
          type="number"
          placeholder="Enter quantity"
          control={control}
          error={errors.product_qty?.message}
          rules={{ required: "Quantity is required" }}
        />

        {/* Weight */}
        <TextInput
          label="Weight"
          name="weight"
          type="number"
          placeholder="Enter weight"
          control={control}
          error={errors.weight?.message}
          rules={{ required: "Weight is required" }}
        />

        {/* Price */}
        <TextInput
          label="Price"
          name="price"
          type="number"
          placeholder="Enter price"
          control={control}
          error={errors.price?.message}
          rules={{ required: "Price is required" }}
        />

        {/* Discount */}
        <TextInput
          label="Flat Discount"
          name="discount_price"
          type="number"
          placeholder="Enter flat discount"
          control={control}
          error={errors.discount_price?.message}
        />

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
          >
            Update Variant
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductVariantEdit;
