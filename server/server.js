import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import EmployeeRouter from './routers/employeeRouter.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

//API END pOINTS
app.get('/', (req, res) => {
  res.send('API Working');
});
app.use('/api/employees', EmployeeRouter);

app.listen(port, () => {
  console.log(`Server is running on PORT:${port}`);
});
