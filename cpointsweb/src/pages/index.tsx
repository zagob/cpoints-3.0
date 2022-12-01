import { signIn, useSession } from "next-auth/react";
import {} from "phosphor-react";
import { AsideControlPoints } from "../components/AsideControlPoints";
import { Dashboard } from "../components/Dashboard";

export default function Home() {
  const { data: session, status } = useSession();

  console.log(session);
  console.log(status);

  return (
    <div className="h-full flex gap-4">
      <AsideControlPoints />
      <Dashboard />
    </div>
    // <div className="flex flex-col h-screen">
    //   <main className="border flex-1">
    //     <button
    //       type="button"
    //       onClick={handleSignInGoole}
    //       className="bg-gray-100 text-gray-900 px-4 py-2 rounded-sm"
    //     >
    //       Login com Google
    //     </button>
    //     {status}
    //   </main>
    // </div>
  );
}
