import React from 'react';
import Card from '../../../components/Card/Card';
import { useFinancial } from '../../../context/FinancialContext';
import { CheckCircle, Wallet, ShoppingCart, Home, GraduationCap, Train } from 'lucide-react';

const ICON_MAP = {
  'Salário': Wallet,
  'Mercado': ShoppingCart,
  'Aluguel': Home,
  'Faculdade': GraduationCap,
  'Transporte': Train
};

const ConciliationTable = () => {
  const { transactions, totals, formatCurrency } = useFinancial();

  return (
    <Card style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-text-main)' }}>Síntese de Fechamento de Caixa</h3>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Detalhamento consolidado de movimentações e conciliação líquida</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', backgroundColor: '#E6F7F0', padding: '6px 12px', borderRadius: '16px' }}>
          <CheckCircle size={14} /> Caixa Fechado e Conciliado
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border)', fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'left' }}>
            <th style={{ padding: '16px 24px', fontWeight: 700 }}>DESCRIÇÃO / ORIGEM</th>
            <th style={{ padding: '16px 24px', fontWeight: 700 }}>CATEGORIA</th>
            <th style={{ padding: '16px 24px', fontWeight: 700 }}>DATA DE EFETIVAÇÃO</th>
            <th style={{ padding: '16px 24px', fontWeight: 700 }}>TIPO</th>
            <th style={{ padding: '16px 24px', fontWeight: 700, textAlign: 'right' }}>VALOR (R$)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => {
            const Icon = ICON_MAP[t.cat] || Wallet;
            return (
              <tr key={t.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#F0F4F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={16} color="var(--color-secondary)" />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-main)' }}>{t.name}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: '0.75rem' }}>{t.cat}</span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  {new Date(t.date).toLocaleDateString('pt-BR')}
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, color: t.type === 'in' ? 'var(--color-primary)' : 'var(--color-secondary)' }}>
                    {t.type === 'in' ? '↓ Entrada' : '↑ Saída'}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '1.1rem', fontWeight: 700, color: t.type === 'in' ? 'var(--color-primary)' : 'var(--color-text-main)', textAlign: 'right' }}>
                  {t.type === 'in' ? '+' : '−'} {formatCurrency(t.val)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ padding: '24px', backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={24} color="white" />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Resultado Consolidado</h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Balanço do ciclo de Setembro de 2026</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>ENTRADAS</span>
            <strong style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>R$ {formatCurrency(totals.totalIn)}</strong>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>−</span>
          <div style={{ textAlign: 'right' }}>
            <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>SAÍDAS</span>
            <strong style={{ fontSize: '1.25rem', color: 'var(--color-secondary)' }}>R$ {formatCurrency(totals.totalOut)}</strong>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>=</span>
          <div style={{ textAlign: 'right', backgroundColor: 'white', padding: '12px 24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>SALDO DISPONÍVEL</span>
            <strong style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>R$ {formatCurrency(totals.balance)}</strong>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ConciliationTable;
