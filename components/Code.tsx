import Tippy from "@tippyjs/react";
import copy from "copy-to-clipboard";
import hljs from "highlight.js";
import { useEffect, useState } from "react";
import { TbCheck, TbCopy, TbQuestionMark } from "react-icons/tb";
import { useAnalytics } from "use-analytics";
import classNames from "../utils/classNames";

export default function Code({ title, lang, badge, info, children }: { title?: string; lang?: string; badge?: string; info?: any; children?: any }) {
  const [copied, setCopied] = useState(false);
  const { track } = useAnalytics();

  const handleCopy = () => {
    setCopied(true);
    copy(children);
    track("Copy code", { value: title });
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((el: any) => {
      hljs.highlightElement(el);
    });
  }, [children, lang]);

  return (
    <div className={classNames("relative rounded-lg shadow-lg grid p-6 z-50 border border-zinc-700 overflow-hidden")}>
      {title && (
        <div className="-mx-6 -mt-6 px-6 py-3 mb-3 text-[15px] font-medium border-b border-zinc-700 flex items-center justify-between">
          <div>{title}</div>
          {badge && <div className="text-[12px] font-bold bg-zinc-700 rounded-full px-2.5 py-1 ml-auto mr-5">{badge}</div>}
          {info && (
            <button className="mr-6">
              <Tippy content={info}>
                <span>
                  <TbQuestionMark size={20} />
                </span>
              </Tippy>
            </button>
          )}
          <button onClick={handleCopy} disabled={copied} className="hover:text-[#36b49f]">
            {copied ? <TbCheck size={20} /> : <TbCopy size={20} />}
          </button>
        </div>
      )}
      <pre className="text-sm font-mono scrollbar-dark overflow-auto scrollbar -m-6 p-6">
        <code className={`language-${lang || "css"}`}>{children || null}</code>
      </pre>
    </div>
  );
}
