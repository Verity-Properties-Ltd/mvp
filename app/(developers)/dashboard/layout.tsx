import UserNavbar from "@/components/layout/UserNavbar";
import UserSidebar from "@/components/layout/UserSidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <DeveloperSidebar />
      <div className="flex-1 flex flex-col">
        <DeveloperNavbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}