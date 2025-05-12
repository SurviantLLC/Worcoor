"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  FileText,
  BarChart3,
  CheckCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { SkuForm } from "@/components/inventory/sku-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

// Update the initialSkus data to include the new fields
const initialSkus = [
  {
    id: 1,
    name: "WD-FRAME-01",
    description: "Wooden Frame - Oak",
    quantity: 45,
    totalProcured: 60,
    minQuantity: 50,
    type: "Primary",
    category: "Raw Material",
    location: "Warehouse A",
    unitCost: 25.5,
    currency: "USD",
    unitWeight: 2.3,
    weightUnit: "kg",
    quantityUnit: "pieces",
    qualityRating: "A",
    qualityCheckDone: true,
    qualityCheckDate: "2023-11-01",
    qualityCheckNotes: "Passed all quality tests. No defects found.",
    taggedForProduction: 10,
    wastage: 5,
  },
  {
    id: 2,
    name: "WD-FRAME-02",
    description: "Wooden Frame - Maple",
    quantity: 60,
    totalProcured: 75,
    minQuantity: 40,
    type: "Secondary",
    category: "Raw Material",
    location: "Warehouse A",
    unitCost: 28.75,
    currency: "USD",
    unitWeight: 2.1,
    weightUnit: "kg",
    quantityUnit: "pieces",
    qualityRating: "B",
    qualityCheckDone: true,
    qualityCheckDate: "2023-11-02",
    qualityCheckNotes: "Minor grain inconsistencies, but within acceptable range.",
    taggedForProduction: 15,
    wastage: 0,
  },
  {
    id: 3,
    name: "WD-FRAME-03",
    description: "Wooden Frame - Walnut",
    quantity: 30,
    totalProcured: 35,
    minQuantity: 25,
    type: "Secondary",
    category: "Raw Material",
    location: "Warehouse A",
    unitCost: 32.0,
    currency: "USD",
    unitWeight: 2.5,
    weightUnit: "kg",
    quantityUnit: "pieces",
    qualityRating: "A",
    qualityCheckDone: false,
    qualityCheckDate: "",
    qualityCheckNotes: "",
    taggedForProduction: 5,
    wastage: 0,
  },
  {
    id: 4,
    name: "MT-LEG-01",
    description: "Metal Legs - Chrome",
    quantity: 120,
    totalProcured: 150,
    minQuantity: 100,
    type: "Primary",
    category: "Component",
    location: "Warehouse B",
    unitCost: 15.25,
    currency: "USD",
    unitWeight: 1.8,
    weightUnit: "kg",
    quantityUnit: "pieces",
    qualityRating: "A",
    qualityCheckDone: true,
    qualityCheckDate: "2023-11-01",
    qualityCheckNotes: "All measurements within specification. Finish is excellent.",
    taggedForProduction: 30,
    wastage: 0,
  },
  {
    id: 5,
    name: "MT-LEG-02",
    description: "Metal Legs - Black",
    quantity: 85,
    totalProcured: 100,
    minQuantity: 80,
    type: "Secondary",
    category: "Component",
    location: "Warehouse B",
    unitCost: 14.5,
    currency: "USD",
    unitWeight: 1.7,
    weightUnit: "kg",
    quantityUnit: "pieces",
    qualityRating: "B",
    qualityCheckDone: true,
    qualityCheckDate: "2023-11-02",
    qualityCheckNotes: "Some minor finish imperfections, but structurally sound.",
    taggedForProduction: 10,
    wastage: 5,
  },
  {
    id: 6,
    name: "FABRIC-01",
    description: "Upholstery Fabric - Blue",
    quantity: 200,
    totalProcured: 250,
    minQuantity: 150,
    type: "Primary",
    category: "Raw Material",
    location: "Warehouse C",
    unitCost: 8.75,
    currency: "USD",
    unitWeight: 0.5,
    weightUnit: "kg",
    quantityUnit: "meters",
    qualityRating: "A",
    qualityCheckDone: true,
    qualityCheckDate: "2023-11-05",
    qualityCheckNotes: "Excellent color consistency and durability.",
    taggedForProduction: 50,
    wastage: 0,
  },
  {
    id: 7,
    name: "PAINT-01",
    description: "Wood Paint - White",
    quantity: 45,
    totalProcured: 50,
    minQuantity: 20,
    type: "Secondary",
    category: "Raw Material",
    location: "Warehouse D",
    unitCost: 12.3,
    currency: "USD",
    unitWeight: 1.0,
    weightUnit: "kg",
    quantityUnit: "liters",
    qualityRating: "A",
    qualityCheckDone: true,
    qualityCheckDate: "2023-11-10",
    qualityCheckNotes: "Good consistency and coverage.",
    taggedForProduction: 5,
    wastage: 0,
  },
]

