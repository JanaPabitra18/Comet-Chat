import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import e from 'express';
import jwt from 'jsonwebtoken';  // If you plan to use JWT

export const registerUser = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        // Validate fields
        if (!fullname || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Password confirmation check
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and Confirm Password do not match" });
        }

        // Check if username already exists
        const user= await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate profile photo URL based on gender
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        //const otherProfilePhoto = `https://avatar.iran.liara.run/public/robot?username=${username}`; // Handle non-binary or other genders

        // let profilePhoto;
        // if (gender === "male") {
        //     profilePhoto = maleProfilePhoto;
        // } else if (gender === "female") {
        //     profilePhoto = femaleProfilePhoto;
        // } else {
        //     profilePhoto = otherProfilePhoto;  // Default to robot for non-binary or other genders
        // }

        // Create the user in the database
        await User.create({
            fullname,
            username,
            password: hashedPassword,
            profilePhoto:gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });

        // Optionally, you can issue a JWT token here for session management
        //const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return success response
        return res.status(201).json({
            message: "User registered successfully",
            success:true,
            // token,  // Send the JWT token back to the client
            // user: {
            //     username: newUser.username,
            //     fullname: newUser.fullname,
            //     gender: newUser.gender,
            //     profilePhoto: newUser.profilePhoto
            // }
        })

    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        return res.status(500).json({ message: "Server error" });
    }
};
//  export const loginUser = async (req, res) => {
//     try{
//         const{ username, password }= req.body;
//         if()
//     }
//  }
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate fields
        if (!username || !password ) {
            return res.status(400).json({ message: "Username and Password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password",
                success:false
             });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password",
                
             });
        }
        const tokenData={
            userId: user._id
           // username: user.username,
        };
        // const token= jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn:'1d'});
        // Optionally, you can issue a JWT token here for session management
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return success response
        return res.status(200).cookie("token", token, { httpOnly: true,
                                                       
    // Add sameSite: 'none' and secure: true for production across different domains
    secure: process.env.NODE_ENV === 'production', 
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 // 1 day }).json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            profilePhoto: user.profilePhoto,
    });
} catch (error) {
        console.error(error);  // Log the error for debugging purposes
        return res.status(500).json({ message: "Server error" });
    }

}
export const logoutUser = (req, res) => {
    try{
      return res.status(200).cookie('token' ,"",{maxAge:0}).json({message:"Logged out successfully"});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const getotherUserProfile= async(req,res)=>{
    try {
        const loggedInUserId=req.id;
        const otheruser= await User.find({_id:{$ne:loggedInUserId}}).select("-password -createdAt -updatedAt -__v");
        if(!otheruser){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({otheruser});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}
