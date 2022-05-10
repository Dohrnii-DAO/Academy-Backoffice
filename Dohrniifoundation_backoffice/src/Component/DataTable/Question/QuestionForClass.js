import React from "react";
import DataTable from "react-data-table-component";

const customStyles = {
  rows: {
    style: {
      minHeight: "40px",
      fontSize: "13px",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#c5eeed",
      height: "55px",
      fontSize: "17px",
    },
  },
  cells: {
    style: {
      backgroundColor: "#fff",
      color: "rgb(23, 74, 132)",
      padding: "10px",
    },
  },
};

const ClassQuestion = (props) => {
  const columns = [
    {
      name: "Select All",
      row: "ques_name",
      selector: (row) => row.ques_name,
      sortable: true,
      hide: "md",
      paddingRight: "8px",
    },
  ];
  {
    const filteredItems = props.data.filter(
      (item) =>
        item.ques_name &&
        item.ques_name.toLowerCase().indexOf(props.filterText.toLowerCase()) !==
          -1
    );

    return (
      <>
        <DataTable
          title="Question List"
          columns={columns}
          data={filteredItems}
          defaultSortField="name"
          responsive={false}
          striped
          pagination
          selectableRows
          selectableRowSelected={props.rowselect}
          onSelectedRowsChange={props.handlechange}
          customStyles={customStyles}
        />
      </>
    );
  }
};

export default ClassQuestion;
