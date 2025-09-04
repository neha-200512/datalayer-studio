import { useState } from "react";
import { Search, Sun, Moon, Download, CreditCard, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  darkMode: boolean;
  onThemeToggle: () => void;
}

export const Header = ({ searchQuery, onSearchChange, darkMode, onThemeToggle }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="h-10 w-10 grid place-content-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MoSPI Microdata Portal
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">Query · Visualize · Export</p>
          </div>
        </motion.div>
        
        <div className="flex-1"></div>
        
        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Search */}
          <motion.div 
            className="relative"
            initial={{ width: 200 }}
            whileFocus={{ width: 280 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 focus:bg-white dark:focus:bg-gray-800 transition-all duration-200"
              placeholder="Search datasets..."
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          </motion.div>
          
          {/* Theme Toggle */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={onThemeToggle}
              className="p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800"
              title="Toggle theme"
              aria-label="Toggle dark mode"
            >
              {darkMode ? 
                <Sun className="w-4 h-4 text-yellow-500" /> : 
                <Moon className="w-4 h-4 text-blue-600" />
              }
            </Button>
          </motion.div>
          
          {/* Sign In Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
              Sign in
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};