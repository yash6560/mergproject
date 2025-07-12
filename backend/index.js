const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const { DBConnect } = require('./DB/db');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.listen(process.env.PORT, () => {
    DBConnect();
    console.log(`Server is running on port ${process.env.PORT}`);
});


