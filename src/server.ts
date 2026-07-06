import prismaConfig from "../prisma.config";
import app from "./app";
import { prisma } from "./lib/prisma";

async function main() {
  try {
    await prisma.$connect();
    console.log("Connecting to the database successfully");
    app.listen(5000, () => {
      console.log("server is listening on port : ", 5000);
    });
  } catch (error) {
    console.log("Error starting the server : ", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
