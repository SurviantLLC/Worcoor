"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// Sample skills data
const skills = [
  { label: "Woodworking", value: "woodworking" },
  { label: "Metalworking", value: "metalworking" },
  { label: "Assembly", value: "assembly" },
  { label: "Finishing", value: "finishing" },
  { label: "Quality Control", value: "quality-control" },
  { label: "Packaging", value: "packaging" },
  { label: "Electrical", value: "electrical" },
  { label: "Upholstery", value: "upholstery" },
  { label: "Painting", value: "painting" },
  { label: "CNC Operation", value: "cnc-operation" },
  { label: "Welding", value: "welding" },
  { label: "Carpentry", value: "carpentry" },
  { label: "Machine Operation", value: "machine-operation" },
  { label: "Inventory Management", value: "inventory-management" },
]

export default function WorkerRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formValues, setFormValues] = useState({
    name: "",
    mobileNumber: "",
    idUpload: "",
    qualifications: "",
    skills: [],
    salaryType: "hourly",
    salaryRate: "",
    address: "",
    emergencyContact: "",
    notes: "",
  })
  const [errors, setErrors] = useState({})

  // Validation function
  const validateForm = () => {
    const newErrors = {}

    if (!formValues.name || formValues.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters."
    }

    if (!formValues.mobileNumber || formValues.mobileNumber.length < 10) {
      newErrors.mobileNumber = "Mobile number must be at least 10 digits."
    } else if (!/^\+?[0-9\s\-()]+$/.test(formValues.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid mobile number."
    }

    if (!formValues.qualifications || formValues.qualifications.length < 2) {
      newErrors.qualifications = "Qualifications must be at least 2 characters."
    }

    if (!formValues.skills || formValues.skills.length === 0) {
      newErrors.skills = "At least one skill is required."
    }

    if (!formValues.salaryRate) {
      newErrors.salaryRate = "Salary rate is required."
    }

    if (!formValues.address || formValues.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters."
    }

    if (!formValues.emergencyContact || formValues.emergencyContact.length < 10) {
      newErrors.emergencyContact = "Emergency contact must be at least 10 digits."
    } else if (!/^\+?[0-9\s\-()]+$/.test(formValues.emergencyContact)) {
      newErrors.emergencyContact = "Please enter a valid phone number."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle skill selection
  const handleSkillSelect = (skill) => {
    const isSelected = formValues.skills.includes(skill)
    let updated = []

    if (isSelected) {
      updated = formValues.skills.filter((s) => s !== skill)
    } else {
      updated = [...formValues.skills, skill]
    }

    setFormValues((prev) => ({
      ...prev,
      skills: updated,
    }))
  }

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server and get a URL
      // For this example, we'll just store the file name
      setFormValues((prev) => ({
        ...prev,
        idUpload: file.name,
      }))
    }
  }

  // Reset form
  const resetForm = () => {
    setFormValues({
      name: "",
      mobileNumber: "",
      idUpload: "",
      qualifications: "",
      skills: [],
      salaryType: "hourly",
      salaryRate: "",
      address: "",
      emergencyContact: "",
      notes: "",
    })
    setErrors({})
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors and try again.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Simulate API call with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Form submitted successfully:", formValues)
      toast({
        title: "Worker registered successfully",
        description: `${formValues.name} has been registered as a new worker.`,
      })

      // Reset form
      resetForm()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Registration failed",
        description: "There was an error registering the worker. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Worker Registration</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Register New Worker</CardTitle>
          <CardDescription>Enter worker details to register them in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Full Name
                </label>
                <Input name="name" placeholder="Enter full name" value={formValues.name} onChange={handleChange} />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Mobile Number Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Mobile Number
                </label>
                <Input
                  name="mobileNumber"
                  placeholder="Enter mobile number"
                  value={formValues.mobileNumber}
                  onChange={handleChange}
                />
                {errors.mobileNumber && <p className="text-sm text-red-500">{errors.mobileNumber}</p>}
              </div>

              {/* ID Upload Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  ID Document
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    className="hidden"
                    id="id-upload"
                    onChange={handleFileUpload}
                    accept="image/*,.pdf"
                  />
                  <div className="flex w-full items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("id-upload")?.click()}
                      className="flex-1"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {formValues.idUpload ? "Change File" : "Upload ID"}
                    </Button>
                    {formValues.idUpload && (
                      <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                        {formValues.idUpload}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Upload a photo ID or other identification document.</p>
                {errors.idUpload && <p className="text-sm text-red-500">{errors.idUpload}</p>}
              </div>

              {/* Qualifications Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Qualifications
                </label>
                <Input
                  name="qualifications"
                  placeholder="Enter qualifications"
                  value={formValues.qualifications}
                  onChange={handleChange}
                />
                <p className="text-sm text-muted-foreground">
                  Enter education, certifications, or other qualifications.
                </p>
                {errors.qualifications && <p className="text-sm text-red-500">{errors.qualifications}</p>}
              </div>

              {/* Skills Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Skills
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("w-full justify-between", !formValues.skills.length && "text-muted-foreground")}
                    >
                      {formValues.skills.length
                        ? `${formValues.skills.length} skill${formValues.skills.length > 1 ? "s" : ""} selected`
                        : "Select skills"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search skills..." />
                      <CommandList>
                        <CommandEmpty>No skills found.</CommandEmpty>
                        <CommandGroup>
                          {skills.map((skill) => (
                            <CommandItem
                              key={skill.value}
                              value={skill.value}
                              onSelect={() => handleSkillSelect(skill.value)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formValues.skills.includes(skill.value) ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {skill.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <p className="text-sm text-muted-foreground">Select all applicable skills for this worker.</p>
                {errors.skills && <p className="text-sm text-red-500">{errors.skills}</p>}
              </div>

              {/* Salary Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Salary Type
                  </label>
                  <Select
                    value={formValues.salaryType}
                    onValueChange={(value) => handleSelectChange("salaryType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select salary type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.salaryType && <p className="text-sm text-red-500">{errors.salaryType}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Salary Rate
                  </label>
                  <Input
                    name="salaryRate"
                    placeholder="Enter rate"
                    value={formValues.salaryRate}
                    onChange={handleChange}
                  />
                  {errors.salaryRate && <p className="text-sm text-red-500">{errors.salaryRate}</p>}
                </div>
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Address
                </label>
                <Textarea
                  name="address"
                  placeholder="Enter address"
                  value={formValues.address}
                  onChange={handleChange}
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
              </div>

              {/* Emergency Contact Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Emergency Contact
                </label>
                <Input
                  name="emergencyContact"
                  placeholder="Enter emergency contact number"
                  value={formValues.emergencyContact}
                  onChange={handleChange}
                />
                {errors.emergencyContact && <p className="text-sm text-red-500">{errors.emergencyContact}</p>}
              </div>
            </div>

            {/* Notes Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Additional Notes
              </label>
              <Textarea
                name="notes"
                placeholder="Enter any additional notes or comments"
                value={formValues.notes}
                onChange={handleChange}
              />
              {errors.notes && <p className="text-sm text-red-500">{errors.notes}</p>}
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register Worker"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
