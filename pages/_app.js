import 'src/styles/globals.css';
import { SkipNavLink } from "@reach/skip-nav";
import { AppProvider } from "src/store";
import { firebase, auth } from "src/firebase";
import * as Sentry from "@sentry/react";
import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";
import "@reach/skip-nav/styles.css";
import "@reach/combobox/styles.css";

import { CUSTOM_CHAKRA_THEME } from "src/constants/styles";
import { SENTRY_CONFIG } from "src/constants/sentry";

import UnauthenticatedNav from "src/components/UnauthenticatedNav";

const CUSTOM_THEME = extendTheme(CUSTOM_CHAKRA_THEME);

Sentry.init(SENTRY_CONFIG);

auth.setPersistence(firebase.auth.Auth.Persistence.NONE);

function App({ Component, pageProps }) {
  return (
    <AppProvider>
    <ChakraProvider theme={CUSTOM_THEME}>
      <SkipNavLink />
      <UnauthenticatedNav />
      <Box as="main" pb={12} bg="#fdfdfd" minH="100vh" h="100%">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  </AppProvider>
  )
}

export default App;