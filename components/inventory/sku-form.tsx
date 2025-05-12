"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

// Form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "SKU name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  quantity: z.coerce.number().nonnegative({
    message: "Quantity must be a non-negative number.",
  }),
  minQuantity: z.coerce.number().nonnegative({
    message: "Minimum quantity must be a non-negative number.",
  }),
  type: z.enum(["Primary", "Secondary"]),
  category: z.string({
    required_error: "Please select a category.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  unitCost: z.coerce.number().positive({
    message: "Unit cost must be a positive number.",
  }),
  currency: z.string().default("USD"),
  unitWeight: z.coerce
    .number()
    .nonnegative({
      message: "Unit weight must be a non-negative number.",
    })
    .optional(),
  weightUnit: z.string().default("kg"),
  quantityUnit: z.string().default("pieces"),
  qualityRating: z.enum(["A", "B", "C", "Not Rated"]).optional(),
  qualityCheckDone: z.boolean().default(false),
  notes: z.string().optional(),
})

type SkuFormValues = z.infer<typeof formSchema>

interface SkuFormProps {
  initialData?: SkuFormValues
  onSubmit: (data: SkuFormValues) => void
  onCancel: () => void
}

export function SkuForm({ initialData, onSubmit, onCancel }: SkuFormProps) {
  // Initialize form with default values
  const form = useForm<SkuFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      quantity: initialData?.quantity || 0,
      minQuantity: initialData?.minQuantity || 0,
      type: initialData?.type || "Primary",
      category: initialData?.category || "",
      location: initialData?.location || "",
      unitCost: initialData?.unitCost || 0,
      currency: initialData?.currency || "USD",
      unitWeight: initialData?.unitWeight || 0,
      weightUnit: initialData?.weightUnit || "kg",
      quantityUnit: initialData?.quantityUnit || "pieces",
      qualityRating: initialData?.qualityRating || "Not Rated",
      qualityCheckDone: initialData?.qualityCheckDone || false,
      notes: initialData?.notes || "",
    },
  })

  // Handle form submission
  const onFormSubmit = (data: SkuFormValues) => {
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter SKU name" {...field} />
                </FormControl>
                <FormDescription>Enter a unique identifier for this SKU.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description" {...field} />
                </FormControl>
                <FormDescription>Provide a brief description of this SKU.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} {...field} />
                  </FormControl>
                  <FormDescription>Enter the current quantity in stock.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantityUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pieces">Pieces</SelectItem>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="liters">Liters</SelectItem>
                      <SelectItem value="meters">Meters</SelectItem>
                      <SelectItem value="boxes">Boxes</SelectItem>
                      <SelectItem value="pairs">Pairs</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the unit of measurement.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="minQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Quantity</FormLabel>
                <FormControl>
                  <Input type="number" min={0} {...field} />
                </FormControl>
                <FormDescription>Enter the minimum quantity required.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Switch
                      checked={field.value === "Primary"}
                      onCheckedChange={(checked) => field.onChange(checked ? "Primary" : "Secondary")}
                    />
                  </FormControl>
                  <span>{field.value}</span>
                </div>
                <FormDescription>Set whether this is a primary or secondary SKU.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Raw Material">Raw Material</SelectItem>
                    <SelectItem value="Component">Component</SelectItem>
                    <SelectItem value="Hardware">Hardware</SelectItem>
                    <SelectItem value="Packaging">Packaging</SelectItem>
                    <SelectItem value="Finished Good">Finished Good</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select the category for this SKU.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Storage Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter storage location" {...field} />
                </FormControl>
                <FormDescription>Enter where this SKU is stored.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="unitCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Cost</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} step={0.01} {...field} />
                  </FormControl>
                  <FormDescription>Enter the cost per unit.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                      <SelectItem value="CNY">CNY</SelectItem>
                      <SelectItem value="INR">INR</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the currency for cost.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="unitWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Weight</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} step={0.01} {...field} value={field.value || ""} />
                  </FormControl>
                  <FormDescription>Enter the weight per unit.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weightUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="g">Grams (g)</SelectItem>
                      <SelectItem value="lb">Pounds (lb)</SelectItem>
                      <SelectItem value="oz">Ounces (oz)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the weight unit.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="qualityRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quality Rating</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || "Not Rated"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a quality rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="A">A - Premium</SelectItem>
                    <SelectItem value="B">B - Standard</SelectItem>
                    <SelectItem value="C">C - Economy</SelectItem>
                    <SelectItem value="Not Rated">Not Rated</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select the quality rating for this SKU.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qualityCheckDone"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Quality Check Completed</FormLabel>
                  <FormDescription>Check this box if quality inspection has been completed.</FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter any additional notes or details about this SKU..." {...field} />
              </FormControl>
              <FormDescription>Provide any additional information about this SKU.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Update SKU" : "Add SKU"}</Button>
        </div>
      </form>
    </Form>
  )
}
