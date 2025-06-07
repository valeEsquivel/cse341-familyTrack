const { body, validationResult } = require("express-validator");
const wardController = require("../controllers/ward");
const validate = {};

/* ***********************
 * Data Validation Rules
 *************************/
validate.memberRules = () => {
  return [
    // name: required, string type, not empty
    body("name")
      .exists()
      .withMessage("Name is required.")
      .bail()
      .isString()
      .withMessage("Name must be a string.")
      .bail()
      .notEmpty()
      .withMessage("Please provide a name.")
      .trim()
      .escape(),

    // birthday: required, string type, not empty
    body("birthday")
      .exists()
      .withMessage("Birthday is required.")
      .bail()
      .isString()
      .withMessage("Birthday must be a string.")
      .bail()
      .notEmpty()
      .withMessage("Please provide a birthday.")
      .trim()
      .escape(),

    // email: required, string type, not empty, valid email format
    body("email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required."),

    //wardId: required, string type, not empty, custom validator
    body("wardId")
      .exists()
      .withMessage("Ward ID is required.")
      .bail()
      .isString()
      .withMessage("Ward ID must be a string.")
      .bail()
      .notEmpty()
      .withMessage("Please provide a ward ID.")
      .bail()
      .custom(async (value) => {
        const wardExists = await wardController.verifyWard(value);
        if (!wardExists) {
          throw new Error("Ward ID does not exist.");
        }
        return true;
      })
      .trim()
      .escape(),
  ];
};

validate.validateMember = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((error) => ({
        field: error.param,
        message: error.msg,
      })),
    });
  }
  next();
};

module.exports = validate;
