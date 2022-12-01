import { signIn, useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { api } from "../services/axios";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: UserProps | null;
  userInfo: UserInfoDataProps | null;
  existDataUserInfo: boolean;
  handleSignInGoole: () => Promise<void>;
  handleCreateUserInfo: (userInfoData: UserInfoDataProps) => Promise<void>;
  handleUpdateUserInfo: (userInfoData: UserInfoDataProps) => Promise<void>;
}

interface UserProps {
  token: string;
  user: {
    id: string;
    googleId: string;
    email: string | null | undefined;
    name: string | null | undefined;
    avatar_url: string | null | undefined;
    infoUser: {
      id?: string;
      totalHour: string;
      startHour: string;
      entryLunchHour: string;
      exitLunchHour: string;
      exitHour: string;
    } | null;
  };
}

interface UserInfoDataProps {
  id?: string;
  totalHour: string;
  startHour: string;
  entryLunchHour: string;
  exitLunchHour: string;
  exitHour: string;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const { data, status } = useSession();
  const [user, setUser] = useState<UserProps | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfoDataProps | null>(null);

  const existDataUserInfo = userInfo !== null;

  async function handleSignInGoole() {
    await signIn();
  }

  async function handleCreateUserInfo(userInfoData: UserInfoDataProps) {
    await api.post(`infoUsers/create/${user?.user.id}`, userInfoData);

    setUserInfo(userInfoData);
  }

  async function handleUpdateUserInfo(userInfoData: UserInfoDataProps) {
    await api.put(
      `infoUsers/update/${data?.userApi.user.infoUser.id}`,
      userInfoData
    );

    setUserInfo(userInfoData);
  }

  useEffect(() => {
    if (status === "authenticated") {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.userApi.token}`;
      setUser(data?.userApi);
      setUserInfo(data.userApi.user.infoUser);
    }
  }, [status]);
  return (
    <AuthContext.Provider
      value={{
        user,
        handleSignInGoole,
        userInfo,
        handleCreateUserInfo,
        handleUpdateUserInfo,
        existDataUserInfo,
      }}
    >
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
}
