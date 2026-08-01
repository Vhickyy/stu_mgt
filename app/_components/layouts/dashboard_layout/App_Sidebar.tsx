"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
} from "@/app/_components/ui/sidebar";
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
import App_Sidebar_Item, { MatchType } from "./App_Sidebar_Item";

const sidebar_items = [
  {
    id: 1,
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    match: "exact", // 👈 only exact
  },
  {
    id: 2,
    label: "Grading System",
    href: "/dashboard/grading-system",
    icon: LayoutDashboard,
    match: "prefix", // 👈 only exact
  },
  {
    id: 3,
    label: "Academic Record",
    href: "/dashboard/academic-record",
    icon: LayoutDashboard,
    match: "prefix", // 👈 only exact
  },
  {
    id: 30,
    label: "Courses",
    href: "/dashboard/courses",
    icon: LayoutDashboard,
    match: "prefix", // 👈 only exact
  },
  {
    id: 4,
    label: "Attendance",
    href: "/dashboard/attendance",
    icon: CalendarCheck,
    match: "prefix", // 👈 includes sub routes
  },
  {
    id: 5,
    label: "Timetable",
    href: "/dashboard/timetable",
    icon: Clock,
    match: "prefix",
  },
  {
    id: 6,
    label: "Classes",
    href: "/dashboard/classes",
    icon: BookOpen,
    match: "prefix",
  },
  {
    id: 7,
    label: "Results",
    href: "/dashboard/results",
    icon: ClipboardList,
    match: "prefix",
  },
  {
    id: 8,
    label: "GPA Calculator",
    href: "/dashboard/gpa",
    icon: Calculator,
    match: "prefix",
  },
  {
    id: 9,
    label: "Notepad",
    href: "/dashboard/notepad",
    icon: NotebookPen,
    match: "prefix",
  },
  {
    id: 10,
    label: "Profile",
    href: "/dashboard/profile",
    icon: UserCircle,
    match: "prefix",
  },
];

const App_Sidebar = () => {
  return (
    <Sidebar collapsible="icon" className="w-64 bg-white px-4">
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
              match={item.match as MatchType}
            />
          ))}
        </SidebarMenu>
        <SidebarFooter>
          <div className="w-[80%] h-20 bg-primary/30 border rounded-lg"></div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
};

export default App_Sidebar;
