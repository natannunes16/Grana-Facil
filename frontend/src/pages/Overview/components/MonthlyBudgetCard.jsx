import React from 'react';
import Card from '../../../components/Card/Card';
import { SlidersHorizontal, CheckCircle } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import './MonthlyBudgetCard.css';

const MonthlyBudgetCard = () => {
  const { formatCurrency, totals } = useFinancial();
  const t = totals || { totalOut: 0, totalBudget: 0, availableBudget: 0, progressPct: 0 };
  
  const progressPct = t.totalBudget > 0 ? (t.totalOut / t.totalBudget) * 100 : 0;
  const safeProgressPct = progressPct > 100 ? 100 : progressPct;

  return (
    <Card className="gf-monthly-budget-card">
      <div className="gf-mb-header">
        <div className="gf-mb-title">
          <div className="icon-wrap bg-green-light">
            <SlidersHorizontal size={18} color="var(--color-primary)" />
          </div>
          <div>
            <h3>Orçamento de Setembro</h3>
            <p>Acompanhamento contínuo da cota mensal programada</p>
          </div>
        </div>
        <div className="gf-mb-total">
          <span>Orçamento Total</span>
          <strong>R$ {formatCurrency(t.totalBudget)}</strong>
        </div>
      </div>

      <div className="gf-mb-progress-container">
        <div className="gf-mb-progress-bg">
          <div className="gf-mb-progress-fill" style={{ width: `${safeProgressPct}%` }}></div>
        </div>
        <div className="gf-mb-progress-labels">
          <span><span className="dot blue"></span> Já utilizado: <strong>R$ {formatCurrency(t.totalOut)} ({progressPct.toFixed(1)}%)</strong></span>
          <span><span className="dot green"></span> Disponível: <strong>R$ {formatCurrency(t.availableBudget)} ({(100 - safeProgressPct).toFixed(1)}%)</strong></span>
        </div>
      </div>

      <div className="gf-mb-message">
        <CheckCircle size={18} color="var(--color-primary)" />
        <p>Você ainda pode gastar <strong>R$ {formatCurrency(t.availableBudget)}</strong> este mês. {progressPct <= 100 ? 'Seu ritmo de gastos está sob controle.' : 'Atenção, você ultrapassou seu orçamento total.'}</p>
      </div>
    </Card>
  );
};

export default MonthlyBudgetCard;
