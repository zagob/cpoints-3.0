import "next-auth";

declare module "next-auth" {
  export interface Session {
    accessToken: string | unknown;
    userApi: UserProps;
  }
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
      id: string;
      totalHour: string;
      startHour: string;
      entryLunchHour: string;
      exitLunchHour: string;
      exitHour: string;
    };
  };
}
