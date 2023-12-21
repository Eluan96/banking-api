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

//Controller wo withdraw from users savings account
export const withdrawFromSavingsWallet = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token: any = req.headers.authorization;
      const token_info = token.split(" ")[1];
      const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);
  
      if (decodedToken.email) {
        const { amount } = req.body;
  
        const account_id = decodedToken.id;
        const account_info: any = await Account.findOne({ where: { id: account_id } });
  
        const account_savings_balance = account_info.savingsWallet;
        const account_balance_amount = account_savings_balance.amount;
  
        if (amount <= account_balance_amount) {
          const newSavingsBalance = account_balance_amount - amount;
  
          const savingsWalletObj = { id: account_id, amount: newSavingsBalance };
  
          const updatedUser = await Account.update(
            { savingsWallet: savingsWalletObj },
            {
              where: {
                id: account_id
              },
            }
          );
  
          if (updatedUser) {
            return res.status(200).json({
              message: "Amount Withdrawn from Savings Wallet"
            });
          } else {
            return res.status(400).json({
              message: "Withdrawal PENDING!! Please wait a few minutes or contact customer service."
            });
          }
  
        } else {
          return res.status(400).json({
            message: "Insufficient funds in Savings Wallet"
          });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };