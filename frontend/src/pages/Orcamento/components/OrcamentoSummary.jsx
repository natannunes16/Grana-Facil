import React from 'react';
import Card from '../../../components/Card/Card';
import { Wallet, CheckCircle } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import './OrcamentoSummary.css';

const OrcamentoSummary = () => {
  const { totals, formatCurrency } = useFinancial();
  const progressPct = totals.progressPct.toFixed(1);
  return (
    <Card className="gf-orc-summary-card">
      <div className="gf-orc-summary-header">
        <div className="gf-orc-summary-title">
          <div className="icon"><Wallet size={20} color="var(--color-secondary)" /></div>
          <div>
            <h2>Orçamento de Setembro</h2>
            <p>Visão global e teto de gastos configurado</p>
          </div>
        </div>
        <div className="gf-orc-badge">
          <span className="dot"></span> Período: 21 de 30 dias decorridos
        </div>
      </div>

      <div className="gf-orc-metrics">
        <div className="gf-orc-metric-item">
          <span className="label">Orçamento total planejado</span>
          <div className="value">
            <span className="currency">R$</span>
            <span className="amount">{formatCurrency(totals.totalBudget)}</span>
          </div>
          <span className="desc">Soma de 4 limites fixados</span>
        </div>

        <div className="gf-orc-metric-item highlight">
          <div className="label-row">
            <span className="label">Gasto até agora</span>
            <span className="badge blue">{progressPct}%</span>
          </div>
          <div className="value">
            <span className="currency blue">R$</span>
            <span className="amount">{formatCurrency(totals.totalOut)}</span>
          </div>
          <span className="desc blue">Média de R$ 34,64/dia</span>
        </div>

        <div className="gf-orc-metric-item highlight-green">
          <div className="label-row">
            <span className="label">Saldo Disponível</span>
            <span className="badge green">{totals.totalBudget ? (100 - totals.progressPct).toFixed(1) : 0}% restante</span>
          </div>
          <div className="value">
            <span className="currency green">R$</span>
            <span className="amount">{formatCurrency(totals.availableBudget)}</span>
          </div>
          <span className="desc green"><CheckCircle size={14} /> Ritmo seguro de consumo</span>
        </div>
      </div>

      <div className="gf-orc-progress-section">
        <div className="gf-orc-progress-header">
          <span>Progresso Geral do Teto</span>
          <strong>{progressPct}% utilizado</strong>
        </div>
        <div className="gf-orc-progress-bar">
          <div className="progress blue" style={{ width: `${progressPct}%` }}></div>
        </div>
        <div className="gf-orc-progress-footer">
          <span className="success-text"><CheckCircle size={14} /> Você ainda pode gastar <strong>R$ {formatCurrency(totals.availableBudget)}</strong> este mês sem ultrapassar sua meta.</span>
          <span>Meta final: 30 de Setembro</span>
        </div>
      </div>
    </Card>
  );
};

export default OrcamentoSummary;
