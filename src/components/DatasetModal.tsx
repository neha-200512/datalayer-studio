import { useState, useEffect } from "react";
import { Dataset } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EnhancedChart } from "@/components/EnhancedChart";
import { colorPalettes } from "@/components/chartConfig";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Database, 
  Calendar, 
  Users, 
  FileText, 
  Download, 
  Eye, 
  Code, 
  Play,
  Star,
  BarChart3,
  Clock,
  MapPin,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Info,
  History,
  Share2,
  Copy,
  ExternalLink,
  Filter,
  Search,
  Globe,
  Lock,
  Unlock,
  BookOpen,
  Link,
  GitBranch,
  Tag,
  Layers,
  Shield,
  Zap,
  Heart,
  MessageSquare,
  Archive,
  RefreshCw,
  Settings
} from "lucide-react";

interface DatasetModalProps {
  dataset: Dataset | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenQuery: (datasetId: string) => void;
  onOpenPlayground: (datasetId: string) => void;
}

interface VariableInfo {
  name: string;
  type: string;
  description: string;
  nullable: boolean;
  unique: boolean;
  examples: string[];
}

interface DatasetMetadata {
  fileSize: string;
  format: string[];
  encoding: string;
  compression: string;
  checksum: string;
  license: string;
  citation: string;
  methodology: string;
  source: string;
  collection: {
    startDate: string;
    endDate: string;
    frequency: string;
    coverage: string;
  };
  contact: {
    organization: string;
    email: string;
    phone?: string;
  };
}

