import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
 
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Create</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="pickAddress">
              Pick address *
            </label>
            <select
              name="pickAddress"
              id="pickAddress"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            >
              <option value="1">Pick address</option>
              <option value="2">Pick address2</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium"
              htmlFor="recipientMobile"
            >
              Recipient mobile *
            </label>
            <input
              type="text"
              name="recipientMobile"
              id="recipientMobile"
              className="w-full border p-2 rounded"
              placeholder="Input Recipient mobile"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium"
              htmlFor="recipientName"
            >
              Recipient name *
            </label>
            <input
              type="text"
              name="recipientName"
              id="recipientName"
              className="w-full border p-2 rounded"
              placeholder="Input Recipient name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium"
              htmlFor="alternativeMobile"
            >
              Alternative Mobile
            </label>
            <input
              type="text"
              name="alternativeMobile"
              id="alternativeMobile"
              className="w-full border p-2 rounded"
              placeholder="Input Alternative Mobile"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium"
              htmlFor="recipientDistrict"
            >
              Recipient District *
            </label>
            <input
              type="text"
              name="recipientDistrict"
              id="recipientDistrict"
              className="w-full border p-2 rounded"
              placeholder="Recipient District"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium"
              htmlFor="recipientArea"
            >
              Recipient area *
            </label>
            <input
              type="text"
              name="recipientArea"
              id="recipientArea"
              className="w-full border p-2 rounded"
              placeholder="Recipient area"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium"
              htmlFor="recipientThana"
            >
              Recipient Thana *
            </label>
            <input
              type="text"
              name="recipientThana"
              id="recipientThana"
              className="w-full border p-2 rounded"
              placeholder="Recipient Thana"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium"
              htmlFor="recipientPostcode"
            >
              Recipient Postcode *
            </label>
            <input
              type="text"
              name="recipientPostcode"
              id="recipientPostcode"
              className="w-full border p-2 rounded"
              placeholder="Recipient Postcode"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Delivery way *</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="Home Delivery"
                  onChange={handleChange}
                  className="mr-1"
                  required
                />{" "}
                Home Delivery
              </label>
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="Pickup Point"
                  onChange={handleChange}
                  className="mr-1"
                />{" "}
                Pickup Point
              </label>
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="Hub Delivery"
                  onChange={handleChange}
                  className="mr-1"
                />{" "}
                Hub Delivery
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium"
              htmlFor="recipientAddress"
            >
              Recipient address *
            </label>
            <input
              type="text"
              name="recipientAddress"
              id="recipientAddress"
              className="w-full border p-2 rounded"
              placeholder="Input Recipient address"
              onChange={handleChange}
              required
            />
          </div>

          {/* Cost Management */}
          <div className="mt-6">
            <div className="border p-4 rounded">
              <div className="flex justify-center bg-slate-300">
                <h3 className="text-lg font-semibold">Cost Management</h3>
              </div>
              <div className="flex justify-between">
                <span>Shipping Cost</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>COD/BOD</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>Booking Price</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>Fragile Cost</span>
                <span>0</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-semibold">
                <span>Total Cost(+)</span>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Sending Type *</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="sendingType"
                  value="General"
                  onChange={handleChange}
                  className="mr-1"
                  required
                />{" "}
                General
              </label>
              <label>
                <input
                  type="radio"
                  name="sendingType"
                  value="Exchange"
                  onChange={handleChange}
                  className="mr-1"
                />{" "}
                Exchange
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Parcel Type *</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="parcelType"
                  value="Parcel"
                  onChange={handleChange}
                  className="mr-1"
                  required
                />{" "}
                Parcel
              </label>
              <label>
                <input
                  type="radio"
                  name="parcelType"
                  value="Document"
                  onChange={handleChange}
                  className="mr-1"
                />{" "}
                Document
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="deliveryType">
              Delivery type *
            </label>
            <select
              name="deliveryType"
              id="deliveryType"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            >
              <option value="1">Standard (24-48 hrs)</option>
              <option value="2">Standard (1-7 day)</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium"
              htmlFor="paymentMethod"
            >
              Payment method *
            </label>
            <select
              name="paymentMethod"
              id="paymentMethod"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            >
              <option value="">Payment method</option>
              <option value="1">cash</option>
              <option value="2">Online</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="package">
              Package *
            </label>
            <select
              name="package"
              id="package"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            >
              <option value="1">Package1</option>
              <option value="2">Package2</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="invoiceNo">
              Invoice No
            </label>
            <input
              type="text"
              name="invoiceNo"
              id="invoiceNo"
              className="w-full border p-2 rounded"
              placeholder="Input Invoice No"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="productPrice">
              Product price *
            </label>
            <input
              type="text"
              name="productPrice"
              id="productPrice"
              className="w-full border p-2 rounded"
              placeholder="Input Product price"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium"
              htmlFor="actualProductPrice"
            >
              Actual Product Price *
            </label>
            <input
              type="text"
              name="actualProductPrice"
              id="actualProductPrice"
              className="w-full border p-2 rounded"
              placeholder="Input Actual Product Price"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="deliveryDate">
              Delivery Date
            </label>
            <input
              type="date"
              name="deliveryDate"
              id="deliveryDate"
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Number of Items *
            </label>
            <div className="flex items-center space-x-2">
              <button type="button" className="bg-gray-300 px-2 py-1 rounded">
                -
              </button>
              <input
                type="text"
                name="numberOfItems"
                className="w-16 text-center border p-2 rounded"
                placeholder="0"
                onChange={handleChange}
                required
              />
              <button type="button" className="bg-gray-300 px-2 py-1 rounded">
                +
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="itemType">
              Item Type *
            </label>
            <select
              name="itemType"
              id="itemType"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            >
              <option value="1">Item Type1 </option>
              <option value="2">Item Type2</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="instructions">
              Instructions *
            </label>
            <textarea
              name="instructions"
              id="instructions"
              className="w-full border p-2 rounded outline-none"
              placeholder="Input Instructions"
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
