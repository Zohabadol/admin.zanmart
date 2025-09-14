import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { privateRequest } from "../../config/axios.config";

const OrderTracking = () => {
  const { id } = useParams(); // Get order id from URL
  
//   let activeLen = 3;
  const [oderStatusUpdate,setOrderStatusUpdate] = useState(1);
  const [orderDetails, setOrderDetails] = useState(null);
  useEffect(() => {
    privateRequest
      .get(`/admin/order/${id}`)
      .then((response) => {
       
        setOrderDetails(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
   useEffect(() => {
       orderDetails?.["order Details"]?.order_status ==="shipped" && setOrderStatusUpdate(4)
       orderDetails?.["order Details"]?.order_status ==="processing" && setOrderStatusUpdate(2)
       orderDetails?.["order Details"]?.order_status ==="cancelled" && setOrderStatusUpdate(0)
       orderDetails?.["order Details"]?.order_status ==="pending" && setOrderStatusUpdate(3)
   },[orderDetails])
  return (
    <div>
      {/* tracking product details  */}
      <section className="flex bg-blue-50 rounded-lg shadow-sm">
        <div></div>
        <div></div>
      </section>
      {/* details trackinng system design  */}
      <section className="  bg-blue-50 rounded-lg p-4">
        <div className="py-5">
            <span className="text-black text-lg font-bold">Detail</span>
            <p className="text-gray-500">
            Your items is on the way. Tracking information will be available within 24 hours.</p>
        </div>
        <div>
          <div className="relative">
            <div className="flex justify-around">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className={`${
                    oderStatusUpdate >= index + 1
                      ? "bg-blue-500  text-white"
                      : "bg-gray-300 "
                  } w-10 h-10 z-50 first: rounded-full flex items-center justify-center`}
                >
                  <FaCheck />
                </div> 
              ))}
            </div>{" "}
            <div className="absolute w-full top-1/2 flex">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className={`${
                    oderStatusUpdate >= index + 1 ? "bg-blue-500 " : "bg-gray-300 "
                  } w-1/4 h-1`}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex justify-around py-4">
            {[
              "Receiving orders",
              "Order processing",
              "Being delivered",
              "Delivered",
            ].map((status, index) => (
              <div
                key={index}
                className={`${
                    oderStatusUpdate >= index + 1 ? "text-black" : "text-gray-300"
                }  w-1/4 flex justify-center`}
              >
                <span className="text-lg font-bold ">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderTracking;
