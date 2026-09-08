import React from 'react';
import { AlignLeft } from 'lucide-react';
import './CategoryFilters.css';

import { useFinancial } from '../../../context/FinancialContext';

const CategoryFilters = ({ currentTab, onTabChange }) => {
  const { categories } = useFinancial();
  const despesasCount = categories.filter(c => c.type === 'Despesa').length;
  const receitasCount = categories.filter(c => c.type === 'Receita').length;

  return (
    <div className="gf-cat-filters-bar">
      <div className="gf-cat-tabs">
        <button 
          className={`gf-cat-tab ${currentTab === 'all' ? 'active' : ''}`}
          onClick={() => onTabChange('all')}
        >
          Todas as categorias <span className="count">{categories.length}</span>
        </button>
        <button 
          className={`gf-cat-tab ${currentTab === 'despesas' ? 'active' : ''}`}
          onClick={() => onTabChange('despesas')}
        >
          Despesas (Saídas) <span className="count">{despesasCount}</span>
        </button>
        <button 
          className={`gf-cat-tab ${currentTab === 'receitas' ? 'active' : ''}`}
          onClick={() => onTabChange('receitas')}
        >
          Receitas (Entradas) <span className="count">{receitasCount}</span>
        </button>
      </div>

      <div className="gf-cat-order">
        <AlignLeft size={18} />
        <span>Ordenar:</span>
        <strong>Mais movimentadas</strong>
      </div>
    </div>
  );
};

export default CategoryFilters;
