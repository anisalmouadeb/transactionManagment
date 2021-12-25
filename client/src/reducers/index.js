import { combineReducers } from 'redux';

import accounts from './accounts';
import transactions from './transaction';

export const reducers = combineReducers({ accounts, transactions });