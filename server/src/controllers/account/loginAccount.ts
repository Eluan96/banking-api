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

//Controller for logging-in account
export const loginAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
  
      const { email, password } = req.body;
      const account = (await Account.findOne({ where: { email } })) as unknown as IACCOUNT;
  
      if (!account) {
       res.status(400).json({ message: "account does not exists. Kindly signup." });
        }
  
      if (account && account.verify === true) {
          const validate = await bcrypt.compare(password, account.password);
  
          if (validate) {
            const token = jwt.sign(
              { email: account.email, id: account.id },
              process.env.APP_SECRET!,
              { expiresIn: "1d" }
            );
  
            return res.status(200).json({
                 message: `Login successfully`,
                 email: account.email,
                 account_token: token,
                 verify: account.verify,
                 id: account.id,
                 firstName: account.firstName,
                 lastName: account.lastName
            });
          } else {
            res.status(400).json({
              message: `Password is incorrect. Please check password details and try again.`,
            });
          }
        } else {
          return res.status(400).json({
            message: `account Not Verified`,
          });
        }
      }
     catch (error) {
      console.error("Error verifyingaccount:", error);
      return res.status(500).json({
        message: `Internal Server Error`,
        Error: "/accounts/login",
      });
    }
  }