import mongoose from "mongoose";
require('dotenv').config();

const MongoURI: string = process.env.MONGODB_URL as string;

export default async function connectToDatabase(){
    try{
        await mongoose.connect(MongoURI)
        console.log('Database connection established');
    }catch(error: any){
        console.log(error)
    }
}
