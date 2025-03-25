import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { syncDB } from "./models/index.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // read JSON data from the request body
app.use(express.urlencoded({ extended: true })); // read URL-encoded data

// Sync database
(async () => {
  await syncDB();
}
)();

// Routes (API endpoints)
app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

// Start the server
const port = process.env.PORT || 8080;
const hostname = process.env.HOSTNAME || 'localhost';
app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});