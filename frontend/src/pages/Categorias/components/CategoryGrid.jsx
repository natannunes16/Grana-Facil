import React from 'react';
import Card from '../../../components/Card/Card';
import { Edit2, Trash2, Hourglass } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import './CategoryGrid.css';

const CategoryGrid = ({ categories }) => {
  const { deleteCategory } = useFinancial();

  const handleDelete = (name) => {
    if (window.confirm(`Deseja realmente excluir a categoria ${name}?`)) {
      deleteCategory(name);
    }
  };

  return (
    <div className="gf-cat-grid">
      {categories.map((cat, index) => (
        <Card key={index} className="gf-cat-item-card">
          <div className="gf-cat-item-header">
            <div className={`gf-cat-item-icon bg-${cat.type === 'Despesa' ? 'blue' : 'green'}`}>
              <span className="emoji-icon">{cat.icon}</span>
            </div>
            <div className="gf-cat-item-actions">
              <button className="icon-btn"><Edit2 size={16} /></button>
              <button className="icon-btn" onClick={() => handleDelete(cat.name)}><Trash2 size={16} /></button>
            </div>
          </div>
          
          <div className="gf-cat-item-title">
            <h3>{cat.name}</h3>
            <span className={`gf-cat-type-badge ${cat.type === 'Despesa' ? 'blue' : 'green'}`}>
              {cat.type}
            </span>
          </div>

          <div className="gf-cat-item-moves">
            <Hourglass size={14} color="var(--color-text-muted)" />
            <span>{cat.moves} {cat.moves === 1 ? 'movimentação' : 'movimentações'}</span>
          </div>

          <div className="gf-cat-item-footer">
            <span className="label">Total {cat.type === 'Despesa' ? 'consumido' : 'recebido'}</span>
            <span className={`value ${cat.type === 'Receita' ? 'green' : ''}`}>
              {cat.value}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CategoryGrid;
