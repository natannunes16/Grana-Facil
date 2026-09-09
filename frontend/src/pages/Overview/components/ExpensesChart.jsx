import React from 'react';
import Card from '../../../components/Card/Card';
import { PieChart } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import './ExpensesChart.css';

const ExpensesChart = () => {
  const { formatCurrency, expensesByCategory, totals } = useFinancial();

  const expenses = expensesByCategory || [];
  const totalOut = totals?.totalOut || 0;

  // Calculate conic-gradient for the CSS pie chart
  const colors = ['#00C16E', '#005F73', '#1A202C', '#7EC8E3', '#F56565', '#ED8936', '#ECC94B', '#48BB78', '#38B2AC', '#4299E1', '#667EEA', '#9F7AEA', '#ED64A6'];
  
  let currentPercentage = 0;
  const gradientStops = expenses.map((exp, index) => {
    const start = currentPercentage;
    const pct = totalOut > 0 ? (exp.value / totalOut) * 100 : 0;
    currentPercentage += pct;
    const color = colors[index % colors.length];
    return `${color} ${start}% ${currentPercentage}%`;
  });
  
  const conicGradient = gradientStops.length > 0 
    ? `conic-gradient(${gradientStops.join(', ')})`
    : 'conic-gradient(#e2e8f0 0% 100%)';

  return (
    <Card className="gf-expenses-chart-card">
      <div className="gf-ec-header">
        <div className="gf-ec-title">
          <div className="icon-wrap bg-blue-light">
            <PieChart size={18} color="var(--color-secondary)" />
          </div>
          <h3>Onde estou gastando?</h3>
        </div>
        <span className="gf-ec-badge">{expenses.length} Categorias</span>
      </div>

      <div className="gf-ec-chart-container">
        {/* CSS Donut Chart */}
        <div className="gf-donut-chart" style={{ background: conicGradient }}>
          <div className="gf-donut-inner">
            <span className="label">TOTAL GASTO</span>
            <span className="value">R$ {formatCurrency(totalOut)}</span>
            <span className="pct">100% do total</span>
          </div>
        </div>
      </div>

      <div className="gf-ec-legend">
        {expenses.length === 0 && <div className="gf-legend-item"><span className="name">Nenhum gasto registrado</span></div>}
        {expenses.map((exp, index) => {
          const pct = totalOut > 0 ? ((exp.value / totalOut) * 100).toFixed(1) : 0;
          const color = colors[index % colors.length];
          return (
            <div className="gf-legend-item" key={index}>
              <div className="left">
                <span className="dot" style={{ backgroundColor: color }}></span>
                <span className="name">{exp.name}</span>
              </div>
              <div className="right">
                <span className="pct">{pct}%</span>
                <span className="val">R$ {formatCurrency(exp.value)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ExpensesChart;
