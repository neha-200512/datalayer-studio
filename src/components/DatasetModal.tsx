import { Dataset } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X } from "lucide-react";

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
  if (!dataset) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl mospi-card">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">{dataset.name}</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            {dataset.desc}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 grid sm:grid-cols-2 gap-6">
          <div>
            <p className="mospi-label mb-2">Variables (sample)</p>
            <ul className="text-sm space-y-1">
              {dataset.variables.slice(0, 6).map((variable, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-primary/60 rounded-full mr-2 flex-shrink-0"></span>
                  {variable}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <p className="mospi-label mb-2">Quick Stats</p>
            <ul className="text-sm space-y-1">
              <li className="flex justify-between">
                <span>Records:</span>
                <span className="font-medium">{dataset.quick.records}</span>
              </li>
              <li className="flex justify-between">
                <span>Last updated:</span>
                <span className="font-medium">{dataset.quick.updated}</span>
              </li>
              <li className="flex justify-between">
                <span>Access:</span>
                <span className={`font-medium ${dataset.access === 'premium' ? 'text-destructive' : 'text-primary'}`}>
                  {dataset.access}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 flex items-center gap-2">
          <Button 
            className="mospi-btn"
            onClick={() => {
              onOpenQuery(dataset.id);
              onClose();
            }}
          >
            Open in Query Builder
          </Button>
          <Button 
            variant="outline"
            className="mospi-btn-secondary"
            onClick={() => {
              onOpenPlayground(dataset.id);
              onClose();
            }}
          >
            Open in API Playground
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};