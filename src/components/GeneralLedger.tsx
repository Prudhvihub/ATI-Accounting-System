
import { BookOpen, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LedgerEntry {
  id: string;
  type: "Revenue" | "Expense";
  amount: number;
  source: string;
  description: string;
  linkedInvoiceId: string;
  date: string;
}

export const GeneralLedger = () => {
  // Mock data - in real app this would sync with Payables/Receivables
  const ledgerEntries: LedgerEntry[] = [
    {
      id: "1",
      type: "Expense",
      amount: 3500.00,
      source: "Tech Solutions Inc.",
      description: "Software licensing fees",
      linkedInvoiceId: "payable-2",
      date: "2024-06-10"
    },
    {
      id: "2",
      type: "Revenue",
      amount: 2750.00,
      source: "XYZ Ltd.",
      description: "Product delivery and setup",
      linkedInvoiceId: "receivable-2",
      date: "2024-06-12"
    },
    {
      id: "3",
      type: "Revenue",
      amount: 1200.00,
      source: "Client ABC",
      description: "Monthly service fee",
      linkedInvoiceId: "receivable-3",
      date: "2024-06-15"
    }
  ];

  const totalRevenues = ledgerEntries
    .filter(entry => entry.type === "Revenue")
    .reduce((sum, entry) => sum + entry.amount, 0);

  const totalExpenses = ledgerEntries
    .filter(entry => entry.type === "Expense")
    .reduce((sum, entry) => sum + entry.amount, 0);

  const netIncome = totalRevenues - totalExpenses;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">General Ledger</h1>
        <p className="text-gray-600">Financial overview and transaction history</p>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenues</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${totalRevenues.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              From receivables marked as paid
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ${totalExpenses.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              From payables marked as paid
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <DollarSign className={`h-4 w-4 ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${netIncome.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Revenue minus expenses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ledger Entries Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Ledger Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Source</th>
                  <th className="text-left py-3 px-4 font-semibold">Description</th>
                  <th className="text-left py-3 px-4 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {ledgerEntries.map((entry) => (
                  <tr key={entry.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{entry.date}</td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={entry.type === "Revenue" ? "default" : "destructive"}
                        className={entry.type === "Revenue" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {entry.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{entry.source}</td>
                    <td className="py-3 px-4">{entry.description}</td>
                    <td className={`py-3 px-4 font-semibold ${
                      entry.type === "Revenue" ? "text-green-600" : "text-red-600"
                    }`}>
                      {entry.type === "Revenue" ? "+" : "-"}${entry.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {ledgerEntries.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No ledger entries yet</p>
              <p className="text-sm">Entries will appear automatically when invoices are marked as paid</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
