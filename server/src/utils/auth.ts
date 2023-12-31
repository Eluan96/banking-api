import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import otpGenerator from "otp-generator";
import { OTP_LENGTH, OTP_CONFIG } from "./notifications";
import dotenv  from "dotenv";
import User, { IACCOUNT } from "../models/account";
dotenv.config()


export const hashedPassword = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};


export const genAccount = () => {
  const prefix = '015';
    const num = Math.floor(10000000 + Math.random() * 9000);
  const account = `${prefix + num}`
  return account;
}
 
export const generateOTP = () => {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
}

export const tokenGenerator = (data:any)=>{
  const token = jwt.sign(data, process.env.APP_SECRET!, {expiresIn: '1d'})
  return token
}

export const verifyToken = (token:any)=>{
   const decoded = jwt.verify(token, process.env.APP_SECRET!)
   return decoded
}




