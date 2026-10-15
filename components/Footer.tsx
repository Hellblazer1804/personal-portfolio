import { personal } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      className="py-5 px-6"
      style={{ borderTop: "1px solid #0c2040", backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-mono text-xs tracking-wider" style={{ color: "var(--text-dimmer)" }}>
          ◆ {personal.name.toUpperCase()} · {personal.title.toUpperCase()}
        </p>
        <div className="flex items-center gap-4">
          <p className="font-mono text-xs tracking-wider" style={{ color: "var(--text-dimmer)" }}>
            NEXT.JS · AWS AMPLIFY
          </p>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#00aa44" }} />
          <span className="font-mono text-xs tracking-wider" style={{ color: "var(--text-dimmer)" }}>
            SYS.ONLINE
          </span>
        </div>
      </div>
    </footer>
  );
}
