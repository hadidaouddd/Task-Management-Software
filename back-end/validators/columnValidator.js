const Joi = require("joi");

const columnSchema = Joi.object({
  name: Joi.string().required(),
  board_id: Joi.number().required(),
});

module.exports = { columnSchema };
