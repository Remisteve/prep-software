'use client'

// app/layout.tsx
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// export const metadata: Metadata = {
//   title: 'PrEP/PEP Management System',
//   description: 'HIV prevention care management platform',
// }

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="light"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default function WrappedRootLayout({ children }: { children: ReactNode }) {
  return <SessionProvider>
    <RootLayout>
      {children}
    </RootLayout>
  </SessionProvider>
}
