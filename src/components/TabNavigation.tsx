interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs = [
    { id: 'datasets', label: 'Datasets' },
    { id: 'query', label: 'Query Builder' },
    { id: 'playground', label: 'API Playground' },
    { id: 'profile', label: 'Profile / API Keys' },
    { id: 'admin', label: 'Admin (Demo)' },
  ];

  return (
    <nav className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`mospi-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};