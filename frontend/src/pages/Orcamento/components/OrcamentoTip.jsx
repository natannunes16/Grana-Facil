import React from 'react';
import Card from '../../../components/Card/Card';
import { TrendingUp } from 'lucide-react';
import './OrcamentoTip.css';

const OrcamentoTip = () => {
  return (
    <Card className="gf-orc-tip-card">
      <div className="gf-orc-tip-icon">
        <TrendingUp size={24} color="var(--color-secondary)" />
      </div>
      <div className="gf-orc-tip-content">
        <h3>Previsão Inteligente GranaFácil</h3>
        <p>Se você mantiver essa média diária de R$ 34,64, fechará o mês com R$ 200,80 economizados além da meta estipulada.</p>
      </div>
      <div className="gf-orc-tip-badge">
        +13,9% Economia prevista
      </div>
    </Card>
  );
};

export default OrcamentoTip;
