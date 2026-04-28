import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Home, LucideIcon } from "lucide-react";
import Link from "next/link";

const App_Sidebar_Item = ({
  name,
  link,
  icon: Icon,
}: {
  name: string;
  link: string;
  icon: LucideIcon;
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={link}>
          <Icon size={18} />
          {name}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default App_Sidebar_Item;
