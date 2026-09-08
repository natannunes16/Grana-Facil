import React from 'react';
import Card from '../../../components/Card/Card';
import { Lightbulb } from 'lucide-react';
import './CategoryModal.css'; // reaproveitando p/ a dica também

export const FinanceTip = () => {
  return (
    <Card className="gf-finance-tip-card">
      <div className="gf-tip-icon">
        <Lightbulb size={24} color="var(--color-primary)" />
      </div>
      <div className="gf-tip-content">
        <h3>Dica financeira GranaFácil</h3>
        <p>Manter categorias com 0 movimentações ativas permite planejar metas antes do fechamento do mês.</p>
      </div>
      <button className="gf-tip-btn">Ver Orçamento Mensal</button>
    </Card>
  );
};
