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
        <div className="gf-cat-tab active" style={{cursor: 'default'}}>
          Todas as categorias <span className="count">{categories.length}</span>
        </div>
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
