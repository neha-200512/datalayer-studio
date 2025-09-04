import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { EnhancedChart } from '@/components/EnhancedChart';
import { colorPalettes } from '@/components/chartConfig';
import { TrendingUp, Database, Users, Activity, Download } from 'lucide-react';

const DashboardStats = () => {
  // Mock data for dashboard statistics
  const stats = [
    {
      title: 'Total Datasets',
      value: '15',
      change: '+2 this month',
      icon: Database,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+12% this week',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'API Requests',
      value: '45.2K',
      change: '+8% today',
      icon: Activity,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Downloads',
      value: '892',
      change: '+23% this week',
      icon: Download,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Mock chart data
  const usageData = [
    { name: 'Jan', datasets: 12, downloads: 245, apiCalls: 1200 },
    { name: 'Feb', datasets: 13, downloads: 289, apiCalls: 1500 },
    { name: 'Mar', datasets: 14, downloads: 356, apiCalls: 1800 },
    { name: 'Apr', datasets: 15, downloads: 423, apiCalls: 2100 },
    { name: 'May', datasets: 15, downloads: 567, apiCalls: 2800 },
    { name: 'Jun', datasets: 15, downloads: 892, apiCalls: 3200 }
  ];

  const topDatasets = [
    { name: 'Population Census 2021', value: 234, downloads: 450 },
    { name: 'Economic Survey Data', value: 189, downloads: 320 },
    { name: 'Education Statistics', value: 156, downloads: 280 },
    { name: 'Health Indicators', value: 123, downloads: 210 },
    { name: 'Agricultural Data', value: 98, downloads: 160 }
  ];

  const accessTypeData = [
    { name: 'Public', value: 12 },
    { name: 'Premium', value: 3 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className={`p-6 bg-gradient-to-br ${stat.color} text-white border-0 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    <p className="text-white/70 text-xs mt-1">{stat.change}</p>
                  </div>
                  <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <EnhancedChart
            type="area"
            data={usageData}
            title="📈 Platform Usage Trends"
            subtitle="Monthly datasets, downloads, and API calls"
            height={350}
            colors={colorPalettes.gradient}
            showAnimation={true}
          />
        </motion.div>

        {/* Top Datasets */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <EnhancedChart
            type="bar"
            data={topDatasets}
            title="🏆 Most Popular Datasets"
            subtitle="Download count by dataset"
            height={350}
            colors={colorPalettes.vibrant}
            showAnimation={true}
          />
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Access Type Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <EnhancedChart
            type="pie"
            data={accessTypeData}
            title="🔐 Access Distribution"
            subtitle="Public vs Premium datasets"
            height={300}
            colors={colorPalettes.primary}
            showAnimation={true}
          />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="lg:col-span-2"
        >
          <Card className="p-6 h-full backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              🚀 Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                { action: 'New dataset published', dataset: 'Population Census 2021', time: '2 hours ago', type: 'success' },
                { action: 'API key generated', user: 'john.doe@email.com', time: '4 hours ago', type: 'info' },
                { action: 'Large download completed', dataset: 'Economic Survey Data', time: '6 hours ago', type: 'warning' },
                { action: 'Dataset updated', dataset: 'Health Indicators', time: '1 day ago', type: 'info' },
                { action: 'New user registered', user: 'jane.smith@email.com', time: '2 days ago', type: 'success' }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {activity.dataset || activity.user} • {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardStats;
