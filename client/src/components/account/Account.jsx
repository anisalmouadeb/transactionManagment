import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from "../../api/index";
import { ToggleOn,MonetizationOn} from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import { useParams,useHistory } from "react-router-dom";
import "./account.css";
import {getAccount, updateAccount} from "../../actions/account"
import { DataGrid } from "@material-ui/data-grid";

export default function Account() {
  
    const dispatch=useDispatch()
    const history = useHistory();
    const {account} = useSelector((state) => state.accounts);
    const { accounts } = useSelector((state) => state.accounts);
    const { accountId } = useParams()
    const d2="Desactive"
    const d="Active"
    const t=<p style={{color:'red'}}>Debit</p>
    const t2=<p style={{color:'green'}}>Credit</p>
    const[transactions, setTransactions]=useState([]);
    const [accountData, setAccountData] = useState({
   
      solde: "",
      isActive:null,
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
  
    const [formErrors, setFormErrors] = useState({
      solde:false,
      });
    const [formErrorsMsg, setFormErrorsMsg] = useState({
        solde:"",
        });
   
  
     useEffect(() => {
     dispatch(getAccount(accountId));
     const fetchTransactionsByAccountId = async () => {
      const res = await api.fetchTransactionsByAccount(accountId);
      console.log(res)  
      setTransactions(res.data.transactions)
     };
    fetchTransactionsByAccountId();
    }, []);
  

    const validate = (values) => {
    
      let soldeError =false;
      let soldeErrorMsg ="";
      if(values.solde && Number(values.solde)>=0)
         return true
      if (!values.solde) {
        soldeError =true;
        soldeErrorMsg ="required"      
      }
      if (Number(values.solde)<0) {
        soldeError =true;
        soldeErrorMsg ="can't be negative"      
      }
      setFormErrors({solde:soldeError})
      setFormErrorsMsg({solde:soldeErrorMsg})
      return false;
    };
  


    
  const handleSubmit = (e) => {
    if(accountData.isActive==null) 
    {
      e.preventDefault();
      return alert("Please select Status")
    }
    const isvalid= validate(accountData);
    if(isvalid)
    {
      if(accountData.isActive==="false")
      accountData.isActive = false
      else accountData.isActive=true;
      dispatch(updateAccount(accountId, accountData, history));
      history.push('/accounts')
    }
    else
    {
      e.preventDefault();
    }
   };

   const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'montant', headerName: 'Amount', width: 200 },
    { field: 'createAt', headerName: 'Transaction Date', width: 200 },
    { field: 'type', headerName: 'Type', width: 130,

    renderCell: (params) => {
        return (
         params.row.type==="crediter" ? t2:t
        );
        }},   
  ];
  let rows=[]
  transactions ? rows = transactions.map(tran => {
   
    return {
      id: tran._id,
      montant : tran.montant,
      createAt: new Date(tran.createdAt).toISOString().substr(0,10),
      type:tran.type,
      
    };
  }):rows=[]
  return (
    
   <div className="account">
      <div className="accountTitleContainer">
        <h1 className="accountTitle">Account #{account.libelle}</h1>
        
      </div>
      <div className="accountContainer">
        <div className="accountShow">
          
          <div className="accountShowBottom">
            <span className="accountShowTitle">Details</span>
            <div className="accountShowInfo">
              <MonetizationOn className="accountShowIcon" />
              <span className="accountShowInfoTitle">Balance : {account.solde}</span>
            </div>
     
            <div className="accountShowInfo">
              <ToggleOn className="accountShowIcon" />
              <span className="accountShowInfoTitle">Status : {account.isActive ? d : d2}</span>
            </div>
          
          </div>
        </div>
        <div className="accountUpdate">
          <span className="accountUpdateTitle">Edit</span>
          <form className="accountUpdateForm">
            <div className="accountUpdateLeft">
            <div className="accountUpdateItem">
                <label>Balance</label>
                <TextField
                  type="number"
                  placeholder="Balance"
                  className="accountUpdateInput"
                  error={formErrors.solde}
                  helperText ={formErrorsMsg.solde}
                  value={accountData.solde}
                  onChange={(e) =>
                    setAccountData({ ...accountData, solde: e.target.value })
                  }
                />
              </div>
              <div className="accountUpdateItem">
                <label>Status</label>
             
                    <select  className="accountUpdateInput"
                     onChange={(e) =>
                        setAccountData({ ...accountData, isActive: e.target.value })
                      }
                    >
                      <option selected="selected">Select Status</option>
            {statusOptions.map((option) => (
              <option key={option.value}value={option.value}>{option.label}</option>
            ))}
            
          </select>
              </div>
             
             
              <button className="accountUpdateButton"
              onClick={handleSubmit}
              >Update</button>
            </div>
          
           
            
          </form>
        </div>
      </div>
      
      <div className="accountTitleContainer">
        <h1 className="accountTitle">History of Transactions</h1>
      </div>
      <DataGrid
            rows={rows}
            disableSelectionOnClick
            columns={columns}
            pageSize={11}
            checkboxSelection
          />
         
        
    </div>
  );
}
