import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DATASETS } from "@/data/mockData";
import { Download, FileText, Database, Code } from "lucide-react";

const Downloads = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("csv");
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    state: "",
    year: "",
    gender: ""
  });

  const handleThemeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  const dataset = DATASETS.find(d => d.id === selectedDataset);

  const handleVariableToggle = (variable: string) => {
    setSelectedVariables(prev => 
      prev.includes(variable) 
        ? prev.filter(v => v !== variable)
        : [...prev, variable]
    );
  };

  const handleSelectAll = () => {
    if (dataset) {
      setSelectedVariables(
        selectedVariables.length === dataset.variables.length 
          ? [] 
          : [...dataset.variables]
      );
    }
  };

  const generateDownloadUrl = () => {
    const params = new URLSearchParams();
    params.set('dataset', selectedDataset);
    params.set('version', selectedVersion);
    params.set('format', selectedFormat);
    if (selectedVariables.length > 0) {
      params.set('variables', selectedVariables.join(','));
    }
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    return `/api/v1/download?${params.toString()}`;
  };

  const generateApiUrl = () => {
    const params = new URLSearchParams();
    params.set('dataset', selectedDataset);
    params.set('version', selectedVersion);
    if (selectedVariables.length > 0) {
      params.set('fields', selectedVariables.join(','));
    }
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    return `/api/v1/data?${params.toString()}`;
  };

  const formatOptions = [
    { value: "csv", label: "CSV", icon: FileText, description: "Comma-separated values" },
    { value: "json", label: "JSON", icon: Code, description: "JavaScript Object Notation" },
    { value: "parquet", label: "Parquet", icon: Database, description: "Columnar storage format" },
    { value: "excel", label: "Excel", icon: FileText, description: "Microsoft Excel format" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        darkMode={darkMode}
        onThemeToggle={handleThemeToggle}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dataset Downloads</h1>
            <p className="text-muted-foreground">Download datasets in various formats or generate API endpoints</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="mospi-card p-4">
              <h3 className="font-semibold mb-4">Dataset Selection</h3>
              <div className="space-y-3">
                <div>
                  <label className="mospi-label">Dataset</label>
                  <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                    <SelectTrigger className="mospi-field">
                      <SelectValue placeholder="Select dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      {DATASETS.map((dataset) => (
                        <SelectItem key={dataset.id} value={dataset.id}>
                          <div className="flex items-center gap-2">
                            {dataset.name}
                            <Badge variant={dataset.access === 'premium' ? 'destructive' : 'secondary'} className="text-xs">
                              {dataset.access}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {dataset && (
                  <div>
                    <label className="mospi-label">Version</label>
                    <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                      <SelectTrigger className="mospi-field">
                        <SelectValue placeholder="Select version" />
                      </SelectTrigger>
                      <SelectContent>
                        {dataset.versions.map((version) => (
                          <SelectItem key={version} value={version}>
                            {version}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </Card>

            <Card className="mospi-card p-4">
              <h3 className="font-semibold mb-4">Format Selection</h3>
              <div className="space-y-2">
                {formatOptions.map((format) => {
                  const Icon = format.icon;
                  return (
                    <div 
                      key={format.value}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedFormat === format.value 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedFormat(format.value)}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <div>
                          <p className="font-medium">{format.label}</p>
                          <p className="text-xs text-muted-foreground">{format.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Variables and Filters */}
          <div className="lg:col-span-2 space-y-4">
            {dataset && (
              <>
                <Card className="mospi-card p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Select Variables</h3>
                    <Button variant="outline" size="sm" onClick={handleSelectAll}>
                      {selectedVariables.length === dataset.variables.length ? 'Deselect All' : 'Select All'}
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {dataset.variables.map((variable) => (
                      <div key={variable} className="flex items-center space-x-2">
                        <Checkbox
                          id={variable}
                          checked={selectedVariables.includes(variable)}
                          onCheckedChange={() => handleVariableToggle(variable)}
                        />
                        <label htmlFor={variable} className="text-sm font-medium cursor-pointer">
                          {variable}
                        </label>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="mospi-card p-4">
                  <h3 className="font-semibold mb-4">Filters (Optional)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="mospi-label">State</label>
                      <Select value={filters.state} onValueChange={(value) => setFilters(prev => ({ ...prev, state: value }))}>
                        <SelectTrigger className="mospi-field">
                          <SelectValue placeholder="Any state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any state</SelectItem>
                          <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="Delhi">Delhi</SelectItem>
                          <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="mospi-label">Year</label>
                      <Select value={filters.year} onValueChange={(value) => setFilters(prev => ({ ...prev, year: value }))}>
                        <SelectTrigger className="mospi-field">
                          <SelectValue placeholder="Any year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any year</SelectItem>
                          <SelectItem value="2021">2021</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="mospi-label">Gender</label>
                      <Select value={filters.gender} onValueChange={(value) => setFilters(prev => ({ ...prev, gender: value }))}>
                        <SelectTrigger className="mospi-field">
                          <SelectValue placeholder="Any gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any gender</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>

                <Card className="mospi-card p-4">
                  <h3 className="font-semibold mb-4">Download & API</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Button 
                        className="mospi-btn"
                        disabled={!selectedDataset || !selectedVersion}
                        onClick={() => {
                          const url = generateDownloadUrl();
                          console.log('Download URL:', url);
                          // In real app, this would trigger download
                          alert(`Download would start for: ${url}`);
                        }}
                      >
                        <Download className="w-4 h-4" />
                        Download {selectedFormat.toUpperCase()}
                      </Button>
                      {dataset.access === 'premium' && (
                        <Badge variant="destructive">Premium Required</Badge>
                      )}
                    </div>
                    
                    <div>
                      <label className="mospi-label">API Endpoint (JSON)</label>
                      <div className="bg-muted p-3 rounded-lg text-sm font-mono">
                        {selectedDataset && selectedVersion ? generateApiUrl() : 'Select dataset and version to generate API URL'}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        disabled={!selectedDataset || !selectedVersion}
                        onClick={() => {
                          const url = generateApiUrl();
                          navigator.clipboard.writeText(window.location.origin + url);
                          alert('API URL copied to clipboard!');
                        }}
                      >
                        Copy API URL
                      </Button>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Downloads;