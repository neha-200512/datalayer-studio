import { Dataset } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Database, FileText, TrendingUp } from "lucide-react";

interface DatasetCardProps {
  dataset: Dataset;
  onViewDetails: (dataset: Dataset) => void;
  onOpenQuery: (datasetId: string) => void;
}

export const DatasetCard = ({ dataset, onViewDetails, onOpenQuery }: DatasetCardProps) => {
  const navigate = useNavigate();
  
  const getAccessBadgeVariant = (access: string) => {
    return access === 'premium' ? 'destructive' : 'secondary';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col gap-4 h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <Database className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight line-clamp-2">
                {dataset.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {dataset.desc}
              </p>
            </div>
          </div>
          <Badge 
            variant={getAccessBadgeVariant(dataset.access)} 
            className={`shrink-0 ${
              dataset.access === 'premium' 
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-0' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0'
            }`}
          >
            {dataset.access}
          </Badge>
        </div>
        
        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>{dataset.variables.length} variables</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>{dataset.versions.length} versions</span>
          </div>
        </div>
        
        {/* Versions */}
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2">
          <span className="font-medium">Versions:</span> {dataset.versions.join(", ")}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto pt-2">
          <Button 
            onClick={() => onViewDetails(dataset)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
            size="sm"
          >
            View Details
          </Button>
          <Button 
            onClick={() => onOpenQuery(dataset.id)}
            variant="outline"
            className="bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"
            size="sm"
          >
            Query
          </Button>
          <Button 
            onClick={() => navigate(`/analysis/${dataset.id}`)}
            variant="outline"
            className="bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"
            size="sm"
          >
            Analysis
          </Button>
        </div>
      </div>
    </motion.div>
  );
};