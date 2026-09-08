import React from 'react';
import Card from '../../../components/Card/Card';

const EvolutionChart = () => {
  return (
    <Card style={{ padding: '24px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-text-main)' }}>Evolução dos Gastos no Mês</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-secondary)', backgroundColor: '#E6F0FF', padding: '4px 8px', borderRadius: '12px' }}>Setembro 01 → 30</span>
          </div>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Picos de desembolso identificados nos dias 01, 05, 06 e 07</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.875rem' }}>
          <span style={{ backgroundColor: '#F0F4F8', padding: '8px 16px', borderRadius: '8px', color: 'var(--color-text-muted)' }}>Média Diária: <strong style={{ color: 'var(--color-text-main)' }}>R$ 24,25</strong></span>
          <span style={{ backgroundColor: '#FEE2E2', padding: '8px 16px', borderRadius: '8px', color: 'var(--color-text-muted)' }}>Pico: <strong style={{ color: '#E53E3E' }}>05/Set (R$ 250,00)</strong></span>
        </div>
      </div>

      <div style={{ position: 'relative', height: '160px', width: '100%', padding: '20px 0' }}>
        {/* SVG Line Chart */}
        <svg viewBox="0 0 1000 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <path d="M 0 80 L 150 0 L 300 60 L 450 100 L 600 105 L 750 100 L 900 105 L 1000 105" fill="none" stroke="var(--color-secondary)" strokeWidth="3" />
          
          <circle cx="0" cy="80" r="5" fill="white" stroke="var(--color-secondary)" strokeWidth="2" />
          <circle cx="150" cy="0" r="6" fill="#E53E3E" stroke="white" strokeWidth="2" />
          <circle cx="300" cy="60" r="5" fill="white" stroke="var(--color-primary)" strokeWidth="2" />
          <circle cx="450" cy="100" r="3" fill="var(--color-secondary)" />
          <circle cx="600" cy="105" r="3" fill="var(--color-secondary)" />
          <circle cx="750" cy="100" r="3" fill="var(--color-secondary)" />
          <circle cx="900" cy="105" r="3" fill="var(--color-secondary)" />
          <circle cx="1000" cy="105" r="3" fill="var(--color-secondary)" />
        </svg>

        {/* Labels positioned absolute */}
        <div style={{ position: 'absolute', left: '0', top: '0', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-secondary)' }}>01/Set: R$ 80</div>
        <div style={{ position: 'absolute', left: '15%', top: '-20px', fontSize: '0.65rem', fontWeight: 700, color: '#E53E3E', backgroundColor: '#FEE2E2', padding: '2px 6px', borderRadius: '4px' }}>05/Set: Aluguel R$ 250</div>
        <div style={{ position: 'absolute', left: '30%', top: '30px', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-main)' }}>06/Set: Faculdade R$ 120</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-secondary)' }}>
        <span>01 Set</span>
        <span style={{ color: '#E53E3E' }}>05 Set</span>
        <span>06 Set</span>
        <span style={{ color: 'var(--color-primary)' }}>07 Set</span>
        <span>10 Set</span>
        <span>15 Set</span>
        <span>20 Set</span>
        <span>25 Set</span>
        <span>30 Set</span>
      </div>
    </Card>
  );
};

export default EvolutionChart;
