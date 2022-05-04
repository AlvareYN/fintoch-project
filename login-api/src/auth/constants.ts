export const jwtConstants = {
    secret: process.env.JWT_SECRET || "secretKey",
    expiresIn: '60s',
}