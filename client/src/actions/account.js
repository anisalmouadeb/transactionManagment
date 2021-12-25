import * as api from "../api/index.js";
import {
    FETCH_ALL,
    CREATE,
    UPDATE,
    DELETE,
    FETCH_ACCOUNT,
    START_LOADING,FETCH_TRANS_ACCOUNT,
    END_LOADING
  } from "../constants/accounts";

  export const getAccounts = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchAccounts();
     
      dispatch({ type: FETCH_ALL, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const deleteAccount = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      await api.deleteAccount(id);
  
      dispatch({ type: DELETE, payload: id });
      dispatch({ type: END_LOADING });
      
    } catch (error) {
      console.log(error.message);
    }
  };

 
  export const getAccount = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchAccount(id);
  
      dispatch({ type: FETCH_ACCOUNT, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const getTransactionsByAccount = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      console.log('getTransactionsByAccount')
      const { data } = await api.fetchTransactionsByAccount(id);
      console.log('getTransactionsByAccount'+id)
      dispatch({ type: FETCH_TRANS_ACCOUNT, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  };


  export const createAccount = (account) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
     
      const { data } = await api.createAccount(account);
     
      dispatch({ type: CREATE, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  };
  

export const updateAccount = (id, account) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
  
    console.log({account});
    const { data } = await api.updateAccount(id, account);
   
    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};