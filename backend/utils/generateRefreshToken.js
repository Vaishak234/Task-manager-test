import jwt from "jsonwebtoken";

const generateRefreshToken = async (userId) => {
    try {
        const refreshToken = await jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '30d' });
        return refreshToken;
    } catch (error) {
        console.error("Error generating refresh token:", error);
        throw new Error("Could not generate refresh token");
    }
};

export default generateRefreshToken;