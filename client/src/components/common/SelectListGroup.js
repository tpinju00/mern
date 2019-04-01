import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const SelectListGroup = ({
  name,
  selected,
  className = "",
  value,
  error,
  info,
  onChange,
  options
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  const isSelected = selected === value ? "selected" : "";
  return (
    <div className={styles.categoriesFP}>
      <select
        className={`c-fieldThree u-x1of1 ${isSelected} ${className}`}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small>{info}</small>}
      {error && <div>{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
