"use client"

import Link from "next/link"
import { ArrowRight, Box, Calendar, ClipboardList, FileText, Package, PieChart, Star, Activity } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function ProductManagerPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Product Manager Panel</h1>
        <p className="text-muted-foreground">Manage products, SKUs, and manufacturing steps</p>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">18 active, 6 in development</p>
            <Progress value={75} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total SKUs</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
            <Progress value={65} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Production Efficiency</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">+5% from last quarter</p>
            <Progress value={82} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94/100</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
            <Progress value={94} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Feature Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-blue-100 p-2">
                <Package className="h-5 w-5 text-blue-700" />
              </div>
              <CardTitle>Product Management</CardTitle>
            </div>
            <CardDescription>Manage your product catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Create, edit, and manage products in your catalog. Define product specifications and details.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Active products:</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  18 products
                </Badge>
              </div>
              <Progress value={75} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <Link href="/dashboard/product-manager/products" className="flex items-center justify-center gap-2">
                Manage Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-amber-100 p-2">
                <Box className="h-5 w-5 text-amber-700" />
              </div>
              <CardTitle>SKU Management</CardTitle>
            </div>
            <CardDescription>Manage product SKUs and variants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Create and manage SKUs for your products. Define variants, pricing, and inventory levels.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total SKUs:</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">
                  87 SKUs
                </Badge>
              </div>
              <Progress value={65} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
              <Link href="/dashboard/product-manager/skus" className="flex items-center justify-center gap-2">
                Manage SKUs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-green-100 p-2">
                <ClipboardList className="h-5 w-5 text-green-700" />
              </div>
              <CardTitle>Manufacturing Steps</CardTitle>
            </div>
            <CardDescription>Define and manage manufacturing processes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Define manufacturing steps, resource requirements, and quality control processes.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Production efficiency:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  82% efficiency
                </Badge>
              </div>
              <Progress value={82} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/dashboard/product-manager/manufacturing" className="flex items-center justify-center gap-2">
                Manage Manufacturing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-purple-100 p-2">
                <FileText className="h-5 w-5 text-purple-700" />
              </div>
              <CardTitle>Product Specifications</CardTitle>
            </div>
            <CardDescription>Manage detailed product specifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Define detailed specifications, materials, dimensions, and technical requirements.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Complete specifications:</span>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  18 products
                </Badge>
              </div>
              <Progress value={75} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
              <Link href="/dashboard/product-manager/specifications" className="flex items-center justify-center gap-2">
                Manage Specifications
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-teal-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-teal-100 p-2">
                <Calendar className="h-5 w-5 text-teal-700" />
              </div>
              <CardTitle>Product Deadlines</CardTitle>
            </div>
            <CardDescription>Track product development deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Set and track product development deadlines, milestones, and release schedules.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">On schedule:</span>
                <Badge variant="outline" className="bg-teal-50 text-teal-700">
                  85% of projects
                </Badge>
              </div>
              <Progress value={85} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
              <Link href="/dashboard/product-manager/deadlines" className="flex items-center justify-center gap-2">
                View Deadlines
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-red-100 p-2">
                <PieChart className="h-5 w-5 text-red-700" />
              </div>
              <CardTitle>Product Analytics</CardTitle>
            </div>
            <CardDescription>View product performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Analyze product performance, sales trends, and customer feedback data.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Sales growth:</span>
                <Badge variant="outline" className="bg-red-50 text-red-700">
                  +12% overall
                </Badge>
              </div>
              <Progress value={68} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-red-600 hover:bg-red-700">
              <Link href="/dashboard/analytics" className="flex items-center justify-center gap-2">
                View Analytics
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Access Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Product Releases</CardTitle>
            <CardDescription>Products scheduled for release</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Ergonomic Office Chair</p>
                  <p className="text-sm text-muted-foreground">PRD-2023-001</p>
                </div>
                <Badge className="bg-red-100 text-red-800">Due in 2 weeks</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Adjustable Standing Desk</p>
                  <p className="text-sm text-muted-foreground">PRD-2023-002</p>
                </div>
                <Badge className="bg-amber-100 text-amber-800">Due in 1 month</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Modular Storage System</p>
                  <p className="text-sm text-muted-foreground">PRD-2023-003</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Due in 2 months</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
            <CardDescription>Resources allocated to product development</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Design Team</p>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Engineering Team</p>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Material Resources</p>
                  <span className="text-sm text-muted-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Quality Control</p>
                  <span className="text-sm text-muted-foreground">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
