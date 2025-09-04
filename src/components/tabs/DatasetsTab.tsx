import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dataset, DATASETS } from "@/data/mockData";
import { DatasetCard } from "@/components/DatasetCard";
import { DatasetModal } from "@/components/DatasetModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  SortAsc, 
  SortDesc, 
  Calendar, 
  Download,
  BookOpen,
  TrendingUp,
  Users,
  Globe,
  BarChart3,
  Star,
  Clock,
  Tag,
  Database
} from "lucide-react";
import DashboardStats from "@/components/DashboardStats";

interface DatasetsTabProps {
  searchQuery: string;
  onOpenQuery: (datasetId: string) => void;
  onOpenPlayground: (datasetId: string) => void;
}

export const DatasetsTab = ({ searchQuery, onOpenQuery, onOpenPlayground }: DatasetsTabProps) => {
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [themeFilter, setThemeFilter] = useState("all");
  const [accessFilter, setAccessFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Use local search if provided, otherwise use prop
  const effectiveSearchQuery = localSearchQuery || searchQuery;

  // Enhanced filtering and sorting
  const { filteredDatasets, categories, themes, accessTypes } = useMemo(() => {
    const categories = [...new Set(DATASETS.map(d => d.theme))];
    const themes = [...new Set(DATASETS.map(d => d.theme))];
    const accessTypes = [...new Set(DATASETS.map(d => d.access))];

    const filtered = DATASETS.filter((dataset) => {
      const matchesSearch = dataset.name.toLowerCase().includes(effectiveSearchQuery.toLowerCase()) ||
                           dataset.desc.toLowerCase().includes(effectiveSearchQuery.toLowerCase()) ||
                           dataset.id.includes(effectiveSearchQuery.toLowerCase());
      const matchesTheme = themeFilter === "all" || dataset.theme === themeFilter;
      const matchesAccess = accessFilter === "all" || dataset.access === accessFilter;
      const matchesCategory = activeCategory === "all" || dataset.theme === activeCategory;
      
      return matchesSearch && matchesTheme && matchesAccess && matchesCategory;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "theme":
          comparison = a.theme.localeCompare(b.theme);
          break;
        case "access":
          comparison = a.access.localeCompare(b.access);
          break;
        case "records":
          comparison = parseInt(a.quick.records.replace(/,/g, '')) - parseInt(b.quick.records.replace(/,/g, ''));
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return { filteredDatasets: filtered, categories, themes, accessTypes };
  }, [effectiveSearchQuery, themeFilter, accessFilter, activeCategory, sortBy, sortOrder]);

  const handleViewDetails = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setIsModalOpen(true);
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Category stats
  const categoryStats = categories.map(category => ({
    name: category,
    count: DATASETS.filter(d => d.theme === category).length,
    icon: getThemeIcon(category)
  }));

  function getThemeIcon(theme: string) {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      "Population": Users,
      "Economic": TrendingUp,
      "Social": Globe,
      "Health": BookOpen,
      "Education": BookOpen,
      "Employment": BarChart3,
      "Housing": BookOpen,
      "Agriculture": BookOpen,
      "Industry": BarChart3,
      "Environment": Globe,
    };
    return iconMap[theme] || Tag;
  }

  return (
    <>
      {/* Dashboard Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DashboardStats />
      </motion.div>

      {/* Enhanced Search and Filters Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-6 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg space-y-6"
      >
        {/* Header with Search */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Dataset Explorer</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredDatasets.length} of {DATASETS.length} datasets
              </p>
            </div>
          </div>
          
          {/* Advanced Search */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative min-w-0 flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700"
                placeholder="Search datasets, descriptions..."
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="bg-white/80 dark:bg-gray-800/80"
              >
                {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleSort}
                className="bg-white/80 dark:bg-gray-800/80 flex items-center gap-1"
              >
                {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                Sort
              </Button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeCategory === "all" 
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All ({DATASETS.length})
          </motion.button>
          {categoryStats.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeCategory === category.name 
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" 
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <IconComponent className="w-3 h-3" />
                {category.name} ({category.count})
              </motion.button>
            );
          })}
        </div>

        {/* Advanced Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Filters:</span>
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-36 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="theme">Theme</SelectItem>
              <SelectItem value="access">Access</SelectItem>
              <SelectItem value="records">Records</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={themeFilter} onValueChange={setThemeFilter}>
            <SelectTrigger className="w-44 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="All themes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All themes</SelectItem>
              {themes.map(theme => (
                <SelectItem key={theme} value={theme}>{theme}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={accessFilter} onValueChange={setAccessFilter}>
            <SelectTrigger className="w-40 bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="All access" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All access</SelectItem>
              {accessTypes.map(access => (
                <SelectItem key={access} value={access}>{access}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          {(themeFilter !== "all" || accessFilter !== "all" || activeCategory !== "all" || localSearchQuery) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setThemeFilter("all");
                setAccessFilter("all");
                setActiveCategory("all");
                setLocalSearchQuery("");
              }}
              className="text-xs bg-white/80 dark:bg-gray-800/80"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Datasets", value: DATASETS.length, icon: Database, color: "blue" },
            { label: "Public Access", value: DATASETS.filter(d => d.access === "public").length, icon: Globe, color: "green" },
            { label: "Premium", value: DATASETS.filter(d => d.access === "premium").length, icon: Star, color: "yellow" },
            { label: "Updated Today", value: 3, icon: Clock, color: "purple" }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`p-3 rounded-lg bg-${stat.color}-50 dark:bg-${stat.color}-900/20 border border-${stat.color}-200 dark:border-${stat.color}-700/50`}
              >
                <div className="flex items-center gap-2">
                  <IconComponent className={`w-4 h-4 text-${stat.color}-600`} />
                  <div>
                    <p className={`text-lg font-bold text-${stat.color}-700 dark:text-${stat.color}-400`}>{stat.value}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dataset Grid/List */}
        <motion.div 
          layout
          className={`${
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "space-y-4"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredDatasets.map((dataset, index) => (
              <motion.div
                key={dataset.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.3,
                  delay: Math.min(index * 0.05, 0.3)
                }}
              >
                <DatasetCard
                  dataset={dataset}
                  onViewDetails={handleViewDetails}
                  onOpenQuery={onOpenQuery}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredDatasets.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No datasets found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search criteria or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setThemeFilter("all");
                setAccessFilter("all");
                setActiveCategory("all");
                setLocalSearchQuery("");
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Reset Filters
            </Button>
          </motion.div>
        )}
      </motion.section>

      <DatasetModal
        dataset={selectedDataset}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpenQuery={onOpenQuery}
        onOpenPlayground={onOpenPlayground}
      />
    </>
  );
};