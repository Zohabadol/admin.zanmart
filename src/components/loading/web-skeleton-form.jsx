import React from "react";

const WebSettingEditSkeleton = () => {
  return (
    <>
      {/* Top Section Skeleton */}
      <section className="flex justify-between shadow-md p-4 px-6 rounded-md bg-white mb-3 animate-pulse">
        <div className="h-6 w-40 bg-gray-300 rounded"></div>
        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
      </section>

      {/* Form Section Skeleton */}
      <section className="shadow-md my-5 p-4 px-6 bg-white animate-pulse rounded-md">
        <form className="px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {/* Simulate multiple input fields */}
            {[...Array(8)].map((_, idx) => (
              <div
                key={idx}
                className={idx === 0 ? "md:col-span-2" : ""}
              >
                <div className="h-5 w-24 bg-gray-300 rounded mb-2"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Submit Button Skeleton */}
          <div className="my-4 flex justify-center">
            <div className="h-10 w-48 bg-gray-300 rounded"></div>
          </div>
        </form>
      </section>
    </>
  );
};

export default WebSettingEditSkeleton;
