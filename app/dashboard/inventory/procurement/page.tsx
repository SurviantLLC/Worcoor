"use client"

import { useState } from "react"
import { Plus, Search, MoreHorizontal, Edit, Trash, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Sample procurement data
const initialProcurements = [
  {
    id: "PR-2023-001",
    sku: "WD-FRAME-01",
    name: "Wooden Frame - Oak",
    quantity: 50,
    quantityUnit: "pieces",
    status: "Pending Approval",
    requestedBy: "John Doe",
    requestDate: "2023-11-01",
    expectedDelivery: "2023-11-15",
    supplier: "Oak Supplies Inc.",
    cost: 1275.0,
    currency: "USD",
    unitCost: 25.5,
  },
  {
    id: "PR-2023-002",
    sku: "MT-LEG-01",
    name: "Metal Legs - Chrome",
    quantity: 100,
    quantityUnit: "pieces",
    status: "Approved",
    requestedBy: "Jane Smith",
    requestDate: "2023-11-02",
    expectedDelivery: "2023-11-20",
    supplier: "Metal Works Co.",
    cost: 1525.0,
    currency: "USD",
    unitCost: 15.25,
  },
  {
    id: "PR-2023-003",
    sku: "UPH-SEAT-02",
    name: "Upholstered Seat - Leather",
    quantity: 30,
    quantityUnit: "pieces",
    status: "Ordered",
    requestedBy: "Robert Johnson",
    requestDate: "2023-11-03",
    expectedDelivery: "2023-11-25",
    supplier: "Leather Crafts Ltd.",
    cost: 1800.0,
    currency: "USD",
    unitCost: 60.0,
  },
  {
    id: "PR-2023-004",
    sku: "PKG-BOX-01",
    name: "Packaging - Standard Box",
    quantity: 200,
    quantityUnit: "pieces",
    status: "Received",
    requestedBy: "Emily Davis",
    requestDate: "2023-10-15",
    expectedDelivery: "2023-11-01",
    supplier: "Box & Packaging Co.",
    cost: 600.0,
    currency: "USD",
    unitCost: 3.0,
  },
  {
    id: "PR-2023-005",
    sku: "HW-SCREWS-01",
    name: "Hardware - Screws Pack",
    quantity: 500,
    quantityUnit: "boxes",
    status: "Cancelled",
    requestedBy: "Michael Wilson",
    requestDate: "2023-10-20",
    expectedDelivery: "2023-11-05",
    supplier: "Hardware Supplies Inc.",
    cost: 250.0,
    currency: "USD",
    unitCost: 0.5,
  },
  {
    id: "PR-2023-006",
    sku: "FABRIC-01",
    name: "Upholstery Fabric - Blue",
    quantity: 150,
    quantityUnit: "meters",
    status: "Ordered",
    requestedBy: "Sarah Johnson",
    requestDate: "2023-11-05",
    expectedDelivery: "2023-11-25",
    supplier: "Textile Suppliers Ltd.",
    cost: 1312.5,
    currency: "USD",
    unitCost: 8.75,
  },
  {
    id: "PR-2023-007",
    sku: "PAINT-01",
    name: "Wood Paint - White",
    quantity: 25,
    quantityUnit: "liters",
    status: "Approved",
    requestedBy: "David Brown",
    requestDate: "2023-11-08",
    expectedDelivery: "2023-11-22",
    supplier: "Paint Supplies Co.",
    cost: 307.5,
    currency: "USD",
    unitCost: 12.3,
  },
]

// Sample SKUs data
const skus = [
  { value: "WD-FRAME-01", label: "WD-FRAME-01 - Wooden Frame - Oak", unit: "pieces" },
  { value: "WD-FRAME-02", label: "WD-FRAME-02 - Wooden Frame - Maple", unit: "pieces" },
  { value: "WD-FRAME-03", label: "WD-FRAME-03 - Wooden Frame - Walnut", unit: "pieces" },
  { value: "MT-LEG-01", label: "MT-LEG-01 - Metal Legs - Chrome", unit: "pieces" },
  { value: "MT-LEG-02", label: "MT-LEG-02 - Metal Legs - Black", unit: "pieces" },
  { value: "UPH-SEAT-01", label: "UPH-SEAT-01 - Upholstered Seat - Fabric", unit: "pieces" },
  { value: "UPH-SEAT-02", label: "UPH-SEAT-02 - Upholstered Seat - Leather", unit: "pieces" },
  { value: "HW-SCREWS-01", label: "HW-SCREWS-01 - Hardware - Screws Pack", unit: "boxes" },
  { value: "HW-BOLTS-01", label: "HW-BOLTS-01 - Hardware - Bolts Pack", unit: "boxes" },
  { value: "PKG-BOX-01", label: "PKG-BOX-01 - Packaging - Standard Box", unit: "pieces" },
  { value: "FABRIC-01", label: "FABRIC-01 - Upholstery Fabric - Blue", unit: "meters" },
  { value: "PAINT-01", label: "PAINT-01 - Wood Paint - White", unit: "liters" },
]

// Sample suppliers data
const suppliers = [
  { value: "oak-supplies", label: "Oak Supplies Inc." },
  { value: "metal-works", label: "Metal Works Co." },
  { value: "leather-crafts", label: "Leather Crafts Ltd." },
  { value: "box-packaging", label: "Box & Packaging Co." },
  { value: "hardware-supplies", label: "Hardware Supplies Inc." },
  { value: "textile-suppliers", label: "Textile Suppliers Ltd." },
  { value: "paint-supplies", label: "Paint Supplies Co." },
]

// Sample currencies
const currencies = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "JPY", label: "JPY - Japanese Yen" },
  { value: "CNY", label: "CNY - Chinese Yuan" },
  { value: "INR", label: "INR - Indian Rupee" },
]

