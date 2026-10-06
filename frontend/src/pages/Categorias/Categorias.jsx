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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <CategoryFilters />
        <CategoryGrid categories={categories} />
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
