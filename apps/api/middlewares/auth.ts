import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next:NextFunction) => {
    try{

        const authHeaders = req.headers['authorization'];
    
        if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
            res.status(401).json({
                msg: 'Invalid authorization headers',
            });
            return;
        }
    
        const token = authHeaders.split(' ')[1];
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    
        req.user = { _id: decoded.id };
    
        next()
    }catch(e){
        res.status(401).json({
            msg:"Invalid or expired token"
        })
        return
    }
};
