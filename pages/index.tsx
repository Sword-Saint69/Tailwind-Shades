import { useEffect, useState } from "react";
import { getColors } from "theme-colors";
import Code from "../components/Code";
import { TbHash, TbLink } from "react-icons/tb";
import Section from "../components/Section";
import { useDebounce } from "react-use";
import { SketchPicker } from "react-color";
import Tippy from "@tippyjs/react";
import { useAnalytics } from "use-analytics";

export default function Home() {
  const [hex, setHex] = useState("");
  const [rgb, setRgb] = useState("");
  const [hsl, setHsl] = useState("");
  const [shades, setShades] = useState<any>({});
  const [shadesInRgb, setShadesInRgb] = useState<any>({});
  const [showPicker, setShowPicker] = useState(false);
  const { track } = useAnalytics();

  useEffect(() => {
    // setHex(randomHex());
    setHex("75ACFF");
  }, []);

  useEffect(() => {
    if (hex.length === 6) {
      try {
        let rgb = convertHexToRGB(hex.replace("#", ""));
        setRgb(rgb);
        let hsl = convertHexToHSL(hex.replace("#", ""));
        setHsl(hsl);
        let shades = getColors(hex) as any;
        setShades(shades);
        let shadesInRgb = Object.keys(shades).reduce((acc: any, shade: any) => {
          acc[shade] = convertHexToRGB(shades?.[shade]?.replace("#", "") || "");
          return acc;
        }, {});
        setShadesInRgb(shadesInRgb);
      } catch (ex) {
        console.log(ex);
      }
    }
  }, [hex]);

  useDebounce(() => (hex !== "75ACFF" ? track("Generate shades", { color: hex }) : null), 1000, [hex]);

  return (
    <div className="py-10 max-w-5xl mx-auto relative px-4">
      <div className="text-center text-5xl mb-3 font-black text-zinc-200">Tailwind Shades Generator</div>
      <div className="text-center text-zinc-300 text-lg font-bold">Quickly generate Tailwind shades and CSS variables for your project.</div>

      <div className="flex">
        <div className="inline-flex justify-center mx-auto mt-10 z-50 relative border border-zinc-600 rounded-lg">
          <div className="flex items-center">
            <div className="h-12 flex items-center w-12 flex-shrink-0 border-r border-zinc-600 justify-center bg-zinc-900/50 rounded-l-lg overflow-hidden">
              <TbHash />
            </div>
            <div className="">
              <input
                className="h-12 px-3 focus:outline-none font-bold bg-zinc-900/50 uppercase font-mono w-[150px]"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                placeholder="Enter hex"
                maxLength={6}
              />
            </div>
            <div className="h-12 w-12 flex-shrink-0 border-l border-zinc-600 flex items-center justify-center bg-zinc-900/50 rounded-r-lg">
              <Tippy
                interactive={true}
                visible={showPicker}
                className="relative z-50"
                content={
                  <div className="relative z-50">
                    <SketchPicker color={hex} onChangeComplete={(color: any) => setHex(color.hex.replace("#", ""))} />
                  </div>
                }
                trigger="manual"
                hideOnClick={false}
                placement="bottom"
                onHide={() => setShowPicker(false)}
                onClickOutside={() => setShowPicker(false)}
              >
                <div className="w-5 h-5 rounded-md cursor-pointer" style={{ background: `#${hex}` }} onClick={() => setShowPicker(true)}></div>
              </Tippy>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-zinc-700 rounded-lg p-6 my-10 shadow-lg shadow-zinc-900">
        <div className="flex">
          <div className="grid md:grid-cols-2 flex-1 gap-5 md:gap-10">
            <div className="flex">
              <div className="w-36 h-36 rounded flex-shrink-0" style={{ background: `rgb(${rgb})` }}></div>
              <div className="ml-5">
                <div className="font-bold">HEX</div>
                <div className="text-sm mb-2 uppercase font-mono">#{hex}</div>
                <div className="font-bold">RGB</div>
                <div className="text-sm mb-2 font-mono">{rgb}</div>
                <div className="font-bold">HSL</div>
                <div className="text-sm font-mono">{hsl}</div>
              </div>
            </div>
            <div className="">
              <div className="font-bold mb-2">Tailwind Shades</div>
              <div className="text-sm grid grid-cols-2 gap-x-6 gap-y-1">
                {Object.keys(shades || {}).map((shade) => (
                  <div key={shade} className="flex">
                    <div style={{ background: shades?.[shade] }} className="w-4 h-4 flex-shrink-0 mr-2 ring-1 ring-zinc-700"></div>
                    <div className="font-medium mr-2 w-6 text-right">{shade}</div>
                    <div className="text-sm font-mono">{shades?.[shade]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1">
        <Code
          title="CSS Variables"
          badge="Your CSS File"
          info={
            <div className="p-3 space-y-2">
              <div className="font-medium text-lg">What is this?</div>
              <div>This css was generated based on the hex color entered above.</div>
              <div>You can copy/paste this into your project&apos;s css file and then use the CSS Variable config of Tailwind below.</div>
            </div>
          }
          lang="css"
        >{`:root {
  --color-primary-50: ${(shadesInRgb || {})["50"]?.split(",")?.join(" ") || ""};
  --color-primary-100: ${(shadesInRgb || {})["100"]?.split(",")?.join(" ") || ""};
  --color-primary-200: ${(shadesInRgb || {})["200"]?.split(",")?.join(" ") || ""};
  --color-primary-300: ${(shadesInRgb || {})["300"]?.split(",")?.join(" ") || ""};
  --color-primary-400: ${(shadesInRgb || {})["400"]?.split(",")?.join(" ") || ""};
  --color-primary-500: ${(shadesInRgb || {})["500"]?.split(",")?.join(" ") || ""};
  --color-primary-600: ${(shadesInRgb || {})["600"]?.split(",")?.join(" ") || ""};
  --color-primary-700: ${(shadesInRgb || {})["700"]?.split(",")?.join(" ") || ""};
  --color-primary-800: ${(shadesInRgb || {})["800"]?.split(",")?.join(" ") || ""};
  --color-primary-900: ${(shadesInRgb || {})["900"]?.split(",")?.join(" ") || ""};
}`}</Code>

        <div className="h-12 border-l-[2px] border-zinc-700 mx-auto relative">
          <span className="absolute top-[8px] -left-[17px] rounded-full p-1 border border-zinc-700 bg-zinc-700 h-8 w-8 flex items-center justify-center">
            <TbLink size={16} />
          </span>
        </div>

        <Code
          title="tailwind.config.js"
          badge="CSS Variables"
          info={
            <div className="p-3 space-y-2">
              <div className="font-medium text-lg">What is this?</div>
              <div>This Tailwind config was generated based on the hex color entered above.</div>
              <div>You can copy/paste this code snippet into your tailwind.config.js file to use the CSS Variables in your project.</div>
            </div>
          }
          lang="js"
        >{`module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "rgb(var(--color-primary-50) / <alpha-value>)",
          100: "rgb(var(--color-primary-100) / <alpha-value>)",
          200: "rgb(var(--color-primary-200) / <alpha-value>)",
          300: "rgb(var(--color-primary-300) / <alpha-value>)",
          400: "rgb(var(--color-primary-400) / <alpha-value>)",
          500: "rgb(var(--color-primary-500) / <alpha-value>)",
          600: "rgb(var(--color-primary-600) / <alpha-value>)",
          700: "rgb(var(--color-primary-700) / <alpha-value>)",
          800: "rgb(var(--color-primary-800) / <alpha-value>)",
          900: "rgb(var(--color-primary-900) / <alpha-value>)",
        },
      }
    }
  }
}`}</Code>

        <div className="mt-10">
          <Code
            title="tailwind.config.js"
            badge="HEX Colors"
            info={
              <div className="p-3 space-y-2">
                <div className="font-medium text-lg">What is this?</div>
                <div>This Tailwind config was generated based on the hex color entered above.</div>
                <div>You can copy/paste this code snippet into your tailwind.config.js file to use the hex colors in your project.</div>
              </div>
            }
            lang="js"
          >{`module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "${shades?.["50"]}",
          100: "${shades?.["100"]}",
          200: "${shades?.["200"]}",
          300: "${shades?.["300"]}",
          400: "${shades?.["400"]}",
          500: "${shades?.["500"]}",
          600: "${shades?.["600"]}",
          700: "${shades?.["700"]}",
          800: "${shades?.["800"]}",
          900: "${shades?.["900"]}",
        },
      }
    }
  }
}`}</Code>
        </div>
      </div>

      <div className="mt-10">
        <Section title="🎉 Enjoy">
          I created this tool to help me quickly configure Tailwind colors. I was building a UI component library and needed to quickly generate a
          Tailwind config that can dynamically change colors based on another projects css variable. I hope you find this tool useful.
          <br />
          <div className="mt-3">
            <div className="font-medium">Resources:</div>
            <ul className="list-inside list-disc ml-4">
              <li>
                <a
                  href="https://tailwindcss.com/docs/customizing-colors#using-css-variables"
                  className="underline"
                  target="_blank"
                  rel="noreferrer nofollow"
                >
                  https://tailwindcss.com/docs/customizing-colors#using-css-variables
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/theme-colors" className="underline" target="_blank" rel="noreferrer nofollow">
                  https://www.npmjs.com/package/theme-colors
                </a>
              </li>
            </ul>
          </div>
          <br />
          <div>
            Created by{" "}
            <a href="https://tlockcuff.dev" className="underline">
              Travis Lockcuff
            </a>
            .
            <br />I also wrote an article about this tool if you&apos;re a curious minded individual{" "}
            <a href="https://tlockcuff.dev/articles/tailwind-shades-generator" className="underline">
              Read here
            </a>
            .
          </div>
        </Section>
      </div>
    </div>
  );
}

function randomHex() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

function convertHexToHSL(hex: string) {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (hex.length == 3) {
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16);

    // 6 digits
  } else if (hex.length == 6) {
    r = parseInt(hex.substr(0, 2), 16);
    g = parseInt(hex.substr(2, 2), 16);
    b = parseInt(hex.substr(4, 2), 16);
  }

  (r /= 255), (g /= 255), (b /= 255);
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

function convertHexToRGB(hex: string) {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (hex.length == 3) {
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16);

    // 6 digits
  } else if (hex.length == 6) {
    r = parseInt(hex.substr(0, 2), 16);
    g = parseInt(hex.substr(2, 2), 16);
    b = parseInt(hex.substr(4, 2), 16);
  }

  return `${r},${g},${b}`;
}
