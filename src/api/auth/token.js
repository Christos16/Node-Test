
export const JWT_SECRET = "mystery"
const jwt = require("jsonwebtoken");

export default async (req, res) => {
    const token = jwt.sign({
        user: "Authorised for deletion"
    }, JWT_SECRET, {
        expiresIn: 86400, // expires in 24 hours
    })

    res.status(200).send({token})

}