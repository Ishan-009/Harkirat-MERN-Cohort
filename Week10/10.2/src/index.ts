import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

async function createUser(obj: User) {
  const res = await prisma.formUser.create({
    data: obj,
  });
  console.log(res);
}

createUser({
  firstName: "Ishan",
  lastName: "Moorjmaalni",
  email: "ishanmoorjmalani@gmail.com",
  password: "ishan123",
});
