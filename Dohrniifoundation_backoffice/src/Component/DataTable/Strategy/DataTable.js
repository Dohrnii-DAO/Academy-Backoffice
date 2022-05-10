import React from "react";
import edit from "../../../Assets/images/login/edit.png";
import delet from "../../../Assets/images/login/delete.png";
import DataTable from "react-data-table-component";
import history from "../../../Utility/history";
import { adminRoute as admin } from "../../../Route/Route";
import ModifiedDate from "../../../Utility/ResuableCode/date";
import { Image } from "react-bootstrap";
import LazyLoad from "react-lazyload";
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
      fontSize: "17px",
      paddingRight: "100px",
    },
  },
  cells: {
    style: {
      backgroundColor: "#fff",
      padding: "15px",
      paddingLeft: "15px",
      paddingRight: "8px",
      color: "rgb(23, 74, 132)",
      display: "block !important",
    },
  },
};

const TableStrategy = (props) => {
  const columns = [
    {
      name: "Illustration",
      row: "illustration_image",
      selector: (row) => (
        <LazyLoad>
          {" "}
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
        padding: "10px",
      },
    },
    {
      name: "Title",
      row: "title",
      selector: (row) => {
        return `${row.title.substring(0, 25)}${
          row.title.length >= 25 ? "..." : ""
        }`;
      },
      sortable: true,
      hide: "md",
      width: "15%",
    },
    {
      name: "Short Description",
      row: "short_description",
      selector: (row) => {
        return `${row.short_description.substring(0, 40)}${
          row.short_description.length >= 40 ? "..." : ""
        }`;
      },
      sortable: true,
      hide: "md",
      width: "21%",
    },
    {
      name: "Description",
      row: "description",
      selector: (row) => {
        return `${row.description.substring(0, 80)}${
          row.description.length >= 80 ? "..." : ""
        }`;
      },
      sortable: true,
      hide: "md",
      width: "30%",
    },
    {
      name: "Modified Date",
      row: "updated_at",
      selector: (row) => <ModifiedDate date={row.updated_at} />,
      sortable: false,
      hide: "md",
      width: "12%",
    },
    {
      name: "Actions",
      row: "id",
      selector: (row) => row.id,
      button: true,
      hide: "md",
      width: "12%",
      style: {
        padding: "12px",
        textAlign: "center",
      },

      cell: (row) => {
        const {
          id,
          title,
          description,
          short_description,
          illustration_image,
        } = row;
        return (
          <>
            <Image
              className={style["questionnaire-action"]}
              src={edit}
              onClick={() =>
                history.push({
                  pathname: `${admin.EDITSTRATEGIES}${id}`,
                  state: {
                    title,
                    description,
                    short_description,
                    illustration_image,
                  },
                })
              }
            />

            <Image
              className={style["questionnaire-action"]}
              src={delet}
              onClick={() => props.newdelete(row.id)}
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

export default TableStrategy;
