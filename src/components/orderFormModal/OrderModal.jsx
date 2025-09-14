// import React, { useState } from "react";

// const OrderModal = ({hendleOpnenOrderModal,setIsModalOpen}) => {
//   const [formData, setFormData] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setIsModalOpen(false)
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
//     <div className="bg-white rounded-lg shadow-lg overflow-auto h-screen w-11/12 max-w-4xl p-6 relative">
//       <button onClick={hendleOpnenOrderModal}  className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">&times;</button>
//       <form onSubmit={handleSubmit}>
//         <h2 className="text-2xl font-semibold mb-4">Create</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Left Column */}
//           <div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="pickAddress">Pick address *</label>
//               <select name="pickAddress" id="pickAddress" className="w-full border p-2 rounded" onChange={handleChange} required>
//                 <option value="2">Pick address</option>
//                 <option value="1">Pick address2</option>
//               </select>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="recipientMobile">Recipient mobile *</label>
//               <input type="text" name="recipientMobile" id="recipientMobile" className="w-full border p-2 rounded" placeholder="Input Recipient mobile" onChange={handleChange} required />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="recipientName">Recipient name *</label>
//               <input type="text" name="recipientName" id="recipientName" className="w-full border p-2 rounded" placeholder="Input Recipient name" onChange={handleChange} required />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="alternativeMobile">Alternative Mobile</label>
//               <input type="text" name="alternativeMobile" id="alternativeMobile" className="w-full border p-2 rounded" placeholder="Input Alternative Mobile" onChange={handleChange} />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="recipientDistrict">Recipient District *</label>
//               <input type="text" name="recipientDistrict" id="recipientDistrict" className="w-full border p-2 rounded" placeholder="Recipient District" onChange={handleChange} required />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="recipientArea">Recipient area *</label>
//               <input type="text" name="recipientArea" id="recipientArea" className="w-full border p-2 rounded" placeholder="Recipient area" onChange={handleChange} required />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="recipientThana">Recipient Thana *</label>
//               <input type="text" name="recipientThana" id="recipientThana" className="w-full border p-2 rounded" placeholder="Recipient Thana" onChange={handleChange} required />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="recipientPostcode">Recipient Postcode *</label>
//               <input type="text" name="recipientPostcode" id="recipientPostcode" className="w-full border p-2 rounded" placeholder="Recipient Postcode" onChange={handleChange} required />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium">Delivery way *</label>
//               <div className="flex space-x-4">
//                 <label><input type="radio" name="delivery" value="Home Delivery" onChange={handleChange} className="mr-1" required /> Home Delivery</label>
//                 <label><input type="radio" name="delivery" value="Pickup Point" onChange={handleChange} className="mr-1" /> Pickup Point</label>
//                 <label><input type="radio" name="delivery" value="Hub Delivery" onChange={handleChange} className="mr-1" /> Hub Delivery</label>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="recipientAddress">Recipient address *</label>
//               <input type="text" name="recipientAddress" id="recipientAddress" className="w-full border p-2 rounded" placeholder="Input Recipient address" onChange={handleChange} required />
//             </div>

//             {/* Cost Management */}
//             <div className="mt-6">
//               <div className="border p-4 rounded">
//                 <div className="flex justify-center bg-slate-300">
//                   <h3 className="text-lg font-semibold">Cost Management</h3>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping Cost</span>
//                   <span>0</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>COD/BOD</span>
//                   <span>0</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Booking Price</span>
//                   <span>0</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Fragile Cost</span>
//                   <span>0</span>
//                 </div>
//                 <hr className="my-4" />
//                 <div className="flex justify-between font-semibold">
//                   <span>Total Cost(+)</span>
//                   <span>0</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Sending Type *</label>
//               <div className="flex space-x-4">
//                 <label><input type="radio" name="sendingType" value="General" onChange={handleChange} className="mr-1" required /> General</label>
//                 <label><input type="radio" name="sendingType" value="Exchange" onChange={handleChange} className="mr-1" /> Exchange</label>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium">Parcel Type *</label>
//               <div className="flex space-x-4">
//                 <label><input type="radio" name="parcelType" value="Parcel" onChange={handleChange} className="mr-1" required /> Parcel</label>
//                 <label><input type="radio" name="parcelType" value="Document" onChange={handleChange} className="mr-1" /> Document</label>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="deliveryType">Delivery type *</label>
//               <select name="deliveryType" id="deliveryType" className="w-full border p-2 rounded" onChange={handleChange} required>
//                 <option value="1">Standard (24-48 hrs)</option>
//                 <option value="2">Standard (48-72 hrs)</option>
//               </select>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="paymentMethod">Payment method *</label>
//               <select name="paymentMethod" id="paymentMethod" className="w-full border p-2 rounded" onChange={handleChange} required>
//                 <option value="3">Payment method</option>
//                 <option value="1">Cash</option>
//                 <option value="2">onlice</option>
//               </select>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="package">Package *</label>
//               <select name="package" id="package" className="w-full border p-2 rounded" onChange={handleChange} required>
//                 <option value="1">Package1</option>
//                 <option value="2">Package2</option>
//               </select>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="invoiceNo">Invoice No</label>
//               <input type="text" name="invoiceNo" id="invoiceNo" className="w-full border p-2 rounded" placeholder="Input Invoice No" onChange={handleChange} />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="productPrice">Product price *</label>
//               <input type="text" name="productPrice" id="productPrice" className="w-full border p-2 rounded" placeholder="Input Product price" onChange={handleChange} required />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="actualProductPrice">Actual Product Price *</label>
//               <input type="text" name="actualProductPrice" id="actualProductPrice" className="w-full border p-2 rounded" placeholder="Input Actual Product Price" onChange={handleChange} required />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="deliveryDate">Delivery Date</label>
//               <input type="date" name="deliveryDate" id="deliveryDate" className="w-full border p-2 rounded" onChange={handleChange} />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium">Number of Items *</label>
//               <div className="flex items-center space-x-2">
//                 <button type="button" className="bg-gray-300 px-2 py-1 rounded">-</button>
//                 <input type="text" name="numberOfItems" className="w-16 text-center border p-2 rounded" placeholder="0" onChange={handleChange} required />
//                 <button type="button" className="bg-gray-300 px-2 py-1 rounded">+</button>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="itemType">Item Type *</label>
//               <select name="itemType" id="itemType" className="w-full border p-2 rounded" onChange={handleChange} required>
//                 <option value="1">Item Type</option>
//                 <option value="2">Item Type2</option>
//               </select>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium" htmlFor="instructions">Instructions *</label>
//               <textarea name="instructions" id="instructions" className="w-full border p-2 rounded outline-none" placeholder="Input Instructions" onChange={handleChange} required></textarea>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6">
//           <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
//         </div>
//       </form>
//     </div>
//   </div>
//   );
// };

