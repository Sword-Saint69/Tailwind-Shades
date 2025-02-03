import classNames from "../utils/classNames";

export default function Section({ title, children }: { title?: string; children?: any }) {
  return (
    <div className={classNames("relative rounded-lg shadow-lg grid p-6 z-50 border border-zinc-700")}>
      {title && <div className="-mx-6 -mt-6 px-6 py-3 mb-3 text-[15px] font-medium border-b border-zinc-700">{title}</div>}
      <div className="text-zinc-500 leading-7 py-3 overflow-auto scrollbar">{children}</div>
    </div>
  );
}
