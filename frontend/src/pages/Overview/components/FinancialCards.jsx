import React from 'react';
import Card from '../../../components/Card/Card';
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import { useQuery, gql } from '@apollo/client';
import './FinancialCards.css';

const GET_DASHBOARD_SUMMARY = gql`
  query GetDashboardSummary {
    getDashboardSummary {
      totals {
        totalIn
        totalOut
        balance
        totalBudget
        availableBudget
        progressPct
      }
    }
  }
`;

const FinancialCards = () => {
  const { formatCurrency } = useFinancial();
  const { data, loading, error } = useQuery(GET_DASHBOARD_SUMMARY);

  if (loading) return <div style={{padding: '24px'}}>Carregando dashboard...</div>;
  if (error) return <div style={{padding: '24px'}}>Erro ao carregar dados.</div>;

  const totals = data?.getDashboardSummary?.totals || { totalIn: 0, totalOut: 0, balance: 0, progressPct: 0 };
  return (
    <div className="gf-fin-cards">
      <Card className="gf-fin-card">
        <div className="gf-fin-header">
          <span className="label">ENTRADAS</span>
          <div className="icon-wrap bg-green-light">
            <ArrowUpRight size={18} color="var(--color-primary)" />
          </div>
        </div>
        <div className="gf-fin-amount">
          <span className="currency">R$</span>
          <span className="value">{formatCurrency(totals.totalIn)}</span>
        </div>
        <div className="gf-fin-footer">
          <span className="badge green">+100%</span> da meta atingida
        </div>
      </Card>

      <Card className="gf-fin-card">
        <div className="gf-fin-header">
          <span className="label">SAÍDAS</span>
          <div className="icon-wrap bg-blue-light">
            <ArrowDownRight size={18} color="var(--color-secondary)" />
          </div>
        </div>
        <div className="gf-fin-amount">
          <span className="currency">R$</span>
          <span className="value">{formatCurrency(totals.totalOut)}</span>
        </div>
        <div className="gf-fin-footer">
          <span className="badge blue">4 transações</span> registradas neste mês
        </div>
      </Card>

      <Card className="gf-fin-card">
        <div className="gf-fin-header">
          <span className="label">DISPONÍVEL</span>
          <div className="icon-wrap bg-green-light">
            <Wallet size={18} color="var(--color-primary)" />
          </div>
        </div>
        <div className="gf-fin-amount">
          <span className="currency">R$</span>
          <span className="value">{formatCurrency(totals.balance)}</span>
        </div>
        <div className="gf-fin-footer">
          <span className="badge green">{totals.totalIn ? (100 - totals.progressPct).toFixed(1) : 0}% livre</span> restante no mês
        </div>
      </Card>
    </div>
  );
};

export default FinancialCards;
