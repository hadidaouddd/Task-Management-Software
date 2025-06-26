const Joi = require("joi");

exports.boardSchema = Joi.object({
  title: Joi.string().required(),
  columns: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        color: Joi.string().optional(),
      })
    )
    .optional(),
});
