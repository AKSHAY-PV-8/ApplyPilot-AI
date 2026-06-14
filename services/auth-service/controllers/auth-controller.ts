import type { Response, Request } from "express";
import bcrypt from "bcryptjs"
import prisma from "../utils/prisma.js";
import jwt from "jsonwebtoken";

export const userRegistration = async (req: Request, res: Response) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });
        const userExist = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (userExist) return res.status(409).json({ message: "User already exist" });

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        })

        return res.status(201).json({
            message: "User Registered",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        })

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "Internal error" })
    };

}

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        };

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        };

        const passwordIsCorrect = await bcrypt.compare(password, user.password);

        if (!passwordIsCorrect) {
            return res.status(401).json({
                message: "Invalid credential"
            });
        };

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET!, {
            expiresIn: "1d"
        }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });


        return res.status(200).json({
            message: "User Login Successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("user login Error:", error);
        res.status(500).json({
            message: "Internal Error"
        });
    }
}

export const userLogout = async (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return res.status(200).json({
        message: "User Logout"
    });
};