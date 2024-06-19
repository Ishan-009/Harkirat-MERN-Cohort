import express from "express";
import { BACKEND_URL } from "@repo/common/config";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!" + BACKEND_URL);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Important

// We can also use tsup or ebuild for this scenario however in this case we have used esbuild
// this is new esbuild script build command to compile typescript in order to use common repo package module we are using esbuild as tsc is giving some error so above is the esbuild which we are using to compile and its already working
