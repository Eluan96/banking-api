import express, { Request, Response, NextFunction } from "express";
import Account, { IACCOUNT } from "../../models/account";
import { v4 } from "uuid";
import { hashedPassword, tokenGenerator } from "../../utils/auth";
import { genAccount } from "../../utils/auth";
import { generateOTP } from "../../utils/auth";
import { emailHtml, sendmail } from "../../utils/notifications";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

//Controller for verifying user
export const verifyAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token: any = req.headers.authorization;
      const token_info = token.split(" ")[1];
      const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);
  
      if (decodedToken) {
        const user_id = decodedToken.id;
  
        const { otp } = req.body;
  
        const user = (await Account.findOne({
          where: { id: user_id },
        })) as unknown as IACCOUNT;
        if (!user) {
          return res.status(400).json({ error: "Account not found" });
        } else {
          if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
          } else {
            await Account.update(
              {
                verify: true,
              },
              {
                where: { id: user_id },
              }
            );
  
            return res.status(200).json({
              msg: "Account verified",
            });
          }
        }
      } else {
        return res.status(400).json({
          message: `You are not an AUTHENTICATED USER`,
        });
      }
    } catch (error: any) {
      console.error("Error verifying user:", error);
      return res.status(500).json({
        Error: "Internal Server Error",
      });
    }
  };