export default function SkuManagementPage() {
  const [skus, setSkus] = useState(initialSkus)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [qualityFilter, setQualityFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [editingSku, setEditingSku] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isTotalDialogOpen, setIsTotalDialogOpen] = useState(false)
  const [isQualityCheckDialogOpen, setIsQualityCheckDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [qualityFormData, setQualityFormData] = useState({
    qualityRating: "",
    qualityCheckDone: false,
    qualityCheckNotes: "",
  })

  const itemsPerPage = 5

  // Filter SKUs based on search term, category filter, and type filter
  const filteredSkus = skus.filter((sku) => {
    const matchesSearch =
      sku.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sku.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || sku.category === categoryFilter
    const matchesType = typeFilter === "All" || sku.type === typeFilter
    const matchesQuality =
      qualityFilter === "All" ||
      (qualityFilter === "Checked" && sku.qualityCheckDone) ||
      (qualityFilter === "Pending" && !sku.qualityCheckDone)
    return matchesSearch && matchesCategory && matchesType && matchesQuality
  })

  // Paginate SKUs
  const indexOfLastSku = currentPage * itemsPerPage
  const indexOfFirstSku = indexOfLastSku - itemsPerPage
  const currentSkus = filteredSkus.slice(indexOfFirstSku, indexOfLastSku)
  const totalPages = Math.ceil(filteredSkus.length / itemsPerPage)

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle adding a new SKU
  const handleAddSku = (skuData: any) => {
    const id = skus.length > 0 ? Math.max(...skus.map((sku) => sku.id)) + 1 : 1
    setSkus([
      ...skus,
      {
        id,
        ...skuData,
        totalProcured: skuData.quantity,
        taggedForProduction: 0,
        wastage: 0,
      },
    ])
    setIsAddDialogOpen(false)

    toast({
      title: "SKU added",
      description: `SKU ${skuData.name} has been added successfully.`,
    })
  }

  // Handle editing a SKU
  const handleEditSku = (skuData: any) => {
    if (!editingSku) return

    setSkus(skus.map((sku) => (sku.id === editingSku.id ? { ...sku, ...skuData } : sku)))
    setIsEditDialogOpen(false)

    toast({
      title: "SKU updated",
      description: `SKU ${skuData.name} has been updated successfully.`,
    })
  }

  // Handle deleting a SKU
  const handleDeleteSku = () => {
    if (!editingSku) return

    setSkus(skus.filter((sku) => sku.id !== editingSku.id))
    setIsDeleteDialogOpen(false)

    toast({
      title: "SKU deleted",
      description: `SKU ${editingSku.name} has been deleted successfully.`,
    })
  }

  // Handle toggling SKU type
  const handleToggleType = (id: number, newType: string) => {
    setSkus(skus.map((sku) => (sku.id === id ? { ...sku, type: newType } : sku)))

    toast({
      title: "SKU type updated",
      description: `SKU type has been updated to ${newType}.`,
    })
  }

  // Handle quality check
  const handleQualityCheck = () => {
    if (!editingSku) return

    const today = new Date().toISOString().split("T")[0]

    setSkus(
      skus.map((sku) =>
        sku.id === editingSku.id
          ? {
              ...sku,
              qualityRating: qualityFormData.qualityRating,
              qualityCheckDone: qualityFormData.qualityCheckDone,
              qualityCheckNotes: qualityFormData.qualityCheckNotes,
              qualityCheckDate: qualityFormData.qualityCheckDone ? today : "",
            }
          : sku,
      ),
    )
    setIsQualityCheckDialogOpen(false)

    toast({
      title: "Quality check updated",
      description: `Quality check for ${editingSku.name} has been updated.`,
    })
  }

  // Get quantity status badge
  const getQuantityBadge = (quantity: number, minQuantity: number) => {
    if (quantity <= 0) {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Out of Stock</Badge>
    } else if (quantity < minQuantity) {
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Low Stock</Badge>
    } else {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
    }
  }

  // Get quality badge
  const getQualityBadge = (rating: string) => {
    switch (rating) {
      case "A":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">A - Premium</Badge>
      case "B":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">B - Standard</Badge>
      case "C":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">C - Economy</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Not Rated</Badge>
    }
  }

  // Get quality check badge
  const getQualityCheckBadge = (checked: boolean) => {
    return checked ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Checked</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Pending</Badge>
    )
  }

  // Add a function to calculate total SKU quantity
  const calculateTotalQuantity = () => {
    return skus.reduce((total, sku) => total + sku.quantity, 0)
  }

  // Add a function to calculate total SKU weight
  const calculateTotalWeight = () => {
    return skus
      .reduce((total, sku) => {
        return total + sku.quantity * (sku.unitWeight || 0)
      }, 0)
      .toFixed(2)
  }

  // Add a function to count SKUs with quality check done
  const countQualityCheckedSkus = () => {
    return skus.filter((sku) => sku.qualityCheckDone).length
  }

  // Group SKUs by category
  const skusByCategory = skus.reduce(
    (acc, sku) => {
      const category = sku.category || "Uncategorized"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(sku)
      return acc
    },
    {} as Record<string, typeof skus>,
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">SKU Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsTotalDialogOpen(true)}>
            <BarChart3 className="h-4 w-4" />
            View Total SKUs
          </Button>
          <Button className="flex items-center gap-2" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add SKU
          </Button>
        </div>
      </div>

      {/* Update the return statement to include the new metrics */}
      {/* Add this after the h1 and before the Card component */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total SKUs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skus.length}</div>
            <div className="text-xs text-muted-foreground">Unique stock keeping units</div>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10">
            <div className="h-full bg-primary" style={{ width: `100%` }}></div>
          </div>
        </Card>
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quantity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateTotalQuantity()}</div>
            <div className="text-xs text-muted-foreground">Items in inventory</div>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10">
            <div
              className="h-full bg-primary"
              style={{
                width: `${Math.min(100, (calculateTotalQuantity() / (calculateTotalQuantity() + 100)) * 100)}%`,
              }}
            ></div>
          </div>
        </Card>
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Weight (kg)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateTotalWeight()}</div>
            <div className="text-xs text-muted-foreground">Kilograms in inventory</div>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10">
            <div
              className="h-full bg-primary"
              style={{
                width: `${Math.min(100, (Number.parseFloat(calculateTotalWeight()) / (Number.parseFloat(calculateTotalWeight()) + 100)) * 100)}%`,
              }}
            ></div>
          </div>
        </Card>
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Checked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {countQualityCheckedSkus()} / {skus.length}
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.round((countQualityCheckedSkus() / skus.length) * 100)}% completion rate
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10">
            <div
              className="h-full bg-primary"
              style={{
                width: `${(countQualityCheckedSkus() / skus.length) * 100}%`,
              }}
            ></div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">SKUs</CardTitle>
          <CardDescription>Manage SKUs and inventory levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search SKUs..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="category-filter" className="whitespace-nowrap">
                    Category:
                  </Label>
                  <Select onValueChange={(value) => setCategoryFilter(value)} defaultValue="All">
                    <SelectTrigger id="category-filter" className="w-[180px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      <SelectItem value="Raw Material">Raw Material</SelectItem>
                      <SelectItem value="Component">Component</SelectItem>
                      <SelectItem value="Hardware">Hardware</SelectItem>
                      <SelectItem value="Packaging">Packaging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="type-filter" className="whitespace-nowrap">
                    Type:
                  </Label>
                  <Select onValueChange={(value) => setTypeFilter(value)} defaultValue="All">
                    <SelectTrigger id="type-filter" className="w-[180px]">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Types</SelectItem>
                      <SelectItem value="Primary">Primary</SelectItem>
                      <SelectItem value="Secondary">Secondary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="quality-filter" className="whitespace-nowrap">
                    Quality Check:
                  </Label>
                  <Select onValueChange={(value) => setQualityFilter(value)} defaultValue="All">
                    <SelectTrigger id="quality-filter" className="w-[180px]">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Checked">Checked</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              {/* Update the TableHeader to include the new columns */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Quality</TableHead>
                    <TableHead>QC Status</TableHead>
                    <TableHead>Unit Weight</TableHead>
                    <TableHead>Total Weight</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentSkus.length > 0 ? (
                    currentSkus.map((sku) => (
                      <TableRow key={sku.id}>
                        <TableCell className="font-medium">{sku.name}</TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate" title={sku.description}>
                            {sku.description}
                          </div>
                        </TableCell>
                        <TableCell>
                          {sku.quantity} {sku.quantityUnit}
                        </TableCell>
                        <TableCell>{getQuantityBadge(sku.quantity, sku.minQuantity)}</TableCell>
                        {/* Update the TableBody to include the new columns */}
                        <TableCell>
                          {sku.qualityRating ? getQualityBadge(sku.qualityRating) : getQualityBadge("Not Rated")}
                        </TableCell>
                        <TableCell>{getQualityCheckBadge(sku.qualityCheckDone)}</TableCell>
                        <TableCell>
                          {sku.unitWeight} {sku.weightUnit}
                        </TableCell>
                        <TableCell>
                          {(sku.unitWeight * sku.quantity).toFixed(2)} {sku.weightUnit}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={sku.type === "Primary"}
                              onCheckedChange={(checked) => handleToggleType(sku.id, checked ? "Primary" : "Secondary")}
                              className="data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground"
                            />
                            <span>{sku.type}</span>
                          </div>
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
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setEditingSku(sku)
                                  setQualityFormData({
                                    qualityRating: sku.qualityRating || "Not Rated",
                                    qualityCheckDone: sku.qualityCheckDone,
                                    qualityCheckNotes: sku.qualityCheckNotes || "",
                                  })
                                  setIsQualityCheckDialogOpen(true)
                                }}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Quality Check
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setEditingSku(sku)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setEditingSku(sku)
                                  setIsDeleteDialogOpen(true)
                                }}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} className="h-24 text-center">
                        No SKUs found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredSkus.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {indexOfFirstSku + 1} to {Math.min(indexOfLastSku, filteredSkus.length)} of{" "}
                  {filteredSkus.length} SKUs
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add SKU Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New SKU</DialogTitle>
            <DialogDescription>Add a new SKU to the inventory system.</DialogDescription>
          </DialogHeader>
          <SkuForm onSubmit={handleAddSku} onCancel={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit SKU Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit SKU</DialogTitle>
            <DialogDescription>Make changes to the SKU details.</DialogDescription>
          </DialogHeader>
          {editingSku && (
            <SkuForm initialData={editingSku} onSubmit={handleEditSku} onCancel={() => setIsEditDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete SKU Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete SKU</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this SKU? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {editingSku && (
            <div className="py-4">
              <p>
                You are about to delete: <strong>{editingSku.name}</strong> - {editingSku.description}
              </p>
              {editingSku.quantity > 0 && (
                <p className="text-destructive mt-2">
                  Warning: This SKU has {editingSku.quantity} units in stock. Deleting it will remove these from
                  inventory.
                </p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSku}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quality Check Dialog */}
      <Dialog open={isQualityCheckDialogOpen} onOpenChange={setIsQualityCheckDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Quality Check</DialogTitle>
            <DialogDescription>{editingSku && `Perform quality check for ${editingSku.name}`}</DialogDescription>
          </DialogHeader>
          {editingSku && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quality-rating" className="text-right">
                  Quality Rating
                </Label>
                <Select
                  value={qualityFormData.qualityRating}
                  onValueChange={(value) => setQualityFormData({ ...qualityFormData, qualityRating: value })}
                >
                  <SelectTrigger id="quality-rating" className="col-span-3">
                    <SelectValue placeholder="Select quality rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A - Premium</SelectItem>
                    <SelectItem value="B">B - Standard</SelectItem>
                    <SelectItem value="C">C - Economy</SelectItem>
                    <SelectItem value="Not Rated">Not Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quality-check" className="text-right">
                  Check Complete
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Checkbox
                    id="quality-check"
                    checked={qualityFormData.qualityCheckDone}
                    onCheckedChange={(checked) =>
                      setQualityFormData({ ...qualityFormData, qualityCheckDone: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="quality-check"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mark as checked
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quality-notes" className="text-right">
                  Notes
                </Label>
                <Textarea
                  id="quality-notes"
                  className="col-span-3"
                  placeholder="Enter quality check notes..."
                  value={qualityFormData.qualityCheckNotes}
                  onChange={(e) => setQualityFormData({ ...qualityFormData, qualityCheckNotes: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQualityCheckDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleQualityCheck}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Total SKUs Dialog */}
      <Dialog open={isTotalDialogOpen} onOpenChange={setIsTotalDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Total SKU Inventory</DialogTitle>
            <DialogDescription>Comprehensive view of all SKUs in inventory</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All SKUs</TabsTrigger>
              <TabsTrigger value="category">By Category</TabsTrigger>
              <TabsTrigger value="quality">By Quality</TabsTrigger>
              <TabsTrigger value="production">Production & Wastage</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total SKUs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{skus.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Quantity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{calculateTotalQuantity()}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Current Quantity</TableHead>
                      <TableHead>Total Procured</TableHead>
                      <TableHead>Unit Weight</TableHead>
                      <TableHead>Total Weight</TableHead>
                      <TableHead>Quality</TableHead>
                      <TableHead>Unit Cost</TableHead>
                      <TableHead>Total Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {skus.map((sku) => (
                      <TableRow key={sku.id}>
                        <TableCell className="font-medium">{sku.name}</TableCell>
                        <TableCell>{sku.category}</TableCell>
                        <TableCell>
                          {sku.quantity} {sku.quantityUnit}
                        </TableCell>
                        <TableCell>
                          {sku.totalProcured} {sku.quantityUnit}
                        </TableCell>
                        <TableCell>
                          {sku.unitWeight} {sku.weightUnit}
                        </TableCell>
                        <TableCell>
                          {(sku.unitWeight * sku.quantity).toFixed(2)} {sku.weightUnit}
                        </TableCell>
                        <TableCell>
                          {sku.qualityRating ? getQualityBadge(sku.qualityRating) : getQualityBadge("Not Rated")}
                        </TableCell>
                        <TableCell>
                          {sku.unitCost} {sku.currency}
                        </TableCell>
                        <TableCell>
                          {(sku.unitCost * sku.quantity).toFixed(2)} {sku.currency}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-bold bg-muted/50">
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell>{calculateTotalQuantity()}</TableCell>
                      <TableCell>{skus.reduce((total, sku) => total + sku.totalProcured, 0)}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>{calculateTotalWeight()}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        {skus.reduce((total, sku) => total + sku.unitCost * sku.quantity, 0).toFixed(2)}{" "}
                        {skus[0]?.currency || "USD"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="category" className="space-y-4">
              {Object.entries(skusByCategory).map(([category, categorySkus]) => {
                const totalCategoryQuantity = categorySkus.reduce((sum, sku) => sum + sku.quantity, 0)
                const totalCategoryWeight = categorySkus.reduce(
                  (sum, sku) => sum + (sku.unitWeight || 0) * sku.quantity,
                  0,
                )
                const totalCategoryValue = categorySkus.reduce(
                  (sum, sku) => sum + (sku.unitCost || 0) * sku.quantity,
                  0,
                )

                return (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle>{category}</CardTitle>
                      <CardDescription>
                        {categorySkus.length} SKUs | {totalCategoryQuantity} items | {totalCategoryWeight.toFixed(2)} kg
                        |{totalCategoryValue.toFixed(2)} {categorySkus[0]?.currency || "USD"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>SKU Name</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>% of Category</TableHead>
                              <TableHead>Weight</TableHead>
                              <TableHead>Value</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {categorySkus.map((sku) => (
                              <TableRow key={sku.id}>
                                <TableCell className="font-medium">{sku.name}</TableCell>
                                <TableCell>
                                  {sku.quantity} {sku.quantityUnit}
                                </TableCell>
                                <TableCell>
                                  {Math.round((sku.quantity / totalCategoryQuantity) * 100)}%
                                  <Progress value={(sku.quantity / totalCategoryQuantity) * 100} className="h-2 mt-1" />
                                </TableCell>
                                <TableCell>
                                  {(sku.unitWeight * sku.quantity).toFixed(2)} {sku.weightUnit}
                                </TableCell>
                                <TableCell>
                                  {(sku.unitCost * sku.quantity).toFixed(2)} {sku.currency}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="quality" className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Quality Checked</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {countQualityCheckedSkus()} / {skus.length}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((countQualityCheckedSkus() / skus.length) * 100)}% completion rate
                    </div>
                    <Progress value={(countQualityCheckedSkus() / skus.length) * 100} className="h-2 mt-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Quality Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>A - Premium</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>B - Standard</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          <span>C - Economy</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div>{skus.filter((s) => s.qualityRating === "A").length}</div>
                        <div>{skus.filter((s) => s.qualityRating === "B").length}</div>
                        <div>{skus.filter((s) => s.qualityRating === "C").length}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU Name</TableHead>
                      <TableHead>Quality Rating</TableHead>
                      <TableHead>QC Status</TableHead>
                      <TableHead>Last Checked</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {skus.map((sku) => (
                      <TableRow key={sku.id}>
                        <TableCell className="font-medium">{sku.name}</TableCell>
                        <TableCell>
                          {sku.qualityRating ? getQualityBadge(sku.qualityRating) : getQualityBadge("Not Rated")}
                        </TableCell>
                        <TableCell>{getQualityCheckBadge(sku.qualityCheckDone)}</TableCell>
                        <TableCell>{sku.qualityCheckDate || "Not checked"}</TableCell>
                        <TableCell>
                          {sku.quantity} {sku.quantityUnit}
                        </TableCell>
                        <TableCell>{sku.category}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="production" className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Available for Production</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {skus.reduce((total, sku) => total + sku.quantity - sku.taggedForProduction, 0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Units available for new production orders</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Tagged for Production</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {skus.reduce((total, sku) => total + sku.taggedForProduction, 0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Units already allocated to production orders</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Wastage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{skus.reduce((total, sku) => total + sku.wastage, 0)}</div>
                    <div className="text-xs text-muted-foreground">Units recorded as wastage</div>
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU Name</TableHead>
                      <TableHead>Total Procured</TableHead>
                      <TableHead>Current Quantity</TableHead>
                      <TableHead>Tagged for Production</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>Wastage</TableHead>
                      <TableHead>Wastage %</TableHead>
                      <TableHead>Wastage Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {skus.map((sku) => {
                      const wastagePercentage = sku.totalProcured > 0 ? (sku.wastage / sku.totalProcured) * 100 : 0
                      const wastageCost = sku.wastage * sku.unitCost

                      return (
                        <TableRow key={sku.id}>
                          <TableCell className="font-medium">{sku.name}</TableCell>
                          <TableCell>
                            {sku.totalProcured} {sku.quantityUnit}
                          </TableCell>
                          <TableCell>
                            {sku.quantity} {sku.quantityUnit}
                          </TableCell>
                          <TableCell>
                            {sku.taggedForProduction} {sku.quantityUnit}
                          </TableCell>
                          <TableCell>
                            {sku.quantity - sku.taggedForProduction} {sku.quantityUnit}
                          </TableCell>
                          <TableCell>
                            {sku.wastage} {sku.quantityUnit}
                          </TableCell>
                          <TableCell>{wastagePercentage.toFixed(1)}%</TableCell>
                          <TableCell>
                            {wastageCost.toFixed(2)} {sku.currency}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    <TableRow className="font-bold bg-muted/50">
                      <TableCell>Total</TableCell>
                      <TableCell>{skus.reduce((total, sku) => total + sku.totalProcured, 0)}</TableCell>
                      <TableCell>{skus.reduce((total, sku) => total + sku.quantity, 0)}</TableCell>
                      <TableCell>{skus.reduce((total, sku) => total + sku.taggedForProduction, 0)}</TableCell>
                      <TableCell>
                        {skus.reduce((total, sku) => total + (sku.quantity - sku.taggedForProduction), 0)}
                      </TableCell>
                      <TableCell>{skus.reduce((total, sku) => total + sku.wastage, 0)}</TableCell>
                      <TableCell>
                        {(
                          (skus.reduce((total, sku) => total + sku.wastage, 0) /
                            skus.reduce((total, sku) => total + sku.totalProcured, 0)) *
                          100
                        ).toFixed(1)}
                        %
                      </TableCell>
                      <TableCell>
                        {skus.reduce((total, sku) => total + sku.wastage * sku.unitCost, 0).toFixed(2)}{" "}
                        {skus[0]?.currency || "USD"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTotalDialogOpen(false)}>
              Close
            </Button>
            <Button variant="default" onClick={() => setIsTotalDialogOpen(false)}>
              <FileText className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
