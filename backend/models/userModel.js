import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'email required'],
    },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: [true, 'email already exist']
    },
    password: {
        type: String,
        requid: true,
        min: [6, 'Password contain atleast 6 character'],
        max: 12
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }


}, { timestamps: true })

const UserModel = mongoose.model("user", userSchema)

export default UserModel
