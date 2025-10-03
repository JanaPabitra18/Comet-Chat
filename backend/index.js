//const express= require('express');
import express from 'express';
import dotenv from 'dotenv';  
import connectDB from './database.js';
import userRoute from './routes/userRoute.js';  
import cors from 'cors';
import messageRoute from './routes/messageRoute.js';
import cookieParser from 'cookie-parser';
import {app,server} from './socket/socket.js';

//import path from 'path';

dotenv.config({});
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// const corsOptions={
//     origin:'http://localhost:5173',
//     credentials:true,            //access-control-allow-credentials:true
//     // optionSuccessStatus:200
// }
app.use(cors({
    origin:'https://comet-chat-frontend.onrender.com/login',
    credentials:true ,   //access-control-allow-credentials:true
     optionSuccessStatus:200
}));


//routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute);


server.listen( PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`)
});
