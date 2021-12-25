import {FETCH_ALL, CREATE ,FETCH_TRANSACTION, UPDATE , DELETE_TRANSACTION,START_LOADING,END_LOADING } from '../constants/transactions'
export default (state={transactions:[]}, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state,isLoading: true };
    case END_LOADING:
      return {...state ,isLoading: false };
    case FETCH_ALL:
    return{ 
      ...state ,transactions:action.payload
    }  
    case CREATE:
      
      return { ...state, transactions:[...state,action.payload ]}
     case DELETE_TRANSACTION:
    
      return {...state , transactions:state.transactions.transactions.filter((tran) => tran._id != action.payload)};
           
 
       default:
      return state;
  }
};