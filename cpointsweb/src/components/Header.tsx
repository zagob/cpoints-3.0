import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Power } from "phosphor-react";
import { useAuth } from "../hooks/useAuth";
import { ModalUserInfo } from "./modals/ModalUserInfo";

export function Header() {
  const { status } = useSession();

  const { user, handleSignInGoole, userInfo, existDataUserInfo } = useAuth();

  return (
    <header className="h-[60px] flex justify-between items-center px-10 border-b border-b-slate-700">
      <div className="flex items-center gap-32">
        <h1>asd</h1>
        {status === "authenticated" && (
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 ${
                !existDataUserInfo ? "opacity-50" : ""
              }`}
            >
              <span className="border py-1 px-2 rounded border-gray-500 text-gray-300">
                {userInfo ? userInfo?.startHour : "-- : --"}
              </span>
              <span className="border py-1 px-2 rounded border-gray-500 text-gray-300">
                {userInfo ? userInfo?.entryLunchHour : "-- : --"}
              </span>
              <span className="border py-1 px-2 rounded border-gray-500 text-gray-300">
                {userInfo ? userInfo?.exitLunchHour : "-- : --"}
              </span>
              <span className="border py-1 px-2 rounded border-gray-500 text-gray-300">
                {userInfo ? userInfo?.exitHour : "-- : --"}
              </span>
            </div>
            <ModalUserInfo />
          </div>
        )}
      </div>
      {status === "authenticated" ? (
        <div className="flex items-center gap-10">
          {user?.user.avatar_url && user?.user.name ? (
            <div className="flex items-center gap-2">
              <Image
                width={40}
                height={40}
                src={user?.user.avatar_url}
                alt="Avatar"
                className="rounded-full"
              />
              <span>{user.user.name}</span>
            </div>
          ) : (
            <div className="w-[32px] h-[32px] bg-gray-100 rounded-full" />
          )}

          <Power
            size={28}
            onClick={() => signOut()}
            className="text-gray-500 hover:text-gray-300 transition-all cursor-pointer"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={handleSignInGoole}
          className="bg-gray-100 text-gray-900 px-4 py-2 rounded-sm"
        >
          Login com Google
        </button>
      )}
    </header>
  );
}
