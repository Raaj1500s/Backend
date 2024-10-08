import dotenv from 'dotenv';
import connectDB from './db/index.js';
import {app} from './app.js'


dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {   
    app.listen( process.env.port || 8000, () => {
        console.log("Listening on port " + process.env.PORT);
        
    })
})
.catch((err) => {
    console.log("Mongo db connnection Error occured:", err);
    
})













/*
import mongoose from "mongoose";
import {DB_NAME} from "./constants"
import express from "express"
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error',() =>{
            console.log("Err", error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT} `)
        })
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}) ()
*/