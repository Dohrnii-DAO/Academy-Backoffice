const ModifiedDate = (props) => {
  return (
    new Date(props.date).getFullYear() +
    "-" +
    new Date(props.date).toLocaleDateString("en-Us", {
      month: "2-digit",
    }) +
    "-" +
    new Date(props.date).toLocaleDateString("en-Us", {
      day: "2-digit",
    })
  );
};

export default ModifiedDate;