export default function ProcurementManagementPage() {
  const [procurements, setProcurements] = useState(initialProcurements)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProcurement, setSelectedProcurement] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newProcurement, setNewProcurement] = useState({
    sku: "",
    name: "",
    quantity: 0,
    quantityUnit: "pieces",
    supplier: "",
    expectedDelivery: "",
    unitCost: 0,
    currency: "USD"
  })

  // Filter procurements based on search term and status filter
  const filteredProcurements = procurements.filter((procurement) => {
    const matchesSearch = procurement.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procurement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procurement.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "All" || procurement.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Pagination logic
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredProcurements.length / itemsPerPage)
  const currentPageItems = filteredProcurements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Handle adding a new procurement
  const handleAddProcurement = () => {
    const newId = `PR-${new Date().getFullYear()}-${String(procurements.length + 1).padStart(3, '0')}`
    
    const newProcurementItem = {
      id: newId,
      ...newProcurement,
      status: "Pending Approval",
      requestedBy: "Current User",
      requestDate: new Date().toISOString().split('T')[0],
      cost: newProcurement.quantity * newProcurement.unitCost
    }
    
    setProcurements([...procurements, newProcurementItem])
    setIsAddDialogOpen(false)
    setNewProcurement({
      sku: "",
      name: "",
      quantity: 0,
      quantityUnit: "pieces",
      supplier: "",
      expectedDelivery: "",
      unitCost: 0,
      currency: "USD"
    })
  }

  // Handle editing a procurement
  const handleEditProcurement = () => {
    if (!selectedProcurement) return
    
    const updatedProcurements = procurements.map(item => {
      if (item.id === selectedProcurement.id) {
        return {
          ...selectedProcurement,
          cost: selectedProcurement.quantity * selectedProcurement.unitCost
        }
      }
      return item
    })
    
    setProcurements(updatedProcurements)
    setIsEditDialogOpen(false)
    setSelectedProcurement(null)
  }

  // Handle deleting a procurement
  const handleDeleteProcurement = () => {
    if (!selectedProcurement) return
    
    const updatedProcurements = procurements.filter(item => item.id !== selectedProcurement.id)
    setProcurements(updatedProcurements)
    setIsDeleteDialogOpen(false)
    setSelectedProcurement(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Procurement Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Procurement
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        <div className="flex-1">
          <Label htmlFor="search" className="text-sm">
            Search
          </Label>
          <div className="relative mt-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by SKU, name, or ID..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full md:w-[180px]">
          <Label htmlFor="status-filter" className="text-sm">
            Status Filter
          </Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Pending Approval">Pending Approval</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Ordered">Ordered</SelectItem>
              <SelectItem value="Received">Received</SelectItem>
              <SelectItem value="Canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPageItems.map((procurement) => (
                <TableRow key={procurement.id}>
                  <TableCell>{procurement.id}</TableCell>
                  <TableCell>{procurement.sku}</TableCell>
                  <TableCell>{procurement.name}</TableCell>
                  <TableCell>
                    {procurement.quantity} {procurement.quantityUnit}
                  </TableCell>
                  <TableCell>{procurement.supplier}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        procurement.status === 'Pending Approval' ? 'bg-amber-100 text-amber-800' :
                        procurement.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        procurement.status === 'Ordered' ? 'bg-blue-100 text-blue-800' :
                        procurement.status === 'Received' ? 'bg-purple-100 text-purple-800' :
                        procurement.status === 'Canceled' ? 'bg-red-100 text-red-800' :
                        ''
                      }
                    >
                      {procurement.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{procurement.expectedDelivery}</TableCell>
                  <TableCell>
                    {procurement.currency} {procurement.cost.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedProcurement(procurement)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Procurement
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedProcurement(procurement)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Procurement
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 py-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Add Procurement Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Procurement</DialogTitle>
            <DialogDescription>
              Create a new procurement request for inventory items.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={newProcurement.sku}
                  onChange={(e) => setNewProcurement({ ...newProcurement, sku: e.target.value })}
                  placeholder="Enter SKU"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  value={newProcurement.name}
                  onChange={(e) => setNewProcurement({ ...newProcurement, name: e.target.value })}
                  placeholder="Enter item name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newProcurement.quantity}
                  onChange={(e) => setNewProcurement({ ...newProcurement, quantity: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantityUnit">Unit</Label>
                <Select
                  value={newProcurement.quantityUnit}
                  onValueChange={(value) => setNewProcurement({ ...newProcurement, quantityUnit: value })}
                >
                  <SelectTrigger id="quantityUnit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pieces">Pieces</SelectItem>
                    <SelectItem value="meters">Meters</SelectItem>
                    <SelectItem value="kg">Kilograms</SelectItem>
                    <SelectItem value="liters">Liters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                value={newProcurement.supplier}
                onChange={(e) => setNewProcurement({ ...newProcurement, supplier: e.target.value })}
                placeholder="Enter supplier name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expectedDelivery">Expected Delivery</Label>
                <Input
                  id="expectedDelivery"
                  type="date"
                  value={newProcurement.expectedDelivery}
                  onChange={(e) => setNewProcurement({ ...newProcurement, expectedDelivery: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitCost">Unit Cost</Label>
                <div className="relative">
                  <Input
                    id="unitCost"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newProcurement.unitCost}
                    onChange={(e) => setNewProcurement({ ...newProcurement, unitCost: Number(e.target.value) })}
                    className="pl-8"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-sm text-muted-foreground">{newProcurement.currency}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProcurement}>Add Procurement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Procurement Dialog */}
      {selectedProcurement && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Procurement</DialogTitle>
              <DialogDescription>
                Update the details for procurement {selectedProcurement.id}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-sku">SKU</Label>
                  <Input
                    id="edit-sku"
                    value={selectedProcurement.sku}
                    onChange={(e) => setSelectedProcurement({ ...selectedProcurement, sku: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Item Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedProcurement.name}
                    onChange={(e) => setSelectedProcurement({ ...selectedProcurement, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={selectedProcurement.status}
                    onValueChange={(value) => setSelectedProcurement({ ...selectedProcurement, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Ordered">Ordered</SelectItem>
                      <SelectItem value="Received">Received</SelectItem>
                      <SelectItem value="Canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-expected-delivery">Expected Delivery</Label>
                  <Input
                    id="edit-expected-delivery"
                    type="date"
                    value={selectedProcurement.expectedDelivery}
                    onChange={(e) =>
                      setSelectedProcurement({ ...selectedProcurement, expectedDelivery: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-quantity">Quantity</Label>
                  <Input
                    id="edit-quantity"
                    type="number"
                    min="1"
                    value={selectedProcurement.quantity}
                    onChange={(e) =>
                      setSelectedProcurement({ ...selectedProcurement, quantity: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-unit-cost">Unit Cost</Label>
                  <div className="relative">
                    <Input
                      id="edit-unit-cost"
                      type="number"
                      min="0"
                      step="0.01"
                      value={selectedProcurement.unitCost}
                      onChange={(e) =>
                        setSelectedProcurement({ ...selectedProcurement, unitCost: Number(e.target.value) })
                      }
                      className="pl-8"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-sm text-muted-foreground">{selectedProcurement.currency}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-supplier">Supplier</Label>
                <Input
                  id="edit-supplier"
                  value={selectedProcurement.supplier}
                  onChange={(e) => setSelectedProcurement({ ...selectedProcurement, supplier: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditProcurement}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Procurement Dialog */}
      {selectedProcurement && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Procurement</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this procurement request? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>
                You are about to delete procurement <strong>{selectedProcurement.id}</strong> for{" "}
                <strong>{selectedProcurement.name}</strong>.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteProcurement}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
