"use client"

import type React from "react"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ClipboardList,
  Download,
  Edit,
  ExternalLink,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
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
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ProductOrderForm } from "@/components/task-manager/product-order-form"

// Sample production orders data
const initialOrders = [
  {
    id: "PO-2023-001",
    type: "Internal",
    date: "2023-10-15",
    products: ["Office Chair - Standard", "Office Desk - Adjustable"],
    status: "In Progress",
    requestedBy: "John Doe",
    priority: "High",
  },
  {
    id: "PO-2023-002",
    type: "External",
    date: "2023-10-18",
    products: ["Bookshelf - 5 Shelf"],
    status: "Pending Approval",
    requestedBy: "Jane Smith",
    priority: "Medium",
  },
  {
    id: "PO-2023-003",
    type: "Internal",
    date: "2023-10-20",
    products: ["Filing Cabinet - 3 Drawer", "Office Chair - Standard"],
    status: "Approved",
    requestedBy: "Robert Johnson",
    priority: "Low",
  },
  {
    id: "PO-2023-004",
    type: "External",
    date: "2023-10-22",
    products: ["Conference Table - 8 Person"],
    status: "In Progress",
    requestedBy: "Emily Davis",
    priority: "High",
  },
  {
    id: "PO-2023-005",
    type: "Internal",
    date: "2023-10-25",
    products: ["Standing Desk Converter", "Monitor Stand - Dual"],
    status: "Completed",
    requestedBy: "Michael Wilson",
    priority: "Medium",
  },
  {
    id: "PO-2023-006",
    type: "External",
    date: "2023-10-28",
    products: ["Executive Chair - Leather"],
    status: "Pending Approval",
    requestedBy: "Sarah Brown",
    priority: "High",
  },
  {
    id: "PO-2023-007",
    type: "Internal",
    date: "2023-10-30",
    products: ["Keyboard Tray - Adjustable", "Desk Lamp - LED"],
    status: "Approved",
    requestedBy: "David Miller",
    priority: "Low",
  },
]

export default function ProductionOrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [editingOrder, setEditingOrder] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [orderType, setOrderType] = useState("Internal")

  const itemsPerPage = 5

  // Filter orders based on search term, status filter, and type filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some((product) => product.toLowerCase().includes(searchTerm.toLowerCase())) ||
      order.requestedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || order.status === statusFilter
    const matchesType = typeFilter === "All" || order.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  // Paginate orders
  const indexOfLastOrder = currentPage * itemsPerPage
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle adding a new order
  const handleAddOrder = (orderData: any) => {
    const newId = `PO-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, "0")}`
    setOrders([
      ...orders,
      {
        id: newId,
        type: orderType,
        date: new Date().toISOString().split("T")[0],
        products: orderData.products,
        status: "Pending Approval",
        requestedBy: orderData.requestedBy,
        priority: orderData.priority,
      },
    ])
    setIsAddDialogOpen(false)
  }

  // Handle editing an order
  const handleEditOrder = (orderData: any) => {
    if (!editingOrder) return

    setOrders(
      orders.map((order) =>
        order.id === editingOrder.id
          ? {
              ...order,
              products: orderData.products,
              requestedBy: orderData.requestedBy,
              priority: orderData.priority,
            }
          : order,
      ),
    )
    setIsEditDialogOpen(false)
  }

  // Handle deleting an order
  const handleDeleteOrder = () => {
    if (!editingOrder) return

    setOrders(orders.filter((order) => order.id !== editingOrder.id))
    setIsDeleteDialogOpen(false)
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending Approval
          </Badge>
        )
      case "Approved":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Approved
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            In Progress
          </Badge>
        )
      case "Completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Get priority badge color
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
      case "Medium":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medium</Badge>
      case "Low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Production Orders</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create PO
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Order Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={orderType} onValueChange={setOrderType}>
              <DropdownMenuRadioItem value="Internal">Internal</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="External">External</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={() => setIsAddDialogOpen(true)}>
                <ClipboardList className="mr-2 h-4 w-4" />
                Continue
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Production Orders</CardTitle>
          <CardDescription>Manage production orders and track their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="status-filter" className="whitespace-nowrap">
                    Status:
                  </Label>
                  <Select onValueChange={(value) => setStatusFilter(value)} defaultValue="All">
                    <SelectTrigger id="status-filter" className="w-[180px]">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Statuses</SelectItem>
                      <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
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
                      <SelectItem value="Internal">Internal</SelectItem>
                      <SelectItem value="External">External</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentOrders.length > 0 ? (
                    currentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {order.type === "External" && (
                              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                            )}
                            {order.type}
                          </div>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate">{order.products.join(", ")}</div>
                        </TableCell>
                        <TableCell>{order.requestedBy}</TableCell>
                        <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
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
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/task-manager/orders/${order.id}`}>
                                  <ClipboardList className="mr-2 h-4 w-4" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => {
                                      e.preventDefault()
                                      setEditingOrder(order)
                                    }}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  <DialogHeader>
                                    <DialogTitle>Edit Production Order</DialogTitle>
                                    <DialogDescription>Make changes to the production order details.</DialogDescription>
                                  </DialogHeader>
                                  {editingOrder && (
                                    <ProductOrderForm
                                      initialData={{
                                        products: editingOrder.products,
                                        requestedBy: editingOrder.requestedBy,
                                        priority: editingOrder.priority,
                                      }}
                                      onSubmit={handleEditOrder}
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
                                      setEditingOrder(order)
                                    }}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Delete Production Order</DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to delete this production order? This action cannot be
                                      undone.
                                    </DialogDescription>
                                  </DialogHeader>
                                  {editingOrder && (
                                    <div className="py-4">
                                      <p>
                                        You are about to delete: <strong>{editingOrder.id}</strong>
                                      </p>
                                      {editingOrder.status !== "Pending Approval" && (
                                        <p className="text-destructive mt-2">
                                          Warning: This order is already {editingOrder.status.toLowerCase()}. Deleting
                                          it may disrupt production.
                                        </p>
                                      )}
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                      Cancel
                                    </Button>
                                    <Button variant="destructive" onClick={handleDeleteOrder}>
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
                        No production orders found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredOrders.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
                  {filteredOrders.length} orders
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

      {/* Add Order Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Production Order</DialogTitle>
            <DialogDescription>
              Create a new {orderType.toLowerCase()} production order and link products.
            </DialogDescription>
          </DialogHeader>
          <ProductOrderForm onSubmit={handleAddOrder} onCancel={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Link component for navigation
function Link({ href, children, className, ...props }: React.ComponentProps<"a"> & { href: string }) {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  )
}
