import React, { useState } from 'react';
import Header from '../../components/Layout/Header';
import CategorySummary from './components/CategorySummary';
import CategoryFilters from './components/CategoryFilters';
import CategoryGrid from './components/CategoryGrid';
import { FinanceTip } from './components/CategoryModal';
import './Categorias.css';

import { useFinancial } from '../../context/FinancialContext';
import NewCategoryModal from './components/NewCategoryModal';

const Categorias = () => {
  const { categories } = useFinancial();
  const [currentTab, setCurrentTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCategories = categories.filter(cat => {
    if (currentTab === 'despesas') return cat.type === 'Despesa';
    if (currentTab === 'receitas') return cat.type === 'Receita';
    return true;
  });

  return (
    <div className="gf-categorias-page">
      <Header 
        breadcrumb={`GESTÃO INTELIGENTE • ${categories.length} Categorias cadastradas`}
        title="Categorias" 
        subtitle="Organize e personalize suas categorias de receitas e despesas para manter o controle absoluto do fluxo financeiro."
        primaryActionLabel="Adicionar categoria"
        onPrimaryAction={() => setIsModalOpen(true)}
      />

      <div className="gf-categorias-content">
        <CategorySummary />
        <CategoryFilters currentTab={currentTab} onTabChange={setCurrentTab} />
        <CategoryGrid categories={filteredCategories} />
        <FinanceTip />
      </div>

      <NewCategoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Categorias;
