import React, { useState } from 'react';
import { AlertTriangle, X, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';

interface EmergencyContact {
  label: string;
  number: string;
  link?: string;
}

const emergencyContacts: EmergencyContact[] = [
  { 
    label: "ন্যাশনাল ইমার্জেন্সি সার্ভিস", 
    number: "999", 
    link: "https://nhd.gov.bd/" 
  },
  { 
    label: "৩৩৩ কল সেন্টার", 
    number: "333" 
  },
  { 
    label: "অ্যাম্বুলেন্স সার্ভিস", 
    number: "16263", 
    link: "http://16263.dghs.gov.bd/ambulance/" 
  },
  { 
    label: "নারী ও শিশু নির্যাতন প্রতিরোধ", 
    number: "109", 
    link: "https://mowca.gov.bd/" 
  },
  { 
    label: "জাতীয় মানবাধিকার কমিশন", 
    number: "16108", 
    link: "http://www.nhrc.org.bd/" 
  },
  { 
    label: "দুর্নীতি দমন কমিশন", 
    number: "106", 
    link: "http://acc.org.bd/" 
  }
];

interface EmergencyButtonProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EmergencyButton = ({ isOpen, onOpenChange }: EmergencyButtonProps) => {

  const handleCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleWebsite = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Emergency Modal */}
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="w-[95vw] max-w-md mx-auto max-h-[85vh] overflow-y-auto">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-base sm:text-lg font-semibold text-emergency flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              জরুরী সেবার হটলাইন নাম্বার
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-2">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="border-emergency/20">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm sm:text-base leading-tight mb-1">{contact.label}</h3>
                      <p className="text-xl sm:text-2xl font-bold text-emergency">
                        {contact.number}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        onClick={() => handleCall(contact.number)}
                        className="bg-emergency hover:bg-emergency/90 text-emergency-foreground h-9 px-3 text-sm font-medium"
                      >
                        <Phone className="h-4 w-4 mr-1 flex-shrink-0" />
                        Call
                      </Button>

                      {contact.link && (
                        <Button
                          onClick={() => handleWebsite(contact.link!)}
                          variant="outline"
                          size="icon"
                          className="border-emergency/20 text-emergency hover:bg-emergency/5 h-9 w-9 flex-shrink-0"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-3 bg-warning rounded-lg">
            <p className="text-sm text-warning-foreground">
              <strong>বিশেষ দ্রষ্টব্য:</strong> এই নম্বরগুলো শুধুমাত্র জরুরী অবস্থায় ব্যবহার করুন। 
              অপ্রয়োজনীয় কল থেকে বিরত থাকুন।
            </p>
          </div>
          
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-full mt-4"
          >
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
