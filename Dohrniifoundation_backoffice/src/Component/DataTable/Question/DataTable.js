import React from "react";
import edit from "../../../Assets/images/login/edit.png";
import delet from "../../../Assets/images/login/delete.png";
import DataTable from "react-data-table-component";
import history from "../../../Utility/history";
import { adminRoute as admin } from "../../../Route/Route";
import ModifiedDate from "../../../Utility/ResuableCode/date";
import { Image } from "react-bootstrap";
import "../../../Assets/Css/questions.css";

const customStyles = {
  rows: {
    style: {
      minHeight: "72px",
      fontSize: "15px",
      borderBottomColor: "#d5e6ff!important;",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#c5eeed",
      display: "block !important",
      paddingLeft: "15px",
      paddingRight: "5px",
      height: "55px",
      fontSize: "17px",
      display: "block !important",
      paddingRight: "100px",
    },
  },
  cells: {
    style: {
      backgroundColor: "#fff",
      display: "block !important",
      padding: "20px",
      paddingLeft: "15px",
      paddingRight: "8px",
      color: "rgb(23, 74, 132)",
      display: "block !important",
      padding: "20px",
    },
  },
};

const TableQuestion = (props) => {
  const columns = [
    {
      name: "Questions",
      row: "ques_name",
      selector: (row) => {
        return `${row.ques_name.substring(0, 140)}${
          row.ques_name.length >= 140 ? "..." : ""
        }`;
      },
      sortable: true,
      hide: "md",
      width: "60%",
      paddingRight: "8px",
    },

    {
      name: "Modified Date",
      row: "updated_at",
      selector: (row) => <ModifiedDate date={row.updated_at} />,
      sortable: false,
      hide: "md",
      width: "20%",
    },

    {
      name: "Actions",
      row: "id",
      selector: (row) => row.id,
      button: true,
      hide: "md",
      width: "20%",
      style: {
        padding: "12px",
        textAlign: "center",
      },

      cell: (row) => {
        const { id, ques_name, quiz_ans_data } = row;
        return (
          <>
            <Image
              className="question-action"
              src={edit}
              onClick={() =>
                history.push({
                  pathname: `${admin.EDITQUESTIONS}${id}`,
                  state: {
                    ques_name,

                    quiz_ans_data,
                  },
                })
              }
            />

            <Image
              className="question-action"
              src={delet}
              onClick={() => props.QuestionDelete(row.id)}
            />
          </>
        );
      },
    },
  ];

  const filteredItems = props.data.filter(
    (item) =>
      item.ques_name &&
      item.ques_name.toLowerCase().indexOf(props.filterText.toLowerCase()) !==
        -1
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredItems}
        defaultSortField="name"
        responsive={true}
        striped
        pagination
        customStyles={customStyles}
      />
    </>
  );
};

export default TableQuestion;
