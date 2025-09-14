import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../../utils/formatedate";
import VariantModal from "../VariantModal/VariantModal";
import { FaRegEdit } from "react-icons/fa";
const UnitVariant = ({
  unitvariant,
  handleDelete,
  setOpen,
  open,
  setValueAdded,
  valueAdded,
  handleAdded,
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
         <UnitForm handleAdded={handleAdded} handleChange={handleChange}/>
        </VariantModal>
      )}
      {unitvariant?.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 text-center px-4 border-b-4 border-gray-200">
                unit ID
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
            {unitvariant.map((unit, index) => (
              <tr key={unit?.unit_id} className="border-b-2">
                <td className="py-2 text-center px-4">{unit?.unit_id}</td>
                <td className="py-2 text-center px-4">{unit?.name}</td>
                <td className="py-2 text-center px-4">{unit?.status}</td>
                <td className="py-2 text-center px-4">
                  {formatDate(unit?.created_at)?.formate_date}{" "}
                </td>
                <td className="py-2 text-center px-4">
                  {" "}
                  {formatDate(unit?.updated_at)?.formate_date}{" "}
                </td>
                <td className="py-2 text-center px-4 h-full space-x-4">
                <button
                    onClick={() => {
                      setOpen({
                        add: false,
                        update: true,
                      });
                      setId(unit?.unit_id);
                    }}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className=" text-red-700 px-4 py-2 rounded"
                    onClick={() => handleDelete(unit?.unit_id)}
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
          {" "}
         <UnitForm
            unit={unitvariant.find((item)=>item?.unit_id===id)}
         handleAdded={handleAdded} handleChange={handleChange}/>
        </VariantModal>
      )}
    </div>
  );
};

export default UnitVariant;
const UnitForm = ({unit={},handleAdded,handleChange})=>{
 
  return(
    <form onSubmit={handleAdded} className="space-y-4">
    <div>
      <label
        htmlFor="unit"
        className="block text-gray-700 font-semibold mb-2"
      >
        Unit
      </label>
      <input
        type="text"
        id="unit"
        defaultValue={unit?.name}
        name="name"
        placeholder="Enter Unit"
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