'use client'

// app/layout.tsx
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider, useSession } from 'next-auth/react'
import { ReactNode, useEffect } from 'react'

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
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === 'loading') return;

    // If user is authenticated, redirect to dashboard

  }, [session, status])


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
