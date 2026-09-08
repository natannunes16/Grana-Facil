import React from 'react';
import Header from '../../components/Layout/Header';
import SummaryCards from './components/SummaryCards';
import TransactionsTable from './components/TransactionsTable';
import InsightsArea from './components/InsightsArea';
import { Search, ChevronDown, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Entradas.css';

const Entradas = () => {
  const navigate = useNavigate();
  return (
    <div className="gf-entradas-page">
      <Header 
        breadcrumb="FLUXO DE CAIXA • Receitas Consolidadas"
        title="Entradas" 
        subtitle="Acompanhe todas as receitas e ganhos do mês de Setembro 2026"
        primaryActionLabel="Adicionar entrada"
        onPrimaryAction={() => navigate('/nova-movimentacao')}
      />

      <div className="gf-entradas-content">
        <SummaryCards />

        <div className="gf-filters-bar">
          <div className="gf-filter-left">
            <button className="icon-btn search-filter"><Search size={18} /></button>
            <div className="gf-filter-select">
              <CalendarIcon /> Setembro 2026 <ChevronDown size={16} />
            </div>
            <div className="gf-filter-select">
              <Filter size={16} /> Todas as Categorias <ChevronDown size={16} />
            </div>
          </div>
          
          <div className="gf-filter-tags">
            <button className="gf-filter-tag active">Todos (1)</button>
            <button className="gf-filter-tag">Salário (1)</button>
            <button className="gf-filter-tag">Freelance (0)</button>
            <button className="gf-filter-tag">Rendimentos (0)</button>
          </div>
        </div>

        <TransactionsTable />
        
        <InsightsArea />
      </div>
    </div>
  );
};

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default Entradas;
