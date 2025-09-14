import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri"; 
import VariantModal from "../VariantModal/VariantModal";
import { FaRegEdit } from "react-icons/fa";
 
const ProductVariantComponant = ({
    productVariant,
  handleDelete,
  setOpen,
  open,
  setValueAdded,
  handleAdded,
  handleUpdateAttribute,
  valueAdded,
  setId,
  id,
}) => {
 
  // date formatting system
  const [formData, setFormData] = useState([
    {
      product_id: 3,
      color_id: 3,
      attribute_id: 3,
      product_qty: 20,
      weight: 2.0,
      price: 91.99,
    },
    {
      product_id: 4,
      color_id: 2,
      attribute_id: 1,
      product_qty: 10,
      weight: 1.5,
      price: 50.49,
    },
  ]);
  const handleInputChange = (index, event) => {
    const updatedFormData = [...formData];
    updatedFormData[index][event.target.name] =
      event.target.type === "number"
        ? parseFloat(event.target.value)
        : event.target.value;
    setFormData(updatedFormData);
    setValueAdded(updatedFormData);
  };
  const handleUpdateChange = (index,e) => {
 
    const value = productVariant.find(item=>item.product_variant_id===id);
 
    setValueAdded({
      ...value ,
      [e.target.name]: Number(e.target.value)
    });
  };
  return (
    <div>
      {open?.add && (
        <VariantModal setOpen={setOpen}>
          {" "}
          <MultiProductPostForm
            handleInputChange={handleInputChange}
            handleSubmit={handleAdded}
            formData={formData}
          />{" "}
        </VariantModal>
      )}
      {productVariant?.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Product Variant ID
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
               Color ID
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
               Attribute ID
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
               Product ID
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
               Product Quantity
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
               price
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Weight
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {productVariant.map((product_variant, index) => (
              <tr
                key={product_variant?.productVariant_id}
                className="border-b-2"
              >
                <td className="py-2 text-center px-4">
                  {product_variant?.product_variant_id}
                </td>
                <td className="py-2 text-center px-4">
                  {product_variant?.color_id}
                </td>
                <td className="py-2 text-center px-4">
                  {product_variant?.attribute_id}
                </td>
                <td className="py-2 text-center px-4">
                  {product_variant?.product_id}
                </td>
                <td className="py-2 text-center px-4">
                  {" "}
                   {product_variant?.product_qty}
                </td>
                <td className="py-2 text-center px-4">
                  {" "}
                   {product_variant?.price}
                </td>
                <td className="py-2 text-center px-4">
                  {" "}
                   {product_variant?.weight}
                </td>
                <td className="py-2 text-center px-4 h-full space-x-4">
                  <button
                    onClick={() => {
                      setOpen({
                        add: false,
                        update: true,
                      });
                      setId(product_variant?.product_variant_id);
                    }}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className=" text-red-700 px-4 py-2 rounded"
                    onClick={() =>
                      handleDelete(product_variant?.product_variant_id)
                    }
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available.</p>
      )}
      {open?.update && (
        <VariantModal setOpen={setOpen}>
          {/* update form declare here  */}
          
          <MultiProductPostForm
           formData={productVariant.filter(item=>item?.product_variant_id===id)}
            handleInputChange={handleUpdateChange}
            handleSubmit={handleUpdateAttribute}
            
          />
        </VariantModal>
      )}
    </div>
  );
};

export default ProductVariantComponant;

const MultiProductPostForm = ({
  handleSubmit,
  formData,
  handleInputChange,
}) => {
 
  return (
    <form onSubmit={handleSubmit}>
      {formData.map((product, index) => (
        <div key={index} className="pt-3">
            <h1>Product {index+1}</h1>
          <div className="flex gap-2">
            <div className="space-y-2">
              <input
                type="number"
                name="product_id"
                placeholder="Product ID"
                defaultValue={product?.product_id}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="number"
                name="color_id"
                placeholder="Color ID"
                defaultValue={product?.color_id}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="number"
                name="attribute_id"
                placeholder="Attribute ID"
                defaultValue={product?.attribute_id}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className="space-y-2">
              <input
                type="number"
                name="product_qty"
                placeholder="Product Quantity"
                defaultValue={product?.product_qty}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="number"
                name="weight"
                placeholder="Weight"
                step="0.01"
                defaultValue={product?.weight}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                step="0.01"
                defaultValue={product?.price}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          </div>
        </div>
      ))}
      <button type="submit" className="mt-3 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
     >Submit All Products</button>
    </form>
  );
};

const ProductVariantForm = ({
  product_variant = {},
  handleAdded,
  handleChange,
}) => {
 
  return (
    <form onSubmit={handleAdded} className="space-y-4">
      <div>
        <label
          htmlFor="product_variant"
          className="block text-gray-700 font-semibold mb-2"
        >
          product_variant Name
        </label>
        <input
          type="text"
          id="product_variant"
          name="name"
          defaultValue={product_variant?.name}
          placeholder="Enter your product_variant name"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};
