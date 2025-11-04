'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

const links = [
  {
    title: 'Profile',
    href: '/user/profile'
  },
  {
    title: 'Orders',
    href: '/user/orders'
  }
]

export default function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {links.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-bold  transition-colors hover:text-primary',
            pathname.includes(item.href) ? 'text-gray-500' : 'text-gray-600'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
