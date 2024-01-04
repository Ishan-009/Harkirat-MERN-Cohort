/**
 * Todo{
 *  title:string
 *  description:schema
 *  completed:boolean
 * }
 *
 */

const mongoose = require("mongoose");
// mongodb url

mongoose
  .connect(
    "mongodb+srv://Ishan:uoYxKxy5cXT2pq1T@cluster0.c43txie.mongodb.net/?retryWrites=true&w=majority/todos"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the application if there's an error in connecting
  });
const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});
const todo = mongoose.model("todos", todoSchema);

module.exports = { todo };
