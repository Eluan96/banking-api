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

//Controller to update account details
export const updateAccount = async (req: JwtPayload, res: Response) => {
    try {
        const token: any = req.headers.authorization;
      const payload = token.split(" ")[1];
      const account_details: any = jwt.verify(payload, process.env.APP_SECRET!);

      const accountId = account_details.id;
      let {
        firstName,
      lastName,
      email,
      phoneNumber,
      address,
      country
      } = req.body;
      console.log(req.files);
      const account = await Account.findOne({ where: { id: accountId } });
  
      if (!account) {
        res.status(400).json({ message: "User not found" });
      }
    
  
      const updateField: Partial<IACCOUNT> = {};
  
      if (firstName) {
        updateField.firstName = firstName;
      }
      if (lastName) {
        updateField.lastName = lastName;
      }
      if (email) {
        updateField.email = email;
      }
      if (phoneNumber) {
        updateField.phoneNumber = phoneNumber;
      }
      if (address) {
        updateField.address = address;
      }
      if (country) {
        updateField.country = country;
      }

  
      const [numOfUpdatedRows, updatedUsers] = await Account.update(updateField, {
        where: { id: accountId },
        returning: true, // This option returns the updated rows
      });
  
      const updatedAccount = await Account.findOne({ where: { id: accountId } });
  
      // if (numOfUpdatedRows > 0) {
      return res
        .status(200)
        .json({ message: "User updated successfully", data: updatedAccount });
      // } else {
      // return res.status(404).json({ message: "update failed" });
      // }
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({
        message: `Internal Server Error`,
      });
    }
  };