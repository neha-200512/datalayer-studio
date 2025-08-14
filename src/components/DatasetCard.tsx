import { Dataset } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DatasetCardProps {
  dataset: Dataset;
  onViewDetails: (dataset: Dataset) => void;
  onOpenQuery: (datasetId: string) => void;
}

export const DatasetCard = ({ dataset, onViewDetails, onOpenQuery }: DatasetCardProps) => {
  const getAccessBadgeVariant = (access: string) => {
    return access === 'premium' ? 'destructive' : 'secondary';
  };

  return (
    <div className="mospi-card p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="font-semibold text-card-foreground">{dataset.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">{dataset.desc}</p>
        </div>
        <Badge variant={getAccessBadgeVariant(dataset.access)} className="mospi-chip">
          {dataset.access}
        </Badge>
      </div>
      
      <div className="text-xs text-muted-foreground">
        Versions: {dataset.versions.join(", ")}
      </div>
      
      <div className="flex items-center gap-2 mt-1">
        <Button 
          onClick={() => onViewDetails(dataset)}
          className="mospi-btn"
          size="sm"
        >
          View Details
        </Button>
        <Button 
          onClick={() => onOpenQuery(dataset.id)}
          variant="outline"
          className="mospi-btn-secondary"
          size="sm"
        >
          Query
        </Button>
      </div>
    </div>
  );
};