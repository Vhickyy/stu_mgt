import Dashboard_Layout from "@/app/_components/layouts/dashboard_layout/Dashboard_Layout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Dashboard_Layout>{children}</Dashboard_Layout>;
}
