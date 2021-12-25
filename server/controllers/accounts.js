import Account from "../models/account.js";
import Transaction from "../models/transaction.js"
export const getAccounts = async (req, res) => { 
    try {
        const accounts = await Account.find().sort({ createdAt: -1 })
        res
      .status(200)
      .json({accounts});
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
   
  }

  export const getActiveAccounts = async (req, res) => { 
    try {
        const accounts = await Account.find({isActive:true})
        res
      .status(200)
      .json({accounts});
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
   
  }

export const getAccount = async (req, res) => { 
    const { id } = req.params;
    try {
        const account = await Account.findById(id);       
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }

  export const createAccount = async (req, res) => { 
    const account = req.body;
    console.log(account);
    const newAccount = new Account(account);
    try {  
      await newAccount.save();
      res.status(201).json(newAccount);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const updateAccount = async (req, res) => { 

    const { id: _id } = req.params;
    const account = req.body;

    console.log(account);
    
    try {
      const updatedAccount = await Account.findByIdAndUpdate(_id, account, {
        new: true,
      });
      res.json(updatedAccount);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

  }

  export const deleteAccount = async (req, res) => { 

    const { id } = req.params;
    try {
      await Account.findByIdAndRemove(id);
      await Transaction.deleteMany({account:id})
      res.json({ message: "Account deleted successfully." });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

  }