import placeholderImg from "@/public/signup-placeholder.png";
import AuthenticationLayout from "../../../components/authentication-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthenticationLayout placeholderSrc={placeholderImg}>
      {children}
    </AuthenticationLayout>
  );
}
