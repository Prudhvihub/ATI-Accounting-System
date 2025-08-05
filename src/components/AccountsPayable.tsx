
import { useState } from "react";
import { Plus, FileText, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Payable {
  id: string;
  vendor: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  description: string;
  status: "Pending" | "Paid";
  createdBy: string;
  approvedBy?: string;
  date: string;
}

export const AccountsPayable = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [payables, setPayables] = useState<Payable[]>([
    {
      id: "1",
      vendor: "Office Supplies Co.",
      invoiceNumber: "INV-001",
      amount: 1250.00,
      dueDate: "2024-07-15",
      description: "Office supplies and stationery",
      status: "Pending",
      createdBy: "John Doe",
      date: "2024-06-16"
    },
    {
      id: "2", 
      vendor: "Tech Solutions Inc.",
      invoiceNumber: "INV-002",
      amount: 3500.00,
      dueDate: "2024-07-20",
      description: "Software licensing fees",
      status: "Paid",
      createdBy: "Jane Smith",
      approvedBy: "Manager",
      date: "2024-06-10"
    }
  ]);

  const [formData, setFormData] = useState({
    vendor: "",
    invoiceNumber: "",
    amount: "",
    dueDate: "",
    description: "",
    status: "Pending",
    createdBy: "",
    approvedBy: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPayable: Payable = {
      id: Date.now().toString(),
      vendor: formData.vendor,
      invoiceNumber: formData.invoiceNumber,
      amount: parseFloat(formData.amount),
      dueDate: formData.dueDate,
      description: formData.description,
      status: formData.status as "Pending" | "Paid",
      createdBy: formData.createdBy,
      approvedBy: formData.approvedBy || undefined,
      date: new Date().toISOString().split('T')[0]
    };

    setPayables([...payables, newPayable]);
    setFormData({
      vendor: "",
      invoiceNumber: "",
      amount: "",
      dueDate: "",
      description: "",
      status: "Pending",
      createdBy: "",
      approvedBy: ""
    });
    setShowForm(false);
    
    toast({
      title: "Success",
      description: "Payable invoice added successfully",
    });
  };

  const markAsPaid = (id: string) => {
    setPayables(payables.map(payable => 
      payable.id === id 
        ? { ...payable, status: "Paid" as const, approvedBy: "System" }
        : payable
    ));
    
    toast({
      title: "Status Updated",
      description: "Invoice marked as paid and added to General Ledger",
    });
  };

  const deletePayable = (id: string) => {
    setPayables(payables.filter(payable => payable.id !== id));
    
    toast({
      title: "Deleted",
      description: "Invoice deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounts Payable</h1>
          <p className="text-gray-600">Manage vendor invoices and payments</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Invoice
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Add New Payable Invoice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vendor">Vendor</Label>
                <Input
                  id="vendor"
                  value={formData.vendor}
                  onChange={(e) => setFormData({...formData, vendor: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="createdBy">Created By</Label>
                <Input
                  id="createdBy"
                  value={formData.createdBy}
                  onChange={(e) => setFormData({...formData, createdBy: e.target.value})}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div className="md:col-span-2 flex space-x-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Add Invoice
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Payable Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Vendor</th>
                  <th className="text-left py-3 px-4 font-semibold">Invoice #</th>
                  <th className="text-left py-3 px-4 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold">Due Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payables.map((payable) => (
                  <tr key={payable.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{payable.vendor}</td>
                    <td className="py-3 px-4">{payable.invoiceNumber}</td>
                    <td className="py-3 px-4">${payable.amount.toFixed(2)}</td>
                    <td className="py-3 px-4">{payable.dueDate}</td>
                    <td className="py-3 px-4">
                      <Badge variant={payable.status === "Paid" ? "default" : "secondary"}>
                        {payable.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {payable.status === "Pending" && (
                          <Button
                            size="sm"
                            onClick={() => markAsPaid(payable.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deletePayable(payable.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
