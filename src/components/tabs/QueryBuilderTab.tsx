import { useState, useEffect } from "react";
import { DATASETS, STATES, EMPLOYMENT_STATUS_OPTIONS, SECTOR_OPTIONS, EDUCATION_OPTIONS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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

  const runQuery = () => {
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

  const chartData = {
    labels: results.map(r => r.group),
    datasets: [
      {
        label: metric,
        data: results.map(r => typeof r.value === 'number' ? r.value : 0),
        backgroundColor: 'hsl(var(--primary) / 0.8)',
        borderColor: 'hsl(var(--primary))',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* Sidebar */}
      <aside className="mospi-card p-4 space-y-4 lg:col-span-1 h-fit">
        <div>
          <Label className="mospi-label">Dataset</Label>
          <Select value={dataset} onValueChange={setDataset}>
            <SelectTrigger className="mospi-field">
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
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="mospi-label">State</Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger className="mospi-field">
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
            <Label className="mospi-label">Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="mospi-field">
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
            <Label className="mospi-label">Age Band</Label>
            <Select value={age} onValueChange={setAge}>
              <SelectTrigger className="mospi-field">
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
            <Label className="mospi-label">Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="mospi-field">
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

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="mospi-label">Group By</Label>
            <Select value={groupBy} onValueChange={setGroupBy}>
              <SelectTrigger className="mospi-field">
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
            <Label className="mospi-label">Metric</Label>
            <Select value={metric} onValueChange={setMetric}>
              <SelectTrigger className="mospi-field">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="count">Count</SelectItem>
                <SelectItem value="avg_wage">Average Wage</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={runQuery} className="mospi-btn">
            Run Query
          </Button>
          <Button onClick={resetQuery} variant="outline" className="mospi-btn-secondary">
            Reset
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Privacy: cells with n &lt; 10 will be suppressed.
        </p>
      </aside>

      {/* Results */}
      <section className="lg:col-span-2 space-y-4">
        <div className="mospi-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Results</h3>
            <div className="flex items-center gap-2">
              <Button onClick={exportCSV} variant="outline" className="mospi-btn-secondary" disabled={results.length === 0}>
                Export CSV
              </Button>
              <Button onClick={copyApiUrl} variant="outline" className="mospi-btn-secondary" disabled={!apiUrl}>
                Copy API URL
              </Button>
            </div>
          </div>

          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-border">
                  <th className="py-2 pr-4">Group</th>
                  <th className="py-2 pr-4">Value</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-2 pr-4">{result.group}</td>
                    <td className="py-2 pr-4">{result.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Run a query to see results</p>
            </div>
          )}
        </div>

        <div className="mospi-card p-4">
          <h3 className="font-semibold mb-2">Chart</h3>
          <div className="h-64">
            {results.length > 0 ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <p>Chart will appear here after running a query</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};