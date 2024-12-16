import Navbar from "@/components/Navbar";

export default function PageLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>, ) {
  return (
    <div className="min-h-screen flex flex-col">
    <div className="flex-grow overflow-y-auto">{children}</div>
    <Navbar />
  </div>
  )
}
