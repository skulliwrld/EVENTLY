// import mongoose from 'mongoose'


// let cached = (global as any).mongoose || { conn: null, promise: null };

// export const connectToDB = async () => {
//   if (cached.conn) return cached.conn;

//   if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');
  
//   cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
//     dbName:"skullievents",
//     bufferCommands: false,
//   })

//   cached.conn = await cached.promise;

//   return cached.conn;
// }


import mongoose from "mongoose";

let isConnected = false;

const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDB = async () =>{
    mongoose.set("strictQuery", true);

    if(isConnected){
        console.log("MONGODB is connected already");
        return
    }

    try {
        await mongoose.connect(`${MONGODB_URI}`,{
            dbName:"Dashboard"
        })

        isConnected = true
        console.log("MongoDB is connected")
    } catch (error) {
        console.log(error)
    }
}