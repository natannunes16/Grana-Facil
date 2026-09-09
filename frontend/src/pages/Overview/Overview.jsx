import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import BalanceCard from './components/BalanceCard';
import FinancialCards from './components/FinancialCards';
import MonthlyBudgetCard from './components/MonthlyBudgetCard';
import RecentMoves from './components/RecentMoves';
import ExpensesChart from './components/ExpensesChart';
import { useAuth } from '../../context/AuthContext';
import './Overview.css';

const Overview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(' ')[0] : 'Usuário';

  return (
    <div className="gf-overview-page">
      <Header 
        title={`Olá, ${firstName} 👋`} 
        subtitle="Visão geral financeira da sua conta pessoal"
        primaryActionLabel="Adicionar orçamento"
        onPrimaryAction={() => navigate('/orcamento')}
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
