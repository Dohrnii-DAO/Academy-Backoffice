import React from "react";
import edit from "../../../Assets/images/login/edit.png";
import delet from "../../../Assets/images/login/delete.png";
import DataTable from "react-data-table-component";
import history from "../../../Utility/history";
import { adminRoute as admin } from "../../../Route/Route";
import ModifiedDate from "../../../Utility/ResuableCode/date";
import { Image } from "react-bootstrap";
import style from "../../../Assets/Css/questionnaire.module.css";

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
    },
  },
};

const TableQuestionnaire = (props) => {
  const columns = [
    {
      name: "Questions",
      row: "title",
      selector: (row) => {
        return `${row.title.substring(0, 140)}${
          row.title.length >= 140 ? "..." : ""
        }`;
      },
      sortable: true,
      hide: "md",
      width: "50%",
      paddingRight: "8px",
    },

    {
      name: "Questions Type",
      row: "type",
      selector: (row) => {
        return `${row.type.substring(0, 15)}${
          row.type.length >= 15 ? "..." : ""
        }`;
      },
      sortable: true,
      hide: "md",
      width: "15%",
    },

    {
      name: "Modified Date",
      row: "updated_at",
      selector: (row) => <ModifiedDate date={row.updated_at} />,
      sortable: false,
      hide: "md",
      width: "15%",
    },
    {
      name: "Decider",
      row: "decider",
      selector: (row) => row.id,
      sortable: true,
      hide: "md",
      width: "10%",

      cell: (row) => {
        const { id } = row;
        return (
          <>
            <input
              className={style["questionnaire-action"]}
              type="radio"
              id="question"
              name="fav_language"
              value="JavaScript"
              onClick={() => props.QuestionnaireDecider(row.id)}
              checked={row.decider ? "checked" : ""}
            />
          </>
        );
      },
    },

    {
      name: "Actions",
      row: "id",
      selector: (row) => row.id,
      button: true,
      hide: "md",
      width: "10%",
      style: {
        padding: "12px",
        textAlign: "center",
      },

      cell: (row) => {
        const { id, title, type } = row;
        return (
          <>
            <Image
              className={style["questionnaire-action"]}
              src={edit}
              onClick={() =>
                history.push({
                  pathname: `${admin.EDITQUESTIONNAIRE}${id}`,
                  state: {
                    title,
                    type,
                  },
                })
              }
            />

            <Image
              className={style["questionnaire-action"]}
              src={delet}
              onClick={() => props.QuestionnaireDelete(row.id)}
            />
          </>
        );
      },
    },
  ];

  const filteredItems = props.data.filter(
    (item) =>
      JSON.stringify(item.title)
        .toLowerCase()
        .indexOf(props.filterText.toLowerCase()) !== -1
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

export default TableQuestionnaire;
