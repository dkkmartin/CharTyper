import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CharTyper',
  description: 'CharTyper'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="h-screen w-screen flex flex-col">
            <Header />
            <main className="flex-grow flex justify-center items-center">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
