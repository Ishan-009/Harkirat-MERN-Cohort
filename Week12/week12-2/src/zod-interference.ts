import { z } from "zod";
import express from "express";
const app = express();

const userProfileSchema = z.object({
  name: z.string().min(3, { message: "name field cannot be empty" }),
  age: z.number().min(3, { message: "number field cannot be empty" }),
  email: z.string().email(),
});

export type FinalUserSchema = z.infer<typeof userProfileSchema>;

app.put("/user", (req, res) => {
  const { success } = userProfileSchema.safeParse(req.body);
  const updatedBody: FinalUserSchema = req.body;

  if (!success) {
    return res.send({ message: "Validation Error Bad Request" }).status(400);
  }
  // update operation in db
});

// infer type becomes important when we define same types in frontend too usually we use zod in backend though but usally we dont use zod in frontend but we might need types of these fields of userprofile schema which can be utilize in form in frontend so there we can use this type and do extra form validation over there in frontend or we eneable user to enter only validated data

// here  you might think how do we use backend code in frontend , we will learn about mono repos and turbo repos and we will also see how to share backedn code with frontend and also we will get to next js where frontend and backend are in one project code base

// the thing to know is to infer zod object or may be zod type it could be only string too its necessary it has to be whole object
// example below

const stringUser = z.string().optional();

type FinalTypeUser = z.infer<typeof stringUser>;

// spend some time with this syntax, when next time we will write backend we will use this zod and infer type with typescript to write code in backend
//  at this

// learn z.infer<typeof userProfileSchema i.ee(type of runtime zod object you have created)>

// this infertype  runs at compile level not at js level
