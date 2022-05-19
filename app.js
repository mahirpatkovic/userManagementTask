const path = require('path');
const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const permissionRouter = require('./routes/permissionRoutes');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/permissions', permissionRouter);

module.exports = app;
