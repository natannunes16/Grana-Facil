import React from 'react';
import Header from '../../components/Layout/Header';
import OrcamentoSummary from './components/OrcamentoSummary';
import CategoryLimits from './components/CategoryLimits';
import OrcamentoTip from './components/OrcamentoTip';
import './Orcamento.css';

const Orcamento = () => {
  return (
    <div className="gf-orcamento-page">
      <Header 
        breadcrumb="GESTÃO FINANCEIRA • PLANEJAMENTO ATIVO"
        title="Orçamento Mensal" 
        subtitle="Planejamento e limites de gastos para Setembro 2026"
      />

      <div className="gf-orcamento-content">
        <OrcamentoSummary />
        <CategoryLimits />
        <OrcamentoTip />
      </div>
    </div>
  );
};

export default Orcamento;
