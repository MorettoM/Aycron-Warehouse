import { UserDocument } from "@models/user.model";
import { NextFunction, Request, Response } from "express";

export default {
    isAdmin: (req: Request, res: Response, next: NextFunction) =>{
        if((req?.user as UserDocument).isAdmin){
            next();
        }else{
            res.status(403).send();
        }
    }
}