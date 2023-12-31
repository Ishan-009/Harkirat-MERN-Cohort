const express = require("express");

const app = express();
const { todo } = require("./db");
const port = 3000;
const cors = require("cors");
app.use(cors());

// Importing Validations

const { createTodoValidator, updateTodoValidator } = require("./types");

// Using Global Body Data Extraction Middleware
app.use(express.json());

app.get("/todos", async (req, res) => {
  const data = await todo.find({});

  if (!data) {
    res.status(500).send({ messge: "Something Wrong Ocurred" });
  }

  res.status(200).send({ message: "Todo Fetched Successfully", data: data });
});
app.post("/todos", async (req, res) => {
  const body = req.body;
  const validatedData = createTodoValidator.safeParse(body);
  if (!validatedData.success) {
    return res.status(400).json({
      message: "Bad Request with body parameters",
    });
  }
  const { title, description } = body;
  const data = await todo.create({
    title: title,
    description: description,
    completed: false,
  });

  if (!data) {
    res.status(500).send({ messge: "Something Wrong Ocurred" });
  }

  res.status(200).send({ message: "Todo Created Successfully", data: data });
});
app.put("/completed", async (req, res) => {
  const body = req.body;
  const validatedData = updateTodoValidator.safeParse(body);
  if (!validatedData.success) {
    return res.status(400).json("Bad Request with body parameters");
  }
  const { title, description } = body;
  const data = await todo.update(
    { _id: req.id },
    {
      completed: true,
    }
  );

  if (!data) {
    res.status(500).send({ messge: "Something Wrong Ocurred" });
  }

  res.status(200).send({ message: "Todo Updated Successfully", data: data });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === "ValidationError") {
    res.status(400).json({ error: err.message });
  } else if (err instanceof mongoose.Error) {
    res.status(500).json({ error: "Mongoose Error" });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
