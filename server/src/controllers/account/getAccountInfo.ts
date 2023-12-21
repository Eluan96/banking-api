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

//Controller to get users account info
export const getAccountInfo = async (req: Request, res: Response) => {
    try {
      const token: any = req.headers.authorization;
      const payload = token.split(" ")[1];
      const account_details: any = jwt.verify(payload, process.env.APP_SECRET!);
  
      if (account_details.id) {
        const account_id = account_details.id;
        const account_info: any = await Account.findOne({ where: { id: account_id } });
  
        const account_Balance = account_info.accountBalance;
        const account_Savings_Wallet_Balance =
          account_info.savingsWallet.amount;
        const account_number = account_info.accountNumber;
        const account_name = `${account_info.firstName} ${account_info.lastName}`;
  
        return res.status(200).json({
          data: {
            account_name: account_name,
            account_number: account_number,
            account_balance: account_Balance,
            savings_wallet: account_Savings_Wallet_Balance,
            user: account_info
          },
        });
      } else {
        res.status(400).json({
          message: "Please LOGIN to get your information",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };