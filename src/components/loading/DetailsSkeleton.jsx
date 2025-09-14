import React from "react";

const DetailsSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 animate-pulse p-4">
      {/* Left Panel */}
      <div className="flex-1 space-y-4">
        
        <div className="bg-blue-50 p-4 rounded">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-300 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
            </div>
          </div>
        </div>

      
        <div className="bg-blue-50 p-4 rounded space-y-3">
          <div className="h-10 bg-gray-300 rounded w-full" />
          <div className="h-10 bg-gray-300 rounded w-full" />
          <div className="h-10 bg-gray-300 rounded w-full" />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/3 space-y-4">
        {/* Summary */}
        <div className="bg-blue-50 p-4 rounded space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/2" />
          <div className="h-4 bg-gray-300 rounded w-2/3" />
          <div className="h-4 bg-gray-300 rounded w-1/3" />
        </div>

        {/* User Info */}
        <div className="bg-blue-50 p-4 rounded space-y-2">
          <div className="h-4 bg-gray-300 rounded w-2/3" />
          <div className="h-4 bg-gray-300 rounded w-1/2" />
          <div className="h-4 bg-gray-300 rounded w-1/4" />
        </div>

        {/* Shipping Address */}
        <div className="bg-blue-50 p-4 rounded">
          <div className="h-4 bg-gray-300 rounded w-full" />
        </div>

        {/* Payment Method */}
        <div className="bg-blue-50 p-4 rounded">
          <div className="h-4 bg-gray-300 rounded w-1/3" />
        </div>

        {/* Payment Status */}
        <div className="bg-blue-50 p-4 rounded space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/2" />
          <div className="h-4 bg-gray-300 rounded w-1/4" />
        </div>

        {/* Expected Delivery */}
        <div className="bg-green-50 p-4 rounded">
          <div className="h-4 bg-green-300 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;
