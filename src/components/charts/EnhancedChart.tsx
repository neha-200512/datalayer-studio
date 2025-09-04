import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Card } from '@/components/ui/card';

interface ChartData {
  [key: string]: string | number | undefined;
}

interface TooltipEntry {
  name?: string;
  value?: number | string;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
  isDark?: boolean;
}

interface LegendEntry {
  value?: string;
  color?: string;
}

interface CustomLegendProps {
  payload?: LegendEntry[];
  isDark?: boolean;
}

interface EnhancedChartProps {
  type: 'bar' | 'line' | 'area' | 'pie' | 'radar';
  data: ChartData[];
  title?: string;
  subtitle?: string;
  height?: number;
  colors?: string[];
  showAnimation?: boolean;
  showLegend?: boolean;
  className?: string;
}

// Modern color palettes
const chartColorPalettes = {
  primary: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'],
  gradient: ['#4f46e5', '#7c3aed', '#db2777', '#dc2626', '#ea580c', '#d97706'],
  vibrant: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#f97316', '#ef4444'],
  pastel: ['#a78bfa', '#fb7185', '#fbbf24', '#34d399', '#60a5fa', '#f472b6'],
  dark: ['#4338ca', '#7c2d12', '#b91c1c', '#059669', '#0284c7', '#9333ea']
};

// Custom tooltip component
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`
          p-3 rounded-lg border shadow-lg backdrop-blur-sm
          ${isDark 
            ? 'bg-gray-900/90 border-gray-700 text-white' 
            : 'bg-white/90 border-gray-200 text-gray-900'
          }
        `}
      >
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry: TooltipEntry, index: number) => (
          <p key={index} className="text-sm flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </motion.div>
    );
  }
  return null;
};

// Custom legend component
const CustomLegend: React.FC<CustomLegendProps> = ({ payload, isDark }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload?.map((entry: LegendEntry, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2"
        >
          <span 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {entry.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export const EnhancedChart: React.FC<EnhancedChartProps> = ({
  type,
  data,
  title,
  subtitle,
  height = 300,
  colors = chartColorPalettes.primary,
  showAnimation = true,
  showLegend = true,
  className = ''
}) => {
  const isDark = document.documentElement.classList.contains('dark');
  
  const chartProps = {
    data,
    width: '100%',
    height,
  };

  const animationProps = showAnimation ? {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  } : {};

  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const textColor = isDark ? '#d1d5db' : '#6b7280';

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer {...chartProps}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" stroke={textColor} fontSize={12} />
              <YAxis stroke={textColor} fontSize={12} />
              <Tooltip content={<CustomTooltip isDark={isDark} />} />
              {showLegend && <Legend content={<CustomLegend isDark={isDark} />} />}
              {Object.keys(data[0] || {}).filter(key => key !== 'name').map((key, index) => (
                <Bar 
                  key={key}
                  dataKey={key} 
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                  animationDuration={showAnimation ? 800 : 0}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer {...chartProps}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" stroke={textColor} fontSize={12} />
              <YAxis stroke={textColor} fontSize={12} />
              <Tooltip content={<CustomTooltip isDark={isDark} />} />
              {showLegend && <Legend content={<CustomLegend isDark={isDark} />} />}
              {Object.keys(data[0] || {}).filter(key => key !== 'name').map((key, index) => (
                <Line 
                  key={key}
                  type="monotone" 
                  dataKey={key} 
                  stroke={colors[index % colors.length]}
                  strokeWidth={3}
                  dot={{ r: 5, fill: colors[index % colors.length] }}
                  animationDuration={showAnimation ? 1000 : 0}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer {...chartProps}>
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" stroke={textColor} fontSize={12} />
              <YAxis stroke={textColor} fontSize={12} />
              <Tooltip content={<CustomTooltip isDark={isDark} />} />
              {showLegend && <Legend content={<CustomLegend isDark={isDark} />} />}
              {Object.keys(data[0] || {}).filter(key => key !== 'name').map((key, index) => (
                <Area 
                  key={key}
                  type="monotone" 
                  dataKey={key} 
                  stroke={colors[index % colors.length]}
                  fill={`url(#gradient${index})`}
                  fillOpacity={0.6}
                  animationDuration={showAnimation ? 1000 : 0}
                />
              ))}
              <defs>
                {colors.map((color, index) => (
                  <linearGradient key={index} id={`gradient${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                  </linearGradient>
                ))}
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer {...chartProps}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={height * 0.35}
                dataKey="value"
                animationDuration={showAnimation ? 800 : 0}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip isDark={isDark} />} />
              {showLegend && <Legend content={<CustomLegend isDark={isDark} />} />}
            </PieChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer {...chartProps}>
            <RadarChart data={data}>
              <PolarGrid stroke={gridColor} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 12 }} />
              <PolarRadiusAxis tick={{ fill: textColor, fontSize: 10 }} />
              <Tooltip content={<CustomTooltip isDark={isDark} />} />
              {Object.keys(data[0] || {}).filter(key => key !== 'subject').map((key, index) => (
                <Radar
                  key={key}
                  name={key}
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.3}
                  animationDuration={showAnimation ? 1000 : 0}
                />
              ))}
              {showLegend && <Legend content={<CustomLegend isDark={isDark} />} />}
            </RadarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className={className}>
      <motion.div
        {...(showAnimation ? {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.6 }
        } : {})}
      >
        <Card className="p-6 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50">
          {(title || subtitle) && (
            <div className="mb-6">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {renderChart()}
        </Card>
      </motion.div>
    </div>
  );
};
