import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../../utils/formatedate";
import VariantModal from "../VariantModal/VariantModal";
import { FaRegEdit } from "react-icons/fa";
const ColorVariant = ({
  colorVariant,
  handleDelete,
  setOpen,
  open,
  setValueAdded,
  valueAdded,
  handleAdded,
  handleUpdateAttribute,
  setId,
  id
}) => {
  
  // date formatting system
  const handleChange = (e) => {
   
    setValueAdded({
      ...valueAdded,
      [e.target.name]:
        typeof e.target.type === Number
          ? Number(e.target.value)
          : e.target.value,
    });
  };
  return (
    <div>
      {open?.add && (
        <VariantModal setOpen={setOpen}>
          {" "}
          <ColorForm
                        
                        handleAdded={handleAdded}
                        handleChange={handleChange}
                      />
        </VariantModal>
      )}
      {colorVariant?.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Color ID
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Name
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Status
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Created Date
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Update Date
              </th>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {colorVariant.map((color, index) => (
              <tr key={color?.color_id} className="border-b-2">
                <td className="py-2 text-center px-4">{color?.color_id}</td>
                <td className="py-2 text-center px-4">{color?.name}</td>
                <td className="py-2 text-center px-4">{color?.status}</td>
                <td className="py-2 text-center px-4">
                  {formatDate(color?.created_at)?.formate_date}{" "}
                </td>
                <td className="py-2 text-center px-4">
                  {" "}
                  {formatDate(color?.updated_at)?.formate_date}{" "}
                </td>
                <td className="py-2 text-center px-4 h-full space-x-4">
                
                  <button
                    onClick={() => {
                      setOpen({
                        add: false,
                        update: true,
                      });
                      setId(color?.color_id);
                    }}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className=" text-red-700 px-4 py-2 rounded"
                    onClick={() => handleDelete(color?.color_id)}
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
                      <ColorForm
                        color={colorVariant.find((item)=>item?.color_id===id)}
                        handleAdded={handleUpdateAttribute}
                        handleChange={handleChange}
                      />
                    </VariantModal>
                  )}
    </div>
  );
};

export default ColorVariant;

const ColorForm = ({ color = {}, handleAdded, handleChange }) => {
   
  return (
    <form onSubmit={handleAdded} className="space-y-4">
    <div>
      <label
        htmlFor="color"
        className="block text-gray-700 font-semibold mb-2"
      >
        Color Name
      </label>
      <input
        type="text"
        id="color"
        name="name"
        defaultValue={color?.name}
        placeholder="Enter your color name"
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
  )

}