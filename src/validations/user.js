import joi from "joi";
export const signUpValidation = joi.object({
  username: joi.string().required().min(6).messages({
    "string.empty": "Vui lòng điền đầy đủ tên đăng nhập",
    "any.required": "Tên đăng nhập là trường bắt buộc",
    "string.min": " Tên đăng nhập phải tối thiểu (#litmit) ký tự ",
    "string.max": " Tên đăng nhập phải tối đa (#litmit) ký tự ",
  }),
  email: joi.string().required().email().messages({
    "string.empty": "Vui lòng điền đầy đủ email ",
    "any.required": "Email là trường bắt buộc",
    "string.email": "Email không hợp lệ",
  }),
  password: joi.string().required().min(6).messages({
    "string.empty": "Vui lòng điền đầy đủ password",
    "any.required": "Password là trường bắt buộc",
    "string.min": " Password phải tối thiểu (#litmit) ký tự ",
    "string.max": " Password phải tối đa (#litmit) ký tự ",
  }),
  role: joi.string(),
});

export const signInValidation = joi.object({
  email: joi.string().required().email().messages({
    "string.empty": "Vui lòng điền đầy đủ email ",
    "any.required": "Email là trường bắt buộc",
    "string.email": "Email không hợp lệ",
  }),
  password: joi.string().required().min(6).messages({
    "string.empty": "Vui lòng điền đầy đủ password",
    "any.required": "Password là trường bắt buộc",
    "string.min": " Password phải tối thiểu (#litmit) ký tự ",
    "string.max": " Password phải tối đa (#litmit) ký tự ",
  }),
});
