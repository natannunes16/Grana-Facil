import React from 'react';
import Card from '../../../components/Card/Card';
import { CheckCircle } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import { useQuery, gql } from '@apollo/client';
import './BalanceCard.css';

const GET_DASHBOARD_SUMMARY = gql`
  query GetDashboardSummary {
    getDashboardSummary {
      totals {
        availableBudget
        progressPct
      }
    }
  }
`;

const BalanceCard = () => {
  const { formatCurrency } = useFinancial();
  const { data, loading, error } = useQuery(GET_DASHBOARD_SUMMARY);

  if (loading) return <div style={{padding: '24px'}}>Carregando saldo...</div>;
  if (error) return <div style={{padding: '24px'}}>Erro ao carregar saldo.</div>;

  const totals = data?.getDashboardSummary?.totals || { availableBudget: 0, progressPct: 0 };
  const progress = totals.progressPct.toFixed(1);
  return (
    <Card className="gf-balance-card">
      <div className="gf-balance-left">
        <div className="gf-balance-header">
          <span className="label">SALDO DISPONÍVEL</span>
          <span className="dot-label"><span className="dot"></span> Atualizado agora</span>
        </div>
        <div className="gf-balance-amount">
          <span className="currency">R$</span>
          <span className="value">{formatCurrency(totals.availableBudget)}</span>
        </div>
        <p className="gf-balance-desc">
          Você ainda pode gastar este mês mantendo a sua meta orçamentária intacta.
        </p>
      </div>
      
      <div className="gf-balance-right">
        <div className="gf-health-status">
          <span className="label">Saúde Financeira</span>
          <span className="badge"><CheckCircle size={14} /> No Alvo</span>
        </div>
        
        <div className="gf-health-progress-area">
          <div className="gf-hp-header">
            <span>Orçamento comprometido</span>
            <strong>{progress}%</strong>
          </div>
          <div className="gf-hp-bar-bg">
            <div className="gf-hp-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <p className="gf-health-desc">
          Ritmo de consumo perfeitamente seguro até 30 de setembro.
        </p>
      </div>
    </Card>
  );
};

export default BalanceCard;
