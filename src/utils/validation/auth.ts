import Joi from "joi";

export const register = Joi.object({
  userName: Joi.string().required().min(5),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"))
    .message(
      "Password must be at least 8 character long and contain at at least one lowercase latter, one uppercase latter, and one number"
    ),
});


export const login = Joi.object({
  email:Joi.string().required(),
  password:Joi.string().required()
})