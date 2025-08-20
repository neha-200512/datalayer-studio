import { useState } from "react";
import { Search, Sun, Moon, Download, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  darkMode: boolean;
  onThemeToggle: () => void;
}

export const Header = ({ searchQuery, onSearchChange, darkMode, onThemeToggle }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 grid place-content-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
            μ
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold">
              MoSPI Microdata Portal
            </h1>
            <p className="text-xs text-muted-foreground">Query · Visualize · Export</p>
          </div>
        </div>
        
        <div className="flex-1"></div>
        
        <div className="hidden sm:flex items-center gap-2">
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="mospi-field pl-9 w-72"
              placeholder="Search datasets..."
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onThemeToggle}
            className="mospi-btn-secondary"
            title="Toggle theme"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          
          <Button className="mospi-btn">
            Sign in
          </Button>
        </div>
      </div>
    </header>
  );
};