import React from 'react';
import Card from '../../../components/Card/Card';
import { useFinancial } from '../../../context/FinancialContext';
import { ArrowUpRight } from 'lucide-react';

const ChartsArea = () => {
  const { totals, expensesByCategory, formatCurrency } = useFinancial();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', marginBottom: '32px' }}>
      
      {/* Chart 1: Entradas x Saídas */}
      <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Entradas x Saídas</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Comparativo trimestral de fluxo (Julho, Agosto e Setembro)</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', fontWeight: 600 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></span> Entradas</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-secondary)' }}></span> Saídas</span>
          </div>
        </div>

        <div style={{ flex: 1, backgroundColor: '#F9FAFB', borderRadius: '12px', padding: '24px', position: 'relative', minHeight: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around' }}>
          {/* Mock Julho */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '100%' }}>
            <div style={{ width: '40px', height: '50%', backgroundColor: 'var(--color-primary)', borderRadius: '4px 4px 0 0', opacity: 0.8 }}></div>
            <div style={{ width: '40px', height: '30%', backgroundColor: 'var(--color-secondary)', borderRadius: '4px 4px 0 0', opacity: 0.8 }}></div>
          </div>
          
          {/* Mock Agosto */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '100%' }}>
            <div style={{ width: '40px', height: '60%', backgroundColor: 'var(--color-primary)', borderRadius: '4px 4px 0 0', opacity: 0.8 }}></div>
            <div style={{ width: '40px', height: '40%', backgroundColor: 'var(--color-secondary)', borderRadius: '4px 4px 0 0', opacity: 0.8 }}></div>
          </div>

          {/* Setembro (Atual) */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '100%', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '8px', fontWeight: 700 }}>Atual</div>
            <div style={{ position: 'relative', width: '40px', height: '90%', backgroundColor: 'var(--color-primary)', borderRadius: '4px 4px 0 0' }}>
               <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-primary)' }}>R$ 1.440</span>
            </div>
            <div style={{ position: 'relative', width: '40px', height: '45%', backgroundColor: 'var(--color-secondary)', borderRadius: '4px 4px 0 0' }}>
               <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-secondary)' }}>R$ {totals.totalOut.toFixed(0)}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '8px', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
          <span>Jul 2026</span>
          <span>Ago 2026</span>
          <span style={{ color: 'var(--color-text-main)' }}>Set 2026</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', backgroundColor: '#F0F4FF', padding: '16px', borderRadius: '12px', fontSize: '0.75rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
            <ArrowUpRight size={14} color="var(--color-primary)" /> Crescimento de receita: <strong style={{ color: 'var(--color-text-main)' }}>+4,3%</strong> comparado ao mês passado.
          </span>
          <strong style={{ color: 'var(--color-secondary)' }}>Despesas contidas (-8,5%)</strong>
        </div>
      </Card>

      {/* Chart 2: Gastos por Categoria (Donut reutilizado mas dinâmico) */}
      <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Gastos por Categoria</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Distribuição total das saídas do mês</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1 }}>
          <div style={{ width: 140, height: 140, borderRadius: '50%', background: 'conic-gradient(#00C16E 0% 38.5%, #005F73 38.5% 72.9%, #1A202C 72.9% 89.4%, #7EC8E3 89.4% 100%)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 100, height: 100, backgroundColor: 'white', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>TOTAL</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)' }}>R$ {totals.totalOut.toFixed(0)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {expensesByCategory.map((cat, i) => {
              const colors = ['#00C16E', '#005F73', '#1A202C', '#7EC8E3', '#CBD5E1'];
              return (
                <div key={cat.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors[i % colors.length] }}></span>
                    <span style={{ color: 'var(--color-text-main)' }}>{cat.name} <span style={{ color: 'var(--color-text-muted)' }}>{cat.pct.toFixed(1)}%</span></span>
                  </div>
                  <strong style={{ color: 'var(--color-text-main)' }}>R$ {formatCurrency(cat.value)}</strong>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>{expensesByCategory.length} categorias registradas</span>
          <a href="#" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Gerenciar limites →</a>
        </div>
      </Card>
    </div>
  );
};

export default ChartsArea;
