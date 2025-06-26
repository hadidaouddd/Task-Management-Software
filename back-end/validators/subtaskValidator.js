const Joi = require("joi");

const subtaskSchema = Joi.object({
  title: Joi.string().required(),
  is_completed: Joi.boolean().required(),
  task_id: Joi.number().required(),
});

module.exports = { subtaskSchema };
