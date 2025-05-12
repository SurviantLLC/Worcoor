"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ClipboardList,
  Cog,
  Database,
  LayoutDashboard,
  Package,
  Users,
  History,
  Award,
  TrendingUp,
  Layers,
  ShoppingBag,
  Truck,
  PieChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SidebarProps = {
  isOpen: boolean
  toggle: () => void
}

export function DashboardSidebar({ isOpen, toggle }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Admin Panel",
      href: "/dashboard/admin",
      icon: Users,
    },
    {
      title: "User Management",
      href: "/dashboard/admin/users",
      icon: Users,
      parent: "Admin Panel",
    },
    {
      title: "Role Assignment",
      href: "/dashboard/admin/roles",
      icon: ClipboardList,
      parent: "Admin Panel",
    },
    {
      title: "System Settings",
      href: "/dashboard/admin/settings",
      icon: Cog,
      parent: "Admin Panel",
    },
    {
      title: "Product Manager",
      href: "/dashboard/product-manager",
      icon: Package,
    },
    {
      title: "Products",
      href: "/dashboard/product-manager/products",
      icon: Package,
      parent: "Product Manager",
    },
    {
      title: "Manufacturing",
      href: "/dashboard/product-manager/manufacturing",
      icon: Truck,
      parent: "Product Manager",
    },
    {
      title: "SKUs",
      href: "/dashboard/product-manager/skus",
      icon: Layers,
      parent: "Product Manager",
    },
    {
      title: "Task Manager",
      href: "/dashboard/task-manager",
      icon: ClipboardList,
    },
    {
      title: "Orders",
      href: "/dashboard/task-manager/orders",
      icon: ShoppingBag,
      parent: "Task Manager",
    },
    {
      title: "Approvals",
      href: "/dashboard/task-manager/approvals",
      icon: ClipboardList,
      parent: "Task Manager",
    },
    {
      title: "Assignments",
      href: "/dashboard/task-manager/assignments",
      icon: Users,
      parent: "Task Manager",
    },
    {
      title: "Dashboards",
      href: "/dashboard/task-manager/dashboards",
      icon: LayoutDashboard,
      parent: "Task Manager",
    },
    {
      title: "Tracking",
      href: "/dashboard/task-manager/tracking",
      icon: TrendingUp,
      parent: "Task Manager",
    },
    {
      title: "Worker Panel",
      href: "/dashboard/worker",
      icon: Users,
    },
    {
      title: "Skills",
      href: "/dashboard/worker/skills",
      icon: Award,
      parent: "Worker Panel",
    },
    {
      title: "History",
      href: "/dashboard/worker/history",
      icon: History,
      parent: "Worker Panel",
    },
    {
      title: "Performance",
      href: "/dashboard/worker/performance",
      icon: TrendingUp,
      parent: "Worker Panel",
    },
    {
      title: "Productivity",
      href: "/dashboard/worker/productivity",
      icon: BarChart3,
      parent: "Worker Panel",
    },
    {
      title: "Inventory Management",
      href: "/dashboard/inventory",
      icon: Database,
    },
    {
      title: "Levels",
      href: "/dashboard/inventory/levels",
      icon: Layers,
      parent: "Inventory Management",
    },
    {
      title: "Products",
      href: "/dashboard/inventory/products",
      icon: ShoppingBag,
      parent: "Inventory Management",
    },
    {
      title: "Procurement",
      href: "/dashboard/inventory/procurement",
      icon: Truck,
      parent: "Inventory Management",
    },
    {
      title: "Analytics",
      href: "/dashboard/inventory/analytics",
      icon: PieChart,
      parent: "Inventory Management",
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
  ]

  // Filter main navigation items (those without a parent)
  const mainNavItems = navItems.filter((item) => !item.parent)

  // Check if a nav item is active or one of its children is active
  const isActiveOrHasActiveChild = (item: any) => {
    // Use strict equality and ensure pathname is not null
    if (pathname && pathname === item.href) return true
    // Use a more reliable way to check for child items
    return navItems.some((child) => child.parent === item.title && pathname && pathname === child.href)
  }

  return (
    <div
      className={cn(
        "h-screen bg-primary text-primary-foreground border-r border-border transition-all duration-300",
        isOpen ? "w-64" : "w-20",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border h-16">
        <div className={cn("flex items-center gap-2", !isOpen && "justify-center")}>
          <Database className="h-6 w-6 text-white" />
          {isOpen && <span className="font-bold text-white">WorkForce</span>}
        </div>
        <Button variant="ghost" size="icon" onClick={toggle} className="text-white hover:bg-sidebar-accent">
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-128px)]">
        <nav className="p-4 space-y-1">
          {mainNavItems.map((item) => (
            <div key={`nav-${item.href}`}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActiveOrHasActiveChild(item)
                    ? "bg-sidebar-accent text-white font-medium"
                    : "text-white/80 hover:bg-sidebar-accent hover:text-white",
                  !isOpen && "justify-center px-2",
                )}
                title={!isOpen ? item.title : undefined}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {isOpen && <span>{item.title}</span>}
              </Link>

              {/* Show child items if parent is active and sidebar is open */}
              {isOpen && isActiveOrHasActiveChild(item) && (
                <div className="ml-6 mt-1 space-y-1">
                  {navItems
                    .filter((child) => child.parent === item.title)
                    .map((child) => (
                      <Link
                        key={`child-${child.href}`}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                          pathname === child.href
                            ? "bg-sidebar-accent text-white font-medium"
                            : "text-white/70 hover:bg-sidebar-accent hover:text-white",
                        )}
                      >
                        <child.icon className="h-3.5 w-3.5" />
                        <span>{child.title}</span>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-sidebar-border h-16">
        {isOpen ? (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-white/70">admin@workforce.com</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
              A
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
