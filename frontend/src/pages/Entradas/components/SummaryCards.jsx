import React from 'react';
import Card from '../../../components/Card/Card';
import { ArrowDownCircle, TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import './SummaryCards.css';

const SummaryCards = () => {
  const { transactions, formatCurrency, totals } = useFinancial();
  const inTransactions = transactions.filter(t => t.type === 'in');
  const count = inTransactions.length;
  const totalIn = totals?.totalIn || 0;
  
  const media = count > 0 ? totalIn / count : 0;
  
  // Fake goal for now since we don't have revenue goals in DB yet
  const meta = 3000;
  const pctMeta = meta > 0 ? (totalIn / meta) * 100 : 0;

  return (
    <div className="gf-summary-cards">
      {/* Card 1: Total Entradas */}
      <Card className="gf-summary-card">
        <div className="gf-summary-header">
          <div className="gf-summary-icon-wrap bg-green">
            <ArrowDownCircle size={20} color="var(--color-primary)" />
          </div>
          <div className="gf-summary-title">
            <span>TOTAL ENTRADAS NO MÊS</span>
            <div className="gf-summary-badge green"><CheckCircle size={12}/> {count} entrada{count !== 1 ? 's' : ''} registrada{count !== 1 ? 's' : ''}</div>
          </div>
          <div className="gf-summary-tag">Set 2026</div>
        </div>
        <div className="gf-summary-amount">
          <span className="currency">R$</span>
          <span className="value">{formatCurrency(totalIn)}</span>
        </div>
        <div className="gf-summary-footer">
          <TrendingUp size={16} className="trend-icon" />
          <span>Meta mensal: R$ {formatCurrency(meta)}</span>
          <span className="percent">{pctMeta.toFixed(0)}% atingido</span>
        </div>
      </Card>

      {/* Card 2: Média por recebimento */}
      <Card className="gf-summary-card">
        <div className="gf-summary-header">
          <div className="gf-summary-icon-wrap bg-blue">
            <TrendingUp size={20} color="var(--color-secondary)" />
          </div>
          <div className="gf-summary-title">
            <span>MÉDIA POR RECEBIMENTO</span>
            <span className="subtitle">Ciclo mensal atual</span>
          </div>
        </div>
        <div className="gf-summary-amount">
          <span className="currency blue">R$</span>
          <span className="value">{formatCurrency(media)}</span>
        </div>
        <div className="gf-summary-progress-bar">
          <div className="progress blue" style={{ width: '100%' }}></div>
        </div>
      </Card>

      {/* Card 3: Previsto pendente */}
      <Card className="gf-summary-card">
        <div className="gf-summary-header">
          <div className="gf-summary-icon-wrap bg-gray">
            <Calendar size={20} color="var(--color-text-main)" />
          </div>
          <div className="gf-summary-title">
            <span>PREVISTO PENDENTE</span>
            <span className="subtitle success">Tudo recebido</span>
          </div>
        </div>
        <div className="gf-summary-amount">
          <span className="currency">R$</span>
          <span className="value">0,00</span>
        </div>
        <div className="gf-summary-footer">
          <span className="dot success"></span>
          <span>Status em dia para o mês</span>
        </div>
      </Card>
    </div>
  );
};

export default SummaryCards;
