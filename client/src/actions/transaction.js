import * as api from "../api/index.js";
import {
    FETCH_ALL,
    CREATE,
    UPDATE,
    DELETE_TRANSACTION,
    FETCH_TRANSACTION,
    START_LOADING,
    END_LOADING
  } from "../constants/transactions";
 


  export const getTransactions = () => async (dispatch) => {
    try {
      
      dispatch({ type: START_LOADING });
      
      const { data } = await api.fetchTransactions();
      console.log(data);
    
      dispatch({ type: FETCH_ALL, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const deleteTransaction = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      await api.deleteTransaction(id);
     
      dispatch({ type: DELETE_TRANSACTION, payload: id });
      dispatch({ type: END_LOADING });
     
    } catch (error) {
      console.log(error.message);
    }
  };



  export const createTransaction = (trans) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
     
      const { data } = await api.createTransaction(trans);
     
      dispatch({ type: CREATE, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  };