const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const { Server } = require('socket.io');
const http = require('http');

const { DBConnect } = require('./DB/db');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth.route');
const chatRouter = require('./routers/chat.route');
const fileRouter = require('./routers/file.route');

const app = express();

const server = http.createServer(app);//create server and buind with express

app.use(cors({
  origin: 'http://localhost:5173', // 👈 your frontend origin
  credentials: true,               // 👈 allow cookies/headers
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);
app.use('/api/file', fileRouter);

//connect socket io to frontend
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // React frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('send_message', (data) => {
    console.log('Received message:', data);

    // Send message to all clients
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  })
});

server.listen(process.env.PORT, () => {
    DBConnect();
    console.log(`Server is running on port ${process.env.PORT}`);
});


