import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routes/indexRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // read JSON data from the request body
app.use(express.urlencoded({ extended: true })); // read URL-encoded data

// Routes (API endpoints)
app.use('/api', router);
app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

export default app;