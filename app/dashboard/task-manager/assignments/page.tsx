"use client"

import { useState } from "react"
import {
  CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  MoreHorizontal,
  Search,
  User,
} from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Sample PRFP (Production Request For Production) items data
const initialItems = [
  {
    id: "PRFP-2023-001",
    poId: "PO-2023-001",
    product: "Office Chair - Standard",
    quantity: 10,
    step: "Upholster Seat and Back",
    skill: "Upholstery",
    duration: "1 hour per unit",
    status: "Pending Assignment",
    assignedTo: null,
    startDate: null,
    endDate: null,
    priority: "High",
  },
  {
    id: "PRFP-2023-002",
    poId: "PO-2023-001",
    product: "Office Chair - Standard",
    quantity: 10,
    step: "Assemble Chair Base",
    skill: "Assembly",
    duration: "45 minutes per unit",
    status: "Pending Assignment",
    assignedTo: null,
    startDate: null,
    endDate: null,
    priority: "High",
  },
  {
    id: "PRFP-2023-003",
    poId: "PO-2023-001",
    product: "Office Desk - Adjustable",
    quantity: 5,
    step: "Cut Wood Panels",
    skill: "Woodworking",
    duration: "2 hours per unit",
    status: "Assigned",
    assignedTo: "John Smith",
    startDate: "2023-11-05",
    endDate: "2023-11-07",
    priority: "High",
  },
  {
    id: "PRFP-2023-004",
    poId: "PO-2023-002",
    product: "Bookshelf - 5 Shelf",
    quantity: 8,
    step: "Cut Wood Panels",
    skill: "Woodworking",
    duration: "1.5 hours per unit",
    status: "Pending Assignment",
    assignedTo: null,
    startDate: null,
    endDate: null,
    priority: "Medium",
  },
  {
    id: "PRFP-2023-005",
    poId: "PO-2023-003",
    product: "Filing Cabinet - 3 Drawer",
    quantity: 3,
    step: "Assemble Frame",
    skill: "Assembly",
    duration: "2 hours per unit",
    status: "Assigned",
    assignedTo: "Emily Johnson",
    startDate: "2023-11-08",
    endDate: "2023-11-09",
    priority: "Low",
  },
  {
    id: "PRFP-2023-006",
    poId: "PO-2023-004",
    product: "Conference Table - 8 Person",
    quantity: 2,

    poId: "PO-2023-004",
    product: "Conference Table - 8 Person",
    quantity: 2,
    step: "Apply Finish",
    skill: "Finishing",
    duration: "3 hours per unit",
    status: "Pending Assignment",
    assignedTo: null,
    startDate: null,
    endDate: null,
    priority: "High",
  },
  {
    id: "PRFP-2023-007",
    poId: "PO-2023-005",
    product: "Standing Desk Converter",
    quantity: 15,
    step: "Install Adjustment Mechanism",
    skill: "Mechanical",
    duration: "1 hour per unit",
    status: "Assigned",
    assignedTo: "Michael Brown",
    startDate: "2023-11-10",
    endDate: "2023-11-15",
    priority: "Medium",
  },
]

// Sample workers data
const workers = [
  {
    id: 1,
    name: "John Smith",
    skills: ["Woodworking", "Assembly"],
    availability: "Available",
    currentLoad: "Medium",
    completionRate: "95%",
  },
  {
    id: 2,
    name: "Emily Johnson",
    skills: ["Assembly", "Finishing"],
    availability: "Available",
    currentLoad: "Low",
    completionRate: "98%",
  },
  {
    id: 3,
    name: "Michael Brown",
    skills: ["Mechanical", "Electrical"],
    availability: "Busy until Nov 15",
    currentLoad: "High",
    completionRate: "92%",
  },
  {
    id: 4,
    name: "Sarah Davis",
    skills: ["Upholstery", "Finishing"],
    availability: "Available",
    currentLoad: "Low",
    completionRate: "97%",
  },
  {
    id: 5,
    name: "Robert Wilson",
    skills: ["Woodworking", "CNC Operation"],
    availability: "Available",
    currentLoad: "Medium",
    completionRate: "94%",
  },
  {
    id: 6,
    name: "Jennifer Taylor",
    skills: ["Assembly", "Quality Control"],
    availability: "Busy until Nov 12",
    currentLoad: "High",
    completionRate: "96%",
  },
]

