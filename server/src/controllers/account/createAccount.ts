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

//Controller for signing up
export const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { firstName, lastName, email, password } = req.body;

    const existingAccount = await Account.findOne({ where: { email: email } });
    if (existingAccount) {
      return res
        .status(400)
        .json({ message: "Account already exists. Kindly login." });
    } else {
      const hashPassword: string = await hashedPassword(password);
      const accNumber: string = genAccount();
      const OTP = generateOTP();

      const newAccount = await Account.create({
        id: v4(),
        firstName,
        lastName,
        email,
        password: hashPassword,
        accountNumber: accNumber,
        savingsWallet: { id: v4(), amount: 0 },
        otp: OTP,
        token: "",
        accountBalance: 10000,
        verify: false,
        phoneNumber: "",
        address: "",
        country: "",
      });

      const account = (await Account.findOne({
        where: { email },
      })) as unknown as IACCOUNT;

      const token = jwt.sign(
        { email: account.email, id: account.id },
        process.env.APP_SECRET!,
        {
          expiresIn: "1d",
        }
      );

      const html = emailHtml(email, OTP);
      const sent_mail = await sendmail(
        `${process.env.GMAIL_account}`,
        email,
        "Welcome",
        html
      );

      return res.status(200).json({
        message: `Account is created successfully`,
        data: newAccount,
        account_token: token,
      });
    }
  } catch (error) {
    console.error("Error creating account:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};