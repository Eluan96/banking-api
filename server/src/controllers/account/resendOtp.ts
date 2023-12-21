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

//Resend opt for account verification
export const resendOTP = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token } = req.params;
  
      const verified = jwt.verify(
        token,
        process.env.APP_SECRET!
      ) as unknown as JwtPayload;
  
      if (!verified) {
        return res.status(400).json({
          message: "invalid token",
        });
      }
  
      const OTP = generateOTP();
  
      await Account.update({ otp: OTP }, { where: { email: verified.email } });
  
      const html = emailHtml(verified.email, OTP);
      await sendmail(
        `${process.env.DEV_GMAIL_USER}`,
        verified.email,
        "Welcome",
        html
      );
  
      return res.status(200).json({ message: "resendOTP successful" });
    } catch (error) {
      return res.json({
        message: "resendOTP failed",
        error: error,
      });
    }
  };
  