 
export const CategoryUtilsFunction = () => {
   
    const column = [
        {
          name: "Category ID",
          cell: (row) => row?.category_id,
        },
    
        {
          name: "Category Name",
          cell: (row) => row?.category_name,
        },
        {
          name: "Is Color",
          cell: (row) => row?.is_color?1:0,
        },
        {
          name: "Unit Ids",
          cell: (row) => <span className="flex">{row?.is_unit}</span>
        },

      ];
    return  {
        column,
        
    }
};

 