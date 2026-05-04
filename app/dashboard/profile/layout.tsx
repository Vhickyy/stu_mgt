import Profile_Layout from "@/views/dahsboard_views/profile_view/profile_components/Profile_Layout";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Profile_Layout>{children}</Profile_Layout>;
}
