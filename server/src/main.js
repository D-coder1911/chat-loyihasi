import { config } from "dotenv";
import server from "./app.js";
import { connectDB } from "./config/mongo.config.js";

config();

await connectDB();

server.listen(process.env.APP_PORT, () => {
  console.log(`Listening on ${process.env.APP_PORT}`);
});
