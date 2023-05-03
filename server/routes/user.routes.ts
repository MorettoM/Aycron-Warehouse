import { Router } from "express";
import UserController from "@controllers/user.controllers";

const router = Router();

router.get("/", UserController.getUser);

//  Input : username, email, password, isAdmin via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400,500.
router.post("/register", UserController.postUser);


export default router;
