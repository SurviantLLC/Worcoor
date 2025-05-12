"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Edit,
  MoreHorizontal,
  Search,
  Trash2,
  UserPlus,
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

// Sample user data
const initialUsers = [
  { id: 1, name: "John Doe", role: "Admin", mobile: "+1 (555) 123-4567" },
  { id: 2, name: "Jane Smith", role: "Product Manager", mobile: "+1 (555) 234-5678" },
  { id: 3, name: "Robert Johnson", role: "Task Manager", mobile: "+1 (555) 345-6789" },
  { id: 4, name: "Emily Davis", role: "Worker", mobile: "+1 (555) 456-7890" },
  { id: 5, name: "Michael Wilson", role: "Admin", mobile: "+1 (555) 567-8901" },
  { id: 6, name: "Sarah Brown", role: "Product Manager", mobile: "+1 (555) 678-9012" },
  { id: 7, name: "David Miller", role: "Worker", mobile: "+1 (555) 789-0123" },
  { id: 8, name: "Jennifer Taylor", role: "Task Manager", mobile: "+1 (555) 890-1234" },
  { id: 9, name: "James Anderson", role: "Worker", mobile: "+1 (555) 901-2345" },
  { id: 10, name: "Lisa Thomas", role: "Worker", mobile: "+1 (555) 012-3456" },
]

export default function UserManagementPage() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({ name: "", role: "", mobile: "" })

  const itemsPerPage = 5

  // Filter users based on search term and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.mobile.includes(searchTerm)
    const matchesRole = roleFilter === "All" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  // Paginate users
  const indexOfLastUser = currentPage * itemsPerPage
  const indexOfFirstUser = indexOfLastUser - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle adding a new user
  const handleAddUser = () => {
    const id = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1
    setUsers([...users, { id, ...newUser }])
    setNewUser({ name: "", role: "", mobile: "" })
    setIsAddDialogOpen(false)
  }

  // Handle editing a user
  const handleEditUser = () => {
    if (!editingUser) return

    setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)))
    setIsEditDialogOpen(false)
  }

  // Handle deleting a user
  const handleDeleteUser = () => {
    if (!editingUser) return

    setUsers(users.filter((user) => user.id !== editingUser.id))
    setIsDeleteDialogOpen(false)
  }

  const getQuantityBadge = (quantity: number, minQuantity: number) => {
    if (quantity <= 0) {
      return <Badge className="bg-secondary/20 text-secondary border-secondary/30">Out of Stock</Badge>
    } else if (quantity < minQuantity) {
      return <Badge className="bg-secondary/20 text-secondary border-secondary/30">Low Stock</Badge>
    } else {
      return <Badge className="bg-secondary/20 text-secondary border-secondary/30">In Stock</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold text-primary">User Management</h1>
        <p className="text-muted-foreground">Add, edit, and manage system users</p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div></div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Add a new user to the system. Fill in all required fields.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Product Manager">Product Manager</SelectItem>
                    <SelectItem value="Task Manager">Task Manager</SelectItem>
                    <SelectItem value="Worker">Worker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  value={newUser.mobile}
                  onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
                  placeholder="Enter mobile number"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Users</CardTitle>
          <CardDescription>Manage users and their roles in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="role-filter" className="whitespace-nowrap">
                  Filter by Role:
                </Label>
                <Select onValueChange={(value) => setRoleFilter(value)} defaultValue="All">
                  <SelectTrigger id="role-filter" className="w-[180px]">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Product Manager">Product Manager</SelectItem>
                    <SelectItem value="Task Manager">Task Manager</SelectItem>
                    <SelectItem value="Worker">Worker</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Mobile Number</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.mobile}</TableCell>
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
                              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => {
                                      e.preventDefault()
                                      setEditingUser(user)
                                    }}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit User</DialogTitle>
                                    <DialogDescription>Make changes to the user's information.</DialogDescription>
                                  </DialogHeader>
                                  {editingUser && (
                                    <div className="grid gap-4 py-4">
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-name">Name</Label>
                                        <Input
                                          id="edit-name"
                                          value={editingUser.name}
                                          onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                        />
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-role">Role</Label>
                                        <Select
                                          defaultValue={editingUser.role}
                                          onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
                                        >
                                          <SelectTrigger id="edit-role">
                                            <SelectValue placeholder="Select role" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Admin">Admin</SelectItem>
                                            <SelectItem value="Product Manager">Product Manager</SelectItem>
                                            <SelectItem value="Task Manager">Task Manager</SelectItem>
                                            <SelectItem value="Worker">Worker</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-mobile">Mobile Number</Label>
                                        <Input
                                          id="edit-mobile"
                                          value={editingUser.mobile}
                                          onChange={(e) => setEditingUser({ ...editingUser, mobile: e.target.value })}
                                        />
                                      </div>
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                      Cancel
                                    </Button>
                                    <Button onClick={handleEditUser}>Save Changes</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => {
                                      e.preventDefault()
                                      setEditingUser(user)
                                    }}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Delete User</DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to delete this user? This action cannot be undone.
                                    </DialogDescription>
                                  </DialogHeader>
                                  {editingUser && (
                                    <div className="py-4">
                                      <p>
                                        You are about to delete: <strong>{editingUser.name}</strong>
                                      </p>
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                      Cancel
                                    </Button>
                                    <Button variant="destructive" onClick={handleDeleteUser}>
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
                      <TableCell colSpan={4} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredUsers.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
                  {filteredUsers.length} users
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
