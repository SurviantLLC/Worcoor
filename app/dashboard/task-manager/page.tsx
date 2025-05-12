import Link from "next/link"
import {
  ArrowRight,
  BarChart,
  Calendar,
  CheckCircle,
  ClipboardList,
  LineChart,
  ListChecks,
  Clock,
  AlertTriangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function TaskManagerPage() {
  // Sample data for quick stats
  const stats = {
    activeOrders: 12,
    pendingApprovals: 5,
    tasksInProgress: 28,
    completionRate: 87,
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Task Manager Panel</h1>
        <p className="text-muted-foreground">Manage production orders, task assignments, and track progress</p>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeOrders}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
            <Progress value={65} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">-1 from last week</p>
            <Progress value={40} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tasksInProgress}</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
            <Progress value={75} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">+2% from last week</p>
            <Progress value={87} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Feature Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-blue-100 p-2">
                <ClipboardList className="h-5 w-5 text-blue-700" />
              </div>
              <CardTitle>Production Orders</CardTitle>
            </div>
            <CardDescription>Manage production orders and requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Create, edit, and track production orders. Manage order priorities and deadlines.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Active orders:</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  12 Orders
                </Badge>
              </div>
              <Progress value={65} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <Link href="/dashboard/task-manager/orders" className="flex items-center justify-center gap-2">
                Manage Orders
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-amber-100 p-2">
                <Calendar className="h-5 w-5 text-amber-700" />
              </div>
              <CardTitle>Task Assignment</CardTitle>
            </div>
            <CardDescription>Assign tasks to workers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Assign tasks to workers based on skills, availability, and priorities.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Unassigned tasks:</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">
                  8 Tasks
                </Badge>
              </div>
              <Progress value={40} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
              <Link href="/dashboard/task-manager/assignments" className="flex items-center justify-center gap-2">
                Assign Tasks
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-green-100 p-2">
                <BarChart className="h-5 w-5 text-green-700" />
              </div>
              <CardTitle>Dashboards</CardTitle>
            </div>
            <CardDescription>View production metrics and analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>View real-time dashboards showing production metrics, efficiency, and resource utilization.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">On-time completion:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  87% rate
                </Badge>
              </div>
              <Progress value={87} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/dashboard/task-manager/dashboards" className="flex items-center justify-center gap-2">
                View Dashboards
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-purple-100 p-2">
                <CheckCircle className="h-5 w-5 text-purple-700" />
              </div>
              <CardTitle>Request Approval</CardTitle>
            </div>
            <CardDescription>Review and approve production requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Review and approve production requests, material requisitions, and resource allocations.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pending approvals:</span>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  5 Requests
                </Badge>
              </div>
              <Progress value={40} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
              <Link href="/dashboard/task-manager/approvals" className="flex items-center justify-center gap-2">
                Review Requests
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-teal-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-teal-100 p-2">
                <ListChecks className="h-5 w-5 text-teal-700" />
              </div>
              <CardTitle>Task Tracking</CardTitle>
            </div>
            <CardDescription>Track task progress and completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Track the progress of tasks, identify bottlenecks, and monitor completion rates.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">In progress:</span>
                <Badge variant="outline" className="bg-teal-50 text-teal-700">
                  28 Tasks
                </Badge>
              </div>
              <Progress value={75} className="h-1.5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
              <Link href="/dashboard/task-manager/tracking" className="flex items-center justify-center gap-2">
                Track Tasks
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-red-100 p-2">
                <LineChart className="h-5 w-5 text-red-700" />
              </div>
              <CardTitle>Performance Analytics</CardTitle>
            </div>
            <CardDescription>Analyze worker and production performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <p>Analyze worker productivity, manufacturing efficiency, and resource utilization metrics.</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Worker productivity:</span>
                <Badge variant="outline" className="bg-red-50 text-red-700">
                  94% average
                </Badge>
              </div>
              <Progress value={94} className="h-1.5" />
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
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Tasks and orders due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Ergonomic Office Chairs (10)</p>
                  <p className="text-sm text-muted-foreground">PO-2023-001</p>
                </div>
                <Badge className="bg-red-100 text-red-800">Due in 2 days</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Oak Bookshelves (8)</p>
                  <p className="text-sm text-muted-foreground">PO-2023-002</p>
                </div>
                <Badge className="bg-amber-100 text-amber-800">Due in 5 days</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Walnut Filing Cabinets (3)</p>
                  <p className="text-sm text-muted-foreground">PO-2023-003</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Due in 10 days</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
            <CardDescription>Current worker assignments and availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Assembly Department</p>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Finishing Department</p>
                  <span className="text-sm text-muted-foreground">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Material Resources</p>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">Quality Control</p>
                  <span className="text-sm text-muted-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
