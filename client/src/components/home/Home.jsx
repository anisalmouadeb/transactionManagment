import React,{ useState,useEffect } from "react";
import * as api from "../../api/index";
import "./home.css";
import FeaturedInfo from "./featuredInfo/FeaturedInfo";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from 'react-redux';
import {getAccounts} from "../../actions/account"
export default function Home() {
    const dispatch = useDispatch()
    const [lastTransactions, setLastTransactions] = useState([]);
    const {accounts} = useSelector((state) => state.accounts);
    useEffect(() => {
        dispatch(getAccounts())
          const fetchLasts = async () => {
          const res = await api.fetchLastTransactions();
          setLastTransactions(res.data.transactions);
        };
        fetchLasts();
      }, []);
             
    const d=<p style={{color:'red'}}>debit</p>
    const d2=<p style={{color:'green'}}>credit</p>
      const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        {field: 'account',headerName: 'Account Name',width: 200,},   
        { field: 'montant', headerName: 'Amount', width: 130 },
        { field: 'type', headerName: 'Type', width: 130,
        renderCell: (params) => {
            return (
             params.row.type==="crediter" ? d2:d
            );
            }},
        { field: 'createAt', headerName: 'Transaction Date', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
        
         
      ];
      let rows
      lastTransactions ?  rows = lastTransactions.map(tran => {
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
          account :accountLabel
        };
      }): rows=[]
    
    return (
        <div className="home">
       <FeaturedInfo/>
       <div className="accountTitleContainer">
        <h1 className="accountTitle">Lasts Transactions</h1>
      </div>
      <DataGrid
            rows={rows}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            checkboxSelection
          />
       
     
      </div>
    )
}


