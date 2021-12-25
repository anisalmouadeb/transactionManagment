import express from "express";
const router = express.Router();
import { getTransactions ,getLastTransactions,getTransaction,getTransactionByAccount,createTransaction,updateTransaction,deleteTransaction} from "../controllers/transactions.js";


router.get("/",getTransactions);
router.get("/lasts",getLastTransactions);
router.get("/:id",getTransaction);
router.get("/account/:id",getTransactionByAccount);
router.post("/",createTransaction);
router.patch("/:id",updateTransaction);
router.delete("/:id",deleteTransaction);
export default router;