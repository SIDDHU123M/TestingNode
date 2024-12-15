import PropTypes from "prop-types"

function List(props) {
  return (
    <>
    <h3>{props.heading}</h3>
      <ul>
        {props.items.map((item, index) => (
          <li key={index}>{item.name} : {item.Ext}</li>
        ))}
      </ul>
    </>
  );
}

List.propTypes = {
  items: PropTypes.array.isRequired
};

export default List;