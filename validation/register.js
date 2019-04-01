const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Ime mora biti između 2 i 30 karaktera";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Unesite ime";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Unesite email adresu";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email adresa je neispravnog formata";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Unesite lozinku";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Lozinka mora imati najmanje 6 karaktera";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Unesite potvrdu lozinke";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Lozinke nisu jednake";
  }

  if (!data.gdpr) {
    errors.gdpr = "Označite da ste upoznati s pravilima";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
