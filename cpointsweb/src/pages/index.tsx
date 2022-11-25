import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  async function handleSignInGoole() {
    await signIn();
  }

  console.log(session);
  console.log(status);

  return (
    <div className="flex flex-col h-screen">
      <header className="border h-[50px]"></header>
      <main className="border flex-1">
        <button
          type="button"
          onClick={handleSignInGoole}
          className="bg-gray-100 text-gray-900 px-4 py-2 rounded-sm"
        >
          Login com Google
        </button>
      </main>
    </div>
  );
}
