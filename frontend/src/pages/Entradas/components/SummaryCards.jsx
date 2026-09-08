import React from 'react';
import Card from '../../../components/Card/Card';
import { ArrowDownCircle, TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import './SummaryCards.css';

const SummaryCards = () => {
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
            <div className="gf-summary-badge green"><CheckCircle size={12}/> 1 entrada registrada</div>
          </div>
          <div className="gf-summary-tag">Set 2026</div>
        </div>
        <div className="gf-summary-amount">
          <span className="currency">R$</span>
          <span className="value">1.440,00</span>
        </div>
        <div className="gf-summary-footer">
          <TrendingUp size={16} className="trend-icon" />
          <span>Meta mensal: R$ 3.000,00</span>
          <span className="percent">48% atingido</span>
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
          <span className="value">1.440,00</span>
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