// export default OrderModal;


import React, { useState, useCallback } from "react";
import { privateRequest } from "../../config/axios.config";
import axios from "axios";

const OrderModal = ({ id, handleOpenOrderModal, setIsModalOpen, orderDetails }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const postOrder = useCallback(async (payload) => {
    try {
      setLoading(true);
      const response = await axios.post("https://purple-mongoose-717018.hostingersite.com/api/percel", payload, {
        headers: {
          "Api-Key": 'wbggkfhdbwvwjkxlmdcbv1kre1pfu6rj',
          "Secret-Key": '7faevclzxeglxmaz8iip7uq7',
          "Content-Type": "application/json",
        }
      }); // Adjust URL as needed
      if (response.status === 200) {
        await privateRequest.post(
          `admin/order/status/update/${id}`,
          {
            order_status: "shipped", _method: 'PUT'// ✅ correct syntax
          }
        ); // Update status to "shipped"
        setIsModalOpen(false);
      }

    } catch (err) {
      console.error("Error creating order:", err);
      setError("Failed to create order.");
    } finally {
      setLoading(false);
    }
  }, [setIsModalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      invoice: formData.invoiceNo ?? orderDetails?.order_id ?? "",
      recipient_name: formData.recipientName ?? orderDetails?.shipping_address?.name ?? "",
      recipient_phone: formData.recipientMobile ?? orderDetails?.shipping_address?.phone ?? "",
      recipient_address: formData.recipientAddress ?? orderDetails?.shipping_address?.address_line1 ?? "",
      cod_amount: formData.productPrice ?? orderDetails?.total_amount ?? "",
    };

    console.log("Payload to send:", payload);
    postOrder(payload);

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-screen w-11/12 max-w-4xl p-8 relative">
        <button
          onClick={handleOpenOrderModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Create Order</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Invoice No", name: "invoiceNo", defaultValue: orderDetails?.order_id },
              { label: "Recipient Mobile *", name: "recipientMobile", defaultValue: orderDetails?.shipping_address?.phone, required: true },
              { label: "Recipient Name *", name: "recipientName", defaultValue: orderDetails?.shipping_address?.name, required: true },
              { label: "Recipient Address *", name: "recipientAddress", defaultValue: orderDetails?.shipping_address?.address_line1, required: true },
              { label: "Product Price *", name: "productPrice", defaultValue: orderDetails?.total_amount, required: true },
            ].map(({ label, name, defaultValue, required }) => (
              <div className="flex flex-col" key={name}>
                <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">{label}</label>
                <input
                  type="text"
                  id={name}
                  name={name}
                  value={formData[name] ?? defaultValue ?? ""}
                  onChange={handleChange}
                  required={required}
                  placeholder={`Enter ${label}`}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          {/* Cost Management Section */}
          <div className="mt-6">
            <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="bg-gray-100 p-2 rounded text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Cost Management</h3>
              </div>
              {[
                "Shipping Cost",
                "COD/BOD",
                "Booking Price",
                "Fragile Cost"
              ].map((item, index) => (
                <div key={index} className="flex justify-between py-1 text-gray-600">
                  <span>{item}</span>
                  <span>0</span>
                </div>
              ))}
              <hr className="my-3" />
              <div className="flex justify-between font-semibold text-gray-800 text-lg">
                <span>Total Cost (+)</span>
                <span>{orderDetails?.total_amount ?? "0"}</span>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && <p className="text-red-600 font-medium">{error}</p>}

          {/* Submit button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-2 rounded-lg disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default OrderModal;

