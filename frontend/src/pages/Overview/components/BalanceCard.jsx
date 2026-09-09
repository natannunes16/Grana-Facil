import React from 'react';
import Card from '../../../components/Card/Card';
import { CheckCircle } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import './BalanceCard.css';

const BalanceCard = () => {
  const { formatCurrency, totals } = useFinancial();

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
          <span className="value">{formatCurrency(totals.balance)}</span>
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
            <strong>R$ {formatCurrency(totals.totalOut)} ({progress}%)</strong>
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
