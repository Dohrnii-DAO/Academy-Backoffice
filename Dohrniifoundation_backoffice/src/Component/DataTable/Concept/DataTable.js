import React from "react";
import ModifiedDate from "../../../Utility/ResuableCode/date";
import DataTable from "react-data-table-component";
import LazyLoad from "react-lazyload";
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
      display: "block !important",
      fontSize: "17px",
      paddingRight: "50px",
    },
  },
  cells: {
    style: {
      backgroundColor: "#fff",
      padding: "25px",
      color: "rgb(23, 74, 132)",
      display: "block !important",
    },
  },
  rdt_TableRow: {
    style: {
      backgroundColor: "#eaf9f9",
      color: "#181a1a",
    },
  },
};

const TableConcept = (props) => {
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
      row: "title",
      selector: (row) => {
        return `${row.title.substring(0, 40)}${
          row.title.length >= 40 ? "..." : ""
        }`;
      },
      sortable: true,
      hide: "md",
      width: "20%",
    },
    {
      name: "Short Description",
      row: "short_description",
      selector: (row) => {
        return `${row.short_description.substring(0, 25)}${
          row.short_description.length >= 20 ? "..." : ""
        }`;
      },
      sortable: true,
      hide: "md",
      width: "15%",
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
      width: "24%",
    },
    {
      name: "Type",
      row: "type",
      selector: (row) => row.type[0].toUpperCase() + row.type.substring(1),
      sortable: true,
      hide: "md",
      width: "8%",
      style: {
        textAlign: "left",
      },
    },
    {
      name: "Modified Date",
      row: "updated_at",
      selector: (row) => <ModifiedDate date={row.updated_at} />,
      sortable: false,
      hide: "md",
      width: "13%",
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
          title,
          description,
          short_description,
          illustration_image,
          type,
          video_type,
          content_url,
          content_url_text,
          content_text,
        } = row;

        return (
          <>
            <Image
              className={style["questionnaire-action"]}
              src={edit}
              onClick={() =>
                history.push({
                  pathname: `${admin.EDITCONCEPTS}${id}`,
                  state: {
                    title,
                    description,
                    short_description,
                    illustration_image,
                    type,
                    video_type,
                    content_url,
                    content_url_text,
                    content_text,
                  },
                })
              }
            />

            <Image
              className={style["questionnaire-action"]}
              src={delet}
              onClick={() => props.newdeleteConcept(row.id)}
            />
          </>
        );
      },
    },
  ];

  const filteredItems = props.data.filter(
    (row) =>
      JSON.stringify(row.title)
        .toLowerCase()
        .indexOf(props.filterText.toLowerCase()) !== -1
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

export default TableConcept;
