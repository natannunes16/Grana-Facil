import React from 'react';
import Card from '../../../components/Card/Card';
import { ShoppingCart, TrendingUp, Calendar } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';

const SaidasSummary = () => {
  const { totals, formatCurrency, expensesByCategory } = useFinancial();
  const biggestExpense = expensesByCategory.length > 0 ? expensesByCategory[0] : null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
      <Card style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-main)' }}>TOTAL GASTO NO MÊS</span>
          <div className="icon-wrap bg-blue-light" style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E6F0FF' }}>
            <TrendingUp size={16} color="var(--color-secondary)" />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-secondary)' }}>R$</span>
          <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-1px' }}>{formatCurrency(totals.totalOut)}</span>
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          <span style={{ backgroundColor: '#E6F0FF', color: 'var(--color-secondary)', padding: '4px 8px', borderRadius: '12px', fontWeight: 700, marginRight: '8px' }}>despesas pagas</span> em Setembro
        </div>
      </Card>

      <Card style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-main)' }}>MAIOR GASTO DO MÊS</span>
          <div className="icon-wrap bg-green-light" style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E6F7F0' }}>
            <ShoppingCart size={16} color="var(--color-primary)" />
          </div>
        </div>
        {biggestExpense ? (
          <>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>{biggestExpense.name}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Total: <strong style={{ color: 'var(--color-text-main)', fontSize: '1.1rem' }}>R$ {formatCurrency(biggestExpense.value)}</strong>
            </div>
            <div style={{ height: '6px', backgroundColor: 'var(--color-bg-input)', borderRadius: '4px', marginBottom: '8px' }}>
              <div style={{ height: '100%', width: `${biggestExpense.pct}%`, backgroundColor: 'var(--color-secondary)', borderRadius: '4px' }}></div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Representa {biggestExpense.pct.toFixed(1)}% do total das despesas</div>
          </>
        ) : (
          <div>Nenhum gasto registrado</div>
        )}
      </Card>

      <Card style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-main)' }}>MÉDIA DIÁRIA</span>
          <div className="icon-wrap" style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F4F8' }}>
            <Calendar size={16} color="var(--color-text-muted)" />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-secondary)' }}>R$</span>
          <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-1px' }}>{formatCurrency(totals.totalOut / 7)}</span>
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          <span style={{ backgroundColor: '#E6F7F0', color: 'var(--color-primary)', padding: '4px 8px', borderRadius: '12px', fontWeight: 700, marginRight: '8px' }}>7 dias ativos</span> ritmo sob controle
        </div>
      </Card>
    </div>
  );
};

export default SaidasSummary;
