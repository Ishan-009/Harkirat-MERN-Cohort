const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

const Joi = require("joi");

// for getting request body
app.use(express.json());

// For password hashing
const bcrypt = require("bcrypt");

// Importing config file

const config = require("./config/config.js");

mongoose
  .connect(config.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the application if there's an error in connecting
  });

// Creating User Schema

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Step 3: Password Hashing
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Step 4 :- Indexes for efficiency

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

// Step 5: Creating User Model by filling up with User Schema

const User = mongoose.model("User", userSchema);

// Validation using Joi

// Get All User Query Validation
const validateGetUserQuery = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  page_size: Joi.number().integer().min(2).optional(),
  username: Joi.string().alphanum().optional(),
  email: Joi.string().email().optional(),
});

// POST, Create User Validation

const validatePostUserRequest = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().optional(),
});

// Get by ID , Validate Param

const validateIdParam = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^[0-9a-f]{24}$/),
});

// PUT , Param and Schema Validation

const validateUpdateUserRequest = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
});
// Step 6: Routing & Logic

// POST Create User

app.post("/users/create", async (req, res) => {
  const newUser = req.body;
  try {
    // Validate User Body

    const { error, value } = validatePostUserRequest.validate(req.body);

    if (error) {
      res
        .status(400)
        .json({ message: "Invalid Request", error: error.details });
      return;
    }

    const { username, email } = value;
    console.log(username);
    console.log(email);
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    }); // it filters the search criteria and apply search on username or email and finds one user

    // Check for existing User to avoid duplication
    if (existingUser) {
      res.status(409).json({ message: "Username or Email Already Existed" });
      return;
    }

    // we are creating hashed password for every user in above line, before saving user
    const user = await User.create(value);

    if (user) {
      res.status(201).json({ data: user });
      return;
    }
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Invalid user data", errors: error.errors });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get Users with Filter and Validation

app.get("/users", async (req, res) => {
  const query = req.query; // optional pagination and filtering
  try {
    const { error, value } = validateGetUserQuery.validate(
      req.query || req.body
    );

    if (error)
      return res
        .status(400)
        .json({ message: "Invalid query parameters", error: error.details });

    // assigning page and page size value from value variable
    const { page = 1, page_size = 2, username, email } = value;

    const skip = (page - 1) * page_size;

    //Assigning User Defined Filters to the variable
    const filter = {};
    if (username) filter.username = username;
    if (email) filter.email = email;

    const users = await User.find(filter, null, {
      limit: page_size,
      skip,
    })
      .select("-password") // exclude password
      .lean(); // Customize data result with filer,  limit and skip

    const totalUsers = await User.countDocuments(filter);
    // Custom Response
    const response = {
      message: "User Data",
      data: users,
      pagination: { page, page_size },
      totalUsers: totalUsers,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get User BY ID:-

app.get("/users/:id", async (req, res) => {
  try {
    // Validate User Param
    const { error, value } = validateIdParam.validate(req.params);

    if (error) return res.status(400).json({ message: "Invalid User ID" });

    const { id } = value;
    console.log(id);

    // Fetch User by Id

    const user = await User.findById(id).select("-password").lean();

    // check for user not found
    if (!user) {
      return res.status(404).json({ message: "User with given Id not found" });
    }
    return res
      .status(201)
      .json({ message: "User Data with the given ID", data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update User PUT

app.put("/users/update/:id", async (req, res) => {
  try {
    // Validate ID parameter
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Validate User Body
    const { error, value } = validateUpdateUserRequest.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ message: "Invalid Request", error: error.details });

    // Check for existing User
    const user = await User.findByIdAndUpdate(id, value, { new: true }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res
      .status(200)
      .json({ message: "Updated User Details", data: user });
  } catch (error) {
    // Handle other errors here
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Global Error Catcher
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

// Last Step:- Enable application to listen on port
app.listen(port, () => console.log(`Server listening on port ${port}`));
