"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type MatchType = "exact" | "prefix";

const App_Sidebar_Item = ({
  name,
  link,
  icon: Icon,
  match = "prefix",
}: {
  name: string;
  link: string;
  icon: LucideIcon;
  match?: MatchType;
}) => {
  const pathname = usePathname();

  const isActive =
    match === "exact" ? pathname === link : pathname.startsWith(link);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={
          isActive
            ? "bg-primary text-white hover:bg-primary"
            : "text-gray-600 hover:bg-gray-100"
        }
      >
        <Link href={link}>
          <Icon size={18} />
          {name}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default App_Sidebar_Item;
