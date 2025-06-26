const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  column_id: Joi.number().required(),
  subtasks: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
      })
    )
    .optional(),
});

module.exports = { taskSchema };
