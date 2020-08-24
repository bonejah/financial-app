import React from "react";

export default (props) => {

  const options = props.list.map((option, index) => {
    return (
      <option key={index} value={option.value}>{option.label}</option>
    )
  });

  return (
    <select {...props}>
      {options}
    </select>
  );
}