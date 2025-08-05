
import { useState } from "react";
import { Plus, Users, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Receivable {
  id: string;
  customer: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  description: string;
  status: "Pending" | "Paid";
  createdBy: string;
  approvedBy?: string;
  date: string;
}

export const AccountsReceivable = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [receivables, setReceivables] = useState<Receivable[]>([
    {
      id: "1",
      customer: "ABC Corporation",
      invoiceNumber: "INV-R001",
      amount: 5000.00,
      dueDate: "2024-07-30",
      description: "Consulting services Q2 2024",
      status: "Pending",
      createdBy: "Sales Team",
      date: "2024-06-16"
    },
    {
      id: "2",
      customer: "XYZ Ltd.",
      invoiceNumber: "INV-R002", 
      amount: 2750.00,
      dueDate: "2024-07-25",
      description: "Product delivery and setup",
      status: "Paid",
      createdBy: "Sales Team",
      approvedBy: "Finance",
      date: "2024-06-12"
    }
  ]);

  const [formData, setFormData] = useState({
    customer: "",
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
    
    const newReceivable: Receivable = {
      id: Date.now().toString(),
      customer: formData.customer,
      invoiceNumber: formData.invoiceNumber,
      amount: parseFloat(formData.amount),
      dueDate: formData.dueDate,
      description: formData.description,
      status: formData.status as "Pending" | "Paid",
      createdBy: formData.createdBy,
      approvedBy: formData.approvedBy || undefined,
      date: new Date().toISOString().split('T')[0]
    };

    setReceivables([...receivables, newReceivable]);
    setFormData({
      customer: "",
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
      description: "Receivable invoice added successfully",
    });
  };

  const markAsPaid = (id: string) => {
    setReceivables(receivables.map(receivable => 
      receivable.id === id 
        ? { ...receivable, status: "Paid" as const, approvedBy: "System" }
        : receivable
    ));
    
    toast({
      title: "Status Updated",
      description: "Invoice marked as paid and added to General Ledger",
    });
  };

  const deleteReceivable = (id: string) => {
    setReceivables(receivables.filter(receivable => receivable.id !== id));
    
    toast({
      title: "Deleted",
      description: "Invoice deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounts Receivable</h1>
          <p className="text-gray-600">Track customer payments and invoices</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Invoice
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Add New Receivable Invoice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer">Customer</Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) => setFormData({...formData, customer: e.target.value})}
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
          <CardTitle>Receivable Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold">Invoice #</th>
                  <th className="text-left py-3 px-4 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold">Due Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {receivables.map((receivable) => (
                  <tr key={receivable.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{receivable.customer}</td>
                    <td className="py-3 px-4">{receivable.invoiceNumber}</td>
                    <td className="py-3 px-4">${receivable.amount.toFixed(2)}</td>
                    <td className="py-3 px-4">{receivable.dueDate}</td>
                    <td className="py-3 px-4">
                      <Badge variant={receivable.status === "Paid" ? "default" : "secondary"}>
                        {receivable.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {receivable.status === "Pending" && (
                          <Button
                            size="sm"
                            onClick={() => markAsPaid(receivable.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteReceivable(receivable.id)}
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
