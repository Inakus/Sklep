import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { CookiesProvider } from "react-cookie";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
