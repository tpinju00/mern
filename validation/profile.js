const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.subject = !isEmpty(data.subject) ? data.subject : "";

  console.log("data subjects", data.subjects);
  console.log("length", data.subjects.length);

  if (data.subjects && data.subjects.length) {
    data.subjects = data.subjects;
    console.log("not empty");
  } else {
    data.subjects = "";
    console.log("empty");
  }
  data.level = !isEmpty(data.level) ? data.level : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 4 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Profile company is required";
  }

  if (!data.price) {
    errors.price = "Profile price is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location  field is required";
  }

  if (Validator.isEmpty(data.level)) {
    errors.level = "Level  field is required";
  }

  if (Validator.isEmpty(data.subject)) {
    errors.subject = "Subject  field is required";
  }

  if (!data.subjects) {
    errors.subjects = "Subjects  field is required";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
