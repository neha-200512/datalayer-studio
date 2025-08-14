import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AdminTab = () => {
  const [surveyId, setSurveyId] = useState("plfs");
  const [version, setVersion] = useState("2022_q3");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [logs, setLogs] = useState<string[]>(["System initialized.", "No recent activity."]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const simulateIngestion = () => {
    if (!surveyId || !version) {
      addLog("❌ Error: Survey ID and Version are required");
      return;
    }

    const timestamp = new Date().toLocaleTimeString();
    addLog(`🚀 [${timestamp}] Starting ingestion for ${surveyId} v${version}`);
    
    setTimeout(() => {
      addLog(`📊 [${timestamp}] Validating data schema...`);
    }, 1000);
    
    setTimeout(() => {
      addLog(`🔄 [${timestamp}] Processing ${selectedFile?.name || 'uploaded file'}...`);
    }, 2000);
    
    setTimeout(() => {
      addLog(`✅ [${timestamp}] Ingestion completed successfully`);
      addLog(`📈 [${timestamp}] Added ${Math.floor(Math.random() * 100000 + 50000)} records`);
    }, 3500);
  };

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-4), message]);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="mospi-card p-4 space-y-4 lg:col-span-2">
        <h3 className="font-semibold">Ingest Dataset (Demo)</h3>
        
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <Label className="mospi-label">Survey ID</Label>
            <Input
              value={surveyId}
              onChange={(e) => setSurveyId(e.target.value)}
              className="mospi-field"
              placeholder="plfs"
            />
          </div>
          
          <div>
            <Label className="mospi-label">Version</Label>
            <Input
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="mospi-field"
              placeholder="2022_q3"
            />
          </div>
        </div>

        <div>
          <Label className="mospi-label">Upload File</Label>
          <Input
            type="file"
            onChange={handleFileChange}
            className="mospi-field"
            accept=".csv,.xlsx,.json"
          />
          {selectedFile && (
            <p className="text-xs text-muted-foreground mt-1">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        <Button onClick={simulateIngestion} className="mospi-btn">
          Simulate Ingestion
        </Button>

        <div className="bg-muted/30 rounded-lg p-3">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> This HTML demo does not upload anywhere. In the real app, this
            triggers a server-side ETL job that:
          </p>
          <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc pl-4">
            <li>Validates data schema and format</li>
            <li>Applies privacy protection rules</li>
            <li>Creates database tables and indexes</li>
            <li>Generates metadata and documentation</li>
            <li>Updates the API endpoints</li>
          </ul>
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="font-medium mb-2">Data Processing Pipeline</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-primary/5 border border-primary/20 rounded p-2">
              <div className="font-medium">1. Validation</div>
              <div className="text-muted-foreground">Schema check, data types, constraints</div>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded p-2">
              <div className="font-medium">2. Privacy</div>
              <div className="text-muted-foreground">Apply suppression rules, anonymization</div>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded p-2">
              <div className="font-medium">3. Deployment</div>
              <div className="text-muted-foreground">Update database, refresh API</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mospi-card p-4 space-y-3">
        <h3 className="font-semibold">System Logs</h3>
        <div className="bg-slate-900 dark:bg-slate-950 text-slate-100 rounded-lg p-3 h-64 overflow-y-auto">
          <div className="space-y-1 text-xs font-mono">
            {logs.map((log, index) => (
              <div key={index} className="whitespace-pre-wrap">
                {log}
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-3 border-t border-border">
          <h4 className="font-medium text-sm mb-2">Quick Actions</h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full mospi-btn-secondary"
              onClick={() => addLog(`🔍 [${new Date().toLocaleTimeString()}] System health check initiated`)}
            >
              Run Health Check
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full mospi-btn-secondary"
              onClick={() => setLogs(["System logs cleared."])}
            >
              Clear Logs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};