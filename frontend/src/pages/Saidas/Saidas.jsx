import React from 'react';
import Header from '../../components/Layout/Header';
import SaidasSummary from './components/SaidasSummary';
import SaidasTable from './components/SaidasTable';
import './Saidas.css';
import { Download, PlusCircle } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Saidas = () => {
  const navigate = useNavigate();
  return (
    <div className="gf-saidas-page">
      <Header 
        breadcrumb="GESTÃO FINANCEIRA"
        title="Saídas" 
        subtitle="Acompanhe todos os gastos, pagamentos e despesas do mês."
        primaryActionLabel="Adicionar saída"
        onPrimaryAction={() => navigate('/nova-movimentacao')}
      />

      <div className="gf-saidas-content">
        <SaidasSummary />
        <SaidasTable />
      </div>
    </div>
  );
};

export default Saidas;
