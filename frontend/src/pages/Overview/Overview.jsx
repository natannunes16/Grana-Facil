import React from 'react';
import Header from '../../components/Layout/Header';
import BalanceCard from './components/BalanceCard';
import FinancialCards from './components/FinancialCards';
import MonthlyBudgetCard from './components/MonthlyBudgetCard';
import RecentMoves from './components/RecentMoves';
import ExpensesChart from './components/ExpensesChart';
import './Overview.css';

const Overview = () => {
  return (
    <div className="gf-overview-page">
      <Header 
        title="Olá, Natan 👋" 
        subtitle="Visão geral financeira da sua conta pessoal"
      />

      <div className="gf-overview-content">
        <BalanceCard />
        <FinancialCards />
        <MonthlyBudgetCard />

        <div className="gf-overview-grid-bottom">
          <RecentMoves />
          <ExpensesChart />
        </div>
      </div>
    </div>
  );
};

export default Overview;
