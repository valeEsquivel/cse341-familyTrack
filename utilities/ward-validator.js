const { body, validationResult } = require("express-validator");
const stakeController = require("../controllers/stake");
const validate = {};

/* ***********************
 * Data Validation Rules
 *************************/
validate.wardRules = () => {
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

    //stakeId: required, string type, not empty, custom validator
    body("stakeId")
      .exists()
      .withMessage("Stake ID is required.")
      .bail()
      .isString()
      .withMessage("Stake ID must be a string.")
      .bail()
      .notEmpty()
      .withMessage("Please provide a stake ID.")
      .bail()
      .custom(async (value) => {
        const stakeExists = await stakeController.verifyStake(value);
        if (!stakeExists) {
          throw new Error("Stake ID does not exist.");
        }
        return true;
      })
      .trim()
      .escape(),
  ];
};

validate.validateWard = (req, res, next) => {
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
