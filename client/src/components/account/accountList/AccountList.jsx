import React, { useEffect } from 'react';
import "./accountList.css"
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useSelector,useDispatch } from "react-redux";
import {  getAccounts,deleteAccount } from "../../../actions/account";
import { Link } from 'react-router-dom';
import {CircularProgress } from "@material-ui/core";
export default function AccountList() {
  const dispatch = useDispatch();

  useEffect(() => {
  
    dispatch(getAccounts())
  }, []);

  const {accounts,isLoading} = useSelector((state) => state.accounts);
  const d=<p style={{color:'red'}}>Disabled</p>
  const d2=<p style={{color:'green'}}>activated</p>
  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'libelle', headerName: 'Account Name', width: 200 },
    { field: 'createAt', headerName: 'Creation Date', width: 200 },
    { field: 'isActive', headerName: 'Status', width: 130 ,
      renderCell: (params) => {
      return (
       params.row.isActive ? d2:d
      );
      }
  },
    {
      field: 'solde',
      headerName: 'Balance',
      type: 'number',
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/account/" + params.row.id}>
              <button className="accountListEdit">Details</button>
            </Link>
            <DeleteOutline
              className="accountListDelete"
              onClick={() => dispatch(deleteAccount(params.row.id))}
            />
          </>
        );
      },
    },
   
  ];
  let rows
  accounts ?  rows = accounts.map(acc => {
   
    return {
      id: acc._id,
      libelle : acc.libelle,
      createAt: new Date(acc.createdAt).toISOString().substr(0,10),
     isActive:acc.isActive,
    
      solde : acc.solde
    
    };
  }): rows=[]
  
return (
  isLoading? (
    <div className="accountList">
    <CircularProgress />
   </div> 
  ) : (
    <div className="accountList">
        <Link to={"/addAccount"}>
                  <button className="accountListAdd">Add New Account</button>
        </Link>
  <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  ));}