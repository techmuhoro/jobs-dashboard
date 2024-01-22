import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import AdminNavbar from "./AdminNavbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Admin",
};
export default function Layout({ children }: LayoutProps) {
  return (
    <ClerkProvider>
      <AdminNavbar />
      {children}
    </ClerkProvider>
  );
}
