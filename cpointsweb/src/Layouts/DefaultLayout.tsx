import { useSession } from "next-auth/react";
import Image from "next/image";
import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

import { Power } from "phosphor-react";
import { Header } from "../components/Header";

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  const { status } = useSession();

  return (
    <div className="flex flex-col h-screen gap-4">
      <Header />
      {status === "authenticated" && (
        <div className="flex-1 mx-4 mb-4">{children}</div>
      )}
    </div>
  );
}
