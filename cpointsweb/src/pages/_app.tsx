import "../styles/main.css";
import "../styles/day-picker.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "../contexts/AuthContext";
import { DefaultLayout } from "../Layouts/DefaultLayout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </AuthProvider>
    </SessionProvider>
  );
}
