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

//Contoller to deposit to users account
export const depositToSavingsWallet = async (
    req: Request,
    res: Response,
    NextFunction: NextFunction
  ) => {
    try {
      const token: any = req.headers.authorization;
      const token_info = token.split(" ")[1];
      const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);
  
      if (decodedToken.email) {
        const { cardNumber, expDate, cvv, pin, amount } = req.body;
  
        const account_id = decodedToken.id;
        const account_info: any = await Account.findOne({ where: { id: account_id } });
  
        const account_savings_balance = account_info.savingsWallet;
        const account_balance_amount = account_savings_balance.amount;
        const accountBalance = account_info.accountBalance;
  
        if (amount < accountBalance) {
  
          const new_Savings_Balance = account_balance_amount + amount;
  
          const savings_wallet_obj = { id: account_id, amount: new_Savings_Balance };
  
          const current_savings_balance = await Account.update(
            { savingsWallet: savings_wallet_obj },
            {
              where: {
                id: account_id
              },
            }
          );
  
  
          if (current_savings_balance) {
            return res.status(200).json({
              message: "Amount Deposited to Savings Wallet"
            });
          } else {
            return res.status(400).json({
              message: "Deposit PENDING!! Please wait a few minutes or contact customer service. "
            });
          }
  
        } 
      }
    } catch (error) {
      console.error(error);
    }
  };
