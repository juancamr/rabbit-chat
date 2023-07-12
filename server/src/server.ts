require("dotenv").config();
import server from "./app";
import { serverConfig } from "./config/appConfig";
import { connectToRabbit } from "./config/rabbitConfig";

async function startServer() {
  await connectToRabbit();
  server.listen(serverConfig.port, () => {
    console.log(`Magic is happen on port ${serverConfig.port}`);
  });
}

startServer();