export default function TaskAssignmentPage() {
  const [items, setItems] = useState(initialItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [skillFilter, setSkillFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)

  const itemsPerPage = 5

  // Filter items based on search term, status filter, and skill filter
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.poId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.step.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.assignedTo && item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "All" || item.status === statusFilter
    const matchesSkill = skillFilter === "All" || item.skill === skillFilter
    return matchesSearch && matchesStatus && matchesSkill
  })

  // Paginate items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle assigning a task
  const handleAssignTask = () => {
    if (!selectedItem || !selectedWorker || !startDate) return

    // Calculate end date based on duration and quantity
    const durationPerUnit = Number.parseInt(selectedItem.duration.split(" ")[0])
    const totalHours = durationPerUnit * selectedItem.quantity
    const daysNeeded = Math.ceil(totalHours / 8) // Assuming 8-hour workdays

    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + daysNeeded)

    setItems(
      items.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              status: "Assigned",
              assignedTo: selectedWorker,
              startDate: format(startDate, "yyyy-MM-dd"),
              endDate: format(endDate, "yyyy-MM-dd"),
            }
          : item,
      ),
    )

    setIsAssignDialogOpen(false)
    setSelectedWorker(null)
    setStartDate(undefined)
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending Assignment":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending Assignment
          </Badge>
        )
      case "Assigned":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Assigned
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

  // Get worker availability badge color
  const getAvailabilityBadge = (availability: string) => {
    if (availability === "Available") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>
    } else {
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">{availability}</Badge>
    }
  }

  // Get worker load badge color
  const getLoadBadge = (load: string) => {
    switch (load) {
      case "Low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>
      case "Medium":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medium</Badge>
      case "High":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
      default:
        return <Badge>{load}</Badge>
    }
  }

  // Filter workers based on required skill
  const getEligibleWorkers = (requiredSkill: string) => {
    return workers.filter((worker) => worker.skills.includes(requiredSkill))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Task Assignment</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Production Tasks</CardTitle>
          <CardDescription>Assign manufacturing tasks to workers and set start dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
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
                      <SelectItem value="Pending Assignment">Pending Assignment</SelectItem>
                      <SelectItem value="Assigned">Assigned</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="skill-filter" className="whitespace-nowrap">
                    Skill:
                  </Label>
                  <Select onValueChange={(value) => setSkillFilter(value)} defaultValue="All">
                    <SelectTrigger id="skill-filter" className="w-[180px]">
                      <SelectValue placeholder="All Skills" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Skills</SelectItem>
                      <SelectItem value="Woodworking">Woodworking</SelectItem>
                      <SelectItem value="Assembly">Assembly</SelectItem>
                      <SelectItem value="Finishing">Finishing</SelectItem>
                      <SelectItem value="Upholstery">Upholstery</SelectItem>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="CNC Operation">CNC Operation</SelectItem>
                      <SelectItem value="Quality Control">Quality Control</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Step</TableHead>
                    <TableHead>Skill</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>
                          <div className="max-w-[150px] truncate" title={item.product}>
                            {item.product}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[150px] truncate" title={item.step}>
                            {item.step}
                          </div>
                        </TableCell>
                        <TableCell>{item.skill}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>{item.assignedTo || "-"}</TableCell>
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
                              {item.status === "Pending Assignment" && (
                                <DialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => {
                                      e.preventDefault()
                                      setSelectedItem(item)
                                      setIsAssignDialogOpen(true)
                                    }}
                                  >
                                    <User className="mr-2 h-4 w-4" />
                                    Assign Worker
                                  </DropdownMenuItem>
                                </DialogTrigger>
                              )}
                              {item.status === "Assigned" && (
                                <DropdownMenuItem>
                                  <Clock className="mr-2 h-4 w-4" />
                                  Mark as In Progress
                                </DropdownMenuItem>
                              )}
                              {item.status === "In Progress" && (
                                <DropdownMenuItem>
                                  <Check className="mr-2 h-4 w-4" />
                                  Mark as Completed
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        No tasks found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredItems.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredItems.length)} of{" "}
                  {filteredItems.length} tasks
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

      {/* Assign Task Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Assign Task to Worker</DialogTitle>
            <DialogDescription>Select a worker and start date for this manufacturing task.</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Task ID</h3>
                  <p className="text-base">{selectedItem.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Product</h3>
                  <p className="text-base">{selectedItem.product}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Step</h3>
                  <p className="text-base">{selectedItem.step}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Required Skill</h3>
                  <p className="text-base">{selectedItem.skill}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Quantity</h3>
                  <p className="text-base">{selectedItem.quantity}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
                  <p className="text-base">{selectedItem.duration}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="worker-select">Select Worker</Label>
                  <Select onValueChange={setSelectedWorker}>
                    <SelectTrigger id="worker-select">
                      <SelectValue placeholder="Select a worker" />
                    </SelectTrigger>
                    <SelectContent>
                      {getEligibleWorkers(selectedItem.skill).map((worker) => (
                        <SelectItem key={worker.id} value={worker.name}>
                          <div className="flex items-center justify-between w-full">
                            <span>{worker.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{getLoadBadge(worker.currentLoad)}</span>
                              <span className="text-xs text-muted-foreground">
                                {getAvailabilityBadge(worker.availability)}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="start-date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                {selectedWorker && startDate && (
                  <div className="rounded-md border p-4 bg-muted/50">
                    <h3 className="font-medium mb-2">Assignment Summary</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Worker:</span> {selectedWorker}
                      </p>
                      <p>
                        <span className="font-medium">Start Date:</span> {format(startDate, "PPP")}
                      </p>
                      <p>
                        <span className="font-medium">Estimated Completion:</span> {(() => {
                          const durationPerUnit = Number.parseInt(selectedItem.duration.split(" ")[0])
                          const totalHours = durationPerUnit * selectedItem.quantity
                          const daysNeeded = Math.ceil(totalHours / 8) // Assuming 8-hour workdays

                          const endDate = new Date(startDate)
                          endDate.setDate(endDate.getDate() + daysNeeded)

                          return format(endDate, "PPP")
                        })()}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAssignTask} disabled={!selectedWorker || !startDate}>
                  Assign Task
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
