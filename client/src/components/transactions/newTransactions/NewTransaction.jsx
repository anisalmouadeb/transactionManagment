import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./newTransaction.css";
import * as api from "../../../api/index";
import { createTransaction } from "../../../actions/transaction";
import { TextField } from "@material-ui/core";
export default function NewTransaction() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [accounts, setAccounts] = useState([]);
  const { account } = useSelector((state) => state.accounts);
  const [transactionData, setTransactionData] = useState({
    montant: "",
    account: null,
    description: "",
    type: "",
  });

  const Typeoptions = [
    {
      label: "Credit",
      value: "crediter",
    },
    {
      label: "Debit",
      value: "debiter",
    },
  ];

  const accountsOptions = accounts.map((acc) => {
    return {
      label: acc.libelle,
      value: acc._id,
    };
  });
  const [formErrors, setFormErrors] = useState({
    montant: false,
    description:false,
    });
    const [formErrorsMsg, setFormErrorsMsg] = useState({
      montant: "",
      description:"",
      });
  useEffect(() => {
    const fetchtAccounts = async () => {
      const res = await api.fetchActiveAccounts();
      setAccounts(res.data.accounts);
    };
    fetchtAccounts();
  }, [account]);



  const getAccountSolde = () => {
    var solde = 0;
    accounts.map((acc) => {
      if (acc._id === transactionData.account) {
        solde = acc.solde;
      }
    });
    return solde;
  };


  
  const validate = (values) => {
    
    let montantError,descriptionError =false;
    let montantErrorMsg,descriptionErrorMsg ="";
    if(values.montant && values.description && Number(values.montant)>=0)
       return true
    if (!values.montant) {
      montantError =true;
      montantErrorMsg ="required"         
    }   
    if (!values.description) {
      descriptionError =true;
      descriptionErrorMsg ="required"      
    }
    if (Number(values.montant)<0) {
      montantError =true;
      montantErrorMsg ="can't be negative"      
    }
    setFormErrors({montant:montantError,description:descriptionError})
    setFormErrorsMsg({montant:montantErrorMsg,description:descriptionErrorMsg})
    return false;
  };

  const handleSubmit = (e) => {
    const s = getAccountSolde();
    if (transactionData.account == null) {
      e.preventDefault();
      return alert("please select account");
    } else if (transactionData.type === "") {
      e.preventDefault();
      return alert("please select type");
    } 
    const isvalid= validate(transactionData);
    if(isvalid){
      if (transactionData.type === "debiter") {
        if (transactionData.montant > s) {
          e.preventDefault();
          return alert("solde insufissant");
        } else {
          transactionData.montant = Number(transactionData.montant);
          dispatch(createTransaction(transactionData));
          history.push(`/transactions`);
        }
      } else {
        transactionData.montant = Number(transactionData.montant);
        dispatch(createTransaction(transactionData));
        history.push(`/transactions`);
      }
    }else{
      e.preventDefault();
    }
     
    
  };

  return (
    <div className="trans">
      <div className="transContainer">
        <div className="transUpdate">
          <span className="transUpdateTitle">Add New Transaction</span>
          <form className="transUpdateForm">
            <div className="transUpdateLeft">
              <div className="transUpdateItem">
                <label>Amount</label>
                <TextField
                  error={formErrors.montant}
                  helperText ={formErrorsMsg.montant}
                  type="number"
                  placeholder="amount"
                  value={transactionData.montant}
                  onChange={(e) =>
                    setTransactionData({
                      ...transactionData,
                      montant: e.target.value,
                    })
                  }
                  className="transUpdateInput"
                />
              </div>
              <div className="transUpdateItem">
                <label>Account</label>

                <select
                  className="transUpdateInput"
                  onChange={(e) =>
                    setTransactionData({
                      ...transactionData,
                      account: e.target.value,
                    })
                  }
                >
                  <option selected="selected">Select Account</option>
                  {accountsOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="transUpdateItem">
                <label>Description</label>
                <TextField
                error={formErrors.description}
                helperText ={formErrorsMsg.description}
                  type="text"
                  placeholder="description"
                  className="transUpdateInput"
                  value={transactionData.description}
                  onChange={(e) =>
                    setTransactionData({
                      ...transactionData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="transUpdateItem">
                <label>Type</label>

                <select
                  className="transUpdateInput"
                  onChange={(e) =>
                    setTransactionData({
                      ...transactionData,
                      type: e.target.value,
                    })
                  }
                >
                  <option selected="selected">
                    Select type of transaction
                  </option>
                  {Typeoptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button className="transUpdateButton" onClick={handleSubmit}>
                Add Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
