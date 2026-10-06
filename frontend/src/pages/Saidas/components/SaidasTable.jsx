import React, { useState } from 'react';
import Card from '../../../components/Card/Card';
import { Search, Edit2, Trash2, ShoppingCart, Home, GraduationCap, Train } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';

const SaidasTable = () => {
  const { transactions, categories, formatCurrency, deleteTransaction } = useFinancial();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Todas');

  const outTransactions = transactions.filter(t => t.type === 'out');

  const filtered = outTransactions.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.cat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'Todas' || t.cat === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Card style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-bg-page)', padding: '8px 16px', borderRadius: 'var(--radius-pill)', flex: 1 }}>
          <Search size={18} color="var(--color-text-muted)" style={{ marginRight: '8px' }} />
          <input 
            type="text" 
            placeholder="Filtrar por nome, categoria ou paga..." 
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.875rem' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Todas', 'Mercado', 'Aluguel', 'Faculdade', 'Transporte'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? 'var(--color-secondary)' : 'var(--color-bg-page)',
                color: filter === f ? 'white' : 'var(--color-text-muted)',
                border: 'none', padding: '8px 16px', borderRadius: 'var(--radius-pill)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer'
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div style={{ backgroundColor: 'var(--color-bg-page)', padding: '8px 16px', borderRadius: 'var(--radius-pill)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
          📅 Setembro 2026
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border)', fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'left' }}>
            <th style={{ padding: '16px 24px', fontWeight: 700 }}>DESPESA</th>
            <th style={{ padding: '16px 24px', fontWeight: 700 }}>CATEGORIA</th>
            <th style={{ padding: '16px 24px', fontWeight: 700 }}>DATA</th>
            <th style={{ padding: '16px 24px', fontWeight: 700 }}>MÉTODO DE PAGAMENTO</th>
            <th style={{ padding: '16px 24px', fontWeight: 700, textAlign: 'right' }}>VALOR</th>
            <th style={{ padding: '16px 24px', fontWeight: 700, textAlign: 'center' }}>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan="6" style={{textAlign: 'center', padding: '24px'}}>Nenhuma saída encontrada.</td></tr>
          ) : (
            filtered.map(t => {
            const catObj = categories.find(c => c.name === t.cat);
            const displayIcon = catObj?.icon || '🛒';
            
            return (
              <tr key={t.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: '#E6F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                      {displayIcon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-main)' }}>{t.name}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ backgroundColor: '#F0F4F8', color: 'var(--color-text-muted)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{t.cat}</span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  {new Date(t.date).toLocaleDateString('pt-BR')}
                </td>
                <td style={{ padding: '16px 24px', fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
                  {t.method}
                </td>
                <td style={{ padding: '16px 24px', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-secondary)', textAlign: 'right' }}>
                  − R$ {formatCurrency(t.val)}
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', marginRight: '8px' }}>
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => {
                      if(window.confirm("Deseja realmente excluir esta saída?")) {
                        deleteTransaction(t.id);
                      }
                    }} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            );
          })
          )}
        </tbody>
      </table>
      
      <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
        <span>Mostrando {filtered.length} de {outTransactions.length} despesas lançadas</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={() => alert('Exportação em desenvolvimento.')} style={{ background: 'var(--color-bg-page)', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 600 }}>Exportar PDF</button>
          <button onClick={() => alert('Exportação em desenvolvimento.')} style={{ background: 'var(--color-bg-page)', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 600 }}>CSV</button>
        </div>
      </div>
    </Card>
  );
};

export default SaidasTable;
