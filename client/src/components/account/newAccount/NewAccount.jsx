import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./newAccount.css";
import { getAccounts,createAccount } from "../../../actions/account";
import { TextField } from "@material-ui/core";
export default function NewAccount() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { accounts } = useSelector((state) => state.accounts);
  const [accountData, setAccountData] = useState({
    libelle: "",
    solde: "",
    isActive: null,
  });

  const [formErrors, setFormErrors] = useState({
    libelle: false,
    solde:false,
    });
    const [formErrorsMsg, setFormErrorsMsg] = useState({
      libelle: "",
      solde:"",
      });

  const statusOptions = [
    {
      label: "Activated",
      value: true,
    },
    {
      label: "Disabled",
      value: false,
    },
  ];

  const verifExist = () => {
    var occ = 0;
    accounts.map((acc) => {
      if (acc.libelle === accountData.libelle) {
        occ = occ + 1;
      }
    });
    if(occ===0)
    {
      return false;
    }else{
        return true;
    }
  };

  const validate = (values) => {
    
    let libelleError,soldeError =false;
    let libelleErrorMsg,soldeErrorMsg ="";
    if(values.libelle && values.solde && Number(values.solde)>=0 && values.libelle.length>=8)
       return true
    if (!values.libelle) {
      libelleError =true;
      libelleErrorMsg ="required"         
    }   
    if (values.libelle.length<8) {
      libelleError =true;
      libelleErrorMsg ="minimum 8 characters"         
    } 
    if (!values.solde) {
      soldeError =true;
      soldeErrorMsg ="required"      
    }
    if (Number(values.solde)<0) {
      soldeError =true;
      soldeErrorMsg ="can't be negative"      
    }
    setFormErrors({libelle:libelleError,solde:soldeError})
    setFormErrorsMsg({libelle:libelleErrorMsg,solde:soldeErrorMsg})
    return false;
  };




  const handleSubmit = (e) => {
    if(accountData.isActive==null) 
    {
      e.preventDefault();
      return alert("Please select Status")
    }
    if (verifExist()) {
      e.preventDefault();
      return alert("please change name");
    } 
    const isvalid= validate(accountData);
    if(isvalid)
    {
      dispatch(createAccount(accountData, history));
      dispatch(getAccounts())
      history.push(`/accounts`);
    }
    else{
      e.preventDefault();
    }
      
    
  };

  return (
    <div className="account">
      <div className="accountContainer">
        <div className="accountUpdate">
          <span className="accountUpdateTitle">Add New Account</span>
          <form className="accountUpdateForm">
            <div className="accountUpdateLeft">
              <div className="accountUpdateItem">
                <label>Account Name</label>
                <TextField
                error={formErrors.libelle}
                helperText ={formErrorsMsg.libelle}
                  type="text"
                  placeholder="name"
                  autoComplete="off"
                  value={accountData.libelle}
                  onChange={(e) =>
                    setAccountData({ ...accountData, libelle: e.target.value })
                  }
                  className="accountUpdateInput"
                />
              </div>
              <div className="accountUpdateItem">
                <label>Balance</label>
                <TextField
                  error={formErrors.solde}
                  helperText ={formErrorsMsg.solde}
                  type="number"
                  placeholder="Balance"
                  className="accountUpdateInput"
                  value={accountData.solde}
                  onChange={(e) =>
                    setAccountData({ ...accountData, solde: e.target.value })
                  }
                />
              </div>
              <div className="accountUpdateItem">
                <label>Status</label>

                <select
                  className="accountUpdateInput"
                  onChange={(e) =>
                    setAccountData({ ...accountData, isActive: e.target.value })
                  }
                >
                    <option selected="selected">Select Status</option>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button className="accountUpdateButton" onClick={handleSubmit}>
                Add Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
