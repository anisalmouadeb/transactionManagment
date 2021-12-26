import React, { useEffect, useState } from "react";
import "./accountFeaturedInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import * as api from "../../../api/index";
export default function FeaturedInfo() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const { accountId } = useParams()
  

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
    if (trans.type === "crediter"&& trans.account===accountId) {
      debitAmountSum = debitAmountSum + Number(trans.montant);
    }
  });
  transactions.map((trans) => {
    if (trans.type === "debiter" && trans.account===accountId) {
      creditAmountSum = creditAmountSum + Number(trans.montant);
    }
  });

  return (
    <div className="accountFeatured">
     
      <div className="accountFeaturedItem">
        <span className="accountFeaturedTitle">Credit Transactions</span>
        <div className="accountFeaturedMoneyContainer">
          <span className="accountFeaturedMoney">${debitAmountSum}</span>
          <span className="accountFeaturedMoneyRate">
            <ArrowUpward className="accountFeaturedIcon" />
          </span>
        </div>
      </div>
      <div className="accountFeaturedItem">
        <span className="accountFeaturedTitle">Debit Transactions</span>
        <div className="accountFeaturedMoneyContainer">
          <span className="accountFeaturedMoney">${creditAmountSum}</span>
          <span className="accountFeaturedMoneyRate">
            <ArrowDownward className="accountFeaturedIcon negative" />
          </span>
        </div>
      </div>
     
     
     
    </div>
  );
}
