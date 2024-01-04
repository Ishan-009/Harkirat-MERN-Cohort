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
  body: zod.string(),
});

const updateTodoValidator = zod.object({
  id: zod.string(),
});

module.exports = { createTodoValidator, updateTodoValidator };
