import axios from 'axios';

const url = 'https://transactionsmanagement.herokuapp.com';

export const fetchAccounts = () => axios.get(`${url}/accounts`);
export const fetchActiveAccounts= () => axios.get(`${url}/accounts/active`);
export const createAccount = (newAccount) => axios.post(`${url}/accounts`,newAccount);
export const deleteAccount = (id) => axios.delete(`${url}/accounts/${id}`);
export const fetchAccount = (id) => axios.get(`${url}/accounts/account/${id}`);
export const updateAccount = (id, account) => axios.patch(`${url}/accounts/${id}`,account);
export const fetchTransactionsByAccount = (id) => axios.get(`${url}/transactions/account/${id}`);
export const fetchTransactions = () => axios.get(`${url}/transactions`);
export const fetchLastTransactions = () => axios.get(`${url}/transactions/lasts`);
export const deleteTransaction = (id) => axios.delete(`${url}/transactions/${id}`);
export const createTransaction = (newTrans) => axios.post(`${url}/transactions`,newTrans);