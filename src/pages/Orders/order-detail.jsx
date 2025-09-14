import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { privateRequest } from "../../config/axios.config";
import moment from "moment";
import { FaCarSide } from "react-icons/fa";
import OrderModal from "../../components/orderFormModal/OrderModal";

import DetailsSkeleton from "../../components/loading/DetailsSkeleton";

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(""); // Track selected status
  const [value, setValue] = useState("pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    privateRequest
      .get(`/admin/order/${id}`)
      .then((response) => {
        setOrderDetails(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleStatusChange = async (event) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
    console.log("Selected status:", selectedStatus);

    if (selectedStatus === "shipped") {
      setIsModalOpen(true);
      return; // Open modal for "shipped" status
    }

    try {
      const res = await privateRequest.post(`admin/order/status/update/${id}`, {
        order_status: selectedStatus,
        _method: "PUT", // ✅ correct syntax
      });
      console.log("Status update response:", res.data);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  //   formate date code here
  const formatDate = (dateString) => {
    const formattedDate = moment(dateString).format("DD MMM YYYY");
    return formattedDate;
  };
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  };
  const orderAllPrice = () => {
    let subtotal = orderDetails?.["order item"]?.reduce(
      (acc, curr) => Number(acc) + Number(curr?.sell_price) * curr?.qty,
      0
    );
    let taxPrice = orderDetails?.["order item"]?.reduce(
      (acc, curr) => Number(acc) + Number(curr?.product?.tax_price),
      0
    );

    let deliveryPrice = Number(
      orderDetails?.["order Details"]?.shipment?.delivery_charge || 0
    );
    return {
      subtotal,
      taxPrice,
      deliveryPrice,
      totalPrice: subtotal + taxPrice + deliveryPrice,
    };
  };
  const hendleOpnenOrderModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // console.log(orderDetails?.["order Details"]?.shipping_address.district?.name)
  if (loading) {
    return <DetailsSkeleton />;
  }

  return (
    <div>
      <div className="flex gap-5 ">
        <div className="w-8/12 space-y-4">
          {/* order product show section  */}
          <section className="rounded-lg p-4 shadow-sm bg-blue-50 space-y-3">
            <div className="flex justify-between">
              <p className="bg-[#F7FAFC] p-4 rounded-lg font-bold text-base text-gray-500">
                All Item
              </p>
              <select
                value={
                  status || orderDetails?.["order Details"]?.order_status || ""
                }
                onChange={handleStatusChange}
                className="bg-primary text-white rounded-lg px-5 py-2"
              >
                <option disabled value="">
                  Select status
                </option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {orderDetails?.["order item"]?.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center hover:bg-[#F7FAFC] rounded-lg p-4 gap-5 ${
                  index % 2 === 0 ? "bg-[#F7FAFC]" : ""
                }`}
              >
                <img
                  className="w-16 h-16 border rounded-lg flex-shrink-0"
                  src={`${process.env.REACT_APP_BASE_API}${item?.product?.thumbnail_image}`}
                  alt={item?.product?.title || "Product"}
                />

                <div className="w-[300px] ">
                  <p>Product Name</p>
                  <p className="text-base font-bold text-gray-600">
                    {item?.product?.title}
                  </p>
                </div>

                <div className="w-[120px]">
                  <p>Attribute</p>
                  <p className="text-base font-bold text-gray-600">
                    {item?.attribute?.name}
                  </p>
                </div>

                <div className="w-[100px]">
                  <p>Color</p>
                  <p className="text-base font-bold text-gray-600">
                    {item?.color?.name}
                  </p>
                </div>

                <div className="w-[80px]">
                  <p>Quantity</p>
                  <p className="text-base font-bold text-gray-600">
                    {item?.qty}
                  </p>
                </div>

                <div className="w-[100px]">
                  <p>Price</p>
                  <p className="text-base font-bold text-gray-600">
                    {item?.sell_price * item?.qty}
                  </p>
                </div>
              </div>
            ))}
          </section>
          {/* pricing calculation code here  */}
          <section className="rounded-lg p-4 shadow-sm bg-blue-50 space-y-3">
            <div className={`  rounded-lg p-4  `}>
              <div className="  w-full flex py-3 font-bold text-black   bg-[#F7FAFC]">
                <p className="w-3/4">Cart Totals</p>
                <p className="1/4">Price</p>
              </div>
              <div className=" border-b-2 w-full flex py-4 font-bold  hover:bg-[#F7FAFC] mt-2">
                <p className="w-3/4">Subtotal:</p>
                <p className="1/4">${orderAllPrice()?.subtotal}</p>
              </div>

              {/* <div className=" border-b-2 w-full flex py-4 font-bold  hover:bg-[#F7FAFC]">
                <p className="w-3/4">Shipping:</p>
                <p className="1/4">$10.00</p>
              </div> */}

              <div className=" border-b-2 w-full flex py-4 font-bold  hover:bg-[#F7FAFC]">
                <p className="w-3/4">Tax (GST):</p>
                <p className="1/4">${orderAllPrice()?.taxPrice}</p>
              </div>
              <div className=" border-b-2 w-full flex py-4 font-bold  hover:bg-[#F7FAFC]">
                <p className="w-3/4">Delivery Charge:</p>
                <p className="1/4">${orderAllPrice()?.deliveryPrice}</p>
              </div>

              <div className=" border-b-2 w-full flex py-4 font-bold  hover:bg-[#F7FAFC]">
                <p className="w-3/4 text-black">Total price:</p>
                <p className="1/4 text-red-500">
                  ${Math.ceil(orderAllPrice()?.totalPrice ?? 0)}
                </p>
              </div>
            </div>
          </section>
          {/* <Link to="/invoice">
            <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Get Invoice
            </button>
          </Link> */}
          <Link
            to="invoice"
            className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Get Invoice
          </Link>
        </div>
        {/* order divided second part  */}
        <section className="w-4/12 space-y-4">
          {/* order summary
           */}
          <section className="rounded-lg p-4 shadow-sm bg-blue-50">
            <h2 className="font-bold text-base text-black pb-2"> Summary</h2>
            <div className="grid grid-cols-2">
              <div className="text-gray-600 text-base">
                <p>Order ID</p>
                <p>Date</p>
                <p>Time</p>
                <p>Total</p>
              </div>
              <div className=" text-base text-black ">
                <p>{orderDetails?.["order Details"]?.order_id}</p>
                <p>{formatDate(orderDetails?.["order Details"]?.updated_at)}</p>
                <p>
                  {" "}
                  {formatTime(orderDetails?.["order Details"]?.updated_at)}
                </p>
                <p className="text-red-600">
                  $
                  {Math.ceil(
                    orderDetails?.["order Details"]?.total_amount ?? 0
                  )}
                </p>
              </div>
            </div>
          </section>
          {/* shipping user   */}
          <section className="rounded-lg p-4 shadow-sm bg-blue-50">
            <div className="grid grid-cols-2">
              <div className="text-gray-600 text-base">
                <p>User Name</p>
                <p>Phone</p>
                <p>Email</p>
              </div>
              <div className=" text-base text-black ">
                <p>{orderDetails?.["order Details"]?.shipping_address?.name}</p>
                <p>
                  {orderDetails?.["order Details"]?.shipping_address?.phone}
                </p>
                <p className="">
                  {orderDetails?.["order Details"]?.shipping_address?.email ||
                    "null"}
                </p>
              </div>
            </div>
          </section>
          {/* shpping address  */}
          <section className="rounded-lg p-4 shadow-sm bg-blue-50">
            <h2 className="font-bold text-base text-black pb-2">
              Shipping Address
            </h2>
            <p className="text-gray-600 overflow-auto">
              {orderDetails?.["order Details"]?.shipping_address?.address_line1}
              ,{" "}
              {orderDetails?.["order Details"]?.shipping_address?.address_line2}
              , {orderDetails?.["order Details"]?.shipping_address?.postal_code}
              , {orderDetails?.["order Details"]?.shipping_address?.union?.name}
              ,{" "}
              {orderDetails?.["order Details"]?.shipping_address?.upazila?.name}
              ,{" "}
              {
                orderDetails?.["order Details"]?.shipping_address?.district
                  ?.name
              }
              ,{" "}
              {
                orderDetails?.["order Details"]?.shipping_address?.division
                  ?.name
              }
            </p>
          </section>
          {/* payment method section  */}
          <section className="rounded-lg p-4 shadow-sm bg-blue-50">
            <h2 className="font-bold text-base text-black pb-2">
              Payment Method
            </h2>
            <p className="text-gray-600 overflow-auto">
              {orderDetails?.["order Details"]?.payment?.payment_status}
            </p>
          </section>
          {/* payment status  */}
          <section className="rounded-lg p-4 shadow-sm bg-blue-50">
            <h2 className="font-bold text-base text-black pb-2">
              Payment Status
            </h2>
            <div className="flex justify-between items-center">
              <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="px-4 py-2 focus:outline-none"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>

              <p>{value}</p>
            </div>
          </section>
          {/* tracking order and expected date of delivery  */}
          <section className="rounded-lg p-4 shadow-sm bg-blue-50">
            <h2 className="font-bold text-base text-black pb-2">
              Expected Date Of Delivery
            </h2>
            <p className="text-green-600 overflow-auto font-bold text-base">
              {/* {orderDetails?.["order Details"]?.shipping_address.district?.name} */}
              <p>
                Estimated Delivery Time:{" "}
                {orderDetails?.[
                  "order Details"
                ]?.shipping_address?.district?.name?.toLowerCase() === "dhaka"
                  ? "1-3 days"
                  : "3-7 days"}
              </p>
            </p>
            <Link
              to={`/dashboard/order/order-tracking/${id}`}
              className="border border-blue-600 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-semibold text-base w-full flex justify-center items-center gap-2 py-3 mt-3"
            >
              {" "}
              <FaCarSide /> Track Order
            </Link>
          </section>
        </section>
      </div>
      {isModalOpen && (
        <OrderModal
          id={id}
          orderDetails={orderDetails?.["order Details"]}
          setIsModalOpen={setIsModalOpen}
          handleOpenOrderModal={hendleOpnenOrderModal}
          handleStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default OrderDetails;
