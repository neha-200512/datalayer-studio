import { useState, useEffect } from "react";
import { DATASETS, STATES, EMPLOYMENT_STATUS_OPTIONS, SECTOR_OPTIONS, EDUCATION_OPTIONS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, RotateCcw, Download, Copy, BarChart3, TrendingUp, Filter } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface QueryBuilderTabProps {
  selectedDatasetId?: string;
}

interface QueryResult {
  group: string;
  value: number | string;
}

export const QueryBuilderTab = ({ selectedDatasetId }: QueryBuilderTabProps) => {
  const [dataset, setDataset] = useState(selectedDatasetId || "plfs");
  const [state, setState] = useState("all");
  const [gender, setGender] = useState("all");
  const [age, setAge] = useState("all");
  const [year, setYear] = useState("all");
  const [groupBy, setGroupBy] = useState("employment_status");
  const [metric, setMetric] = useState("count");
  const [results, setResults] = useState<QueryResult[]>([]);
  const [apiUrl, setApiUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedDatasetId) {
      setDataset(selectedDatasetId);
    }
  }, [selectedDatasetId]);

  const buildApiUrl = () => {
    const params = new URLSearchParams();
    params.set("dataset", dataset);
    params.set("version", "2022_q3");
    
    const filters: Record<string, string> = {};
    if (state && state !== "all") filters.state = state;
    if (gender && gender !== "all") filters.gender = gender;
    if (age && age !== "all") filters.age = age;
    if (year && year !== "all") filters.year = year;
    
    params.set("filters", JSON.stringify(filters));
    params.set("group_by", groupBy);
    params.set("metrics", metric);
    
    return `/api/v1/query?${params.toString()}`;
  };

  const runQuery = async () => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock data based on groupBy selection
    const categories = 
      groupBy === "employment_status" ? EMPLOYMENT_STATUS_OPTIONS :
      groupBy === "sector" ? SECTOR_OPTIONS :
      EDUCATION_OPTIONS;

    const mockResults: QueryResult[] = categories.map((category) => ({
      group: category,
      value: Math.floor(Math.random() * 50000) + (metric === "count" ? 0 : 10000),
    }));

    // Apply privacy suppression (< 10 rule)
    mockResults.forEach((result) => {
      if (typeof result.value === 'number' && result.value < 10) {
        result.value = "<10";
      }
    });

    setResults(mockResults);
    setApiUrl(window.location.origin + buildApiUrl());
    setIsLoading(false);
  };

  const resetQuery = () => {
    setState("all");
    setGender("all");
    setAge("all");
    setYear("all");
    setGroupBy("employment_status");
    setMetric("count");
    setResults([]);
    setApiUrl("");
  };

  const exportCSV = () => {
    const csvContent = [
      ["Group", "Value"],
      ...results.map(r => [r.group, r.value])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "query_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyApiUrl = async () => {
    if (apiUrl) {
      await navigator.clipboard.writeText(apiUrl);
      // Could add toast notification here
    }
  };

  const colors = [
    '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', 
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
  ];

  const chartData = {
    labels: results.map(r => r.group),
    datasets: [
      {
        label: metric,
        data: results.map(r => typeof r.value === 'number' ? r.value : 0),
        backgroundColor: results.map((_, index) => colors[index % colors.length]),
        borderColor: results.map((_, index) => colors[index % colors.length]),
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    }
  };

  const activeFilters = [
    state !== "all" && { label: "State", value: state },
    gender !== "all" && { label: "Gender", value: gender },
    age !== "all" && { label: "Age", value: age },
    year !== "all" && { label: "Year", value: year },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Data Query Builder
              </h1>
              <p className="text-muted-foreground text-lg">Build powerful queries and visualize your data with interactive charts</p>
            </div>
          </div>
          
          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="animate-scale-in">
                  {filter.label}: {filter.value}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Dataset Selection */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 hover-scale">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Dataset
                </CardTitle>
                <CardDescription>Choose your data source</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={dataset} onValueChange={setDataset}>
                  <SelectTrigger className="border-2 hover:border-primary/50 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DATASETS.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="hover-scale">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  Filters
                </CardTitle>
                <CardDescription>Narrow down your data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">State</Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger className="border-2 hover:border-primary/50 transition-colors">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any</SelectItem>
                        {STATES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger className="border-2 hover:border-primary/50 transition-colors">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Age Band</Label>
                    <Select value={age} onValueChange={setAge}>
                      <SelectTrigger className="border-2 hover:border-primary/50 transition-colors">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any</SelectItem>
                        <SelectItem value="15-29">15-29</SelectItem>
                        <SelectItem value="30-44">30-44</SelectItem>
                        <SelectItem value="45-59">45-59</SelectItem>
                        <SelectItem value="60+">60+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Year</Label>
                    <Select value={year} onValueChange={setYear}>
                      <SelectTrigger className="border-2 hover:border-primary/50 transition-colors">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Query Options */}
            <Card className="hover-scale">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Query Options</CardTitle>
                <CardDescription>Configure your analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Group By</Label>
                    <Select value={groupBy} onValueChange={setGroupBy}>
                      <SelectTrigger className="border-2 hover:border-primary/50 transition-colors">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employment_status">Employment Status</SelectItem>
                        <SelectItem value="sector">Sector</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Metric</Label>
                    <Select value={metric} onValueChange={setMetric}>
                      <SelectTrigger className="border-2 hover:border-primary/50 transition-colors">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="count">Count</SelectItem>
                        <SelectItem value="avg_wage">Average Wage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button 
                    onClick={runQuery} 
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Running...
                      </div>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Run Query
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={resetQuery} 
                    variant="outline" 
                    className="border-2 hover:bg-muted/50 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                <div className="bg-muted/30 rounded-lg p-3 border-l-4 border-primary/50">
                  <p className="text-xs text-muted-foreground">
                    <strong>Privacy Notice:</strong> Cells with n &lt; 10 will be suppressed for data protection.
                  </p>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Enhanced Results Section */}
          <section className="lg:col-span-3 space-y-6">
            {/* Results Table */}
            <Card className="hover-scale">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Query Results
                    </CardTitle>
                    <CardDescription>
                      {results.length > 0 ? `${results.length} results found` : 'No results yet'}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={exportCSV} 
                      variant="outline" 
                      size="sm"
                      disabled={results.length === 0}
                      className="border-2 hover:bg-muted/50 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button 
                      onClick={copyApiUrl} 
                      variant="outline" 
                      size="sm"
                      disabled={!apiUrl}
                      className="border-2 hover:bg-muted/50 transition-colors"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy API URL
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {results.length > 0 ? (
                  <div className="overflow-auto rounded-lg border">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-4 font-semibold">Group</th>
                          <th className="text-left p-4 font-semibold">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((result, index) => (
                          <tr 
                            key={index} 
                            className="border-t hover:bg-muted/20 transition-colors animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <td className="p-4 font-medium">{result.group}</td>
                            <td className="p-4">
                              <Badge variant="secondary" className="font-mono">
                                {result.value}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No results yet</p>
                    <p>Run a query to see your data visualization</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Charts */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 hover-scale">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Data Visualization
                </CardTitle>
                <CardDescription>
                  Interactive charts to explore your data patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results.length > 0 ? (
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-950 dark:to-blue-900 dark:border-blue-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-center text-blue-700 dark:text-blue-300">
                          Bar Chart
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-56 p-2">
                          <Bar data={chartData} options={chartOptions} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-950 dark:to-purple-900 dark:border-purple-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-center text-purple-700 dark:text-purple-300">
                          Pie Chart
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-56 p-2">
                          <Pie data={chartData} options={{...chartOptions, scales: undefined}} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-950 dark:to-green-900 dark:border-green-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-center text-green-700 dark:text-green-300">
                          Line Chart
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-56 p-2">
                          <Line data={chartData} options={chartOptions} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">Charts will appear here</p>
                      <p>Run a query to generate beautiful visualizations</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};