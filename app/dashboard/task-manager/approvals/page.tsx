"use client"

import { useState } from "react"
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileText,
  MoreHorizontal,
  Search,
  ShoppingCart,
  X,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Sample production requests data
const initialRequests = [
  {
    id: "PR-2023-001",
    poId: "PO-2023-001",
    date: "2023-10-15",
    products: [
      { name: "Office Chair - Standard", quantity: 10, availability: "Full" },
      { name: "Office Desk - Adjustable", quantity: 5, availability: "Partial" },
    ],
    status: "Pending",
    requestedBy: "John Doe",
    priority: "High",
    inventoryStatus: "Partial",
  },
  {
    id: "PR-2023-002",
    poId: "PO-2023-002",
    date: "2023-10-18",
    products: [{ name: "Bookshelf - 5 Shelf", quantity: 8, availability: "None" }],
    status: "Pending",
    requestedBy: "Jane Smith",
    priority: "Medium",
    inventoryStatus: "None",
  },
  {
    id: "PR-2023-003",
    poId: "PO-2023-003",
    date: "2023-10-20",
    products: [
      { name: "Filing Cabinet - 3 Drawer", quantity: 3, availability: "Full" },
      { name: "Office Chair - Standard", quantity: 5, availability: "Full" },
    ],
    status: "Approved",
    requestedBy: "Robert Johnson",
    priority: "Low",
    inventoryStatus: "Full",
  },
  {
    id: "PR-2023-004",
    poId: "PO-2023-004",
    date: "2023-10-22",
    products: [{ name: "Conference Table - 8 Person", quantity: 2, availability: "Partial" }],
    status: "Procurement Raised",
    requestedBy: "Emily Davis",
    priority: "High",
    inventoryStatus: "Partial",
  },
  {
    id: "PR-2023-005",
    poId: "PO-2023-005",
    date: "2023-10-25",
    products: [
      { name: "Standing Desk Converter", quantity: 15, availability: "Full" },
      { name: "Monitor Stand - Dual", quantity: 10, availability: "Full" },
    ],
    status: "Approved",
    requestedBy: "Michael Wilson",
    priority: "Medium",
    inventoryStatus: "Full",
  },
  {
    id: "PR-2023-006",
    poId: "PO-2023-006",
    date: "2023-10-28",
    products: [{ name: "Executive Chair - Leather", quantity: 3, availability: "Partial" }],
    status: "Pending",
    requestedBy: "Sarah Brown",
    priority: "High",
    inventoryStatus: "Partial",
  },
  {
    id: "PR-2023-007",
    poId: "PO-2023-007",
    date: "2023-10-30",
    products: [
      { name: "Keyboard Tray - Adjustable", quantity: 12, availability: "None" },
      { name: "Desk Lamp - LED", quantity: 20, availability: "Full" },
    ],
    status: "Rejected",
    requestedBy: "David Miller",
    priority: "Low",
    inventoryStatus: "Partial",
  },
]

