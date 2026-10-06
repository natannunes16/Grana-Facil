import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Calendar, AlertCircle, X, Bell, RefreshCw, Activity, ArrowLeft, Download } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';
import './NovoOrcamento.css';

const NovoOrcamento = () => {
  const navigate = useNavigate();
  const { totals, updateBudgetLimit, categories } = useFinancial();
  const [limitStr, setLimitStr] = useState('1.440,00');

  const limitValue = Number(limitStr.replace(/\./g, '').replace(',', '.')) || 0;
  const spent = totals?.totalOut || 0;
  const available = limitValue - spent;
  const pct = limitValue > 0 ? (spent / limitValue) * 100 : 0;
  const daysLeft = 18; // Fake fixed for mockup logic
  const dailyAvg = available / daysLeft;

  const handleSave = async () => {
    if (limitValue <= 0) {
      alert("Valor inválido.");
      return;
    }
    const catName = categories.length > 0 ? categories[0].name : 'Geral';
    const success = await updateBudgetLimit(catName, limitValue);
    if (success) {
      navigate('/orcamento');
    } else {
      alert("Erro ao salvar orçamento. Tente novamente.");
    }
  };

  return (
    <div className="no-page-wrapper">
      <div className="no-container">
        <header className="no-header">
          <div className="no-back-btn" onClick={() => navigate('/orcamento')}>
            <ArrowLeft size={16} /> VOLTAR PARA ORÇAMENTO • PLANEJAMENTO DE TETO
          </div>
          <div className="no-header-main">
            <div>
              <h1 className="no-title">Adicionar Orçamento</h1>
              <p className="no-subtitle">Defina quanto você pretende gastar durante o mês de forma simples e previsível.</p>
            </div>
            <div className="no-header-actions">
              <button className="no-btn-outline"><Download size={16} /> Exportar CSV</button>
              <button className="no-btn-primary">+ Status: Modo Planejamento</button>
            </div>
          </div>
        </header>

        <div className="no-grid">
          <div className="no-left-col">
            <div className="no-card no-main-card">
              <div className="no-main-header">
                <div className="no-icon-title">
                  <div className="no-icon"><Target size={24} /></div>
                  <div>
                    <h2>Configurar Teto Mensal</h2>
                    <p>Parâmetros essenciais do seu controle orçamentário</p>
                  </div>
                </div>
                <div className="no-badge-ativo">Ativo</div>
              </div>
              
              <div className="no-form-row">
                <div className="no-form-labels">
                  <strong>Mês do orçamento</strong>
                  <span>Bloqueado para o ciclo corrente</span>
                </div>
                <div className="no-month-box">
                  <Calendar size={20} color="#6b7280" />
                  <div className="no-month-texts">
                    <strong>Setembro 2026</strong>
                    <span>Ciclo financeiro de 01/09 a 30/09</span>
                  </div>
                  <div className="no-badge-corrente">Mês corrente</div>
                </div>
              </div>

              <div className="no-teto-box">
                <div className="no-teto-header">
                  <strong>Quanto você deseja gastar este mês?</strong>
                  <div className="no-badge-teto">Teto Máximo</div>
                </div>
                <div className="no-input-row">
                  <span className="no-currency">R$</span>
                  <input 
                    type="text" 
                    className="no-input" 
                    value={limitStr}
                    onChange={(e) => setLimitStr(e.target.value)}
                  />
                  <button className="no-clear" onClick={() => setLimitStr('')}><X size={20} /></button>
                </div>
                <div className="no-alert-text">
                  <AlertCircle size={14} /> Esse será o valor máximo planejado para seus gastos durante o mês. Vamos alertar você quando atingir <strong>80%</strong> e <strong>100%</strong> desse limite.
                </div>
              </div>

              <div className="no-suggestions">
                <label>SUGESTÕES RÁPIDAS DE TETO FINANCEIRO</label>
                <div className="no-sugg-row">
                  <button onClick={() => setLimitStr('1.350,00')}>Mês anterior: R$ 1.350,00</button>
                  <button className="active" onClick={() => setLimitStr('1.440,00')}>% Regra 50% renda: R$ 1.440,00</button>
                  <button onClick={() => setLimitStr('1.200,00')}>Econômico: R$ 1.200,00</button>
                  <button onClick={() => setLimitStr('1.800,00')}>Flexível: R$ 1.800,00</button>
                </div>
              </div>

              <div className="no-actions">
                <button className="no-btn-cancel" onClick={() => navigate('/orcamento')}>Cancelar</button>
                <button className="no-btn-save" onClick={handleSave}>Salvar Orçamento</button>
              </div>
            </div>
            
            <div className="no-features">
              <div className="no-feat-card">
                <Bell size={24} className="no-feat-icon" />
                <div><strong>Alertas Automáticos</strong><span>Ativados no app</span></div>
              </div>
              <div className="no-feat-card">
                <RefreshCw size={24} className="no-feat-icon" />
                <div><strong>Ajuste Flexível</strong><span>Modifique a qualquer hora</span></div>
              </div>
              <div className="no-feat-card">
                <Activity size={24} className="no-feat-icon" />
                <div><strong>Sincronização</strong><span>Tempo real 24/7</span></div>
              </div>
            </div>
          </div>
          
          <div className="no-right-col">
            <div className="no-card no-sidebar-card">
              <div className="no-side-header">
                <Activity size={20} color="var(--color-primary)" /> 
                <h2>Prévia do seu Orçamento</h2> 
                <div className="no-badge-sim">Simulação</div>
              </div>
              
              <div className="no-hero-box">
                <span className="no-hero-label">NOVO LIMITE MENSAL</span>
                <div className="no-hero-value">
                  <span className="no-currency-small">R$</span> {limitStr || '0,00'}
                </div>
                <span className="no-hero-desc">Teto programado para Setembro de 2026</span>
              </div>

              <div className="no-stats">
                <div className="no-stat-row">
                  <span>Comprometimento Atual</span>
                  <span className="no-blue">{pct.toFixed(1)}% consumido</span>
                </div>
                <div className="no-progress-bg">
                  <div className="no-progress-fill" style={{ width: `${Math.min(pct, 100)}%` }}></div>
                </div>
                <div className="no-stat-split">
                  <div>
                    <span>Gasto consolidado atual:</span>
                    <strong>R$ {spent.toFixed(2).replace('.', ',')}</strong>
                    <small>Transações computadas</small>
                  </div>
                  <div className="text-right">
                    <span>Disponível estimado:</span>
                    <strong className="no-green">R$ {available.toFixed(2).replace('.', ',')}</strong>
                    <small>{(100 - Math.min(pct, 100)).toFixed(1)}% livre</small>
                  </div>
                </div>
              </div>

              <div className="no-margin-box">
                <div className="no-circle-graph"></div>
                <div className="no-margin-texts">
                  <strong>Margem de Manobra</strong>
                  <span>Ritmo seguro para os próximos {daysLeft} dias do mês</span>
                </div>
                <div className="no-margin-daily text-right">
                  <span>MÉDIA DIÁRIA</span>
                  <strong className="no-blue">R$ {dailyAvg.toFixed(2).replace('.', ',')} /dia</strong>
                </div>
              </div>

              <div className="no-tip-box">
                <Activity size={20} color="var(--color-primary)" />
                <div>
                  <strong>Dica Inteligente GranaFácil</strong>
                  <p>Definir um teto mensal mantém suas metas financeiras no piloto automático e evita surpresas no fim do mês. Recomendamos manter a margem livre acima de 20%.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovoOrcamento;
