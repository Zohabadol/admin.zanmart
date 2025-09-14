import React from "react";

const VariantModal = ({ children, setOpen }) => {
  return (
  
      <div className="fixed py-10 inset-0 flex max-h-screen items-center justify-center bg-black bg-opacity-50 z-50">
        <div className=" bg-white p-6 rounded-lg shadow-lg sm:w-78 md:w-[500px] overflow-y-auto max-h-full z-50 ">
          {children}
        </div>
        <div
          className="absolute bg-black opacity-5 w-full top-0 left-0 h-full z-5"
          onClick={() => setOpen(false)}
        ></div>
      </div>
   
  );
};

export default VariantModal;
