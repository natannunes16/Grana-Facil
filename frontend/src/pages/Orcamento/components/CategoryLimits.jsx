import React from 'react';
import Card from '../../../components/Card/Card';
import { Edit2, ShoppingCart, Home, GraduationCap, Train } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import './CategoryLimits.css';



const CategoryLimits = () => {
  const { expensesByCategory, formatCurrency, categories } = useFinancial();

  const limitsData = expensesByCategory.map((expense, idx) => {
    const categoryInfo = categories.find(c => c.name === expense.name);
    const limit = expense.limit || 0;
    const spent = expense.value || 0;
    const available = limit > 0 ? limit - spent : 0;
    const pct = limit > 0 ? (spent / limit) * 100 : 0;

    let status = 'Dentro da meta';
    let statusType = 'success';
    if (pct > 80) {
      status = 'Atenção (quase no teto)';
      statusType = 'warning';
    }
    if (pct >= 100) {
      status = 'Estourou limite';
      statusType = 'danger';
    }

    const displayIcon = categoryInfo?.icon || '💰';

    return {
      id: idx,
      name: expense.name,
      desc: categoryInfo ? categoryInfo.type : 'Despesa',
      icon: displayIcon,
      limit: formatCurrency(limit),
      spent: formatCurrency(spent),
      available: formatCurrency(available),
      pct: pct.toFixed(1),
      status,
      statusType
    };
  });

  return (
    <div className="gf-category-limits">
      <div className="gf-limits-header">
        <div className="gf-limits-title">
          <h2>Limites por Categoria</h2>
          <span className="badge">{limitsData.length} Categorias</span>
        </div>
        <div className="gf-limits-filters">
          <button className="active">Todos</button>
          <button>No Alvo</button>
          <button>Atenção</button>
        </div>
      </div>

      <div className="gf-limits-grid">
        {limitsData.map(item => (
          <Card key={item.id} className="gf-limit-card">
            <div className="gf-limit-card-header">
              <div className="title-area">
                <div className={`icon-wrap ${item.statusType === 'warning' ? 'bg-blue' : 'bg-green'}`} style={{fontSize: '20px'}}>
                  {item.icon}
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <span className="desc">{item.desc}</span>
                </div>
              </div>
              <span className={`status-badge ${item.statusType}`}>
                <span className="dot"></span> {item.status}
              </span>
            </div>

            <div className="gf-limit-metrics">
              <div className="metric-col">
                <span className="label">Limite</span>
                <span className="val">R$ {item.limit}</span>
              </div>
              <div className="metric-col">
                <span className="label">Gasto</span>
                <span className="val blue">R$ {item.spent}</span>
              </div>
              <div className="metric-col">
                <span className="label">Disponível</span>
                <span className="val green">R$ {item.available}</span>
              </div>
            </div>

            <div className="gf-limit-progress-area">
              <div className="progress-labels">
                <span className="label">Consumo do teto</span>
                <strong className={item.statusType === 'warning' ? 'blue' : ''}>{item.pct}%</strong>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className={`progress-fill ${item.statusType === 'warning' ? 'blue' : 'green'}`} 
                  style={{ width: `${item.pct}%` }}
                ></div>
              </div>
            </div>

            <div className="gf-limit-footer">
              <span className="footer-msg">
                {item.statusType === 'warning' ? 'Teto quase atingido' : `Resta ${100 - item.pct}% do orçamento livre`}
              </span>
              <button className="edit-btn">
                Ajustar limite <Edit2 size={14} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryLimits;
