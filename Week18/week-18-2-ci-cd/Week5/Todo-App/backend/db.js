// /**
// //  * Todo{
// //  *  title:string
// //  *  description:schema
// //  *  completed:boolean
// //  * }
//  *
//  */

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/cohort_playground")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the application if there's an error in connecting
  });
const todoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const todo = mongoose.model("Todo", todoSchema);

module.exports = { todo };
