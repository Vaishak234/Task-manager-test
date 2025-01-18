import UserModel from "../models/userModel.js";

export const createUser = async (name, email, password) => {
    try {
        const user = await UserModel.create({
            name,
            email,
            password
        });

        return user;
    } catch (error) {
        console.log('error in creating user', error);

    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email })
        return user;
    } catch (error) {
        console.log('error in creating user', error);

    }
}

export const findUserById = async (id) => {
    try {
        const user = await UserModel.findOne({ _id: id })
        return user;
    } catch (error) {
        console.log('error in creating user', error);

    }
}