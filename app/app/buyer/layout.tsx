import AuthGuard from "@/components/auth/AuthGuard";

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard role="buyer">{children}</AuthGuard>;
}
