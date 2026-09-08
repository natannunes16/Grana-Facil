import React from 'react';
import Card from '../../../components/Card/Card';
import { ArrowUpRight, ArrowDownRight, Wallet, Percent } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';

const RelatoriosIndicators = () => {
  const { totals, formatCurrency } = useFinancial();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
      <Card style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="icon-wrap bg-green-light" style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E6F7F0' }}>
              <ArrowUpRight size={16} color="var(--color-primary)" />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Total de Entradas</span>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', backgroundColor: '#E6F7F0', padding: '4px 8px', borderRadius: '12px' }}>+12% vs ago</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>R$</span>
          <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-1px' }}>{formatCurrency(totals.totalIn)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          <span>Recebido integralmente</span>
          <strong style={{ color: 'var(--color-primary)' }}>100% liquidado</strong>
        </div>
      </Card>

      <Card style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="icon-wrap bg-blue-light" style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E6F0FF' }}>
              <ArrowDownRight size={16} color="var(--color-secondary)" />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Total de Saídas</span>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-secondary)', backgroundColor: '#E6F0FF', padding: '4px 8px', borderRadius: '12px' }}>−8% vs ago</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>R$</span>
          <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-1px' }}>{formatCurrency(totals.totalOut)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          <span>Compromissos essenciais</span>
          <strong style={{ color: 'var(--color-secondary)' }}>{totals.totalIn ? (totals.totalOut / totals.totalIn * 100).toFixed(1) : 0}% do ganho</strong>
        </div>
      </Card>

      <Card style={{ padding: '24px', background: 'linear-gradient(135deg, #1A202C 0%, #0D3B47 100%)', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <Wallet size={16} color="white" />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>Saldo Líquido</span>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', backgroundColor: 'rgba(0, 184, 107, 0.2)', padding: '4px 8px', borderRadius: '12px' }}>Superávit</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>R$</span>
          <span style={{ fontSize: '2rem', fontWeight: 700, color: 'white', letterSpacing: '-1px' }}>{formatCurrency(totals.balance)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
          <span>Livre para reserva</span>
          <strong style={{ color: 'var(--color-primary)' }}>Disponível</strong>
        </div>
      </Card>

      <Card style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F4F8' }}>
              <Percent size={16} color="var(--color-text-main)" />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Taxa de Economia</span>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>Meta: 30%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
          <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-1px' }}>{totals.totalIn ? (totals.balance / totals.totalIn * 100).toFixed(1) : 0}%</span>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>poupados</span>
        </div>
        
        <div style={{ height: '6px', backgroundColor: 'var(--color-bg-input)', borderRadius: '4px', marginBottom: '8px' }}>
          <div style={{ height: '100%', width: `${totals.totalIn ? (totals.balance / totals.totalIn * 100) : 0}%`, backgroundColor: 'var(--color-primary)', borderRadius: '4px' }}></div>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'right' }}>
          R$ {formatCurrency(totals.balance)} retidos
        </div>
      </Card>
    </div>
  );
};

export default RelatoriosIndicators;
