import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DATASETS } from "@/data/mockData";
import { useNavigate, useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DatasetAnalysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

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

  // Mock analysis data
  const biasAnalysis = [
    { category: "Gender Distribution", male: 52, female: 48 },
    { category: "Age Groups", young: 35, middle: 45, senior: 20 },
    { category: "Urban vs Rural", urban: 40, rural: 60 }
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
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        darkMode={darkMode}
        onThemeToggle={handleThemeToggle}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            ← Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{dataset.name}</h1>
            <p className="text-muted-foreground">{dataset.desc}</p>
          </div>
          <Badge variant={dataset.access === 'premium' ? 'destructive' : 'secondary'}>
            {dataset.access}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dataset Overview */}
          <Card className="mospi-card p-6">
            <h3 className="font-semibold mb-4">Dataset Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Records</span>
                <span className="font-medium">{dataset.quick.records}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Variables</span>
                <span className="font-medium">{dataset.variables.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <span className="font-medium">{dataset.quick.updated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Versions</span>
                <span className="font-medium">{dataset.versions.length}</span>
              </div>
            </div>
          </Card>

          {/* Data Quality Metrics */}
          <Card className="mospi-card p-6 lg:col-span-2">
            <h3 className="font-semibold mb-4">Data Quality Assessment</h3>
            <div className="grid grid-cols-2 gap-4">
              {qualityMetrics.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <span className={`text-sm font-bold ${getStatusColor(metric.status)}`}>
                      {metric.value}%
                    </span>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bias Analysis */}
        <Card className="mospi-card p-6">
          <h3 className="font-semibold mb-4">Bias & Balance Analysis</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-3">Distribution Analysis</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  { name: 'Male', value: 52, fill: '#3b82f6' },
                  { name: 'Female', value: 48, fill: '#8b5cf6' }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#f8fafc', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3">Regional Coverage</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Urban', value: 40, fill: '#10b981' },
                      { name: 'Rural', value: 60, fill: '#f59e0b' }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={{ fill: '#374151', fontSize: 14 }}
                  >
                    {[{ name: 'Urban', value: 40, fill: '#10b981' }, { name: 'Rural', value: 60, fill: '#f59e0b' }].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#f8fafc', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="mospi-card p-6">
          <h3 className="font-semibold mb-4">Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
              <div>
                <p className="font-medium">Data Accuracy</p>
                <p className="text-sm text-muted-foreground">Consider additional validation for 24% of records with potential accuracy issues.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <p className="font-medium">Regional Balance</p>
                <p className="text-sm text-muted-foreground">Good rural-urban distribution represents national demographics well.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <p className="font-medium">Sample Representativeness</p>
                <p className="text-sm text-muted-foreground">Dataset provides good coverage across demographic groups for research purposes.</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default DatasetAnalysis;