import express from "express";
const router = express.Router();
import { getAccounts,getAccount,getActiveAccounts,createAccount, updateAccount, deleteAccount } from "../controllers/accounts.js";


router.get("/",getAccounts);
router.get("/active",getActiveAccounts);
router.get("/account/:id",getAccount);
router.post("/",createAccount);
router.patch("/:id",updateAccount);
router.delete("/:id",deleteAccount);
export default router;