import React from "react";
import PropTypes from "prop-types";

const InputGroup = ({
  name,
  selected,
  className = "",
  placeholder,
  value,
  error,
  icon,
  type,
  onChange
}) => {
  console.log("error u input grupi", error);
  const isSelected = selected === value ? "selected" : "";
  return (
    <div className>
      <div className>
        <span className>
          <i className={icon} />
        </span>
      </div>
      <input
        className={`c-fieldFour u-x1of1 ${isSelected} ${className}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div>{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
