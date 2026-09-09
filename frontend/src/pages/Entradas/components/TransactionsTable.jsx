import React from 'react';
import Card from '../../../components/Card/Card';
import { List, Printer, Edit2, Trash2, CheckCircle, Landmark } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import './TransactionsTable.css';

const TransactionsTable = () => {
  const { transactions, formatCurrency, deleteTransaction, editTransaction } = useFinancial();
  const inTransactions = transactions.filter(t => t.type === 'in');

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir esta entrada?")) {
      deleteTransaction(id);
    }
  };

  return (
    <Card className="gf-transactions-card">
      <div className="gf-transactions-header">
        <div className="gf-transactions-title">
          <div className="icon-indicator"></div>
          <h2>Detalhamento das Entradas</h2>
          <span className="badge">{inTransactions.length} itens</span>
        </div>
        <div className="gf-transactions-actions">
          <button className="icon-btn"><List size={20} /></button>
          <button className="icon-btn"><Printer size={20} /></button>
        </div>
      </div>

      <div className="gf-table-container">
        <table className="gf-table">
          <thead>
            <tr>
              <th>DESCRIÇÃO</th>
              <th>CATEGORIA</th>
              <th>DATA</th>
              <th>FORMA / CONTA</th>
              <th>VALOR</th>
              <th>STATUS</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {inTransactions.length === 0 ? (
              <tr><td colSpan="7" style={{textAlign: 'center', padding: '24px'}}>Nenhuma entrada encontrada.</td></tr>
            ) : (
              inTransactions.map(t => (
                <tr key={t.id}>
                  <td>
                    <div className="gf-td-description">
                      <div className="icon-bg">💰</div>
                      <div>
                        <div className="title">{t.name}</div>
                        <div className="subtitle">{t.desc || 'Receita'}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="gf-tag category-tag"><span className="dot"></span>{t.cat}</span>
                  </td>
                  <td>{new Date(t.date).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <div className="gf-td-account">
                      <Landmark size={16} /> {t.method}
                    </div>
                  </td>
                  <td>
                    <span className="gf-td-value success">+ R$ {formatCurrency(t.val)}</span>
                  </td>
                  <td>
                    <span className="gf-tag status-tag success"><CheckCircle size={14}/> Recebido</span>
                  </td>
                  <td>
                    <div className="gf-td-actions">
                      <button className="action-btn" onClick={() => {
                        const newVal = window.prompt("Novo valor para a transação:", t.val);
                        if (newVal !== null && newVal !== "") {
                          editTransaction(t.id, { ...t, val: Number(newVal) });
                        }
                      }}><Edit2 size={16} /></button>
                      <button className="action-btn" onClick={() => handleDelete(t.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="gf-transactions-footer">
        <div className="gf-transactions-footer-left">
          <CheckCircle size={16} color="var(--color-primary)" />
          <span>Mostrando {inTransactions.length} lançamentos</span>
        </div>
        <div className="gf-transactions-footer-right">
          <span>Subtotal de entradas:</span>
          <span className="subtotal-value">
            R$ {formatCurrency(inTransactions.reduce((acc, curr) => acc + curr.val, 0))}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default TransactionsTable;
