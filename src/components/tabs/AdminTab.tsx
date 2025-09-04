import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedChart } from "@/components/EnhancedChart";
import { colorPalettes } from "@/components/chartConfig";
import {
  Upload,
  Database,
  Users,
  Activity,
  Settings,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Server,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Eye,
  Download,
  RefreshCw,
  Trash2,
  Plus,
  Edit,
  BarChart3
} from "lucide-react";

interface SystemMetric {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'good' | 'warning' | 'error';
  change?: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
  source: string;
}

export const AdminTab = () => {
  const [surveyId, setSurveyId] = useState("plfs");
  const [version, setVersion] = useState("2022_q3");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: new Date().toISOString(),
      level: 'info',
      message: 'System initialized successfully',
      source: 'SYSTEM'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 60000).toISOString(),
      level: 'success',
      message: 'Database connection established',
      source: 'DATABASE'
    }
  ]);
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestionProgress, setIngestionProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock system metrics
  const systemMetrics: SystemMetric[] = [
    { label: "CPU Usage", value: "23%", icon: Cpu, status: "good", change: "-2%" },
    { label: "Memory", value: "1.2GB", icon: MemoryStick, status: "good", change: "+5%" },
    { label: "Storage", value: "78%", icon: HardDrive, status: "warning", change: "+12%" },
    { label: "Network", value: "45 MB/s", icon: Network, status: "good", change: "+8%" },
  ];

  // Mock performance data
  const performanceData = [
    { name: 'Mon', requests: 1250, errors: 12, latency: 150 },
    { name: 'Tue', requests: 1430, errors: 8, latency: 140 },
    { name: 'Wed', requests: 1680, errors: 15, latency: 160 },
    { name: 'Thu', requests: 1920, errors: 5, latency: 130 },
    { name: 'Fri', requests: 2100, errors: 3, latency: 120 },
    { name: 'Sat', requests: 890, errors: 2, latency: 110 },
    { name: 'Sun', requests: 650, errors: 1, latency: 105 }
  ];

  const userActivityData = [
    { name: 'Active Users', value: 234 },
    { name: 'API Requests', value: 1542 },
    { name: 'Downloads', value: 89 },
    { name: 'Errors', value: 12 }
  ];

  const datasetStats = [
    { name: 'Jan', datasets: 12, ingested: 11, failed: 1 },
    { name: 'Feb', datasets: 15, ingested: 14, failed: 1 },
    { name: 'Mar', datasets: 18, ingested: 17, failed: 1 },
    { name: 'Apr', datasets: 22, ingested: 21, failed: 1 },
    { name: 'May', datasets: 25, ingested: 24, failed: 1 },
    { name: 'Jun', datasets: 28, ingested: 27, failed: 1 }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const simulateIngestion = async () => {
    if (!surveyId || !version) {
      addLog("error", "Survey ID and Version are required", "VALIDATION");
      return;
    }

    setIsIngesting(true);
    setIngestionProgress(0);
    
    addLog("info", `Starting ingestion for ${surveyId} v${version}`, "INGESTION");
    
    // Simulate progress
    const steps = [
      { progress: 20, message: "Validating data schema...", delay: 1000 },
      { progress: 40, message: `Processing ${selectedFile?.name || 'uploaded file'}...`, delay: 1500 },
      { progress: 60, message: "Applying privacy protection rules...", delay: 1200 },
      { progress: 80, message: "Creating database indexes...", delay: 1000 },
      { progress: 100, message: "Ingestion completed successfully", delay: 800 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setIngestionProgress(step.progress);
      addLog(step.progress === 100 ? "success" : "info", step.message, "INGESTION");
    }

    addLog("success", `Added ${Math.floor(Math.random() * 100000 + 50000)} records`, "DATABASE");
    setIsIngesting(false);
  };

  const addLog = (level: LogEntry['level'], message: string, source: string) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      level,
      message,
      source
    };
    setLogs(prev => [newLog, ...prev.slice(0, 49)]); // Keep last 50 logs
  };

  const getStatusColor = (status: SystemMetric['status']) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
    }
  };

  const getLogColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'info': return 'text-blue-600';
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
    }
  };

  const getLogIcon = (level: LogEntry['level']) => {
    switch (level) {
      case 'info': return '🔵';
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">System management and monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            System Healthy
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </motion.div>

      {/* System Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className={`p-4 ${getStatusColor(metric.status)} border-0`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium opacity-80">{metric.label}</p>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                    {metric.change && (
                      <p className="text-xs opacity-70 mt-1">{metric.change}</p>
                    )}
                  </div>
                  <div className="p-2 rounded-lg bg-white/10">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="ingestion" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Ingestion
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EnhancedChart
                type="area"
                data={performanceData}
                title="📊 System Performance"
                subtitle="Daily API requests and response times"
                height={300}
                colors={colorPalettes.gradient}
                showAnimation={true}
              />
              <EnhancedChart
                type="pie"
                data={userActivityData}
                title="👥 User Activity"
                subtitle="Current activity breakdown"
                height={300}
                colors={colorPalettes.vibrant}
                showAnimation={true}
              />
            </div>

            {/* Dataset Statistics */}
            <EnhancedChart
              type="bar"
              data={datasetStats}
              title="📈 Dataset Ingestion Trends"
              subtitle="Monthly dataset processing statistics"
              height={350}
              colors={colorPalettes.primary}
              showAnimation={true}
            />
          </TabsContent>

          <TabsContent value="ingestion" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Ingestion Form */}
              <Card className="p-6 lg:col-span-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Dataset Ingestion</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Upload and process new datasets</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Survey ID</Label>
                      <Input
                        value={surveyId}
                        onChange={(e) => setSurveyId(e.target.value)}
                        className="mt-1"
                        placeholder="plfs"
                        disabled={isIngesting}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Version</Label>
                      <Input
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        className="mt-1"
                        placeholder="2022_q3"
                        disabled={isIngesting}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Upload File</Label>
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      className="mt-1"
                      accept=".csv,.xlsx,.json"
                      disabled={isIngesting}
                    />
                    {selectedFile && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </motion.p>
                    )}
                  </div>

                  {isIngesting && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span>Processing...</span>
                        <span>{ingestionProgress}%</span>
                      </div>
                      <Progress value={ingestionProgress} className="h-2" />
                    </motion.div>
                  )}

                  <Button 
                    onClick={simulateIngestion} 
                    disabled={isIngesting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {isIngesting ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Start Ingestion
                      </div>
                    )}
                  </Button>
                </div>

                {/* Pipeline Info */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Data Processing Pipeline
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
                      <div className="font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        Validation
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                        Schema check, data types, constraints
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
                      <div className="font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3 text-blue-500" />
                        Privacy
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                        Apply suppression rules, anonymization
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
                      <div className="font-medium flex items-center gap-1">
                        <Database className="w-3 h-3 text-purple-500" />
                        Deployment
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                        Update database, refresh API
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Real-time Logs */}
              <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    System Logs
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLogs([])}
                    className="text-xs"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Clear
                  </Button>
                </div>
                
                <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg p-3 h-80 overflow-y-auto custom-scrollbar">
                  <AnimatePresence>
                    {logs.map((log) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="mb-2 text-xs font-mono"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500 shrink-0">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                          <span className="shrink-0">{getLogIcon(log.level)}</span>
                          <span className={`${getLogColor(log.level)} shrink-0 font-medium`}>
                            [{log.source}]
                          </span>
                          <span className="text-gray-300">{log.message}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            {/* Real-time metrics and monitoring interface */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Add more monitoring widgets here */}
              <Card className="p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Server Status
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Uptime</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20">99.9%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm font-medium">142ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Error Rate</span>
                    <span className="text-sm font-medium">0.01%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* System settings and configuration */}
            <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Configuration
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                System settings and configuration options will be available here.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};