'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

import type { MainNavProp } from './types'

export default function MainNav({ className, links, ...props }: MainNavProp) {
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
