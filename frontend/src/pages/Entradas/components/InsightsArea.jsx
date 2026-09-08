import React from 'react';
import Card from '../../../components/Card/Card';
import { PiggyBank, ArrowRight } from 'lucide-react';
import './InsightsArea.css';

const InsightsArea = () => {
  return (
    <div className="gf-insights-area">
      {/* Dica Inteligente */}
      <Card className="gf-insight-card highlight">
        <div className="gf-insight-icon-box">
          <PiggyBank size={32} color="white" />
        </div>
        <div className="gf-insight-content">
          <span className="gf-insight-tag">DICA INTELIGENTE GRANAFÁCIL</span>
          <h3>Regra 50–30–20 aplicada ao seu salário</h3>
          <p>
            Com sua entrada de <strong>R$ 1.440,00</strong>, recomendamos reservar <strong>R$ 720,00</strong> para gastos essenciais, <strong>R$ 432,00</strong> para estilo de vida e <strong>R$ 288,00</strong> diretamente para sua reserva de emergência.
          </p>
        </div>
      </Card>

      {/* Origem das Receitas */}
      <Card className="gf-insight-card">
        <div className="gf-origins-header">
          <h3>Origem das Receitas</h3>
          <span className="origins-highlight">100% Salário</span>
        </div>
        
        <div className="gf-origin-item">
          <div className="origin-item-header">
            <span>Salário CLT</span>
            <strong>R$ 1.440,00</strong>
          </div>
          <div className="origin-progress-bar">
            <div className="progress green" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="gf-origin-item">
          <div className="origin-item-header">
            <span className="muted">Freelance / Extras</span>
            <strong className="muted">R$ 0,00</strong>
          </div>
          <div className="origin-progress-bar">
            <div className="progress" style={{ width: '0%' }}></div>
          </div>
        </div>

        <a href="#" className="gf-origins-link">
          Diversificar fontes de renda <ArrowRight size={16} />
        </a>
      </Card>
    </div>
  );
};

export default InsightsArea;
