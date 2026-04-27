import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Home } from "lucide-react";

const App_Sidebar_Item = () => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a href="/dashboard">
          <Home className="mr-2" />
          Dashboard
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default App_Sidebar_Item;
