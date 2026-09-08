import React from 'react';
import Card from '../../../components/Card/Card';
import { PieChart } from 'lucide-react';
import './ExpensesChart.css';

const ExpensesChart = () => {
  return (
    <Card className="gf-expenses-chart-card">
      <div className="gf-ec-header">
        <div className="gf-ec-title">
          <div className="icon-wrap bg-blue-light">
            <PieChart size={18} color="var(--color-secondary)" />
          </div>
          <h3>Onde estou gastando?</h3>
        </div>
        <span className="gf-ec-badge">4 Categorias</span>
      </div>

      <div className="gf-ec-chart-container">
        {/* CSS Donut Chart */}
        <div className="gf-donut-chart">
          <div className="gf-donut-inner">
            <span className="label">TOTAL GASTO</span>
            <span className="value">R$ 727,53</span>
            <span className="pct">50,5% do total</span>
          </div>
        </div>
      </div>

      <div className="gf-ec-legend">
        <div className="gf-legend-item">
          <div className="left">
            <span className="dot" style={{ backgroundColor: '#00C16E' }}></span>
            <span className="name">🛒 Mercado</span>
          </div>
          <div className="right">
            <span className="pct">38,5%</span>
            <span className="val">R$ 280,00</span>
          </div>
        </div>
        <div className="gf-legend-item">
          <div className="left">
            <span className="dot" style={{ backgroundColor: '#005F73' }}></span>
            <span className="name">🏠 Aluguel</span>
          </div>
          <div className="right">
            <span className="pct">34,4%</span>
            <span className="val">R$ 250,00</span>
          </div>
        </div>
        <div className="gf-legend-item">
          <div className="left">
            <span className="dot" style={{ backgroundColor: '#1A202C' }}></span>
            <span className="name">🎓 Faculdade</span>
          </div>
          <div className="right">
            <span className="pct">16,5%</span>
            <span className="val">R$ 120,00</span>
          </div>
        </div>
        <div className="gf-legend-item">
          <div className="left">
            <span className="dot" style={{ backgroundColor: '#7EC8E3' }}></span>
            <span className="name">🚗 Transporte</span>
          </div>
          <div className="right">
            <span className="pct">10,6%</span>
            <span className="val">R$ 77,53</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExpensesChart;
