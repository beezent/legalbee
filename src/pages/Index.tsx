import React, { useState } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { EmergencyButton } from "@/components/emergency/EmergencyButton";
import { DisclaimerBanner } from "@/components/ui/DisclaimerBanner";
import { Header } from "@/components/layout/Header";

const Index = () => {
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Header with Emergency Button */}
      <Header onEmergencyClick={() => setIsEmergencyOpen(true)} />

      {/* Main Chat Interface */}
      <main className="flex-1 flex flex-col min-h-0">
        <ChatInterface />
      </main>

      {/* Emergency Modal */}
      <EmergencyButton
        isOpen={isEmergencyOpen}
        onOpenChange={setIsEmergencyOpen}
      />
    </div>
  );
};

export default Index;
