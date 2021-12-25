import {FETCH_ALL, FETCH_TRANS_ACCOUNT,FETCH_ALL_TRANSACTIONS,CREATE ,FETCH_ACCOUNT, UPDATE , DELETE,START_LOADING,END_LOADING } from '../constants/accounts'

let initialState = {
  transaacounts : [],
  accounts :[],
  isLoading : true,
  account:{},
 }
export default (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,accounts: action.payload.accounts};
        case FETCH_TRANS_ACCOUNT:
          return {
            ...state,transaacounts: action.payload};
        case CREATE:
          return { ...state, accounts:[...state,action.payload ]};
       case DELETE:
            return {...state , accounts:state.accounts.filter((account) => account._id !== action.payload)};
       case FETCH_ACCOUNT:
         return{...state,account : action.payload};
         case UPDATE:
          return {...state, accounts:state.accounts.map((acc) => acc._id === action.payload._id ? action.payload : acc)};
       default:
      return state;
  }
};