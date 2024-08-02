export const validBodyRequest = (schema) => async (req, res, next) => {
  try {
    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) {
      const err = error.details.map((err) => err.message);
      return res.status(400).json({
        message: err,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
