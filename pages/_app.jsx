import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

import "react-tooltip/dist/react-tooltip.min.css";
import { Provider } from "react-redux";

import store from "../redux/app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const persistor = persistStore(store);
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {getLayout(<Component {...pageProps} />)}
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
