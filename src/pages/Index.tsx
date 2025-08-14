import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TabNavigation } from "@/components/TabNavigation";
import { DatasetsTab } from "@/components/tabs/DatasetsTab";
import { QueryBuilderTab } from "@/components/tabs/QueryBuilderTab";
import { APIPlaygroundTab } from "@/components/tabs/APIPlaygroundTab";
import { ProfileTab } from "@/components/tabs/ProfileTab";
import { AdminTab } from "@/components/tabs/AdminTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState("datasets");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>();

  // Initialize theme
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setDarkMode(shouldUseDark);
    if (shouldUseDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleThemeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  const handleOpenQuery = (datasetId: string) => {
    setSelectedDatasetId(datasetId);
    setActiveTab("query");
  };

  const handleOpenPlayground = (datasetId: string) => {
    setSelectedDatasetId(datasetId);
    setActiveTab("playground");
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "datasets":
        return (
          <DatasetsTab
            searchQuery={searchQuery}
            onOpenQuery={handleOpenQuery}
            onOpenPlayground={handleOpenPlayground}
          />
        );
      case "query":
        return <QueryBuilderTab selectedDatasetId={selectedDatasetId} />;
      case "playground":
        return <APIPlaygroundTab selectedDatasetId={selectedDatasetId} />;
      case "profile":
        return <ProfileTab />;
      case "admin":
        return <AdminTab />;
      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        darkMode={darkMode}
        onThemeToggle={handleThemeToggle}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderActiveTab()}
      </main>
    </div>
  );
};

export default Index;