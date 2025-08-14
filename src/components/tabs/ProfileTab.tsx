import { useState } from "react";
import { APIKey, generateRandomKey } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Trash2 } from "lucide-react";

export const ProfileTab = () => {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    { label: "Research App", key: "sk_abc123def456ghi789", role: "researcher" },
    { label: "Data Export Tool", key: "sk_xyz789uvw456rst123", role: "analyst" }
  ]);
  const [newKeyName, setNewKeyName] = useState("");
  const [usage] = useState({
    requests: { current: 120, limit: 1000 },
    rows: { current: 820000, limit: 5000000 }
  });

  const createKey = () => {
    if (!newKeyName.trim()) return;
    
    const newKey: APIKey = {
      label: newKeyName,
      key: generateRandomKey(),
      role: "researcher"
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
  };

  const deleteKey = (index: number) => {
    setApiKeys(apiKeys.filter((_, i) => i !== index));
  };

  const copyKey = async (key: string) => {
    await navigator.clipboard.writeText(key);
    // Could add toast notification here
  };

  const requestsPercentage = (usage.requests.current / usage.requests.limit) * 100;
  const rowsPercentage = (usage.rows.current / usage.rows.limit) * 100;

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="mospi-card p-4 space-y-4 lg:col-span-2">
        <h3 className="font-semibold">API Keys</h3>
        
        <div className="flex items-center gap-2">
          <Input
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            className="mospi-field"
            placeholder="Key label (e.g., Research App)"
          />
          <Button onClick={createKey} className="mospi-btn">
            Create Key
          </Button>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="py-2 pr-4">Label</th>
                <th className="py-2 pr-4">Key</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((key, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="py-2 pr-4">{key.label}</td>
                  <td className="py-2 pr-4 font-mono text-xs">{key.key}</td>
                  <td className="py-2 pr-4">{key.role}</td>
                  <td className="py-2 pr-4">
                    <div className="flex items-center gap-1">
                      <Button
                        onClick={() => copyKey(key.key)}
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        onClick={() => deleteKey(index)}
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {apiKeys.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No API keys created yet. Create your first key above.</p>
          </div>
        )}
      </div>

      <div className="mospi-card p-4 space-y-4">
        <h3 className="font-semibold">Usage</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Requests</span>
              <span>{usage.requests.current.toLocaleString()} / {usage.requests.limit.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-2 bg-primary rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, requestsPercentage)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Rows Returned</span>
              <span>{usage.rows.current.toLocaleString()} / 5M</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-2 bg-primary rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, rowsPercentage)}%` }}
              />
            </div>
          </div>
        </div>

        <Button className="mospi-btn w-full mt-4">
          Upgrade to Premium
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Current Plan:</strong> Free Tier</p>
          <p><strong>Resets:</strong> Monthly on the 1st</p>
          <p><strong>Premium benefits:</strong> Unlimited requests, priority support, advanced analytics</p>
        </div>
      </div>
    </div>
  );
};