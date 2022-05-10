import React from "react";
import ModifiedDate from "../../../Utility/ResuableCode/date";
import DataTable from "react-data-table-component";
import { adminRoute as admin } from "../../../Route/Route";
import history from "../../../Utility/history";
import edit from "../../../Assets/images/login/edit.png";
import delet from "../../../Assets/images/login/delete.png";
import style from "../../../Assets/Css/questionnaire.module.css";
import { Image } from "react-bootstrap";
import LazyLoad from "react-lazyload";

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
      fontSize: "17px",
      display: "block !important",
      paddingRight: "10px",
    },
  },
  cells: {
    style: {
      backgroundColor: "#fff",
      paddingLeft: "15px",
      paddingRight: "10px",
      color: "rgb(23, 74, 132)",
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

const TableChapter = (props) => {
  const columns = [
    {
      name: "Illustration",
      row: "illustration_image",
      selector: (row) => (
        <LazyLoad>
          <img
            key={window.location.pathname}
            height="30px"
            width="40px"
            src={row.illustration_image}
          />
        </LazyLoad>
      ),

      sortable: false,
      hide: "sm",
      width: "10%",
      style: {
        padding: "20px",
      },
    },

    {
      name: "Title",
      row: "name",
      selector: (row) => {
        return `${row.name.substring(0, 100)}${
          row.name.length >= 100 ? "..." : ""
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
        return `${row.description.substring(0, 60)}${
          row.description.length >= 60 ? "..." : ""
        }`;
      },
      sortable: true,
      hide: "md",
      width: "35%",
    },

    {
      name: "Category",
      row: "category_name",

      selector: (row) => row.category_name,
      sortable: false,
      hide: "md",
      width: "10%",
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
        const {
          id,
          name,
          description,
          illustration_image,
          category_id,
          category_name,
          quiz_timer,
          maximum_successor,
          minimum_successor,
          DHN_slot_80,
          DHN_slot_90,
          DHN_slot_100,
          crypto_jelly,
          question_limit,
        } = row;

        return (
          <>
            <Image
              className={style["questionnaire-action"]}
              src={edit}
              onClick={() =>
                history.push({
                  pathname: `${admin.EDITCHAPTERS}${id}`,
                  state: {
                    name,
                    description,
                    illustration_image,
                    category_id,
                    category_name,
                    quiz_timer,
                    maximum_successor,
                    minimum_successor,
                    DHN_slot_80,
                    DHN_slot_90,
                    DHN_slot_100,
                    crypto_jelly,
                    question_limit,
                  },
                })
              }
            />

            <Image
              className={style["questionnaire-action"]}
              src={delet}
              onClick={() => props.ChapterDelete(row.id)}
            />
          </>
        );
      },
    },
  ];

  const filteredItems = props.data.filter(
    (item) =>
      item.name &&
      item.name.toLowerCase().indexOf(props.filterText.toLowerCase()) !== -1
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

export default TableChapter;
