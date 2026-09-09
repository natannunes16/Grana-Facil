import React, { useState } from 'react';
import Card from '../../../components/Card/Card';
import { ArrowRight, Wallet, ShoppingCart, Home, GraduationCap, Train } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'in') return t.type === 'in';
    if (filter === 'out') return t.type === 'out';
    return true;
  });

  const recentTransactions = [...filteredTransactions].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  
  return (
    <Card className="gf-recent-moves-card">
      <div className="gf-rm-header">
        <div className="gf-rm-title">
          <div className="icon-wrap bg-blue-light">
            <span style={{fontSize:'1.2rem'}}>🧾</span>
          </div>
          <h2>Últimas movimentações</h2>
        </div>
        <button onClick={() => navigate('/relatorios')} className="gf-rm-link" style={{background:'none', border:'none', cursor:'pointer', color:'var(--color-primary)', fontWeight:'600', display:'flex', alignItems:'center', gap:'4px'}}>Ver todas <ArrowRight size={14} /></button>
      </div>

      <div className="gf-rm-filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Todas</button>
        <button className={filter === 'in' ? 'active' : ''} onClick={() => setFilter('in')}>Entradas</button>
        <button className={filter === 'out' ? 'active' : ''} onClick={() => setFilter('out')}>Saídas</button>
      </div>

      <div className="gf-rm-list">
        {recentTransactions.length === 0 && <div style={{textAlign:'center', color:'var(--color-text-muted)'}}>Nenhuma movimentação.</div>}
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
