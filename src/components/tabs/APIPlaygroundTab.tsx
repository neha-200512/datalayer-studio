import { useState, useEffect } from "react";
import { DATASETS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface APIPlaygroundTabProps {
  selectedDatasetId?: string;
}

export const APIPlaygroundTab = ({ selectedDatasetId }: APIPlaygroundTabProps) => {
  const [dataset, setDataset] = useState(selectedDatasetId || "plfs");
  const [version, setVersion] = useState("2022_q3");
  const [filters, setFilters] = useState('{"state":"Maharashtra","gender":"female"}');
  const [groupBy, setGroupBy] = useState("employment_status");
  const [metrics, setMetrics] = useState("count,avg_wage");
  const [requestUrl, setRequestUrl] = useState("");
  const [curlCommand, setCurlCommand] = useState("");
  const [response, setResponse] = useState("Run a request to view JSON...");

  useEffect(() => {
    if (selectedDatasetId) {
      setDataset(selectedDatasetId);
    }
  }, [selectedDatasetId]);

  useEffect(() => {
    buildRequest();
  }, [dataset, version, filters, groupBy, metrics]);

  const buildRequest = () => {
    const params = new URLSearchParams();
    params.set("dataset", dataset);
    params.set("version", version);
    params.set("filters", filters);
    params.set("group_by", groupBy);
    params.set("metrics", metrics);
    
    const url = `/api/v1/query?${params.toString()}`;
    const fullUrl = window.location.origin + url;
    
    setRequestUrl(fullUrl);
    setCurlCommand(`curl -H "Authorization: Bearer <YOUR_API_KEY>" "${fullUrl}"`);
  };

  const runRequest = () => {
    // Generate mock response
    const mockResponse = {
      dataset: dataset,
      version: version,
      group_by: [groupBy],
      metrics: metrics.split(","),
      rows: [
        {
          [groupBy]: "Employed",
          count: 123456,
          avg_wage: 25000
        },
        {
          [groupBy]: "Unemployed", 
          count: 7890,
          avg_wage: null
        },
        {
          [groupBy]: "Out of labour force",
          count: 45123,
          avg_wage: null
        }
      ],
      suppressed: false,
      generated_at: new Date().toISOString(),
      privacy_note: "Cells with n < 10 are suppressed for privacy protection"
    };

    setResponse(JSON.stringify(mockResponse, null, 2));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="mospi-card p-4 space-y-4">
        <h3 className="font-semibold">Build Request</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="mospi-label">Dataset</Label>
            <Select value={dataset} onValueChange={setDataset}>
              <SelectTrigger className="mospi-field">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DATASETS.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="mospi-label">Version</Label>
            <Select value={version} onValueChange={setVersion}>
              <SelectTrigger className="mospi-field">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2021_q4">2021_q4</SelectItem>
                <SelectItem value="2022_q3">2022_q3</SelectItem>
                <SelectItem value="2023_q1">2023_q1</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="mospi-label">Filters (JSON)</Label>
          <Input
            value={filters}
            onChange={(e) => setFilters(e.target.value)}
            className="mospi-field"
            placeholder='{"state":"Maharashtra","gender":"female"}'
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="mospi-label">Group By</Label>
            <Input
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="mospi-field"
              placeholder="employment_status"
            />
          </div>
          
          <div>
            <Label className="mospi-label">Metrics</Label>
            <Input
              value={metrics}
              onChange={(e) => setMetrics(e.target.value)}
              className="mospi-field"
              placeholder="count,avg_wage"
            />
          </div>
        </div>

        <Button onClick={runRequest} className="mospi-btn">
          Run Request
        </Button>

        <div>
          <Label className="mospi-label mb-1">Request URL</Label>
          <div className="mospi-field bg-muted/50 whitespace-pre-wrap break-all text-xs">
            {requestUrl}
          </div>
        </div>

        <div>
          <Label className="mospi-label mb-1">cURL</Label>
          <pre className="bg-slate-900 dark:bg-slate-950 text-slate-100 rounded-xl p-3 text-xs overflow-auto">
            {curlCommand}
          </pre>
        </div>
      </div>

      <div className="mospi-card p-4 space-y-3">
        <h3 className="font-semibold">Response</h3>
        <pre className="bg-slate-900 dark:bg-slate-950 text-slate-100 rounded-xl p-3 text-xs h-[500px] overflow-auto">
          {response}
        </pre>
      </div>
    </div>
  );
};