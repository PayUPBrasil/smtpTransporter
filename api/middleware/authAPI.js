import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
dotenv.config();


// Gera token para autenticação do usuário

export const createToken = (req,res)  => {

    console.log(req.body, "Mostrando o body da requisição!");

    const data = req.body;
    const user = data.user;
    const password = data.password;
    const syspass = 'cGF5VVBCcmFzaWxTaXRl'

    if(user == 'PayUP' && password == syspass ){
        const token = jwt.sign({user}, process.env.SECRET, {expiresIn: '1h'});

        res.status(200).json(
            {
                'data':token
            });
            
    } else {
        res.status(401).json({
            error: 'Invalid Credentials.'
        })
    }
}
 