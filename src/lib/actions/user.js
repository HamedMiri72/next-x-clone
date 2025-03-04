import User from "../models/user.model.js"
import {connect} from "../mongodb.js"

export const createOrUpdateUser = async ({
    id,
    email_addresses,
    first_name,
    last_name,
    image_url,
    username,
}) => {
    try{

        await connect();
        const user = await User.findOneAndUpdate(
            {clerkId: id},
            {
                $set:{
                    email: email_addresses[0].email_addresss,
                    firstName: first_name,
                    lastName: last_name,
                    avatar: image_url,
                    username
                },

            },
            {new: true, upsert: true}
        );
        return user;
    }catch(error){
        console.log("Error occured in create or update user", error);
    }
},

export const deleteUser = async(id) => {
    try{
        await connect();
        await User.findOneAndDelete(id);
    }catch(error){
        console.log("Error occured in delete user!")
    }
}