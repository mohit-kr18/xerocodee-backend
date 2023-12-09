import JWT from 'jsonwebtoken';
import createError from 'http-errors';
import dotenv from "dotenv";
dotenv.config();

export const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {};
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn : '30d',
            audience: userId
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if(err) {
                console.log(err.message);
                reject(createError.InternalServerError());
            }
            resolve(token);
        });
    });
}

export const verifyAccessToken = (req,res,next) => {
    console.log(req.headers['authorization']);
    if (!req.headers['authorization']) return next(createError.Unauthorized());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
        if(err){
            const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
            return next(createError.Unauthorized(message));
        }
        req.payload = payload;
        next();
    })
}


export const signRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {};
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn : '1y',
            audience: userId
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if(err) {
                console.log(err.message);
                reject(createError.InternalServerError());
            }
            resolve(token);
            // save refresh token to database
        });
    });
}

export const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,payload)=>{
            if(err) return reject(createError.Unauthorized());
            const userId = payload.aud;

            resolve(userId);
        })
    });
}





