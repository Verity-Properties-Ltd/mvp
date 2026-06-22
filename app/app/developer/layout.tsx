import DeveloperSidebar from "@/components/developer/DeveloperSidebar";
import DeveloperNavbar from "@/components/developer/DeveloperNavbar";
import AuthGuard from "@/components/auth/AuthGuard";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard role="developer">
      <div className="flex h-screen bg-gray-50">
        <DeveloperSidebar />
        <div className="flex-1 flex flex-col">
          <DeveloperNavbar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}