"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Students', href: '/students' },
  { name: 'Analytics', href: '/analytics' },
  { name: 'Predictions', href: '/predictions' },
  { name: 'Alerts', href: '/alerts' },
  { name: 'Reports', href: '/reports' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8 py-3">
          {navigationItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button 
                variant="ghost" 
                className={cn(
                  "text-sm font-medium hover:text-primary",
                  pathname === item.href && "text-primary bg-primary/10"
                )}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

