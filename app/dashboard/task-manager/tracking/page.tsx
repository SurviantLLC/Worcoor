import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Filter, Search, AlertTriangle } from "lucide-react"

export default function TaskTrackingPage() {
  // Mock data for tasks
  const tasks = [
    {
      id: "TASK-1001",
      name: "Assemble Product X Components",
      assignedTo: "John Doe",
      deadline: "2023-12-15",
      status: "In Progress",
      progress: 65,
      priority: "High",
      department: "Assembly",
      startDate: "2023-12-01",
    },
    {
      id: "TASK-1002",
      name: "Quality Check for Product Y",
      assignedTo: "Jane Smith",
      deadline: "2023-12-10",
      status: "Completed",
      progress: 100,
      priority: "Medium",
      department: "Quality Control",
      startDate: "2023-12-03",
    },
    {
      id: "TASK-1003",
      name: "Packaging for Product Z",
      assignedTo: "Mike Johnson",
      deadline: "2023-12-18",
      status: "Not Started",
      progress: 0,
      priority: "Low",
      department: "Packaging",
      startDate: "2023-12-12",
    },
    {
      id: "TASK-1004",
      name: "Material Preparation for Product A",
      assignedTo: "Sarah Williams",
      deadline: "2023-12-14",
      status: "Delayed",
      progress: 30,
      priority: "High",
      department: "Materials",
      startDate: "2023-12-02",
    },
    {
      id: "TASK-1005",
      name: "Final Inspection for Product B",
      assignedTo: "Robert Brown",
      deadline: "2023-12-20",
      status: "In Progress",
      progress: 45,
      priority: "Medium",
      department: "Quality Control",
      startDate: "2023-12-05",
    },
    {
      id: "TASK-1006",
      name: "Component Testing for Product C",
      assignedTo: "Emily Davis",
      deadline: "2023-12-12",
      status: "In Progress",
      progress: 80,
      priority: "High",
      department: "Testing",
      startDate: "2023-12-01",
    },
    {
      id: "TASK-1007",
      name: "Inventory Check for Raw Materials",
      assignedTo: "David Wilson",
      deadline: "2023-12-08",
      status: "Completed",
      progress: 100,
      priority: "Medium",
      department: "Inventory",
      startDate: "2023-12-04",
    },
    {
      id: "TASK-1008",
      name: "Machine Maintenance",
      assignedTo: "Lisa Martinez",
      deadline: "2023-12-16",
      status: "Not Started",
      progress: 0,
      priority: "High",
      department: "Maintenance",
      startDate: "2023-12-14",
    },
  ]

  // Calculate task statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "Completed").length
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length
  const notStartedTasks = tasks.filter((task) => task.status === "Not Started").length
  const delayedTasks = tasks.filter((task) => task.status === "Delayed").length

  const completionRate = Math.round((completedTasks / totalTasks) * 100)
  const averageProgress = Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / totalTasks)

  // Helper function to get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
      case "In Progress":
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
      case "Not Started":
        return <Badge className="bg-gray-500 hover:bg-gray-600">Not Started</Badge>
      case "Delayed":
        return <Badge className="bg-red-500 hover:bg-red-600">Delayed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Helper function to get priority badge color
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            High
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Medium
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Task Tracking</h1>
        <p className="text-muted-foreground">Monitor and update task progress and completion status</p>
      </div>

      {/* Task Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <div className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">All assigned manufacturing tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <Progress value={completionRate} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageProgress}%</div>
            <Progress value={averageProgress} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delayed Tasks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{delayedTasks}</div>
            <p className="text-xs text-muted-foreground">Tasks behind schedule</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search tasks..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Label htmlFor="status-filter" className="whitespace-nowrap">
              Status:
            </Label>
            <Select defaultValue="all">
              <SelectTrigger id="status-filter" className="w-[140px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="department-filter" className="whitespace-nowrap">
              Department:
            </Label>
            <Select defaultValue="all">
              <SelectTrigger id="department-filter" className="w-[160px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="assembly">Assembly</SelectItem>
                <SelectItem value="quality-control">Quality Control</SelectItem>
                <SelectItem value="packaging">Packaging</SelectItem>
                <SelectItem value="materials">Materials</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Task Status Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({totalTasks})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgressTasks})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedTasks})</TabsTrigger>
          <TabsTrigger value="not-started">Not Started ({notStartedTasks})</TabsTrigger>
          <TabsTrigger value="delayed">Delayed ({delayedTasks})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Task ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Task Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Assigned To</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Department</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Priority</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Deadline</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Progress</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {tasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">{task.id}</td>
                      <td className="p-4 align-middle font-medium">{task.name}</td>
                      <td className="p-4 align-middle">{task.assignedTo}</td>
                      <td className="p-4 align-middle">{task.department}</td>
                      <td className="p-4 align-middle">{getPriorityBadge(task.priority)}</td>
                      <td className="p-4 align-middle">{task.deadline}</td>
                      <td className="p-4 align-middle">{getStatusBadge(task.status)}</td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <Progress value={task.progress} className="h-2 w-[60px]" />
                          <span className="text-xs">{task.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Other tab contents would be similar but filtered by status */}
        <TabsContent value="in-progress" className="mt-4">
          {/* Similar table but filtered for in-progress tasks */}
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          {/* Similar table but filtered for completed tasks */}
        </TabsContent>
        <TabsContent value="not-started" className="mt-4">
          {/* Similar table but filtered for not-started tasks */}
        </TabsContent>
        <TabsContent value="delayed" className="mt-4">
          {/* Similar table but filtered for delayed tasks */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
