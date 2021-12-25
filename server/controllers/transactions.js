import Account from "../models/account.js";
import Transaction from "../models/transaction.js"
export const getTransactions = async (req, res) => { 
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res
  .status(201)
  .json({transactions});
    
} catch (error) {
    res.status(409).json({ message: error.message });
   
}
  }
export const getTransaction = async (req, res) => { 
    const { id } = req.params;
    try {
      const trasaction = await Transaction.findById(id)
      res
    .status(201)
    .json({trasaction});
      
  } catch (error) {
      res.status(409).json({ message: error.message });
     
  }
  }

export const getTransactionByAccount = async (req, res) => { 
      const { id } = req.params;
      
      try {
        const transactions = await Transaction.find({account:id}).sort({ createdAt: -1 });
        res
      .status(201)
      .json({transactions});
        
    } catch (error) {
        res.status(409).json({ message: error.message });
       
    }
  }

export const createTransaction = async (req, res) => { 

    const {montant , description, type, account} = req.body;
    
    const account2 = await Account.findById(account);  
    if(type === 'crediter')
    {
      account2.solde = Number(account2.solde)+ Number(montant);
    }
    else{
      account2.solde = Number(account2.solde)-Number(montant);
    }
    await Account.findByIdAndUpdate(account, account2, {
      new: true,
    });
    try {  
      const transaction = await Transaction.create({
        montant , description, type, account:account
     })
      res.status(200).json(transaction);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

  }

export const updateTransaction = async (req, res) => { 

    const { id: _id } = req.params;
    const transaction = req.body;
    
    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(_id, transaction, {
        new: true,
      });
      res.json(updatedTransaction);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

  }

export const deleteTransaction = async (req, res) => { 

    const { id } = req.params;
    try {
      const transaction = await Transaction.findById(id);  

      
      const account = await Account.findById(transaction.account);  
      console.log(account.solde)
 if(transaction.type === 'crediter')
    {
      account.solde = account.solde-transaction.montant;
    }
    else{
      account.solde = account.solde+transaction.montant;
    }
    console.log(account.solde)
    await Account.findByIdAndUpdate(account._id, account, {
      new: true,
    });
     await Transaction.findByIdAndRemove(id);
        
    
     
      res.json({ message: "Transaction deleted successfully." });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

  }

export const getLastTransactions= async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 }).limit(10)
    res
  .status(201)
  .json({transactions});
    
} catch (error) {
    res.status(500).json({ message: error.message });
   
}}