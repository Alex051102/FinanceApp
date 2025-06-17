import React, { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ChartConfiguration } from 'chart.js';
import './HalfDonutChart.css'
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

interface Purchase {
  type: string;
  money: number;
}

const HalfDonutChart: React.FC<{ purchases: Purchase[] }> = ({ purchases }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<'doughnut'> | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Обработка данных
    const typeData = purchases.reduce((acc, { type, money }) => {
      acc[type] = (acc[type] || 0) + Math.abs(money);
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(typeData);
    const data = Object.values(typeData);
    const total = data.reduce((sum, val) => sum + val, 0);

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        circumference: 180,
        rotation: -90,
        cutout: '50%',
        plugins: {
          legend: {
            position: 'bottom', // Легенда снизу
            align: 'center',    // Центрирование
            labels: {
              padding: 10,
              usePointStyle: true,
              pointStyle: 'circle',
              boxWidth: 10,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw as number;
                const percent = (value / total * 100).toFixed(1);
                return `${context.label}: ${percent}% (${value.toFixed(2)})`;
              }
            }
          }
        }
      }
    };

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, config);

    return () => {
      chartInstance.current?.destroy();
    };
  }, [purchases]);

  return (
   <div className="chart-wrapper">
    <div className='cirle'>
            <canvas ref={chartRef} />
        </div>
   </div>
        
   
    
  );
};

export default HalfDonutChart;