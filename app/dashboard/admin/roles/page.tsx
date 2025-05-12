"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Sample user data
const initialUsers = [
  { id: 1, name: "John Doe", role: "Admin", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", role: "Product Manager", email: "jane.smith@example.com" },
  { id: 3, name: "Robert Johnson", role: "Task Manager", email: "robert.johnson@example.com" },
  { id: 4, name: "Emily Davis", role: "Worker", email: "emily.davis@example.com" },
  { id: 5, name: "Michael Wilson", role: "Admin", email: "michael.wilson@example.com" },
  { id: 6, name: "Sarah Brown", role: "Product Manager", email: "sarah.brown@example.com" },
  { id: 7, name: "David Miller", role: "Worker", email: "david.miller@example.com" },
  { id: 8, name: "Jennifer Taylor", role: "Task Manager", email: "jennifer.taylor@example.com" },
]

const roles = [
  { label: "Admin", value: "Admin" },
  { label: "Product Manager", value: "Product Manager" },
  { label: "Task Manager", value: "Task Manager" },
  { label: "Worker", value: "Worker" },
]

export default function RoleAssignmentPage() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle role change
  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold text-primary">Role Assignment</h1>
        <p className="text-muted-foreground">Assign and manage user roles and permissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assign Roles</CardTitle>
          <CardDescription>Assign or change roles for users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Current Role</TableHead>
                    <TableHead>Assign Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" role="combobox" className="w-[200px] justify-between">
                                {user.role}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Search role..." />
                                <CommandList>
                                  <CommandEmpty>No role found.</CommandEmpty>
                                  <CommandGroup>
                                    {roles.map((role) => (
                                      <CommandItem
                                        key={role.value}
                                        value={role.value}
                                        onSelect={() => handleRoleChange(user.id, role.value)}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            user.role === role.value ? "opacity-100" : "opacity-0",
                                          )}
                                        />
                                        {role.label}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
