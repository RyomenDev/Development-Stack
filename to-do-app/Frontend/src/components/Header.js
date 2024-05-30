import PropTypes from "prop-types";
import Button from "./button";
// import React from 'react'

// const Header = (props) => {
const Header = ({ title , onAdd ,showAdd}) => {
  // const onClick = () => {
  //   console.log("click");
  //   alert("click");
  // };

  return (
    <header className="header">
      {/* <h1 style={{color:'red',backgroundColor:'blue'}}>Task Tracker</h1> */}
      {/* <h1 style={headingStyle}>Task Tracker</h1> */}
      {/* <h1>{props.title}</h1> */}
      {/* <h1>Task Tracker</h1> */}
      <h1>{title}</h1>
      <Button color={showAdd?'red':'green'} text={showAdd?'CLOSE':'ADD'} onClick={onAdd} />
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  // title:PropTypes.string,
  title: PropTypes.string.isRequired,
};

// css in js
// const headingStyle = {
//   color: "red",
//   backgroundColor: "yellow",
// };

export default Header;
