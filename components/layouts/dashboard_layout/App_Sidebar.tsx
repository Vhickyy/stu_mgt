"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  CalendarCheck,
  Clock,
  BookOpen,
  ClipboardList,
  Calculator,
  NotebookPen,
  Settings,
  UserCircle,
} from "lucide-react";
import App_Sidebar_Item from "./App_Sidebar_Item";

const sidebar_items = [
  { id: 1, label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    id: 2,
    label: "Attendance",
    href: "/dashboard/attendance",
    icon: CalendarCheck,
  },
  { id: 3, label: "Timetable", href: "/dashboard/timetable", icon: Clock },
  { id: 4, label: "Classes", href: "/dashboard/classes", icon: BookOpen },
  { id: 5, label: "Results", href: "/dashboard/results", icon: ClipboardList },
  { id: 6, label: "GPA Calculator", href: "/dashboard/gpa", icon: Calculator },
  { id: 7, label: "Notepad", href: "/dashboard/notepad", icon: NotebookPen },
  { id: 8, label: "Settings", href: "/dashboard/settings", icon: Settings },
  { id: 9, label: "Profile", href: "/dashboard/profile", icon: UserCircle },
];

const App_Sidebar = () => {
  return (
    <Sidebar collapsible="icon" className="w-64 bg-white">
      <SidebarTrigger />
      <SidebarHeader className="p-4 font-bold">Student Manager</SidebarHeader>
      <SidebarContent className="flex flex-col justify-between">
        <SidebarMenu className="grid gap-2 overflow-y-auto">
          {sidebar_items.map((item) => (
            <App_Sidebar_Item
              key={item.id}
              name={item.label}
              link={item.href}
              icon={item.icon}
            />
          ))}
        </SidebarMenu>
        <SidebarFooter>
          <div className="w-[80%] h-[5rem] bg-primary/30 border rounded-lg"></div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
};

export default App_Sidebar;
