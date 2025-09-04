import { useState } from "react";
import { Dataset } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  Info
} from "lucide-react";

interface DatasetModalProps {
  dataset: Dataset | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenQuery: (datasetId: string) => void;
  onOpenPlayground: (datasetId: string) => void;
}

export const DatasetModal = ({ 
  dataset, 
  isOpen, 
  onClose, 
  onOpenQuery, 
  onOpenPlayground 
}: DatasetModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!dataset) return null;

  // Mock data for enhanced modal
  const qualityMetrics = [
    { name: "Completeness", value: 94, status: "good" },
    { name: "Consistency", value: 87, status: "good" },
    { name: "Accuracy", value: 76, status: "warning" },
    { name: "Uniqueness", value: 99, status: "excellent" }
  ];

  const usageStats = [
    { name: "Jan", downloads: 45, queries: 120 },
    { name: "Feb", downloads: 52, queries: 140 },
    { name: "Mar", downloads: 38, queries: 95 },
    { name: "Apr", downloads: 67, queries: 180 },
    { name: "May", downloads: 81, queries: 220 },
    { name: "Jun", downloads: 74, queries: 190 }
  ];

  const distributionData = [
    { name: "Urban", value: 45 },
    { name: "Rural", value: 55 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "good": return "text-blue-600 bg-blue-100 dark:bg-blue-900/20";
      case "warning": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      default: return "text-red-600 bg-red-100 dark:bg-red-900/20";
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="pb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {dataset.name}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-400 mt-1 max-w-2xl">
                    {dataset.desc}
                  </DialogDescription>
                  <div className="flex items-center gap-3 mt-3">
                    <Badge 
                      variant={dataset.access === 'premium' ? 'destructive' : 'secondary'}
                      className={dataset.access === 'premium' 
                        ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      }
                    >
                      {dataset.access}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <BarChart3 className="w-3 h-3" />
                      {dataset.theme}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {dataset.quick.updated}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="rounded-full h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="quality" className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Quality
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="variables" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Variables
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Quick Stats */}
                  <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/50">
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

                  <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                          {dataset.variables.length}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-300">Variables</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700/50">
                    <div className="flex items-center gap-3">
                      <Activity className="w-8 h-8 text-purple-600" />
                      <div>
                        <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                          {dataset.versions.length}
                        </p>
                        <p className="text-sm text-purple-600 dark:text-purple-300">Versions</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Dataset Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Dataset Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Survey ID</span>
                        <span className="font-medium">{dataset.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Theme</span>
                        <span className="font-medium">{dataset.theme}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Access Level</span>
                        <span className="font-medium capitalize">{dataset.access}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                        <span className="font-medium">{dataset.quick.updated}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Available Versions
                    </h4>
                    <div className="space-y-2">
                      {dataset.versions.map((version, index) => (
                        <div 
                          key={version} 
                          className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                          <span className="font-medium">{version}</span>
                          {index === 0 && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20">
                              Latest
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="quality" className="mt-6 space-y-6">
                <Card className="p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Data Quality Assessment
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {qualityMetrics.map((metric) => (
                      <div key={metric.name} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium flex items-center gap-2">
                            {getStatusIcon(metric.status)}
                            {metric.name}
                          </span>
                          <span className={`font-bold px-2 py-1 rounded-lg text-sm ${getStatusColor(metric.status)}`}>
                            {metric.value}%
                          </span>
                        </div>
                        <Progress value={metric.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>

                <EnhancedChart
                  type="pie"
                  data={distributionData}
                  title="📊 Data Distribution"
                  subtitle="Geographic distribution of records"
                  height={300}
                  colors={colorPalettes.primary}
                  showAnimation={true}
                />
              </TabsContent>

              <TabsContent value="analytics" className="mt-6 space-y-6">
                <EnhancedChart
                  type="area"
                  data={usageStats}
                  title="📈 Usage Analytics"
                  subtitle="Downloads and queries over time"
                  height={350}
                  colors={colorPalettes.gradient}
                  showAnimation={true}
                />
              </TabsContent>

              <TabsContent value="variables" className="mt-6">
                <Card className="p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Dataset Variables ({dataset.variables.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto custom-scrollbar">
                    {dataset.variables.map((variable, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                        <span className="text-sm font-medium">{variable}</span>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Metadata
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Add to Favorites
              </Button>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={() => {
                  onOpenPlayground(dataset.id);
                  onClose();
                }}
                className="flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                API Playground
              </Button>
              <Button 
                onClick={() => {
                  onOpenQuery(dataset.id);
                  onClose();
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2"
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