// Chart configuration and color palettes
export const colorPalettes = {
  primary: [
    '#3B82F6', // blue-500
    '#8B5CF6', // violet-500
    '#06B6D4', // cyan-500
    '#10B981', // emerald-500
    '#F59E0B', // amber-500
    '#EF4444', // red-500
    '#EC4899', // pink-500
    '#8B5A2B', // brown-500
  ],
  gradient: [
    '#667eea',
    '#764ba2',
    '#f093fb',
    '#f5576c',
    '#4facfe',
    '#00f2fe',
    '#43e97b',
    '#38f9d7',
  ],
  vibrant: [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E9',
  ],
  pastel: [
    '#FFB3E6',
    '#B3E5FF',
    '#B3FFB3',
    '#FFFFB3',
    '#FFD9B3',
    '#E6B3FF',
    '#B3FFFF',
    '#FFB3B3',
  ],
  dark: [
    '#1f2937',
    '#374151',
    '#4b5563',
    '#6b7280',
    '#9ca3af',
    '#d1d5db',
    '#e5e7eb',
    '#f3f4f6',
  ],
};

export const chartThemes = {
  light: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    textColor: '#374151',
    gridColor: 'rgba(0, 0, 0, 0.1)',
    axisColor: '#9CA3AF',
  },
  dark: {
    backgroundColor: 'rgba(17, 24, 39, 0.95)',
    textColor: '#F3F4F6',
    gridColor: 'rgba(255, 255, 255, 0.1)',
    axisColor: '#6B7280',
  },
};

export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          weight: '500' as const,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      intersect: false,
      mode: 'index' as const,
    },
  },
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.05)',
        borderDash: [5, 5],
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
    y: {
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.05)',
        borderDash: [5, 5],
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
  },
};
