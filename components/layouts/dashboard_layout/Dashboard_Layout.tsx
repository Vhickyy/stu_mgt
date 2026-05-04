"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import App_Sidebar from "./App_Sidebar";
import { ArrowDown, Bell } from "lucide-react";
import Image from "next/image";
import { ME } from "@/assets/images";

const Dashboard_Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <App_Sidebar />
        <main className="flex-1">
          <div className="py-4 px-8 bg-white flex justify-between">
            header
            <div className="flex items-center gap-8">
              <Bell size={20} />
              <div className="flex items-center gap-4">
                <Image
                  src={ME}
                  alt="me"
                  width={100}
                  height={100}
                  className="w-8 h-8 bg-primary rounded-full object-cover"
                />
                <p>Victoria</p>
                <ArrowDown size={10} />
              </div>
            </div>
          </div>
          <div className="p-2 md:hidden">
            <SidebarTrigger />
          </div>
          <section className="w-[95%] mx-auto py-8">{children}</section>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard_Layout;
