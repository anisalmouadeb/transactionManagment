import React, { useEffect,useState } from 'react';
import "./transactionsList.css"
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useSelector,useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {deleteTransaction} from '../../../actions/transaction'
import * as api from "../../../api/index";

export default function TransactionsList() {
    const dispatch = useDispatch();
    const [transactions,setTransactions]=useState([]);
    const {accounts} = useSelector((state) => state.accounts);
    useEffect(() => {
      const fetchtTrans = async () => {
        const res = await api.fetchTransactions();
        setTransactions(res.data.transactions);
       };
       fetchtTrans();
      }, [transactions]);
   

    const d=<p style={{color:'red'}}>debit</p>
    const d2=<p style={{color:'green'}}>credit</p>
      const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        {
          field: 'account',
          headerName: 'Account Name',
          width: 200,
        },
        { field: 'montant', headerName: 'Amount', width: 130 },
     
        { field: 'type', headerName: 'Type', width: 130,
    
        renderCell: (params) => {
            return (
             params.row.type==="crediter" ? d2:d
            );
            }},
        { field: 'createAt', headerName: 'Transaction Date', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
      
     
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
               <DeleteOutline
                  className="transactionListDelete"
                  onClick={() => dispatch(deleteTransaction(params.row.id))}
                />
              </>
            );
          },
         
               
          },
       
      ];
      let rows
  transactions ?  rows = transactions.map(tran => {
    var accountLabel
    accounts.map((acc)=>{
        if(acc._id === tran.account){
            accountLabel =acc.libelle
        }
    })
    return {
      id: tran._id,
      montant : tran.montant,
      createAt: new Date(tran.createdAt).toISOString().substr(0,10),
      type:tran.type,
      description:tran.description,
      account : accountLabel
    };
  }): rows=[]



      return (
        
        <div className="accountList">
            <Link to={"/AddTransaction"}>
                  <button className="transactionListAdd">Add New Transaction</button>
            </Link>
      <DataGrid
            rows={rows}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            checkboxSelection
          />
         
        </div>
      );

}