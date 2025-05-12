"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - always rendered but can be hidden on mobile */}
      <div className={`${isMobile && !isSidebarOpen ? "hidden" : "block"}`}>
        <DashboardSidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        {/* Mobile header */}
        {isMobile && (
          <div className="flex items-center h-16 px-4 border-b">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-medium">WorkForce</h1>
          </div>
        )}

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
