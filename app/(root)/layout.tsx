import Footer from "@/components/shared/Footer"
import { NavBar } from "@/components/shared/NavBar"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
   
    <body className="flex min-h-screen flex-col justify-between">
    <NavBar />
        <main className="flex-1">{children}</main>
    <Footer />
    </body>
    </html>
  )
}
