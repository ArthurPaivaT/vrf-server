import "./env";
import express from "express";
import cors from "cors";
import routes from "./routes";
import { cleanupExpiredAddresses, fetchNotRevealed } from "revealer";

const port = process.env.PORT || 3333;

(async () => {
  try {
    const server = express();

    fetchNotRevealed();
    setInterval(cleanupExpiredAddresses, 60000);

    server.use(cors());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(routes);

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`Server started on port ${port}`);
    });

    // drop()
  } catch (error) {
    console.error(error);
  }
})();
