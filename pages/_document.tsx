import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body className="bg-zinc-900 text-zinc-300 antialiased relative">
        <div className="bg-gradient-to-t from-black via-zinc-900 to-zinc-800 h-full w-full absolute z-0 left-0 right-0"></div>
        <div className="absolute left-0 top-0 h-[30rem] w-full dark:[mask-image:linear-gradient(white,transparent)]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#36b49f] to-[#75acff] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#75acff]/30 dark:opacity-100"></div>
        </div>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
