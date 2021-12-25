import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import Toolbar from './components/topbar/Topbar'
import Sidebar from './components/sidebar/Sidebar'
import './App.css'
import Home from './components/home/Home';
import AccountList from './components/account/accountList/AccountList'
import TransactionsList from "./components/transactions/transactionsList/TransactionsList"
import Account from './components/account/Account'
import NewAccount from './components/account/newAccount/NewAccount'
import NewTransaction from './components/transactions/newTransactions/NewTransaction'
function App() {
  return (
    <Router >
    <Toolbar/>
    <div className="container">
    <Sidebar/>
  
   <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/accounts" exact component={AccountList}/>
      <Route path="/addAccount" exact component={NewAccount}/>
      <Route path="/addTransaction" exact component={NewTransaction}/>
      <Route path="/account/:accountId" exact component={Account}/>
      <Route path="/transactions" exact component={TransactionsList}/>
    </Switch>
  </div>

    </Router>
  );
}

export default App;
