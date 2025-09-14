import DataTable from "react-data-table-component";
import { IoIosList } from "react-icons/io";

const ShowTable = ({ dashboard }) => {
  // Table Columns
  const columns = [
    {
      name: "Thumbnail",
      cell: (row) => (
        <img
          className="w-10 h-10 rounded-full border  border-lightBorder dark:border-darkBorder"
          src={
            row?.thumbnail
              ? `${import.meta.env.VITE_API_SERVER}${row?.thumbnail}`
              : ""
          }
          alt="images"
        />
      ),
    },
    {
      name: "Exam Name",
      selector: (row) => row.exam_name,
      cell: (row) => (
        <span className="text-sm font-semibold ">{row.exam_name}</span>
      ),
      center: true,
    },
    {
      name: "Total Mark",
      selector: (row) => row.total_marks,
      cell: (row) => (
        <span className="text-sm font-semibold ">{row.total_marks}</span>
      ),
      center: true,
    },
  ];

  const propsData = {
    pageTitle: "Top Product List",
    pageIcon: <IoIosList />,
    // buttonName: "Create New Category",
    // buttonUrl: "/dashboard/create-category",
    // type: "add",
  };

  return (
    <>
      
      <section className="flex items-center justify-between shadow-md p-4 rounded-lg dark:bg-darkCard bg-lightCard  my-3">
        <div>
          <p className="flex items-center gap-2 font-semibold text-lightTitle dark:text-darkTitle text-lg capitalize">
            {propsData?.pageIcon}
            <span>{propsData?.pageTitle}</span>
          </p>

        </div>


      </section>
      <DataTable
        columns={columns}
        data={dashboard.$topExams}
        pagination
        className="rdt_Table"
      />
    </>
  );
};

export default ShowTable;
