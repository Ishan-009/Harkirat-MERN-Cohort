const zod = require("zod");

/**
 *  body {
 *          title:string
 *          body:string
 *   }
 *
 */

const createTodoValidator = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const updateTodoValidator = zod.object({
  id: zod.string(),
});

module.exports = { createTodoValidator, updateTodoValidator };
