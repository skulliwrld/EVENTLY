import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Footer from '@/components/shared/Footer'


const popping = Poppins({ 
  subsets: ['latin'],
  weight:["400","500","600","700"],
  variable:"--font-poppins",
 })

export const metadata: Metadata = {
  title: 'skulli events',
  description: 'Book your event, with the best structured event planner... SKULLI EVENTLY',
  icons:{
    icon:"assets/icons/cover.png"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={popping.className}>{children}</body>

    </html>
    </ClerkProvider>
  )
}
