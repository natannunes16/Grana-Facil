import React from 'react';
import Header from '../../components/Layout/Header';
import RelatoriosIndicators from './components/RelatoriosIndicators';
import ChartsArea from './components/ChartsArea';
import EvolutionChart from './components/EvolutionChart';
import ConciliationTable from './components/ConciliationTable';
import './Relatorios.css';
import { FileText, Share2, Grid } from 'lucide-react';

const Relatorios = () => {
  return (
    <div className="gf-relatorios-page">
      <Header 
        breadcrumb="DASHBOARD ANALÍTICO • Auditoria Mensal"
        title="Relatórios Financeiros" 
        subtitle="Análise comparativa e evolução de receitas e despesas"
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '8px 16px', borderRadius: 'var(--radius-pill)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)', boxShadow: 'var(--shadow-sm)' }}>
            📅 Setembro 2026
          </div>
          <button className="gf-button gf-button--outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
            <FileText size={16} color="#E53E3E" /> PDF
          </button>
          <button className="gf-button gf-button--outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
            <Grid size={16} color="var(--color-primary)" /> Excel
          </button>
          <button className="gf-button gf-button--primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
            <Share2 size={16} /> Compartilhar
          </button>
        </div>
      </Header>

      <div className="gf-relatorios-content">
        <RelatoriosIndicators />
        <ChartsArea />
        <EvolutionChart />
        <ConciliationTable />
      </div>
    </div>
  );
};

export default Relatorios;
