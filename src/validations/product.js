import Joi from "joi";

export const productValidation = Joi.object({
  title: Joi.string().required().min(3).max(255).messages({
    "string.base": "Tên sản phẩm phải tối thiểu (#litmit) ký tự",
    "string.empty": "Vui lòng nhập tên sản phẩm",
    "string.min": "Tên sản phẩm phải tối thiểu (#litmit) ký tự",
    "string.max": "Tên sản phẩm phải tối đa (#litmit) ký tự",
  }),
  price: Joi.number().required().min(0).messages({
    "string.base": "Giá sản phẩm phải tối thiểu (#litmit) ký tự",
    "string.empty": "Vui lòng nhập giá sản phẩm",
    "string.min": "Giá sản phẩm phải tối thiểu (#litmit) ký tự",
  }),
  description: Joi.string().messages({
    "string.base": "Mô tả là kiểu string",
  }),
  image: Joi.string().messages({
    "string.base": "thumbnail là kiểu string",
  }),
});
