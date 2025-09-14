import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { privateRequest } from "../../config/axios.config";
import moment from "moment";
import logo from "../../assets/image/logo.png";

const Invoice = () => {
  const { id } = useParams();
  const invoiceRef = useRef();
  const [orderDetails, setOrderDetails] = useState(null);
   const [loading, setLoading] = useState(false);

   console.log("orderDetails",orderDetails)

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

  //   formate date code here
  const formatDate = (dateString) => {
    const formattedDate = moment(dateString).format("DD MMM YYYY");
    return formattedDate;
  };
  // const formatTime = (timestamp) => {
  //   if (!timestamp) return "";
  //   const date = new Date(timestamp);
  //   const options = { hour: "numeric", minute: "2-digit", hour12: true };
  //   return date.toLocaleTimeString("en-US", options);
  // };
  if (loading) return <p>Loading...</p>;
  if (!orderDetails) return <p>No data found</p>;

  const order = orderDetails["order Details"];
  const items = orderDetails["order item"];

  console.log("order",order)
  console.log("items",items)

  const handlePrint = () => {
    const printContents = invoiceRef.current.innerHTML;
    const printWindow = window.open("", "", "width=900,height=700");

    printWindow.document.write(`
    <html>
      <head>
        <title>Print Invoice</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body class="bg-white p-6">
        <div id="invoice">${printContents}</div>
        <script>
          window.onload = function () {
            setTimeout(function () {
              window.print();
              window.close();
            }, 500);
          };
        </script>
      </body>
    </html>
  `);
    printWindow.document.close();
  };


  return (
    <>
      {/* Invoice Content to Print */}
      <div
        ref={invoiceRef}
        className="max-w-3xl mx-auto bg-white p-8 shadow-md font-sans text-sm"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <img src={logo} alt="" className="w-14 h-14  " />
          
          <div className="text-right text-gray-600">
            <p>NO. {order.orderId}</p>
            <p className="text-sm">Date: {formatDate(orderDetails?.["order Details"]?.updated_at)}</p>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 pb-4">INVOICE</h1>

        {/* Addresses */}
        <div className="grid grid-cols-2 gap-8 text-gray-700 mb-6">
          <div>
            <h2 className="font-bold">Billed to:</h2>
            <p>{order?.shipping_address?.name}</p>
            <p>{order?.shipping_address?.phone}</p>
            <p>{order?.shipping_address?.email ||"null"}</p>
          </div>
          <div>
            <h2 className="font-bold">From:</h2>
            {/* <p>{order.from.name}</p>
            <p>{order.from.address}</p>
            <p>{order.from.phone}</p> */}
            <p>pppp</p>
            <p>pppp</p>
            <p>pppp</p>
     
          </div>
        </div>

        {/* Items Table */}
        <div className="border border-gray-200 rounded-md">
          <table className="min-w-full text-left text-gray-800">
            <thead className="bg-gray-100 text-sm uppercase">
              <tr>
                <th className="py-2 px-4 border-b">Item</th>
                <th className="py-2 px-4 border-b text-center">Quantity</th>
                <th className="py-2 px-4 border-b text-center">Price</th>
                <th className="py-2 px-4 border-b text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{item?.product?.title}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {item?.qty}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    
                   {item?.sell_price }
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {item?.sell_price * item?.qty}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className=" px-4 text-right font-semibold">
                  Delivery Fee
                </td>
                <td className="py-1 px-4 text-center">
                  ${orderAllPrice()?.deliveryPrice}
                </td>
              </tr>
              <tr>
                <td colSpan="3" className=" px-4 text-right font-semibold">
                  Tax (GST):
                </td>
                <td className="py-1 px-4 text-center">
                  ${orderAllPrice()?.taxPrice}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="3"
                  className=" px-4 text-right font-bold text-lg"
                >
                  Total
                </td>
                <td className="py-1 px-4 text-center font-bold text-lg">
                   ${Math.ceil(orderAllPrice()?.totalPrice ?? 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment & Note */}
        <div className="mt-6 text-gray-700">
          <p>
            <span className="font-semibold">Payment method:</span>{" "}
            {order.paymentMethod}
          </p>
          <p>
            <span className="font-semibold">Payment status:</span>{" "}
            {order.paymentStatus}
          </p>
          <p>
            <span className="font-semibold">Order status:</span>{" "}
            {order.orderStatus}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Note:</span> {order.note}
          </p>
        </div>

        {/* Footer Graphic */}

      </div>

      {/* Print Button */}
      <div className="text-center mt-6">
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Print Invoice
        </button>
      </div>
    </>
  );
};

export default Invoice;
