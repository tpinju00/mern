const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email adresa je neispravnog formata";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Unesite lozinku";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Unesite email adresu";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
