import fs from "fs";
import path from "path";

export function copyDir(src: string, dest: string) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

export function replaceInFile(filePath: string, replaceMap: Record<string, string>) {
  let content = fs.readFileSync(filePath, "utf-8");
  for (const [k, v] of Object.entries(replaceMap)) {
    content = content.split(k).join(v);
  }
  fs.writeFileSync(filePath, content);
}
