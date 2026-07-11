export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
      {children}
    </div>
  )
}
