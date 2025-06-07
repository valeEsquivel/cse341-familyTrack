const { body, validationResult } = require("express-validator");
const memberController = require("../controllers/member");
const validate = {};

/* ***********************
 * Data Validation Rules
 *************************/
validate.ancestorRules = () => {
  return [
    // name: required, string type, not empty
    body("firstName")
      .exists()
      .withMessage("First name is required.")
      .bail()
      .isString()
      .withMessage("First name must be a string.")
      .bail()
      .notEmpty()
      .withMessage("Please provide a first name.")
      .trim()
      .escape(),
    
      // name: required, string type, not empty
    body("lastName")
      .exists()
      .withMessage("Last name is required.")
      .bail()
      .isString()
      .withMessage("Last name must be a string.")
      .bail()
      .notEmpty()
      .withMessage("Please provide a last name.")
      .trim()
      .escape(),

    // birthday: required, string type, not empty
    body("birthday")
      .exists()
      .withMessage("Birthday is required.")
      .bail()
      .notEmpty()
      .withMessage("Please provide a birthday.")
      .trim()
      .escape(),

    //memberId: required, string type, not empty, custom validator
    body("responsibleMember")
      .exists()
      .withMessage("Member ID is required.")
      .bail()
      .isString()
      .withMessage("Member ID must be a string.")
      .bail()
      .notEmpty()
      .withMessage("Please provide a member ID.")
      .bail()
      .custom(async (value) => {
        const memberExists = await memberController.verifyMember(value);
        if (!memberExists) {
          throw new Error("Member ID does not exist.");
        }
        return true;
      })
      .trim()
      .escape(),
  ];
};

validate.validateAncestor = (req, res, next) => {
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
