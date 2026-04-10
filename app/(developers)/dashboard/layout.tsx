import DeveloperSidebar from "../layout/DeveloperSidebar";
import DeveloperNavbar from "../layout/DeveloperNavbar";

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