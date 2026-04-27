"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import App_Sidebar from "./App_Sidebar";

const Dashboard_Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <App_Sidebar />
        <main className="flex-1 p-6">
          <div className="p-2 md:hidden">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard_Layout;
