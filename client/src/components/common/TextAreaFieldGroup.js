import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const TextAreaFieldGroup = ({
  name,
  selected,
  className = "",
  placeholder,
  value,
  error,
  info,
  onChange
}) => {
  const isSelected = selected === value ? "selected" : "";
  return (
    <div className={styles.formGroup}>
      <textarea
        className={`c-fieldTwo u-x1of1 ${isSelected} ${className}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small>{info}</small>}
      {error && <div>{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
