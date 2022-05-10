import React from "react";
import ModifiedDate from "../../../Utility/ResuableCode/date";
import DataTable from "react-data-table-component";
import { adminRoute as admin } from "../../../Route/Route";
import history from "../../../Utility/history";
import edit from "../../../Assets/images/login/edit.png";
import delet from "../../../Assets/images/login/delete.png";
import style from "../../../Assets/Css/questionnaire.module.css";
import { Image } from "react-bootstrap";

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
      paddingLeft: "20px",
      paddingRight: "100px",
      fontSize: "17px",
      display: "block !important",
    },
  },
  cells: {
    style: {
      backgroundColor: "#fff",

      paddingLeft: "15px",
      paddingRight: "100px",

      display: "block !important",
      padding: "20px",
    },
  },
  rdt_TableRow: {
    style: {
      backgroundColor: "#eaf9f9",
      color: "#181a1a",
    },
  },
};

const TableLesson = (props) => {
  const columns = [
    {
      name: "Title",
      row: "title",
      selector: (row) => {
        return `${row.title.substring(0, 100)}${
          row.title.length >= 100 ? "..." : ""
        }`;
      },
      sortable: true,
      hide: "md",
      width: "20%",
    },

    {
      name: "Description",
      row: "description",
      selector: (row) => {
        return `${row.description.substring(0, 150)}${
          row.description.length >= 150 ? "..." : ""
        }`;
      },
      sortable: true,
      hide: "md",
      width: "45%",
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
      width: "15%",
      style: {
        padding: "12px",
        textAlign: "center",
      },

      cell: (row) => {
        const { id, title, description } = row;

        return (
          <>
            <Image
              className={style["questionnaire-action"]}
              src={edit}
              onClick={() =>
                history.push({
                  pathname: `${admin.EDITLESSONS}${id}`,
                  state: {
                    title,
                    description,
                  },
                })
              }
            />

            <Image
              className={style["questionnaire-action"]}
              src={delet}
              onClick={() => props.newdeleteLessons(row.id)}
            />
          </>
        );
      },
    },
  ];

  const filteredItems = props.data.filter(
    (item) =>
      item.title &&
      item.title.toLowerCase().indexOf(props.filterText.toLowerCase()) !== -1
  );

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      responsive={true}
      striped
      pagination
      customStyles={customStyles}
    />
  );
};

export default TableLesson;
