"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-context"

export function MobileHeader() {
  const { toggle } = useSidebar()

  return (
    <div className="md:hidden flex items-center p-4 border-b">
      <Button variant="ghost" size="icon" className="mr-2" onClick={toggle}>
        <Menu className="h-5 w-5" />
      </Button>
      <h1 className="text-lg font-medium">WorkForce</h1>
    </div>
  )
}
