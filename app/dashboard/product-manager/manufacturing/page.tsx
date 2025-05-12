"use client"

import { useState } from "react"
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Sample manufacturing steps data
const initialSteps = [
  {
    id: 1,
    name: "Cut Wood Panels",
    product: "Office Desk - Adjustable",
    requiredSkill: "Woodworking",
    duration: "2 hours",
    dependencies: [],
  },
  {
    id: 2,
    name: "Assemble Frame",
    product: "Office Desk - Adjustable",
    requiredSkill: "Assembly",
    duration: "1.5 hours",
    dependencies: ["Cut Wood Panels"],
  },
  {
    id: 3,
    name: "Install Adjustment Mechanism",
    product: "Office Desk - Adjustable",
    requiredSkill: "Mechanical",
    duration: "1 hour",
    dependencies: ["Assemble Frame"],
  },
  {
    id: 4,
    name: "Sand Surfaces",
    product: "Office Desk - Adjustable",
    requiredSkill: "Finishing",
    duration: "45 minutes",
    dependencies: ["Assemble Frame"],
  },
  {
    id: 5,
    name: "Apply Finish",
    product: "Office Desk - Adjustable",
    requiredSkill: "Finishing",
    duration: "30 minutes",
    dependencies: ["Sand Surfaces"],
  },
  {
    id: 6,
    name: "Quality Check",
    product: "Office Desk - Adjustable",
    requiredSkill: "Quality Control",
    duration: "20 minutes",
    dependencies: ["Apply Finish", "Install Adjustment Mechanism"],
  },
  {
    id: 7,
    name: "Packaging",
    product: "Office Desk - Adjustable",
    requiredSkill: "Packaging",
    duration: "15 minutes",
    dependencies: ["Quality Check"],
  },
  {
    id: 8,
    name: "Cut Fabric",
    product: "Office Chair - Standard",
    requiredSkill: "Upholstery",
    duration: "30 minutes",
    dependencies: [],
  },
  {
    id: 9,
    name: "Assemble Chair Base",
    product: "Office Chair - Standard",
    requiredSkill: "Assembly",
    duration: "45 minutes",
    dependencies: [],
  },
  {
    id: 10,
    name: "Upholster Seat and Back",
    product: "Office Chair - Standard",
    requiredSkill: "Upholstery",
    duration: "1 hour",
    dependencies: ["Cut Fabric"],
  },
]

// Sample products
const products = [
  { label: "Office Desk - Adjustable", value: "Office Desk - Adjustable" },
  { label: "Office Chair - Standard", value: "Office Chair - Standard" },
  { label: "Filing Cabinet - 3 Drawer", value: "Filing Cabinet - 3 Drawer" },
  { label: "Bookshelf - 5 Shelf", value: "Bookshelf - 5 Shelf" },
  { label: "Conference Table - 8 Person", value: "Conference Table - 8 Person" },
]

// Sample skills
const skills = [
  { label: "Woodworking", value: "Woodworking" },
  { label: "Metalworking", value: "Metalworking" },
  { label: "Assembly", value: "Assembly" },
  { label: "Finishing", value: "Finishing" },
  { label: "Quality Control", value: "Quality Control" },
  { label: "Packaging", value: "Packaging" },
  { label: "Electrical", value: "Electrical" },
  { label: "Upholstery", value: "Upholstery" },
  { label: "Painting", value: "Painting" },
  { label: "Mechanical", value: "Mechanical" },
]

// Form schema for adding/editing a step
const stepFormSchema = z.object({
  name: z.string().min(2, {
    message: "Step name must be at least 2 characters.",
  }),
  product: z.string({
    required_error: "Please select a product.",
  }),
  requiredSkill: z.string({
    required_error: "Please select a required skill.",
  }),
  duration: z.string().min(1, {
    message: "Duration is required.",
  }),
  dependencies: z.array(z.string()).optional(),
})

type StepFormValues = z.infer<typeof stepFormSchema>

