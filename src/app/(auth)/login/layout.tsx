import placeholderImg from "@/public/login-placeholder.png";
import AuthenticationLayout from "@/components/AuthenticationLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthenticationLayout placeholderSrc={placeholderImg}>
      {children}
    </AuthenticationLayout>
  );
}
