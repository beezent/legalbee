import React from 'react';
import { Settings, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import legalBeeLogo from '@/assets/legal-bee-logo.png';

interface HeaderProps {
  onEmergencyClick?: () => void;
}

export const Header = ({ onEmergencyClick }: HeaderProps) => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10">
            <img 
              src={legalBeeLogo} 
              alt="Legal Bee Logo" 
              className="h-8 w-8 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">LEGAL BEE</h1>
            <p className="text-xs text-muted-foreground">AI Legal Assistant</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            onClick={onEmergencyClick}
            variant="outline"
            size="icon"
            className="border-emergency/20 hover:bg-emergency/5 animate-pulse-glow"
          >
            <AlertTriangle className="h-4 w-4 text-emergency" />
          </Button>
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            className="border-primary/20 hover:bg-primary/5"
          >
            <Settings className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </div>
    </header>
  );
};