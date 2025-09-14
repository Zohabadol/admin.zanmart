import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../../utils/formatedate";
import VariantModal from "../VariantModal/VariantModal";
import { FaRegEdit } from "react-icons/fa";

const AttributeVariant = ({
  open,
  attribute,
  handleAdded,
  setOpen,
  setValueAdded,
  valueAdded,
  handleDelete,
  handleUpdateAttribute,
  setId,
  id
}) => {
  const handleChange = (e) => {
    setValueAdded({
      ...valueAdded,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };
 
  return (
    <div>
      {open?.add && (
        <VariantModal setOpen={setOpen}>
          {" "}
         <AttributeForm handleAdded={handleAdded} handleChange={handleChange}/>
        </VariantModal>
      )}

      {/* Displaying the attribute variant table */}
      {attribute?.length > 0 ? (
        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Attribute ID
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Name
              </th>
              {/* <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Status
              </th> */}
              {/* <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Created Date
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Update Date
              </th> */}
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {attribute.map((attribute) => (
              <tr key={attribute?.attribute_id} className="border-b-2">
                <td className="py-2 text-center px-4">{attribute?.attribute_id}</td>
                <td className="py-2 text-center px-4">{attribute?.name}</td>
                {/* <td className="py-2 text-center px-4">{attribute?.status}</td> */}
                {/* <td className="py-2 text-center px-4">
                  {formatDate(attribute?.created_at)?.formate_date}
                </td>
                <td className="py-2 text-center px-4">
                  {formatDate(attribute?.updated_at)?.formate_date}
                </td> */}
                <td className="py-2 text-center px-4 space-x-4">
                  
                       {open?.update && (
                    <VariantModal setOpen={setOpen}>
                      {/* update form declare here  */}
                      <AttributeForm
                        attribute={attribute}
                        handleAdded={handleUpdateAttribute}
                        handleChange={handleChange}
                      />
                    </VariantModal>
                  )}
                  <button
                    onClick={() => {
                      setOpen({
                        add: false,
                        update: true,
                      });
                      setId(attribute?.attribute_id);
                    }}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="text-red-700 px-4 py-2 rounded"
                    onClick={() => handleDelete(attribute?.attribute_id)}
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
                      <AttributeForm
                          attribute={attribute.find((item)=>item?.attribute_id===id)}
                        handleAdded={handleUpdateAttribute}
                        handleChange={handleChange}
                      />
                    </VariantModal>
                  )}
    </div>
  );
};

export default AttributeVariant;

const AttributeForm = ({ attribute = {}, handleAdded, handleChange }) => {
    return (
        <form
            onSubmit={handleAdded}
            className="max-w-md mx-auto rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800"   >
              Add Attribute Details
            </h2>

            <div className="mb-4">
              <label
                htmlFor="unit_Id"
                className="block text-gray-700 font-semibold mb-2"
              >
                Attribute ID
              </label>
              <input
                type="number"
                id="unitId"
                name="unit_id"
                defaultValue={attribute?.unit_id}
                placeholder="Enter your unit id"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="size"
                className="block text-gray-700 font-semibold mb-2"
              >
                Size
              </label>
              <input
                type="text"
                id="size"
                name="name"
                defaultValue={attribute?.name}
                placeholder="Enter your size"
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
    )}