export default function ManufacturingStepsPage() {
  const [steps, setSteps] = useState(initialSteps)
  const [searchTerm, setSearchTerm] = useState("")
  const [productFilter, setProductFilter] = useState("All")
  const [skillFilter, setSkillFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [editingStep, setEditingStep] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const itemsPerPage = 5

  // Initialize form
  const form = useForm<StepFormValues>({
    resolver: zodResolver(stepFormSchema),
    defaultValues: {
      name: "",
      product: "",
      requiredSkill: "",
      duration: "",
      dependencies: [],
    },
  })

  // Filter steps based on search term, product filter, and skill filter
  const filteredSteps = steps.filter((step) => {
    const matchesSearch =
      step.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      step.product.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProduct = productFilter === "All" || step.product === productFilter
    const matchesSkill = skillFilter === "All" || step.requiredSkill === skillFilter
    return matchesSearch && matchesProduct && matchesSkill
  })

  // Paginate steps
  const indexOfLastStep = currentPage * itemsPerPage
  const indexOfFirstStep = indexOfLastStep - itemsPerPage
  const currentSteps = filteredSteps.slice(indexOfFirstStep, indexOfLastStep)
  const totalPages = Math.ceil(filteredSteps.length / itemsPerPage)

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Get available steps for dependencies (steps for the same product)
  const getAvailableDependencies = (productName: string, currentStepId?: number) => {
    return steps
      .filter((step) => step.product === productName && (currentStepId ? step.id !== currentStepId : true))
      .map((step) => ({
        label: step.name,
        value: step.name,
      }))
  }

  // Handle adding a new step
  const handleAddStep = (data: StepFormValues) => {
    const id = steps.length > 0 ? Math.max(...steps.map((step) => step.id)) + 1 : 1
    setSteps([
      ...steps,
      {
        id,
        name: data.name,
        product: data.product,
        requiredSkill: data.requiredSkill,
        duration: data.duration,
        dependencies: data.dependencies || [],
      },
    ])
    setIsAddDialogOpen(false)
    form.reset()
  }

  // Handle editing a step
  const handleEditStep = (data: StepFormValues) => {
    if (!editingStep) return

    setSteps(
      steps.map((step) =>
        step.id === editingStep.id
          ? {
              ...step,
              name: data.name,
              product: data.product,
              requiredSkill: data.requiredSkill,
              duration: data.duration,
              dependencies: data.dependencies || [],
            }
          : step,
      ),
    )
    setIsEditDialogOpen(false)
  }

  // Handle deleting a step
  const handleDeleteStep = () => {
    if (!editingStep) return

    // Remove the step
    setSteps(steps.filter((step) => step.id !== editingStep.id))

    // Also remove this step from dependencies
    setSteps((prevSteps) =>
      prevSteps.map((step) => ({
        ...step,
        dependencies: step.dependencies.filter((dep) => dep !== editingStep.name),
      })),
    )

    setIsDeleteDialogOpen(false)
  }

  // Open edit dialog and set form values
  const openEditDialog = (step: any) => {
    setEditingStep(step)
    form.reset({
      name: step.name,
      product: step.product,
      requiredSkill: step.requiredSkill,
      duration: step.duration,
      dependencies: step.dependencies,
    })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manufacturing Steps</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Step
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Manufacturing Step</DialogTitle>
              <DialogDescription>Add a new manufacturing step for a product.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddStep)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Step Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter step name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.value} value={product.value}>
                              {product.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requiredSkill"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Required Skill</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a skill" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {skills.map((skill) => (
                            <SelectItem key={skill.value} value={skill.value}>
                              {skill.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2 hours" {...field} />
                      </FormControl>
                      <FormDescription>
                        Specify the time required for this step (e.g., 30 minutes, 2 hours).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dependencies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dependencies</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between", !field.value?.length && "text-muted-foreground")}
                              disabled={!form.watch("product")}
                            >
                              {field.value?.length
                                ? `${field.value.length} step${field.value.length > 1 ? "s" : ""} selected`
                                : "Select dependencies"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search steps..." />
                            <CommandList>
                              <CommandEmpty>No steps found.</CommandEmpty>
                              <CommandGroup>
                                {getAvailableDependencies(form.watch("product")).map((dependency) => (
                                  <CommandItem
                                    key={dependency.value}
                                    value={dependency.value}
                                    onSelect={() => {
                                      const current = field.value || []
                                      const updated = current.includes(dependency.value)
                                        ? current.filter((value) => value !== dependency.value)
                                        : [...current, dependency.value]
                                      form.setValue("dependencies", updated)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value?.includes(dependency.value) ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                    {dependency.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Select steps that must be completed before this one.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Step</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manufacturing Steps</CardTitle>
          <CardDescription>Manage manufacturing steps for all products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search steps..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="product-filter" className="whitespace-nowrap">
                    Product:
                  </Label>
                  <Select onValueChange={(value) => setProductFilter(value)} defaultValue="All">
                    <SelectTrigger id="product-filter" className="w-[180px]">
                      <SelectValue placeholder="All Products" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Products</SelectItem>
                      {products.map((product) => (
                        <SelectItem key={product.value} value={product.value}>
                          {product.label}
                        </SelectItem>
                      ))}
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
                      {skills.map((skill) => (
                        <SelectItem key={skill.value} value={skill.value}>
                          {skill.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Step Name</TableHead>
                    <TableHead className="hidden md:table-cell">Product</TableHead>
                    <TableHead>Required Skill</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="hidden lg:table-cell">Dependencies</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentSteps.length > 0 ? (
                    currentSteps.map((step) => (
                      <TableRow key={step.id}>
                        <TableCell className="font-medium">{step.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{step.product}</TableCell>
                        <TableCell>{step.requiredSkill}</TableCell>
                        <TableCell>{step.duration}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {step.dependencies.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {step.dependencies.map((dep: string) => (
                                <span
                                  key={dep}
                                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                                >
                                  {dep}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">None</span>
                          )}
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
                                onSelect={(e) => {
                                  e.preventDefault()
                                  openEditDialog(step)
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => {
                                      e.preventDefault()
                                      setEditingStep(step)
                                    }}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Delete Manufacturing Step</DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to delete this step? This action cannot be undone.
                                    </DialogDescription>
                                  </DialogHeader>
                                  {editingStep && (
                                    <div className="py-4">
                                      <p>
                                        You are about to delete: <strong>{editingStep.name}</strong>
                                      </p>
                                      {steps.some((s) => s.dependencies.includes(editingStep.name)) && (
                                        <p className="text-destructive mt-2">
                                          Warning: Other steps depend on this step. Deleting it may break the
                                          manufacturing process.
                                        </p>
                                      )}
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                      Cancel
                                    </Button>
                                    <Button variant="destructive" onClick={handleDeleteStep}>
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
                      <TableCell colSpan={6} className="h-24 text-center">
                        No manufacturing steps found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredSteps.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {indexOfFirstStep + 1} to {Math.min(indexOfLastStep, filteredSteps.length)} of{" "}
                  {filteredSteps.length} steps
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Manufacturing Step</DialogTitle>
            <DialogDescription>Make changes to the manufacturing step.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditStep)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Step Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter step name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.value} value={product.value}>
                            {product.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requiredSkill"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Skill</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a skill" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {skills.map((skill) => (
                          <SelectItem key={skill.value} value={skill.value}>
                            {skill.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2 hours" {...field} />
                    </FormControl>
                    <FormDescription>
                      Specify the time required for this step (e.g., 30 minutes, 2 hours).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dependencies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dependencies</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("w-full justify-between", !field.value?.length && "text-muted-foreground")}
                            disabled={!form.watch("product")}
                          >
                            {field.value?.length
                              ? `${field.value.length} step${field.value.length > 1 ? "s" : ""} selected`
                              : "Select dependencies"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search steps..." />
                          <CommandList>
                            <CommandEmpty>No steps found.</CommandEmpty>
                            <CommandGroup>
                              {editingStep &&
                                getAvailableDependencies(form.watch("product"), editingStep.id).map((dependency) => (
                                  <CommandItem
                                    key={dependency.value}
                                    value={dependency.value}
                                    onSelect={() => {
                                      const current = field.value || []
                                      const updated = current.includes(dependency.value)
                                        ? current.filter((value) => value !== dependency.value)
                                        : [...current, dependency.value]
                                      form.setValue("dependencies", updated)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value?.includes(dependency.value) ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                    {dependency.label}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Select steps that must be completed before this one.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
