"use client"

import { useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProductForm } from "@/components/product-manager/product-form"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Sample product data
const initialProducts = [
  {
    id: 1,
    name: "Office Chair - Standard",
    productId: "CHAIR-001",
    category: "furniture",
    productUnit: "single",
    dimensions: { length: 60, width: 60, height: 110 },
    weight: 12,
    capacity: null,
    description: "Standard office chair with adjustable height and lumbar support.",
    customFields: [
      { name: "Material", value: "Mesh and Plastic" },
      { name: "Color", value: "Black" },
    ],
    skuCount: 3,
    stepCount: 5,
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-09-22T14:45:00Z",
    status: "active",
  },
  {
    id: 2,
    name: "Office Desk - Adjustable",
    productId: "DESK-001",
    category: "furniture",
    productUnit: "single",
    dimensions: { length: 120, width: 80, height: 75 },
    weight: 35,
    capacity: null,
    description: "Height-adjustable desk with electric motor for sit-stand flexibility.",
    customFields: [
      { name: "Material", value: "Engineered Wood and Steel" },
      { name: "Max Height", value: "120cm" },
    ],
    skuCount: 4,
    stepCount: 7,
    createdAt: "2023-06-10T09:15:00Z",
    updatedAt: "2023-10-05T11:20:00Z",
    status: "active",
  },
  {
    id: 3,
    name: "Filing Cabinet - 3 Drawer",
    productId: "CAB-001",
    category: "storage",
    productUnit: "single",
    dimensions: { length: 45, width: 60, height: 100 },
    weight: 28,
    capacity: "45L",
    description: "Three-drawer filing cabinet with lock for secure document storage.",
    customFields: [
      { name: "Material", value: "Steel" },
      { name: "Lock Type", value: "Key" },
    ],
    skuCount: 2,
    stepCount: 4,
    createdAt: "2023-04-20T13:45:00Z",
    updatedAt: "2023-08-15T10:30:00Z",
    status: "active",
  },
  {
    id: 4,
    name: "Bookshelf - 5 Shelf",
    productId: "SHELF-001",
    category: "storage",
    productUnit: "single",
    dimensions: { length: 80, width: 30, height: 180 },
    weight: 40,
    capacity: null,
    description: "Five-shelf bookcase for office or home use with adjustable shelves.",
    customFields: [
      { name: "Material", value: "Engineered Wood" },
      { name: "Assembly Required", value: "Yes" },
    ],
    skuCount: 2,
    stepCount: 3,
    createdAt: "2023-07-05T15:20:00Z",
    updatedAt: "2023-09-30T09:10:00Z",
    status: "active",
  },
  {
    id: 5,
    name: "Conference Table - 8 Person",
    productId: "TABLE-001",
    category: "furniture",
    productUnit: "single",
    dimensions: { length: 240, width: 120, height: 75 },
    weight: 85,
    capacity: null,
    description: "Large conference table suitable for meetings of up to 8 people.",
    customFields: [
      { name: "Material", value: "Solid Wood and Steel" },
      { name: "Cable Management", value: "Yes" },
    ],
    skuCount: 1,
    stepCount: 6,
    createdAt: "2023-03-15T11:30:00Z",
    updatedAt: "2023-07-22T14:15:00Z",
    status: "active",
  },
  {
    id: 6,
    name: "Executive Chair - Leather",
    productId: "CHAIR-002",
    category: "furniture",
    productUnit: "single",
    dimensions: { length: 65, width: 65, height: 120 },
    weight: 15,
    capacity: null,
    description: "Premium leather executive chair with high back and armrests.",
    customFields: [
      { name: "Material", value: "Genuine Leather" },
      { name: "Color", value: "Brown" },
    ],
    skuCount: 2,
    stepCount: 8,
    createdAt: "2023-08-10T10:45:00Z",
    updatedAt: "2023-11-05T16:30:00Z",
    status: "active",
  },
  {
    id: 7,
    name: "Standing Desk Converter",
    productId: "DESK-002",
    category: "furniture",
    productUnit: "single",
    dimensions: { length: 80, width: 60, height: 50 },
    weight: 18,
    capacity: null,
    description: "Desk converter that sits on existing desk to create a standing workstation.",
    customFields: [
      { name: "Max Height", value: "45cm" },
      { name: "Weight Capacity", value: "15kg" },
    ],
    skuCount: 3,
    stepCount: 5,
    createdAt: "2023-09-20T09:30:00Z",
    updatedAt: "2023-12-15T11:45:00Z",
    status: "active",
  },
  {
    id: 8,
    name: "Monitor Stand - Dual",
    productId: "STAND-001",
    category: "office-supplies",
    productUnit: "single",
    dimensions: { length: 50, width: 20, height: 15 },
    weight: 5,
    capacity: null,
    description: "Dual monitor stand that supports two monitors up to 27 inches each.",
    customFields: [
      { name: "Material", value: "Aluminum" },
      { name: "VESA Compatible", value: "Yes" },
    ],
    skuCount: 1,
    stepCount: 3,
    createdAt: "2023-10-05T14:20:00Z",
    updatedAt: "2024-01-10T10:15:00Z",
    status: "active",
  },
  {
    id: 9,
    name: "Keyboard Tray - Adjustable",
    productId: "TRAY-001",
    category: "office-supplies",
    productUnit: "single",
    dimensions: { length: 70, width: 30, height: 5 },
    weight: 3,
    capacity: null,
    description: "Under-desk keyboard tray with adjustable height and tilt.",
    customFields: [
      { name: "Material", value: "Plastic and Steel" },
      { name: "Mouse Pad", value: "Included" },
    ],
    skuCount: 2,
    stepCount: 4,
    createdAt: "2023-11-15T13:10:00Z",
    updatedAt: "2024-02-20T15:30:00Z",
    status: "active",
  },
  {
    id: 10,
    name: "Desk Lamp - LED",
    productId: "LAMP-001",
    category: "lighting",
    productUnit: "single",
    dimensions: { length: 15, width: 15, height: 45 },
    weight: 1.5,
    capacity: null,
    description: "Adjustable LED desk lamp with multiple brightness levels and color temperatures.",
    customFields: [
      { name: "Power Source", value: "USB" },
      { name: "Color Temperature", value: "3000K-6000K" },
    ],
    skuCount: 3,
    stepCount: 2,
    createdAt: "2023-12-10T11:45:00Z",
    updatedAt: "2024-03-05T09:20:00Z",
    status: "active",
  },
  {
    id: 11,
    name: "Whiteboard - Magnetic",
    productId: "BOARD-001",
    category: "office-supplies",
    productUnit: "single",
    dimensions: { length: 120, width: 5, height: 90 },
    weight: 8,
    capacity: null,
    description: "Wall-mounted magnetic whiteboard with aluminum frame.",
    customFields: [
      { name: "Surface Material", value: "Porcelain Steel" },
      { name: "Includes", value: "Marker Tray" },
    ],
    skuCount: 1,
    stepCount: 2,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    status: "draft",
  },
  {
    id: 12,
    name: "Ergonomic Footrest",
    productId: "FOOT-001",
    category: "office-supplies",
    productUnit: "single",
    dimensions: { length: 45, width: 35, height: 15 },
    weight: 2,
    capacity: null,
    description: "Adjustable footrest with massage surface for under-desk comfort.",
    customFields: [
      { name: "Material", value: "Plastic and Rubber" },
      { name: "Height Adjustment", value: "3 Levels" },
    ],
    skuCount: 1,
    stepCount: 1,
    createdAt: "2024-02-20T14:15:00Z",
    updatedAt: "2024-02-20T14:15:00Z",
    status: "discontinued",
  },
]

