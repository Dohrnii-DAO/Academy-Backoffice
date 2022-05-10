import React from "react";

const PublicLayout = (props) => {
  return (
    <>
      <div className="main-wrapper">{props.children}</div>
    </>
  );
};

export default PublicLayout;
