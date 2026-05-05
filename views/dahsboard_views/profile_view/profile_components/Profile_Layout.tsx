"use client";
import App_Double_Text from "@/components/shared/App_Double_Text";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// i need to work on this, layout should not be a client file
const Profile_Layout = ({ children }: { children: ReactNode }) => {
  const links = [
    {
      name: "Profile",
      link: "/dashboard/profile",
    },
    {
      name: "Preference",
      link: "/dashboard/profile/preference",
    },
    {
      name: "Account Settings",
      link: "/dashboard/profile/account-settings",
    },
  ];
  const pathname = usePathname();
  return (
    <>
      <App_Double_Text
        textContentStyle="gap-y-1"
        header={{
          text: "Profile",
          type: "dashTitle",
          style: "text-lg",
        }}
        para={{
          text: "Manage Your Account, Preferences and Subscription",
          type: "dashText",
          style: "text-base",
        }}
      />
      <div className="flex gap-6 my-8">
        {links.map((link) => {
          const isActive = pathname === link.link;

          return (
            <div key={link.name}>
              <Link
                href={link.link}
                className={
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-gray-500 hover:text-primary"
                }
              >
                {link.name}
              </Link>
            </div>
          );
        })}
      </div>
      {children}
    </>
  );
};

export default Profile_Layout;
