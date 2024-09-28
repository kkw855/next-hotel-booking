import { ReactNode } from 'react'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'
import { Navbar } from '@/app/navbar'
import { ThemeProvider } from '@/components/theme-provider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'StaySavvy',
  description: 'Book a hotel of your choice',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col bg-secondary">
            <Navbar />
            <section className="flex-grow">{children}</section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
