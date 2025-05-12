"use client"

import { useState } from "react"

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
  const [isEdit
