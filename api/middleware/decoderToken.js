import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// Decodifica o token enviado no header da requisição
export const verifyToken = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) return res.status(401).json({
        error: 'Token not provided.'
    });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
       
        if (err) {
            res.status(404).json({
                error: 'Invalid token!'
            })
        }
            next(); 
    })


}