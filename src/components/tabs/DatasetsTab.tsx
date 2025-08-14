import { useState } from "react";
import { Dataset, DATASETS } from "@/data/mockData";
import { DatasetCard } from "@/components/DatasetCard";
import { DatasetModal } from "@/components/DatasetModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const filteredDatasets = DATASETS.filter((dataset) => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.id.includes(searchQuery.toLowerCase());
    const matchesTheme = themeFilter === "all" || dataset.theme === themeFilter;
    const matchesAccess = accessFilter === "all" || dataset.access === accessFilter;
    
    return matchesSearch && matchesTheme && matchesAccess;
  });

  const handleViewDetails = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setIsModalOpen(true);
  };

  const themes = [...new Set(DATASETS.map(d => d.theme))];
  const accessTypes = [...new Set(DATASETS.map(d => d.access))];

  return (
    <>
      <section className="mospi-card p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Available Datasets</h2>
          <div className="flex items-center gap-2">
            <Select value={themeFilter} onValueChange={setThemeFilter}>
              <SelectTrigger className="w-44 mospi-field">
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
              <SelectTrigger className="w-40 mospi-field">
                <SelectValue placeholder="All access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All access</SelectItem>
                {accessTypes.map(access => (
                  <SelectItem key={access} value={access}>{access}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDatasets.map((dataset) => (
            <DatasetCard
              key={dataset.id}
              dataset={dataset}
              onViewDetails={handleViewDetails}
              onOpenQuery={onOpenQuery}
            />
          ))}
        </div>

        {filteredDatasets.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No datasets found matching your criteria.</p>
          </div>
        )}
      </section>

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