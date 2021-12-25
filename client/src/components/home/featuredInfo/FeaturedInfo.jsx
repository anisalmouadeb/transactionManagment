import React, { useEffect, useState } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { Link } from "react-router-dom";
import * as api from "../../../api/index";
export default function FeaturedInfo() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  

  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await api.fetchAccounts();
      setAccounts(res.data.accounts);
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await api.fetchTransactions();
      setTransactions(res.data.transactions);
    };
    fetchTransactions();
  }, []);



  var debitAmountSum = 0;
  var creditAmountSum = 0;
  transactions.map((trans) => {
    if (trans.type === "crediter") {
      debitAmountSum = debitAmountSum + Number(trans.montant);
    }
  });
  transactions.map((trans) => {
    if (trans.type === "debiter") {
      creditAmountSum = creditAmountSum + Number(trans.montant);
    }
  });

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Accounts</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{accounts.length}</span>
          <span className="featuredMoneyRate">
            <ArrowUpward className="featuredIcon " />
          </span>
        </div>
        <Link to="/accounts" className="link">
          <span className="featuredSub">See All Accounts</span>
        </Link>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle"> All Credit Transactions</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${debitAmountSum}</span>
          <span className="featuredMoneyRate">
            <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <Link to="/transactions" className="link">
          <span className="featuredSub">See All Transactions</span>
        </Link>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">All Debit Transactions</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${creditAmountSum}</span>
          <span className="featuredMoneyRate">
            <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <Link to="/transactions" className="link">
          <span className="featuredSub">See All Transactions</span>
        </Link>
      </div>
     
     
     
    </div>
  );
}
