import mongoose from "mongoose";


let initialized = false;

export const connect = async () => {
    mongoose.set('strictQuery', true);

    if(initialized){
        console.log("Already connected to mongoDB");
        return;
    }

    try{

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "next-social-app",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to mongodb");
        initialized = true;

    }catch(error){
        console.log("Error connecting to mongodb", error);
    }
}