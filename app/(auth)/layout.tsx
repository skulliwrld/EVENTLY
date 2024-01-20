
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
      <html lang="en">
      <body className="flex-center h-screen flex-col items-center w-full min-h-screen bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center">
          <main className="flex-1 my-16">{children}</main>
      </body>
      </html>
    )
  }