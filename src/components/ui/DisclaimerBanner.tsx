import React, { useState } from 'react';
import { X, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const DisclaimerBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Alert className="warning-banner rounded-none border-0 border-b">
      <Scale className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-sm">
          <strong>Legal Disclaimer:</strong> LEGAL BEE is an AI legal assistant that provides general information. 
          It is not a substitute for professional legal advice from a qualified lawyer.
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="h-auto p-1 hover:bg-warning-foreground/10"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};