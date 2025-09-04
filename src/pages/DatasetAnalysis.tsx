import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DATASETS } from "@/data/mockData";
import { useNavigate, useParams } from "react-router-dom";
import { EnhancedChart } from "@/components/EnhancedChart";
import { colorPalettes } from "@/components/chartConfig";

const DatasetAnalysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setDarkMode(shouldUseDark);
    if (shouldUseDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const dataset = DATASETS.find(d => d.id === id);
  
  if (!dataset) {
    return <div>Dataset not found</div>;
  }

  const handleThemeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  // Enhanced mock analysis data
  const genderDistribution = [
    { name: 'Male', value: 52 },
    { name: 'Female', value: 48 }
  ];

  const ageDistribution = [
    { name: '18-25', value: 15, population: 1500 },
    { name: '26-35', value: 25, population: 2500 },
    { name: '36-45', value: 30, population: 3000 },
    { name: '46-55', value: 20, population: 2000 },
    { name: '56+', value: 10, population: 1000 }
  ];

  const regionalData = [
    { name: 'Urban', value: 40 },
    { name: 'Rural', value: 60 }
  ];

  const monthlyTrends = [
    { name: 'Jan', responses: 450, completed: 420 },
    { name: 'Feb', responses: 520, completed: 480 },
    { name: 'Mar', responses: 680, completed: 650 },
    { name: 'Apr', responses: 580, completed: 540 },
    { name: 'May', responses: 720, completed: 690 },
    { name: 'Jun', responses: 820, completed: 780 }
  ];

  const qualityMetrics = [
    { name: "Completeness", value: 94, status: "good" },
    { name: "Consistency", value: 87, status: "good" },
    { name: "Accuracy", value: 76, status: "warning" },
    { name: "Uniqueness", value: 99, status: "excellent" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "warning": return "text-yellow-600";
      default: return "text-red-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        darkMode={darkMode}
        onThemeToggle={handleThemeToggle}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="hover:bg-white/80 dark:hover:bg-gray-800/80"
          >
            ← Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {dataset.name}
            </h1>
            <p className="text-muted-foreground mt-1">{dataset.desc}</p>
          </div>
          <Badge 
            variant={dataset.access === 'premium' ? 'destructive' : 'secondary'}
            className="ml-auto"
          >
            {dataset.access}
          </Badge>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
              <h3 className="font-semibold mb-2">Total Records</h3>
              <p className="text-3xl font-bold">{dataset.quick.records}</p>
              <p className="text-blue-100 text-sm mt-1">Active responses</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0">
              <h3 className="font-semibold mb-2">Variables</h3>
              <p className="text-3xl font-bold">{dataset.variables.length}</p>
              <p className="text-indigo-100 text-sm mt-1">Data points</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
              <h3 className="font-semibold mb-2">Completeness</h3>
              <p className="text-3xl font-bold">94%</p>
              <p className="text-purple-100 text-sm mt-1">Data quality</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
              <h3 className="font-semibold mb-2">Last Updated</h3>
              <p className="text-xl font-bold">{dataset.quick.updated}</p>
              <p className="text-pink-100 text-sm mt-1">Latest version</p>
            </Card>
          </motion.div>
        </div>

        {/* Data Quality Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-6 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              📊 Data Quality Assessment
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {qualityMetrics.map((metric, index) => (
                <motion.div 
                  key={metric.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <span className={`text-sm font-bold ${getStatusColor(metric.status)}`}>
                      {metric.value}%
                    </span>
                  </div>
                  <Progress value={metric.value} className="h-3" />
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gender Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <EnhancedChart
              type="pie"
              data={genderDistribution}
              title="Gender Distribution"
              subtitle="Demographic breakdown by gender"
              height={300}
              colors={colorPalettes.primary}
              showAnimation={true}
            />
          </motion.div>

          {/* Regional Coverage */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <EnhancedChart
              type="pie"
              data={regionalData}
              title="Regional Coverage"
              subtitle="Urban vs Rural distribution"
              height={300}
              colors={colorPalettes.vibrant}
              showAnimation={true}
            />
          </motion.div>

          {/* Age Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <EnhancedChart
              type="bar"
              data={ageDistribution}
              title="Age Distribution"
              subtitle="Population by age groups"
              height={300}
              colors={colorPalettes.gradient}
              showAnimation={true}
            />
          </motion.div>

          {/* Monthly Trends */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <EnhancedChart
              type="area"
              data={monthlyTrends}
              title="Response Trends"
              subtitle="Monthly response and completion rates"
              height={300}
              colors={colorPalettes.pastel}
              showAnimation={true}
            />
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <Card className="p-6 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              💡 AI-Powered Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div 
                className="flex items-start gap-3 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-3 h-3 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">Data Accuracy</p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Consider additional validation for 24% of records with potential accuracy issues.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-3 h-3 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Regional Balance</p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Excellent rural-urban distribution represents national demographics well.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-3 h-3 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200">Sample Representativeness</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Dataset provides good coverage across demographic groups for research.
                  </p>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default DatasetAnalysis;