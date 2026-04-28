"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BookOpen, Settings, Users } from "lucide-react";
import App_Sidebar_Item from "./App_Sidebar_Item";

const App_Sidebar = () => {
  return (
    <Sidebar collapsible="icon" className="w-48 bg-white">
      <SidebarTrigger />
      <SidebarHeader className="p-4 font-bold">Student Manager</SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <App_Sidebar_Item />

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/dashboard/students">
                <Users className="mr-2" />
                Students
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/dashboard/classes">
                <BookOpen className="mr-2" />
                Classes
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/dashboard/settings">
                <Settings className="mr-2" />
                Settings
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default App_Sidebar;
