import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const TextFieldGroup = ({
  name,
  selected,
  className = "",
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  const isSelected = selected === value ? "selected" : "";
  return (
    <div className={styles.formGroup}>
      <input
        type={type}
        className={`c-field u-x1of1 ${isSelected} ${className}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small>{info}</small>}
      {error && <div>{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
