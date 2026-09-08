import React from 'react';
import Card from '../../../components/Card/Card';
import { Folder, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import './CategorySummary.css';

import { useFinancial } from '../../../context/FinancialContext';

const CategorySummary = () => {
  const { categories, totals, formatCurrency } = useFinancial();
  const despesasCount = categories.filter(c => c.type === 'Despesa').length;
  const receitasCount = categories.filter(c => c.type === 'Receita').length;

  return (
    <div className="gf-cat-summary-area">
      <Card className="gf-cat-summary-card">
        <div className="gf-cat-icon-wrapper folder">
          <Folder size={20} color="var(--color-primary)" />
        </div>
        <div className="gf-cat-info">
          <span className="gf-cat-label">TOTAL ATIVO</span>
          <div className="gf-cat-value-row">
            <strong>{categories.length} Categorias</strong>
            <span className="gf-cat-badge">100% no alvo</span>
          </div>
        </div>
      </Card>

      <Card className="gf-cat-summary-card">
        <div className="gf-cat-icon-wrapper red">
          <ArrowUpCircle size={20} color="var(--color-danger)" />
        </div>
        <div className="gf-cat-info">
          <span className="gf-cat-label">DESPESAS ALOCADAS</span>
          <div className="gf-cat-value-row">
            <strong>R$ {formatCurrency(totals.totalOut)}</strong>
            <span className="gf-cat-desc">{despesasCount} grupos</span>
          </div>
        </div>
      </Card>

      <Card className="gf-cat-summary-card">
        <div className="gf-cat-icon-wrapper green">
          <ArrowDownCircle size={20} color="var(--color-primary)" />
        </div>
        <div className="gf-cat-info">
          <span className="gf-cat-label">RECEITAS PLANEJADAS</span>
          <div className="gf-cat-value-row">
            <strong>R$ {formatCurrency(totals.totalIn)}</strong>
            <span className="gf-cat-desc green">{receitasCount} grupos</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CategorySummary;
