import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import "react-quill/dist/quill.snow.css";
import "react-tooltip/dist/react-tooltip.min.css";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}