export default function ProductionApprovalsPage() {
  const [requests, setRequests] = useState(initialRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [inventoryFilter, setInventoryFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isProcurementDialogOpen, setIsProcurementDialogOpen] = useState(false)
  const [comments, setComments] = useState("")

  const itemsPerPage = 5

  // Filter requests based on search term, status filter, and inventory filter
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.poId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.products.some((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || request.status === statusFilter
    const matchesInventory = inventoryFilter === "All" || request.inventoryStatus === inventoryFilter
    return matchesSearch && matchesStatus && matchesInventory
  })

  // Paginate requests
  const indexOfLastRequest = currentPage * itemsPerPage
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest)
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle approving a request
  const handleApproveRequest = () => {
    if (!selectedRequest) return

    setRequests(
      requests.map((request) => (request.id === selectedRequest.id ? { ...request, status: "Approved" } : request)),
    )
    setIsApproveDialogOpen(false)
    setComments("")
  }

  // Handle rejecting a request
  const handleRejectRequest = () => {
    if (!selectedRequest) return

    setRequests(
      requests.map((request) => (request.id === selectedRequest.id ? { ...request, status: "Rejected" } : request)),
    )
    setIsRejectDialogOpen(false)
    setComments("")
  }

  // Handle raising procurement for a request
  const handleRaiseProcurement = () => {
    if (!selectedRequest) return

    setRequests(
      requests.map((request) =>
        request.id === selectedRequest.id ? { ...request, status: "Procurement Raised" } : request,
      ),
    )
    setIsProcurementDialogOpen(false)
    setComments("")
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "Approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      case "Procurement Raised":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Procurement Raised
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Get inventory status badge color
  const getInventoryBadge = (status: string) => {
    switch (status) {
      case "Full":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Full</Badge>
      case "Partial":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Partial</Badge>
      case "None":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">None</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Get inventory status icon
  const getInventoryIcon = (status: string) => {
    switch (status) {
      case "Full":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "Partial":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case "None":
        return <X className="h-5 w-5 text-red-500" />
      default:
        return null
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
        <h1 className="text-3xl font-bold">Production Request Approvals</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Production Requests</CardTitle>
          <CardDescription>Review and approve production requests based on inventory availability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
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
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                      <SelectItem value="Procurement Raised">Procurement Raised</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="inventory-filter" className="whitespace-nowrap">
                    Inventory:
                  </Label>
                  <Select onValueChange={(value) => setInventoryFilter(value)} defaultValue="All">
                    <SelectTrigger id="inventory-filter" className="w-[180px]">
                      <SelectValue placeholder="All Inventory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Availability</SelectItem>
                      <SelectItem value="Full">Full</SelectItem>
                      <SelectItem value="Partial">Partial</SelectItem>
                      <SelectItem value="None">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>PO ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Inventory</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentRequests.length > 0 ? (
                    currentRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>{request.poId}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>{request.requestedBy}</TableCell>
                        <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                        <TableCell>{getInventoryBadge(request.inventoryStatus)}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
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
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    setSelectedRequest(request)
                                    setIsDetailsDialogOpen(true)
                                  }}
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                              </DialogTrigger>
                              {request.status === "Pending" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={(e) => {
                                        e.preventDefault()
                                        setSelectedRequest(request)
                                        setIsApproveDialogOpen(true)
                                      }}
                                    >
                                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                      Approve
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={(e) => {
                                        e.preventDefault()
                                        setSelectedRequest(request)
                                        setIsProcurementDialogOpen(true)
                                      }}
                                    >
                                      <ShoppingCart className="mr-2 h-4 w-4 text-blue-500" />
                                      Raise Procurement
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={(e) => {
                                        e.preventDefault()
                                        setSelectedRequest(request)
                                        setIsRejectDialogOpen(true)
                                      }}
                                      className="text-destructive focus:text-destructive"
                                    >
                                      <X className="mr-2 h-4 w-4" />
                                      Reject
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No production requests found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredRequests.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {indexOfFirstRequest + 1} to {Math.min(indexOfLastRequest, filteredRequests.length)} of{" "}
                  {filteredRequests.length} requests
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

      {/* Request Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Production Request Details</DialogTitle>
            <DialogDescription>
              Review the details of the production request and inventory availability.
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Request ID</h3>
                  <p className="text-base">{selectedRequest.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">PO ID</h3>
                  <p className="text-base">{selectedRequest.poId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                  <p className="text-base">{selectedRequest.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Requested By</h3>
                  <p className="text-base">{selectedRequest.requestedBy}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
                  <p className="text-base">{getPriorityBadge(selectedRequest.priority)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <p className="text-base">{getStatusBadge(selectedRequest.status)}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Inventory Availability</h3>
                <div className="flex items-center gap-2 mb-4">
                  {getInventoryIcon(selectedRequest.inventoryStatus)}
                  <span className="font-medium">
                    {selectedRequest.inventoryStatus === "Full"
                      ? "All required items are available in inventory"
                      : selectedRequest.inventoryStatus === "Partial"
                        ? "Some items are partially available in inventory"
                        : "Required items are not available in inventory"}
                  </span>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Availability</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedRequest.products.map((product: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{getInventoryBadge(product.availability)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {selectedRequest.status === "Pending" && (
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                    Close
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setIsDetailsDialogOpen(false)
                      setIsRejectDialogOpen(true)
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDetailsDialogOpen(false)
                      setIsProcurementDialogOpen(true)
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Raise Procurement
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => {
                      setIsDetailsDialogOpen(false)
                      setIsApproveDialogOpen(true)
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Production Request</DialogTitle>
            <DialogDescription>Approve this production request and proceed with manufacturing.</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Confirm Approval</AlertTitle>
                <AlertDescription>
                  You are about to approve production request {selectedRequest.id} for {selectedRequest.poId}.
                </AlertDescription>
              </Alert>

              {selectedRequest.inventoryStatus !== "Full" && (
                <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Inventory Warning</AlertTitle>
                  <AlertDescription>
                    Not all required items are available in inventory. Consider raising procurement for missing items.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="approve-comments">Comments (Optional)</Label>
                <Textarea
                  id="approve-comments"
                  placeholder="Add any comments or instructions for the production team..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleApproveRequest}>Approve Request</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Production Request</DialogTitle>
            <DialogDescription>Reject this production request and provide a reason.</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <Alert className="bg-red-50 text-red-800 border-red-200">
                <X className="h-4 w-4" />
                <AlertTitle>Confirm Rejection</AlertTitle>
                <AlertDescription>
                  You are about to reject production request {selectedRequest.id} for {selectedRequest.poId}.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="reject-reason">Reason for Rejection (Required)</Label>
                <Textarea
                  id="reject-reason"
                  placeholder="Provide a reason for rejecting this production request..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  required
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleRejectRequest} disabled={!comments.trim()}>
                  Reject Request
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Procurement Dialog */}
      <Dialog open={isProcurementDialogOpen} onOpenChange={setIsProcurementDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Raise Procurement</DialogTitle>
            <DialogDescription>Raise procurement for missing inventory items.</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <ShoppingCart className="h-4 w-4" />
                <AlertTitle>Confirm Procurement</AlertTitle>
                <AlertDescription>
                  You are about to raise procurement for missing items in production request {selectedRequest.id}.
                </AlertDescription>
              </Alert>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>To Procure</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedRequest.products
                      .filter((product: any) => product.availability !== "Full")
                      .map((product: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>
                            {product.availability === "None" ? "0" : Math.floor(product.quantity * 0.6)}
                          </TableCell>
                          <TableCell>
                            {product.availability === "None" ? product.quantity : Math.ceil(product.quantity * 0.4)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-2">
                <Label htmlFor="procurement-comments">Additional Instructions (Optional)</Label>
                <Textarea
                  id="procurement-comments"
                  placeholder="Add any specific instructions for procurement..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsProcurementDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRaiseProcurement}>Raise Procurement</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
