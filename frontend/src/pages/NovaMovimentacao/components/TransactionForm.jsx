import React, { useState } from 'react';
import Card from '../../../components/Card/Card';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { PlusCircle, ArrowDownCircle, ArrowUpCircle, Calendar, Hash, RefreshCcw, Briefcase, ShoppingCart, Home } from 'lucide-react';
import { useFinancial } from '../../../context/FinancialContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './TransactionForm.css';

const TransactionForm = () => {
  const { addTransaction, categories, transactions } = useFinancial();
  const navigate = useNavigate();
  const location = useLocation();

  const [type, setType] = useState(location.state?.defaultType === 'out' ? 'saida' : 'entrada'); // 'entrada' ou 'saida'
  const [val, setVal] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [cat, setCat] = useState('');
  const [method, setMethod] = useState('');

  const recentHistory = [...transactions].reverse().slice(0, 3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!val || Number(val) <= 0) {
      alert("Valor inválido");
      return;
    }
    if (!desc || !date || !cat) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    addTransaction({
      name: desc,
      date,
      cat,
      val: Number(val),
      type: type === 'entrada' ? 'in' : 'out',
      method: method || 'Outros'
    });

    navigate(type === 'entrada' ? '/entradas' : '/saidas');
  };

  return (
    <div className="gf-transaction-form-area">
      <Card className="gf-transaction-card">
        <div className="gf-tf-header">
          <div className="gf-tf-title-box">
            <div className="gf-tf-icon"><PlusCircle size={24} color="var(--color-primary)" /></div>
            <div>
              <div className="gf-tf-title-row">
                <h2>Nova movimentação</h2>
                {type === 'entrada' ? (
                  <span className="gf-tag bg-green">Receita (+)</span>
                ) : (
                  <span className="gf-tag bg-red">Despesa (-)</span>
                )}
              </div>
              <p>Lançamento direto na carteira do mês corrente</p>
            </div>
          </div>
          <button className="gf-close-btn">✕</button>
        </div>

        <div className="gf-tf-tabs">
          <button 
            className={`gf-tf-tab ${type === 'entrada' ? 'active green' : ''}`}
            onClick={() => setType('entrada')}
          >
            <ArrowDownCircle size={18} /> Entrada
          </button>
          <button 
            className={`gf-tf-tab ${type === 'saida' ? 'active red' : ''}`}
            onClick={() => setType('saida')}
          >
            <ArrowUpCircle size={18} /> Saída
          </button>
        </div>

        {type === 'entrada' && (
          <div className="gf-tf-alert">
            <div className="icon">💰</div>
            <div className="text">
              <strong>Entrada selecionada</strong>
              <p>O valor será creditado como receita líquida (+) e expandirá seu saldo disponível.</p>
            </div>
          </div>
        )}

        <form className="gf-tf-form" onSubmit={handleSubmit}>
          <div className="gf-tf-field value-field">
            <label>VALOR DA MOVIMENTAÇÃO</label>
            <div className={`value-input-wrap ${type}`}>
              <span className="currency">R$</span>
              <input 
                type="number" 
                step="0.01"
                placeholder="0.00" 
                value={val}
                onChange={(e) => setVal(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="gf-tf-row">
            <Input 
              label="DESCRIÇÃO" 
              placeholder="Projeto Freelance Landing Page" 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
            <Input 
              label="DATA DO LANÇAMENTO" 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="gf-tf-row">
            <div className="gf-input-container">
              <label className="gf-input-label">CATEGORIA</label>
              <div className="gf-input-wrapper" style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                {categories.length === 0 ? (
                  <Button 
                    type="button" 
                    onClick={() => navigate('/categorias')} 
                    style={{backgroundColor: 'var(--color-primary)', color: 'white', padding: '10px'}}
                  >
                    + Criar categoria nova
                  </Button>
                ) : (
                  <>
                    <select className="gf-input" value={cat} onChange={(e) => setCat(e.target.value)} required>
                      <option value="" disabled>Selecione uma categoria</option>
                      {categories.map((c, i) => (
                        <option key={i} value={c.name}>{c.icon} {c.name}</option>
                      ))}
                    </select>
                    <button 
                      type="button" 
                      onClick={() => navigate('/categorias')}
                      style={{background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.85rem', textAlign: 'left', cursor: 'pointer', padding: 0, fontWeight: 600}}
                    >
                      + Criar categoria nova
                    </button>
                  </>
                )}
              </div>
            </div>
            <Input 
              label="MÉTODO / OBSERVAÇÕES" 
              placeholder="Cartão, Pix, Boleto..." 
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            />
          </div>

          <div className="gf-tf-actions">
            <div className="sync-status">
              <RefreshCcw size={14} /> Sincronização imediata no Extrato
            </div>
            <div className="action-buttons">
              <Button variant="outline" type="button" onClick={() => navigate('/overview')}>Cancelar</Button>
              <Button type="submit" className={`save-btn ${type}`}>Salvar movimentação</Button>
            </div>
          </div>
        </form>
      </Card>

      <div className="gf-history-section">
        <div className="gf-history-header">
          <h3><RefreshCcw size={18} /> Histórico recente de lançamentos</h3>
          <span className="last-updated">Atualizado há 4 minutos</span>
        </div>
        
        <div className="gf-history-list">
          {recentHistory.map(item => (
            <Card key={item.id} className="gf-history-item">
              <div className="gf-history-item-left">
                <div className={`icon-box ${item.type === 'in' ? 'entrada' : 'saida'}`}>
                  {item.type === 'in' ? <ArrowDownCircle size={20}/> : <ArrowUpCircle size={20}/>}
                </div>
                <div className="info">
                  <strong>{item.name}</strong>
                  <span>{item.date} • {item.cat}</span>
                </div>
              </div>
              <div className={`gf-history-item-right ${item.type === 'in' ? 'entrada' : 'saida'}`}>
                {item.type === 'in' ? '+' : '−'} R$ {item.val.toFixed(2)}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