// Category mapping
const categoryLabels: Record<string, string> = {
  furniture: "Furniture",
  storage: "Storage",
  "office-supplies": "Office Supplies",
  lighting: "Lighting",
  electronics: "Electronics",
  decor: "Decor",
}

// Unit mapping
const unitLabels: Record<string, string> = {
  single: "Single Item",
  bulk: "Bulk Pack",
  set: "Set",
  kit: "Kit",
  pair: "Pair",
}

// Status mapping
const statusLabels: Record<
  string,
  { label: string; variant: "default" | "outline" | "secondary" | "destructive" | "success" }
> = {
  active: { label: "Active", variant: "success" },
  draft: { label: "Draft", variant: "secondary" },
  discontinued: { label: "Discontinued", variant: "destructive" },
}

// Colors for charts
const COLORS = {
  primary: "#1a365d",
  secondary: "#ffc107",
  tertiary: "#64748b",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#3b82f6",
}

export default function ProductManagementPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [viewingProduct, setViewingProduct] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [filters, setFilters] = useState<{
    categories: string[]
    status: string[]
    productUnits?: string[]
    hasDimensions?: boolean
    hasWeight?: boolean
    hasCapacity?: boolean
    hasCustomFields?: boolean
    dateRange: { from: string | null; to: string | null }
  }>({
    categories: [],
    status: [],
    productUnits: [],
    hasDimensions: false,
    hasWeight: false,
    hasCapacity: false,
    hasCustomFields: false,
    dateRange: { from: null, to: null },
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState<"csv" | "json" | "pdf">("csv")
  const [exportFields, setExportFields] = useState<string[]>(["name", "productId", "category", "dimensions", "weight"])
  const [activeTab, setActiveTab] = useState("overview")

  const itemsPerPage = 5

  // Get all available categories from products
  const availableCategories = Array.from(new Set(products.map((product) => product.category)))

  // Get all available statuses from products
  const availableStatuses = Array.from(new Set(products.map((product) => product.status)))

  // Filter products based on search term and filters
  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())

    // Category filter
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category)

    // Status filter
    const matchesStatus = filters.status.length === 0 || filters.status.includes(product.status)

    // Product Unit filter
    const matchesUnit = !filters.productUnits?.length || filters.productUnits.includes(product.productUnit)

    // Product Definition filters
    const matchesDimensions =
      !filters.hasDimensions ||
      (product.dimensions && (product.dimensions.length || product.dimensions.width || product.dimensions.height))

    const matchesWeight = !filters.hasWeight || (product.weight !== undefined && product.weight !== null)

    const matchesCapacity =
      !filters.hasCapacity || (product.capacity !== undefined && product.capacity !== null && product.capacity !== "")

    const matchesCustomFields = !filters.hasCustomFields || (product.customFields && product.customFields.length > 0)

    // Date range filter
    const createdDate = new Date(product.createdAt)
    const matchesDateFrom = !filters.dateRange.from || createdDate >= new Date(filters.dateRange.from)
    const matchesDateTo = !filters.dateRange.to || createdDate <= new Date(filters.dateRange.to)

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesUnit &&
      matchesDimensions &&
      matchesWeight &&
      matchesCapacity &&
      matchesCustomFields &&
      matchesDateFrom &&
      matchesDateTo
    )
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue: any = a[sortField as keyof typeof a]
    let bValue: any = b[sortField as keyof typeof b]

    // Handle nested properties like dimensions.length
    if (sortField.includes(".")) {
      const [parent, child] = sortField.split(".")
      aValue = a[parent as keyof typeof a]?.[child]
      bValue = b[parent as keyof typeof b]?.[child]
    }

    // Handle string comparison
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    // Handle number comparison
    if (aValue === undefined) aValue = 0
    if (bValue === undefined) bValue = 0

    return sortDirection === "asc" ? aValue - bValue : bValue - aValue
  })

  // Paginate products
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filters, sortField, sortDirection])

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Handle adding a new product
  const handleAddProduct = (productData: any) => {
    const id = products.length > 0 ? Math.max(...products.map((product) => product.id)) + 1 : 1
    const now = new Date().toISOString()

    setProducts([
      ...products,
      {
        id,
        name: productData.name,
        productId: productData.productId,
        category: productData.category,
        productUnit: productData.productUnit,
        dimensions: productData.dimensions,
        weight: productData.weight,
        capacity: productData.capacity,
        description: productData.description,
        customFields: productData.customFields || [],
        skuCount: productData.skus.length,
        stepCount: productData.steps.length,
        createdAt: now,
        updatedAt: now,
        status: "active",
      },
    ])
    setIsAddDialogOpen(false)
  }

  // Handle editing a product
  const handleEditProduct = (productData: any) => {
    if (!editingProduct) return

    setProducts(
      products.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              name: productData.name,
              productId: productData.productId,
              category: productData.category,
              productUnit: productData.productUnit,
              dimensions: productData.dimensions,
              weight: productData.weight,
              capacity: productData.capacity,
              description: productData.description,
              customFields: productData.customFields || [],
              skuCount: productData.skus.length,
              stepCount: productData.steps.length,
              updatedAt: new Date().toISOString(),
            }
          : product,
      ),
    )
    setIsEditDialogOpen(false)
  }

  // Handle deleting a product
  const handleDeleteProduct = () => {
    if (!editingProduct) return

    setProducts(products.filter((product) => product.id !== editingProduct.id))
    setIsDeleteDialogOpen(false)
  }

  // Handle batch delete
  const handleBatchDelete = () => {
    setProducts(products.filter((product) => !selectedProducts.includes(product.id)))
    setSelectedProducts([])
  }

  // Handle batch status update
  const handleBatchStatusUpdate = (status: string) => {
    setProducts(
      products.map((product) =>
        selectedProducts.includes(product.id) ? { ...product, status, updatedAt: new Date().toISOString() } : product,
      ),
    )
    setSelectedProducts([])
  }

  // Handle select all products on current page
  const handleSelectAllOnPage = (checked: boolean) => {
    if (checked) {
      const currentIds = currentProducts.map((product) => product.id)
      setSelectedProducts([...new Set([...selectedProducts, ...currentIds])])
    } else {
      const currentIds = new Set(currentProducts.map((product) => product.id))
      setSelectedProducts(selectedProducts.filter((id) => !currentIds.has(id)))
    }
  }

  // Handle select individual product
  const handleSelectProduct = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, id])
    } else {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
    }
  }

  // Handle filter change
  const handleFilterChange = (filterType: keyof typeof filters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  // Handle export
  const handleExport = () => {
    // In a real application, this would generate and download the file
    console.log(`Exporting ${selectedProducts.length || "all"} products as ${exportFormat}`)
    console.log(`Fields to export: ${exportFields.join(", ")}`)
    setIsExportDialogOpen(false)
  }

  // Format dimensions
  const formatDimensions = (dimensions: { length?: number; width?: number; height?: number }) => {
    if (!dimensions) return "N/A"

    const { length, width, height } = dimensions
    const parts = []

    if (length) parts.push(`L: ${length}cm`)
    if (width) parts.push(`W: ${width}cm`)
    if (height) parts.push(`H: ${height}cm`)

    return parts.length > 0 ? parts.join(" × ") : "N/A"
  }

  // Get product statistics
  const getProductStats = () => {
    const totalProducts = products.length
    const activeProducts = products.filter((p) => p.status === "active").length
    const categoryCounts = products.reduce(
      (acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      totalProducts,
      activeProducts,
      categoryCounts,
    }
  }

  // Prepare data for charts
  const prepareCategoryData = () => {
    const categoryCounts = products.reduce(
      (acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(categoryCounts).map(([category, count]) => ({
      name: categoryLabels[category] || category,
      value: count,
    }))
  }

  const prepareUnitData = () => {
    const unitCounts = products.reduce(
      (acc, product) => {
        acc[product.productUnit] = (acc[product.productUnit] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(unitCounts).map(([unit, count]) => ({
      name: unitLabels[unit] || unit,
      value: count,
    }))
  }

  const prepareWeightDistributionData = () => {
    const weightRanges = {
      "0-5 kg": 0,
      "5-10 kg": 0,
      "10-20 kg": 0,
      "20-50 kg": 0,
      "50+ kg": 0,
    }

    products.forEach((product) => {
      if (product.weight === undefined || product.weight === null) return

      if (product.weight <= 5) {
        weightRanges["0-5 kg"]++
      } else if (product.weight <= 10) {
        weightRanges["5-10 kg"]++
      } else if (product.weight <= 20) {
        weightRanges["10-20 kg"]++
      } else if (product.weight <= 50) {
        weightRanges["20-50 kg"]++
      } else {
        weightRanges["50+ kg"]++
      }
    })

    return Object.entries(weightRanges).map(([range, count]) => ({
      name: range,
      value: count,
    }))
  }

  const prepareCustomFieldsData = () => {
    const fieldCounts = {
      "No Fields": 0,
      "1 Field": 0,
      "2 Fields": 0,
      "3+ Fields": 0,
    }

    products.forEach((product) => {
      const count = product.customFields?.length || 0
      if (count === 0) {
        fieldCounts["No Fields"]++
      } else if (count === 1) {
        fieldCounts["1 Field"]++
      } else if (count === 2) {
        fieldCounts["2 Fields"]++
      } else {
        fieldCounts["3+ Fields"]++
      }
    })

    return Object.entries(fieldCounts).map(([label, count]) => ({
      name: label,
      value: count,
    }))
  }

  const stats = getProductStats()
  const categoryData = prepareCategoryData()
  const unitData = prepareUnitData()
  const weightDistributionData = prepareWeightDistributionData()
  const customFieldsData = prepareCustomFieldsData()

  // Check if all products on current page are selected
  const areAllCurrentPageSelected =
    currentProducts.length > 0 && currentProducts.every((product) => selectedProducts.includes(product.id))

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <div className="flex items-center gap-2">
          <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Products</DialogTitle>
                <DialogDescription>Choose your export format and select the fields to include.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Export Format</h4>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="csv"
                        checked={exportFormat === "csv"}
                        onChange={() => setExportFormat("csv")}
                      />
                      <label htmlFor="csv">CSV</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="json"
                        checked={exportFormat === "json"}
                        onChange={() => setExportFormat("json")}
                      />
                      <label htmlFor="json">JSON</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="pdf"
                        checked={exportFormat === "pdf"}
                        onChange={() => setExportFormat("pdf")}
                      />
                      <label htmlFor="pdf">PDF</label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Fields to Include</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "name", label: "Product Name" },
                      { id: "productId", label: "Product ID" },
                      { id: "category", label: "Category" },
                      { id: "dimensions", label: "Dimensions" },
                      { id: "weight", label: "Weight" },
                      { id: "capacity", label: "Capacity" },
                      { id: "productUnit", label: "Unit" },
                      { id: "description", label: "Description" },
                      { id: "customFields", label: "Configurable Fields" },
                      { id: "skuCount", label: "SKU Count" },
                      { id: "stepCount", label: "Step Count" },
                      { id: "status", label: "Status" },
                      { id: "createdAt", label: "Created Date" },
                      { id: "updatedAt", label: "Updated Date" },
                    ].map((field) => (
                      <div key={field.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`field-${field.id}`}
                          checked={exportFields.includes(field.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setExportFields([...exportFields, field.id])
                            } else {
                              setExportFields(exportFields.filter((f) => f !== field.id))
                            }
                          }}
                        />
                        <label htmlFor={`field-${field.id}`}>{field.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Products to Export</h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="all-products"
                      checked={selectedProducts.length === 0}
                      onChange={() => setSelectedProducts([])}
                    />
                    <label htmlFor="all-products">All Products ({filteredProducts.length})</label>
                  </div>
                  {selectedProducts.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="selected-products"
                        checked={selectedProducts.length > 0}
                        onChange={() => {}}
                      />
                      <label htmlFor="selected-products">Selected Products ({selectedProducts.length})</label>
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleExport}>Export</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Add a new product with detailed specifications, SKUs and manufacturing steps.
                </DialogDescription>
              </DialogHeader>
              <ProductForm onSubmit={handleAddProduct} onCancel={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Product Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.activeProducts} active ({Math.round((stats.activeProducts / stats.totalProducts) * 100)}%)
            </p>
            <Progress value={(stats.activeProducts / stats.totalProducts) * 100} className="h-1 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.categoryCounts).map(([category, count]) => (
                <Badge key={category} variant="outline" className="flex items-center gap-1">
                  {categoryLabels[category] || category}
                  <span className="ml-1 rounded-full bg-muted px-1.5 text-xs">{count}</span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Product Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {availableStatuses.map((status) => {
                const count = products.filter((p) => p.status === status).length
                const percentage = Math.round((count / stats.totalProducts) * 100)
                return (
                  <div key={status} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{statusLabels[status]?.label || status}</span>
                      <span>
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-1" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Product Analytics</CardTitle>
          <CardDescription>Visual breakdown of your product catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="attributes">Product Attributes</TabsTrigger>
              <TabsTrigger value="custom-fields">Configurable Fields</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-80 border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-4">Products by Category</h3>
                  <ResponsiveContainer width="100%" height="90%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill={COLORS.primary}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              index % 6 === 0
                                ? COLORS.primary
                                : index % 6 === 1
                                  ? COLORS.secondary
                                  : index % 6 === 2
                                    ? COLORS.tertiary
                                    : index % 6 === 3
                                      ? COLORS.success
                                      : index % 6 === 4
                                        ? COLORS.warning
                                        : COLORS.info
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-80 border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-4">Products by Unit Type</h3>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={unitData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Products" fill={COLORS.primary} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <div className="h-80 border rounded-md p-4">
                <h3 className="text-sm font-medium mb-4">Product Distribution by Category</h3>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart data={categoryData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Products" fill={COLORS.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="attributes" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-80 border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-4">Weight Distribution</h3>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={weightDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Products" fill={COLORS.primary} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-80 border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-4">Products with Dimensions</h3>
                  <ResponsiveContainer width="100%" height="90%">
                    <RechartsPieChart>
                      <Pie
                        data={[
                          {
                            name: "With Dimensions",
                            value: products.filter(
                              (p) => p.dimensions && (p.dimensions.length || p.dimensions.width || p.dimensions.height),
                            ).length,
                          },
                          {
                            name: "Without Dimensions",
                            value: products.filter(
                              (p) =>
                                !p.dimensions || (!p.dimensions.length && !p.dimensions.width && !p.dimensions.height),
                            ).length,
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill={COLORS.primary}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill={COLORS.primary} />
                        <Cell fill={COLORS.tertiary} />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom-fields" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-80 border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-4">Configurable Fields Distribution</h3>
                  <ResponsiveContainer width="100%" height="90%">
                    <RechartsPieChart>
                      <Pie
                        data={customFieldsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill={COLORS.primary}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill={COLORS.tertiary} />
                        <Cell fill={COLORS.info} />
                        <Cell fill={COLORS.primary} />
                        <Cell fill={COLORS.success} />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-80 border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-4">Common Configurable Field Types</h3>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart
                      data={(() => {
                        const fieldTypes: Record<string, number> = {}
                        products.forEach((product) => {
                          if (!product.customFields) return
                          product.customFields.forEach((field: any) => {
                            const name = field.name
                            fieldTypes[name] = (fieldTypes[name] || 0) + 1
                          })
                        })
                        return Object.entries(fieldTypes)
                          .map(([name, count]) => ({ name, value: count }))
                          .sort((a, b) => b.value - a.value)
                          .slice(0, 5)
                      })()}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Occurrences" fill={COLORS.primary} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage products and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Filter className="h-3.5 w-3.5" />
                      Filter
                      {(filters.categories.length > 0 ||
                        filters.status.length > 0 ||
                        (filters.productUnits?.length || 0) > 0 ||
                        filters.hasDimensions ||
                        filters.hasWeight ||
                        filters.hasCapacity ||
                        filters.hasCustomFields ||
                        filters.dateRange.from ||
                        filters.dateRange.to) && (
                        <Badge variant="secondary" className="ml-1 rounded-full px-1 text-xs">
                          {filters.categories.length +
                            filters.status.length +
                            (filters.productUnits?.length || 0) +
                            (filters.hasDimensions ? 1 : 0) +
                            (filters.hasWeight ? 1 : 0) +
                            (filters.hasCapacity ? 1 : 0) +
                            (filters.hasCustomFields ? 1 : 0) +
                            (filters.dateRange.from ? 1 : 0) +
                            (filters.dateRange.to ? 1 : 0)}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">Filters</h4>
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Categories</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {availableCategories.map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox
                                id={`category-${category}`}
                                checked={filters.categories.includes(category)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    handleFilterChange("categories", [...filters.categories, category])
                                  } else {
                                    handleFilterChange(
                                      "categories",
                                      filters.categories.filter((c) => c !== category),
                                    )
                                  }
                                }}
                              />
                              <label htmlFor={`category-${category}`} className="text-sm">
                                {categoryLabels[category] || category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Product Unit</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(unitLabels).map(([value, label]) => (
                            <div key={value} className="flex items-center space-x-2">
                              <Checkbox
                                id={`unit-${value}`}
                                checked={filters.productUnits?.includes(value) || false}
                                onCheckedChange={(checked) => {
                                  const currentUnits = filters.productUnits || []
                                  if (checked) {
                                    handleFilterChange("productUnits", [...currentUnits, value])
                                  } else {
                                    handleFilterChange(
                                      "productUnits",
                                      currentUnits.filter((u) => u !== value),
                                    )
                                  }
                                }}
                              />
                              <label htmlFor={`unit-${value}`} className="text-sm">
                                {label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Product Definition</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="has-dimensions"
                              checked={filters.hasDimensions || false}
                              onCheckedChange={(checked) => {
                                handleFilterChange("hasDimensions", !!checked)
                              }}
                            />
                            <label htmlFor="has-dimensions" className="text-sm">
                              Has Dimensions
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="has-weight"
                              checked={filters.hasWeight || false}
                              onCheckedChange={(checked) => {
                                handleFilterChange("hasWeight", !!checked)
                              }}
                            />
                            <label htmlFor="has-weight" className="text-sm">
                              Has Weight
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="has-capacity"
                              checked={filters.hasCapacity || false}
                              onCheckedChange={(checked) => {
                                handleFilterChange("hasCapacity", !!checked)
                              }}
                            />
                            <label htmlFor="has-capacity" className="text-sm">
                              Has Capacity
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="has-custom-fields"
                              checked={filters.hasCustomFields || false}
                              onCheckedChange={(checked) => {
                                handleFilterChange("hasCustomFields", !!checked)
                              }}
                            />
                            <label htmlFor="has-custom-fields" className="text-sm">
                              Has Configurable Fields
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Status</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {availableStatuses.map((status) => (
                            <div key={status} className="flex items-center space-x-2">
                              <Checkbox
                                id={`status-${status}`}
                                checked={filters.status.includes(status)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    handleFilterChange("status", [...filters.status, status])
                                  } else {
                                    handleFilterChange(
                                      "status",
                                      filters.status.filter((s) => s !== status),
                                    )
                                  }
                                }}
                              />
                              <label htmlFor={`status-${status}`} className="text-sm">
                                {statusLabels[status]?.label || status}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setFilters({
                              categories: [],
                              status: [],
                              productUnits: [],
                              hasDimensions: false,
                              hasWeight: false,
                              hasCapacity: false,
                              hasCustomFields: false,
                              dateRange: { from: null, to: null },
                            })
                          }}
                        >
                          Reset
                        </Button>
                        <Button size="sm" onClick={() => setIsFilterOpen(false)}>
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Select
                  value={`${sortField}:${sortDirection}`}
                  onValueChange={(value) => {
                    const [field, direction] = value.split(":")
                    setSortField(field)
                    setSortDirection(direction as "asc" | "desc")
                  }}
                >
                  <SelectTrigger className="h-8 w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name:asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name:desc">Name (Z-A)</SelectItem>
                    <SelectItem value="productId:asc">ID (A-Z)</SelectItem>
                    <SelectItem value="productId:desc">ID (Z-A)</SelectItem>
                    <SelectItem value="createdAt:desc">Newest First</SelectItem>
                    <SelectItem value="createdAt:asc">Oldest First</SelectItem>
                    <SelectItem value="weight:asc">Weight (Low to High)</SelectItem>
                    <SelectItem value="weight:desc">Weight (High to Low)</SelectItem>
                    <SelectItem value="dimensions.length:asc">Length (Low to High)</SelectItem>
                    <SelectItem value="dimensions.length:desc">Length (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 px-2 lg:px-3"
                  >
                    List View
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 px-2 lg:px-3"
                  >
                    Grid View
                  </Button>
                </div>
              </div>
            </div>

            {/* Batch Actions */}
            {selectedProducts.length > 0 && (
              <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                <div className="text-sm">
                  {selectedProducts.length} product{selectedProducts.length !== 1 ? "s" : ""} selected
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    onValueChange={(value) => {
                      if (value === "delete") {
                        handleBatchDelete()
                      } else {
                        handleBatchStatusUpdate(value)
                      }
                    }}
                  >
                    <SelectTrigger className="h-8 w-[180px]">
                      <SelectValue placeholder="Batch Actions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Set as Active</SelectItem>
                      <SelectItem value="draft">Set as Draft</SelectItem>
                      <SelectItem value="discontinued">Set as Discontinued</SelectItem>
                      <SelectItem value="delete" className="text-destructive">
                        Delete Selected
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedProducts([])} className="h-8">
                    Clear Selection
                  </Button>
                </div>
              </div>
            )}

            {viewMode === "list" ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={areAllCurrentPageSelected}
                          onCheckedChange={handleSelectAllOnPage}
                          aria-label="Select all products on current page"
                        />
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                        Product Name
                        {sortField === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("productId")}>
                        Product ID
                        {sortField === "productId" && (
                          <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                        )}
                      </TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead className="hidden lg:table-cell">Dimensions</TableHead>
                      <TableHead className="hidden lg:table-cell">Weight</TableHead>
                      <TableHead className="hidden lg:table-cell">Product Unit</TableHead>
                      <TableHead className="hidden md:table-cell">Custom Fields</TableHead>
                      <TableHead className="w-[100px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentProducts.length > 0 ? (
                      currentProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={(checked) => handleSelectProduct(product.id, !!checked)}
                              aria-label={`Select ${product.name}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.productId}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="outline">{categoryLabels[product.category] || product.category}</Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{formatDimensions(product.dimensions)}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {product.weight ? `${product.weight} kg` : "N/A"}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {unitLabels[product.productUnit] || product.productUnit}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.customFields && product.customFields.length > 0
                              ? `${product.customFields.length} field(s)`
                              : "None"}
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
                                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={(e) => {
                                        e.preventDefault()
                                        setViewingProduct(product)
                                      }}
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl">
                                    <DialogHeader>
                                      <DialogTitle>Product Details</DialogTitle>
                                    </DialogHeader>
                                    {viewingProduct && (
                                      <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <h3 className="text-lg font-semibold">{viewingProduct.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                              ID: {viewingProduct.productId}
                                            </p>
                                          </div>
                                          <div className="text-right">
                                            <Badge variant={statusLabels[viewingProduct.status]?.variant || "default"}>
                                              {statusLabels[viewingProduct.status]?.label || viewingProduct.status}
                                            </Badge>
                                          </div>
                                        </div>

                                        <Tabs defaultValue="details">
                                          <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="details">Basic Details</TabsTrigger>
                                            <TabsTrigger value="specs">Product Definition</TabsTrigger>
                                            <TabsTrigger value="custom">Configurable Fields</TabsTrigger>
                                          </TabsList>

                                          <TabsContent value="details" className="space-y-4 pt-4">
                                            <div className="grid grid-cols-2 gap-4">
                                              <div>
                                                <h4 className="text-sm font-medium">Category</h4>
                                                <p>
                                                  {categoryLabels[viewingProduct.category] || viewingProduct.category}
                                                </p>
                                              </div>
                                              <div>
                                                <h4 className="text-sm font-medium">Unit Type</h4>
                                                <p>
                                                  {unitLabels[viewingProduct.productUnit] || viewingProduct.productUnit}
                                                </p>
                                              </div>
                                            </div>

                                            <div>
                                              <h4 className="text-sm font-medium">Description</h4>
                                              <p className="text-sm">
                                                {viewingProduct.description || "No description available."}
                                              </p>
                                            </div>

                                            <div>
                                              <h4 className="text-sm font-medium">Dates</h4>
                                              <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                  <p className="text-muted-foreground">Created:</p>
                                                  <p>{formatDate(viewingProduct.createdAt)}</p>
                                                </div>
                                                <div>
                                                  <p className="text-muted-foreground">Last Updated:</p>
                                                  <p>{formatDate(viewingProduct.updatedAt)}</p>
                                                </div>
                                              </div>
                                            </div>
                                          </TabsContent>

                                          <TabsContent value="specs" className="space-y-4 pt-4">
                                            <div className="grid grid-cols-2 gap-4">
                                              <div>
                                                <h4 className="text-sm font-medium">Dimensions</h4>
                                                <p>{formatDimensions(viewingProduct.dimensions)}</p>
                                              </div>
                                              <div>
                                                <h4 className="text-sm font-medium">Weight</h4>
                                                <p>{viewingProduct.weight ? `${viewingProduct.weight} kg` : "N/A"}</p>
                                              </div>
                                            </div>

                                            {viewingProduct.capacity && (
                                              <div>
                                                <h4 className="text-sm font-medium">Capacity</h4>
                                                <p>{viewingProduct.capacity}</p>
                                              </div>
                                            )}
                                          </TabsContent>

                                          <TabsContent value="custom" className="space-y-4 pt-4">
                                            {viewingProduct.customFields && viewingProduct.customFields.length > 0 ? (
                                              <div>
                                                <h4 className="text-sm font-medium">Configurable Fields</h4>
                                                <div className="grid grid-cols-2 gap-2 mt-2">
                                                  {viewingProduct.customFields.map((field: any, index: number) => (
                                                    <div key={index} className="flex justify-between border-b pb-1">
                                                      <span className="text-sm text-muted-foreground">
                                                        {field.name}:
                                                      </span>
                                                      <span className="text-sm">{field.value}</span>
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            ) : (
                                              <p className="text-sm text-muted-foreground">
                                                No configurable fields defined for this product.
                                              </p>
                                            )}
                                          </TabsContent>
                                        </Tabs>
                                      </div>
                                    )}
                                    <DialogFooter>
                                      <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                                        Close
                                      </Button>
                                      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                        <DialogTrigger asChild>
                                          <Button
                                            onClick={() => {
                                              setEditingProduct(viewingProduct)
                                            }}
                                          >
                                            Edit Product
                                          </Button>
                                        </DialogTrigger>
                                      </Dialog>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={(e) => {
                                        e.preventDefault()
                                        setEditingProduct(product)
                                      }}
                                    >
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-4xl">
                                    <DialogHeader>
                                      <DialogTitle>Edit Product</DialogTitle>
                                      <DialogDescription>Make changes to the product details.</DialogDescription>
                                    </DialogHeader>
                                    {editingProduct && (
                                      <ProductForm
                                        initialData={{
                                          name: editingProduct.name,
                                          productId: editingProduct.productId,
                                          category: editingProduct.category,
                                          productUnit: editingProduct.productUnit,
                                          dimensions: editingProduct.dimensions,
                                          weight: editingProduct.weight,
                                          capacity: editingProduct.capacity,
                                          description: editingProduct.description,
                                          customFields: editingProduct.customFields || [],
                                          skus: [],
                                          steps: [],
                                        }}
                                        onSubmit={handleEditProduct}
                                        onCancel={() => setIsEditDialogOpen(false)}
                                      />
                                    )}
                                  </DialogContent>
                                </Dialog>
                                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={(e) => {
                                        e.preventDefault()
                                        setEditingProduct(product)
                                      }}
                                      className="text-destructive focus:text-destructive"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Delete Product</DialogTitle>
                                      <DialogDescription>
                                        Are you sure you want to delete this product? This action cannot be undone.
                                      </DialogDescription>
                                    </DialogHeader>
                                    {editingProduct && (
                                      <div className="py-4">
                                        <p>
                                          You are about to delete: <strong>{editingProduct.name}</strong>
                                        </p>
                                      </div>
                                    )}
                                    <DialogFooter>
                                      <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                        Cancel
                                      </Button>
                                      <Button variant="destructive" onClick={handleDeleteProduct}>
                                        Delete
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No products found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={(checked) => handleSelectProduct(product.id, !!checked)}
                              aria-label={`Select ${product.name}`}
                            />
                            <div>
                              <CardTitle className="text-lg">{product.name}</CardTitle>
                              <CardDescription className="mt-1">ID: {product.productId}</CardDescription>
                            </div>
                          </div>
                          <Badge variant={statusLabels[product.status]?.variant || "default"}>
                            {statusLabels[product.status]?.label || product.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                          <div>
                            <span className="text-muted-foreground">Category:</span>
                            <div className="mt-1">
                              <Badge variant="outline">{categoryLabels[product.category] || product.category}</Badge>
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Product Unit:</span>
                            <div className="mt-1">{unitLabels[product.productUnit] || product.productUnit}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Dimensions:</span>
                            <div className="mt-1">{formatDimensions(product.dimensions)}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Weight:</span>
                            <div className="mt-1">{product.weight ? `${product.weight} kg` : "N/A"}</div>
                          </div>
                          {product.capacity && (
                            <div>
                              <span className="text-muted-foreground">Capacity:</span>
                              <div className="mt-1">{product.capacity}</div>
                            </div>
                          )}
                          <div>
                            <span className="text-muted-foreground">Custom Fields:</span>
                            <div className="mt-1">
                              {product.customFields && product.customFields.length > 0
                                ? `${product.customFields.length} field(s)`
                                : "None"}
                            </div>
                          </div>
                        </div>
                        {product.customFields && product.customFields.length > 0 && (
                          <div className="mt-3 pt-3 border-t">
                            <span className="text-xs font-medium">Configurable Fields:</span>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                              {product.customFields.slice(0, 4).map((field: any, index: number) => (
                                <div key={index} className="text-xs flex justify-between">
                                  <span className="text-muted-foreground">{field.name}:</span>
                                  <span className="truncate max-w-[100px]">{field.value}</span>
                                </div>
                              ))}
                              {product.customFields.length > 4 && (
                                <div className="text-xs text-muted-foreground col-span-2 text-right">
                                  +{product.customFields.length - 4} more fields
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setViewingProduct(product)}>
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setEditingProduct(product)}>
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              Edit
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingProduct(product)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-1" />
                              Delete
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center h-24 border rounded-md">
                    No products found.
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                  {filteredProducts.length} products
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
    </div>
  )
}
