import React, { useMemo } from 'react';
import Card from '../../../components/Card/Card';
import { useFinancial } from '../../../context/FinancialContext';

const EvolutionChart = () => {
  const { transactions, formatCurrency } = useFinancial();

  const chartData = useMemo(() => {
    const outTxs = transactions.filter(t => t.type === 'out');
    const daysInMonth = 30; // Considerando Setembro para o mockup
    
    let dailyTotals = Array(daysInMonth).fill(0);
    outTxs.forEach(t => {
      let dayIdx = 0;
      if (t.date.includes('T')) {
        const dayStr = t.date.split('T')[0].split('-')[2];
        dayIdx = parseInt(dayStr, 10) - 1;
      } else {
        const d = new Date(t.date);
        dayIdx = d.getDate() - 1;
      }
      if (dayIdx >= 0 && dayIdx < daysInMonth) {
        dailyTotals[dayIdx] += t.val;
      }
    });

    const maxVal = Math.max(...dailyTotals, 1);
    const avgVal = dailyTotals.reduce((a, b) => a + b, 0) / daysInMonth;
    
    let peakDay = 0;
    let peakVal = 0;
    dailyTotals.forEach((v, i) => {
      if (v > peakVal) {
        peakVal = v;
        peakDay = i;
      }
    });

    return { dailyTotals, maxVal, avgVal, peakDay, peakVal, daysInMonth };
  }, [transactions]);

  const svgWidth = 1000;
  
  const points = chartData.dailyTotals.map((val, i) => {
    const x = (i / (chartData.daysInMonth - 1)) * svgWidth;
    const y = 110 - (val / chartData.maxVal) * 90;
    return { x, y, val, day: i + 1 };
  });

  const pathD = "M " + points.map(p => `${p.x} ${p.y}`).join(" L ");

  return (
    <Card style={{ padding: '24px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-text-main)' }}>Evolução dos Gastos no Mês</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-secondary)', backgroundColor: '#E6F0FF', padding: '4px 8px', borderRadius: '12px' }}>Setembro 01 → 30</span>
          </div>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Mapeamento de desembolso diário</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.875rem' }}>
          <span style={{ backgroundColor: '#F0F4F8', padding: '8px 16px', borderRadius: '8px', color: 'var(--color-text-muted)' }}>Média Diária: <strong style={{ color: 'var(--color-text-main)' }}>R$ {formatCurrency(chartData.avgVal)}</strong></span>
          <span style={{ backgroundColor: '#FEE2E2', padding: '8px 16px', borderRadius: '8px', color: 'var(--color-text-muted)' }}>Pico: <strong style={{ color: '#E53E3E' }}>{String(chartData.peakDay + 1).padStart(2, '0')}/Set (R$ {formatCurrency(chartData.peakVal)})</strong></span>
        </div>
      </div>

      <div style={{ position: 'relative', height: '160px', width: '100%', padding: '20px 0' }}>
        <svg viewBox="0 0 1000 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <path d={pathD} fill="none" stroke="var(--color-secondary)" strokeWidth="3" />
          
          {points.map((p, i) => {
            if (p.val === 0) return <circle key={i} cx={p.x} cy={p.y} r="2" fill="var(--color-secondary)" opacity="0.3" />;
            const isPeak = i === chartData.peakDay;
            return (
              <circle 
                key={i} 
                cx={p.x} 
                cy={p.y} 
                r={isPeak ? "6" : "4"} 
                fill={isPeak ? "#E53E3E" : "white"} 
                stroke={isPeak ? "white" : "var(--color-secondary)"} 
                strokeWidth="2" 
              />
            );
          })}
        </svg>

        {/* Dynamic Labels */}
        {points.filter(p => p.val > 0).map((p, i) => {
          const isPeak = p.day - 1 === chartData.peakDay;
          return (
            <div 
              key={i} 
              style={{ 
                position: 'absolute', 
                left: `calc(${(p.x / svgWidth) * 100}% - 20px)`, 
                top: `${(p.y / 120) * 100 - (isPeak ? 30 : 25)}%`, 
                fontSize: '0.65rem', 
                fontWeight: 700, 
                color: isPeak ? '#E53E3E' : 'var(--color-text-main)',
                backgroundColor: isPeak ? '#FEE2E2' : 'transparent',
                padding: isPeak ? '2px 6px' : '0',
                borderRadius: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              {String(p.day).padStart(2, '0')}/Set: R$ {formatCurrency(p.val)}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
        <span>01 Set</span>
        <span>05 Set</span>
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
