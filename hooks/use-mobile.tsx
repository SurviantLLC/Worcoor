"use client"

import { useState, useEffect } from "react"

// Define a consistent breakpoint value
const MOBILE_BREAKPOINT = 768

/**
 * Hook to detect if the current viewport is mobile-sized
 * Using matchMedia for better performance and accuracy
 * @returns boolean indicating if viewport is mobile-sized
 */
export function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    // Use matchMedia for better performance
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add event listener
    mql.addEventListener("change", onChange)
    
    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Clean up
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// Also export as useIsMobile for consistency with existing code
export const useIsMobile = useMobile;
