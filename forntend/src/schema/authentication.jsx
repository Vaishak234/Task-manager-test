import * as yup from 'yup';


const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/


export const signupSchema = yup.object().shape({
    name: yup
        .string()
        .required("Username is required"),

    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),

    password: yup
        .string()
        .min(5, "Password must be at least 5 characters long")
        .matches(
            passwordRegx, // Regex: Password should contain at least one letter and one number
            "Password must contain at least one letter and one number"
        )
        .required("Password is required"),
});

export const loginSchema = yup.object().shape({

    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),

    password: yup
        .string()
        .min(5, "Password must be at least 5 characters long")
        .matches(
            passwordRegx, // Regex: Password should contain at least one letter and one number
            "Password must contain at least one letter and one number"
        )
        .required("Password is required"),

});
