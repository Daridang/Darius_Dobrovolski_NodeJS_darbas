import { body, check } from 'express-validator'

export const registerValidator = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("the name must have minimum length of 3")
    .trim(),

  check("password")
    .isLength({ min: 8, max: 15 })
    .withMessage("your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one sepcial character"),

  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      console.log(req.body.password, req.body.confirmPassword);
      throw new Error("confirm password does not match");
    }
    return true;
  }),
]

export const auctionCreateValidation = [
  check('image')
    .notEmpty()
    .withMessage('Please enter image url')
    .isString()
    .withMessage('Must be valid url'),

  check('title')
    .notEmpty()
    .withMessage('Please enter title')
    .isLength({ min: 3, max: 255 })
    .withMessage('Must be between 3 and 255 characters length'),

  body('time', 'Enter time').notEmpty(),
  body('startPrice', 'Enter price').notEmpty(),
]