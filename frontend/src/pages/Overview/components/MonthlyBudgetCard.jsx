import React from 'react';
import Card from '../../../components/Card/Card';
import { SlidersHorizontal, CheckCircle } from 'lucide-react';
import './MonthlyBudgetCard.css';

const MonthlyBudgetCard = () => {
  return (
    <Card className="gf-monthly-budget-card">
      <div className="gf-mb-header">
        <div className="gf-mb-title">
          <div className="icon-wrap bg-green-light">
            <SlidersHorizontal size={18} color="var(--color-primary)" />
          </div>
          <div>
            <h3>Orçamento de Setembro</h3>
            <p>Acompanhamento contínuo da cota mensal programada</p>
          </div>
        </div>
        <div className="gf-mb-total">
          <span>Orçamento Total</span>
          <strong>R$ 1.440,00</strong>
        </div>
      </div>

      <div className="gf-mb-progress-container">
        <div className="gf-mb-progress-bg">
          <div className="gf-mb-progress-fill" style={{ width: '50.5%' }}></div>
        </div>
        <div className="gf-mb-progress-labels">
          <span><span className="dot blue"></span> Já utilizado: <strong>R$ 727,53 (50,5%)</strong></span>
          <span><span className="dot green"></span> Disponível: <strong>R$ 712,47 (49,5%)</strong></span>
        </div>
      </div>

      <div className="gf-mb-message">
        <CheckCircle size={18} color="var(--color-primary)" />
        <p>Você ainda pode gastar <strong>R$ 712,47</strong> este mês. Seu ritmo de gastos está sob controle e dentro da faixa ideal planejada para a 1ª quinzena.</p>
      </div>
    </Card>
  );
};

export default MonthlyBudgetCard;
