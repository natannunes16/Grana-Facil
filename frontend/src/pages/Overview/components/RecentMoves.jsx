import React from 'react';
import Card from '../../../components/Card/Card';
import { ArrowRight, Wallet, ShoppingCart, Home, GraduationCap, Train } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import './RecentMoves.css';

const ICON_MAP = {
  'Salário': Wallet,
  'Mercado': ShoppingCart,
  'Aluguel': Home,
  'Faculdade': GraduationCap,
  'Transporte': Train
};

const RecentMoves = () => {
  const { transactions, formatCurrency } = useFinancial();
  const recentTransactions = [...transactions].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  return (
    <Card className="gf-recent-moves-card">
      <div className="gf-rm-header">
        <div className="gf-rm-title">
          <div className="icon-wrap bg-blue-light">
            <span style={{fontSize:'1.2rem'}}>🧾</span>
          </div>
          <h2>Últimas movimentações</h2>
        </div>
        <a href="#" className="gf-rm-link">Ver todas <ArrowRight size={14} /></a>
      </div>

      <div className="gf-rm-filters">
        <button className="active">Todas</button>
        <button>Entradas</button>
        <button>Saídas</button>
      </div>

      <div className="gf-rm-list">
        {recentTransactions.map(m => {
          const Icon = ICON_MAP[m.cat] || Wallet;
          return (
            <div key={m.id} className="gf-rm-item">
              <div className="gf-rm-item-left">
                <div className={`gf-rm-icon-box ${m.type}`}>
                  <Icon size={20} />
                </div>
                <div className="gf-rm-info">
                  <strong>{m.name}</strong>
                  <span>{new Date(m.date).toLocaleDateString('pt-BR')} • <span className="cat-pill"><span className="dot"></span> {m.cat}</span></span>
                </div>
              </div>
              <div className="gf-rm-item-right">
                <strong className={m.type}>{m.type === 'in' ? '+' : '−'} R$ {formatCurrency(m.val)}</strong>
                <span>{m.method}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RecentMoves;
