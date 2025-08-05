
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { AccountsPayable } from "@/components/AccountsPayable";
import { AccountsReceivable } from "@/components/AccountsReceivable";
import { GeneralLedger } from "@/components/GeneralLedger";

const Index = () => {
  const [activeModule, setActiveModule] = useState("payable");

  const renderActiveModule = () => {
    switch (activeModule) {
      case "payable":
        return <AccountsPayable />;
      case "receivable":
        return <AccountsReceivable />;
      case "ledger":
        return <GeneralLedger />;
      default:
        return <AccountsPayable />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {renderActiveModule()}
        </div>
      </main>
    </div>
  );
};

export default Index;
