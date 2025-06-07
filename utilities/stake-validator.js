const { body, validationResult } = require("express-validator");
const validate = {};

/* ***********************
 * Data Validation Rules
 *************************/
validate.stakeRules = () => {
  return [
    // country: required, string, not empty, trimmed, escaped
    body("country")
      .exists().withMessage("Country is required.")
      .bail()
      .isString().withMessage("Country must be a string.")
      .bail()
      .notEmpty().withMessage("Please provide a country.")
      .trim()
      .escape(),

    // name: required, string type, not empty
    body("name")
      .exists().withMessage("Name is required.")
      .bail()
      .isString().withMessage("Name must be a string.")
      .bail()
      .notEmpty().withMessage("Please provide a name.")
      .trim()
      .escape()
  ];
};

validate.validateStake = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((error) => ({
        field: error.param,
        message: error.msg,
      })),
    });
  }
  next();
};

module.exports = validate;
