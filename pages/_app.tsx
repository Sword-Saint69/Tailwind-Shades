import mixPanel from "@analytics/mixpanel";
import { Analytics } from "analytics";
import { Config } from "mixpanel-browser";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AnalyticsProvider } from "use-analytics";
import "../styles/globals.css";
import { usePanelbear } from "@panelbear/panelbear-nextjs";

const IS_PROD = process.env.NODE_ENV === "production";

interface MixPanelConfig {
  token: string;
  options: Config;
}

const analytics = Analytics({
  app: "tailwind-shades-generator",
  debug: true,
  plugins: [IS_PROD && mixPanel({ token: "6f0bebe12be29185ace37b87f0267912", options: { debug: false, ignore_dnt: true } } as MixPanelConfig)].filter(
    Boolean
  ),
});

export default function App({ Component, pageProps }: AppProps) {
  // on route change send a page view event
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      analytics.page({ url });
    };

    if (router.pathname === "/") {
      analytics.page({ url: router.pathname });
    }

    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, router.pathname]);

  usePanelbear("H1ALDZn4VTk", { scriptSrc: "/bear.js" });

  return (
    <>
      <Head>
        <title>Tailwind Shades Generator</title>
        <meta name="title" content="Tailwind Shades Generator" />
        <meta name="description" content="Quickly generate Tailwind shades and CSS variables for your project." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tailwindshades.app/" />
        <meta property="og:title" content="Tailwind Shades Generator" />
        <meta property="og:description" content="Quickly generate Tailwind shades and CSS variables for your project." />
        <meta property="og:image" content="https://tailwindshades.app/cover.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tailwindshades.app/" />
        <meta property="twitter:title" content="Tailwind Shades Generator" />
        <meta property="twitter:description" content="Quickly generate Tailwind shades and CSS variables for your project." />
        <meta property="twitter:image" content="https://tailwindshades.app/cover.jpg" />
        <link rel="manifest" href="/site.webmanifest"></link>
        <script defer data-domain="tailwindshades.app" src="https://insights.tlockcuff.dev/js/script.outbound-links.js"></script>
      </Head>
      <AnalyticsProvider instance={analytics}>
        <Component {...pageProps} />
      </AnalyticsProvider>
    </>
  );
}