export const DatasetModal = ({ 
  dataset, 
  isOpen, 
  onClose, 
  onOpenQuery, 
  onOpenPlayground 
}: DatasetModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<string>("");

  useEffect(() => {
    if (dataset && dataset.versions.length > 0) {
      setSelectedVersion(dataset.versions[0]);
    }
  }, [dataset]);

  if (!dataset) return null;

  // Enhanced mock data for the modal
  const enhancedVariables: VariableInfo[] = dataset.variables.map((variable, index) => ({
    name: variable,
    type: index % 3 === 0 ? 'string' : index % 3 === 1 ? 'integer' : 'float',
    description: `Description for ${variable} variable with detailed information about its purpose and usage.`,
    nullable: Math.random() > 0.7,
    unique: Math.random() > 0.8,
    examples: [
      `${variable}_example_1`,
      `${variable}_example_2`,
      `${variable}_example_3`
    ]
  }));

  const metadata: DatasetMetadata = {
    fileSize: "2.1 GB",
    format: ["CSV", "JSON", "Parquet"],
    encoding: "UTF-8",
    compression: "gzip",
    checksum: "sha256:a1b2c3d4e5f6...",
    license: "CC BY 4.0",
    citation: `Ministry of Statistics and Programme Implementation. "${dataset.name}". Government of India, ${dataset.quick.updated}.`,
    methodology: "Stratified multi-stage sampling with probability proportional to size",
    source: "Ministry of Statistics and Programme Implementation (MoSPI)",
    collection: {
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      frequency: "Annual",
      coverage: "National"
    },
    contact: {
      organization: "MoSPI Data Division",
      email: "data.support@mospi.gov.in",
      phone: "+91-11-2338-2054"
    }
  };

  const qualityMetrics = [
    { name: "Completeness", value: 94, status: "good", description: "Percentage of non-missing values" },
    { name: "Consistency", value: 87, status: "good", description: "Data consistency across records" },
    { name: "Accuracy", value: 76, status: "warning", description: "Estimated data accuracy" },
    { name: "Uniqueness", value: 99, status: "excellent", description: "Percentage of unique records" },
    { name: "Validity", value: 91, status: "good", description: "Data format and range validity" },
    { name: "Timeliness", value: 88, status: "good", description: "Data freshness and update frequency" }
  ];

  const usageStats = [
    { name: "Jan", downloads: 45, queries: 120, users: 23 },
    { name: "Feb", downloads: 52, queries: 140, users: 28 },
    { name: "Mar", downloads: 38, queries: 95, users: 19 },
    { name: "Apr", downloads: 67, queries: 180, users: 34 },
    { name: "May", downloads: 81, queries: 220, users: 41 },
    { name: "Jun", downloads: 74, queries: 190, users: 37 }
  ];

  const distributionData = [
    { name: "Urban", value: 45, population: "45%" },
    { name: "Rural", value: 55, population: "55%" }
  ];

  const geographicDistribution = [
    { name: "North", value: 25, states: 8 },
    { name: "South", value: 30, states: 5 },
    { name: "East", value: 20, states: 7 },
    { name: "West", value: 15, states: 4 },
    { name: "Central", value: 10, states: 4 }
  ];

  const downloadHistory = [
    { date: "2024-01-15", user: "researcher@iit.ac.in", purpose: "Academic Research" },
    { date: "2024-01-10", user: "analyst@worldbank.org", purpose: "Policy Analysis" },
    { date: "2024-01-08", user: "student@delhi.edu", purpose: "Thesis Work" },
    { date: "2024-01-05", user: "data@niti.gov.in", purpose: "Government Analysis" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600 bg-green-100 dark:bg-green-900/20 border-green-200";
      case "good": return "text-blue-600 bg-blue-100 dark:bg-blue-900/20 border-blue-200";
      case "warning": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200";
      default: return "text-red-600 bg-red-100 dark:bg-red-900/20 border-red-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent": return <CheckCircle className="w-4 h-4" />;
      case "good": return <CheckCircle className="w-4 h-4" />;
      case "warning": return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getAccessIcon = (access: string) => {
    return access === 'premium' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />;
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/datasets/${dataset.id}`);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleDownloadMetadata = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const dataStr = JSON.stringify(metadata, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `${dataset.id}_metadata.json`;
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[95vh] overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 p-0 dataset-modal-content">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="h-full flex flex-col"
        >
          {/* Enhanced Header */}
          <DialogHeader className="p-6 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white shadow-lg">
                  <Database className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      {dataset.name}
                    </DialogTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleFavorite}
                      className={`p-1 hover:bg-transparent ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  <DialogDescription className="text-gray-600 dark:text-gray-400 mb-3 max-w-3xl leading-relaxed">
                    {dataset.desc}
                  </DialogDescription>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge 
                      variant={dataset.access === 'premium' ? 'destructive' : 'secondary'}
                      className={`${dataset.access === 'premium' 
                        ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-0' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0'
                      } flex items-center gap-1`}
                    >
                      {getAccessIcon(dataset.access)}
                      {dataset.access}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {dataset.theme}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {dataset.quick.updated}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {dataset.quick.records} records
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleShare}
                        className="rounded-full h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share dataset</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="rounded-full h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col dataset-modal-tabs">
              <TabsList className="grid w-full grid-cols-6 bg-gray-100 dark:bg-gray-800 my-4 flex-shrink-0">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="quality" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Quality
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="variables" className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Schema
                </TabsTrigger>
                <TabsTrigger value="metadata" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Metadata
                </TabsTrigger>
                <TabsTrigger value="access" className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Access
                </TabsTrigger>
              </TabsList>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full custom-scrollbar">
                  <div className="pb-6 pr-2">
                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6 m-0 data-[state=active]:mt-0">{/* Quick Stats */}
                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700/50">
                      <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-blue-600" />
                        <div>
                          <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                            {dataset.quick.records}
                          </p>
                          <p className="text-sm text-blue-600 dark:text-blue-300">Total Records</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700/50">
                      <div className="flex items-center gap-3">
                        <Layers className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                            {dataset.variables.length}
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-300">Variables</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-700/50">
                      <div className="flex items-center gap-3">
                        <GitBranch className="w-8 h-8 text-purple-600" />
                        <div>
                          <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                            {dataset.versions.length}
                          </p>
                          <p className="text-sm text-purple-600 dark:text-purple-300">Versions</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-700/50">
                      <div className="flex items-center gap-3">
                        <Activity className="w-8 h-8 text-orange-600" />
                        <div>
                          <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                            {metadata.fileSize}
                          </p>
                          <p className="text-sm text-orange-600 dark:text-orange-300">File Size</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Dataset Info and Versions */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        Dataset Information
                      </h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Survey ID</span>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{dataset.id.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Theme</span>
                          <Badge variant="outline" className="capitalize">{dataset.theme}</Badge>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Access Level</span>
                          <Badge variant={dataset.access === 'premium' ? 'destructive' : 'secondary'} className="capitalize">
                            {dataset.access}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Last Updated</span>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{dataset.quick.updated}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Format</span>
                          <div className="flex gap-1">
                            {metadata.format.map((fmt) => (
                              <Badge key={fmt} variant="outline" className="text-xs">{fmt}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <GitBranch className="w-5 h-5 text-purple-600" />
                        Available Versions
                      </h4>
                      <div className="space-y-3">
                        {dataset.versions.map((version, index) => (
                          <motion.div 
                            key={version}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                              selectedVersion === version 
                                ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' 
                                : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => setSelectedVersion(version)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${
                                index === 0 ? 'bg-green-500' : 'bg-gray-400'
                              }`} />
                              <span className="font-medium">{version}</span>
                            </div>
                            {index === 0 && (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20">
                                Latest
                              </Badge>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Geographic Distribution */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <EnhancedChart
                      type="pie"
                      data={distributionData}
                      title="📍 Geographic Distribution"
                      subtitle="Urban vs Rural data coverage"
                      height={300}
                      colors={colorPalettes.primary}
                      showAnimation={true}
                    />
                    
                    <EnhancedChart
                      type="pie"
                      data={geographicDistribution}
                      title="🗺️ Regional Coverage"
                      subtitle="Data distribution across regions"
                      height={300}
                      colors={colorPalettes.vibrant}
                      showAnimation={true}
                    />
                  </div>
                </TabsContent>

                {/* Quality Tab */}
                <TabsContent value="quality" className="space-y-6 m-0 data-[state=active]:mt-0">
                  <Card className="p-6">
                    <h4 className="font-semibold mb-6 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      Data Quality Assessment
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {qualityMetrics.map((metric, index) => (
                        <motion.div 
                          key={metric.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="space-y-3"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(metric.status)}
                              <span className="font-medium">{metric.name}</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="w-3 h-3 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">{metric.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <span className={`font-bold px-3 py-1 rounded-lg text-sm border ${getStatusColor(metric.status)}`}>
                              {metric.value}%
                            </span>
                          </div>
                          <Progress value={metric.value} className="h-3 enhanced-progress" />
                        </motion.div>
                      ))}
                    </div>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <EnhancedChart
                      type="pie"
                      data={distributionData}
                      title="📊 Data Distribution"
                      subtitle="Geographic distribution of records"
                      height={300}
                      colors={colorPalettes.primary}
                      showAnimation={true}
                    />
                    
                    <Card className="p-6">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Quality Summary
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <span className="font-medium">Overall Score</span>
                          <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                            {Math.round(qualityMetrics.reduce((acc, m) => acc + m.value, 0) / qualityMetrics.length)}%
                          </Badge>
                        </div>
                        <Separator />
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Missing Values</span>
                            <span className="font-medium">2.1%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duplicate Records</span>
                            <span className="font-medium">0.3%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Outliers Detected</span>
                            <span className="font-medium">1.8%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Data Validation</span>
                            <span className="font-medium text-green-600">Passed</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-6 m-0 data-[state=active]:mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <EnhancedChart
                      type="area"
                      data={usageStats}
                      title="📈 Usage Analytics"
                      subtitle="Downloads, queries, and user activity over time"
                      height={350}
                      colors={colorPalettes.gradient}
                      showAnimation={true}
                    />
                    
                    <Card className="p-6">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        Usage Statistics
                      </h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">
                              {usageStats.reduce((acc, stat) => acc + stat.downloads, 0)}
                            </p>
                            <p className="text-sm text-blue-500">Total Downloads</p>
                          </div>
                          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">
                              {usageStats.reduce((acc, stat) => acc + stat.queries, 0)}
                            </p>
                            <p className="text-sm text-green-500">Total Queries</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Peak Usage Month</span>
                            <span className="font-medium">May 2024</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Average Daily Queries</span>
                            <span className="font-medium">12.3</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Active Users (30d)</span>
                            <span className="font-medium">147</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  <EnhancedChart
                    type="bar"
                    data={geographicDistribution}
                    title="🗺️ Regional Usage Distribution"
                    subtitle="Dataset access patterns by geographic region"
                    height={300}
                    colors={colorPalettes.vibrant}
                    showAnimation={true}
                  />
                </TabsContent>

                {/* Variables/Schema Tab */}
                <TabsContent value="variables" className="space-y-6 m-0 data-[state=active]:mt-0">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Layers className="w-5 h-5 text-purple-600" />
                        Dataset Schema ({enhancedVariables.length} variables)
                      </h4>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Export Schema
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Search className="w-4 h-4" />
                          Search Variables
                        </Button>
                      </div>
                    </div>
                    
                    <div className="overflow-y-auto max-h-[400px] custom-scrollbar">
                      <div className="grid grid-cols-1 gap-4 pr-2">
                      {enhancedVariables.map((variable, index) => (
                        <motion.div
                          key={variable.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.02 }}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${
                                variable.type === 'string' ? 'bg-blue-500' :
                                variable.type === 'integer' ? 'bg-green-500' : 'bg-purple-500'
                              }`} />
                              <div>
                                <h5 className="font-semibold text-gray-900 dark:text-white">{variable.name}</h5>
                                <Badge variant="outline" className="text-xs mt-1">{variable.type}</Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {variable.nullable && (
                                <Badge variant="outline" className="text-xs text-yellow-600">Nullable</Badge>
                              )}
                              {variable.unique && (
                                <Badge variant="outline" className="text-xs text-green-600">Unique</Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{variable.description}</p>
                          <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
                            <p className="text-xs text-gray-500 mb-2">Example values:</p>
                            <div className="flex gap-2 flex-wrap">
                              {variable.examples.map((example, idx) => (
                                <code key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                  {example}
                                </code>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Metadata Tab */}
                <TabsContent value="metadata" className="space-y-6 m-0 data-[state=active]:mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Technical Metadata
                      </h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400">File Size</label>
                            <p className="font-semibold">{metadata.fileSize}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400">Encoding</label>
                            <p className="font-semibold">{metadata.encoding}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400">Compression</label>
                            <p className="font-semibold">{metadata.compression}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400">License</label>
                            <p className="font-semibold">{metadata.license}</p>
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <label className="text-sm text-gray-600 dark:text-gray-400">Checksum</label>
                          <p className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 break-all">
                            {metadata.checksum}
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-green-600" />
                        Collection Information
                      </h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400">Start Date</label>
                            <p className="font-semibold">{metadata.collection.startDate}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400">End Date</label>
                            <p className="font-semibold">{metadata.collection.endDate}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400">Frequency</label>
                            <p className="font-semibold">{metadata.collection.frequency}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400">Coverage</label>
                            <p className="font-semibold">{metadata.collection.coverage}</p>
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <label className="text-sm text-gray-600 dark:text-gray-400">Source Organization</label>
                          <p className="font-semibold">{metadata.source}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600 dark:text-gray-400">Methodology</label>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{metadata.methodology}</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Card className="p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-orange-600" />
                      Citation & Contact
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Recommended Citation</label>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-2">
                          <p className="text-sm italic">{metadata.citation}</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2 flex items-center gap-2"
                            onClick={() => navigator.clipboard.writeText(metadata.citation)}
                          >
                            <Copy className="w-3 h-3" />
                            Copy Citation
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Contact Information</label>
                        <div className="mt-2 space-y-2">
                          <p className="text-sm"><strong>Organization:</strong> {metadata.contact.organization}</p>
                          <p className="text-sm"><strong>Email:</strong> {metadata.contact.email}</p>
                          {metadata.contact.phone && (
                            <p className="text-sm"><strong>Phone:</strong> {metadata.contact.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Access History Tab */}
                <TabsContent value="access" className="space-y-6 m-0 data-[state=active]:mt-0">
                  <Card className="p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <History className="w-5 h-5 text-purple-600" />
                      Recent Download Activity
                    </h4>
                    <div className="space-y-3">
                      {downloadHistory.map((entry, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <div>
                              <p className="font-medium text-sm">{entry.user}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{entry.purpose}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{entry.date}</p>
                            <Badge variant="outline" className="text-xs">Downloaded</Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        Access Permissions
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <span className="font-medium">Read Access</span>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <span className="font-medium">Download Access</span>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <span className="font-medium">API Access</span>
                          <Badge variant="outline">Requires Authentication</Badge>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Link className="w-5 h-5 text-blue-600" />
                        Quick Links
                      </h4>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href="#" className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            API Documentation
                          </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href="#" className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Data Dictionary
                          </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href="#" className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Methodology Report
                          </a>
                        </Button>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
                  </div>
                </ScrollArea>
              </div>
            </Tabs>
          </div>
          
          {/* Enhanced Action Buttons */}
          <div className="flex items-center justify-between p-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={handleDownloadMetadata}
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                Export Metadata
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`flex items-center gap-2 ${isFavorited ? 'text-red-600 border-red-200' : ''}`}
                onClick={handleFavorite}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Feedback
              </Button>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={() => {
                  onOpenPlayground(dataset.id);
                  onClose();
                }}
                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
              >
                <Play className="w-4 h-4" />
                API Playground
              </Button>
              <Button 
                onClick={() => {
                  onOpenQuery(dataset.id);
                  onClose();
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2 shadow-lg"
              >
                <Code className="w-4 h-4" />
                Query Builder
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};