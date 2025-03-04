import User from "../models/user.model.js"
import { connect } from "../mongodb/mongoose.js";  


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
                    email: email_addresses[0].email_address,
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
}

export const deleteUser = async (id) => { // ✅ Ensure 'id' is passed as a parameter
    try {
        await connect();
        const deletedUser = await User.findOneAndDelete({ clerkId: id }); // ✅ Pass 'id' as an object
        if (!deletedUser) {
            console.log("User not found.");
            return null;
        }
        console.log("User deleted successfully:", deletedUser);
        return deletedUser;
    } catch (error) {
        console.log("Error occurred in delete user:", error);
    }
};
