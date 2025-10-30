import path from "path";
import fs from "fs";
import { copyDir, replaceInFile } from "./files";

type Opts = { name: string; template: "next" | "express" | "static" };

export async function scaffold({ name, template }: Opts) {
  const root = process.cwd();
  const srcDir = path.join(__dirname, "..", "templates", template);
  const destDir = path.join(root, name);

  if (fs.existsSync(destDir)) throw new Error(`Directory "${name}" already exists.`);
  copyDir(srcDir, destDir);

  // Basic substitutions
  const pkg = path.join(destDir, "package.json");
  if (fs.existsSync(pkg)) replaceInFile(pkg, { "__APP_NAME__": name });

  // Show template-specific hints
  console.log(`\nTemplate: ${template}`);
  if (template === "next") {
    console.log(`\nSet your receiver wallet in .env.local: NEXT_PUBLIC_LUMOS_RECEIVER=YOUR_WALLET`);
  }
}
