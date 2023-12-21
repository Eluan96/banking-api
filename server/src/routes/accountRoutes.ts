import express from 'express';
import { createAccount,  } from '../controllers/account/createAccount';
import { loginAccount } from '../controllers/account/loginAccount';
import { updateAccount } from '../controllers/account/updateAccountDetails';
import { depositToSavingsWallet } from '../controllers/account/depositInAccount';
import { getAccountBalance } from '../controllers/account/getAccountBalance';
import { getAccountInfo } from '../controllers/account/getAccountInfo';
import { auth } from '../middleware/auth';
import { resendOTP } from '../controllers/account/resendOtp';
import { verifyAccount } from '../controllers/account/verifyAccount';
import { withdrawFromSavingsWallet } from '../controllers/account/withdrawFromAccount';

const router = express.Router();

router.post('/create', createAccount)
router.post('/login', loginAccount)
router.put('/update-account', auth, updateAccount)
router.put('deposit-to-account', depositToSavingsWallet)
router.get('/get-account-balance', auth, getAccountBalance)
router.get('/get-account-info', auth, getAccountInfo)
router.put('/resend-otp/:token', resendOTP)
router.patch('/verify-account', verifyAccount)
router.put('/withdraw-from-account', auth, withdrawFromSavingsWallet)



export default router