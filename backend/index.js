const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const { DBConnect } = require('./DB/db');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth.route');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // 👈 your frontend origin
  credentials: true,               // 👈 allow cookies/headers
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.listen(process.env.PORT, () => {
    DBConnect();
    console.log(`Server is running on port ${process.env.PORT}`);
});


