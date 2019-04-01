const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.location = !isEmpty(data.location) ? data.location : "";

  console.log("data subjects", data.subjects);
  // if (data.subjects.length) {
  //   console.log("length", data.subjects.length);
  // }

  if (data.subjects && data.subjects.length) {
    data.subjects = data.subjects;
    console.log("not empty");
  } else {
    data.subjects = "";
    console.log("empty");
  }

  if (data.levels && data.levels.length) {
    data.levels = data.levels;
    console.log("not empty");
  } else {
    data.subjects = "";
    console.log("empty");
  }
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Nadimak mora biti između 2 i 40 karaktera";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Unesite nadimak";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Unesite radno mjesto";
  }

  if (!data.price) {
    errors.price = "Unesite cijenu instrukcija";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Unesite mjesto održavanja instrukcija";
  }

  if (!data.levels) {
    errors.levels = "Unesite razinu koju podučavate";
  }

  if (!data.subjects) {
    errors.subjects = "Unesite predmete koje podučavate";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Unesite vlastite vještine";
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Neispravan format linka";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Neispravan format linka";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Neispravan format linka";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Neispravan format linka";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
