import React from 'react';
import Header from '../../components/Layout/Header';
import TransactionForm from './components/TransactionForm';

import './NovaMovimentacao.css';

const NovaMovimentacao = () => {
  return (
    <div className="gf-nova-movimentacao-page">
      <Header 
        breadcrumb="FLUXO OPERACIONAL ATIVO • SETEMBRO 2026"
        title="Registro Financeiro Instantâneo" 
        subtitle="Cadastre receitas ou deduza despesas com atualização em tempo real dos pilares de liquidez."
      />

      <div className="gf-nm-content">
        {/* Top Cards seriam adicionados aqui se necessário. Pelo protótipo eles ficam acima, mas a imagem foca no formulário */}
        <div className="gf-nm-grid">
          <div className="gf-nm-main" style={{maxWidth: '800px', margin: '0 auto'}}>
            <TransactionForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaMovimentacao;
